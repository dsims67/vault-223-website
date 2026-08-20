# Vault 223 Website

Mobile-first website for Vault 223, a café in downtown Kokomo, Indiana.

## Development

Requirements:

- Node.js 24
- pnpm 11

```bash
pnpm install
pnpm dev
```

## Quality checks

```bash
pnpm test
pnpm build
```

## Deployment

Astro generates the static site in `dist/`. Pushes to `main` are built and deployed to GitHub Pages by `.github/workflows/deploy.yml`.

The production URL is `https://vault223.com`. GitHub Pages must use **GitHub Actions** as its publishing source rather than the legacy Jekyll branch build.
