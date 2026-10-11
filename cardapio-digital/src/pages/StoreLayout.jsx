import { Outlet, useParams } from 'react-router-dom';
import { CartProvider } from '../context/CartContext.jsx';
import { MenuProvider } from '../context/MenuContext.jsx';
import { useMenu } from '../hooks/useMenu.js';

export default function StoreLayout() {
  const { slug } = useParams();
  const { status, menu } = useMenu(slug);

  if (status === 'loading') {
    return <main className="app-shell"><p>Carregando cardápio...</p></main>;
  }

  if (status === 'notfound') {
    return <main className="app-shell"><p>Cardápio não encontrado</p></main>;
  }

  if (status === 'error' || !menu) {
    return <main className="app-shell"><p>Não foi possível carregar o cardápio.</p></main>;
  }

  return (
    <MenuProvider value={menu}>
      <CartProvider key={slug} slug={slug}>
        <Outlet />
      </CartProvider>
    </MenuProvider>
  );
}
