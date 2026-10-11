import { Home, Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function BottomNav({ onHome, onSearch, onCart }) {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      <button type="button" className="bottom-nav-item" onClick={onHome}>
        <Home size={20} />
        <span>Início</span>
      </button>

      <button type="button" className="bottom-nav-item" onClick={onSearch}>
        <Search size={20} />
        <span>Buscar</span>
      </button>

      <button type="button" className="bottom-nav-item cart-nav-item" onClick={onCart}>
        <span className="nav-cart-wrap">
          <ShoppingCart size={20} />
          {itemCount > 0 && <em>{itemCount}</em>}
        </span>
        <span>Carrinho</span>
      </button>
    </nav>
  );
}
