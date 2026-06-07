import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  heroProduct: Product;
  onOpenQuickView: (product: Product) => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

export default function Hero({ heroProduct, onOpenQuickView, onSelectCategory, activeCategory }: HeroProps) {
  const categories = [
    { id: 'all', name: 'PARFUMS' },
    { id: 'soins', name: 'SOIN & CORPS' },
    { id: 'bougies', name: 'BOUGIES' },
    { id: 'accessoires', name: 'ACCESSOIRES' }
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-charcoal-900 text-white select-none">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/images/hero_perfume_lumiere_1780835890658.png" 
          alt="Maison Lumière - Éclat de Nuit luxury perfume sunset in Paris" 
          className="w-full h-full object-cover object-center opacity-85 scale-100 transition-smooth"
          referrerPolicy="no-referrer"
        />
        {/* Shadow overlays for elite typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-black/85 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-transparent z-10" />
      </div>

      {/* Circle Badge Sticker "NOUVELLE COLLECTION" */}
      <div className="absolute top-36 right-6 sm:right-16 z-20 flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/20 flex flex-col items-center justify-center p-3 text-center backdrop-blur-sm bg-black/15">
          <p className="text-[8px] tracking-[0.2em] text-white/70 uppercase">Nouvelle</p>
          <p className="font-serif text-xs tracking-wider text-gold-200 uppercase mt-0.5">Collection</p>
          <div className="w-6 h-[1px] bg-gold-400 my-1"></div>
          <p className="text-[9px] tracking-widest text-white/90 font-mono">2025 / 26</p>
        </div>
      </div>

      {/* Decorative vertical metadata markers from image (01, star, 04, I) */}
      <div className="absolute left-6 sm:left-12 top-1/3 z-20 hidden md:flex flex-col items-center space-y-12 text-[10px] tracking-widest text-white/30 font-mono">
        <div className="flex flex-col items-center">
          <span>01</span>
          <div className="w-[1px] h-6 bg-white/20 mt-2"></div>
        </div>
        <Sparkles className="w-3.5 h-3.5 text-gold-300 stroke-[1]" />
        <div className="flex flex-col items-center">
          <div className="w-[1px] h-6 bg-white/20 mb-2"></div>
          <span>04</span>
        </div>
        <span className="text-white/10">I</span>
      </div>

      {/* Main Core Copy Title Block (Lower half on the left to copy the original) */}
      <div className="relative z-20 flex-1 flex items-end pb-32 sm:pb-36 px-6 sm:px-16 md:px-24">
        <div className="max-w-xl animate-fade-in text-left">
          <div className="h-[1px] w-12 bg-gold-400 mb-6 sm:mb-8"></div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.16em] uppercase leading-[1.12] text-white">
            L'ESSENCE <span className="block italic mt-1 font-extralight tracking-widest text-gold-100">DE LA LUMIÈRE</span>
          </h2>
          <p className="text-[10px] sm:text-xs tracking-[0.4em] text-white/80 uppercase font-sans mt-6 sm:mt-8 space-y-2 leading-relaxed">
            <span className="block">Parfums d'exception</span>
            <span className="block text-gold-300">fabriqués en France</span>
          </p>
          <div className="mt-8 sm:mt-12 flex">
            <a 
              href="#collections" 
              className="group inline-flex items-center space-x-3 text-xs tracking-[0.25em] text-white hover:text-gold-200 uppercase transition-all duration-300 border-b border-white/25 hover:border-gold-300 pb-2.5"
            >
              <span>Découvrir la collection</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-2 transition-transform duration-300 stroke-[1.5]" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Floating Interactive Panels */}
      <div className="relative z-20 w-full px-4 sm:px-8 md:px-12 pb-8 sm:pb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        {/* Left-aligned Quick-view card mockup of Éclat de Nuit */}
        <div className="col-span-1 lg:col-span-4 max-w-sm">
          <div 
            id="hero-quickview-card"
            onClick={() => onOpenQuickView(heroProduct)}
            className="group cursor-pointer p-3 rounded-xl glass-panel-dark flex items-center space-x-4 hover:bg-black/80 transition-smooth border border-white/10 hover:border-gold-400/30 shadow-2xl"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-charcoal-900 border border-white/5 flex-shrink-0 relative">
              <img 
                src={heroProduct.image} 
                alt={heroProduct.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 text-left min-w-0">
              <span className="text-[8px] tracking-widest text-gold-300 uppercase block font-sans mb-0.5">Nouveau</span>
              <h3 className="font-serif text-xs tracking-wider text-white uppercase group-hover:text-gold-200 transition-colors">{heroProduct.name}</h3>
              <p className="text-[10px] text-white/65 line-clamp-1 truncate pr-2 mt-0.5">{heroProduct.tagline}</p>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:border-gold-300 group-hover:bg-gold-400/10 transition-smooth">
              <ArrowRight className="w-3 h-3 text-white/50 group-hover:text-gold-200 transition-smooth stroke-[1.5]" />
            </div>
          </div>
        </div>

        {/* Center-aligned Navigation Universal box from image: NOTRE UNIVERS filter */}
        <div className="col-span-1 lg:col-span-8 flex justify-center lg:justify-end">
          <div className="w-full max-w-xl p-3 sm:p-4 rounded-xl glass-panel bg-white/15 backdrop-blur-md border border-white/15 text-charcoal-900 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between space-y-3 sm:space-y-0 text-center">
              <div className="text-left">
                <p className="text-[9px] tracking-[0.3em] text-white/60 font-sans uppercase">Notre Univers</p>
                <p className="font-serif text-xs md:text-sm tracking-widest uppercase font-medium text-white italic">Maison de Fragrances</p>
              </div>
              <div className="h-[1px] w-full sm:w-[1px] sm:h-6 bg-white/20 my-1 sm:my-0"></div>
              <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                {categories.map((cat, idx) => (
                  <React.Fragment key={cat.id}>
                    <button
                      id={`hero-cat-${cat.id}`}
                      onClick={() => onSelectCategory(cat.id)}
                      className={`text-[9px] md:text-[10px] tracking-widest uppercase px-2.5 py-1.5 rounded-md transition-smooth cursor-pointer ${
                        activeCategory === cat.id
                          ? 'bg-white text-charcoal-900 font-semibold shadow-md'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {cat.name}
                    </button>
                    {idx < categories.length - 1 && (
                      <span className="text-white/30 text-[9px] hidden sm:inline-block">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
