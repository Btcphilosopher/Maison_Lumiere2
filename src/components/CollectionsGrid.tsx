import React from 'react';
import { ArrowLeftRight, Sparkles, Plus, Eye } from 'lucide-react';
import { Product } from '../types';

interface CollectionsGridProps {
  products: Product[];
  onOpenQuickView: (product: Product) => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CollectionsGrid({ products, onOpenQuickView, activeCategory, onSelectCategory }: CollectionsGridProps) {
  // Let's filter products nicely based on category or show them all arranged beautifully
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : activeCategory === 'soins' 
      ? products.filter(p => p.collection === 'Les Soins Parfumés')
      : activeCategory === 'bougies' || activeCategory === 'accessoires'
        ? [] // Fictional placeholder for missing collections
        : products;

  return (
    <section id="collections" className="scroll-mt-6 py-20 sm:py-28 bg-[#faf9f6] text-charcoal-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        
        {/* Collections Title and Top control Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6">
          <div className="text-left max-w-lg">
            <p className="text-[10px] tracking-[0.4em] text-gold-500 font-mono uppercase mb-2">Les Fragrances Maison</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-widest text-charcoal-900 uppercase">
              COLLECTIONS
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-800/60 font-sans tracking-wide mt-2">
              Des créations de haute parfumerie pour chaque émotion. Assemblées avec rigueur à Grasse, France.
            </p>
          </div>
          
          {/* Fictional Arrow Link "VOIR TOUTES LES COLLECTIONS" styled exactly like the design circle button */}
          <div className="flex items-center space-x-4 group">
            <button
              id="view-all-collections-btn"
              onClick={() => onSelectCategory('all')}
              className="w-12 h-12 rounded-full border border-charcoal-800/15 flex items-center justify-center cursor-pointer group-hover:border-gold-500 group-hover:bg-gold-50/50 transition-smooth"
              aria-label="Voir toutes les collections"
            >
              <ArrowLeftRight className="w-4 h-4 text-charcoal-800/60 group-hover:text-gold-500 transition-smooth" />
            </button>
            <button 
              id="view-all-collections-lbl"
              onClick={() => onSelectCategory('all')}
              className="text-left cursor-pointer"
            >
              <span className="text-[9px] tracking-[0.25em] uppercase text-charcoal-800/40 block font-sans">Explorer</span>
              <span className="text-xs tracking-widest uppercase font-medium text-charcoal-900 group-hover:text-gold-500 transition-smooth">voir toutes les collections</span>
            </button>
          </div>
        </div>

        {/* Dynamic empty/category helper for Bougies / Accessoires */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-charcoal-900/10 rounded-2xl bg-white/40">
            <Sparkles className="w-8 h-8 text-gold-300 mx-auto stroke-[1.25] mb-3 animate-pulse" />
            <p className="font-serif text-lg text-charcoal-900/80 italic">Créations en Macération</p>
            <p className="text-xs text-charcoal-800/50 max-w-sm mx-auto mt-1">
              Cette collection d'accessoires ou de bougies parfumées est en cours de finition par notre maître artisan. Revenez dans quelques heures.
            </p>
            <button 
              onClick={() => onSelectCategory('all')}
              className="mt-4 px-4 py-1.5 text-[10px] tracking-widest uppercase bg-charcoal-900 text-white rounded-md hover:bg-gold-500 transition-smooth"
            >
              Retour aux parfums
            </button>
          </div>
        ) : (
          /* Grid of 4 beautiful collection cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                id={`product-card-${product.id}`}
                className="group relative rounded-2xl overflow-hidden bg-white/60 border border-charcoal-800/5 shadow-sm hover:shadow-xl transition-smooth flex flex-col justify-between"
              >
                {/* Image card wrapper */}
                <div className="aspect-[3/4] w-full overflow-hidden relative bg-charcoal-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Dark Vignette Shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  {/* Top-right subtle absolute label tags (Price etc) */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="glass-panel text-charcoal-900 text-[11px] font-sans font-semibold py-1 px-2.5 rounded-full shadow-sm z-10 border border-white/50">
                      {product.price} €
                    </span>
                  </div>

                  {/* Absolute positioning at the bottom for labels (Classic Luxury Branding) */}
                  <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 z-10 text-left">
                    <span className="text-[8px] sm:text-[9px] tracking-[0.3em] font-sans font-medium text-gold-300 uppercase block mb-1">
                      {product.collection}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl tracking-widest text-white uppercase leading-normal">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-white/50 italic line-clamp-1 truncate mt-0.5 pr-4 group-hover:text-gold-100/75 transition-colors">
                      {product.tagline}
                    </p>
                    
                    {/* Notes preview tags on hover */}
                    <div className="mt-3.5 pt-3 border-t border-white/10 hidden sm:block h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 origin-bottom">
                      <div className="flex flex-col space-y-1 text-[9px] text-white/70">
                        <span className="line-clamp-1"><strong className="text-gold-200">Famille:</strong> {product.family}</span>
                        <span className="line-clamp-1"><strong className="text-gold-200">Notes:</strong> {product.notes.top}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover action slide panel buttons bar */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center space-x-3 z-20">
                    <button 
                      id={`btn-qv-${product.id}`}
                      onClick={() => onOpenQuickView(product)}
                      className="px-4 py-2.5 rounded-full bg-white text-charcoal-900 text-[10px] sm:text-xs tracking-widest uppercase font-medium shadow-lg hover:bg-gold-400 hover:text-charcoal-900 hover:scale-105 transition-smooth flex items-center space-x-2"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Découvrir</span>
                    </button>
                    <button 
                      id={`btn-spec-${product.id}`}
                      onClick={() => onOpenQuickView(product)}
                      className="w-10 h-10 rounded-full bg-charcoal-900/80 text-white backdrop-blur-sm shadow-lg hover:bg-gold-500 hover:text-charcoal-900 hover:scale-105 transition-smooth flex items-center justify-center border border-white/10"
                      aria-label="Spécifications"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Footer specs under card for extreme luxury editorial layouts */}
                <div className="p-4 bg-white/45 flex justify-between items-center border-t border-charcoal-900/5">
                  <div className="text-left">
                    <span className="text-[9px] font-mono uppercase text-charcoal-800/40 space-x-1 block">
                      <span>Intensity:</span>
                      <span className="font-semibold text-charcoal-800/70">{product.intensity.split(' ')[0]}</span>
                    </span>
                  </div>
                  <button 
                    id={`txt-btn-${product.id}`}
                    onClick={() => onOpenQuickView(product)}
                    className="text-[9px] sm:text-[10px] tracking-widest font-sans font-medium hover:text-gold-500 transition-colors uppercase border-b border-charcoal-800/10 hover:border-gold-500"
                  >
                    Pyramide Olfactive
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
}
