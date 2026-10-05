
import { useState } from 'react';
import Header from './components/Header.jsx';
import CategoryNav from './components/CategoryNav.jsx';
import ProductCard from './components/ProductCard.jsx';
import Cart from './components/Cart.jsx';
import { categories, products, storeInfo } from './data.js';
import './App.css';

function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [cart, setCart] = useState([
    { id: 1, name: 'X-Bacon', price: 26.9, quantity: 1 },
  ]);

  const visibleProducts = products.filter(
    (product) => product.category === activeCategory
  );

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + storeInfo.deliveryFee;

  function addToCart(product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function updateItemQuantity(productId, delta) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  return (
    <div className="app-shell">
      <Header store={storeInfo} />
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      <main className="main-layout">
        <section className="menu-panel">
          {categories.map((category) => {
            const categoryProducts = products.filter(
              (product) => product.category === category.id
            );

            return (
              <div
                key={category.id}
                id={category.id}
                className={`category-section ${
                  activeCategory === category.id ? 'is-active' : ''
                }`}
              >
                <div className="section-heading">
                  <h2>{category.name}</h2>
                </div>

                <div className="product-grid">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAdd={addToCart}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <aside className="cart-panel">
          <Cart
            items={cart}
            subtotal={subtotal}
            deliveryFee={storeInfo.deliveryFee}
            total={total}
            onUpdateQuantity={updateItemQuantity}
          />
        </aside>
      </main>
    </div>
  );
}

export default App;
