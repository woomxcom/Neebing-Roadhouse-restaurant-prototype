import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem, CheckoutDetails, ConfirmedOrder } from '../types';
import { 
  X, 
  CheckCircle2, 
  Car, 
  Phone, 
  User, 
  CreditCard, 
  Clock, 
  AlertCircle,
  Navigation,
  Sparkles,
  ArrowRight,
  MapPin,
  Check
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  tipPercentage: number;
  customTipAmount: number;
  pickupType: 'asap' | 'scheduled';
  scheduledTime: string;
  onOrderPlaced: (order: ConfirmedOrder) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  tipPercentage,
  customTipAmount,
  pickupType,
  scheduledTime,
  onOrderPlaced,
  onClearCart,
}) => {
  // Form state
  const [customerName, setCustomerName] = useState('Alex Henderson');
  const [customerPhone, setCustomerPhone] = useState('(807) 555-0199');
  const [customerEmail, setCustomerEmail] = useState('alex.h@gmail.com');
  const [isCurbside, setIsCurbside] = useState(true);
  const [vehicleDescription, setVehicleDescription] = useState('Silver Ford F-150');
  const [curbsideSpot, setCurbsideSpot] = useState('Stall 2');
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'google_pay' | 'credit_card' | 'pay_at_pickup'>('apple_pay');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('849');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);
  const [hasNotifiedArrival, setHasNotifiedArrival] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const stallOptions = ['Stall 1', 'Stall 2', 'Stall 3', 'Stall 4', 'General Parking'];

  // Financials
  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const tax = subtotal * 0.13;
  const tip = customTipAmount > 0 ? customTipAmount : (subtotal * tipPercentage) / 100;
  const grandTotal = subtotal + tax + tip;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setError('Please provide your name and mobile number for pickup SMS updates.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Simulate rapid processing
    setTimeout(() => {
      const orderNum = `NR-${Math.floor(8000 + Math.random() * 1000)}`;
      const readyTime = pickupType === 'asap' ? 'in 25-35 minutes' : `at ${scheduledTime}`;

      const newOrder: ConfirmedOrder = {
        orderNumber: orderNum,
        items,
        subtotal,
        tax,
        tip,
        total: grandTotal,
        checkoutDetails: {
          customerName,
          customerPhone,
          customerEmail,
          pickupType,
          scheduledTime,
          isCurbside,
          vehicleDescription,
          curbsideSpot,
          paymentMethod,
          tipPercentage,
          customTipAmount,
        },
        placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedReadyTime: readyTime,
      };

      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      onOrderPlaced(newOrder);
      onClearCart();
    }, 600);
  };

  const handleCloseAndReset = () => {
    setConfirmedOrder(null);
    setHasNotifiedArrival(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop with fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={handleCloseAndReset}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container with scale/fade */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340, mass: 0.8 }}
            className="relative w-full max-w-xl bg-[#1A1D23] text-[#F5F5F3] rounded-2xl border border-white/15 shadow-2xl overflow-hidden max-h-[95vh] flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-[#141618] flex items-center justify-between">
              <div>
                <span className="font-script text-[#E5A93C] text-base block -mb-1">
                  {confirmedOrder ? 'Order Tracking' : 'Fast & Frictionless'}
                </span>
                <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white">
                  {confirmedOrder ? 'ORDER CONFIRMED' : 'CURBSIDE TAKEOUT CHECKOUT'}
                </h3>
              </div>
              <button
                onClick={handleCloseAndReset}
                className="p-1.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {confirmedOrder ? (
            /* ==========================================
               INTERACTIVE ORDER CONFIRMATION / TRACKING
               ========================================== */
            <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
              {/* Status Header */}
              <div className="text-center py-2">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h4 className="font-chalk text-3xl sm:text-4xl text-white tracking-wide">
                  ORDER CONFIRMED & SENT TO KITCHEN!
                </h4>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="font-mono font-bold text-sm bg-black/40 px-2.5 py-0.5 rounded text-[#E5A93C] border border-[#E5A93C]/30">
                    #{confirmedOrder.orderNumber}
                  </span>
                  <span className="text-gray-400 text-xs">•</span>
                  <span className="text-emerald-400 font-semibold text-xs sm:text-sm">
                    Estimated Pickup: 25–35 Minutes
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-1.5">
                  Confirmation text sent to <strong className="text-gray-200">{confirmedOrder.checkoutDetails.customerPhone}</strong>
                </p>
              </div>

              {/* Curbside Check-in Card with Interactive Runner Alert */}
              <div className="p-4 bg-[#141618] border border-[#E5A93C]/40 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-[#E5A93C] text-xs uppercase tracking-wider">
                    <Car className="w-4 h-4" />
                    <span>Curbside Runner Check-In</span>
                  </div>
                  <span className="text-[11px] font-mono text-gray-300">
                    Vehicle: <strong className="text-white">{confirmedOrder.checkoutDetails.vehicleDescription || 'Silver F-150'}</strong> • <strong className="text-[#E5A93C]">{confirmedOrder.checkoutDetails.curbsideSpot || 'Stall 2'}</strong>
                  </span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  Upon arrival along Highway 61, pull directly into your reserved Takeout Stall. Tap below to notify our expediter runner for immediate window delivery:
                </p>

                {hasNotifiedArrival ? (
                  <div className="p-3 bg-emerald-950/90 border border-emerald-500/50 rounded-xl flex items-center justify-center gap-2 text-emerald-300 font-semibold text-xs animate-in zoom-in-95 duration-200">
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                    <span>Runner Notified! Hot Order on the Way to Your Car</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setHasNotifiedArrival(true)}
                    className="w-full py-3 bg-[#E5A93C] hover:bg-[#d4982d] text-black font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <Car className="w-4 h-4" />
                    <span>Tap When You've Arrived</span>
                  </button>
                )}
              </div>

              {/* Itemized Order Summary */}
              <div className="p-4 bg-[#141618] rounded-xl border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between font-semibold text-gray-300 border-b border-white/10 pb-2">
                  <span>Itemized Receipt ({confirmedOrder.items.length} items)</span>
                  <span className="font-mono text-[#E5A93C]">${confirmedOrder.total.toFixed(2)}</span>
                </div>
                <div className="space-y-1.5 pt-1 text-gray-400">
                  {confirmedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <div>
                        <span className="text-white font-medium">{item.quantity}x {item.menuItem.name}</span>
                        {item.selectedPortion?.name && (
                          <span className="text-gray-400 text-[11px] block">{item.selectedPortion.name}</span>
                        )}
                        {item.selectedOptions.length > 0 && (
                          <span className="text-[10px] text-gray-500 block">
                            {item.selectedOptions.map(o => o.optionName).join(', ')}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-gray-300 font-medium">${item.totalPrice.toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <div className="pt-2 border-t border-white/5 space-y-1 text-gray-400">
                    <div className="flex justify-between">
                      <span>Ontario HST (13%):</span>
                      <span className="font-mono">${confirmedOrder.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kitchen Gratuity:</span>
                      <span className="font-mono">${confirmedOrder.tip.toFixed(2)}</span>
                    </div>
                    <div className="pt-1 border-t border-white/5 flex justify-between text-white font-bold">
                      <span>Paid via {confirmedOrder.checkoutDetails.paymentMethod.replace('_', ' ').toUpperCase()}</span>
                      <span className="font-mono text-emerald-400">PAID</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Navigation Buttons */}
              <div className="space-y-2 pt-1">
                <a
                  href="https://maps.google.com/?q=Neebing+Roadhouse+Thunder+Bay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#E5A93C]" />
                  <span>Open Google Maps Navigation</span>
                </a>

                <button
                  type="button"
                  onClick={handleCloseAndReset}
                  className="w-full py-3 bg-[#E5A93C] hover:bg-[#d4982d] text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-lg"
                >
                  Close & Return to Menu
                </button>
              </div>
            </div>
          ) : (
            /* ==========================================
               CHECKOUT INPUT FORM (FAST SINGLE-SCREEN)
               ========================================== */
            <form onSubmit={handlePlaceOrder} className="space-y-5 text-xs">
              {error && (
                <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-lg text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* 1. Contact Information */}
              <div className="space-y-3">
                <span className="font-bold uppercase tracking-wider text-[#E5A93C] block">
                  1. Contact Information (For SMS Notifications) <span className="text-red-400">*</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-400 mb-1">Full Name *</label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-9 pr-3 py-2 bg-[#121417] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">Mobile Phone (SMS Ready Alerts) *</label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="(807) 555-0199"
                        className="w-full pl-9 pr-3 py-2 bg-[#121417] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Curbside Vehicle Identification & Designated Stall Selection */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase tracking-wider text-[#E5A93C] block">
                    2. Curbside Pickup Details (Dedicated Stalls 1–4)
                  </span>
                  <label className="flex items-center gap-1.5 cursor-pointer text-gray-300">
                    <input
                      type="checkbox"
                      checked={isCurbside}
                      onChange={(e) => setIsCurbside(e.target.checked)}
                      className="accent-[#E5A93C] rounded"
                    />
                    <span className="text-xs sm:text-sm font-medium">Curbside Runner Delivery</span>
                  </label>
                </div>

                {/* Direct Curbside Instructions Callout */}
                <div className="p-3 bg-[#E5A93C]/10 border border-[#E5A93C]/30 rounded-xl space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#E5A93C]">
                    <Car className="w-3.5 h-3.5" />
                    <span>Dedicated Takeout Stalls 1–4</span>
                  </div>
                  <p className="text-gray-200 leading-relaxed">
                    Pull directly into marked Takeout Stalls 1–4 along the front lot. A runner will bring your hot order directly to your window.
                  </p>
                </div>

                {isCurbside && (
                  <div className="space-y-3 p-3.5 bg-[#141618] rounded-xl border border-white/10">
                    {/* Vehicle Description */}
                    <div>
                      <label className="block text-gray-400 mb-1 text-xs font-medium">Vehicle Make / Color *</label>
                      <input
                        type="text"
                        required={isCurbside}
                        value={vehicleDescription}
                        onChange={(e) => setVehicleDescription(e.target.value)}
                        placeholder="e.g., Silver Ford F-150 / Red Honda Civic"
                        className="w-full px-3 py-2 bg-[#1e2228] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>

                    {/* Designated Pickup Stall Radio Pills */}
                    <div>
                      <label className="block text-gray-400 mb-1.5 text-xs font-medium">
                        Designated Pickup Stall *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {stallOptions.map((stall) => (
                          <button
                            key={stall}
                            type="button"
                            onClick={() => setCurbsideSpot(stall)}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                              curbsideSpot === stall
                                ? 'bg-[#E5A93C] text-black border-[#E5A93C] shadow-sm'
                                : 'bg-[#1e2228] border-white/10 text-gray-300 hover:border-white/30'
                            }`}
                          >
                            {stall}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Payment Method */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <span className="font-bold uppercase tracking-wider text-[#E5A93C] block">
                  3. Payment Selection
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      paymentMethod === 'apple_pay'
                        ? 'bg-[#E5A93C]/20 border-[#E5A93C] text-white font-bold'
                        : 'bg-[#141618] border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="block font-medium">Apple Pay</span>
                    <span className="text-[10px] text-gray-400">1-Tap</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('google_pay')}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      paymentMethod === 'google_pay'
                        ? 'bg-[#E5A93C]/20 border-[#E5A93C] text-white font-bold'
                        : 'bg-[#141618] border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="block font-medium">Google Pay</span>
                    <span className="text-[10px] text-gray-400">1-Tap</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      paymentMethod === 'credit_card'
                        ? 'bg-[#E5A93C]/20 border-[#E5A93C] text-white font-bold'
                        : 'bg-[#141618] border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="block font-medium">Credit Card</span>
                    <span className="text-[10px] text-gray-400">Direct</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pay_at_pickup')}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      paymentMethod === 'pay_at_pickup'
                        ? 'bg-[#E5A93C]/20 border-[#E5A93C] text-white font-bold'
                        : 'bg-[#141618] border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="block font-medium">Pay at Car</span>
                    <span className="text-[10px] text-gray-400">Debit / Cash</span>
                  </button>
                </div>

                {paymentMethod === 'credit_card' && (
                  <div className="p-3 bg-[#141618] rounded-xl border border-white/10 space-y-2">
                    <div>
                      <label className="block text-gray-400 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-[#1e2228] border border-white/10 rounded-lg text-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-gray-400 mb-1">Expiry</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 bg-[#1e2228] border border-white/10 rounded-lg text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">CVC</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-3 py-2 bg-[#1e2228] border border-white/10 rounded-lg text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Final Summary */}
              <div className="p-3.5 bg-[#141618] rounded-xl border border-white/10 space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Pickup Timing:</span>
                  <span className="text-white font-medium">
                    {pickupType === 'asap' ? 'ASAP (~25-35 mins)' : `Scheduled for ${scheduledTime}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Items Subtotal:</span>
                  <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>HST (13% Ontario):</span>
                  <span className="font-mono text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Kitchen Gratuity:</span>
                  <span className="font-mono text-white">${tip.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span className="font-chalk text-base text-[#E5A93C]">TOTAL TO BE CHARGED</span>
                  <span className="font-mono text-base text-[#E5A93C]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#E5A93C] hover:bg-[#d4982d] text-black font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98"
              >
                {isSubmitting ? (
                  <span>Transmitting to Kitchen...</span>
                ) : (
                  <>
                    <span>Confirm & Send Order — ${grandTotal.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
  );
};
