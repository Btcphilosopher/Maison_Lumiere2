import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CollectionsGrid from './components/CollectionsGrid';
import SavoirFaire from './components/SavoirFaire';
import PerfumeQuiz from './components/PerfumeQuiz';
import FeaturesBar from './components/FeaturesBar';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';

import { Product, CartItem } from './types';
import { HERO_PRODUCT, PRODUCTS, ALL_PRODUCTS } from './data';

export default function App() {
  // Olfactory shopping cart state, loading from LocalStorage for persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('maison_lumiere_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Category filters ('all', 'soins', 'bougies', 'accessoires')
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Interactive drawers toggles
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);

  // Sync cart adjustments to LocalStorage
  useEffect(() => {
    localStorage.setItem('maison_lumiere_cart', JSON.stringify(cart));
  }, [cart]);

  // Aggregate cart item count
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Cart operations
  const handleAddToCart = (product: Product, volume: string) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedVolume === volume
      );

      if (existingIdx > -1) {
        const newCart = [...prevCart];
        newCart[existingIdx] = {
          ...newCart[existingIdx],
          quantity: newCart[existingIdx].quantity + 1,
        };
        return newCart;
      } else {
        return [...prevCart, { product, quantity: 1, selectedVolume: volume }];
      }
    });

    // Automatically slide open the brand cart drawer for reassuring visual feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, volume: string, change: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId && item.selectedVolume === volume) {
            const nextQty = item.quantity + change;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveItem = (productId: string, volume: string) => {
    setCart((prevCart) => {
      return prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedVolume === volume)
      );
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Smooth scroll straight down to the collections shelf
    const element = document.getElementById('collections');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#faf9f6] text-charcoal-800 font-sans selection:bg-gold-500/20 antialiased overflow-x-hidden">
      
      {/* Absolute top fixed Announcement & Navigation brand Header */}
      <Header 
        onCartToggle={() => setIsCartOpen(!isCartOpen)} 
        cartItemCount={cartItemCount} 
      />

      {/* Hero Visual Section */}
      <Hero 
        heroProduct={HERO_PRODUCT}
        onOpenQuickView={setActiveQuickViewProduct}
        onSelectCategory={handleSelectCategory}
        activeCategory={activeCategory}
      />

      {/* Features Showcase Highlights Bar */}
      <FeaturesBar />

      {/* Core Collections Shelf Grid */}
      <CollectionsGrid 
        products={ALL_PRODUCTS} 
        onOpenQuickView={setActiveQuickViewProduct}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Savoir-Faire / Art as an interactive experience section */}
      <SavoirFaire />

      {/* Interactive Olfactory Diagnostic Matcher Quiz */}
      <PerfumeQuiz 
        onOpenQuickView={setActiveQuickViewProduct}
        onAddToCart={handleAddToCart}
      />

      {/* Luxury Editorial Footer with verified signup validation */}
      <Footer />

      {/* PORTALS & UTILITIES DRAWER WRAPPERS */}

      {/* Interactive Olfaction pyramids / Size Selector specification Modals */}
      {activeQuickViewProduct && (
        <QuickViewModal 
          product={activeQuickViewProduct}
          onClose={() => setActiveQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Interactive slide-in Shopping Bag Cart drawer containing Checkout Flow */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}

