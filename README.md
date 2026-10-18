# PAOZ Victory Tabernacle Chikanga

React + Vite website with a built-in admin panel for editing all site content.
Content lives in Supabase (Postgres); the site falls back to bundled defaults
when Supabase is not configured, so it always renders.

## Run locally

```bash
pnpm install
pnpm dev      # http://localhost:5173
```

## Connect Supabase (enables the admin panel)

1. Create a free project at <https://supabase.com>.
2. Copy `.env.example` to `.env` and paste in **Settings → API → Project URL**
   and **anon public** key.
3. Open the **SQL Editor** and run the whole of `supabase/schema.sql`. This
   creates the tables, enables row level security and creates the public
   `site-assets` storage bucket.
4. Create your login: **Authentication → Users → Add user** (tick
   *Auto Confirm User*).
5. Grant yourself admin rights by running this in the SQL editor:

   ```sql
   insert into public.admins (id, email)
   select id, email from auth.users where email = 'you@example.com';
   ```

6. Restart `pnpm dev` and open <http://localhost:5173/admin>.

Anyone signed in with an account that is **not** in the `admins` table is
rejected — Supabase's anon key cannot write content without an `admins` row.

## What you can edit from `/admin`

| Tab | Controls |
| --- | --- |
| Church Settings | Name, phone, WhatsApp, Facebook, address, map embed, copyright |
| Navigation | Header links and the "Give Online" button label |
| Hero | Headline, subtitle, buttons, background image, floating info card |
| Services (headings) | Text above the service cards |
| About | Who-we-are copy, image, corner badge |
| Mission (headings) | Headings above the pillar cards |
| Scripture slider (headings) | Headings above the slider |
| Events (headings) | Section headings and calendar card text |
| Today's Message | Sermon title, key scripture, body, image |
| Visit Us | Map section headings |
| Giving (headings) | Donation section intro and footnote |
| Footer | Blurb, all column headings, newsletter text, legal links |
| Service Times | Add/remove/reorder service day cards (also fills footer hours) |
| Mission Pillars | Add/remove/reorder mission cards |
| Scripture Slider | Add/remove/reorder scripture slides |
| Events | Add/remove/reorder events, upload posters, toggle the poster card |
| Giving Methods | Bank / EcoCash / WhatsApp details |

Every section has its own **Save** button, so nothing is written until you press
it, and a page a visitor is already reading never changes under them. Changes
appear the next time someone loads the site. Image fields accept an uploaded file
(goes to the `site-assets` bucket), a pasted URL, or one of the bundled assets.

## Donations

Manual methods only — no payment gateway is integrated. The Giving section shows
the details you enter under *Giving Methods* (bank account, EcoCash, WhatsApp).
A hosted checkout (Paystack or Flutterwave) can be added later behind the same
Giving section once you have a registered merchant account.

## Notes

- `pnpm build` fails on this machine with pnpm's ignored-build-scripts check.
  Run `./node_modules/.bin/vite build` directly, or approve esbuild once with
  `pnpm approve-builds`.
- For static hosting, `/admin` needs an SPA rewrite. `netlify.toml` covers
  Netlify. Other hosts need an equivalent rule.
- Supabase is Postgres only — it cannot be pointed at MySQL or MongoDB.