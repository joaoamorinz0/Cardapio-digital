export default function Header({ store, rating, onInfo }) {
  return (
    <section className="store-banner">
      <div
        className="store-cover"
        style={{ backgroundImage: `url(${store.cover})` }}
      />
      <div className="store-card">
        <img className="store-logo" src={store.logo} alt={`Logo ${store.name}`} />

        <div className="store-text">
          <h1>{store.name}</h1>
          <p>{store.tagline}</p>
          <p>{store.address}</p>
          

          {rating && (
            <p className="store-rating">
              ★ {rating.value.toFixed(1)} <small>({rating.count})</small>
              {rating.url && (
                <a href={rating.url} target="_blank" rel="noreferrer"> Google</a>
              )}
            </p>
          )}
        </div>

        <button type="button" className="info-btn" onClick={onInfo}>
          Mais Info
        </button>
      </div>
    </section>
  );
}