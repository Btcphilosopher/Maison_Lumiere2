import React, { useState } from 'react';
import { 
  Wind, Sparkles, Flame, Trees, Compass, Sun, Moon, 
  Waves, BookOpen, Crown, ArrowRight, Undo2, Check, Heart, Trophy, Award
} from 'lucide-react';
import { Product } from '../types';
import { QUIZ_QUESTIONS, ALL_PRODUCTS } from '../data';

interface PerfumeQuizProps {
  onOpenQuickView: (product: Product) => void;
  onAddToCart: (product: Product, volume: string) => void;
}

export default function PerfumeQuiz({ onOpenQuickView, onAddToCart }: PerfumeQuizProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);
  const [matchPercentage, setMatchPercentage] = useState(95);

  // Dynamic icon helper dictionary
  const getIcon = (name: string) => {
    const defaultStyle = "w-5 h-5 text-gold-500 stroke-[1.25]";
    switch(name) {
      case 'Wind': return <Wind className={defaultStyle} />;
      case 'Sparkles': return <Sparkles className={defaultStyle} />;
      case 'Flame': return <Flame className={defaultStyle} />;
      case 'Trees': return <Trees className={defaultStyle} />;
      case 'Compass': return <Compass className={defaultStyle} />;
      case 'Sun': return <Sun className={defaultStyle} />;
      case 'Moon': return <Moon className={defaultStyle} />;
      case 'Waves': return <Waves className={defaultStyle} />;
      case 'BookOpen': return <BookOpen className={defaultStyle} />;
      case 'Crown': return <Crown className={defaultStyle} />;
      default: return <Sparkles className={defaultStyle} />;
    }
  };

  const handleStart = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setAnswers({});
    setMatchedProduct(null);
  };

  const handleSelectOption = (questionId: number, value: string) => {
    const updatedAnswers = { ...answers, [questionId]: value };
    setAnswers(updatedAnswers);

    // If there is a next question, proceed; otherwise, analyze results
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 350); // slight delay to feel tactile
    } else {
      handleAnalyze(updatedAnswers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handleAnalyze = (finalAnswers: Record<number, string>) => {
    setIsAnalyzing(true);
    
    // Simulate high-tech olfactory calculations
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Calculate best product matching score
      // Answering Q3 specifically targets a product (eclat_de_nuit, bleu_eternel, or_exquise, satin_noir)
      const q3Answer = finalAnswers[3];
      const q2Answer = finalAnswers[2]; // Family: Woody, Fresh, Warm
      const q1Answer = finalAnswers[1]; // Intensity: Soft, Moderate, Intense

      let matched = ALL_PRODUCTS.find(p => p.id === q3Answer);
      
      // Fallback selector rules
      if (!matched) {
        if (q2Answer === 'Fresh & Citrusy') {
          matched = ALL_PRODUCTS.find(p => p.id === 'bleu_eternel') || ALL_PRODUCTS[1];
        } else if (q2Answer === 'Woody & Smoky') {
          matched = ALL_PRODUCTS.find(p => p.id === 'or_exquise') || ALL_PRODUCTS.find(p => p.id === 'satin_noir') || ALL_PRODUCTS[2];
        } else {
          matched = ALL_PRODUCTS.find(p => p.id === 'eclat_de_nuit') || ALL_PRODUCTS[0];
        }
      }

      // Generate a beautiful, realistic percentage based on matching characteristics
      let score = 88;
      if (matched?.family === q2Answer) score += 6;
      if (matched?.intensity === q1Answer) score += 4;
      if (score > 98) score = 98; // keep realistic ceiling
      
      setMatchedProduct(matched || ALL_PRODUCTS[0]);
      setMatchPercentage(score);
    }, 2400);
  };

  return (
    <section id="quiz" className="py-20 sm:py-28 bg-charcoal-900 text-white relative overflow-hidden">
      {/* Visual background overlays */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="/src/assets/images/diagnostic_quiz_1780835997242.png" 
          alt="Luxury background with glass vials" 
          className="w-full h-full object-cover object-center filter blur-sm scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-charcoal-900/40" />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Intro View */}
        {!isPlaying && !matchedProduct && !isAnalyzing && (
          <div className="text-center py-8">
            <span className="w-12 h-12 rounded-full border border-gold-300/30 flex items-center justify-center bg-white/5 mx-auto mb-6">
              <Sparkles className="w-5 h-5 text-gold-300 animate-pulse stroke-[1.25]" />
            </span>
            <p className="text-[10px] tracking-[0.4em] text-gold-300 font-mono uppercase mb-3">L'Intelligence Olfactive</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-widest text-white uppercase mb-4 leading-tight">
              TROUVEZ VOTRE PARFUM
            </h2>
            <p className="text-sm sm:text-base text-white/60 font-light max-w-lg mx-auto leading-relaxed mb-10">
              Répondez à quelques questions et laissez notre intelligence olfactive vous guider pour révéler la création de la Maison qui correspond à votre aura.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="start-diagnostic-btn"
                onClick={handleStart}
                className="px-8 py-3.5 rounded-full bg-gold-400 text-charcoal-900 text-xs tracking-[0.25em] font-medium uppercase shadow-lg hover:bg-gold-300 hover:scale-[1.02] transition-smooth cursor-pointer"
              >
                Commencer le diagnostic
              </button>
            </div>
          </div>
        )}

        {/* Play Quiz Active Questions View */}
        {isPlaying && !isAnalyzing && !matchedProduct && (
          <div className="text-left py-4 min-h-[460px] flex flex-col justify-between">
            {/* Progression indicators */}
            <div className="flex justify-between items-center pb-6 border-b border-white/5 mb-8">
              <button 
                id="quiz-back-btn"
                onClick={handleBack}
                className="text-[9px] tracking-widest uppercase text-white/50 hover:text-white transition-colors flex items-center space-x-1"
                aria-label="Back"
              >
                <Undo2 className="w-3 h-3 text-gold-400 mr-1" />
                <span>Retour</span>
              </button>
              
              {/* Progress bar */}
              <div className="flex items-center space-x-4">
                <span className="text-[10px] tracking-widest text-gold-300 font-mono">
                  QUESTION {currentStep + 1} SUR {QUIZ_QUESTIONS.length}
                </span>
                <div className="w-24 sm:w-36 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full bg-gold-400 transition-smooth"
                    style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Core Question Text */}
            <div className="animate-fade-in flex-1">
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-white leading-normal pl-1 border-l-2 border-gold-300">
                {QUIZ_QUESTIONS[currentStep].text}
              </h3>
              <p className="text-xs sm:text-sm text-white/55 font-light mt-2 pl-4 mb-8">
                {QUIZ_QUESTIONS[currentStep].subtitle}
              </p>

              {/* Unique Options List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {QUIZ_QUESTIONS[currentStep].options.map((opt) => {
                  const isSelected = answers[QUIZ_QUESTIONS[currentStep].id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      id={`quiz-opt-${opt.value}`}
                      onClick={() => handleSelectOption(QUIZ_QUESTIONS[currentStep].id, opt.value)}
                      className={`p-5 rounded-2xl text-left border cursor-pointer transition-smooth flex flex-col justify-between h-44 ${
                        isSelected 
                          ? 'border-gold-300 bg-gold-500/10 shadow-[0_0_15px_rgba(201,171,87,0.15)] text-white' 
                          : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white/90'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="p-2 bg-white/5 rounded-xl border border-white/10">
                          {getIcon(opt.iconName)}
                        </span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-gold-400 flex items-center justify-center text-charcoal-900 shadow-md">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-serif text-xs sm:text-sm tracking-wider font-semibold text-white uppercase">
                          {opt.label}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-white/40 leading-relaxed font-light mt-1.5 line-clamp-2">
                          {opt.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Loading / Analytical Calculation Screen */}
        {isAnalyzing && (
          <div className="text-center py-20 flex flex-col items-center justify-center min-h-[460px]">
            <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
              {/* Spinning luxury atom arcs */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold-300/30 animate-spin"></div>
              <div className="absolute w-14 h-14 rounded-full border border-yellow-400/20 animate-pulse bg-gold-400/5 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-gold-300 animate-bounce" />
              </div>
            </div>
            
            <p className="text-[10px] tracking-[0.4em] text-gold-300 font-mono uppercase mb-3">Intelligence Artificielle Olfactive</p>
            <h3 className="font-serif text-xl tracking-widest uppercase font-light text-white italic">
              CONVERSION DES MOLÉCULES DE SILLAGE...
            </h3>
            
            <p className="text-[11px] text-white/40 font-mono mt-4 max-w-xs leading-relaxed">
              Analyse des notes de cœur ({answers[2] || "Ambrées"}), pondération de l'empreinte ({answers[1] || "Intente"}) et étalonnage de la vision...
            </p>
          </div>
        )}

        {/* Match Result Display View */}
        {matchedProduct && !isAnalyzing && (
          <div className="bg-charcoal-900/60 rounded-3xl border border-white/15 p-6 sm:p-10 text-left animate-fade-in-up">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              
              {/* Product Visual Photo Column */}
              <div className="w-full md:w-2/5 aspect-[3/4] rounded-2xl overflow-hidden bg-charcoal-100 border border-white/10 shadow-2xl relative group flex-shrink-0">
                <img 
                  src={matchedProduct.image} 
                  alt={matchedProduct.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  referrerPolicy="no-referrer"
                />
                
                {/* Score badge sticker matching original circle look */}
                <div className="absolute top-4 left-4 z-10 flex flex-col items-center justify-center">
                  <div className="relative w-16 h-16 rounded-full glass-panel-dark flex flex-col items-center justify-center border border-gold-300/30">
                    <span className="text-[7px] tracking-widest text-gold-300">AFFINITÉ</span>
                    <span className="font-serif text-xs font-bold text-white mt-0.5">{matchPercentage}%</span>
                  </div>
                </div>
              </div>

              {/* Spec text details Column */}
              <div className="flex-1 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center space-x-1.5 mb-1.5">
                    <Award className="w-4 h-4 text-gold-400 stroke-[1.5]" />
                    <span className="text-[10px] tracking-[0.25em] font-mono text-gold-300 uppercase">VOTRE SIGNATURE OLFACTIVE</span>
                  </div>
                  
                  <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-widest text-white uppercase leading-none">
                    {matchedProduct.name}
                  </h3>
                  <p className="text-[10px] tracking-widest text-white/50 uppercase mt-1">
                    {matchedProduct.collection} — {matchedProduct.family}
                  </p>
                  
                  <div className="w-8 h-[1px] bg-gold-400 my-4 sm:my-5"></div>
                  
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans font-light mb-4">
                    {matchedProduct.description}
                  </p>

                  {/* Olfactory pyramid display */}
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2.5 text-xs text-white/80">
                    <div className="flex justify-between border-b border-white/5 pb-1 text-[10px]">
                      <span className="text-white/40 uppercase font-semibold">Pyramide</span>
                      <span className="text-gold-300 uppercase italic">Ingrédients</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gold-300 pr-1">Tête:</span>
                      <span className="text-white/70">{matchedProduct.notes.top}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gold-300 pr-1">Coeur:</span>
                      <span className="text-white/70">{matchedProduct.notes.heart}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gold-300 pr-1">Fond:</span>
                      <span className="text-white/70">{matchedProduct.notes.base}</span>
                    </div>
                  </div>
                </div>

                {/* Final Diagnostic Control CTA Buttons */}
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    id="add-match-to-cart-btn"
                    onClick={() => {
                      onAddToCart(matchedProduct, '100ml');
                    }}
                    className="flex-1 py-3 px-6 rounded-full bg-gold-400 hover:bg-gold-300 text-charcoal-900 text-xs tracking-widest uppercase font-semibold text-center hover:scale-[1.01] transition-smooth cursor-pointer"
                  >
                    Ajouter au Panier (100ml) — {matchedProduct.price} €
                  </button>
                  <button
                    id="match-details-btn"
                    onClick={() => onOpenQuickView(matchedProduct)}
                    className="py-3 px-5 rounded-full border border-white/20 hover:border-white text-white text-xs tracking-widest uppercase text-center transition-smooth cursor-pointer"
                  >
                    Fiche détails
                  </button>
                  <button
                    id="restart-quiz-btn"
                    onClick={handleStart}
                    className="py-3 px-3 rounded-full hover:bg-white/10 text-white/55 hover:text-white transition-smooth cursor-pointer flex items-center justify-center"
                    aria-label="Recommencer"
                  >
                    <Undo2 className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
