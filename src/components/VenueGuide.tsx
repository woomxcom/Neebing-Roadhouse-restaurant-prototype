import React from 'react';
import { Phone, Users, CheckCircle, Calendar, Sparkles, Sun, Trophy, Volume2, Beer } from 'lucide-react';
import { UtensilBackgroundParticles, CrossedUtensilsSvg } from './UtensilBackgroundParticles';

interface VenueGuideProps {
  onOpenLargePartyModal?: () => void;
  onOpenVolleyballModal?: () => void;
}

export const VenueGuide: React.FC<VenueGuideProps> = ({
  onOpenLargePartyModal,
  onOpenVolleyballModal,
}) => {
  return (
    <section id="venue-guide" className="scroll-mt-20 py-16 sm:py-24 chalkboard-bg border-b border-white/10 text-[#F5F5F3] relative overflow-hidden">
      {/* Subtle floating background utensil etchings */}
      <UtensilBackgroundParticles density="normal" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            Neebing Roadhouse features three distinct atmospheres under one roof. Review our front-door seating rules and vibe profiles so you know exactly where to go upon arrival.
          </p>
        </div>

        {/* 3 Zones Differentiated Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Zone 1: Sports Pub & Tavern */}
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
              
              {/* Seating Rule Badge */}
              <div className="absolute top-3 right-3">
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-800/60 shadow">
                  SEAT YOURSELF
                </span>
              </div>
              
              <div className="absolute bottom-3 left-5 right-5">
                <span className="text-[11px] font-mono font-semibold text-[#E5A93C] uppercase tracking-wider block mb-0.5">
                  High-Energy • Big Screens
                </span>
                <h3 className="font-chalk text-2xl sm:text-3xl text-white tracking-wide">
                  SPORTS PUB & TAVERN
                </h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#E5A93C] font-semibold mb-4 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Walk in & grab any available high-top, booth, or barstool</span>
                </p>

                <ul className="space-y-3 text-xs text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Game Day Audio:</strong> Live big-screen broadcast audio for Blue Jays, NHL, and NFL matches with energetic pub volume.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Sub-Zero Draught:</strong> 14 frosty glycol taps including Guinness, local Sleeping Giant craft, and cold macro pitchers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Best For:</strong> After-work pints, jumbo wings, live sports broadcasts, and casual gatherings.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-gray-400 font-mono flex items-center justify-between">
                <span>Direct bar service</span>
                <span className="text-emerald-400">No host check-in</span>
              </div>
            </div>
          </div>

          {/* Zone 2: Family Dining Room */}
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
              
              {/* Seating Rule Badge */}
              <div className="absolute top-3 right-3">
                <span className="font-mono text-xs font-bold text-amber-300 bg-amber-950/90 px-3 py-1 rounded-full border border-amber-800/60 shadow">
                  WAIT TO BE SEATED
                </span>
              </div>
              
              <div className="absolute bottom-3 left-5 right-5">
                <span className="text-[11px] font-mono font-semibold text-[#E5A93C] uppercase tracking-wider block mb-0.5">
                  All-Ages Casual • Full Table Service
                </span>
                <h3 className="font-chalk text-2xl sm:text-3xl text-white tracking-wide">
                  FAMILY DINING ROOM
                </h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#E5A93C] font-semibold mb-4 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Please check in with our host at the front entrance</span>
                </p>

                <ul className="space-y-3 text-xs text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Atmosphere:</strong> Relaxed, quiet booths acoustically separated from the sports bar sound system.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Kids Menu:</strong> Dedicated $12.95 meals including soft drink/milk and a vanilla ice cream sundae.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Best For:</strong> Family dinners, anniversaries, steak & pasta meals, and weekend tournament teams.</span>
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
                    <Calendar className="w-3.5 h-3.5" />
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
              
              {/* Seating Rule Badge */}
              <div className="absolute top-3 right-3">
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-800/60 shadow">
                  OPEN PATIO SEATING
                </span>
              </div>
              
              <div className="absolute bottom-3 left-5 right-5">
                <span className="text-[11px] font-mono font-semibold text-[#E5A93C] uppercase tracking-wider block mb-0.5">
                  Outdoor Summer • Recreational Leagues
                </span>
                <h3 className="font-chalk text-2xl sm:text-3xl text-white tracking-wide">
                  PATIO & VOLLEYBALL
                </h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#E5A93C] font-semibold mb-4 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5" />
                  <span>Open casual deck seating with outdoor pitcher service</span>
                </p>

                <ul className="space-y-3 text-xs text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Sand Volleyball:</strong> Home to Thunder Bay’s official co-ed summer sand volleyball league (Mon–Thu).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Patio Vibe:</strong> Picnic tables, umbrella shade, festival string lights, warm breezes, and rum fishbowls.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span><strong>Best For:</strong> Sunny weekend afternoons, post-game celebrations, and outdoor dining.</span>
                  </li>
                </ul>
              </div>

              {/* Volleyball League Modal Trigger */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                {onOpenVolleyballModal && (
                  <button
                    type="button"
                    onClick={onOpenVolleyballModal}
                    className="w-full py-2.5 px-3 bg-[#E5A93C] hover:bg-[#d99d33] text-black rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Volleyball League Info & Inquiries</span>
                  </button>
                )}
                <div className="text-[11px] text-gray-400 font-mono text-center">
                  Seasonal outdoor access (May through September).
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Large Group Call-Ahead Banner with Dual Actions */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#1A1D23] border border-white/10 border-l-4 border-l-[#E5A93C] flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E5A93C]/15 border border-[#E5A93C]/30 text-[#E5A93C] flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white">
                PLANNING A PARTY OF 6 OR MORE?
              </h4>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mt-1">
                Please inquire online or call ahead so our team can prepare adjacent seating and ensure smooth kitchen pacing for your group.
              </p>
              <div className="text-xs text-gray-400 flex flex-wrap items-center gap-4 mt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
                  2-Hour Confirmation
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
                  Dedicated Floor Setup
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
                  Walk-ins welcome for parties under 6
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto shrink-0">
            {onOpenLargePartyModal && (
              <button
                type="button"
                onClick={onOpenLargePartyModal}
                className="w-full sm:w-auto bg-[#E5A93C] hover:bg-[#d4982f] text-black font-bold text-sm px-5 py-3 rounded-xl shadow-lg active:scale-95 flex items-center justify-center gap-2 transition-all whitespace-nowrap cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Inquire Online (6+)</span>
              </button>
            )}

            <a
              href="tel:8074753544"
              className="w-full sm:w-auto border border-white/15 hover:border-white/30 hover:bg-white/5 text-white text-sm px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#E5A93C]" />
              <span>Call (807) 475-3544</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
