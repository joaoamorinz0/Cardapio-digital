export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};

export function getSupabaseClient() {
  if (!supabaseConfig.url || !supabaseConfig.anonKey) {
    console.warn('Supabase ainda não foi configurado. Defina as variáveis de ambiente do projeto.');
    return null;
  }

  return supabaseConfig;
}

export async function getProducts() {
  return [];
}
