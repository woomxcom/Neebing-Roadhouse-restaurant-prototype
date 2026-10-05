import React, { useState } from 'react';
import { CartItem } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Clock, 
  Car, 
  ShoppingBag, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onOpenCheckout: (tipPercent: number, customTip: number, pickupType: 'asap' | 'scheduled', scheduledTime: string) => void;
  isKitchenThrottled: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  isKitchenThrottled,
}) => {
  const [pickupPreference, setPickupPreference] = useState<'asap' | 'scheduled'>('asap');
  const [scheduledTime, setScheduledTime] = useState('5:30 PM');
  const [selectedTipPercent, setSelectedTipPercent] = useState<number>(15);
  const [customTip, setCustomTip] = useState<string>('');
  const [showCustomTipInput, setShowCustomTipInput] = useState(false);

  if (!isOpen) return null;

  // Financial calculations
  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const hstTax = subtotal * 0.13; // 13% Ontario HST

  const calculatedTip = showCustomTipInput
    ? parseFloat(customTip) || 0
    : (subtotal * selectedTipPercent) / 100;

  const grandTotal = subtotal + hstTax + calculatedTip;

  const handleCheckoutClick = () => {
    onOpenCheckout(
      showCustomTipInput ? 0 : selectedTipPercent,
      showCustomTipInput ? parseFloat(customTip) || 0 : 0,
      pickupPreference,
      scheduledTime
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#1a1e24] text-[#F5F5F3] h-full shadow-2xl border-l border-white/10 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#141618] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E5A93C]" />
            <h3 className="font-chalk text-2xl tracking-wide text-white">
              YOUR TAKEOUT ORDER
            </h3>
            <span className="text-xs font-mono text-gray-400 bg-white/10 px-2 py-0.5 rounded">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-gray-400">
                <ShoppingBag className="w-8 h-8 text-[#E5A93C]" />
              </div>
              <h4 className="font-chalk text-2xl text-gray-300 mb-1">Your Cart is Empty</h4>
              <p className="text-xs text-gray-400 max-w-xs mx-auto mb-6">
                Explore our digital chalkboard menu to add Thunder Bay’s favorite wings, burgers, and poutines!
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#E5A93C] text-black font-bold text-xs uppercase tracking-wider rounded-lg shadow hover:bg-[#d4982d] transition-colors"
              >
                Browse Chalkboard Menu
              </button>
            </div>
          ) : (
            <>
              {/* Pickup timing selector */}
              <div className="p-3 bg-[#141618] rounded-xl border border-white/10">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#E5A93C] mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Pickup Timing
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPickupPreference('asap')}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border text-left transition-all ${
                      pickupPreference === 'asap'
                        ? 'bg-[#E5A93C]/20 border-[#E5A93C] text-white font-semibold'
                        : 'bg-[#1a1e24] border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="block font-semibold">ASAP Pickup</span>
                    <span className="text-[10px] text-gray-400 font-mono">~25-35 mins</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPickupPreference('scheduled')}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border text-left transition-all ${
                      pickupPreference === 'scheduled'
                        ? 'bg-[#E5A93C]/20 border-[#E5A93C] text-white font-semibold'
                        : 'bg-[#1a1e24] border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="block font-semibold">Schedule Later</span>
                    <span className="text-[10px] text-gray-400 font-mono">Select time</span>
                  </button>
                </div>

                {pickupPreference === 'scheduled' && (
                  <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-gray-400">Target Time:</span>
                    <select
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      aria-label="Select pickup time"
                      className="bg-[#1e2228] text-white text-xs border border-white/20 rounded px-2.5 py-1 focus:outline-none focus:border-[#E5A93C]"
                    >
                      <option value="4:30 PM">4:30 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                      <option value="5:30 PM">5:30 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                      <option value="6:30 PM">6:30 PM</option>
                      <option value="7:00 PM">7:00 PM</option>
                      <option value="7:30 PM">7:30 PM</option>
                      <option value="8:00 PM">8:00 PM</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3.5 bg-[#141618] rounded-xl border border-white/10 flex flex-col justify-between gap-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-white">
                          {item.menuItem.name}
                        </h4>
                        {item.selectedPortion && (
                          <span className="text-xs text-[#E5A93C] font-medium block">
                            {item.selectedPortion.name}
                          </span>
                        )}
                        {/* Selected modifiers */}
                        {item.selectedOptions.length > 0 && (
                          <div className="mt-1 space-y-0.5">
                            {item.selectedOptions.map((opt, idx) => (
                              <div key={idx} className="text-[11px] text-gray-400 flex items-center justify-between">
                                <span>• {opt.optionName}</span>
                                {opt.price > 0 && (
                                  <span className="font-mono text-gray-500">
                                    +${opt.price.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        {/* Special instructions */}
                        {item.specialInstructions && (
                          <p className="text-[11px] text-amber-300/80 italic mt-1 bg-white/5 p-1 rounded">
                            Note: "{item.specialInstructions}"
                          </p>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-mono tabular-nums font-bold text-sm text-[#E5A93C]">
                          ${item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity controls and delete */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <div className="flex items-center bg-[#1e2228] border border-white/10 rounded-md p-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-mono tabular-nums text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-gray-500 hover:text-red-400 p-1 text-xs transition-colors flex items-center gap-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="text-[10px]">Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer / Financials & Checkout CTA */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-white/10 bg-[#141618] space-y-3.5">
            {/* Tip selector buttons */}
            <div>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                <span className="font-semibold text-gray-300">Tip the Roadhouse Kitchen:</span>
                <span className="font-mono tabular-nums text-[#E5A93C]">
                  ${calculatedTip.toFixed(2)}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[10, 15, 18, 20].map((tipVal) => (
                  <button
                    key={tipVal}
                    type="button"
                    onClick={() => {
                      setShowCustomTipInput(false);
                      setSelectedTipPercent(tipVal);
                    }}
                    className={`py-1.5 text-xs rounded border transition-all ${
                      !showCustomTipInput && selectedTipPercent === tipVal
                        ? 'bg-[#E5A93C] text-black font-bold border-[#E5A93C]'
                        : 'bg-[#1e2228] text-gray-300 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {tipVal}%
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setShowCustomTipInput(!showCustomTipInput)}
                  className={`py-1.5 text-xs rounded border transition-all ${
                    showCustomTipInput
                      ? 'bg-[#E5A93C] text-black font-bold border-[#E5A93C]'
                      : 'bg-[#1e2228] text-gray-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  Custom
                </button>
              </div>

              {showCustomTipInput && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-400">Custom $ Tip:</span>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="e.g. 5.00"
                    value={customTip}
                    onChange={(e) => setCustomTip(e.target.value)}
                    className="w-24 px-2 py-1 bg-[#1e2228] border border-white/20 rounded text-xs text-white font-mono"
                  />
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs pt-2 border-t border-white/10 text-gray-400">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>HST (13% Ontario)</span>
                <span className="font-mono tabular-nums text-white">${hstTax.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Staff Gratuity</span>
                <span className="font-mono tabular-nums text-white">${calculatedTip.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span className="font-chalk tracking-wide text-lg text-[#E5A93C]">TOTAL</span>
                <span className="font-mono tabular-nums text-xl text-[#E5A93C]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              type="button"
              onClick={handleCheckoutClick}
              disabled={isKitchenThrottled}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl transition-all ${
                isKitchenThrottled
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                  : 'bg-[#E5A93C] hover:bg-[#d4982d] text-black active:scale-98'
              }`}
            >
              <span>{isKitchenThrottled ? 'Takeout Currently Paused' : 'Proceed to Curbside Checkout'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
