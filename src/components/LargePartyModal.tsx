import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Calendar, Clock, MapPin, CheckCircle2, X, Phone, User, Sparkles, MessageSquare } from 'lucide-react';

interface LargePartyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LargePartyModal: React.FC<LargePartyModalProps> = ({ isOpen, onClose }) => {
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [partySize, setPartySize] = useState('8');
  const [customSize, setCustomSize] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('6:00 PM');
  const [diningArea, setDiningArea] = useState('dining_room');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const partyChips = ['6', '8', '10', '12', '15+'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={handleResetAndClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340, mass: 0.8 }}
            className="relative w-full max-w-lg bg-[#1A1D23] text-[#F5F5F3] rounded-2xl border border-white/15 shadow-2xl overflow-hidden max-h-[95vh] flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-[#141618] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E5A93C]/15 border border-[#E5A93C]/30 text-[#E5A93C] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-script text-[#E5A93C] text-base block -mb-1">Groups & Teams</span>
                  <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white">
                    LARGE PARTY INQUIRY (6+)
                  </h3>
                </div>
              </div>
              <button
                onClick={handleResetAndClose}
                className="p-1.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-xs sm:text-sm">
          {isSubmitted ? (
            /* Submission Confirmation State */
            <div className="py-6 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <h4 className="font-chalk text-3xl text-white tracking-wide">
                  REQUEST RECEIVED!
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong className="text-white">{contactName}</strong>! Our host team will review floor availability and confirm your table via text/call within <strong className="text-[#E5A93C]">2 hours</strong>.
                </p>
              </div>

              {/* Inquiry Summary Card */}
              <div className="p-4 bg-[#141618] rounded-xl border border-white/10 text-left space-y-2 max-w-sm mx-auto text-xs">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-gray-400">Party Size:</span>
                  <span className="font-bold text-white">{partySize === '15+' && customSize ? `${customSize} Guests` : `${partySize} Guests`}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-gray-400">Date & Time:</span>
                  <span className="font-bold text-white">{date || 'Upcoming'} at {time}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-gray-400">Seating Area:</span>
                  <span className="font-bold text-[#E5A93C] capitalize">{diningArea.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Contact Number:</span>
                  <span className="font-mono text-white">{phone}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-3 bg-[#E5A93C] hover:bg-[#d4982d] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Return to Menu
              </button>
            </div>
          ) : (
            /* Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* 1. Contact Info */}
              <div className="space-y-3">
                <label className="font-bold uppercase tracking-wider text-[#E5A93C] block text-xs">
                  1. Contact Information <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Sarah Jenkins"
                        className="w-full pl-9 pr-3 py-2 bg-[#121417] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">Mobile Phone (for SMS confirm)</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(807) 555-0199"
                        className="w-full pl-9 pr-3 py-2 bg-[#121417] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Party Size Selection */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="font-bold uppercase tracking-wider text-[#E5A93C] block text-xs">
                  2. Party Size (6+ Guests) <span className="text-red-400">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {partyChips.map((chip) => (
                    <button
                      type="button"
                      key={chip}
                      onClick={() => setPartySize(chip)}
                      className={`flex-1 min-w-[50px] py-2 px-3 rounded-lg border font-mono font-bold text-xs sm:text-sm transition-all ${
                        partySize === chip
                          ? 'bg-[#E5A93C] text-black border-[#E5A93C] shadow-sm'
                          : 'bg-[#141618] border-white/10 text-gray-300 hover:border-white/30'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
                {partySize === '15+' && (
                  <div className="pt-1">
                    <input
                      type="number"
                      min="15"
                      max="100"
                      value={customSize}
                      onChange={(e) => setCustomSize(e.target.value)}
                      placeholder="Exact group count (e.g. 24)"
                      className="w-full px-3 py-2 bg-[#121417] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5A93C]"
                    />
                  </div>
                )}
              </div>

              {/* 3. Preferred Date & Arrival Time */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <label className="font-bold uppercase tracking-wider text-[#E5A93C] block text-xs">
                  3. Preferred Date & Arrival Time <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">Target Date</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 bg-[#121417] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5A93C]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">Target Time</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3 py-2 bg-[#121417] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5A93C]"
                    >
                      <option value="12:00 PM">12:00 PM (Lunch)</option>
                      <option value="1:00 PM">1:00 PM (Lunch)</option>
                      <option value="4:30 PM">4:30 PM (Early Dinner)</option>
                      <option value="5:30 PM">5:30 PM (Dinner Rush)</option>
                      <option value="6:00 PM">6:00 PM (Prime Dinner)</option>
                      <option value="6:30 PM">6:30 PM (Prime Dinner)</option>
                      <option value="7:00 PM">7:00 PM (Dinner)</option>
                      <option value="8:00 PM">8:00 PM (Evening & Sports)</option>
                      <option value="9:00 PM">9:00 PM (Late Night Pub)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 4. Dining Area Preference */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="font-bold uppercase tracking-wider text-[#E5A93C] block text-xs">
                  4. Preferred Dining Atmosphere <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <label
                    onClick={() => setDiningArea('dining_room')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      diningArea === 'dining_room'
                        ? 'bg-[#E5A93C]/15 border-[#E5A93C] text-white'
                        : 'bg-[#141618] border-white/10 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    <div>
                      <strong className="block text-white text-xs sm:text-sm">Main Family Dining Room</strong>
                      <span className="text-[11px] text-gray-400">Relaxed sit-down table service & quiet booths</span>
                    </div>
                    <input
                      type="radio"
                      name="dining_area"
                      checked={diningArea === 'dining_room'}
                      onChange={() => setDiningArea('dining_room')}
                      className="accent-[#E5A93C]"
                    />
                  </label>

                  <label
                    onClick={() => setDiningArea('sports_bar')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      diningArea === 'sports_bar'
                        ? 'bg-[#E5A93C]/15 border-[#E5A93C] text-white'
                        : 'bg-[#141618] border-white/10 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    <div>
                      <strong className="block text-white text-xs sm:text-sm">Sports Bar / Pub Lounge</strong>
                      <span className="text-[11px] text-gray-400">Live big-screen game audio, Sub-Zero draught, high-tops</span>
                    </div>
                    <input
                      type="radio"
                      name="dining_area"
                      checked={diningArea === 'sports_bar'}
                      onChange={() => setDiningArea('sports_bar')}
                      className="accent-[#E5A93C]"
                    />
                  </label>

                  <label
                    onClick={() => setDiningArea('patio')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      diningArea === 'patio'
                        ? 'bg-[#E5A93C]/15 border-[#E5A93C] text-white'
                        : 'bg-[#141618] border-white/10 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    <div>
                      <strong className="block text-white text-xs sm:text-sm">Outdoor Patio & Volleyball Area</strong>
                      <span className="text-[11px] text-gray-400">Casual picnic tables, umbrella shade (Seasonal)</span>
                    </div>
                    <input
                      type="radio"
                      name="dining_area"
                      checked={diningArea === 'patio'}
                      onChange={() => setDiningArea('patio')}
                      className="accent-[#E5A93C]"
                    />
                  </label>
                </div>
              </div>

              {/* 5. Occasion & Special Notes */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="font-bold uppercase tracking-wider text-[#E5A93C] block text-xs">
                  5. Occasion / Special Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Minor hockey tournament team wrap-up, birthday celebration, dietary restrictions..."
                  className="w-full px-3 py-2 bg-[#121417] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E5A93C]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#E5A93C] hover:bg-[#d4982d] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Group Request</span>
                </button>
              </div>

              {/* 1–5 Guests Walk-in Policy Note */}
              <p className="text-[11px] text-gray-400 text-center leading-relaxed pt-1">
                * <strong>Parties under 6</strong> are warmly welcomed as first-come, first-served walk-ins. We seat complete parties promptly upon arrival.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
  );
};
