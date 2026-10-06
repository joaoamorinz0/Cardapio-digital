export default function StoreInfoModal({ store, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="store-info-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
      <div className="modal-content">
        <button type="button" className="modal-close" aria-label="Fechar" onClick={onClose}>×</button>
        <h2 id="store-info-title">{store.name}</h2>
        <p className="modal-description">{store.address}</p>

        <h4>Horário</h4>
        <p>{store.hours.open} às {store.hours.close}</p>

        <h4>Taxa de entrega</h4>
        <p>R$ {store.deliveryFee.toFixed(2).replace('.', ',')}</p>

        <h4>Formas de pagamento</h4>
        <ul className="modal-ingredients">
          {store.payments.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </div>
      </section>
    </div>
  );
}
