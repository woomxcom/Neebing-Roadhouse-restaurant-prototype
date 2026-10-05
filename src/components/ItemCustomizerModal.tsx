import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem, CartItemOption, CartItem } from '../types';
import { X, Plus, Minus, Check, AlertCircle, ShoppingBag, Beer, Sparkles, GlassWater } from 'lucide-react';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
  isKitchenThrottled: boolean;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
  isKitchenThrottled,
}) => {
  if (!item) return null;

  const isDineInAlcohol = item.dineInOnly || item.isAlcohol;

  // Selected portion (if item has portion options, e.g., wings 1 lb vs 2 lb, craft pint vs pitcher)
  const [selectedPortion, setSelectedPortion] = useState<{ name: string; price: number }>(
    item.portionOptions && item.portionOptions.length > 0
      ? item.portionOptions[0]
      : { name: 'Regular', price: item.price }
  );

  // Selected options state: Record<groupId, optionId[]>
  const [selectedOptionsState, setSelectedOptionsState] = useState<Record<string, string[]>>(() => {
    const initial: Record<string, string[]> = {};
    if (item.modifierGroups) {
      item.modifierGroups.forEach((group) => {
        // If required and maxSelect is 1, select the first option by default
        if (group.required && group.maxSelect === 1 && group.options.length > 0) {
          initial[group.id] = [group.options[0].id];
        } else {
          initial[group.id] = [];
        }
      });
    }
    return initial;
  });

  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Toggle single option or multi-select option
  const handleOptionToggle = (groupId: string, optionId: string, maxSelect?: number) => {
    setSelectedOptionsState((prev) => {
      const current = prev[groupId] || [];
      if (maxSelect === 1) {
        // Radio behavior
        return { ...prev, [groupId]: [optionId] };
      } else {
        // Checkbox multi-select behavior
        if (current.includes(optionId)) {
          return { ...prev, [groupId]: current.filter((id) => id !== optionId) };
        } else {
          if (maxSelect && current.length >= maxSelect) {
            return prev;
          }
          return { ...prev, [groupId]: [...current, optionId] };
        }
      }
    });
    setValidationError(null);
  };

  // Calculate unit price and total price
  const { unitPrice, totalPrice, chosenOptionsList } = useMemo(() => {
    let basePrice = item.portionOptions && item.portionOptions.length > 0
      ? selectedPortion.price
      : item.price;

    let modifiersPrice = 0;
    const chosenList: CartItemOption[] = [];

    if (item.modifierGroups) {
      item.modifierGroups.forEach((group) => {
        const selectedIds = selectedOptionsState[group.id] || [];
        selectedIds.forEach((optId) => {
          const opt = group.options.find((o) => o.id === optId);
          if (opt) {
            modifiersPrice += opt.price;
            chosenList.push({
              groupName: group.name,
              optionName: opt.name,
              price: opt.price,
            });
          }
        });
      });
    }

    const calculatedUnit = basePrice + modifiersPrice;
    return {
      unitPrice: calculatedUnit,
      totalPrice: calculatedUnit * quantity,
      chosenOptionsList: chosenList,
    };
  }, [item, selectedPortion, selectedOptionsState, quantity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isDineInAlcohol) {
      onClose();
      return;
    }

    if (isKitchenThrottled) {
      setValidationError('Takeout ordering is temporarily paused due to kitchen volume.');
      return;
    }

    // Validate required groups
    if (item.modifierGroups) {
      for (const group of item.modifierGroups) {
        if (group.required) {
          const selected = selectedOptionsState[group.id] || [];
          if (selected.length === 0) {
            setValidationError(`Please make a selection for: ${group.name}`);
            return;
          }
        }
      }
    }

    const newCartItem: CartItem = {
      cartItemId: `${item.id}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      menuItem: item,
      selectedPortion: item.portionOptions ? selectedPortion : undefined,
      selectedOptions: chosenOptionsList,
      specialInstructions: specialInstructions.trim() ? specialInstructions.trim() : undefined,
      quantity,
      unitPrice,
      totalPrice,
    };

    onAddToCart(newCartItem);
    onClose();
  };

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop with gentle fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Card with subtle scale, lift, and fade */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340, mass: 0.8 }}
            className="relative w-full max-w-xl bg-[#1a1e24] text-[#F5F5F3] sm:rounded-2xl rounded-t-2xl border border-white/15 shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh] overflow-hidden z-10"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-start justify-between gap-3 bg-[#141618]">
              <div className="flex items-start gap-3 flex-1">
                {item.imageUrl && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-[#121417] border border-white/10 hidden xs:block">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1">
                  <span className="font-script text-[#E5A93C] text-lg block -mb-1">
                    {isDineInAlcohol ? 'Dine-In Beverage Showcase' : 'Customize Your Order'}
                  </span>
                  <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

        {/* Scrollable Modifier or Tasting Notes Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Validation Error Banner */}
          {validationError && (
            <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-lg text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* DINE-IN ALCOHOL TASTING NOTES SHOWCASE */}
          {isDineInAlcohol ? (
            <div className="space-y-4">
              {/* Notice Banner */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
                <Beer className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Dine-In & Patio Service Only</strong>
                  <span>In accordance with provincial liquor regulations, draught beer and cocktails are poured fresh for in-house table & bar enjoyment and are not eligible for curbside takeout checkout.</span>
                </div>
              </div>

              {/* Tasting Notes Highlight */}
              {item.tastingNotes && (
                <div className="p-4 rounded-xl bg-[#141618] border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E5A93C]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Flavor & Pour Notes</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed italic">
                    "{item.tastingNotes}"
                  </p>
                </div>
              )}

              {/* Serving Sizes & Pricing */}
              {item.portionOptions && item.portionOptions.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E5A93C] block">
                    Available Tavern Pours
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.portionOptions.map((portion) => (
                      <div
                        key={portion.name}
                        className="p-3 rounded-xl bg-[#141618] border border-white/10 flex items-center justify-between"
                      >
                        <span className="text-xs font-medium text-white">{portion.name}</span>
                        <span className="font-mono text-sm font-bold text-[#E5A93C]">
                          ${portion.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* STANDARD CUSTOMIZER FOR FOOD & NON-ALCOHOLIC REFRESHERS */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Portion Options (Wings 1 lb vs 2 lb, Prime Rib Cut, Pitcher vs Pint) */}
              {item.portionOptions && item.portionOptions.length > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#E5A93C] mb-2.5">
                    {item.id.includes('prime_rib') ? '1. Select Cut Size' : '1. Select Portion Size'} <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {item.portionOptions.map((portion) => {
                      const isSelected = selectedPortion.name === portion.name;
                      return (
                        <button
                          type="button"
                          key={portion.name}
                          onClick={() => setSelectedPortion(portion)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-[#E5A93C]/15 border-[#E5A93C] text-white shadow-sm'
                              : 'bg-[#141618] border-white/10 text-gray-300 hover:border-white/30'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm">{portion.name}</span>
                            <span className="font-mono font-bold text-sm text-[#E5A93C]">
                              ${portion.price.toFixed(2)}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Modifier Groups */}
              {item.modifierGroups?.map((group, groupIdx) => {
                const selectedIds = selectedOptionsState[group.id] || [];
                const isSingle = group.maxSelect === 1;

                return (
                  <div key={group.id} className="pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#E5A93C]">
                        {item.portionOptions ? `${groupIdx + 2}. ` : `${groupIdx + 1}. `}
                        {group.name}
                        {group.required && <span className="text-red-400 ml-1">*</span>}
                      </label>
                      <span className="text-[11px] text-gray-400">
                        {isSingle ? 'Select 1' : 'Optional add-ons'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {group.options.map((opt) => {
                        const isSelected = selectedIds.includes(opt.id);
                        return (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => handleOptionToggle(group.id, opt.id, group.maxSelect)}
                            className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#E5A93C]/15 border-[#E5A93C] text-white font-medium'
                                : 'bg-[#141618] border-white/10 text-gray-300 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                                isSingle ? 'rounded-full' : 'rounded'
                              } ${
                                isSelected
                                  ? 'bg-[#E5A93C] text-black font-bold'
                                  : 'border border-gray-600 bg-black/40'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span>{opt.name}</span>
                            </div>
                            <span className="font-mono tabular-nums text-gray-400 font-normal ml-2 shrink-0">
                              {opt.price > 0 ? `+$${opt.price.toFixed(2)}` : '+$0.00'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Special Preparation Instructions */}
              <div className="pt-2 border-t border-white/10">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Special Kitchen Instructions
                </label>
                <input
                  type="text"
                  placeholder="e.g., Extra ice, lemon on the side..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  maxLength={120}
                  className="w-full px-3 py-2.5 bg-[#141618] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#E5A93C] placeholder-gray-500"
                />
              </div>
            </form>
          )}
        </div>

        {/* Footer / Action Bar */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#141618] flex items-center justify-between gap-4">
          {isDineInAlcohol ? (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#E5A93C] hover:bg-[#d4982d] text-black transition-all shadow-md active:scale-98"
            >
              Close Tasting Notes
            </button>
          ) : (
            <>
              {/* Quantity Stepper */}
              <div className="flex items-center bg-[#1e2228] border border-white/10 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-mono tabular-nums font-bold text-sm">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Order Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isKitchenThrottled}
                className={`flex-1 py-3 px-3.5 sm:px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-between gap-2 shadow-lg transition-all whitespace-nowrap min-h-[46px] select-none ${
                  isKitchenThrottled
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                    : 'bg-[#E5A93C] hover:bg-[#d4982d] text-black active:scale-98'
                }`}
              >
                <span className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap truncate">
                  <ShoppingBag className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">{isKitchenThrottled ? 'Takeout Paused' : 'Add to Order'}</span>
                </span>
                <span className="font-mono tabular-nums text-sm sm:text-base whitespace-nowrap shrink-0 pl-1">
                  ${totalPrice.toFixed(2)}
                </span>
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
  );
};
