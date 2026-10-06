import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabasePublishableKey
);

// Only the project URL and the public/publishable key may be used in this client.
// Never put a service_role or secret key in a VITE_ environment variable.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null;

export function getSupabaseClient() {
  if (!supabase) {
    console.warn(
      'Supabase ainda não foi configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY em .env.local.'
    );
  }

  return supabase;
}

export async function getProducts() {
  const client = getSupabaseClient();

  if (!client) {
    return {
      data: null,
      error: new Error('Supabase não configurado.'),
    };
  }

  return client
    .from('products')
    .select('*')
    .order('category')
    .order('name');
}
