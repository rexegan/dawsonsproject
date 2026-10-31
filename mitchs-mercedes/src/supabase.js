import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// The anon key is public by design; access is enforced by row-level security (see supabase/schema.sql).
// With no config the app runs in local mode, saving to this browser only.
export const supabase = url && key ? createClient(url, key) : null
