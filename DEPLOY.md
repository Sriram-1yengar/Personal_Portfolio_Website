# Deploying to GitHub Pages + sriramiyengar.me

The build/publish is automated by `.github/workflows/deploy.yml` (runs on every
push to `main`). You do the one-time setup below once.

## 1. Turn on GitHub Pages (Actions source)

Repo → **Settings → Pages**:

- **Source:** *GitHub Actions* (not "Deploy from a branch")

That's it — the workflow already handles build + upload + deploy.

## 2. Add the custom domain

Still on **Settings → Pages**:

- **Custom domain:** `sriramiyengar.me` → Save
  (the repo already contains `public/CNAME` with this value, so this mostly just
  triggers GitHub's DNS check)
- Leave **Enforce HTTPS** unchecked until the certificate is issued (can take a
  few minutes to ~24h), then check it.

## 3. DNS at your registrar (where you bought sriramiyengar.me)

Create these records. Apex (`sriramiyengar.me`) needs A + AAAA records pointing
at GitHub's Pages IPs; `www` is a CNAME.

| Type  | Host / Name | Value                     |
|-------|-------------|---------------------------|
| A     | `@`         | `185.199.108.153`         |
| A     | `@`         | `185.199.109.153`         |
| A     | `@`         | `185.199.110.153`         |
| A     | `@`         | `185.199.111.153`         |
| AAAA  | `@`         | `2606:50c0:8000::153`     |
| AAAA  | `@`         | `2606:50c0:8001::153`     |
| AAAA  | `@`         | `2606:50c0:8002::153`     |
| AAAA  | `@`         | `2606:50c0:8003::153`     |
| CNAME | `www`       | `sriram-1yengar.github.io.` |

Delete any pre-existing parking-page A records for `@` first. DNS propagation is
usually minutes but can take up to a day.

Verify from a terminal once it propagates:

```bash
dig +short sriramiyengar.me
dig +short www.sriramiyengar.me
```

## 4. Ship it

Merge `redesign-astro` into `main` (or push to `main`). Watch the run under the
repo's **Actions** tab. When it's green and DNS resolves, the site is live at
https://sriramiyengar.me.

## Notes

- `astro.config.mjs` has `site: 'https://sriramiyengar.me'` — keep it in sync with
  the domain (used for canonical URLs + sitemap).
- No `base` path is set because a custom domain serves from the root.
- If you ever remove the custom domain, set `base: '/Personal_Portfolio_Website'`
  in `astro.config.mjs` so assets resolve on `sriram-1yengar.github.io/...`.
