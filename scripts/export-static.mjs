import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const basePath = (process.env.PAGES_BASE_PATH ?? "").replace(/\/$/, "");
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("export", Date.now().toString());

const { default: worker } = await import(workerUrl.href);
const blogDirectories = (await readdir("app/blog", { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
const routes = [
  { pathname: "/", output: "dist/client/index.html" },
  { pathname: "/blog", output: "dist/client/blog/index.html" },
  ...blogDirectories.map((slug) => ({
    pathname: `/blog/${slug}`,
    output: `dist/client/blog/${slug}/index.html`,
  })),
];

const productionSecurityMetadata = `
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'self'; object-src 'none'; frame-src 'none'; form-action https://formsubmit.co; img-src 'self' data:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; upgrade-insecure-requests">
  <meta name="referrer" content="strict-origin-when-cross-origin">`;

function prepareHtml(source) {
  let html = source
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*rel=["']modulepreload["'][^>]*\/?>/gi, "")
    .replace("</head>", `${productionSecurityMetadata}\n</head>`)
    .replace("</body>", `<script src="${basePath}/static.js" defer></script></body>`);

  if (basePath) {
    html = html
      .replaceAll("/assets/", `${basePath}/assets/`)
      .replaceAll("/media/", `${basePath}/media/`)
      .replaceAll("/og.png", `${basePath}/og.png`)
      .replaceAll('href="/blog/', `href="${basePath}/blog/`)
      .replaceAll('href="/#', `href="${basePath}/#`);
  }

  return html;
}

if (basePath) {
  const manifest = JSON.parse(await readFile("dist/client/.vite/manifest.json", "utf8"));
  const cssFiles = [...new Set(Object.values(manifest).flatMap((entry) => entry.css ?? []))];
  for (const cssFile of cssFiles) {
    const path = `dist/client/${cssFile}`;
    const css = await readFile(path, "utf8");
    await writeFile(path, css.replaceAll("url(/assets/", `url(${basePath}/assets/`));
  }
}

for (const route of routes) {
  const response = await worker.fetch(
    new Request(`https://manyewade.com${route.pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  if (!response.ok) {
    throw new Error(`Static render failed for ${route.pathname} with ${response.status}`);
  }

  await mkdir(dirname(route.output), { recursive: true });
  await writeFile(route.output, prepareHtml(await response.text()));
}

await copyFile(routes[0].output, "dist/client/404.html");
await writeFile("dist/client/.nojekyll", "");

console.log(`GitHub Pages export ready at dist/client${basePath ? ` (base path: ${basePath})` : ""}`);
