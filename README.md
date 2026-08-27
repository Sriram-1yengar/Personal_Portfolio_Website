# sriramiyengar.me

Personal portfolio for Sriram Iyengar. Built with [Astro](https://astro.build)
(static output) + a React island for the work index. Deployed free on GitHub
Pages with a custom domain.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output -> dist/
npm run preview    # serve the built site
```

Node 20+ required.

## Project structure

```
src/
  layouts/Base.astro        page shell: <head>, header, footer, theme, reveal
  components/                Header, Footer, Hero, StatStrip, WorkIndex (React),
                             ExperienceList, Recommendations, Contact
  content/work/*.mdx         one file per case study (frontmatter + body)
  content.config.ts          schema for the work collection
  data/                      experience.ts, recommendations.ts (edit these)
  pages/
    index.astro              the single landing page (all sections)
    work/[...slug].astro     generated case-study pages
    404.astro
  styles/tokens.css          design tokens (color, type, spacing) + dark palette
  styles/global.css          reset + primitives
  site.ts                    name, url, email, socials, nav, resume link
public/
  CNAME                      custom domain (sriramiyengar.me)
  favicon.svg, robots.txt, .nojekyll
.github/workflows/deploy.yml  build + publish to GitHub Pages on push to main
```

## Editing content

- **Experience / education / certs** — `src/data/experience.ts`
- **Recommendations** — `src/data/recommendations.ts`
- **Projects** — add or edit `src/content/work/<slug>.mdx`. Frontmatter fields are
  defined in `src/content.config.ts` (`title`, `summary`, `year`, `role`,
  `status`, `tags`, `stack`, `links`, `metrics`, `order`). The body is Markdown.
  Files marked `TODO(sriram)` need real links / metrics before launch.
- **Name, email, socials, resume URL** — `src/site.ts`
- **Colors / type / spacing** — `src/styles/tokens.css`

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages. First-time setup steps (Pages source, DNS)
are in `DEPLOY.md`.
