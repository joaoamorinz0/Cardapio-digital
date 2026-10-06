const formatPrice = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export default function ProductCard({ product, onOpen, onAdd }) {
  return (
    <article className="product-card">
      <button type="button" className="product-body" onClick={() => onOpen(product)}>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <span className="product-price">{formatPrice(product.price)}</span>
      </button>

      <button
        type="button"
        className="add-button"
        aria-label={`Adicionar ${product.name} ao carrinho`}
        onClick={() => onAdd(product)}
      >
        +
      </button>
    </article>
  );
}