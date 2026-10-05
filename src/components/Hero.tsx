import React from 'react';
import { ArrowDown, ChevronRight, Utensils } from 'lucide-react';

interface HeroProps {
  onScrollToMenu: () => void;
  onOpenTakeout: () => void;
  isKitchenThrottled: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToMenu,
  onOpenTakeout,
  isKitchenThrottled,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-white/10 text-[#F5F5F3] min-h-[540px] sm:min-h-[620px] flex items-center">
      {/* Authentic Ambient Tavern & Bar Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=2000&q=85"
          alt="Neebing Roadhouse Bar and Dining Room"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[center_right] sm:object-center brightness-[0.88]"
        />
        {/* Soft left-aligned gradient ensuring maximum text contrast on the left while revealing the bright, atmospheric tavern interior on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121417] via-[#121417]/75 via-45% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121417]/80 via-transparent to-black/20" />
      </div>

      {/* Left-Aligned Text Content & Call to Actions */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28 relative z-10 flex justify-start">
        <div className="max-w-2xl text-left">
          {/* Crisp Subtitle */}
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#E5A93C] mb-3">
            Highway 61 Landmark • Thunder Bay Since 1947
          </p>

          {/* Confident Headline */}
          <h1 className="font-chalk text-5xl sm:text-7xl md:text-8xl uppercase tracking-wider text-white mb-6 leading-none drop-shadow-sm">
            Neebing Roadhouse
          </h1>

          {/* Short, natural 2-sentence description */}
          <p className="text-gray-200 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-10 drop-shadow-sm">
            Hearty comfort food cooked fresh from scratch, paired with ice-cold Sub-Zero draught and Thunder Bay’s warmest tavern hospitality. Whether you’re stopping in for famous jumbo wings after work or dining with family, everyone is welcome on Highway 61.
          </p>

          {/* Left-Aligned Action Buttons */}
          <div className="flex flex-wrap items-center justify-start gap-4">
            <button
              onClick={onOpenTakeout}
              disabled={isKitchenThrottled}
              className={`px-8 py-4 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2.5 transition-all shadow-lg active:scale-95 ${
                isKitchenThrottled
                  ? 'bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-700'
                  : 'bg-[#E5A93C] hover:bg-[#d99d33] text-black'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>{isKitchenThrottled ? 'Takeout Paused (Dine-In Open)' : 'Order Takeout'}</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={onScrollToMenu}
              className="px-8 py-4 rounded-xl font-semibold text-sm sm:text-base text-white hover:text-black hover:bg-white border border-white/30 bg-black/40 backdrop-blur-sm transition-all flex items-center gap-2 active:scale-95"
            >
              <span>View Menu</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
