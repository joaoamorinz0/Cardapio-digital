function getScheduleText(hours) {
  if (Array.isArray(hours) && hours.length > 0) {
    const current = hours.find((entry) => entry.day === new Date().getDay());
    if (current && current.open && current.close) {
      return `${current.open} às ${current.close}`;
    }

    const first = hours.find((entry) => entry.open && entry.close);
    return first ? `${first.open} às ${first.close}` : 'Horário indisponível';
  }

  if (hours && hours.open && hours.close) {
    return `${hours.open} às ${hours.close}`;
  }

  return 'Horário indisponível';
}

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
          <p className="modal-description">{getScheduleText(store.hours)}</p>

          <h4>Taxa de entrega</h4>
          <p className="modal-description">
            {store.deliveryFee ? `R$ ${Number(store.deliveryFee).toFixed(2).replace('.', ',')}` : 'Grátis'}
          </p>

          <h4>Formas de pagamento</h4>
          <ul className="modal-ingredients">
            {(store.payments ?? []).map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </section>
    </div>
  );
}
