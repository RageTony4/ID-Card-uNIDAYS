import React from 'react';
import { StudentInfo } from '../../types';
import { ScannableBarcode } from '../ScannableBarcode';

interface EastbridgeTemplateProps {
  studentInfo: StudentInfo;
  side: 'front' | 'back';
  forwardedRef: React.ForwardedRef<HTMLDivElement>;
}

// Format date into "DD MMM YYYY" (e.g. "31 DEC 2029")
const formatDisplayDate = (rawDate: string): string => {
  if (!rawDate) return '31 DEC 2029';
  const trimmed = rawDate.trim();
  // If already formatted like "31 DEC 2029" or "31 Dec 2029", normalize uppercase
  if (/^\d{1,2}\s+[A-Za-z]{3,}\s+\d{4}$/.test(trimmed)) {
    return trimmed.toUpperCase();
  }
  // Try DD/MM/YYYY or DD-MM-YYYY or YYYY-MM-DD
  const parts = trimmed.split(/[-/]/);
  if (parts.length === 3) {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    let day = parts[0];
    let month = parts[1];
    let year = parts[2];
    if (parts[0].length === 4) {
      // YYYY-MM-DD
      year = parts[0];
      month = parts[1];
      day = parts[2];
    }
    const mNum = parseInt(month, 10);
    if (!isNaN(mNum) && mNum >= 1 && mNum <= 12) {
      const dNum = parseInt(day, 10);
      const dStr = isNaN(dNum) ? day : String(dNum).padStart(2, '0');
      return `${dStr} ${months[mNum - 1]} ${year}`;
    }
  }
  return trimmed.toUpperCase();
};

// Format student number with space separation if digits (e.g. "2026 0148")
const formatStudentNumber = (rawId: string): string => {
  if (!rawId) return '2026 0148';
  const trimmed = rawId.trim();
  if (trimmed.includes(' ')) return trimmed;
  // If 8 digits, split into 4 4: e.g. 20260148 -> 2026 0148
  if (/^\d{8}$/.test(trimmed)) {
    return `${trimmed.slice(0, 4)} ${trimmed.slice(4)}`;
  }
  return trimmed;
};

// Vector SVG Crest for Eastbridge University (Shield, Laurel, Ribbon)
const EastbridgeCrestSvg = ({ className = "w-16 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Laurel Wreath Left */}
    <path d="M 38 72 C 26 62 24 40 32 24 C 36 28 34 38 40 44 C 34 50 36 62 42 70 Z" fill="#D4AF37" opacity="0.9" />
    <path d="M 28 48 C 22 40 24 28 32 20 C 32 26 30 36 34 42 Z" fill="#C5A059" />
    
    {/* Laurel Wreath Right */}
    <path d="M 102 72 C 114 62 116 40 108 24 C 104 28 106 38 100 44 C 106 50 104 62 98 70 Z" fill="#D4AF37" opacity="0.9" />
    <path d="M 112 48 C 118 40 116 28 108 20 C 108 26 110 36 106 42 Z" fill="#C5A059" />

    {/* Central Shield Outer */}
    <path d="M 44 20 L 96 20 C 96 20 98 56 70 78 C 42 56 44 20 44 20 Z" fill="#1C212B" stroke="#E2C582" strokeWidth="2.5" strokeLinejoin="round" />
    {/* Inner Shield Inset */}
    <path d="M 48 24 L 92 24 C 92 24 94 53 70 72 C 46 53 48 24 48 24 Z" fill="#242B38" stroke="#D4AF37" strokeWidth="1" />

    {/* Shield Emblems: Open Book at top */}
    <path d="M 58 35 C 64 33 68 34 70 36 C 72 34 76 33 82 35 L 82 46 C 76 44 72 45 70 47 C 68 45 64 44 58 46 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
    <line x1="70" y1="36" x2="70" y2="47" stroke="#64748B" strokeWidth="1" />

    {/* Shield Emblems: Heraldic Bridge / Chevron below book */}
    <path d="M 54 58 Q 70 50 86 58 L 82 64 Q 70 56 58 64 Z" fill="#E2C582" opacity="0.95" />
    <circle cx="70" cy="53" r="2" fill="#FFFFFF" />

    {/* Bottom Banner Ribbon */}
    <path d="M 28 80 L 46 74 L 94 74 L 112 80 L 102 88 L 92 84 L 48 84 L 38 88 Z" fill="#C5A059" stroke="#E2C582" strokeWidth="1" />
    <text x="70" y="81" textAnchor="middle" fill="#0F172A" fontSize="5.5" fontWeight="900" fontFamily="serif" letterSpacing="0.08em">
      SCIENTIA COMMUNITAS
    </text>
  </svg>
);

export const EastbridgeTemplate: React.FC<EastbridgeTemplateProps> = ({ studentInfo, side, forwardedRef }) => {
  const university = (studentInfo.universityName || 'EASTBRIDGE UNIVERSITY').trim().toUpperCase();
  const fullName = (studentInfo.studentName || 'MAYA N. OKELLO').trim().toUpperCase();
  const rawId = studentInfo.studentId || '2026 0148';
  const formattedId = formatStudentNumber(rawId);
  const validUntilFormatted = formatDisplayDate(studentInfo.validUntil || '31 DEC 2029');
  const course = studentInfo.course || 'Bachelor of Arts';
  const website = studentInfo.website || 'www.eastbridge.edu';

  // Split university into main name and secondary suffix
  // e.g. "EASTBRIDGE UNIVERSITY" -> "EASTBRIDGE" + "UNIVERSITY"
  let mainUniTitle = 'EASTBRIDGE';
  let subUniTitle = 'UNIVERSITY';
  if (university.includes('UNIVERSITY')) {
    mainUniTitle = university.replace('UNIVERSITY', '').trim() || 'EASTBRIDGE';
    subUniTitle = 'UNIVERSITY';
  } else if (university.includes('COLLEGE')) {
    mainUniTitle = university.replace('COLLEGE', '').trim() || 'EASTBRIDGE';
    subUniTitle = 'COLLEGE';
  } else if (university.includes(' ')) {
    const parts = university.split(' ');
    mainUniTitle = parts.slice(0, -1).join(' ');
    subUniTitle = parts[parts.length - 1];
  } else {
    mainUniTitle = university;
    subUniTitle = 'UNIVERSITY';
  }

  // ===================== BACK SIDE =====================
  if (side === 'back') {
    return (
      <div
        ref={forwardedRef}
        className="id-card-container id-card-back shadow-2xl bg-[#E7EAEF] overflow-hidden relative rounded-xl border border-slate-400/80 font-sans select-none animate-in fade-in duration-300 flex flex-col justify-between text-neutral-900"
      >
        {/* Subtle Watermark Guilloche */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
          <EastbridgeCrestSvg className="w-80 h-60" />
        </div>

        {/* Top Magnetic Stripe */}
        <div className="w-full h-8 bg-[#0F141C] relative flex-shrink-0 flex items-center justify-end px-4 z-10 border-b border-black">
          <div className="h-1.5 w-16 bg-white/10 rounded-full" />
        </div>

        {/* Card Content */}
        <div className="flex-1 w-full px-4 py-2.5 flex flex-col justify-between relative z-10 text-left">
          {/* Terms & Return Notice */}
          <div className="space-y-1">
            <p className="text-[6.5px] leading-tight text-slate-600 font-medium tracking-normal">
              This card is the property of <strong className="text-slate-900 font-bold">{university}</strong> and must be presented upon request. Non-transferable.
            </p>
            <p className="text-[6px] leading-tight text-slate-500">
              If found, please drop in any mail box or return to: <strong>Office of the University Registrar</strong>.
            </p>
          </div>

          {/* Signature and Details Grid */}
          <div className="flex items-center justify-between gap-3 my-1">
            <div className="flex-1">
              <span className="text-[6px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">
                Authorized Signature
              </span>
              <div className="h-6 w-full border-b border-slate-400 flex items-end pb-0.5 bg-white/40 px-2 rounded-t-[2px]">
                <span className="font-serif italic text-[11px] text-slate-700 tracking-wider">
                  M. Okello
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[6px] font-bold text-slate-500 uppercase tracking-widest block">
                Emergency Support
              </span>
              <span className="text-[7.5px] font-mono font-bold text-slate-800">
                {studentInfo.emergencyContact || '+1 (555) 019-2831'}
              </span>
            </div>
          </div>

          {/* High-precision Scannable Code128 Barcode */}
          <div className="w-full flex flex-col items-center justify-center pt-1 border-t border-slate-300">
            <ScannableBarcode
              value={rawId.replace(/\s+/g, '')}
              className="h-6 w-52"
              fill="#111827"
              showValue={true}
              valueClassName="font-mono text-[7px] tracking-widest text-slate-800 font-bold mt-0.5 text-center w-full"
            />
          </div>
        </div>

        {/* Footer info line */}
        <div className="w-full bg-[#181B22] text-white px-4 py-1 flex items-center justify-between text-[6.5px] tracking-wider font-medium z-10 border-t border-slate-700">
          <span className="text-slate-300">{university}</span>
          <span className="text-slate-400">{website}</span>
        </div>
      </div>
    );
  }

  // ===================== FRONT SIDE =====================
  return (
    <div
      ref={forwardedRef}
      className="id-card-container shadow-2xl bg-[#E6E9EE] overflow-hidden relative rounded-xl border border-slate-300 font-sans select-none animate-in fade-in duration-300 !flex-col text-neutral-900"
      style={{
        boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08)'
      }}
    >
      {/* Subtle Top Gloss / Specular Sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/25 pointer-events-none z-30" />

      {/* ================= HEADER BAR ================= */}
      <div 
        className="w-full px-3.5 py-2.5 flex items-center gap-3 relative z-20 border-b border-[#353B47] flex-shrink-0"
        style={{
          background: 'linear-gradient(180deg, #242831 0%, #1A1D24 100%)'
        }}
      >
        {/* Crest Logo */}
        <div className="flex-shrink-0 flex items-center justify-center">
          {studentInfo.logo ? (
            <img 
              src={studentInfo.logo} 
              alt="University Crest" 
              className="h-11 w-auto max-w-[65px] object-contain drop-shadow"
              onError={(e) => {
                // Fallback to transparent crest or SVG
                (e.target as HTMLImageElement).src = '/assets/eastbridge_crest_transparent.png';
              }}
            />
          ) : (
            <img 
              src="/assets/eastbridge_crest_transparent.png" 
              alt="Eastbridge Crest" 
              className="h-11 w-auto max-w-[65px] object-contain drop-shadow"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          )}
        </div>

        {/* University Name Block matching the reference layout */}
        <div className="flex flex-col justify-center text-left leading-none">
          <h1 
            className="font-serif font-black tracking-[0.14em] text-white uppercase leading-none drop-shadow-sm"
            style={{
              fontSize: mainUniTitle.length > 14 ? '15px' : '18.5px',
              fontFamily: '"Cinzel", "Times New Roman", "Playfair Display", Georgia, serif'
            }}
          >
            {mainUniTitle}
          </h1>
          <span 
            className="font-serif font-semibold text-[8px] sm:text-[9px] tracking-[0.32em] text-[#CBD5E1] uppercase leading-tight mt-1 block"
            style={{
              fontFamily: '"Cinzel", "Times New Roman", Georgia, serif'
            }}
          >
            {subUniTitle}
          </span>
        </div>
      </div>

      {/* ================= MAIN BODY ================= */}
      <div 
        className="flex-1 w-full flex flex-row items-center justify-between px-3.5 py-2 relative z-20 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #E7EAEF 0%, #DFE3E9 50%, #ECEFF4 100%)'
        }}
      >
        {/* Very faint background seal watermark */}
        <div className="absolute right-24 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.05]">
          <EastbridgeCrestSvg className="w-56 h-40" />
        </div>

        {/* Left Information Block */}
        <div className="flex-1 flex flex-col justify-between h-full pr-2 text-left z-10">
          {/* Top Tag: STUDENT IDENTIFICATION */}
          <div>
            <span className="font-sans font-bold text-[7.5px] sm:text-[8px] tracking-[0.24em] text-[#475569] uppercase block leading-none">
              STUDENT IDENTIFICATION
            </span>
          </div>

          {/* Student Full Name */}
          <div className="my-auto py-1">
            <h2 
              className="font-sans font-black uppercase text-[#0F172A] tracking-tight leading-[1.15] break-words"
              style={{
                fontSize: fullName.length > 25 ? '13px' : fullName.length > 18 ? '14.5px' : '17px',
                maxWidth: '190px'
              }}
            >
              {fullName}
            </h2>
          </div>

          {/* Student Number & Valid Until Fields */}
          <div className="space-y-1.5">
            {/* Student Number */}
            <div className="leading-tight">
              <span className="font-sans font-bold text-[6.5px] sm:text-[7px] tracking-[0.14em] text-[#64748B] uppercase block">
                STUDENT NUMBER
              </span>
              <span className="font-mono font-bold text-[12px] sm:text-[13px] tracking-wider text-[#0F172A] leading-tight block">
                {formattedId}
              </span>
            </div>

            {/* Valid Until */}
            <div className="leading-tight">
              <span className="font-sans font-bold text-[6.5px] sm:text-[7px] tracking-[0.14em] text-[#64748B] uppercase block">
                VALID UNTIL
              </span>
              <span className="font-sans font-bold text-[11.5px] sm:text-[12.5px] tracking-wide text-[#0F172A] leading-tight block">
                {validUntilFormatted}
              </span>
            </div>
          </div>
        </div>

        {/* Right Student Photo Box matching reference proportions */}
        <div className="w-[84px] sm:w-[88px] h-[106px] sm:h-[112px] rounded-[3px] p-0.5 bg-white/70 border border-slate-300/80 shadow-md relative overflow-hidden flex-shrink-0 z-10">
          <img
            src={studentInfo.photo || '/assets/avatars/female_1.webp'}
            alt={fullName}
            className="w-full h-full object-cover object-top rounded-[2px]"
            referrerPolicy="no-referrer"
            onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/female_1.webp'; }}
          />
        </div>
      </div>

      {/* ================= FOOTER BAR ================= */}
      <div 
        className="w-full px-3.5 py-1.5 flex items-center justify-between relative z-20 flex-shrink-0 border-t border-[#2D333F]"
        style={{
          background: 'linear-gradient(180deg, #1C1F26 0%, #14161C 100%)'
        }}
      >
        {/* Left: STUDENT ID Label */}
        <div className="flex items-center gap-1.5">
          <span className="font-sans font-black text-[8.5px] tracking-[0.24em] text-white uppercase leading-none">
            STUDENT ID
          </span>
        </div>

        {/* Right: Golden Metallic Accent Rule & Security Line */}
        <div className="flex items-center gap-2">
          <div className="h-[2px] w-36 sm:w-44 bg-gradient-to-r from-transparent via-[#E2C582] to-[#B38F4D] rounded-full opacity-90 shadow-[0_0_4px_rgba(226,197,130,0.4)]" />
          <div className="flex gap-0.5 opacity-60">
            <span className="w-1 h-1 rounded-full bg-[#E2C582]" />
            <span className="w-1 h-1 rounded-full bg-[#E2C582]" />
            <span className="w-1 h-1 rounded-full bg-[#E2C582]" />
          </div>
        </div>
      </div>
    </div>
  );
};
