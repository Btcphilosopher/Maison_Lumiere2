import React from 'react';
import { ShoppingBag, Menu, Globe } from 'lucide-react';

interface HeaderProps {
  onCartToggle: () => void;
  cartItemCount: number;
}

export default function Header({ onCartToggle, cartItemCount }: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 w-full z-40 bg-gradient-to-b from-black/80 to-transparent text-white/90 font-light text-xs tracking-wider">
      {/* Announcement Bar */}
      <div className="w-full border-b border-white/10 py-2.5 px-4 sm:px-8 flex justify-between items-center text-[10px] sm:text-xs font-sans">
        <div className="flex items-center space-x-1 uppercase text-white/80 select-none">
          <span className="inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse mr-1"></span>
          LIVRAISON OFFERTE EN FRANCE & INTERNATIONAL
        </div>
        <div className="hidden sm:flex items-center space-x-6 text-white/70">
          <div className="flex items-center space-x-1 cursor-pointer hover:text-white transition-colors duration-300">
            <Globe className="w-3.5 h-3.5" />
            <span className="font-semibold text-white">FR</span>
            <span className="text-white/40">/</span>
            <span>EN</span>
          </div>
          <a href="#boutiques" className="hover:text-white transition-colors duration-300 uppercase">Boutiques</a>
          <a href="#concierge" className="hover:text-white transition-colors duration-300 uppercase">Concierge</a>
        </div>
      </div>

      {/* Main Luxury Navigation Header */}
      <div className="w-full py-6 px-4 sm:px-8 md:px-12 flex justify-between items-center">
        {/* Left menu toggle (standard menu icon for luxury apps) */}
        <button 
          id="hdr-menu-btn"
          aria-label="Menu" 
          className="p-2 -ml-2 cursor-pointer hover:text-gold-200 transition-colors duration-300 flex items-center space-x-2"
        >
          <Menu className="w-5 h-5 stroke-[1.25]" />
          <span className="hidden md:inline-block text-[10px] tracking-widest uppercase">Menu</span>
        </button>

        {/* Center Logo branding */}
        <div className="flex flex-col items-center text-center select-none cursor-pointer group">
          <p className="text-[9px] tracking-[0.3em] text-white/60 font-sans -mb-0.5 uppercase transition-colors duration-500 group-hover:text-gold-100">MAISON</p>
          <h1 className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.25em] text-white font-medium pl-[0.25em] transition-smooth group-hover:text-gold-200">
            LUMIÈRE
          </h1>
          <p className="text-[9px] tracking-[0.4em] text-white/50 font-sans -mr-[0.4em] uppercase">PARIS</p>
        </div>

        {/* Right shopping cart control */}
        <button 
          id="hdr-cart-btn"
          onClick={onCartToggle}
          aria-label="Shopping Bag" 
          className="relative p-2 -mr-2 cursor-pointer hover:text-gold-200 transition-smooth flex items-center space-x-1.5"
        >
          <span className="hidden sm:inline-block text-[10px] tracking-widest uppercase text-white/70 hover:text-white">Panier</span>
          <div className="relative p-1">
            <ShoppingBag className="w-5 h-5 stroke-[1.25]" />
            {cartItemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gold-400 text-charcoal-900 text-[9px] font-sans font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-white/60 font-sans text-[10px]">({cartItemCount})</span>
        </button>
      </div>

      {/* Secondary Mobile Nav helper links */}
      <div className="sm:hidden w-full border-t border-white/5 py-2 px-4 flex justify-around items-center text-[10px] text-white/60 font-sans">
        <span className="cursor-pointer font-bold text-white">FR</span>
        <a href="#boutiques">BOUTIQUES</a>
        <a href="#concierge">CONCIERGE</a>
      </div>
    </header>
  );
}
