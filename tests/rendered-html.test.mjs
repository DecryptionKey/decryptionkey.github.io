import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the complete portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Ma(?:&#x27;|')Nye Wade/);
  assert.match(html, /Securing systems/);
  assert.match(html, /Selected work/);
  assert.match(html, /Patch Management &amp; System Hardening/);
  assert.match(html, /data-selected-work-showcase/);
  assert.equal((html.match(/data-project-viewer=/g) ?? []).length, 4);
  assert.match(html, /data-project-open-gallery/);
  assert.match(html, /data-project-open-writeup/);
  assert.match(html, /data-project-gallery-thumb/);
  assert.match(html, /media\/projects\/project-1\/patch-log\.gif/);
  assert.match(html, /Read write-up/);
  assert.match(html, /Gallery/);
  assert.match(html, /data-capability-carousel/);
  assert.match(html, /Cloud Security Engineering/);
  assert.match(html, /Security Automation &amp; DevSecOps/);
  assert.match(html, /Cloud Incident Response &amp; Threat Hunting/);
  assert.match(html, /Container &amp; Linux Security/);
  assert.match(html, /media\/skills\/aws\.svg/);
  assert.match(html, /media\/skills\/wiz\.svg/);
  assert.match(html, /media\/skills\/docker\.svg/);
  assert.match(html, /Cloud and DevOps technologies/);
  assert.match(html, /Paramount/);
  assert.match(html, /Information Security Intern \(Cloud Security\)/);
  assert.match(html, /Email Security and Vulnerability Management Intern/);
  assert.match(html, /data-employer-card/);
  assert.match(html, /media\/paramount-logo-white\.svg/);
  assert.match(html, /media\/marist-university-logo-white\.svg/);
  assert.match(html, /media\/marist-university-logo-primary\.svg/);
  assert.match(html, /Career-relevant certifications/);
  assert.match(html, /data-certification-carousel/);
  assert.match(html, /Credentials in motion/);
  assert.equal((html.match(/data-certification-card/g) ?? []).length, 24);
  assert.match(html, /Certified AI Security Fundamentals/);
  assert.match(html, /Certified AI Trust Practitioner/);
  assert.match(html, /Certified DSPM Architect/);
  assert.match(html, /media\/certifications\/cyera-ai-security\.png/);
  assert.match(html, /media\/certifications\/cyera-dspm\.png/);
  assert.match(html, /media\/certifications\/cyera-ai-trust-practitioner\.png/);
  assert.match(html, /media\/certifications\/cyera-dspm-architect\.png/);
  assert.match(html, /AWS Security Fundamentals/);
  assert.match(html, /media\/certifications\/aws\.svg/);
  assert.match(html, /NIST Cybersecurity Framework 2\.0 Primer/);
  assert.match(html, /Student SOC Program Foundations/);
  assert.match(html, /Introduction to Incident Command System/);
  assert.match(html, /National Incident Management System/);
  assert.match(html, /National Response Framework/);
  assert.match(html, /media\/certifications\/fema\.png/);
  assert.match(html, /Say hello to/);
  assert.match(html, /Identity verified/);
  assert.match(html, /Meet Ma/);
  assert.match(html, /credly\.com\/badges\/9f4fc45f-eee9-4248-a31c-4e1d5125f3a5/);
  assert.match(html, /me@manyewade\.com/);
  assert.match(html, /1T7wFdkA3-S9NpQudZIZzRLwFwKWMeS5l/);
  assert.match(html, /media\/brandmark\.png/);
  assert.match(html, /media\/horizontal-logo\.png/);
  assert.match(html, /media\/manye-wade-headshot\.png/);
  assert.match(html, /mobile-navigation/);
  assert.match(html, /scroll-progress/);
  assert.match(html, /data-contact-trigger/);
  assert.match(html, /href="\/blog\/ubuntu-security-baseline\//);
  assert.match(html, /href="\/blog\//);
  assert.match(html, /View all articles/);
  assert.match(html, /Read article/);
  assert.doesNotMatch(html, /Start a conversation/);
  assert.doesNotMatch(html, /Building your site|react-loading-skeleton/);
});

test("renders the blog archive", async () => {
  const response = await render("/blog");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Security notes, built from evidence/);
  assert.match(html, /All articles/);
  assert.match(html, /01[\s\S]*published article/);
  assert.match(html, /Building an Ubuntu security lab and establishing a baseline/);
  assert.match(html, /href="\/blog\/ubuntu-security-baseline\//);
});

test("renders the Ubuntu security baseline article", async () => {
  const response = await render("/blog/ubuntu-security-baseline");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Building an Ubuntu security lab and establishing a baseline/);
  assert.match(html, /The objective: build, inspect, then assess/);
  assert.match(html, /1,687 installed packages/);
  assert.match(html, /SSH exposed on port 22/);
  assert.match(html, /Explore the related hardening projects/);
  assert.match(html, /media\/security-baseline\.png/);
  assert.match(html, /media\/blog-vm-summary\.png/);
  assert.match(html, /media\/blog-system-inspection-findings\.png/);
});

test("GitHub Pages export is fully static", async () => {
  const html = await readFile(new URL("../dist/client/index.html", import.meta.url), "utf8");
  const staticScript = await readFile(new URL("../dist/client/static.js", import.meta.url), "utf8");
  const blogHtml = await readFile(new URL("../dist/client/blog/index.html", import.meta.url), "utf8");
  const articleHtml = await readFile(new URL("../dist/client/blog/ubuntu-security-baseline/index.html", import.meta.url), "utf8");
  assert.match(html, /static\.js\?v=[a-f0-9]{12}/);
  assert.match(staticScript, /initIdentityUnlock/);
  assert.match(staticScript, /initSelectedWork/);
  assert.match(staticScript, /data-project-open-gallery/);
  assert.match(staticScript, /data-project-gallery-next/);
  assert.match(staticScript, /--identity-scan-progress/);
  assert.match(staticScript, /--identity-portrait-opacity/);
  assert.match(html, /Content-Security-Policy/);
  assert.match(html, /form-action https:\/\/formsubmit\.co/);
  assert.match(html, /strict-origin-when-cross-origin/);
  assert.match(html, /maxlength="100"/i);
  assert.match(html, /maxlength="254"/i);
  assert.match(html, /maxlength="4000"/i);
  assert.match(html, /media\/paramount-logo-white\.svg/);
  assert.match(html, /media\/marist-university-logo-white\.svg/);
  assert.match(html, /media\/marist-university-logo-primary\.svg/);
  assert.match(blogHtml, /Security notes, built from evidence/);
  assert.match(blogHtml, /static\.js/);
  assert.doesNotMatch(blogHtml, /__VINEXT|\.rsc\?_rsc|type=["']module["']/);
  assert.match(articleHtml, /Building an Ubuntu Security Lab and Baseline Assessment|Building an Ubuntu security lab/);
  assert.match(articleHtml, /static\.js/);
  assert.doesNotMatch(articleHtml, /__VINEXT|\.rsc\?_rsc|type=["']module["']/);
  await readFile(new URL("../dist/client/media/paramount-logo-white.svg", import.meta.url));
  await readFile(new URL("../dist/client/media/marist-university-logo-white.svg", import.meta.url));
  await readFile(new URL("../dist/client/media/marist-university-logo-primary.svg", import.meta.url));
  await readFile(new URL("../dist/client/media/blog-vm-summary.png", import.meta.url));
  await readFile(new URL("../dist/client/media/blog-system-inspection-findings.png", import.meta.url));
  for (const projectAsset of [
    "project-1/patch-log.gif", "project-1/root-login.gif", "project-1/hardened-checklist.png",
    "project-2/password-policy.gif", "project-2/add-users.png", "project-2/groups.png", "project-2/install-policy.png", "project-2/policy-test.png",
    "project-3/backup.gif", "project-3/file-permissions.gif", "project-3/backup.png", "project-3/data-deletion.gif", "project-3/recovery.png",
    "project-4/sharepoint-site.png", "project-4/rss-photo.png", "project-4/rss-output.png",
  ]) {
    await readFile(new URL(`../dist/client/media/projects/${projectAsset}`, import.meta.url));
  }
  for (const writeup of [
    "patch-management-system-hardening.md",
    "identity-authentication-controls.md",
    "storage-encryption-recovery.md",
    "rss-to-sharepoint-news.md",
  ]) {
    await readFile(new URL(`../dist/client/writeups/${writeup}`, import.meta.url));
  }
  await readFile(new URL("../dist/client/media/certifications/cyera-ai-security.png", import.meta.url));
  await readFile(new URL("../dist/client/media/certifications/cyera-dspm.png", import.meta.url));
  await readFile(new URL("../dist/client/media/certifications/cyera-ai-trust-practitioner.png", import.meta.url));
  await readFile(new URL("../dist/client/media/certifications/cyera-dspm-architect.png", import.meta.url));
  const awsCertificationLogo = await readFile(new URL("../dist/client/media/certifications/aws.svg", import.meta.url), "utf8");
  const microsoftCertificationLogo = await readFile(new URL("../dist/client/media/certifications/microsoft.svg", import.meta.url), "utf8");
  const linkedInCertificationLogo = await readFile(new URL("../dist/client/media/certifications/linkedin.svg", import.meta.url), "utf8");
  assert.match(awsCertificationLogo, /#f90/);
  assert.match(microsoftCertificationLogo, /#f25022/);
  assert.match(microsoftCertificationLogo, /#7fba00/);
  assert.match(microsoftCertificationLogo, /#00a4ef/);
  assert.match(microsoftCertificationLogo, /#ffb900/);
  assert.match(linkedInCertificationLogo, /#0a66c2/);
  const assetNames = await readdir(new URL("../dist/client/assets/", import.meta.url));
  const pageBundleName = assetNames.find((name) => name.startsWith("page-") && name.endsWith(".js"));
  assert.ok(pageBundleName, "page bundle was not exported");
  const pageBundle = await readFile(new URL(`../dist/client/assets/${pageBundleName}`, import.meta.url), "utf8");
  assert.match(pageBundle, /https:\/\/manyewade\.com/);
  assert.match(pageBundle, /\/\?contact=sent/);
  assert.doesNotMatch(pageBundle, /localhost:3000/);
  await readFile(new URL("../dist/client/media/certifications/fema.png", import.meta.url));
  await readFile(new URL("../dist/client/media/manye-wade-headshot.png", import.meta.url));
  assert.equal((await readFile(new URL("../dist/client/CNAME", import.meta.url), "utf8")).trim(), "manyewade.com");
  for (const technologyLogo of ["aws.svg", "azure.svg", "gcp.svg", "wiz.svg", "docker.svg", "linux-mark.svg", "bash.svg", "jira.svg", "slack.svg"]) {
    await readFile(new URL(`../dist/client/media/skills/${technologyLogo}`, import.meta.url));
  }
  assert.doesNotMatch(html, /__VINEXT|\.rsc\?_rsc|type=["']module["']/);
});
