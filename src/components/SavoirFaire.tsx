import React, { useState } from 'react';
import { Sparkles, Heart, RefreshCw, Feather } from 'lucide-react';
import { ART_PILLARS } from '../data';

export default function SavoirFaire() {
  const [activePillarId, setActivePillarId] = useState('ingredients');

  // Find the details of the active selected pillar
  const activePillar = ART_PILLARS.find(p => p.id === activePillarId) || ART_PILLARS[0];

  // Map icons dynamically
  const getIconForPillar = (id: string) => {
    switch(id) {
      case 'ingredients': return <Feather className="w-5 h-5 text-gold-500 stroke-[1.25]" />;
      case 'savoir_faire': return <Sparkles className="w-5 h-5 text-gold-500 stroke-[1.25]" />;
      case 'durabilite': return <RefreshCw className="w-5 h-5 text-gold-500 stroke-[1.25]" />;
      default: return <Heart className="w-5 h-5 text-gold-500 stroke-[1.25]" />;
    }
  };

  // Define hot spots on the wide image that map to active tabs
  const hotSpots = [
    { id: 'ingredients', top: '35%', left: '80%', label: 'Absolus de Rose' },
    { id: 'savoir_faire', top: '75%', left: '55%', label: 'Macération Or' },
    { id: 'durabilite', top: '20%', left: '35%', label: 'Verre Éco' }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#f2efe9] text-charcoal-800 border-y border-charcoal-800/5 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Block - copy layout from image */}
          <div className="col-span-1 lg:col-span-4 text-left flex flex-col justify-between h-full">
            <div>
              <p className="text-[10px] tracking-[0.4em] text-gold-500 font-mono uppercase mb-3">La Vision Lumière</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.08em] text-charcoal-900 uppercase leading-[1.12]">
                L'ART DU PARFUM<br />
                <span className="italic font-extralight text-gold-500 pl-2">À LA FRANÇAISE</span>
              </h2>
              
              <div className="w-8 h-[2px] bg-gold-400 my-6 sm:my-8"></div>
              
              <p className="text-sm font-sans text-charcoal-800/70 leading-relaxed max-w-sm mb-6">
                Chaque fragrance est une rencontre intime entre l'abondance de la nature sauvage, la rigueur de la science olfactive et l'émotion humaine pure.
              </p>
              <p className="text-xs font-serif text-charcoal-900 italic max-w-sm">
                "Nous ne créons pas de simples parfums; nous matérialisons de la lumière liquide en sillage éternel."
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-charcoal-800/10">
              <a 
                href="#manifeste" 
                onClick={(e) => {
                  e.preventDefault();
                  alert("Maison Lumière fondée en 2024 à Paris perpétue l'excellence de la haute parfumerie française. Nous assemblons les matières premières les plus pures cultivées de manière durable pour extraire leur éclat originel.");
                }}
                className="text-[10px] sm:text-xs tracking-[0.25em] font-sans font-semibold text-charcoal-900 uppercase hover:text-gold-500 transition-colors border-b border-charcoal-900/10 hover:border-gold-500 pb-2"
              >
                Découvrir notre histoire
              </a>
            </div>
          </div>

          {/* Right Wide Image Interactive Block with Floating Hotspots */}
          <div className="col-span-1 lg:col-span-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-charcoal-100 group border border-white/40">
              <img 
                src="/src/assets/images/art_du_parfum_1780835978273.png" 
                alt="Floating white orchids and golden drop on water ripple - Savoir faire" 
                className="w-full h-full object-cover aspect-[16/9] transition-smooth group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 via-transparent to-black/15 pointer-events-none" />

              {/* Glowing Hotspots */}
              {hotSpots.map((spot) => (
                <button
                  key={spot.id}
                  id={`hotspot-${spot.id}`}
                  onClick={() => setActivePillarId(spot.id)}
                  style={{ top: spot.top, left: spot.left }}
                  className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center transition-smooth ${
                    activePillarId === spot.id 
                      ? 'bg-gold-500 text-charcoal-900 scale-125 z-20' 
                      : 'bg-black/40 text-white hover:bg-gold-400 hover:text-charcoal-900 hover:scale-110 z-10'
                  }`}
                  aria-label={`Hotspot ${spot.label}`}
                >
                  <span className="absolute w-full h-full rounded-full border border-yellow-400 bg-yellow-400/25 animate-ping opacity-75"></span>
                  <div className="w-2.5 h-2.5 rounded-full bg-current"></div>

                  {/* Hotspot Hover Mini-Label */}
                  <div className="absolute top-10 whitespace-nowrap bg-charcoal-900 text-white text-[9px] font-sans tracking-wide py-1 px-2 rounded-md scale-0 group-hover:scale-100 md:scale-100 transition-smooth opacity-0 md:opacity-85 pointer-events-none">
                    {spot.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Interactive Pillar Tabs corresponding directly to image vertical bullet indexes */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {ART_PILLARS.map((pillar) => (
                <button
                  key={pillar.id}
                  id={`tab-pillar-${pillar.id}`}
                  onMouseEnter={() => setActivePillarId(pillar.id)}
                  onClick={() => setActivePillarId(pillar.id)}
                  className={`p-4 rounded-xl text-left border transition-smooth cursor-pointer ${
                    activePillarId === pillar.id
                      ? 'bg-white border-gold-300 text-charcoal-900 shadow-md'
                      : 'bg-white/40 hover:bg-white/80 border-transparent text-charcoal-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="p-1.5 rounded-lg bg-gold-50 inline-block">
                      {getIconForPillar(pillar.id)}
                    </span>
                    <span className="text-[10px] font-mono tracking-wider font-semibold text-gold-500 uppercase block">Pillar Match</span>
                  </div>
                  <h3 className="font-serif text-[11px] sm:text-xs tracking-[0.2em] font-semibold uppercase text-charcoal-900">
                    {pillar.title}
                  </h3>
                </button>
              ))}
            </div>

            {/* Selected Pillar Detailed Panel Case */}
            <div className="mt-4 p-5 sm:p-6 bg-white rounded-xl shadow-lg text-left border border-charcoal-900/5 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] tracking-widest text-gold-500 font-mono font-semibold uppercase">{activePillar.subtitle}</span>
                <span className="text-[10px] font-medium bg-gold-50 text-gold-500 py-1 px-2.5 rounded-full font-mono">{activePillar.stats}</span>
              </div>
              <h4 className="font-serif text-sm tracking-wider text-charcoal-900 font-bold uppercase mb-2">{activePillar.title}</h4>
              <p className="text-xs text-charcoal-800/60 leading-relaxed font-sans">{activePillar.description}</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
