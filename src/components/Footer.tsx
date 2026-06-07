import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check, Heart } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert("S'il vous plaît, fournissez un e-mail valide.");
      return;
    }

    setIsSubmitting(true);
    // Simulate luxury API subscription
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const socialLinks = [
    { name: 'IG', url: 'https://instagram.com' },
    { name: 'PIN', url: 'https://pinterest.com' },
    { name: 'TT', url: 'https://tiktok.com' },
    { name: 'YT', url: 'https://youtube.com' }
  ];

  return (
    <footer className="bg-[#e5dfd5] text-charcoal-800 py-16 sm:py-20 border-t border-charcoal-800/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        
        {/* Upper Column Block Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-charcoal-800/10">
          
          {/* Logo brand info column (Cols: 3) */}
          <div className="md:col-span-4 text-left">
            <div className="flex flex-col items-start select-none cursor-pointer mb-6">
              <p className="text-[8px] tracking-[0.3em] text-charcoal-800/50 font-sans -mb-0.5 uppercase">MAISON</p>
              <h2 className="font-serif text-xl tracking-[0.25em] text-charcoal-900 font-bold uppercase pl-[0.05em]">
                LUMIÈRE
              </h2>
              <p className="text-[8px] tracking-[0.4em] text-charcoal-800/40 font-sans uppercase">PARIS</p>
            </div>
            <p className="text-[11px] sm:text-xs text-charcoal-800/60 leading-relaxed font-sans font-light max-w-sm">
              Artisan parfumeur d'exception. Révélateur d'aura à travers des créations intemporelles formulées à Grasse et façonnées à la main à Paris, France.
            </p>
          </div>

          {/* Quick links directory column (Cols: 4) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-left text-xs text-charcoal-800/65 font-sans leading-relaxed font-light">
            <div>
              <h4 className="text-[9px] tracking-[0.2em] font-sans font-semibold text-charcoal-950 uppercase mb-4">L'univers</h4>
              <ul className="space-y-2.5">
                <li><a href="#collections" className="hover:text-gold-500 transition-colors uppercase">La Collection</a></li>
                <li><a href="#savoirfaire" className="hover:text-gold-500 transition-colors uppercase font-medium">L'Art-Savoir-Faire</a></li>
                <li><a href="#quiz" className="hover:text-gold-500 transition-colors uppercase font-semibold">Trouver mon Parfum</a></li>
                <li><a href="#propos" className="hover:text-gold-500 transition-colors uppercase">La Maison</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[9px] tracking-[0.2em] font-sans font-semibold text-charcoal-950 uppercase mb-4">Services</h4>
              <ul className="space-y-2.5">
                <li><a href="#moncompte" className="hover:text-gold-500 transition-colors uppercase">Mon Compte</a></li>
                <li><a href="#retours" className="hover:text-gold-500 transition-colors uppercase">Retours & Livraisons</a></li>
                <li><a href="#recharges" className="hover:text-gold-500 transition-colors uppercase">Espaces Recharges</a></li>
                <li><a href="#faq" className="hover:text-gold-500 transition-colors uppercase">F.A.Q.</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column (Cols: 5) */}
          <div className="md:col-span-4 text-left">
            <h4 className="text-[10px] tracking-[0.3em] font-sans font-semibold text-charcoal-950 uppercase mb-3">
              RECEVOIR NOS NOUVEAUTÉS
            </h4>
            <p className="text-[11px] text-charcoal-800/60 leading-relaxed font-sans mb-5 max-w-xs font-light">
              Soyez informé en avant-première de nos nouveautés exclusives et recevez des invitations exclusives pour nos lancements privés de parfums.
            </p>
            
            <form onSubmit={handleSubmit} className="relative block">
              <input 
                id="newsletter-email-input"
                type="email" 
                placeholder="Votre adresse e-mail" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || isSuccess}
                className="w-full bg-[#dfd9ce] border-b border-charcoal-800/20 py-3.5 pl-3 pr-12 text-xs text-charcoal-900 placeholder-charcoal-800/40 tracking-wider focus:outline-none focus:border-gold-500 uppercase rounded-t-md font-sans"
                required
              />
              <button 
                id="newsletter-submit-btn"
                type="submit" 
                aria-label="S'abonner"
                className="absolute right-1 top-1.5 w-10 h-10 rounded-full bg-charcoal-900 border border-charcoal-900 hover:bg-gold-500 hover:border-gold-500 hover:text-charcoal-900 text-white flex items-center justify-center transition-smooth cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : isSuccess ? (
                  <Check className="w-4 h-4 stroke-[2]" />
                ) : (
                  <ArrowRight className="w-4 h-4 stroke-[1.25]" />
                )}
              </button>
            </form>
            
            {isSuccess && (
              <p className="text-[10px] text-emerald-800 font-sans mt-2 tracking-wide flex items-center">
                <Sparkles className="w-3 h-3 text-emerald-500 mr-1 animate-pulse" />
                Bienvenue dans le Cercle Privé Lumière.
              </p>
            )}
          </div>

        </div>

        {/* Lower copyright and social alignment info */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-[11px] tracking-widest text-[#8c8577] font-sans">
          <div className="order-2 sm:order-1 mt-4 sm:mt-0 font-light text-center sm:text-left">
            <p>© {new Date().getFullYear()} MAISON LUMIÈRE PARIS. TOUS DROITS RÉSERVÉS.</p>
            <p className="text-[9px] mt-1 text-[#a69e90] tracking-[0.2em] uppercase flex items-center justify-center sm:justify-start">
              Artisan Parfumeur agréé. L'abus d'élégance est un art. 
              <Heart className="w-2.5 h-2.5 text-gold-500 ml-1 fill-current" />
            </p>
          </div>

          {/* Social icons centered list from image */}
          <div className="order-1 sm:order-2 flex items-center space-x-8">
            <span className="text-[9px] text-[#8c8577] uppercase tracking-[0.3em] hidden md:inline-block">Suivez-nous :</span>
            {socialLinks.map((soc) => (
              <a 
                key={soc.name} 
                href={soc.url} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[10pt] font-mono tracking-widest text-charcoal-800/60 hover:text-charcoal-900 hover:scale-110 transition-smooth font-semibold uppercase"
              >
                {soc.name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
