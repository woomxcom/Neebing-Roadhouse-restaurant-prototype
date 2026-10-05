import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, Calendar, Mail, Phone, User, CheckCircle2, X, Sparkles, Sun } from 'lucide-react';

interface VolleyballModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VolleyballModal: React.FC<VolleyballModalProps> = ({ isOpen, onClose }) => {
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [division, setDivision] = useState('coed_rec');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-[#E5A93C] flex items-center justify-center shrink-0">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-script text-[#E5A93C] text-base block -mb-1">Summer Recreation</span>
                  <h3 className="font-chalk text-2xl sm:text-3xl tracking-wide text-white">
                    SAND VOLLEYBALL LEAGUE
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
            /* Confirmation State */
            <div className="py-6 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <h4 className="font-chalk text-3xl text-white tracking-wide">
                  TEAM INQUIRY RECEIVED!
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed max-w-sm mx-auto">
                  Thank you, Captain <strong className="text-white">{captainName}</strong>! Our league coordinator will reach out with division schedules, roster forms, and league kickoff details for <strong className="text-[#E5A93C]">{teamName}</strong>.
                </p>
              </div>

              <div className="p-4 bg-[#141618] rounded-xl border border-white/10 text-left space-y-2 max-w-sm mx-auto text-xs">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-gray-400">Division:</span>
                  <span className="font-bold text-white">
                    {division === 'coed_rec' ? 'Co-Ed Recreational 6s' : 'Co-Ed Competitive 4s'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-gray-400">Season Schedule:</span>
                  <span className="font-bold text-[#E5A93C]">May through September</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Contact:</span>
                  <span className="font-mono text-white">{phone}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-3 bg-[#E5A93C] hover:bg-[#d4982d] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Back to Roadhouse Guide
              </button>
            </div>
          ) : (
            /* Inquiry Form & Season Overview */
            <div className="space-y-5">
              {/* Season Highlight Card */}
              <div className="p-4 rounded-xl bg-[#141618] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-chalk text-base tracking-wide text-[#E5A93C]">2026 SUMMER SEASON</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                    REGISTRATION OPEN
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Thunder Bay's official premier roadhouse sand volleyball league. Enjoy weekly match play under string lights, dedicated outdoor draught pitcher specials, and post-game patio wing tables!
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono text-gray-400">
                  <div>📅 <strong>Days:</strong> Mon – Thu Evenings</div>
                  <div>👥 <strong>Format:</strong> Co-Ed 6s & 4s</div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Team & Captain Info */}
                <div className="space-y-3">
                  <label className="font-bold uppercase tracking-wider text-[#E5A93C] block text-xs">
                    1. Team Details <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Team Name</label>
                      <input
                        type="text"
                        required
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="e.g. Setting Ducks"
                        className="w-full px-3 py-2 bg-[#121417] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Captain Name</label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={captainName}
                          onChange={(e) => setCaptainName(e.target.value)}
                          placeholder="Alex Miller"
                          className="w-full pl-9 pr-3 py-2 bg-[#121417] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5A93C]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Contact Information */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <label className="font-bold uppercase tracking-wider text-[#E5A93C] block text-xs">
                    2. Captain Contact <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(807) 555-0144"
                          className="w-full pl-9 pr-3 py-2 bg-[#121417] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5A93C]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Email Address</label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@example.com"
                          className="w-full pl-9 pr-3 py-2 bg-[#121417] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5A93C]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Division Selection */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <label className="font-bold uppercase tracking-wider text-[#E5A93C] block text-xs">
                    3. Preferred Division
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDivision('coed_rec')}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        division === 'coed_rec'
                          ? 'bg-[#E5A93C]/20 border-[#E5A93C] text-white font-bold'
                          : 'bg-[#141618] border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <span className="block text-xs font-semibold">Co-Ed Rec 6s</span>
                      <span className="text-[10px] text-gray-400">Casual / Social</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDivision('coed_comp')}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        division === 'coed_comp'
                          ? 'bg-[#E5A93C]/20 border-[#E5A93C] text-white font-bold'
                          : 'bg-[#141618] border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <span className="block text-xs font-semibold">Co-Ed Comp 4s</span>
                      <span className="text-[10px] text-gray-400">Competitive Play</span>
                    </button>
                  </div>
                </div>

                {/* 4. Notes */}
                <div className="space-y-1 pt-2 border-t border-white/10">
                  <label className="block text-gray-400 text-xs">Team Notes / Night Availability</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Prefer Tuesday or Thursday evening match slots..."
                    className="w-full px-3 py-2 bg-[#121417] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#E5A93C] hover:bg-[#d4982d] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2 mt-2"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Submit Volleyball League Inquiry</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
  );
};
