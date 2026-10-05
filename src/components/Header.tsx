import React, { useState, useEffect } from 'react';
import { Phone, ShoppingBag, Navigation } from 'lucide-react';

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

  return (
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
                  ? 'Takeout Paused • In-House Dining & Bar Open'
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
                  ? 'In-House Open • Takeout Paused'
                  : 'Kitchen until 11 PM | Bar until 12 AM'}
              </span>
            </div>

            {/* Right: Small tap target Hours dropdown jump */}
            <a
              href="#hours-location"
              className="text-[11px] xs:text-xs text-[#A8ACB1] hover:text-[#E5A93C] transition-colors shrink-0 py-0.5 px-1 font-medium"
            >
              Hours ▾
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN NAVIGATION HEADER (Underneath Status Strip)
          Compact, shrink-0 action grouping with hidden text strings on < 768px
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4 w-full">
        {/* Zone 1: Wordmark with responsive scaling & truncation */}
        <a href="#hero" className="flex items-center gap-2 group min-w-0 shrink">
          <span className="font-chalk text-lg sm:text-2xl lg:text-3xl tracking-wide text-[#F5F5F3] group-hover:text-[#E5A93C] transition-colors truncate max-w-[140px] xs:max-w-[170px] sm:max-w-none">
            NEEBING ROADHOUSE
          </span>
        </a>

        {/* Zone 2: Desktop navigation links (hidden on mobile) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-gray-300">
          <a href="#menu-chalkboard" className="hover:text-[#E5A93C] transition-colors">
            Chalkboard Menu
          </a>
          <a href="#takeout-section" className="hover:text-[#E5A93C] transition-colors">
            Curbside Takeout
          </a>
          <a href="#venue-guide" className="hover:text-[#E5A93C] transition-colors">
            Know Before You Go
          </a>
          <a href="#hours-location" className="hover:text-[#E5A93C] transition-colors">
            Hours & Location
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

          {/* Cart Drawer Button */}
          <button
            onClick={onOpenCart}
            className="relative h-9 px-2.5 sm:px-3.5 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-black bg-[#E5A93C] hover:bg-[#d4982d] rounded-lg transition-all shadow-md active:scale-95 shrink-0"
            aria-label="View Takeout Cart"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span className="hidden md:inline">Takeout</span>
            <span className="font-mono tabular-nums text-xs">
              {cartItemCount > 0 ? `(${cartItemCount})` : ''}
            </span>
            {cartTotal > 0 && (
              <span className="font-mono tabular-nums text-xs border-l border-black/20 pl-1.5 hidden lg:inline">
                ${cartTotal.toFixed(2)}
              </span>
            )}
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm animate-pulse">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
