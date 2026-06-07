import React from 'react';
import { Truck, Gift, Box, RefreshCw, Headphones } from 'lucide-react';

export default function FeaturesBar() {
  const features = [
    {
      icon: <Truck className="w-5 h-5 text-gold-500 stroke-[1.25]" />,
      title: 'LIVRAISON OFFERTE',
      desc: 'En France & Union Européenne'
    },
    {
      icon: <Gift className="w-5 h-5 text-gold-500 stroke-[1.25]" />,
      title: 'ÉCHANTILLONS OFFERTS',
      desc: '2 fioles offertes avec votre commande'
    },
    {
      icon: <Box className="w-5 h-5 text-gold-500 stroke-[1.25]" />,
      title: 'EMBALLAGE SIGNATURE',
      desc: 'Coffret d\'art fait à la main'
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-gold-500 stroke-[1.25]" />,
      title: 'RECHARGE ÉCO-RESPONSABLE',
      desc: '-20% sur les recharges de flacon'
    },
    {
      icon: <Headphones className="w-5 h-5 text-gold-500 stroke-[1.25]" />,
      title: 'CONCIERGE PERSONNALISÉ',
      desc: 'Conseils olfactifs disponibles 7/7'
    }
  ];

  return (
    <div className="bg-charcoal-50 py-10 sm:py-14 border-b border-charcoal-900/5 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4">
          {features.map((feat, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center text-center px-2 group ${
                idx === features.length - 1 && 'col-span-2 md:col-span-1'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-white border border-charcoal-900/5 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:border-gold-300 transition-smooth mb-3">
                {feat.icon}
              </div>
              <h3 className="text-[9px] sm:text-[10px] tracking-[0.2em] font-sans font-semibold text-charcoal-900 uppercase">
                {feat.title}
              </h3>
              <p className="text-[9px] text-charcoal-800/50 mt-1 font-sans font-light select-none">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
