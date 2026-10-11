
export default function Header({ store, onInfo }) {
  return (
    <section className="store-banner">
      <div
        className="store-cover"
        style={{ backgroundImage: `url(${store.cover})` }}
      />
      <div className="store-card">
        <img className="store-logo" src={store.logo} alt={`Logo ${store.name}`} />

        <button type="button" className="info-btn" onClick={onInfo}>
          Mais Info
        </button>
      </div>
    </section>
  );
}