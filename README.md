# Ma'Nye Wade — Portfolio

Source for [manyewade.com](https://manyewade.com), a static portfolio focused on cloud security, security automation, identity, vulnerability management, and DevSecOps.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

The local development server runs at `http://localhost:3000` by default.

## Verification

```bash
npm run lint
npm test
npm run security:audit
```

`npm test` builds the application and verifies the rendered portfolio, blog archive, article routes, static assets, contact form constraints, and production security metadata.

## GitHub Pages deployment

Pushes to `main` run `.github/workflows/deploy-pages.yml`. The workflow installs locked dependencies, renders every route to static HTML, and deploys `dist/client` to GitHub Pages. The default export targets the custom-domain root; set the repository variable `PAGES_BASE_PATH` to `/repository-name` only when publishing without a custom domain from a project repository.

For a custom domain, configure `manyewade.com` in the repository's Pages settings and enable **Enforce HTTPS** after DNS verification completes.

## Content structure

- `app/page.tsx` — portfolio content and project data
- `app/blog/posts.ts` — blog archive metadata
- `app/blog/*/page.tsx` — article pages
- `public/media` — published images and logos
- `public/writeups` — downloadable project write-ups
- `public/static.js` — interactions for the exported static site

## Security model

The production site is static and has no application database or server-side query interface. The contact form posts over HTTPS to FormSubmit with browser validation, fixed inquiry values, field-length limits, and a honeypot. Exported pages include a restrictive Content Security Policy and referrer policy.

Owner: Ma'Nye Wade
