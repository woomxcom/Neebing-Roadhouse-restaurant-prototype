import React from 'react';
import { Star, ShieldCheck, Award, ThumbsUp, MapPin, Quote } from 'lucide-react';
import { UtensilBackgroundParticles } from './UtensilBackgroundParticles';

export const SocialProofReviews: React.FC = () => {
  const reviews = [
    {
      quote: "Best wings in Northwestern Ontario. Crispy, huge, and the Buffalo Rouge sauce is unbeatable.",
      author: "Local Guide",
      badge: "Thunder Bay Resident",
      rating: 5,
      detail: "Verified Regular • 40+ visits",
    },
    {
      quote: "Portions are massive—we always leave with takeout boxes. Fast service even on busy game nights.",
      author: "Weekend Hockey Family",
      badge: "Family Dining Regular",
      rating: 5,
      detail: "Verified Dine-In Patron",
    },
    {
      quote: "The quintessential Canadian roadhouse. Coldest draught beer on Highway 61.",
      author: "Cross-Canada Traveler",
      badge: "Verified Traveler",
      rating: 5,
      detail: "Highway 61 Explorer",
    },
  ];

  return (
    <section className="py-16 sm:py-20 chalkboard-bg border-b border-white/10 text-[#F5F5F3] relative overflow-hidden">
      {/* Subtle background particles */}
      <UtensilBackgroundParticles density="sparse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Google Rating Trust Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E5A93C] animate-pulse" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E5A93C]">
                Highway 61 Reputation
              </p>
            </div>
            <h2 className="font-chalk text-4xl sm:text-5xl uppercase tracking-wider text-white">
              TRUSTED BY THUNDER BAY & TRAVELERS
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              Serving hungry roadtrippers, regional sports teams, and local families for over 75 years with honest scratch cooking and cold Sub-Zero pints.
            </p>
          </div>

          {/* Aggregate Rating Badge */}
          <div className="flex items-center gap-3 bg-[#1A1D23] border border-white/10 px-4 py-3 rounded-2xl shrink-0 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#E5A93C] flex items-center justify-center font-bold text-lg font-mono border border-amber-500/30">
              4.8
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#E5A93C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#E5A93C]" />
                ))}
              </div>
              <span className="text-xs text-gray-300 font-medium">850+ Verified Google Reviews</span>
            </div>
          </div>
        </div>

        {/* 3-Column Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="chalkboard-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:border-[#E5A93C]/40 transition-colors relative group"
            >
              <div className="mb-4">
                <Quote className="w-8 h-8 text-[#E5A93C]/30 mb-2 group-hover:text-[#E5A93C]/50 transition-colors" />
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#E5A93C] text-[#E5A93C]" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <strong className="block text-white text-xs sm:text-sm font-semibold">{rev.author}</strong>
                  <span className="text-[11px] text-gray-400 font-mono">{rev.detail}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E5A93C]/10 text-[#E5A93C] border border-[#E5A93C]/25">
                  {rev.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Pillars Trust Banner */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs text-gray-300">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#141618] border border-white/5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <strong className="text-white block font-medium">100% Fresh Canadian Wings</strong>
              <span className="text-gray-400 text-[11px]">Never frozen, scratch-tossed sauces</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#141618] border border-white/5">
            <Award className="w-5 h-5 text-[#E5A93C] shrink-0" />
            <div>
              <strong className="text-white block font-medium">Alberta AAA Angus Chuck</strong>
              <span className="text-gray-400 text-[11px]">Hand-pattied fresh daily on Highway 61</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#141618] border border-white/5">
            <ThumbsUp className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <strong className="text-white block font-medium">Sub-Zero Glycol Taps</strong>
              <span className="text-gray-400 text-[11px]">14 ice-cold craft & domestic draughts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
