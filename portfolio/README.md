# UNRAVEL Portfolio

Xiaoyuan “Reginald” Zhang's portfolio connecting computational psychiatry, biostatistics, clinical and real-world data, Safety Science, and intelligent health systems.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build:cloudflare
```

The static site is written to `dist/client/`.

## Cloudflare Pages

The repository is ready for either Git integration or direct upload:

- Framework preset: `Vite`
- Build command: `npm run build:cloudflare`
- Output directory: `dist/client`
- Root directory, when this project is stored inside another repository: `portfolio`

For an authenticated direct upload:

```bash
npm run deploy:cloudflare
```

The Vercel configuration remains available as a fallback; Cloudflare Pages is the preferred public deployment for this version.
