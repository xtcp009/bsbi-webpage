# Sanity CMS

The office editor is Studio. It is a separate app from the public website, and it is login-gated: only people invited to the Sanity project can sign in.

```bash
npm run dev:studio
```

Locally, open http://localhost:3333 (the site also sends `/studio` there). Sign in with `arbiserj@g.cofc.edu`.

On the live site, `/studio` does not host the editor. It redirects to https://bsbisynagogue.sanity.studio, which requires that same Sanity login. Search engines are told to skip `/studio`.

Deploy or update the hosted Studio from `studio/`:

```bash
npx sanity deploy
```

The free Sanity plan is enough for this site. Invite office editors as **Administrator** (the free plan has Administrator and Viewer only; Viewers cannot change words). After they publish, wait about 30 seconds and refresh the public site.

Times, eruv **status**, and candle lighting still come from ShulCloud and Hebcal.

## Upload a flyer

1. Click **Flyers**.
2. Click **Create**.
3. Drop in the flyer picture. The words can stay in the image.
4. Type a short **Name**, such as Lunch and Learn.
5. Leave **Show on the website?** set to Yes.
6. Click **Publish**.

The flyer appears large under **This week** on the homepage and the Community page. Weekly classes stay in their own section and are not replaced.

If you later hide or delete every flyer, the **This week** section comes down. Class pictures stay as they are.

Optional: set **Hide after this date** for a one-time event so it comes down by itself.

## Change website words

1. Click **Website words**.
2. Open the page you want, such as **Visit** or **Mikvah**.
3. Edit the labeled boxes. You do not need to know code.
4. Click **Publish**.

Each page form already has the current wording filled in. Empty boxes fall back to the previous text on the site.

## Other edits

Under **More** you can still change announcements, extra events, class details, the photo gallery, and staff.

The Next app reads published content with `SANITY_API_READ_TOKEN` in `.env.local` (gitignored).
