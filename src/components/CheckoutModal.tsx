import React, { useState } from 'react';
import { CartItem, CheckoutDetails, ConfirmedOrder } from '../types';
import { 
  X, 
  CheckCircle2, 
  Car, 
  Phone, 
  User, 
  CreditCard, 
  Smartphone, 
  Clock, 
  AlertCircle,
  ShieldCheck,
  Receipt,
  ArrowRight
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
  const [vehicleDescription, setVehicleDescription] = useState('Grey Ford F-150');
  const [curbsideSpot, setCurbsideSpot] = useState('Spot 3');
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'google_pay' | 'credit_card' | 'pay_at_pickup'>('apple_pay');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('849');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

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
      const orderNum = `NB-${Math.floor(1000 + Math.random() * 9000)}`;
      const readyTime = pickupType === 'asap' ? 'in 25-30 minutes' : `at ${scheduledTime}`;

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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#1a1e24] text-[#F5F5F3] rounded-2xl border border-white/15 shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#141618] flex items-center justify-between">
          <div>
            <span className="font-script text-[#E5A93C] text-base block -mb-1">Fast & Frictionless</span>
            <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white">
              {confirmedOrder ? 'ORDER CONFIRMED' : 'CURBSIDE TAKEOUT CHECKOUT'}
            </h3>
          </div>
          <button
            onClick={onClose}
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
               POST-ORDER SUCCESS & TRACKING STATE
               ========================================== */
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h4 className="font-chalk text-3xl text-white tracking-wide">
                  ORDER #{confirmedOrder.orderNumber} RECEIVED
                </h4>
                <p className="text-emerald-400 font-semibold text-sm mt-1">
                  Ready {confirmedOrder.estimatedReadyTime}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Confirmation text sent to <strong className="text-gray-200">{confirmedOrder.checkoutDetails.customerPhone}</strong>
                </p>
              </div>

              {/* Progress Step Indicator */}
              <div className="bg-[#141618] p-4 rounded-xl border border-white/10 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E5A93C] block">
                  Live Kitchen Status
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 font-semibold">
                    <span className="block text-[10px] text-gray-400">Step 1</span>
                    Order Placed
                  </div>
                  <div className="p-2 rounded bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#E5A93C] font-semibold animate-pulse">
                    <span className="block text-[10px] text-gray-400">Step 2</span>
                    In Kitchen Ovens
                  </div>
                  <div className="p-2 rounded bg-[#1e2228] border border-white/5 text-gray-500">
                    <span className="block text-[10px] text-gray-400">Step 3</span>
                    Curbside Ready
                  </div>
                </div>
              </div>

              {/* Curbside pickup instructions */}
              <div className="p-4 bg-[#E5A93C]/10 border border-[#E5A93C]/30 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-[#E5A93C] text-sm">
                  <Car className="w-4 h-4" />
                  <span>Curbside Pickup Instructions</span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  When you arrive along <strong>Highway 61</strong>, park in any designated Takeout Stall (1–4). 
                  Text/call <strong className="text-white font-mono">(807) 475-3544</strong> or reply to your SMS link with your stall number for immediate runner service!
                </p>
              </div>

              {/* Receipt Summary */}
              <div className="p-4 bg-[#141618] rounded-xl border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between font-semibold text-gray-300 border-b border-white/10 pb-2">
                  <span>Summary ({confirmedOrder.items.length} items)</span>
                  <span className="font-mono text-[#E5A93C]">${confirmedOrder.total.toFixed(2)}</span>
                </div>
                <div className="space-y-1 pt-1 text-gray-400">
                  {confirmedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.quantity}x {item.menuItem.name} {item.selectedPortion?.name ? `(${item.selectedPortion.name})` : ''}</span>
                      <span className="font-mono text-gray-300">${item.totalPrice.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-white/5 flex justify-between text-gray-300 font-bold">
                    <span>Paid via {confirmedOrder.checkoutDetails.paymentMethod.replace('_', ' ').toUpperCase()}</span>
                    <span className="font-mono text-emerald-400">PAID</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 bg-[#E5A93C] hover:bg-[#d4982d] text-black font-bold rounded-xl text-sm transition-colors shadow-lg"
              >
                Close & Return to Menu
              </button>
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
                  1. Contact Information (For SMS Notifications)
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
                        className="w-full pl-9 pr-3 py-2 bg-[#141618] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5A93C]"
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
                        className="w-full pl-9 pr-3 py-2 bg-[#141618] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Curbside Vehicle Identification */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase tracking-wider text-[#E5A93C] block">
                    2. Curbside Vehicle Details (Optional)
                  </span>
                  <label className="flex items-center gap-1.5 cursor-pointer text-gray-300">
                    <input
                      type="checkbox"
                      checked={isCurbside}
                      onChange={(e) => setIsCurbside(e.target.checked)}
                      className="accent-[#E5A93C] rounded"
                    />
                    <span className="text-xs sm:text-sm font-medium">Bring order to my car</span>
                  </label>
                </div>

                {/* Direct Curbside Instructions Callout */}
                <div className="p-3 bg-[#E5A93C]/10 border border-[#E5A93C]/30 rounded-xl space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#E5A93C]">
                    <Car className="w-3.5 h-3.5" />
                    <span>Highway 61 Arrival Instructions:</span>
                  </div>
                  <p className="text-gray-200 leading-relaxed">
                    Upon arrival along Highway 61, pull directly into dedicated <strong>Takeout Stalls 1–4</strong>.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Text/call <strong className="text-white font-mono">(807) 475-3544</strong> or reply to your SMS confirmation with your stall number for immediate runner service.
                  </p>
                </div>

                {isCurbside && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-[#141618] rounded-xl border border-white/10">
                    <div>
                      <label className="block text-gray-400 mb-1 text-xs font-medium">Vehicle Make / Color</label>
                      <input
                        type="text"
                        value={vehicleDescription}
                        onChange={(e) => setVehicleDescription(e.target.value)}
                        placeholder="e.g. Grey Ford F-150 or Red Civic"
                        className="w-full px-3 py-2 bg-[#1e2228] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1 text-xs font-medium">Curbside Stall (If Parked)</label>
                      <input
                        type="text"
                        value={curbsideSpot}
                        onChange={(e) => setCurbsideSpot(e.target.value)}
                        placeholder="e.g. Stall 1, Stall 2, or 'In Transit'"
                        className="w-full px-3 py-2 bg-[#1e2228] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5A93C]"
                      />
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
                  <span>HST (13%):</span>
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
      </div>
    </div>
  );
};
