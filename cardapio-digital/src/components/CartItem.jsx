import { ShoppingCart } from "lucide-react";

function CartButton({ items, onClick }) {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <button
      type="button"
      className="cart-button"
      onClick={onClick}
      aria-label={`Abrir carrinho, ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`}
    >
      <ShoppingCart size={20} strokeWidth={1.75} aria-hidden="true" />
      <span className="cart-count">{itemCount}</span>
    </button>
  );
}

export default CartButton;
