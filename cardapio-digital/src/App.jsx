import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import CategoryNav from './components/CategoryNav.jsx';
import ProductCard from './components/ProductCard.jsx';
import HighlightCard from './components/HighlightCard.jsx';
import ProductModal from './components/ProductModal.jsx';
import Cart from './components/Cart.jsx';
import CartItem from './components/CartItem.jsx';
import StoreInfoModal from './components/StoreInfoModal.jsx';
import CheckoutForm from './components/CheckoutForm.jsx';
import { categories, products, storeInfo } from './data.js';
import './App.css';
import { X } from 'lucide-react';

function App() {
  const [activeCategory, setActiveCategory] = useState('highlights');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [rating] = useState(storeInfo.rating ?? null);
  const featuredProducts = useMemo(() => products.filter((product) => product.featured).slice(0, 3), []);
  const navItems = useMemo(() => [
    ...(featuredProducts.length ? [{ id: 'highlights', name: 'Destaques' }] : []),
    ...categories.filter((category) => ['combos', 'bebidas', 'sobremesas'].includes(category.id)),
  ], [featuredProducts.length]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + storeInfo.deliveryFee;

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActiveCategory(visible[0].target.id);
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navItems]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 2200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function addToCart(product, quantity = 1, note = '') {
    const lineId = `${product.id}::${note}`;

    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.lineId === lineId);

      if (existing) {
        return currentCart.map((item) =>
          item.lineId === lineId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentCart, { ...product, lineId, quantity, note }];
    });
    setNotice(`${product.name} adicionado ao carrinho`);
  }

  function goToSection(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveCategory(sectionId);
  }

  function updateItemQuantity(lineId, delta) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.lineId === lineId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  return (
    <div className="app-shell">
      <Header store={storeInfo} rating={rating} onInfo={() => setInfoOpen(true)} />
      <CategoryNav
        items={navItems}
        activeCategory={activeCategory}
        onChange={goToSection}
      />

      <main className="main-layout">
        <section className="menu-panel">
          {featuredProducts.length > 0 && (
            <section id="highlights" className="category-section highlight-section">
              <div className="section-heading"><h2>Destaques</h2></div>
              <div className="highlights-carousel">
                {featuredProducts.map((product) => (
                  <HighlightCard key={product.id} product={product} onOpen={setSelected} onAdd={addToCart} />
                ))}
              </div>
            </section>
          )}

          {categories.filter((category) => navItems.some((item) => item.id === category.id)).map((category) => {
            const categoryProducts = products.filter(
              (product) => product.category === category.id
            );

            return (
              <div
                key={category.id}
                id={category.id}
                className="category-section"
              >
                <div className="section-heading">
                  <h2>{category.name}</h2>
                </div>

                <div className="product-grid">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpen={setSelected}
                      onAdd={addToCart}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </main>

      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
          onAdd={addToCart}
        />
      )}

      {infoOpen && <StoreInfoModal store={storeInfo} onClose={() => setInfoOpen(false)} />}

      {notice && <div className="cart-notice" role="status">{notice}</div>}

      {cart.length > 0 && (
        <CartItem items={cart} onClick={() => setIsCartOpen(true)} />
      )}

      {isCartOpen && (
        <div
          className="cart-modal-backdrop"
          role="presentation"
          onMouseDown={() => setIsCartOpen(false)}
        >
          <section
            className="cart-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="cart-modal-close"
              aria-label="Fechar carrinho"
              onClick={() => setIsCartOpen(false)}
            >
              <X />
            </button>
            <Cart
              items={cart}
              subtotal={subtotal}
              deliveryFee={storeInfo.deliveryFee}
              total={total}
              onUpdateQuantity={updateItemQuantity}
              onCheckout={() => setCheckoutOpen(true)}
            />
          </section>
        </div>
      )}

      {checkoutOpen && (
        <div className="cart-modal-backdrop" role="presentation" onMouseDown={() => setCheckoutOpen(false)}>
          <section className="cart-modal checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title" onMouseDown={(event) => event.stopPropagation()}>
            <button type="button" className="cart-modal-close" aria-label="Fechar finalização" onClick={() => setCheckoutOpen(false)}>×</button>
            <CheckoutForm items={cart} subtotal={subtotal} deliveryFee={storeInfo.deliveryFee} total={total} store={storeInfo} onClose={() => setCheckoutOpen(false)} />
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
