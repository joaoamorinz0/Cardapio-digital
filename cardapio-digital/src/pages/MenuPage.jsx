import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import Header from '../components/Header.jsx';
import CategoryNav from '../components/CategoryNav.jsx';
import ProductCard from '../components/ProductCard.jsx';
import HighlightCard from '../components/HighlightCard.jsx';
import ProductModal from '../components/ProductModal.jsx';
import Cart from '../components/Cart.jsx';
import CartItem from '../components/CartItem.jsx';
import StoreInfoModal from '../components/StoreInfoModal.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useStore } from '../context/MenuContext.jsx';
import '../App.css';

export default function MenuPage() {
  const { storeInfo, categories, products } = useStore();
  const { items, addToCart, updateItemQuantity, subtotal } = useCart();
  const [activeCategory, setActiveCategory] = useState('highlights');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const featuredProducts = useMemo(() => products.filter((product) => product.featured).slice(0, 3), [products]);
  const navItems = useMemo(() => [
    ...(featuredProducts.length ? [{ id: 'highlights', name: 'Destaques' }] : []),
    ...categories,
  ], [categories, featuredProducts.length]);
  const deliveryFee = storeInfo.deliveryFee ?? 0;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length) setActiveCategory(visible[0].target.id);
    }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navItems]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 2200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const handleAddToCart = (product, quantity, note) => {
    addToCart(product, quantity, note);
    setNotice(`${product.name} adicionado ao carrinho`);
  };

  const goToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveCategory(sectionId);
  };

  return (
    <div className="app-shell">
      <Header store={storeInfo} rating={storeInfo.rating ?? null} onInfo={() => setInfoOpen(true)} />
      <CategoryNav items={navItems} activeCategory={activeCategory} onChange={goToSection} />
      <main className="main-layout"><section className="menu-panel">
        {featuredProducts.length > 0 && <section id="highlights" className="category-section highlight-section"><div className="section-heading"><h2>Destaques</h2></div><div className="highlights-carousel">{featuredProducts.map((product) => <HighlightCard key={product.id} product={product} onOpen={setSelected} onAdd={handleAddToCart} />)}</div></section>}
        {categories.map((category) => {
          const categoryProducts = products.filter((product) => product.category === category.id);
          return <section key={category.id} id={category.id} className="category-section"><div className="section-heading"><h2>{category.name}</h2></div><div className="product-grid">{categoryProducts.map((product) => <ProductCard key={product.id} product={product} onOpen={setSelected} onAdd={handleAddToCart} />)}</div></section>;
        })}
      </section></main>
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={handleAddToCart} />}
      {infoOpen && <StoreInfoModal store={storeInfo} onClose={() => setInfoOpen(false)} />}
      {notice && <div className="cart-notice" role="status">{notice}</div>}
      {items.length > 0 && <CartItem items={items} onClick={() => setIsCartOpen(true)} />}
      {isCartOpen && <div className="cart-modal-backdrop" role="presentation" onMouseDown={() => setIsCartOpen(false)}><section className="cart-modal" role="dialog" aria-modal="true" aria-labelledby="cart-modal-title" onMouseDown={(event) => event.stopPropagation()}><button type="button" className="cart-modal-close" aria-label="Fechar carrinho" onClick={() => setIsCartOpen(false)}><X /></button><Cart items={items} subtotal={subtotal} deliveryFee={deliveryFee} total={total} onUpdateQuantity={updateItemQuantity} onCheckout={() => setIsCartOpen(false)} /></section></div>}
    </div>
  );
}
