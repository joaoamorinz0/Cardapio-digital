import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/global.css';
import './index.css';
import StoreLayout from './pages/StoreLayout.jsx';
import MenuPage from './pages/MenuPage.jsx';
import Checkout from './pages/Checkout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cardapio/big-burguer-lanches" replace />} />
        <Route path="/cardapio/:slug" element={<StoreLayout />}>
          <Route index element={<MenuPage />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route path="*" element={<Navigate to="/cardapio/big-burguer-lanches" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
