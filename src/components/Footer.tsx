import React from 'react';
import { Phone, MapPin, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0e1012] border-t border-white/10 text-gray-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Col 1: Brand & Heritage */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="font-chalk text-3xl text-white tracking-wider">
                NEEBING ROADHOUSE
              </span>
              <span className="font-script text-base text-[#E5A93C]">Since 1947</span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Thunder Bay’s destination for fresh Canadian chicken wings, Alberta AAA chuck burgers, stone deck pizzas, cold Sub-Zero draught, and recreation on Highway 61.
            </p>
            <div className="pt-2 text-gray-400">
              <span>2121 Hwy 61, Thunder Bay, ON P7J 1G4</span> · <span>Tel: (807) 475-3544</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <span className="font-chalk text-sm tracking-wider text-white uppercase block mb-3">
              Navigation
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#menu-chalkboard" className="hover:text-[#E5A93C] transition-colors">
                  Chalkboard Menu
                </a>
              </li>
              <li>
                <a href="#takeout-section" className="hover:text-[#E5A93C] transition-colors">
                  Curbside Takeout
                </a>
              </li>
              <li>
                <a href="#venue-guide" className="hover:text-[#E5A93C] transition-colors">
                  Seating Guide & Policies
                </a>
              </li>
              <li>
                <a href="#hours-location" className="hover:text-[#E5A93C] transition-colors">
                  Operating Hours & Map
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Kitchen Windows */}
          <div className="space-y-2">
            <span className="font-chalk text-sm tracking-wider text-white uppercase block mb-3">
              Daily Kitchen Hours
            </span>
            <ul className="space-y-1.5 text-[11px] text-gray-400">
              <li className="flex justify-between">
                <span>Mon – Wed:</span>
                <span className="text-gray-300 font-mono">4:00 PM – 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Thu – Sat:</span>
                <span className="text-gray-300 font-mono">12:00 PM – 12:00 AM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-gray-300 font-mono">4:00 PM – 11:00 PM</span>
              </li>
              <li className="pt-1 text-[#E5A93C] text-[10px]">
                * Pizzas available daily after 4:00 PM
              </li>
              <li className="text-[#E5A93C] text-[10px]">
                * Large plates & steaks after 5:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} Neebing Roadhouse. All rights reserved. Prices subject to applicable taxes.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-gray-400 hover:text-[#E5A93C] transition-colors p-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
