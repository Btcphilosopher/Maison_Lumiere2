import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Truck, CreditCard, Lock, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, volume: string, change: number) => void;
  onRemoveItem: (productId: string, volume: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Checkout Shipping form states
  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: 'France'
  });

  const [paymentForm, setPaymentForm] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  if (!isOpen) return null;

  // Let's compute price dynamically based on item sizes
  const getItemPrice = (item: CartItem) => {
    let base = item.product.price;
    if (item.selectedVolume === '50ml') base -= 40;
    if (item.selectedVolume === '200ml') base += 90;
    return base;
  };

  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      return acc + (getItemPrice(item) * item.quantity);
    }, 0);
  };

  const subtotal = getSubtotal();
  const freeShippingThreshold = 150; // free delivery above 150 €
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const total = subtotal + shippingFee;

  const handleNextStep = () => {
    if (checkoutStep === 'cart') {
      if (cartItems.length === 0) {
        alert("Votre panier est actuellement vide.");
        return;
      }
      setCheckoutStep('shipping');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingForm.firstName || !shippingForm.address || !paymentForm.cardNumber) {
      alert("S'il vous plaît, complétez toutes les coordonnées obligatoires.");
      return;
    }

    setIsProcessing(true);
    // Simulate real luxury bank gateway
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep('success');
      onClearCart(); // empties shopping bag state
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Dark overlay background */}
      <div 
        className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div 
          id="cart-drawer-panel"
          className="w-screen max-w-md bg-[#faf9f6] text-charcoal-900 shadow-2xl flex flex-col justify-between border-l border-charcoal-800/10 h-full relative"
        >
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-charcoal-900/5 bg-white flex justify-between items-center">
            <div className="flex items-center space-x-2.5 text-left">
              <ShoppingBag className="w-5 h-5 text-gold-500 stroke-[1.25]" />
              <h3 className="font-serif text-lg tracking-widest font-semibold uppercase text-charcoal-900">
                {checkoutStep === 'cart' && 'VOTRE PANIER'}
                {checkoutStep === 'shipping' && 'PAIEMENT & LIVRAISON'}
                {checkoutStep === 'success' && 'CONFIRMATION'}
              </h3>
            </div>
            <button 
              id="close-cart-btn"
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-charcoal-800/5 bg-charcoal-50 hover:bg-gold-500 hover:text-charcoal-900 flex items-center justify-center cursor-pointer transition-smooth"
              aria-label="Fermer le panier"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body Panel */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* STEP 1: Shopping Cart list */}
            {checkoutStep === 'cart' && (
              <>
                {/* Free shipping eligibility bar */}
                {subtotal > 0 && (
                  <div className="p-3 bg-white rounded-xl border border-charcoal-900/5 space-y-2 text-left">
                    <div className="flex justify-between items-center text-[10px] uppercase font-sans font-semibold">
                      <span className="flex items-center text-charcoal-800/80">
                        <Truck className="w-3.5 h-3.5 text-gold-500 mr-1.5 stroke-[1.5]" />
                        LIVRAISON OFFERTE
                      </span>
                      {subtotal >= freeShippingThreshold ? (
                        <span className="text-emerald-700">DÉBLOQUÉE !</span>
                      ) : (
                        <span className="text-gold-500">{freeShippingThreshold - subtotal} € restant</span>
                      )}
                    </div>
                    {/* Visual Progress slider bar */}
                    <div className="h-1.5 w-full bg-charcoal-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gold-400 transition-smooth"
                        style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-[9px] text-charcoal-800/50 leading-relaxed">
                      Maison Lumière offre les frais d'expédition internationaux de prestige pour toute commande supérieure à {freeShippingThreshold} €
                    </p>
                  </div>
                )}

                {/* Empty Cart layout */}
                {cartItems.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-charcoal-50 border border-charcoal-950/5 flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-charcoal-800/40 stroke-[1.25]" />
                    </div>
                    <p className="font-serif text-base text-charcoal-900/80 italic">Votre Panier est vide</p>
                    <p className="text-xs text-charcoal-800/40 max-w-xs leading-relaxed font-sans">
                      Explorez notre univers de créations olfactives exceptionnelles et découvrez votre sillage d'émotion.
                    </p>
                    <button 
                      onClick={onClose}
                      className="mt-2 px-5 py-2 text-[10px] tracking-widest uppercase bg-charcoal-900 text-white hover:bg-gold-500 hover:text-charcoal-900 rounded-md transition-smooth"
                    >
                      Continuer mes achats
                    </button>
                  </div>
                ) : (
                  /* Cart list items */
                  <div className="space-y-4">
                    {cartItems.map((item) => {
                      const itemPrice = getItemPrice(item);
                      return (
                        <div 
                          key={`${item.product.id}-${item.selectedVolume}`}
                          className="flex items-center space-x-4 p-3 bg-white rounded-xl border border-charcoal-900/5"
                        >
                          {/* Image thumbnail */}
                          <div className="w-16 h-20 rounded-lg overflow-hidden bg-charcoal-50 border border-charcoal-900/5 flex-shrink-0">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Brand specifications */}
                          <div className="flex-1 text-left min-w-0">
                            <span className="text-[8px] tracking-widest text-[#8c8577] uppercase block">{item.product.collection}</span>
                            <h4 className="font-serif text-sm tracking-wider uppercase text-charcoal-900 font-bold leading-tight truncate">
                              {item.product.name}
                            </h4>
                            <span className="inline-block bg-charcoal-100 text-[9px] font-semibold text-charcoal-800/70 px-1.5 py-0.5 rounded-md mt-1 mb-2">
                              {item.selectedVolume}
                            </span>
                            
                            {/* Quantity controls row */}
                            <div className="flex items-center space-x-2">
                              <button 
                                id={`qty-minus-${item.product.id}`}
                                onClick={() => onUpdateQuantity(item.product.id, item.selectedVolume, -1)}
                                className="w-6 h-6 rounded-md bg-charcoal-50 hover:bg-gold-50 border border-charcoal-900/5 flex items-center justify-center hover:border-gold-300 transition-smooth"
                              >
                                <Minus className="w-3 h-3 text-charcoal-800" />
                              </button>
                              <span className="text-xs font-mono w-5 text-center text-charcoal-950 font-bold">{item.quantity}</span>
                              <button 
                                id={`qty-plus-${item.product.id}`}
                                onClick={() => onUpdateQuantity(item.product.id, item.selectedVolume, 1)}
                                className="w-6 h-6 rounded-md bg-charcoal-50 hover:bg-gold-50 border border-charcoal-900/5 flex items-center justify-center hover:border-gold-300 transition-smooth"
                              >
                                <Plus className="w-3 h-3 text-charcoal-800" />
                              </button>
                            </div>
                          </div>

                          {/* Actions remove and price */}
                          <div className="flex flex-col items-end justify-between h-20 pl-2">
                            <button 
                              id={`remove-item-${item.product.id}`}
                              onClick={() => onRemoveItem(item.product.id, item.selectedVolume)}
                              className="p-1 text-[#8c8577] hover:text-rose-600 transition-smooth rounded-full"
                              aria-label="Supprimer l'article"
                            >
                              <Trash2 className="w-4 h-4 stroke-[1.5]" />
                            </button>
                            <span className="font-serif text-sm font-bold text-charcoal-950 block">
                              {itemPrice * item.quantity} €
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* STEP 2: Checkout shipping address + payment details */}
            {checkoutStep === 'shipping' && (
              <form onSubmit={handleCheckoutSubmit} className="space-y-5 text-left">
                {/* Back button */}
                <button
                  type="button"
                  id="checkout-back-btn"
                  onClick={() => setCheckoutStep('cart')}
                  className="text-[9px] tracking-widest text-[#8c8577] uppercase hover:text-charcoal-950 transition-colors flex items-center space-x-1 border-b border-transparent hover:border-[#8c8577] pb-0.5"
                >
                  ← Retour au Panier
                </button>

                {/* Sub-header address */}
                <div className="space-y-4">
                  <h4 className="text-[10px] tracking-[0.25em] font-sans font-semibold text-charcoal-950 uppercase border-b border-charcoal-950/5 pb-1">
                    1. ADRESSE DE LIVRAISON PRESTIGE
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <label className="text-[9px] text-[#8c8577] font-semibold tracking-wide uppercase block mb-1">Prénom *</label>
                      <input 
                        type="text" 
                        id="sh-firstname"
                        required
                        className="w-full bg-white border border-charcoal-900/10 p-2.5 rounded-lg text-xs tracking-wider uppercase focus:outline-none focus:border-gold-500 font-sans"
                        value={shippingForm.firstName}
                        onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-[#8c8577] font-semibold tracking-wide uppercase block mb-1">Nom *</label>
                      <input 
                        type="text" 
                        required
                        id="sh-lastname"
                        className="w-full bg-white border border-charcoal-900/10 p-2.5 rounded-lg text-xs tracking-wider uppercase focus:outline-none focus:border-gold-500 font-sans"
                        value={shippingForm.lastName}
                        onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] text-[#8c8577] font-semibold tracking-wide uppercase block mb-1">E-mail de contact *</label>
                    <input 
                      type="email" 
                      required
                      id="sh-email"
                      className="w-full bg-white border border-charcoal-900/10 p-2.5 rounded-lg text-xs tracking-wider focus:outline-none focus:border-gold-500 font-sans"
                      value={shippingForm.email}
                      onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-[9px] text-[#8c8577] font-semibold tracking-wide uppercase block mb-1">Adresse postale complète *</label>
                    <input 
                      type="text" 
                      required
                      id="sh-address"
                      className="w-full bg-white border border-charcoal-900/10 p-2.5 rounded-lg text-xs tracking-wider uppercase focus:outline-none focus:border-gold-500 font-sans"
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <label className="text-[9px] text-[#8c8577] font-semibold tracking-wide uppercase block mb-1">Ville *</label>
                      <input 
                        type="text" 
                        required
                        id="sh-city"
                        className="w-full bg-white border border-charcoal-900/10 p-2.5 rounded-lg text-xs tracking-wider uppercase focus:outline-none focus:border-gold-500 font-sans"
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-[#8c8577] font-semibold tracking-wide uppercase block mb-1">Code Postal *</label>
                      <input 
                        type="text" 
                        required
                        id="sh-zip"
                        className="w-full bg-white border border-charcoal-900/10 p-2.5 rounded-lg text-xs tracking-wider focus:outline-none focus:border-gold-500 font-sans font-semibold"
                        value={shippingForm.zip}
                        onChange={(e) => setShippingForm({ ...shippingForm, zip: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Sub-header card details */}
                <div className="space-y-4 pt-4 border-t border-charcoal-900/5">
                  <h4 className="text-[10px] tracking-[0.25em] font-sans font-semibold text-charcoal-950 uppercase border-b border-charcoal-950/5 pb-1 flex items-center justify-between">
                    <span>2. COORDONNÉES DE PAIEMENT</span>
                    <Lock className="w-3.5 h-3.5 text-[#8c8577] ml-2.5 stroke-[1.5]" />
                  </h4>

                  <div>
                    <label className="text-[9px] text-[#8c8577] font-semibold tracking-wide uppercase block mb-1">Titulaire de la carte *</label>
                    <input 
                      type="text" 
                      required
                      id="card-name"
                      placeholder="M. LAURENT LUMIÈRE"
                      className="w-full bg-white border border-charcoal-900/10 p-2.5 rounded-lg text-xs tracking-wider uppercase focus:outline-none focus:border-gold-500 font-sans font-medium"
                      value={paymentForm.cardName}
                      onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-[9px] text-[#8c8577] font-semibold tracking-wide uppercase block mb-1 font-sans">Numéro de carte *</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        id="card-number"
                        maxLength={19}
                        placeholder="4532 8904 1234 5678"
                        className="w-full bg-white border border-charcoal-900/10 p-2.5 rounded-lg text-xs tracking-widest focus:outline-none focus:border-gold-500 font-sans"
                        value={paymentForm.cardNumber}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                      />
                      <CreditCard className="absolute right-3 top-3 w-4 h-4 text-[#8c8577] stroke-[1.25]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <label className="text-[9px] text-[#8c8577] font-semibold tracking-wide uppercase block mb-1 font-sans">Expiration *</label>
                      <input 
                        type="text" 
                        required
                        id="card-expiry"
                        maxLength={5}
                        placeholder="08/29"
                        className="w-full bg-white border border-charcoal-900/10 p-2.5 rounded-lg text-xs tracking-wider text-center focus:outline-none focus:border-gold-500 font-sans"
                        value={paymentForm.cardExpiry}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardExpiry: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-[#8c8577] font-semibold tracking-wide uppercase block mb-1 font-sans">CVV *</label>
                      <input 
                        type="password" 
                        required
                        id="card-cvv"
                        maxLength={4}
                        placeholder="***"
                        className="w-full bg-white border border-charcoal-900/10 p-2.5 rounded-lg text-xs text-center tracking-widest focus:outline-none focus:border-gold-500 font-sans font-semibold"
                        value={paymentForm.cardCvv}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardCvv: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit trigger button for form */}
                <button 
                  type="submit"
                  id="checkout-submit-btn"
                  disabled={isProcessing}
                  className="w-full py-4 mt-6 rounded-full bg-charcoal-950 text-white text-xs tracking-widest font-semibold uppercase hover:bg-gold-500 hover:text-charcoal-900 transition-smooth font-sans shadow-lg cursor-pointer flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>TRAITEMENT BANCAIRE SÉCURISÉ...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 mr-1" />
                      <span>S\'AQUITTER DE {total} €</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* STEP 3: Purchase Success Confirmation ticket */}
            {checkoutStep === 'success' && (
              <div className="py-12 text-center space-y-6 animate-fade-in text-charcoal-900 text-left">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-500/25 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-8 h-8 stroke-[2.5] animate-bounce" />
                </div>
                
                <div className="space-y-2 text-center text-left">
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 py-1 px-3 rounded-full font-sans uppercase font-bold inline-block mx-auto">PAIEMENT REÇU</span>
                  <p className="font-serif text-lg sm:text-xl font-bold tracking-widest text-charcoal-950 uppercase mt-2">MERCI ET FÉLICITATIONS</p>
                  <p className="text-xs text-charcoal-800/60 leading-relaxed font-sans max-w-sm mx-auto">
                    Votre commande de sillage précieux a été approuvée avec succès. Notre équipe prépare votre emballage d'art dans nos ateliers parisiens.
                  </p>
                </div>

                {/* Printable luxury invoice mockup ticket */}
                <div className="p-5 bg-white rounded-2xl border border-charcoal-900/5 text-left text-xs text-charcoal-800 space-y-3.5 shadow-sm font-sans mx-auto max-w-sm">
                  <div className="flex justify-between items-center text-[10px] border-b border-charcoal-900/5 pb-2 uppercase font-semibold text-[#8c8577]">
                    <span>RÉFÉRENCE FACTURE</span>
                    <span className="font-mono text-charcoal-900">#LM-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="space-y-1.5 font-light text-[11px]">
                    <div className="flex justify-between">
                      <span>Destinataire :</span>
                      <span className="font-semibold text-charcoal-950">M. {shippingForm.firstName || "Laurent"} {shippingForm.lastName || "Lumière"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lieu de sillage :</span>
                      <span className="font-semibold text-charcoal-950 truncate line-clamp-1 max-w-[200px] text-right">{shippingForm.address || "Champs-Élysées, Paris"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Acheminement :</span>
                      <span className="font-semibold text-emerald-800">DHL Express (2 jours ouvrés)</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-charcoal-900/5 flex justify-between font-bold text-xs uppercase text-charcoal-950">
                    <span>FONDS TRANSACTÉS :</span>
                    <span className="text-gold-500 text-sm tracking-wider font-semibold">{total || 185} €</span>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <button
                    id="success-dismiss-btn"
                    onClick={() => {
                      setCheckoutStep('cart');
                      onClose();
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#e5dfd5] hover:bg-gold-500 hover:text-charcoal-900 text-charcoal-800 text-[10px] tracking-widest uppercase font-semibold transition-smooth cursor-pointer"
                  >
                    Fermer l\'historique
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Drawer Footer summary (Only shown in step 1 of cart list) */}
          {checkoutStep === 'cart' && cartItems.length > 0 && (
            <div className="p-4 sm:p-6 bg-white border-t border-charcoal-900/5 text-left">
              <div className="space-y-2 text-xs font-sans text-charcoal-800/80">
                <div className="flex justify-between font-light">
                  <span>Sous-total flacons :</span>
                  <span className="text-charcoal-950 font-semibold">{subtotal} €</span>
                </div>
                <div className="flex justify-between font-light">
                  <span>Envoi recommandé & Assuré :</span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-semibold">GRATUIT</span>
                  ) : (
                    <span className="text-charcoal-950 font-semibold">{shippingFee} €</span>
                  )}
                </div>
                <div className="flex justify-between text-sm uppercase text-charcoal-950 font-bold pt-2 border-t border-charcoal-900/5">
                  <span className="font-serif tracking-wider">TOTAL ESTIMÉ :</span>
                  <span className="text-gold-500 font-semibold text-base">{total} €</span>
                </div>
              </div>

              {/* Primary checkout navigation */}
              <div className="mt-5 flex gap-2">
                <button
                  id="checkout-initiate-btn"
                  onClick={handleNextStep}
                  className="flex-1 py-3.5 rounded-full bg-charcoal-950 hover:bg-gold-500 hover:text-charcoal-900 text-white text-xs tracking-widest uppercase font-semibold text-center hover:scale-[1.01] transition-smooth cursor-pointer"
                >
                  PASSER À LA CAISSE
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
