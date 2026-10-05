function ProductCard({ product, onAdd }) {
  const formatPrice = (value) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />

      <div className="product-body">
        <div className="product-header">
          <h3>{product.name}</h3>
          <span>{formatPrice(product.price)}</span>
        </div>

        <p>{product.description}</p>

        <button type="button" className="add-button" onClick={() => onAdd(product)}>
          Adicionar
        </button>
      </div>
    </article>
  );
}

export default ProductCard;