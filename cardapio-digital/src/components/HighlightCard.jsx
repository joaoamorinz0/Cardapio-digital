const formatPrice = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default function HighlightCard({ product, onOpen, onAdd }) {
  return (
    <article className="highlight-card">
      <button type="button" className="highlight-content" onClick={() => onOpen(product)}>
        {product.image && <img src={product.image} alt="" />}
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <strong>{formatPrice(product.price)}</strong>
      </button>
      <button
        type="button"
        className="highlight-add"
        aria-label={`Adicionar ${product.name} ao carrinho`}
        onClick={() => onAdd(product)}
      >
        +
      </button>
    </article>
  );
}
