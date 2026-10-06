import { useState } from "react";

const formatPrice = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export default function ProductModal({ product, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  const handleAdd = () => {
  onAdd(product, qty, note.trim());
  onClose();
};

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
      <div className="modal-content">
        <button type="button" className="modal-close" aria-label="Fechar" onClick={onClose}>
          ×
        </button>

        {product.image && (
          <img src={product.image} alt={product.name} className="modal-image" />
        )}

        <h2 id="product-modal-title">{product.name}</h2>
        <p className="modal-description">{product.description}</p>

        {product.ingredients?.length > 0 && (
          <>
            <h4>Ingredientes</h4>
            <ul className="modal-ingredients">
              {product.ingredients.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        )}

        <label className="modal-note">
          Observações
          <textarea
            rows={2}
            maxLength={140}
            placeholder="Ex.: sem açúcar, pouco gelo..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>

        <div className="modal-footer">
          <div className="qty">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuir">–</button>
            <span>{qty}</span>
            <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Aumentar">+</button>
          </div>
          <button type="button" className="modal-add" onClick={handleAdd}>
            Adicionar · {formatPrice(product.price * qty)}
          </button>
        </div>
      </div>
      </section>
    </div>
  );
}
