import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import ShoppingCart from './pages/ShoppingCart';
import Chatbot from './components/Chatbot';
import Login from './pages/Login';
import Register from './pages/Register';
import useScrollToTop from './hooks/useScrollToTop';
import Checkout from './pages/Checkout';

import Collection from './pages/Collection';

function App() {
  useScrollToTop();

  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Chatbot />
        <Footer />
    </div>
  );
}

export default App;