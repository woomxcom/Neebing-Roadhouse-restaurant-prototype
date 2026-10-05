import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, AlertCircle } from 'lucide-react';
import { UtensilBackgroundParticles } from './UtensilBackgroundParticles';

export const HoursAndLocation: React.FC = () => {
  const scheduleList = [
    {
      dayRange: 'Monday – Wednesday',
      kitchenHours: '4:00 PM – 10:00 PM',
      barHours: '4:00 PM – 11:00 PM',
      tag: 'Dinner & Pub Service',
    },
    {
      dayRange: 'Thursday – Saturday',
      kitchenHours: '12:00 PM – 11:00 PM',
      barHours: '12:00 PM – 12:00 AM (Midnight)',
      tag: 'Lunch, Dinner & Late Night',
    },
    {
      dayRange: 'Sunday',
      kitchenHours: '4:00 PM – 10:00 PM',
      barHours: '4:00 PM – 11:00 PM',
      tag: 'Sunday Wing Night Feature',
    },
  ];

  return (
    <section id="hours-location" className="scroll-mt-20 py-16 sm:py-24 chalkboard-bg border-b border-white/10 text-[#F5F5F3] relative overflow-hidden">
      {/* Subtle floating background utensil etchings */}
      <UtensilBackgroundParticles density="normal" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E5A93C] mb-2">
            Highway 61 Landmark
          </p>
          <h2 className="font-chalk text-4xl sm:text-6xl uppercase tracking-wider text-white mb-3">
            Hours & Location
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Conveniently situated on Highway 61 just south of Thunder Bay International Airport. Easy access with ample complimentary parking for trucks, trailers, and guest vehicles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Hours Card with Explicit Kitchen vs Bar Breakdown */}
          <div className="chalkboard-card rounded-2xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#E5A93C]/15 text-[#E5A93C] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-chalk text-2xl text-white tracking-wide">
                  OPERATING HOURS
                </h3>
                <span className="text-xs text-[#E5A93C] font-medium">
                  Separate Kitchen & Bar Schedules
                </span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              {scheduleList.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#141618] border border-white/5 space-y-2"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                    <span className="font-bold text-white text-sm">{item.dayRange}</span>
                    <span className="text-[11px] font-mono text-[#E5A93C] px-2 py-0.5 rounded bg-[#E5A93C]/10 border border-[#E5A93C]/20">
                      {item.tag}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                    <div className="flex items-center justify-between sm:justify-start sm:gap-2">
                      <span className="text-gray-400 font-medium">Kitchen:</span>
                      <span className="font-mono text-emerald-400 font-semibold">{item.kitchenHours}</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start sm:gap-2">
                      <span className="text-gray-400 font-medium">Bar / Tavern:</span>
                      <span className="font-mono text-amber-300 font-semibold">{item.barHours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Prominent Operational Transparency Callout */}
            <div className="mt-5 p-3.5 rounded-xl bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
              <p className="text-xs text-amber-100/90 leading-relaxed">
                <strong>Please note:</strong> Our kitchen stops accepting food orders one hour prior to venue close to ensure scratch-cooked quality and fresh preparation.
              </p>
            </div>
          </div>

          {/* Location & Contact Card */}
          <div className="chalkboard-card rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#E5A93C]/15 text-[#E5A93C] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-chalk text-2xl text-white tracking-wide">
                    LOCATION & LOGISTICS
                  </h3>
                  <span className="text-xs text-gray-400">Thunder Bay, Ontario</span>
                </div>
              </div>

              {/* Contact list */}
              <div className="space-y-5 mb-8 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#E5A93C] shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block">Street Address</strong>
                    <span className="text-gray-300">2121 Hwy 61, Thunder Bay, ON P7J 1G4</span>
                    <span className="block text-xs text-gray-400 mt-0.5">
                      5 minutes south of Thunder Bay International Airport
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#E5A93C] shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block">Direct Telephone</strong>
                    <a
                      href="tel:8074753544"
                      className="text-[#E5A93C] hover:underline font-mono text-sm font-semibold"
                    >
                      (807) 475-3544
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#E5A93C] shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block">Email Inquiries</strong>
                    <span className="text-gray-300">theneebing@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Curbside pickup note */}
              <div className="p-4 rounded-xl bg-[#141618] border border-white/10 mb-6">
                <span className="font-medium text-xs text-[#E5A93C] block mb-1">
                  Curbside Takeout Parking
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Dedicated Curbside Pickup stalls (1–6) are reserved directly in front of the main entrance for mobile order pickups.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://maps.google.com/?q=2121+Hwy+61+Thunder+Bay+ON+P7J+1G4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 bg-[#E5A93C] hover:bg-[#d99d33] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow"
              >
                <span>Get Driving Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="tel:8074753544"
                className="py-3.5 px-5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span>Call Host</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
