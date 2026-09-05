# BSBI Synagogue

Mobile-first website for [Brith Sholom Beth Israel](https://www.bsbisynagogue.org), Charleston's Orthodox synagogue.

```
bsbi/
├── src/      # Next.js site (http://localhost:3000)
├── public/
└── studio/   # Sanity Studio (http://localhost:3333)
```

## Run locally

```bash
npm install && npm run dev
cd studio && pnpm install && pnpm dev
```

Or from the repo root:

```bash
npm run dev
npm run dev:studio
```

## Sanity

Project `3jfxxcrm`, dataset `production`, account `arbiserj@g.cofc.edu`.

Studio is standalone and login-gated. Locally it runs at http://localhost:3333. On the live site, `/studio` redirects to https://bsbisynagogue.sanity.studio (Sanity members only).

The public site reads published Studio documents. If a field is empty, the wording in `src/content` is used.

See `CMS-GUIDE.md`.
