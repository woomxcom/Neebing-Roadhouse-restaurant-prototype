import React, { useState, useEffect } from 'react';
import { Trophy, AlertTriangle, Bell, X, Sparkles } from 'lucide-react';

export type AlertType = 'game_day' | 'private_event';

interface OperationalToastProps {
  alertType: AlertType;
  isDismissed: boolean;
  onDismiss: () => void;
  onRestore: () => void;
  hasActiveCart: boolean;
}

export const OperationalToast: React.FC<OperationalToastProps> = ({
  alertType,
  isDismissed,
  onDismiss,
  onRestore,
  hasActiveCart,
}) => {
  const [hasDelayedAppeared, setHasDelayedAppeared] = useState(false);

  // Smooth appearance 1.5 seconds after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasDelayedAppeared(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // If initial 1.5s delay has not elapsed and not manually opened, don't show yet
  const isVisible = hasDelayedAppeared && !isDismissed;

  return (
    <>
      {/* -------------------------------------------------------------------------
          STATE 1: DISMISSED MINI FLOATING BELL TRIGGER
          Leaves a subtle, non-intrusive floating amber bell icon so guests can re-expand
          ------------------------------------------------------------------------- */}
      {hasDelayedAppeared && isDismissed && (
        <div
          className={`fixed z-40 transition-all duration-300 ${
            hasActiveCart
              ? 'bottom-20 right-4 sm:bottom-6 sm:right-6'
              : 'bottom-6 right-4 sm:bottom-6 sm:right-6'
          }`}
        >
          <button
            onClick={onRestore}
            className="group w-11 h-11 rounded-full bg-[#1A1D23]/95 backdrop-blur-md border border-[#E5A93C]/50 hover:border-[#E5A93C] text-[#E5A93C] hover:text-white flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.6)] active:scale-95 transition-all"
            title="View Live Roadhouse Announcement"
            aria-label="View Announcement"
          >
            <Bell className="w-5 h-5 text-[#E5A93C] group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      )}

      {/* -------------------------------------------------------------------------
          STATE 2: EXPANDED FLOATING OPERATIONAL TOAST CARD
          Non-blocking, zero dimming, floats above content and mobile cart bar
          ------------------------------------------------------------------------- */}
      {isVisible && (
        <aside
          aria-label="Live Roadhouse Bulletin Toast"
          className={`fixed z-40 transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in duration-300 ${
            hasActiveCart
              ? 'bottom-20 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md sm:w-full'
              : 'bottom-6 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md sm:w-full'
          }`}
        >
          <div className="bg-[#1A1D23]/95 backdrop-blur-md border border-[#E5A93C]/35 shadow-[0_12px_40px_rgba(0,0,0,0.8)] rounded-2xl p-4 text-[#F5F5F3] relative flex items-start gap-3.5">
            {/* Left Status Icon */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                alertType === 'game_day'
                  ? 'bg-[#E5A93C]/15 border-[#E5A93C]/40 text-[#E5A93C]'
                  : 'bg-amber-950/70 border-amber-500/50 text-amber-400'
              }`}
            >
              {alertType === 'game_day' ? (
                <Trophy className="w-4.5 h-4.5" />
              ) : (
                <AlertTriangle className="w-4.5 h-4.5" />
              )}
            </div>

            {/* Middle Content */}
            <div className="flex-1 min-w-0 pr-6">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-chalk text-sm tracking-wide text-[#E5A93C]">
                  {alertType === 'game_day' ? 'LIVE PUB FEATURE' : 'OPERATIONAL NOTICE'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] animate-pulse" />
              </div>

              <p className="text-xs text-gray-200 leading-relaxed font-normal">
                {alertType === 'game_day' ? (
                  <>
                    <strong className="text-white font-medium">🏆 Game Night:</strong> Live broadcast in the Sports Pub tonight • <strong className="text-white font-medium">Sunday Wing Feature:</strong> $9.99/lb after 4 PM.
                  </>
                ) : (
                  <>
                    <strong className="text-amber-300 font-medium">⚠️ Special Notice:</strong> Dining Room closing at 5:30 PM this Saturday for a private event; Sports Bar remains open for regular service.
                  </>
                )}
              </p>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={onDismiss}
              className="absolute top-3.5 right-3.5 p-1 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              title="Dismiss notification"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}
    </>
  );
};
