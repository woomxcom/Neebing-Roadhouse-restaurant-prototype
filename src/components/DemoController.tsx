import React, { useState } from 'react';
import { Clock, ShieldAlert, Sparkles, SlidersHorizontal, Megaphone, X, CheckCircle } from 'lucide-react';
import { AlertType } from './OperationalToast';

interface DemoControllerProps {
  simulatedHour: number;
  setSimulatedHour: (hour: number) => void;
  isKitchenThrottled: boolean;
  setIsKitchenThrottled: (throttled: boolean) => void;
  onLoadSampleOrder: () => void;
  cartItemCount: number;
  alertType: AlertType;
  setAlertType: (type: AlertType) => void;
  isAlertDismissed: boolean;
  setIsAlertDismissed: (dismissed: boolean) => void;
}

export const DemoController: React.FC<DemoControllerProps> = ({
  simulatedHour,
  setSimulatedHour,
  isKitchenThrottled,
  setIsKitchenThrottled,
  onLoadSampleOrder,
  cartItemCount,
  alertType,
  setAlertType,
  isAlertDismissed,
  setIsAlertDismissed,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Trigger Button (when controller is hidden) - Center Right position */}
      {!isOpen && (
        <div className="fixed top-1/2 -translate-y-1/2 right-3 sm:right-4 z-50 animate-in fade-in duration-200">
          <button
            onClick={() => setIsOpen(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1e2228]/95 backdrop-blur-md border border-[#E5A93C]/50 text-[#E5A93C] shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:bg-[#282d35] hover:border-[#E5A93C] hover:text-white transition-all active:scale-95 group"
            title="Open Client Presentation Demo Controls"
            aria-label="Open Demo Controller"
          >
            <SlidersHorizontal className="w-4.5 h-4.5 text-[#E5A93C] group-hover:rotate-45 transition-transform" />
          </button>
        </div>
      )}

      {/* Expandable Demo Controller Bar */}
      {isOpen && (
        <aside
          aria-label="Interactive demo controller"
          className="sticky top-0 z-50 bg-[#1e2228] border-b border-[#E5A93C]/50 text-[#F5F5F3] shadow-2xl text-xs animate-in slide-in-from-top duration-200"
        >
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
            {/* Left: Indicator title */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#E5A93C] animate-pulse" />
              <span className="font-chalk text-sm tracking-wider text-[#E5A93C] uppercase flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Client Demo Controller
              </span>
              <span className="hidden xl:inline text-gray-400 text-[11px]">
                (Simulate real-time dayparts, alerts & kitchen volume live)
              </span>
            </div>

            {/* Controls */}
            <div className="flex w-full lg:w-auto flex-wrap items-center gap-2.5 pt-1 lg:pt-0">
              {/* Daypart time simulation buttons */}
              <div className="flex items-center gap-1 bg-[#141618] p-1 rounded-lg border border-white/10">
                <span className="text-gray-400 px-1.5 py-1 flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3 text-[#E5A93C]" />
                  <span className="hidden sm:inline">Time:</span>
                </span>
                <button
                  onClick={() => setSimulatedHour(14)}
                  className={`px-2 py-1 rounded font-medium transition-all ${
                    simulatedHour < 16
                      ? 'bg-[#E5A93C] text-black font-semibold shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  title="2:00 PM - Pizza & Large Plates locked"
                >
                  2:00 PM <span className="hidden sm:inline font-normal text-[10px]">(Lunch)</span>
                </button>
                <button
                  onClick={() => setSimulatedHour(16.5)}
                  className={`px-2 py-1 rounded font-medium transition-all ${
                    simulatedHour >= 16 && simulatedHour < 17
                      ? 'bg-[#E5A93C] text-black font-semibold shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  title="4:30 PM - Pizza unlocked, Large Plates locked"
                >
                  4:30 PM <span className="hidden sm:inline font-normal text-[10px]">(Pizza)</span>
                </button>
                <button
                  onClick={() => setSimulatedHour(18.5)}
                  className={`px-2 py-1 rounded font-medium transition-all ${
                    simulatedHour >= 17
                      ? 'bg-[#E5A93C] text-black font-semibold shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  title="6:30 PM - All menus unlocked"
                >
                  6:30 PM <span className="hidden sm:inline font-normal text-[10px]">(Dinner)</span>
                </button>
              </div>

              {/* Dynamic Bulletin / Alert Strip Controller */}
              <div className="flex items-center gap-1 bg-[#141618] p-1 rounded-lg border border-white/10">
                <span className="text-gray-400 px-1.5 py-1 flex items-center gap-1 text-[11px]">
                  <Megaphone className="w-3 h-3 text-[#E5A93C]" />
                  <span className="hidden sm:inline">Alert:</span>
                </span>
                <button
                  onClick={() => {
                    setAlertType('game_day');
                    setIsAlertDismissed(false);
                  }}
                  className={`px-2 py-1 rounded font-medium transition-all ${
                    alertType === 'game_day' && !isAlertDismissed
                      ? 'bg-[#E5A93C] text-black font-semibold shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  title="Display Game Night / Feature Alert"
                >
                  Game Day
                </button>
                <button
                  onClick={() => {
                    setAlertType('private_event');
                    setIsAlertDismissed(false);
                  }}
                  className={`px-2 py-1 rounded font-medium transition-all ${
                    alertType === 'private_event' && !isAlertDismissed
                      ? 'bg-amber-500 text-black font-semibold shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  title="Display Private Event Notice"
                >
                  Private Event
                </button>
                {isAlertDismissed && (
                  <button
                    onClick={() => setIsAlertDismissed(false)}
                    className="px-1.5 py-1 text-[10px] text-amber-300 hover:underline"
                    title="Restore dismissed alert"
                  >
                    (Restore)
                  </button>
                )}
              </div>

              {/* Kitchen Volume Throttle Toggle */}
              <div className="flex items-center gap-1 bg-[#141618] p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => setIsKitchenThrottled(false)}
                  className={`px-2.5 py-1 rounded font-medium transition-all flex items-center gap-1.5 ${
                    !isKitchenThrottled
                      ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  title="Normal kitchen operations: Takeout and Dine-in open"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Kitchen: Active / Open</span>
                </button>
                <button
                  onClick={() => setIsKitchenThrottled(true)}
                  className={`px-2.5 py-1 rounded font-medium transition-all flex items-center gap-1.5 ${
                    isKitchenThrottled
                      ? 'bg-amber-600 text-white font-semibold shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  title="Peak dining volume: Takeout paused, Dine-in open"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-200" />
                  <span>Kitchen: Takeout Paused (High Volume)</span>
                </button>
              </div>

              {/* Quick Sample Order button */}
              <button
                onClick={onLoadSampleOrder}
                className="px-2.5 py-1.5 bg-[#E5A93C]/20 hover:bg-[#E5A93C]/30 text-[#E5A93C] border border-[#E5A93C]/40 rounded-lg font-medium transition-all flex items-center gap-1.5"
                title="Pre-populate cart with 2 classic items to test checkout"
              >
                <Sparkles className="w-3 h-3" />
                <span className="hidden sm:inline">Sample Order</span>
                {cartItemCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-[#E5A93C] text-black font-bold rounded-full text-[10px]">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Hide / Dismiss Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 text-gray-400 hover:text-white px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors ml-auto lg:ml-0"
                title="Hide demo controls"
              >
                <X className="w-3.5 h-3.5" />
                <span>Hide</span>
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
