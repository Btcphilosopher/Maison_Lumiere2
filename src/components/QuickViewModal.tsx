import React, { useState } from 'react';
import { X, Calendar, Sparkles, Scale, RefreshCw, ShoppingBag, Eye, Heart } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, volume: string) => void;
}

export default function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  const [selectedVolume, setSelectedVolume] = useState(product.volume[0] || '100ml');
  const [isFavorite, setIsFavorite] = useState(false);

  // Multi-size markup: 50ml or 100ml or 200ml increases base price
  const getPriceForVolume = (volume: string) => {
    if (volume === '50ml') return product.price - 40;
    if (volume === '200ml') return product.price + 90;
    return product.price; // default to 100ml base price from product object
  };

  const calculatedPrice = getPriceForVolume(selectedVolume);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/80 backdrop-blur-md flex items-center justify-center p-4">
      {/* Container Drawer element */}
      <div 
        id="quickview-modal-container"
        className="relative bg-[#faf9f6] text-charcoal-900 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-charcoal-800/10 max-h-[90vh] flex flex-col"
      >
        
        {/* Header Drawer */}
        <div className="p-4 sm:p-6 border-b border-charcoal-900/5 flex justify-between items-center bg-white">
          <div className="text-left">
            <span className="text-[9px] tracking-widest text-gold-500 font-mono font-bold uppercase">{product.collection}</span>
            <h3 className="font-serif text-lg sm:text-xl font-bold tracking-widest text-charcoal-900 uppercase pr-8 leading-none">
              {product.name}
            </h3>
          </div>
          <button 
            id="close-qv-modal-btn"
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-charcoal-800/5 bg-charcoal-50 hover:bg-gold-500 hover:text-charcoal-900 text-charcoal-800/70 cursor-pointer flex items-center justify-center transition-smooth"
            aria-label="Fermer"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Scrollable specs layout */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Image Column */}
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-charcoal-50 border border-charcoal-900/5 shadow-inner relative group select-none">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-smooth"
                  referrerPolicy="no-referrer"
                />
                
                <span className="absolute bottom-4 left-4 glass-panel text-[9px] text-charcoal-900 font-sans tracking-widest py-1.5 px-3 rounded-full flex items-center space-x-1 border border-white/40">
                  <RefreshCw className="w-3 h-3 text-gold-500 animate-spin-slow" />
                  <span className="font-semibold uppercase text-[10px]">FLACON RECHARGEABLE</span>
                </span>
                
                <button
                  id="qv-fav-toggle"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center transition-smooth border shadow-md cursor-pointer ${
                    isFavorite 
                      ? 'bg-rose-500 border-rose-500 text-white' 
                      : 'glass-panel border-white/55 text-charcoal-800 hover:text-rose-500'
                  }`}
                  aria-label="Ajouter aux favoris"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Quick specifications bullets */}
              <div className="grid grid-cols-3 gap-2 text-center text-[9px] text-charcoal-800/60 font-sans uppercase">
                <div className="p-3 bg-white rounded-lg border border-charcoal-900/5">
                  <span className="text-gold-500 font-mono block font-bold">TYPE</span>
                  <span className="font-semibold text-charcoal-900 mt-1 block">EAU DE PARFUM</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-charcoal-900/5">
                  <span className="text-gold-500 font-mono block font-bold">TENUE</span>
                  <span className="font-semibold text-charcoal-900 mt-1 block">8h - 12h</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-charcoal-900/5">
                  <span className="text-gold-500 font-mono block font-bold">CRÉATION</span>
                  <span className="font-semibold text-charcoal-900 mt-1 block">PARIS / GRASSE</span>
                </div>
              </div>
            </div>

            {/* Description Spec texts Column */}
            <div className="space-y-6 text-left">
              <div>
                <span className="text-[10px] tracking-widest text-[#8c8577] block font-semibold uppercase italic mb-1">{product.tagline}</span>
                <p className="text-xs sm:text-sm text-charcoal-800/70 leading-relaxed font-sans font-light">
                  {product.description}
                </p>
              </div>

              {/* Select size section */}
              <div className="space-y-3">
                <h4 className="text-[9px] tracking-[0.25em] font-sans font-semibold text-charcoal-900 uppercase">CHOISIR LE FLACON</h4>
                <div className="flex gap-3">
                  {product.volume.map((vol) => (
                    <button
                      key={vol}
                      id={`vol-btn-${vol}`}
                      onClick={() => setSelectedVolume(vol)}
                      className={`flex-1 p-3 rounded-xl border text-center cursor-pointer transition-smooth ${
                        selectedVolume === vol
                          ? 'border-gold-500 bg-gold-50/50 text-charcoal-900 shadow-sm'
                          : 'border-charcoal-900/5 bg-white text-charcoal-800/60 hover:bg-white hover:border-charcoal-900/10'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-sans font-semibold block">{vol}</span>
                      <span className="text-[10px] text-gold-500 block mt-0.5">{getPriceForVolume(vol)} €</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Olfactory Pyramide visualization */}
              <div className="space-y-3.5 pt-4 border-t border-charcoal-900/5">
                <h4 className="text-[9px] tracking-[0.25em] font-sans font-semibold text-charcoal-900 uppercase">PYRAMIDE OLFACTIVE</h4>
                
                <div className="space-y-2">
                  {/* Top Note block */}
                  <div className="p-3 bg-white rounded-xl border border-charcoal-800/5 flex items-start space-x-3.5">
                    <span className="text-[10px] font-mono tracking-widest text-gold-500 font-bold bg-gold-50 p-2 rounded-lg leading-none uppercase flex-shrink-0 text-center w-12 select-none">
                      TÊTE
                    </span>
                    <div className="text-xs">
                      <p className="font-semibold text-charcoal-900">Notes de Tête <span className="font-mono text-[9px] text-[#8c8577] italic font-normal">(15 min présence)</span></p>
                      <p className="text-charcoal-800/60 mt-0.5 text-[11px]">{product.notes.top}</p>
                    </div>
                  </div>

                  {/* Heart Note block */}
                  <div className="p-3 bg-white rounded-xl border border-charcoal-800/5 flex items-start space-x-3.5">
                    <span className="text-[10px] font-mono tracking-widest text-gold-500 font-bold bg-gold-50 p-2 rounded-lg leading-none uppercase flex-shrink-0 text-center w-12 select-none">
                      COEUR
                    </span>
                    <div className="text-xs">
                      <p className="font-semibold text-charcoal-900">Notes de Coeur <span className="font-mono text-[9px] text-[#8c8577] italic font-normal">(4 h présence)</span></p>
                      <p className="text-charcoal-800/60 mt-0.5 text-[11px]">{product.notes.heart}</p>
                    </div>
                  </div>

                  {/* Base Note block */}
                  <div className="p-3 bg-white rounded-xl border border-charcoal-800/5 flex items-start space-x-3.5">
                    <span className="text-[10px] font-mono tracking-widest text-gold-500 font-bold bg-gold-50 p-2 rounded-lg leading-none uppercase flex-shrink-0 text-center w-12 select-none">
                      FOND
                    </span>
                    <div className="text-xs">
                      <p className="font-semibold text-charcoal-900">Notes de Fond <span className="font-mono text-[9px] text-[#8c8577] italic font-normal">(24 h sillage)</span></p>
                      <p className="text-charcoal-800/60 mt-0.5 text-[11px]">{product.notes.base}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Character tag block */}
              <div className="p-3 bg-gold-50/50 rounded-xl border border-gold-300/10 text-xs text-left">
                <span className="font-semibold text-gold-500 font-mono text-[10px] uppercase block mb-0.5">Sillage & Aura</span>
                <span className="text-charcoal-800/80 italic font-medium">"{product.character}"</span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer controls container */}
        <div className="p-4 sm:p-6 bg-white border-t border-charcoal-900/5 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-charcoal-800/40 font-semibold tracking-wider block font-sans">VALEUR PANIER</span>
            <span className="text-xl sm:text-2xl font-serif tracking-widest text-charcoal-950 font-bold">{calculatedPrice} €</span>
          </div>

          <button
            id="modal-add-to-cart-btn"
            onClick={() => {
              onAddToCart(product, selectedVolume);
              onClose();
            }}
            className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-charcoal-950 text-white text-xs tracking-widest uppercase font-semibold text-center hover:bg-gold-500 hover:text-charcoal-900 hover:scale-[1.01] transition-smooth cursor-pointer flex items-center justify-center space-x-3"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            <span>AJOUTER AU PANIER</span>
          </button>
        </div>

      </div>
    </div>
  );
}
