import React from 'react';
import { Phone, Users, CheckCircle, Calendar, Sparkles } from 'lucide-react';
import { UtensilBackgroundParticles, CrossedUtensilsSvg } from './UtensilBackgroundParticles';

interface VenueGuideProps {
  onOpenLargePartyModal?: () => void;
}

export const VenueGuide: React.FC<VenueGuideProps> = ({ onOpenLargePartyModal }) => {
  return (
    <section id="venue-guide" className="py-16 sm:py-24 chalkboard-bg border-b border-white/10 text-[#F5F5F3] relative overflow-hidden">
      {/* Subtle floating background utensil etchings */}
      <UtensilBackgroundParticles density="normal" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <CrossedUtensilsSvg className="w-5 h-5 text-[#E5A93C] opacity-80" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E5A93C]">
              Highway 61 Atmosphere
            </p>
          </div>
          <h2 className="font-chalk text-4xl sm:text-6xl uppercase tracking-wider text-white mb-3">
            Know Before You Go
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Neebing Roadhouse features three distinct atmospheres under one roof. Review our front-door seating rules so you know exactly where to go upon arrival.
          </p>
        </div>

        {/* 3 Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Zone 1: Sports Bar & Lounge */}
          <div className="chalkboard-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between hover:border-[#E5A93C]/40 transition-colors group">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#121417]">
              <img
                src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80"
                alt="Neebing Roadhouse Sports Bar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1e24] via-black/40 to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="font-mono text-xs font-semibold text-emerald-400 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-800/60 shadow">
                  SEAT YOURSELF
                </span>
              </div>
              <div className="absolute bottom-3 left-5">
                <h3 className="font-chalk text-2xl text-white tracking-wide">
                  SPORTS PUB & LOUNGE
                </h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#E5A93C] font-semibold mb-4">
                  Walk in & grab any available high-top, booth, or barstool
                </p>

                <ul className="space-y-3 text-xs text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Atmosphere:</strong> Energetic pub volume with live audio during Blue Jays, NHL, and NFL game broadcasts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Beverages:</strong> 14 Sub-Zero draught taps including domestic favorites and local Dawson Trail craft beer.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Best For:</strong> Game days, post-shift pints, jumbo wings, and casual socializing.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-gray-400 font-mono">
                Open tavern seating. No host check-in required.
              </div>
            </div>
          </div>

          {/* Zone 2: Family Dining Room with Large Party Action */}
          <div className="chalkboard-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between hover:border-[#E5A93C]/40 transition-colors group">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#121417]">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                alt="Neebing Roadhouse Family Dining Room"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1e24] via-black/40 to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="font-mono text-xs font-semibold text-amber-300 bg-amber-950/90 px-3 py-1 rounded-full border border-amber-800/60 shadow">
                  WAIT TO BE SEATED
                </span>
              </div>
              <div className="absolute bottom-3 left-5">
                <h3 className="font-chalk text-2xl text-white tracking-wide">
                  FAMILY DINING ROOM
                </h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#E5A93C] font-semibold mb-4">
                  Please check in with our host at the front entrance
                </p>

                <ul className="space-y-3 text-xs text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Atmosphere:</strong> Relaxed, comfortable booths separated from the sports bar sound system.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Kids Menu:</strong> Dedicated $12.95 meals including soft drink and ice cream sundae.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Best For:</strong> Family dinners, anniversaries, steak & pasta meals, and quiet conversation.</span>
                  </li>
                </ul>
              </div>

              {/* Large Party Action Trigger */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                {onOpenLargePartyModal && (
                  <button
                    type="button"
                    onClick={onOpenLargePartyModal}
                    className="w-full py-2.5 px-3 bg-[#E5A93C]/15 hover:bg-[#E5A93C]/25 border border-[#E5A93C]/40 text-[#E5A93C] hover:text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Inquire for Large Parties (6+)</span>
                  </button>
                )}
                <div className="text-[11px] text-gray-400 font-mono text-center">
                  Walk-ins welcome for parties under 6.
                </div>
              </div>
            </div>
          </div>

          {/* Zone 3: Summer Patio & Sand Volleyball */}
          <div className="chalkboard-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between hover:border-[#E5A93C]/40 transition-colors group">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#121417]">
              <img
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80"
                alt="Summer Patio and Recreation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1e24] via-black/40 to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="font-mono text-xs font-semibold text-emerald-400 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-800/60 shadow">
                  OPEN PATIO SEATING
                </span>
              </div>
              <div className="absolute bottom-3 left-5">
                <h3 className="font-chalk text-2xl text-white tracking-wide">
                  SUMMER PATIO & VOLLEYBALL
                </h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#E5A93C] font-semibold mb-4">
                  Open casual seating with outdoor draught service
                </p>

                <ul className="space-y-3 text-xs text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Recreation:</strong> Home to Thunder Bay’s official co-ed summer sand volleyball league.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Vibe:</strong> Picnic tables, umbrella shade, festival string lights, warm breezes, and pitchers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Best For:</strong> Sunny weekend afternoons, post-game celebrations, and patio dining.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-gray-400 font-mono">
                Seasonal outdoor access (May through September).
              </div>
            </div>
          </div>
        </div>

        {/* Large Group Call-Ahead Banner with Dual Actions */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/15 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E5A93C]/15 text-[#E5A93C] flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-chalk text-2xl tracking-wide text-white">
                PLANNING A PARTY OF 6 OR MORE?
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Please inquire online or call ahead so our team can prepare adjacent seating and ensure smooth kitchen pacing for your group.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {onOpenLargePartyModal && (
              <button
                type="button"
                onClick={onOpenLargePartyModal}
                className="flex-1 sm:flex-initial px-5 py-3.5 bg-[#E5A93C] hover:bg-[#d99d33] text-black rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Inquire for Large Parties (6+)</span>
              </button>
            )}

            <a
              href="tel:8074753544"
              className="flex-1 sm:flex-initial px-5 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#E5A93C]" />
              <span>Call Host</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
