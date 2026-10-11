import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { CartProvider } from '../context/CartContext.jsx';
import { MenuProvider } from '../context/MenuContext.jsx';
import { categories, products, storeInfo } from '../data.js';
import { fetchMenu } from '../services/menu.js';
import { isSupabaseConfigured } from '../services/supabase.js';

const mockMenu = { storeInfo, categories, products };

export default function StoreLayout() {
  const { slug } = useParams();
  const [menu, setMenu] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const loadMenu = async () => {
      try {
        const useMock = import.meta.env.VITE_USE_MOCK === 'true' || !isSupabaseConfigured;
        const result = useMock ? mockMenu : await fetchMenu(slug);

        if (!result) throw new Error('Estabelecimento não encontrado.');
        if (active) setMenu(result);
      } catch (loadError) {
        if (active) setError(loadError);
      }
    };

    loadMenu();
    return () => { active = false; };
  }, [slug]);

  if (error) return <main className="app-shell"><p>Não foi possível carregar o cardápio.</p></main>;
  if (!menu) return <main className="app-shell"><p>Carregando cardápio...</p></main>;

  return (
    <MenuProvider value={menu}>
      <CartProvider key={slug} slug={slug}>
        <Outlet />
      </CartProvider>
    </MenuProvider>
  );
}
