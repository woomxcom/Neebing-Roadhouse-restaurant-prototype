import React, { useState, useMemo } from 'react';
import { MenuItem } from '../types';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
import { 
  Search, 
  Lock, 
  Plus, 
  Clock, 
  Check, 
  Utensils 
} from 'lucide-react';
import { UtensilBackgroundParticles, ForkSvg, KnifeSvg, SpoonSvg } from './UtensilBackgroundParticles';

interface ChalkboardMenuProps {
  simulatedHour: number;
  isKitchenThrottled: boolean;
  onSelectItem: (item: MenuItem) => void;
}

export const ChalkboardMenu: React.FC<ChalkboardMenuProps> = ({
  simulatedHour,
  isKitchenThrottled,
  onSelectItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'vegetarian'>('all');
  const [lockedNotification, setLockedNotification] = useState<string | null>(null);

  // Check if item is locked based on daypart simulatedHour
  const isItemLocked = (item: MenuItem): boolean => {
    if (!item.daypartLock) return false;
    return simulatedHour < item.daypartLock.unlockedAtHour;
  };

  const getLockNotice = (item: MenuItem): string => {
    if (!item.daypartLock) return '';
    const hoursRemaining = Math.max(0, Math.ceil(item.daypartLock.unlockedAtHour - simulatedHour));
    if (hoursRemaining > 0) {
      return `Available at ${item.daypartLock.unlockedAtHour > 12 ? item.daypartLock.unlockedAtHour - 12 : item.daypartLock.unlockedAtHour}:00 PM`;
    }
    return item.daypartLock.label;
  };

  const handleCardClick = (item: MenuItem) => {
    if (isItemLocked(item)) {
      setLockedNotification(
        `${item.name} is prepared fresh daily after ${item.daypartLock?.unlockedAtHour! > 12 ? item.daypartLock?.unlockedAtHour! - 12 : item.daypartLock?.unlockedAtHour}:00 PM. ${item.daypartLock?.categoryNote || 'Please check back then!'}`
      );
      return;
    }
    onSelectItem(item);
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (activeFilter === 'popular' && !item.isPopular) {
        return false;
      }
      if (activeFilter === 'vegetarian' && !item.isVegetarian) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesCategory;
      }
      return true;
    });
  }, [selectedCategory, activeFilter, searchQuery]);

  // Group items by category for classic 3-column chalkboard display
  const itemsByCategory = useMemo(() => {
    const map: Record<string, MenuItem[]> = {};
    MENU_ITEMS.forEach((item) => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    });
    return map;
  }, []);

  return (
    <section id="menu-chalkboard" className="py-16 sm:py-24 chalkboard-bg border-b border-white/10 text-[#F5F5F3] relative overflow-hidden">
      {/* Subtle floating background utensil etchings */}
      <UtensilBackgroundParticles density="rich" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E5A93C] mb-2">
              The Complete Board
            </p>
            <h2 className="font-chalk text-4xl sm:text-6xl uppercase tracking-wider text-white mb-3">
              Chalkboard Menu
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Prepared to order using Canadian chicken wings, Alberta AAA chuck beef, and authentic tavern recipes. Select any item to customize sides, sauces, and cooking temperature.
            </p>
          </div>

          {/* Authentic Roadhouse Hanging Chalkboard Utensils (Fork, Knife, Spoon from physical menu) */}
          <div className="hidden md:flex items-center gap-4 opacity-80 pr-4 shrink-0 pointer-events-none select-none">
            <div className="text-[#E5A93C] flex flex-col items-center">
              <span className="w-px h-6 bg-[#E5A93C]/40 mb-1" />
              <ForkSvg className="w-8 h-20" />
            </div>
            <div className="text-gray-300 flex flex-col items-center">
              <span className="w-px h-10 bg-gray-400/40 mb-1" />
              <KnifeSvg className="w-8 h-20" />
            </div>
            <div className="text-[#E5A93C] flex flex-col items-center">
              <span className="w-px h-6 bg-[#E5A93C]/40 mb-1" />
              <SpoonSvg className="w-8 h-20" />
            </div>
          </div>
        </div>

        {/* Daypart Notification Banner */}
        {lockedNotification && (
          <div className="mb-8 p-4 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-200 flex items-start justify-between gap-4 shadow-lg animate-in fade-in duration-200">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#E5A93C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Daypart Availability Window</strong>
                <span className="text-xs sm:text-sm">{lockedNotification}</span>
              </div>
            </div>
            <button
              onClick={() => setLockedNotification(null)}
              className="text-amber-300 hover:text-white px-2 py-1 text-xs font-bold shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Search & Filter Toolbar with Clean Lines */}
        <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#1a1e24] p-3.5 rounded-2xl border border-white/10 shadow-sm">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search burgers, wings, poutines, fish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#121417] text-white text-xs sm:text-sm rounded-xl border border-white/10 focus:border-[#E5A93C] focus:outline-none placeholder-gray-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs px-1.5 py-0.5"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                activeFilter === 'all'
                  ? 'bg-white/15 text-white font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              All Items ({MENU_ITEMS.length})
            </button>
            <button
              onClick={() => setActiveFilter('popular')}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                activeFilter === 'popular'
                  ? 'bg-[#E5A93C] text-black font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Favorites
            </button>
            <button
              onClick={() => setActiveFilter('vegetarian')}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                activeFilter === 'vegetarian'
                  ? 'bg-emerald-700 text-white font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Vegetarian
            </button>
          </div>
        </div>

        {/* Sticky Horizontal Category Navigation with safe bounding */}
        <div className="sticky top-16 sm:top-18 z-30 w-full py-3 bg-[#121417]/95 backdrop-blur-md border-y border-white/10 mb-10 overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-2.5 box-border">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (window.innerWidth < 1024) {
                    const el = document.getElementById('menu-content-target');
                    if (el) {
                      const offset = 140;
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = el.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      window.scrollTo({
                        top: elementPosition - offset,
                        behavior: 'smooth'
                      });
                    }
                  }
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all flex items-center gap-2 active:scale-95 ${
                  isActive
                    ? 'bg-[#E5A93C] text-black font-bold shadow'
                    : 'bg-[#1e2228] text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <span>{cat.name}</span>
                {cat.daypartNote && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                    isActive ? 'bg-black/20 text-black' : 'bg-red-950/60 text-red-300 border border-red-800/40'
                  }`}>
                    {cat.daypartNote}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div id="menu-content-target" />

        {/* Filtered View / Search Results */}
        {selectedCategory !== 'all' || searchQuery.trim() !== '' || activeFilter !== 'all' ? (
          <div>
            <div className="mb-8 pb-3 border-b border-white/10">
              <div className="flex items-center justify-between">
                <span className="font-chalk text-2xl tracking-wider text-[#E5A93C]">
                  {selectedCategory === 'all'
                    ? `Search Results (${filteredItems.length})`
                    : CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                </span>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setActiveFilter('all');
                  }}
                  className="text-xs text-gray-400 hover:text-[#E5A93C] underline"
                >
                  Reset to Full Board
                </button>
              </div>
              {CATEGORIES.find((c) => c.id === selectedCategory)?.subNote && (
                <p className="text-xs sm:text-sm text-amber-200/90 mt-2.5 font-medium bg-amber-950/50 p-3 rounded-xl border border-amber-500/40">
                  {CATEGORIES.find((c) => c.id === selectedCategory)?.subNote}
                </p>
              )}
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-16 bg-[#1a1e24] rounded-2xl border border-white/10 p-8">
                <Utensils className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-300 text-sm font-medium mb-1">No dishes found matching your search.</p>
                <p className="text-gray-500 text-xs mb-4">Try searching for "wings", "burgers", or "pickerel".</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setActiveFilter('all');
                  }}
                  className="px-5 py-2.5 bg-[#E5A93C] text-black font-semibold rounded-xl text-xs"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    isLocked={isItemLocked(item)}
                    lockNotice={getLockNotice(item)}
                    isKitchenThrottled={isKitchenThrottled}
                    onClick={() => handleCardClick(item)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* =========================================================================
             RESPONSIVE MATRIX:
             - Desktop (>= 1024px): 3-Column Chalkboard Grid with 24-32px Gaps
             - Mobile (< 1024px): Single-Column Fluid Stack
             ========================================================================= */
          <>
            {/* MOBILE VIEW (< 1024px) */}
            <div className="lg:hidden space-y-10">
              {/* Category: Fresh Jumbo Wings */}
              <div className="chalkboard-card rounded-2xl p-6 border border-white/15">
                <div className="flex items-baseline justify-between border-b border-white/15 pb-3 mb-4">
                  <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white">FRESH JUMBO WINGS</h3>
                  <span className="font-mono text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/40">
                    NEVER FROZEN
                  </span>
                </div>
                <div className="space-y-4">
                  {itemsByCategory['wings']?.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      isLocked={isItemLocked(item)}
                      lockNotice={getLockNotice(item)}
                      isKitchenThrottled={isKitchenThrottled}
                      onClick={() => handleCardClick(item)}
                    />
                  ))}
                </div>
              </div>

              {/* Category: 6oz AAA Chuck Burgers */}
              <div className="chalkboard-card rounded-2xl p-6 border border-white/15">
                <div className="flex items-baseline justify-between border-b border-white/15 pb-3 mb-2">
                  <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white">6OZ AAA CHUCK BURGERS</h3>
                  <span className="font-mono text-xs text-red-400 font-semibold bg-red-950/60 px-2.5 py-0.5 rounded border border-red-800/40">
                    ALBERTA AAA
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-4 pb-2 border-b border-white/10">
                  Includes choice of Fresh Cut Fries, Scratch Soup, or Tossed Greens.
                </p>
                <div className="space-y-4">
                  {itemsByCategory['burgers']?.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      isLocked={isItemLocked(item)}
                      lockNotice={getLockNotice(item)}
                      isKitchenThrottled={isKitchenThrottled}
                      onClick={() => handleCardClick(item)}
                    />
                  ))}
                </div>
              </div>

              {/* Category: Signature Poutines */}
              <div className="chalkboard-card rounded-2xl p-6 border border-white/15">
                <div className="flex items-baseline justify-between border-b border-white/15 pb-3 mb-4">
                  <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white">SIGNATURE POUTINES</h3>
                  <span className="font-mono text-xs text-gray-400">Ontario Curds</span>
                </div>
                <div className="space-y-4">
                  {itemsByCategory['poutines']?.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      isLocked={isItemLocked(item)}
                      lockNotice={getLockNotice(item)}
                      isKitchenThrottled={isKitchenThrottled}
                      onClick={() => handleCardClick(item)}
                    />
                  ))}
                </div>
              </div>

              {/* Category: Thin Crust Pizza (DAYPART AFTER 4PM) */}
              <div className={`chalkboard-card rounded-2xl p-6 border transition-all ${
                simulatedHour < 16 ? 'border-amber-500/40 bg-[#16181d]' : 'border-white/15'
              }`}>
                <div className="flex items-baseline justify-between border-b border-white/15 pb-3 mb-2">
                  <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white">THIN CRUST PIZZA</h3>
                  <span className={`font-mono text-xs font-semibold px-2.5 py-0.5 rounded border flex items-center gap-1 ${
                    simulatedHour < 16
                      ? 'bg-amber-950/80 text-amber-300 border-amber-600/50'
                      : 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                  }`}>
                    {simulatedHour < 16 ? <Lock className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                    {simulatedHour < 16 ? 'AFTER 4:00 PM' : 'ACTIVE'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-4 pb-2 border-b border-white/10">
                  {simulatedHour < 16
                    ? 'Stone deck ovens heat at 4:00 PM daily.'
                    : 'Baked fresh in our stone deck oven with Wisconsin mozzarella.'}
                </p>
                <div className="space-y-4">
                  {itemsByCategory['pizza']?.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      isLocked={isItemLocked(item)}
                      lockNotice={getLockNotice(item)}
                      isKitchenThrottled={isKitchenThrottled}
                      onClick={() => handleCardClick(item)}
                    />
                  ))}
                </div>
              </div>

              {/* Category: Handhelds & Classics */}
              <div className="chalkboard-card rounded-2xl p-6 border border-white/15">
                <div className="flex items-baseline justify-between border-b border-white/15 pb-3 mb-4">
                  <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white">HANDHELDS & CLASSICS</h3>
                  <span className="font-mono text-xs text-[#E5A93C]">Includes Side</span>
                </div>
                <div className="space-y-4">
                  {itemsByCategory['sandwiches']?.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      isLocked={isItemLocked(item)}
                      lockNotice={getLockNotice(item)}
                      isKitchenThrottled={isKitchenThrottled}
                      onClick={() => handleCardClick(item)}
                    />
                  ))}
                </div>
              </div>

              {/* Category: Large Plates & Steaks */}
              <div className={`chalkboard-card rounded-2xl p-6 border transition-all ${
                simulatedHour < 17 ? 'border-amber-500/40 bg-[#16181d]' : 'border-white/15'
              }`}>
                <div className="flex items-baseline justify-between border-b border-white/15 pb-3 mb-2">
                  <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white">LARGE PLATES & STEAKS</h3>
                  <span className={`font-mono text-xs font-semibold px-2.5 py-0.5 rounded border flex items-center gap-1 ${
                    simulatedHour < 17
                      ? 'bg-amber-950/80 text-amber-300 border-amber-600/50'
                      : 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                  }`}>
                    {simulatedHour < 17 ? <Lock className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                    {simulatedHour < 17 ? 'AFTER 5:00 PM' : 'ACTIVE'}
                  </span>
                </div>
                <div className="space-y-4">
                  {itemsByCategory['large_plates']?.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      isLocked={isItemLocked(item)}
                      lockNotice={getLockNotice(item)}
                      isKitchenThrottled={isKitchenThrottled}
                      onClick={() => handleCardClick(item)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* DESKTOP VIEW (>= 1024px) */}
            <div className="hidden lg:grid grid-cols-3 gap-8">
              {/* COLUMN 1: WINGS, POUTINES, SMALL PLATES */}
              <div className="space-y-8">
                {/* Wings */}
                <div className="chalkboard-card rounded-2xl p-6 border border-white/15">
                  <div className="flex items-baseline justify-between border-b border-white/15 pb-3 mb-4">
                    <h3 className="font-chalk text-3xl tracking-wide text-white">FRESH JUMBO WINGS</h3>
                    <span className="font-mono text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      NEVER FROZEN
                    </span>
                  </div>

                  {itemsByCategory['wings']?.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      isLocked={isItemLocked(item)}
                      lockNotice={getLockNotice(item)}
                      isKitchenThrottled={isKitchenThrottled}
                      onClick={() => handleCardClick(item)}
                    />
                  ))}

                  <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-400 leading-relaxed">
                    <span className="font-medium text-gray-300 block mb-1">
                      15 Sauces & Dry Rubs:
                    </span>
                    Mild · Medium · Hot · Honey Garlic · Chef’s Blend · Buffalo Rouge · Sweet Chili · Salt & Pepper · Roasted Garlic · Cajun · Lemon Pepper · Creamy Garlic Parm · Mango Habanero · Dill Pickle · All Dressed.
                  </div>
                </div>

                {/* Poutines */}
                <div className="chalkboard-card rounded-2xl p-6 border border-white/15">
                  <div className="flex items-baseline justify-between border-b border-white/15 pb-3 mb-4">
                    <h3 className="font-chalk text-3xl tracking-wide text-white">SIGNATURE POUTINES</h3>
                    <span className="font-mono text-xs text-gray-400">Ontario Curds</span>
                  </div>
                  <div className="space-y-4">
                    {itemsByCategory['poutines']?.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        isLocked={isItemLocked(item)}
                        lockNotice={getLockNotice(item)}
                        isKitchenThrottled={isKitchenThrottled}
                        onClick={() => handleCardClick(item)}
                      />
                    ))}
                  </div>
                </div>

                {/* Small Plates */}
                <div className="chalkboard-card rounded-2xl p-6 border border-white/15">
                  <div className="flex items-baseline justify-between border-b border-white/15 pb-3 mb-4">
                    <h3 className="font-chalk text-3xl tracking-wide text-white">SMALL PLATES & SNACKS</h3>
                    <span className="text-xs text-gray-400">Apps & Bites</span>
                  </div>
                  <div className="space-y-4">
                    {itemsByCategory['starters']?.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        isLocked={isItemLocked(item)}
                        lockNotice={getLockNotice(item)}
                        isKitchenThrottled={isKitchenThrottled}
                        onClick={() => handleCardClick(item)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* COLUMN 2: HANDHELDS, SOUPS & SALADS, PASTA */}
              <div className="space-y-8">
                {/* Handhelds */}
                <div className="chalkboard-card rounded-2xl p-6 border border-white/15">
                  <div className="flex items-baseline justify-between border-b border-white/15 pb-3 mb-2">
                    <h3 className="font-chalk text-3xl tracking-wide text-white">SANDWICHES & HANDHELDS</h3>
                    <span className="font-mono text-xs text-[#E5A93C]">Includes Side</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4 pb-2 border-b border-white/10">
                    Served with Fresh Cut Fries, Scratch Soup, or Greens. Sub Poutine +$4.00.
                  </p>
                  <div className="space-y-4">
                    {itemsByCategory['sandwiches']?.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        isLocked={isItemLocked(item)}
                        lockNotice={getLockNotice(item)}
                        isKitchenThrottled={isKitchenThrottled}
                        onClick={() => handleCardClick(item)}
                      />
                    ))}
                  </div>
                </div>

                {/* Soups & Salads */}
                <div className="chalkboard-card rounded-2xl p-6 border border-white/15">
                  <div className="flex items-baseline justify-between border-b border-white/15 pb-3 mb-4">
                    <h3 className="font-chalk text-3xl tracking-wide text-white">SOUPS & GREENS</h3>
                    <span className="font-mono text-xs text-gray-400">Daily Scratch</span>
                  </div>
                  <div className="space-y-4">
                    {itemsByCategory['salads']?.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        isLocked={isItemLocked(item)}
                        lockNotice={getLockNotice(item)}
                        isKitchenThrottled={isKitchenThrottled}
                        onClick={() => handleCardClick(item)}
                      />
                    ))}
                  </div>
                </div>

                {/* Pasta */}
                <div className="chalkboard-card rounded-2xl p-6 border border-white/15">
                  <div className="flex items-baseline justify-between border-b border-white/15 pb-3 mb-4">
                    <h3 className="font-chalk text-3xl tracking-wide text-white">TANTALIZING PASTA</h3>
                    <span className="text-xs text-gray-400">With Garlic Bread</span>
                  </div>
                  <div className="space-y-4">
                    {itemsByCategory['pasta']?.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        isLocked={isItemLocked(item)}
                        lockNotice={getLockNotice(item)}
                        isKitchenThrottled={isKitchenThrottled}
                        onClick={() => handleCardClick(item)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* COLUMN 3: 6OZ AAA BURGERS, PIZZA, LARGE PLATES */}
              <div className="space-y-8">
                {/* Burgers */}
                <div className="chalkboard-card rounded-2xl p-6 border border-white/15">
                  <div className="flex items-baseline justify-between border-b border-white/15 pb-3 mb-2">
                    <h3 className="font-chalk text-3xl tracking-wide text-white">6OZ AAA CHUCK BURGERS</h3>
                    <span className="font-mono text-xs text-red-400 font-semibold bg-red-950/60 px-2 py-0.5 rounded border border-red-800/40">
                      ALBERTA AAA
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4 pb-2 border-b border-white/10">
                    Ground fresh daily from AAA Canadian Angus Chuck. Served with Fresh Fries or Soup.
                  </p>
                  <div className="space-y-4">
                    {itemsByCategory['burgers']?.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        isLocked={isItemLocked(item)}
                        lockNotice={getLockNotice(item)}
                        isKitchenThrottled={isKitchenThrottled}
                        onClick={() => handleCardClick(item)}
                      />
                    ))}
                  </div>
                </div>

                {/* Thin Crust Pizza */}
                <div className={`chalkboard-card rounded-2xl p-6 border transition-all ${
                  simulatedHour < 16 ? 'border-amber-500/40 bg-[#16181d]' : 'border-white/15'
                }`}>
                  <div className="flex items-baseline justify-between border-b border-white/15 pb-3 mb-2">
                    <h3 className="font-chalk text-3xl tracking-wide text-white">THIN CRUST PIZZA</h3>
                    <span className={`font-mono text-xs font-semibold px-2 py-0.5 rounded border flex items-center gap-1 ${
                      simulatedHour < 16
                        ? 'bg-amber-950/80 text-amber-300 border-amber-600/50'
                        : 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                    }`}>
                      {simulatedHour < 16 ? <Lock className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                      {simulatedHour < 16 ? 'AFTER 4:00 PM' : 'ACTIVE'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4 pb-2 border-b border-white/10">
                    {simulatedHour < 16
                      ? 'Stone deck ovens heat at 4:00 PM daily.'
                      : 'Baked fresh in our stone deck oven with Wisconsin mozzarella.'}
                  </p>
                  <div className="space-y-4">
                    {itemsByCategory['pizza']?.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        isLocked={isItemLocked(item)}
                        lockNotice={getLockNotice(item)}
                        isKitchenThrottled={isKitchenThrottled}
                        onClick={() => handleCardClick(item)}
                      />
                    ))}
                  </div>
                </div>

                {/* Large Plates */}
                <div className={`chalkboard-card rounded-2xl p-6 border transition-all ${
                  simulatedHour < 17 ? 'border-amber-500/40 bg-[#16181d]' : 'border-white/15'
                }`}>
                  <div className="flex items-baseline justify-between border-b border-white/15 pb-3 mb-2">
                    <h3 className="font-chalk text-3xl tracking-wide text-white">LARGE PLATES & STEAKS</h3>
                    <span className={`font-mono text-xs font-semibold px-2 py-0.5 rounded border flex items-center gap-1 ${
                      simulatedHour < 17
                        ? 'bg-amber-950/80 text-amber-300 border-amber-600/50'
                        : 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                    }`}>
                      {simulatedHour < 17 ? <Lock className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                      {simulatedHour < 17 ? 'AFTER 5:00 PM' : 'ACTIVE'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4 pb-2 border-b border-white/10">
                    {simulatedHour < 17
                      ? 'Alberta Ribeye and evening dinner plates available daily at 5:00 PM.'
                      : 'Served with fresh cut fries, mashed or baked potato and chef vegetables.'}
                  </p>
                  <div className="space-y-4">
                    {itemsByCategory['large_plates']?.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        isLocked={isItemLocked(item)}
                        lockNotice={getLockNotice(item)}
                        isKitchenThrottled={isKitchenThrottled}
                        onClick={() => handleCardClick(item)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Authentic Roadhouse Chalkboard Footer Legend & Heritage Bar */}
            <div className="mt-12 p-6 rounded-2xl bg-[#1a1e24]/90 border border-white/10 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="flex items-center gap-6 flex-wrap justify-center text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5A93C]" />
                  <span>Neebing House Signature</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>Vegetarian Option</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span>Alberta AAA Angus Chuck</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-center md:text-right">
                <ForkSvg className="w-5 h-12 text-[#E5A93C] opacity-70" />
                <div>
                  <p className="font-chalk text-base tracking-wider text-white">GREAT FOOD. GREAT DRINKS.</p>
                  <p className="text-[11px] text-gray-400">Thunder Bay Since 1947 • Cooked Fresh to Order</p>
                </div>
                <KnifeSvg className="w-5 h-12 text-gray-400 opacity-70" />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

/* --------------------------------------------------------------------------
   Individual MenuItemCard Component: Clean, Uncluttered, Accessible
   -------------------------------------------------------------------------- */
interface MenuItemCardProps {
  item: MenuItem;
  isLocked: boolean;
  lockNotice: string;
  isKitchenThrottled: boolean;
  onClick: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  isLocked,
  lockNotice,
  isKitchenThrottled,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
        isLocked
          ? 'bg-[#15171b]/80 border-dashed border-gray-700 hover:border-amber-500/50'
          : 'bg-[#1e2228]/95 hover:bg-[#232830] border-white/10 hover:border-[#E5A93C]/40 hover:shadow-lg'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            {item.badge && (
              <span className="inline-block font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-[#E5A93C] border border-amber-500/40 mb-1.5">
                {item.badge}
              </span>
            )}
            <h4 className={`font-semibold text-base sm:text-lg transition-colors leading-snug ${
              isLocked ? 'text-gray-400' : 'text-white group-hover:text-[#E5A93C]'
            }`}>
              {item.name}
            </h4>
            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mt-1">
              {item.description}
            </p>
          </div>

          {item.imageUrl && (
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg overflow-hidden shrink-0 bg-[#121417] border border-white/10">
              <img
                src={item.imageUrl}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom action & pricing row */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 mt-auto">
        <div>
          {item.portionOptions && item.portionOptions.length > 1 ? (
            <div>
              <span className="font-mono tabular-nums font-bold text-sm sm:text-base text-[#E5A93C]">
                ${item.portionOptions[0].price.toFixed(2)} / ${item.portionOptions[1].price.toFixed(2)}
              </span>
              <span className="block text-[10px] text-gray-400 font-mono">
                {item.portionOptions[0].name.split(' (')[0]} • {item.portionOptions[1].name.split(' (')[0]}
              </span>
            </div>
          ) : (
            <div>
              <span className="font-mono tabular-nums font-bold text-base sm:text-lg text-[#E5A93C]">
                ${item.price.toFixed(2)}
              </span>
              {item.portionOptions && item.portionOptions.length === 1 && (
                <span className="block text-[10px] text-gray-400 font-mono">
                  {item.portionOptions[0].name}
                </span>
              )}
            </div>
          )}
        </div>

        {isLocked ? (
          <div className="flex items-center gap-1 text-[11px] text-amber-300 font-medium bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-900/50">
            <Lock className="w-3 h-3 text-amber-400 shrink-0" />
            <span>{lockNotice}</span>
          </div>
        ) : isKitchenThrottled ? (
          <div className="text-[11px] text-amber-400 bg-black/30 px-2.5 py-1 rounded-md">
            Takeout Paused
          </div>
        ) : (
          <button
            type="button"
            className="px-3.5 py-1.5 text-xs font-semibold text-black bg-[#E5A93C] group-hover:bg-[#f3b544] rounded-lg flex items-center gap-1 shadow-sm transition-transform active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{item.modifierGroups ? 'Customize' : 'Add'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
