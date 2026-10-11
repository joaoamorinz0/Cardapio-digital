import { useEffect, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CategoryNav from '../components/CategoryNav.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProductModal from '../components/ProductModal.jsx';
import StoreInfoModal from '../components/StoreInfoModal.jsx';
import Cart from '../components/Cart.jsx';
import StoreHeader from '../components/StoreHeader.jsx';
import InfoPills from '../components/InfoPills.jsx';
import SearchBar from '../components/SearchBar.jsx';
import PromoBanner from '../components/PromoBanner.jsx';
import CartBar from '../components/CartBar.jsx';
import BottomNav from '../components/BottomNav.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useStore } from '../context/MenuContext.jsx';
import '../App.css';

const normalizeText = (value = '') =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function MenuPage() {
  const { storeInfo, categories, products } = useStore();
  const { items, addToCart, updateItemQuantity, subtotal } = useCart();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const navItems = useMemo(
    () => [{ id: 'all', name: 'Todos' }, ...categories.map((category) => ({ id: category.id, name: category.name }))],
    [categories],
  );

  const featuredProducts = useMemo(
    () => products.filter((product) => product.featured).slice(0, 4),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const term = normalizeText(searchText.trim());

    if (!term) {
      return products;
    }

    return products.filter((product) =>
      normalizeText(`${product.name} ${product.description ?? ''}`).includes(term),
    );
  }, [products, searchText]);

  const searchGroups = useMemo(
    () => categories
      .filter((category) => filteredProducts.some((product) => product.category === category.id))
      .map((category) => ({
        ...category,
        items: filteredProducts.filter((product) => product.category === category.id),
      })),
    [categories, filteredProducts],
  );

  const deliveryFee = storeInfo.deliveryFee ?? 0;
  const total = subtotal + deliveryFee;
  const showSearchResults = searchText.trim().length > 0;

  useEffect(() => {
    if (!categories.length) return undefined;

    const sections = categories
      .map((category) => document.getElementById(category.id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) {
          setActiveCategory(visible[0].target.id);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0.1 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 2200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const handleAddToCart = (product, quantity = 1, note = '') => {
    addToCart(product, quantity, note);
    setNotice(`${product.name} adicionado ao carrinho`);
  };

  const goToSection = (sectionId) => {
    if (sectionId === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveCategory('all');
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveCategory(sectionId);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate(`/cardapio/${storeInfo.slug}/checkout`);
  };

  return (
    <>
      <div className="app-shell menu-page">
        <StoreHeader onInfo={() => setInfoOpen(true)} />
        <InfoPills />
        <SearchBar value={searchText} onChange={setSearchText} inputRef={searchInputRef} />
        <CategoryNav items={navItems} activeCategory={activeCategory} onChange={goToSection} />

        {showSearchResults ? (
          <section className="search-results">
            {searchGroups.length > 0 ? (
              searchGroups.map((category) => (
                <div key={category.id} className="category-section">
                  <div className="section-heading">
                    <h2>{category.name}</h2>
                  </div>
                  <div className="product-grid">
                    {category.items.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onOpen={setSelected}
                        onAdd={handleAddToCart}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-state">Nenhum item encontrado</p>
            )}
          </section>
        ) : (
          <>
            {Array.isArray(storeInfo.banners) && storeInfo.banners.length > 0 && <PromoBanner />}

            {featuredProducts.length > 0 && (
              <section className="featured-section">
                <div className="section-heading featured-heading">
                  <h2>Mais pedidos</h2>
                  <button type="button" className="section-link" onClick={() => goToSection(categories[0]?.id ?? 'all')}>
                    Ver todos
                  </button>
                </div>

                <div className="featured-grid">
                  {featuredProducts.map((product) => (
                    <article key={product.id} className={`featured-card ${product.image ? 'with-image' : 'text-only'}`}>
                      {product.image && (
                        <img src={product.image} alt={product.name} />
                      )}

                      <div className="featured-card-body">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <div className="featured-card-footer">
                          <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</strong>
                          <button type="button" aria-label={`Adicionar ${product.name}`} onClick={() => handleAddToCart(product)}>
                            +
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {categories.map((category) => {
              const categoryProducts = filteredProducts.filter((product) => product.category === category.id);

              if (categoryProducts.length === 0) {
                return null;
              }

              return (
                <section key={category.id} id={category.id} className="category-section">
                  <div className="section-heading">
                    <h2>{category.name}</h2>
                  </div>
                  <div className="product-grid">
                    {categoryProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onOpen={setSelected}
                        onAdd={handleAddToCart}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </>
        )}

        {selected && (
          <ProductModal
            product={selected}
            onClose={() => setSelected(null)}
            onAdd={handleAddToCart}
          />
        )}

        {infoOpen && <StoreInfoModal store={storeInfo} onClose={() => setInfoOpen(false)} />}
        {notice && <div className="cart-notice" role="status">{notice}</div>}
      </div>

      {isCartOpen && (
        <div className="cart-modal-backdrop" role="presentation" onMouseDown={() => setIsCartOpen(false)}>
          <section
            className="cart-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button type="button" className="cart-modal-close" aria-label="Fechar carrinho" onClick={() => setIsCartOpen(false)}>
              <X />
            </button>
            <Cart
              items={items}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              onUpdateQuantity={updateItemQuantity}
              onCheckout={handleCheckout}
            />
          </section>
        </div>
      )}

      <CartBar onOpenCart={() => setIsCartOpen(true)} onCheckout={handleCheckout} />
      <BottomNav
        onHome={() => goToSection('all')}
        onSearch={() => searchInputRef.current?.focus()}
        onCart={() => setIsCartOpen(true)}
      />
    </>
  );
}
