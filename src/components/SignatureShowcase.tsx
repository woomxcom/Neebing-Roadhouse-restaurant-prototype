import React from 'react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { Plus, Lock } from 'lucide-react';
import { UtensilBackgroundParticles, CrossedUtensilsSvg } from './UtensilBackgroundParticles';

interface SignatureShowcaseProps {
  onSelectItem: (item: MenuItem) => void;
  simulatedHour: number;
  isKitchenThrottled: boolean;
}

export const SignatureShowcase: React.FC<SignatureShowcaseProps> = ({
  onSelectItem,
  simulatedHour,
  isKitchenThrottled,
}) => {
  // 4 iconic signature dishes
  const wingsItem = MENU_ITEMS.find((m) => m.id === 'wings_classic')!;
  const burgerItem = MENU_ITEMS.find((m) => m.id === 'burger_highway61')!;
  const poutineItem = MENU_ITEMS.find((m) => m.id === 'poutine_pulled_pork')!;
  const pizzaItem = MENU_ITEMS.find((m) => m.id === 'pizza_neebing_deluxe')!;

  const signatureItems = [
    {
      item: wingsItem,
      categoryLabel: 'Fresh Wings',
      badge: 'House Favorite',
      subtitle: 'Crispy fried 100% fresh Canadian chicken wings tossed in signature Buffalo Rouge or dry rubs.',
      isPizza: false,
    },
    {
      item: burgerItem,
      categoryLabel: '6oz AAA Chuck',
      badge: 'Flagship Burger',
      subtitle: 'Melted Canadian cheddar, smoked bacon, sunny fried egg, and crispy frizzled onion tanglers.',
      isPizza: false,
    },
    {
      item: poutineItem,
      categoryLabel: 'Roadhouse Poutine',
      badge: 'Ontario Curds',
      subtitle: 'Hand-cut russet fries smothered in squeaky curds, rich brown gravy, and tender BBQ pulled pork.',
      isPizza: false,
    },
    {
      item: pizzaItem,
      categoryLabel: 'Stone Deck Pizza',
      badge: simulatedHour < 16 ? 'Available After 4 PM' : 'Ovens Fired',
      subtitle: '15" house-made thin crust loaded with pepperoni, Italian sausage, smoked ham, bacon, and peppers.',
      isPizza: true,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#141618] border-b border-white/10 text-[#F5F5F3] relative overflow-hidden">
      {/* Subtle floating chalkboard utensil textures */}
      <UtensilBackgroundParticles density="normal" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header with Generous Breathing Room */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CrossedUtensilsSvg className="w-5 h-5 text-[#E5A93C] opacity-80" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E5A93C]">
                Signature Roadhouse Platters
              </p>
            </div>
            <h2 className="font-chalk text-3xl sm:text-5xl uppercase tracking-wider text-white">
              Roadhouse Signatures
            </h2>
            <p className="text-gray-400 text-sm mt-2 max-w-xl leading-relaxed">
              Generous portions, fresh local sourcing, and recipes perfected through decades of hospitality on Highway 61.
            </p>
          </div>

          <div className="text-xs text-gray-400 font-mono">
            Kitchen active for takeout & dine-in
          </div>
        </div>

        {/* 4 Clean Visual Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {signatureItems.map(({ item, categoryLabel, badge, subtitle, isPizza }) => {
            const isLocked = isPizza && simulatedHour < 16;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isLocked) onSelectItem(item);
                }}
                className={`group rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                  isLocked
                    ? 'bg-[#181a1f] border-dashed border-gray-700 cursor-not-allowed opacity-85'
                    : 'bg-[#1a1e24] border-white/10 hover:border-[#E5A93C]/50 hover:shadow-xl cursor-pointer'
                }`}
              >
                {/* Image Container with Subtle Zoom */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#121417]">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : null}

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1e24] via-black/20 to-transparent" />

                  {/* Clean text badge (no emoji) */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-md backdrop-blur-md border ${
                      isLocked 
                        ? 'bg-amber-950/80 text-amber-300 border-amber-800/50' 
                        : 'bg-black/60 text-white border-white/10'
                    }`}>
                      {badge}
                    </span>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="font-mono font-bold text-sm text-black bg-[#E5A93C] px-2.5 py-1 rounded-lg shadow">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Card Content with Balanced Padding */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#E5A93C] block mb-1">
                      {categoryLabel}
                    </span>
                    <h3 className="font-chalk text-2xl text-white tracking-wide group-hover:text-[#E5A93C] transition-colors leading-snug mb-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-5">
                      {subtitle}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="pt-3 border-t border-white/10">
                    {isLocked ? (
                      <div className="w-full py-2.5 bg-amber-950/40 border border-amber-800/30 rounded-xl text-center text-xs font-medium text-amber-300 flex items-center justify-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Ovens Fire at 4:00 PM</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        disabled={isKitchenThrottled}
                        className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                          isKitchenThrottled
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                            : 'bg-white/10 hover:bg-[#E5A93C] text-white hover:text-black active:scale-95'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isKitchenThrottled ? 'Takeout Paused' : 'Customize & Add'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
