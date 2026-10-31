# Mitch's Mercedes

Repair, recall and history tracker for a Mercedes-Benz shop.

    cd mitchs-mercedes && npm install && npm run dev

- Vehicles with year/model/engine/transmission/etc. dropdowns, VIN decode (NHTSA vPIC)
- Repair orders per vehicle (category, status, parts, labor, payment)
- Recalls per vehicle, pulled from NHTSA by year/model, tracked Open → Completed
- Backup tab: JSON backup/restore, CSV export, demo data

## Storage modes

- **Local mode** (default, no config): data lives in this browser only.
- **Shared mode** (Supabase): staff sign in with email + password and everyone sees the same data.
  The app refreshes every 30 seconds and when the window regains focus.

## Turning on shared mode

1. Create a free project at supabase.com.
2. SQL Editor → New query → paste `supabase/schema.sql` → Run.
3. **Authentication → Sign In / Providers → Email: turn OFF "Allow new users to sign up".**
   Otherwise anyone who finds the site could create an account and read customer data.
4. Authentication → Users → Add user (create Mitch and each staff member with an email and password).
5. Project Settings → API: copy the Project URL and the `anon` public key.
6. GitHub repo → Settings → Secrets and variables → Actions → **Variables** tab → add
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then re-run the Deploy workflow.
   (For local dev, put the same two in `mitchs-mercedes/.env.local`.)

The anon key is meant to be public; the database rules (row-level security) only let signed-in users in.
Never put the `service_role` key anywhere in this app.

Existing local data is not migrated automatically: use Backup → Download Backup before switching, sign in,
then Backup → Restore Backup to load it into the shared database.
