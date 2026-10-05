import React, { useState, useMemo, useRef, useEffect } from 'react';
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

  // Physics-based Mouse Drag Horizontal Scrolling for Categories
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const hasMovedRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const momentumRafRef = useRef<number | null>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const stopMomentum = () => {
    if (momentumRafRef.current !== null) {
      cancelAnimationFrame(momentumRafRef.current);
      momentumRafRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopMomentum();
  }, []);

  const handleCategoryMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !categoryScrollRef.current) return;
    stopMomentum();
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - categoryScrollRef.current.offsetLeft;
    scrollLeftStartRef.current = categoryScrollRef.current.scrollLeft;
    lastXRef.current = e.pageX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    setIsGrabbing(true);
  };

  const handleCategoryMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !categoryScrollRef.current) return;
    const x = e.pageX - categoryScrollRef.current.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 4) {
      hasMovedRef.current = true;
    }
    categoryScrollRef.current.scrollLeft = scrollLeftStartRef.current - walk;

    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      velocityRef.current = (e.pageX - lastXRef.current) / dt;
      lastXRef.current = e.pageX;
      lastTimeRef.current = now;
    }
  };

  const handleCategoryMouseUpOrLeave = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsGrabbing(false);

    // Apply smooth momentum gliding with exponential friction decay
    if (categoryScrollRef.current && Math.abs(velocityRef.current) > 0.08) {
      let currentVelocity = velocityRef.current * 18;
      const decay = 0.94;
      const momentumStep = () => {
        if (!categoryScrollRef.current || Math.abs(currentVelocity) < 0.25) {
          stopMomentum();
          return;
        }
        categoryScrollRef.current.scrollLeft -= currentVelocity;
        currentVelocity *= decay;
        momentumRafRef.current = requestAnimationFrame(momentumStep);
      };
      momentumRafRef.current = requestAnimationFrame(momentumStep);
    }
  };

  const handleCategoryWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!categoryScrollRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      stopMomentum();
      categoryScrollRef.current.scrollLeft += e.deltaY;
    }
  };

  // Stable scroll retention across category switches to prevent any page jumps
  const savedBarTopRef = useRef<number | null>(null);

  const handleCategorySelect = (catId: string) => {
    if (categoryScrollRef.current) {
      savedBarTopRef.current = categoryScrollRef.current.getBoundingClientRect().top;
    }
    setSelectedCategory(catId);
  };

  useEffect(() => {
    if (savedBarTopRef.current !== null && categoryScrollRef.current) {
      const currentTop = categoryScrollRef.current.getBoundingClientRect().top;
      const diff = currentTop - savedBarTopRef.current;
      if (Math.abs(diff) > 0.5) {
        window.scrollBy({ top: diff, behavior: 'instant' as ScrollBehavior });
      }
      savedBarTopRef.current = null;
    }
  }, [selectedCategory, activeFilter, searchQuery]);

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
    if (item.dineInOnly) {
      return;
    }
    if (isKitchenThrottled) {
      setLockedNotification(
        'Our kitchen is currently at peak capacity for dining room service. Online takeout ordering is temporarily paused to ensure food quality. Please check back shortly or join us in the dining room / sports pub!'
      );
      return;
    }
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
    <section id="menu-chalkboard" className="scroll-mt-20 py-16 sm:py-24 chalkboard-bg border-b border-white/10 text-[#F5F5F3] relative overflow-hidden">
      {/* Subtle floating background utensil etchings */}
      <UtensilBackgroundParticles density="rich" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              Prepared to order using Canadian chicken wings, Alberta AAA chuck beef, Sub-Zero draught, and authentic tavern recipes. Select any item to customize sides, sauces, and cooking temperature.
            </p>
          </div>

          {/* Authentic Roadhouse Hanging Chalkboard Utensils */}
          <div className="hidden md:flex items-center gap-4 opacity-80 pr-4 shrink-0 pointer-events-none select-none">
            <div className="text-[#E5A93C] flex flex-col items-center">
              <ForkSvg className="w-8 h-20" />
            </div>
            <div className="text-gray-400 flex flex-col items-center">
              <KnifeSvg className="w-8 h-20" />
            </div>
            <div className="text-[#E5A93C] flex flex-col items-center">
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
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search burgers, wings, poutines, draft beer, cocktails..."
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

        {/* Sticky Horizontal Category Navigation with Mouse-Drag Physics & Safe Bounding */}
        <div
          ref={categoryScrollRef}
          onMouseDown={handleCategoryMouseDown}
          onMouseMove={handleCategoryMouseMove}
          onMouseUp={handleCategoryMouseUpOrLeave}
          onMouseLeave={handleCategoryMouseUpOrLeave}
          onWheel={handleCategoryWheel}
          className={`sticky top-16 sm:top-18 z-30 w-full py-3 bg-[#121417]/95 backdrop-blur-md border-y border-white/10 mb-10 overflow-x-auto no-scrollbar touch-pan-x flex items-center gap-2.5 box-border select-none ${
            isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={(e) => {
                  if (hasMovedRef.current) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  handleCategorySelect(cat.id);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-colors flex items-center gap-2 select-none ${
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
                {cat.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-black/20 text-black' : 'bg-amber-950/60 text-[#E5A93C] border border-amber-800/40'
                  }`}>
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div id="menu-content-target" />

        {/* Filtered View / Search Results with Static Minimum Height */}
        <div className="min-h-[65vh]">
          {selectedCategory !== 'all' || searchQuery || activeFilter !== 'all' ? (
            <div>
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10">
              <div className="flex items-center gap-3">
                <h3 className="font-chalk text-2xl sm:text-3xl text-white tracking-wide">
                  {searchQuery
                    ? `SEARCH RESULTS FOR "${searchQuery}"`
                    : selectedCategory !== 'all'
                    ? CATEGORIES.find((c) => c.id === selectedCategory)?.name.toUpperCase()
                    : 'FILTERED FAVORITES'}
                </h3>
                <span className="font-mono text-xs text-[#E5A93C] bg-[#E5A93C]/10 px-2.5 py-1 rounded-full border border-[#E5A93C]/30">
                  {filteredItems.length} items
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="text-xs text-gray-400 hover:text-[#E5A93C] transition-colors"
              >
                View Full Chalkboard
              </button>
            </div>

            {filteredItems.length === 0 ? (
              <div className="py-16 text-center text-gray-400 bg-[#1a1e24] rounded-2xl border border-white/10">
                <Utensils className="w-10 h-10 mx-auto mb-3 text-gray-600" />
                <p className="font-chalk text-2xl text-white">NO DISHES MATCHED YOUR SEARCH</p>
                <p className="text-xs text-gray-400 mt-1">Try clearing your search query or selecting another category.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setActiveFilter('all');
                  }}
                  className="mt-4 px-4 py-2 bg-[#E5A93C] text-black font-semibold text-xs rounded-xl"
                >
                  Reset Filters
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
              {/* Category: Taps & Cocktails (High Margin Beverage Program) */}
              <div className="chalkboard-card rounded-2xl p-6 border border-white/15">
                <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3 mb-2">
                  <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white min-w-0">TAPS & COCKTAILS</h3>
                  <span className="font-mono text-xs text-[#E5A93C] font-semibold bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-800/40 whitespace-nowrap shrink-0">
                    SUB-ZERO DRAUGHT
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-4 pb-2 border-b border-white/10">
                  Poured frosty from Sub-Zero glycol draft lines, craft Caesars & refreshers.
                </p>
                <div className="space-y-4">
                  {itemsByCategory['drinks']?.map((item) => (
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

              {/* Category: Fresh Jumbo Wings */}
              <div className="chalkboard-card rounded-2xl p-6 border border-white/15">
                <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3 mb-4">
                  <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white min-w-0">FRESH JUMBO WINGS</h3>
                  <span className="font-mono text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/40 whitespace-nowrap shrink-0">
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
                <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3 mb-2">
                  <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white min-w-0">6OZ AAA CHUCK BURGERS</h3>
                  <span className="font-mono text-xs text-red-400 font-semibold bg-red-950/60 px-2.5 py-0.5 rounded border border-red-800/40 whitespace-nowrap shrink-0">
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
                <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3 mb-4">
                  <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white min-w-0">SIGNATURE POUTINES</h3>
                  <span className="font-mono text-xs text-gray-400 whitespace-nowrap shrink-0">Ontario Curds</span>
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
                <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3 mb-2">
                  <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white min-w-0">THIN CRUST PIZZA</h3>
                  <span className={`font-mono text-xs font-semibold px-2.5 py-0.5 rounded border flex items-center gap-1 whitespace-nowrap shrink-0 ${
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
                <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3 mb-4">
                  <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white min-w-0">HANDHELDS & CLASSICS</h3>
                  <span className="font-mono text-xs text-[#E5A93C] whitespace-nowrap shrink-0">Includes Side</span>
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
                <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3 mb-2">
                  <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white min-w-0">LARGE PLATES & STEAKS</h3>
                  <span className={`font-mono text-xs font-semibold px-2.5 py-0.5 rounded border flex items-center gap-1 whitespace-nowrap shrink-0 ${
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
                  <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3 mb-4">
                    <h3 className="font-chalk text-3xl tracking-wide text-white min-w-0">FRESH JUMBO WINGS</h3>
                    <span className="font-mono text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/40 whitespace-nowrap shrink-0">
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
                  <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3 mb-4">
                    <h3 className="font-chalk text-3xl tracking-wide text-white min-w-0">SIGNATURE POUTINES</h3>
                    <span className="font-mono text-xs text-gray-400 whitespace-nowrap shrink-0">Ontario Curds</span>
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
                  <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3 mb-4">
                    <h3 className="font-chalk text-3xl tracking-wide text-white min-w-0">SMALL PLATES & SNACKS</h3>
                    <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">Apps & Bites</span>
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

              {/* COLUMN 2: TAPS & DRINKS, HANDHELDS, SOUPS & SALADS, PASTA */}
              <div className="space-y-8">
                {/* Taps & Cocktails (High Margin Beverage Program) */}
                <div className="chalkboard-card rounded-2xl p-6 border border-white/15">
                  <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3 mb-2">
                    <h3 className="font-chalk text-3xl tracking-wide text-white min-w-0">TAPS & COCKTAILS</h3>
                    <span className="font-mono text-xs text-[#E5A93C] font-semibold bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-800/40 whitespace-nowrap shrink-0">
                      SUB-ZERO DRAUGHT
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4 pb-2 border-b border-white/10">
                    Poured frosty from Sub-Zero glycol draft lines, craft Caesars & refreshers.
                  </p>
                  <div className="space-y-4">
                    {itemsByCategory['drinks']?.map((item) => (
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

                {/* Handhelds */}
                <div className="chalkboard-card rounded-2xl p-6 border border-white/15">
                  <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3 mb-2">
                    <h3 className="font-chalk text-3xl tracking-wide text-white min-w-0">SANDWICHES & HANDHELDS</h3>
                    <span className="font-mono text-xs text-[#E5A93C] whitespace-nowrap shrink-0">Includes Side</span>
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
                  <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3 mb-4">
                    <h3 className="font-chalk text-3xl tracking-wide text-white min-w-0">SOUPS & GREENS</h3>
                    <span className="font-mono text-xs text-gray-400 whitespace-nowrap shrink-0">Daily Scratch</span>
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
              </div>

              {/* COLUMN 3: 6OZ AAA BURGERS, PIZZA, LARGE PLATES */}
              <div className="space-y-8">
                {/* Burgers */}
                <div className="chalkboard-card rounded-2xl p-6 border border-white/15">
                  <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3 mb-2">
                    <h3 className="font-chalk text-3xl tracking-wide text-white min-w-0">6OZ AAA CHUCK BURGERS</h3>
                    <span className="font-mono text-xs text-red-400 font-semibold bg-red-950/60 px-2.5 py-0.5 rounded border border-red-800/40 whitespace-nowrap shrink-0">
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
                  <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3 mb-2">
                    <h3 className="font-chalk text-3xl tracking-wide text-white min-w-0">THIN CRUST PIZZA</h3>
                    <span className={`font-mono text-xs font-semibold px-2.5 py-0.5 rounded border flex items-center gap-1 whitespace-nowrap shrink-0 ${
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
                  <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3 mb-2">
                    <h3 className="font-chalk text-3xl tracking-wide text-white min-w-0">LARGE PLATES & STEAKS</h3>
                    <span className={`font-mono text-xs font-semibold px-2.5 py-0.5 rounded border flex items-center gap-1 whitespace-nowrap shrink-0 ${
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
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>Sub-Zero Draught Pint</span>
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
      </div>
    </section>
  );
};

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
      onClick={item.dineInOnly ? undefined : onClick}
      className={`group p-4 sm:p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
        isLocked
          ? 'bg-[#15171b]/80 border-dashed border-gray-700 hover:border-amber-500/50 cursor-pointer'
          : item.dineInOnly
          ? 'bg-[#1e2228]/95 hover:bg-[#232830] border-white/10 hover:border-[#E5A93C]/40 hover:shadow-lg cursor-default'
          : 'bg-[#1e2228]/95 hover:bg-[#232830] border-white/10 hover:border-[#E5A93C]/40 hover:shadow-lg cursor-pointer'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            {item.badge && (
              <span className="inline-block font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-[#E5A93C] border border-amber-500/40 mb-1.5 whitespace-nowrap">
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
        <div className="min-w-0 shrink-0">
          {item.portionOptions && item.portionOptions.length > 1 ? (
            <div>
              <span className="font-mono tabular-nums font-bold text-sm sm:text-base text-[#E5A93C] whitespace-nowrap block">
                ${item.portionOptions[0].price.toFixed(2)} / ${item.portionOptions[1].price.toFixed(2)}
              </span>
              <span className="block text-[10px] text-gray-400 font-mono whitespace-nowrap truncate">
                {item.portionOptions[0].name.split(' (')[0]} • {item.portionOptions[1].name.split(' (')[0]}
              </span>
            </div>
          ) : (
            <div>
              <span className="font-mono tabular-nums font-bold text-base sm:text-lg text-[#E5A93C] whitespace-nowrap block">
                ${item.price.toFixed(2)}
              </span>
              {item.portionOptions && item.portionOptions.length === 1 && (
                <span className="block text-[10px] text-gray-400 font-mono whitespace-nowrap truncate">
                  {item.portionOptions[0].name}
                </span>
              )}
            </div>
          )}
        </div>

        {isLocked ? (
          <div className="flex items-center gap-1 text-[11px] text-amber-300 font-medium bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-900/50 whitespace-nowrap shrink-0">
            <Lock className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="whitespace-nowrap">{lockNotice}</span>
          </div>
        ) : item.dineInOnly ? (
          <span className="bg-white/10 text-gray-300 border border-white/10 text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg cursor-default select-none whitespace-nowrap shrink-0">
            Dine-In Only
          </span>
        ) : isKitchenThrottled ? (
          <span className="bg-white/5 text-gray-400 border border-white/10 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-not-allowed select-none whitespace-nowrap shrink-0">
            Takeout Unavailable
          </span>
        ) : (
          <button
            type="button"
            className="px-3.5 py-1.5 text-xs font-semibold text-black bg-[#E5A93C] group-hover:bg-[#f3b544] rounded-lg flex items-center gap-1 shadow-sm transition-transform active:scale-95 whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">{item.modifierGroups ? 'Customize' : 'Add'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
