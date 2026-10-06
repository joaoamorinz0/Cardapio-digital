import { Plus } from 'lucide-react';
import { Minus } from 'lucide-react';

function Cart({ items, subtotal, deliveryFee, total, onUpdateQuantity, onCheckout }) {
  const formatPrice = (value) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  return (
    <div className="cart-box">
      <h3 id="cart-modal-title">Seu pedido</h3>

      {items.length === 0 ? (
        <p className="empty-cart">Seu carrinho está vazio.</p>
      ) : (
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.lineId} className="cart-item">
              <div>
                <strong>{item.name}</strong>
                <small>{formatPrice(item.price)}</small>
                {item.note && <small>Obs.: {item.note}</small>}
              </div>

              <div className="qty-controls">
                <button
                  type="button"
                  aria-label={`Diminuir ${item.name}`}
                  onClick={() => onUpdateQuantity(item.lineId, -1)}
                >
                  <Minus />
                </button>
                <span aria-label={`Quantidade: ${item.quantity}`}>
                  {item.quantity}
                </span>
                <button
                  type="button"
                  aria-label={`Aumentar ${item.name}`}
                  onClick={() => onUpdateQuantity(item.lineId, 1)}
                >
                  <Plus />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="summary">
        <div>
          <span>Subtotal</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>
        <div>
          <span>Entrega</span>
          <strong>{formatPrice(deliveryFee)}</strong>
        </div>
        <div className="total-row">
          <span>Total</span>
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>

      <button type="button" className="checkout-button" disabled={items.length === 0} onClick={onCheckout}>
        Continuar pedido
      </button>
    </div>
  );
}

export default Cart;
