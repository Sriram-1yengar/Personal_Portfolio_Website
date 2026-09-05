# sriramiyengar.me

My personal site — I build ML and AI systems that solve real problems, for
businesses and for people. This repo is the site. It's live at
[sriramiyengar.me](https://sriramiyengar.me).

I'm a data scientist / ML engineer based in Bangalore, with ~3 years shipping
machine learning models, GenAI pipelines, and automation systems across
healthcare, fintech, and energy. I built deep-learning anomaly detection on
healthcare claims data at Certilytics (helped health plans save $20M+), and
these days I run independent AI consulting — LLM pipelines and automation work
for fintech and energy clients — because it lets me work across more problems,
faster, than one role would.

## What's on the site

- **Selected work** — personal projects where I owned the whole thing: data,
  model, and the interface someone actually uses.
- **Experience** — where I've worked, plus education and certifications.
- **About** — the short version, work and otherwise.
- **Recommendations** — what colleagues have said.
- **Contact** — the ways to reach me.

## Find me

- GitHub — [@Sriram-1yengar](https://github.com/Sriram-1yengar)
- LinkedIn — [in/sriramiyengar2001](https://linkedin.com/in/sriramiyengar2001/)
- Email — [sriramkiyengar@gmail.com](mailto:sriramkiyengar@gmail.com)

---

## Running it locally

Built with [Astro](https://astro.build) (static output) plus a React island for
the work index, deployed free on GitHub Pages with a custom domain.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output -> dist/
npm run preview    # serve the built site
```

Node 20+ required.

### Editing content

- **Experience / education / certs** — `src/data/experience.ts`
- **Recommendations** — `src/data/recommendations.ts`
- **Projects** — add or edit `src/content/work/<slug>.mdx`. Frontmatter fields
  are defined in `src/content.config.ts` (`title`, `summary`, `year`, `role`,
  `status`, `tags`, `stack`, `links`, `metrics`, `order`); the body is Markdown.
- **Name, email, socials, resume URL** — `src/site.ts`
- **Colors / type / spacing** — `src/styles/tokens.css`

### Project structure

```
src/
  layouts/Base.astro        page shell: <head>, header, footer, theme, reveal
  components/                Header, Footer, Hero, StatStrip, WorkIndex (React),
                             ExperienceList, Recommendations, Contact
  content/work/*.mdx         one file per case study (frontmatter + body)
  content.config.ts          schema for the work collection
  data/                      experience.ts, recommendations.ts
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

### Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages. First-time setup (Pages source, DNS) is
in `DEPLOY.md`.
