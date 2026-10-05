import React from 'react';

// Crisp, clearly defined Roadhouse Chalkboard Fork SVG
export const ForkSvg: React.FC<{ className?: string }> = ({ className = 'w-10 h-24' }) => (
  <svg
    viewBox="0 0 48 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* 4 distinct fork tines */}
    <path d="M12 10v24M20 10v24M28 10v24M36 10v24" />
    {/* Fork base curve */}
    <path d="M12 34c0 10 6 16 12 16s12-6 12-16" fill="currentColor" fillOpacity="0.18" />
    {/* Fork stem & handle */}
    <path d="M24 50v56c0 4-2 6-5 6s-5-2-5-6" />
  </svg>
);

// Crisp, clearly defined Roadhouse Steak/Butter Knife SVG
export const KnifeSvg: React.FC<{ className?: string }> = ({ className = 'w-10 h-24' }) => (
  <svg
    viewBox="0 0 48 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Knife blade with authentic curved silhouette */}
    <path d="M18 10c8 10 13 24 13 40H18V10z" fill="currentColor" fillOpacity="0.25" />
    <path d="M18 10c8 10 13 24 13 40H18V10z" />
    <line x1="15" y1="50" x2="33" y2="50" strokeWidth="3" />
    {/* Knife handle */}
    <path d="M20 50v58c0 4 2 5 4 5s4-1 4-5V50" />
    {/* Handle rivets */}
    <circle cx="24" cy="66" r="1.5" fill="currentColor" />
    <circle cx="24" cy="84" r="1.5" fill="currentColor" />
    <circle cx="24" cy="100" r="1.5" fill="currentColor" />
  </svg>
);

// Crisp, clearly defined Roadhouse Soup/Dessert Spoon SVG
export const SpoonSvg: React.FC<{ className?: string }> = ({ className = 'w-10 h-24' }) => (
  <svg
    viewBox="0 0 48 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Spoon bowl */}
    <path d="M24 10c-9 0-16 9-16 20s7 18 16 18 16-7 16-18S33 10 24 10z" fill="currentColor" fillOpacity="0.25" />
    <path d="M24 10c-9 0-16 9-16 20s7 18 16 18 16-7 16-18S33 10 24 10z" />
    {/* Spoon stem & handle */}
    <path d="M24 48v58c0 4-2 6-5 6s-5-2-5-6" />
  </svg>
);

// Crossed Fork & Knife Roadhouse Crest
export const CrossedUtensilsSvg: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Knife crossing */}
    <g transform="rotate(45 50 50)">
      <path d="M48 12c5 7 9 16 9 26h-9V12z" fill="currentColor" fillOpacity="0.2" />
      <path d="M48 12v76" />
      <line x1="45" y1="38" x2="59" y2="38" strokeWidth="3" />
    </g>
    {/* Fork crossing */}
    <g transform="rotate(-45 50 50)">
      <path d="M44 12v16M48 12v16M52 12v16M56 12v16" />
      <path d="M44 28c0 6 3 10 6 10s6-4 6-10" fill="currentColor" fillOpacity="0.2" />
      <path d="M50 38v50" />
    </g>
  </svg>
);

interface UtensilBackgroundParticlesProps {
  density?: 'sparse' | 'normal' | 'rich';
  className?: string;
}

export const UtensilBackgroundParticles: React.FC<UtensilBackgroundParticlesProps> = ({
  density = 'normal',
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
    >
      {/* =========================================================================
          HIGH DENSITY & COMPREHENSIVE VERTICAL DISTRIBUTION
          Evenly distributed across Upper, Middle, Lower, and Bottom Column Baselines
          ========================================================================= */}

      {/* --- UPPER SECTION (0% - 25%) --- */}
      {/* Top Left: Hanging Fork */}
      <div className="absolute top-[3%] left-2 sm:left-6 text-[#E5A93C] opacity-[0.14] -rotate-12 transform scale-110 sm:scale-125">
        <ForkSvg className="w-16 h-36 sm:w-20 sm:h-48" />
      </div>

      {/* Top Left Inner: Spoon */}
      <div className="absolute top-[8%] left-[18%] sm:left-[22%] text-white opacity-[0.11] rotate-45 transform scale-100 sm:scale-110">
        <SpoonSvg className="w-14 h-32 sm:w-16 sm:h-40" />
      </div>

      {/* Top Center-Right: Knife */}
      <div className="absolute top-[4%] right-3 sm:right-8 text-[#E5A93C] opacity-[0.14] rotate-20 transform scale-110 sm:scale-125">
        <KnifeSvg className="w-16 h-40 sm:w-20 sm:h-52" />
      </div>

      {/* Top Right Inner: Fork */}
      <div className="absolute top-[12%] right-[20%] sm:right-[24%] text-white opacity-[0.11] -rotate-30 transform">
        <ForkSvg className="w-14 h-32 sm:w-16 sm:h-44" />
      </div>

      {/* --- MID-UPPER SECTION (25% - 50%) --- */}
      {/* Mid-Upper Left: Knife */}
      <div className="absolute top-[26%] left-[4%] sm:left-[8%] text-[#E5A93C] opacity-[0.12] rotate-[15deg] transform scale-110">
        <KnifeSvg className="w-14 h-36 sm:w-18 sm:h-48" />
      </div>

      {/* Mid-Upper Center: Spoon */}
      <div className="absolute top-[32%] left-[34%] text-white opacity-[0.10] -rotate-[35deg] transform scale-105">
        <SpoonSvg className="w-14 h-32 sm:w-16 sm:h-42" />
      </div>

      {/* Mid-Upper Right: Fork */}
      <div className="absolute top-[28%] right-[6%] sm:right-[10%] text-white opacity-[0.12] rotate-[28deg] transform scale-110">
        <ForkSvg className="w-16 h-38 sm:w-18 sm:h-46" />
      </div>

      {/* Center Crest Watermark */}
      <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#E5A93C] opacity-[0.08] transform scale-[1.8] sm:scale-[2.4]">
        <CrossedUtensilsSvg className="w-48 h-48 sm:w-64 sm:h-64" />
      </div>

      {/* --- MID-LOWER SECTION (50% - 75%) --- */}
      {/* Mid-Lower Left (Beneath Column 1): Large Fork & Spoon Pair */}
      <div className="absolute top-[56%] left-2 sm:left-6 text-white opacity-[0.13] rotate-[22deg] transform scale-110 sm:scale-125">
        <SpoonSvg className="w-16 h-36 sm:w-20 sm:h-48" />
      </div>

      <div className="absolute top-[64%] left-[14%] sm:left-[18%] text-[#E5A93C] opacity-[0.12] -rotate-[18deg] transform scale-110">
        <KnifeSvg className="w-14 h-36 sm:w-18 sm:h-48" />
      </div>

      {/* Mid-Lower Center (Beneath Column 2): Fork & Knife */}
      <div className="absolute top-[58%] left-[45%] text-[#E5A93C] opacity-[0.12] rotate-[12deg] transform scale-110">
        <ForkSvg className="w-16 h-38 sm:w-18 sm:h-48" />
      </div>

      <div className="absolute top-[68%] left-[52%] text-white opacity-[0.10] -rotate-[24deg] transform scale-100">
        <SpoonSvg className="w-14 h-32 sm:w-16 sm:h-42" />
      </div>

      {/* Mid-Lower Right (Beneath Column 3): Fork */}
      <div className="absolute top-[54%] right-2 sm:right-6 text-[#E5A93C] opacity-[0.13] -rotate-[22deg] transform scale-110 sm:scale-125">
        <ForkSvg className="w-16 h-40 sm:w-20 sm:h-52" />
      </div>

      <div className="absolute top-[66%] right-[12%] sm:right-[16%] text-white opacity-[0.11] rotate-[35deg] transform scale-110">
        <KnifeSvg className="w-14 h-36 sm:w-18 sm:h-46" />
      </div>

      {/* --- LOWER & BOTTOM MATRIX (75% - 98%) --- */}
      {/* Targeting the negative space beneath Column 1 & 2 */}
      <div className="absolute top-[78%] left-[5%] sm:left-[10%] text-[#E5A93C] opacity-[0.14] rotate-[25deg] transform scale-120">
        <KnifeSvg className="w-16 h-42 sm:w-20 sm:h-54" />
      </div>

      <div className="absolute top-[84%] left-[22%] sm:left-[28%] text-white opacity-[0.12] -rotate-[15deg] transform scale-110">
        <ForkSvg className="w-16 h-38 sm:w-18 sm:h-48" />
      </div>

      <div className="absolute top-[80%] left-[42%] sm:left-[48%] text-[#E5A93C] opacity-[0.13] rotate-[30deg] transform scale-115">
        <SpoonSvg className="w-16 h-36 sm:w-18 sm:h-46" />
      </div>

      <div className="absolute top-[88%] left-[60%] sm:left-[66%] text-white opacity-[0.12] -rotate-[28deg] transform scale-115">
        <ForkSvg className="w-16 h-40 sm:w-20 sm:h-50" />
      </div>

      <div className="absolute top-[82%] right-[4%] sm:right-[8%] text-[#E5A93C] opacity-[0.13] rotate-[18deg] transform scale-120">
        <KnifeSvg className="w-16 h-42 sm:w-20 sm:h-54" />
      </div>

      {/* Bottom Footer Baseline Particles */}
      <div className="absolute bottom-4 sm:bottom-8 left-[12%] text-white opacity-[0.11] rotate-[10deg]">
        <SpoonSvg className="w-14 h-30 sm:w-16 sm:h-38" />
      </div>

      <div className="absolute bottom-3 sm:bottom-6 right-[24%] text-[#E5A93C] opacity-[0.12] -rotate-[20deg]">
        <ForkSvg className="w-14 h-32 sm:w-18 sm:h-42" />
      </div>

      {/* --- Extra Rich Particles for Extended Scroll --- */}
      {density === 'rich' && (
        <>
          <div className="absolute top-[18%] left-[38%] text-white opacity-[0.09] -rotate-45">
            <ForkSvg className="w-12 h-28" />
          </div>
          <div className="absolute top-[42%] left-[12%] text-[#E5A93C] opacity-[0.10] rotate-18">
            <SpoonSvg className="w-14 h-32" />
          </div>
          <div className="absolute top-[44%] right-[28%] text-white opacity-[0.09] rotate-45">
            <KnifeSvg className="w-12 h-32" />
          </div>
          <div className="absolute top-[72%] left-[36%] text-[#E5A93C] opacity-[0.11] -rotate-35">
            <CrossedUtensilsSvg className="w-20 h-20" />
          </div>
          <div className="absolute top-[92%] left-[32%] text-white opacity-[0.10] rotate-15">
            <KnifeSvg className="w-14 h-34" />
          </div>
          <div className="absolute top-[94%] right-[14%] text-[#E5A93C] opacity-[0.11] -rotate-12">
            <SpoonSvg className="w-14 h-34" />
          </div>
        </>
      )}
    </div>
  );
};
