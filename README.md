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

Astro generates the static site in `dist/`. Netlify deployment and security headers are configured in `netlify.toml`.
