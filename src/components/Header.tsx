import React, { useState, useEffect } from 'react';
import { Phone, ShoppingBag, Navigation, Menu, X, ChevronRight, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  cartItemCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  isKitchenThrottled: boolean;
  simulatedHour: number;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  cartTotal,
  onOpenCart,
  isKitchenThrottled,
  simulatedHour,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle body scroll lock when mobile navigation drawer is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const cleanId = targetId.replace('#', '');
    const element = document.getElementById(cleanId);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#121417]/95 backdrop-blur-md border-b border-white/10 text-[#F5F5F3] transition-all duration-300">
        {/* =========================================================================
            SLIM OPERATIONAL STATUS STRIP
            Smooth height, opacity, and transform transition without unmounting DOM
            ========================================================================= */}
        <div
          className={`w-full overflow-hidden transition-all duration-300 ease-in-out bg-[#16181D] ${
            isScrolled
              ? 'max-h-0 opacity-0 -translate-y-2 pointer-events-none border-b border-transparent'
              : 'max-h-[36px] opacity-100 translate-y-0 pointer-events-auto border-b border-white/5'
          }`}
        >
          <div className="max-w-7xl mx-auto h-[34px] px-3 sm:px-6 w-full flex items-center justify-between">
            {/* Desktop View (>= 768px) */}
            <div className="hidden md:flex items-center justify-between w-full">
              {/* Left: Indicator Dot & Live Kitchen Status */}
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative shrink-0">
                  {isKitchenThrottled ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                    </>
                  ) : (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </>
                  )}
                </span>
                <span className="text-xs text-[#F5F5F3] font-normal tracking-wide">
                  {isKitchenThrottled
                    ? 'Takeout Paused Due to High Dine-In Volume • Walk-In & Bar Dining Open'
                    : 'Kitchen Active • Takeout & Curbside Ready'}
                </span>
              </div>

              {/* Right: Hours & Daypart Availability with Kitchen vs Bar distinction */}
              <div className="text-xs text-[#A8ACB1] font-normal flex items-center gap-1.5">
                <span>Kitchen open until <strong className="text-emerald-400 font-medium">11:00 PM</strong></span>
                <span className="opacity-40">•</span>
                <span>Bar open until <strong className="text-amber-300 font-medium">12:00 AM</strong></span>
                <span className="opacity-40">•</span>
                <span>Pizzas after 4 PM</span>
                <span className="opacity-40">•</span>
                <span>Steaks after 5 PM</span>
              </div>
            </div>

            {/* Mobile View (< 768px): Strictly single line with no wrapping */}
            <div className="md:hidden flex items-center justify-between w-full whitespace-nowrap overflow-hidden">
              {/* Left: Green dot + concise status */}
              <div className="flex items-center gap-1.5 truncate pr-2 min-w-0">
                <span className="flex h-2 w-2 relative shrink-0">
                  {isKitchenThrottled ? (
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  ) : (
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  )}
                </span>
                <span className="text-[11px] xs:text-xs text-[#F5F5F3] font-normal truncate">
                  {isKitchenThrottled
                    ? 'Takeout Paused Due to High Dine-In Volume'
                    : 'Kitchen until 11 PM | Bar until 12 AM'}
                </span>
              </div>

              {/* Right: Small tap target Hours dropdown jump */}
              <a
                href="#hours-location"
                onClick={(e) => handleNavClick(e, '#hours-location')}
                className="text-[11px] xs:text-xs text-[#A8ACB1] hover:text-[#E5A93C] transition-colors shrink-0 py-0.5 px-1 font-medium"
              >
                Hours ▾
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MAIN NAVIGATION HEADER (Underneath Status Strip)
            Compact, shrink-0 action grouping with mobile hamburger trigger
            ========================================================================= */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-3 sm:gap-6 w-full">
          {/* Zone 1: Mobile Hamburger + Locked Wordmark */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Hamburger Button on < lg (1024px) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white active:scale-95 shrink-0 cursor-pointer transition-colors"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5 text-gray-200" />
            </button>

            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center gap-2 group shrink-0 cursor-pointer"
            >
              <span className="font-chalk text-xl sm:text-2xl lg:text-3xl tracking-wide text-[#F5F5F3] group-hover:text-[#E5A93C] transition-colors whitespace-nowrap">
                NEEBING ROADHOUSE
              </span>
            </a>
          </div>

          {/* Zone 2: Desktop navigation links (hidden on mobile/tablet) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-gray-300">
            <a
              href="#menu-chalkboard"
              onClick={(e) => handleNavClick(e, '#menu-chalkboard')}
              className="hover:text-[#E5A93C] transition-colors cursor-pointer whitespace-nowrap"
            >
              Menu
            </a>
            <a
              href="#takeout-section"
              onClick={(e) => handleNavClick(e, '#takeout-section')}
              className="hover:text-[#E5A93C] transition-colors cursor-pointer whitespace-nowrap"
            >
              Takeout
            </a>
            <a
              href="#venue-guide"
              onClick={(e) => handleNavClick(e, '#venue-guide')}
              className="hover:text-[#E5A93C] transition-colors cursor-pointer whitespace-nowrap"
            >
              Venue Guide
            </a>
            <a
              href="#hours-location"
              onClick={(e) => handleNavClick(e, '#hours-location')}
              className="hover:text-[#E5A93C] transition-colors cursor-pointer whitespace-nowrap"
            >
              Hours & Map
            </a>
          </nav>

          {/* Zone 3: Compact utility actions container with shrink-0 */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Direct GPS Directions CTA */}
            <a
              href="https://maps.google.com/?q=Neebing+Roadhouse+Thunder+Bay"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 md:w-auto md:h-auto md:px-3 md:py-2 flex items-center justify-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#E5A93C] hover:text-white transition-colors shrink-0 active:scale-95"
              title="Open GPS Directions in Google Maps"
              aria-label="Directions in Google Maps"
            >
              <Navigation className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline text-xs sm:text-sm font-medium">Directions</span>
            </a>

            {/* Direct Dial Call CTA */}
            <a
              href="tel:8074753544"
              className="w-9 h-9 md:w-auto md:h-auto md:px-3 md:py-2 flex items-center justify-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-white transition-colors shrink-0 active:scale-95"
              title="Call Neebing Roadhouse"
              aria-label="Call (807) 475-3544"
            >
              <Phone className="w-4 h-4 text-[#E5A93C] shrink-0" />
              <span className="hidden md:inline font-mono text-xs sm:text-sm font-medium">(807) 475-3544</span>
            </a>

            {/* Cart Trigger Button - Zero Text Bloat */}
            <button
              onClick={onOpenCart}
              className="relative h-9 px-2.5 sm:px-3.5 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-black bg-[#E5A93C] hover:bg-[#d4982d] rounded-lg transition-all shadow-md active:scale-95 shrink-0"
              aria-label="View Takeout Cart"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span className="font-mono tabular-nums font-bold text-xs sm:text-sm hidden xs:inline">
                ${cartTotal.toFixed(2)}
              </span>
              <AnimatePresence mode="popLayout">
                {cartItemCount > 0 && (
                  <motion.span
                    key={`cart-badge-${cartItemCount}`}
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ scale: [1.45, 0.9, 1], opacity: 1 }}
                    exit={{ scale: 0.3, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                    className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm ring-2 ring-[#121417]"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SLIDE-OUT MOBILE NAVIGATION DRAWER (< 1024px)
          Framer Motion spring slide-in from right with backdrop dismissal
          ========================================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            {/* Frosted Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-xs cursor-pointer"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300, mass: 0.85 }}
              className="relative w-full max-w-sm bg-[#16181D] text-white h-full shadow-2xl border-l border-white/10 flex flex-col justify-between p-6 z-10 overflow-y-auto"
            >
              {/* Drawer Top: Wordmark & Close Button */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="font-chalk text-2xl tracking-wide text-white">
                      NEEBING ROADHOUSE
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Vertical Navigation Links */}
                <nav className="mt-6 flex flex-col space-y-1">
                  <a
                    href="#menu-chalkboard"
                    onClick={(e) => handleNavClick(e, '#menu-chalkboard')}
                    className="py-3.5 px-3 rounded-xl text-lg font-medium text-gray-200 hover:text-[#E5A93C] hover:bg-white/5 border-b border-white/5 flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <span>Menu</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#E5A93C] group-hover:translate-x-1 transition-all" />
                  </a>
                  <a
                    href="#takeout-section"
                    onClick={(e) => handleNavClick(e, '#takeout-section')}
                    className="py-3.5 px-3 rounded-xl text-lg font-medium text-gray-200 hover:text-[#E5A93C] hover:bg-white/5 border-b border-white/5 flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <span>Takeout</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#E5A93C] group-hover:translate-x-1 transition-all" />
                  </a>
                  <a
                    href="#venue-guide"
                    onClick={(e) => handleNavClick(e, '#venue-guide')}
                    className="py-3.5 px-3 rounded-xl text-lg font-medium text-gray-200 hover:text-[#E5A93C] hover:bg-white/5 border-b border-white/5 flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <span>Venue Guide</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#E5A93C] group-hover:translate-x-1 transition-all" />
                  </a>
                  <a
                    href="#hours-location"
                    onClick={(e) => handleNavClick(e, '#hours-location')}
                    className="py-3.5 px-3 rounded-xl text-lg font-medium text-gray-200 hover:text-[#E5A93C] hover:bg-white/5 border-b border-white/5 flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <span>Hours & Map</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#E5A93C] group-hover:translate-x-1 transition-all" />
                  </a>
                </nav>
              </div>

              {/* Drawer Bottom: Action Trays & Status */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                {/* Live Status Indicator */}
                <div className="flex items-center gap-2 px-1 py-1 text-xs text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span>
                    {isKitchenThrottled
                      ? 'Kitchen at peak capacity • Dine-in open'
                      : 'Kitchen active • Open until 12:00 AM'}
                  </span>
                </div>

                {/* Direct Call Button */}
                <a
                  href="tel:8074753544"
                  className="w-full py-3.5 px-4 bg-[#E5A93C] hover:bg-[#d4982d] text-black font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call (807) 475-3544</span>
                </a>

                {/* Get Directions Button */}
                <a
                  href="https://maps.google.com/?q=Neebing+Roadhouse+Thunder+Bay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-white/10 hover:bg-white/15 text-white border border-white/15 font-medium text-sm rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Navigation className="w-4 h-4 text-[#E5A93C]" />
                  <span>Get GPS Directions</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
