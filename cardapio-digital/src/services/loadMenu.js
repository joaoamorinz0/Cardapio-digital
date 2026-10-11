import { storeInfo, categories, products } from '../data.js';
import { fetchMenu } from './menu.js';
import { isSupabaseConfigured } from './supabase.js';

const mockMenu = { storeInfo, categories, products };

export async function loadMenu(slug) {
  const useMock = import.meta.env.VITE_USE_MOCK === 'true' || !isSupabaseConfigured;
  const source = useMock ? 'mock' : 'supabase';

  if (import.meta.env.DEV) {
    console.info(`[menu] fonte: ${source}`);
  }

  if (useMock) {
    return mockMenu;
  }

  return fetchMenu(slug);
}
