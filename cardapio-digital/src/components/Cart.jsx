function Cart({ items, subtotal, deliveryFee, total, onUpdateQuantity }) {
  const formatPrice = (value) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  return (
    <div className="cart-box">
      <h3>Seu pedido</h3>

      {items.length === 0 ? (
        <p className="empty-cart">Seu carrinho está vazio.</p>
      ) : (
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <strong>{item.name}</strong>
                <small>{formatPrice(item.price)}</small>
              </div>

              <div className="qty-controls">
                <button type="button" onClick={() => onUpdateQuantity(item.id, -1)}>
                  −
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => onUpdateQuantity(item.id, 1)}>
                  +
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

      <button type="button" className="checkout-button">
        Continuar pedido
      </button>
    </div>
  );
}

export default Cart;