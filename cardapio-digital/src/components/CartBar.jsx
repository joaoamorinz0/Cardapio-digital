import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { formatMoney } from '../utils/money.js';

export default function CartBar({ onOpenCart, onCheckout }) {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (itemCount === 0) return null;

  return (
    <div className="cart-bar">
      <button type="button" className="cart-bar-summary" onClick={onOpenCart}>
        <span className="mini-cart-icon">
          <ShoppingCart size={18} />
          <em>{itemCount}</em>
        </span>
        <span className="mini-cart-copy">
          <strong>{formatMoney(subtotal)}</strong>
          <small>Ver carrinho</small>
        </span>
      </button>

      <button type="button" className="cart-bar-checkout" onClick={onCheckout}>
        Finalizar pedido
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
