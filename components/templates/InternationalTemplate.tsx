import React from 'react';
import { StudentInfo } from '../../types';

interface InternationalTemplateProps {
  studentInfo: StudentInfo;
  side: 'front' | 'back';
  forwardedRef: React.ForwardedRef<HTMLDivElement>;
}

// Ice Blue Guilloche Security Line Pattern
const IntlGuillochePattern = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-multiply" viewBox="0 0 320 180" preserveAspectRatio="none" fill="none">
    <g stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.6">
      <path d="M 0,25 Q 80,5 160,28 T 320,22" />
      <path d="M 0,45 Q 90,20 180,48 T 320,42" />
      <path d="M 0,65 Q 100,35 200,68 T 320,62" />
      <path d="M 0,85 Q 80,60 160,88 T 320,82" />
      <path d="M 0,105 Q 90,80 180,108 T 320,102" />
      <path d="M 0,125 Q 100,95 200,128 T 320,122" />
      <path d="M 0,145 Q 80,120 160,148 T 320,142" />
      <path d="M 0,165 Q 90,140 180,168 T 320,162" />
      <ellipse cx="230" cy="90" rx="80" ry="45" stroke="#0284C7" strokeWidth="0.4" strokeDasharray="2 1.5" />
      <ellipse cx="230" cy="90" rx="110" ry="60" stroke="#0284C7" strokeWidth="0.4" strokeDasharray="3 2" />
    </g>
  </svg>
);

// High-precision Barcode
const IntlBarcode = ({ value }: { value: string }) => {
  const bars = [
    2, 1, 1, 2, 3, 1, 1, 1, 2, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2,
    1, 1, 1, 3, 2, 2, 1, 1, 3, 1, 2, 1, 2, 2, 1, 1, 3, 2, 1, 2, 1, 1, 2, 2,
    3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 2, 2, 1, 1, 3, 1, 2, 2, 1, 2, 1, 3, 1, 1
  ];
  let curX = 0;

  return (
    <div className="flex flex-col items-center">
      <svg className="h-5 w-40" viewBox="0 0 160 20" preserveAspectRatio="none" fill="currentColor">
        {bars.map((w, idx) => {
          const x = curX;
          curX += w + 1;
          return <rect key={idx} x={x} y="0" width={w} height="20" fill="#1E3A8A" />;
        })}
      </svg>
      <span className="font-mono text-[7px] tracking-widest text-[#1E3A8A] font-bold mt-0.5">
        {value}
      </span>
    </div>
  );
};

// Full-width Horizontal Barcode Line matching uploaded image
const IntlBottomBarcodeLine = ({ className = "w-full h-3.5" }: { className?: string }) => {
  const barPattern = [
    3, 1, 1, 2, 1, 1, 3, 2, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 2,
    2, 1, 1, 3, 1, 2, 2, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 2, 1, 3, 2, 1,
    2, 2, 1, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 1, 2, 3, 1, 2, 1, 1, 1,
    2, 2, 3, 1, 1, 1, 3, 2, 1, 2, 1, 1, 2, 3, 1, 2, 2, 1, 1, 3, 1, 1, 2, 2,
    3, 1, 2, 1, 1, 2, 2, 1, 1, 3, 2, 1, 1, 2, 2, 2, 1, 3, 1, 2, 1, 1, 3, 2,
    1, 1, 2, 3, 1, 2, 1, 1, 1, 3, 2, 2, 1, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1, 3
  ];

  let cur = 2;
  const bars: { x: number; w: number }[] = [];
  barPattern.forEach((w, idx) => {
    bars.push({ x: cur, w });
    cur += w + (idx % 2 === 0 ? 1.4 : 1.2);
  });
  const totalWidth = cur + 2;

  return (
    <svg className={className} viewBox={`0 0 ${totalWidth} 18`} preserveAspectRatio="none" fill="currentColor">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y="0" width={b.w} height="18" fill="#142B60" />
      ))}
    </svg>
  );
};

export const InternationalTemplate: React.FC<InternationalTemplateProps> = ({ studentInfo, side, forwardedRef }) => {
  const university = (studentInfo.universityName || 'INTERNATIONAL UNIVERSITY').trim().toUpperCase();
  const fullName = (studentInfo.studentName || 'JOHN DOE').trim().toUpperCase();
  const dob = studentInfo.dob || '08/03/2000';
  const rawId = studentInfo.studentId || '0123456789';
  const validUntil = studentInfo.validUntil || '30/09/2027';

  // Format ID with spaced digit triplets: e.g. "012 345 678 9"
  const digitsOnly = rawId.replace(/\D/g, '');
  const formattedId = digitsOnly.length >= 10
    ? `${digitsOnly.slice(0, 3)} ${digitsOnly.slice(3, 6)} ${digitsOnly.slice(6, 9)} ${digitsOnly.slice(9, 10)}`
    : rawId.includes(' ') ? rawId : '012 345 678 9';

  // ===================== BACK SIDE =====================
  if (side === 'back') {
    return (
      <div
        ref={forwardedRef}
        className="id-card-container id-card-back shadow-xl bg-[#E0F2FE] overflow-hidden relative rounded-xl border border-neutral-300 font-sans select-none animate-in fade-in duration-300 flex flex-col justify-between text-neutral-900"
      >
        {/* Subtle Guilloche pattern */}
        <IntlGuillochePattern />

        {/* Magnetic Stripe */}
        <div className="w-full h-8 bg-[#0F172A] relative flex-shrink-0 flex items-center justify-end px-4 z-10">
          <div className="h-1.5 w-16 bg-white/15 rounded-full" />
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full p-3 flex flex-col justify-between relative z-10 text-left">
          <div className="flex justify-between items-start gap-3">
            {/* Left Instructions */}
            <div className="flex-1 text-[6.2px] leading-[1.3] text-[#1E3A8A] space-y-1">
              <p className="font-bold uppercase tracking-wider text-[7px] text-[#0F172A]">
                Official Student Identity Card
              </p>
              <p>• This credential confirms the holder is a registered student of {university}.</p>
              <p>• Valid for university library privileges, student travel discounts, and facility entry.</p>
              <p>• If found, return to: {studentInfo.address || `${university}, Registrar Office`}.</p>
              <p className="font-semibold text-sky-900">
                Contact: {studentInfo.phone || '+49 30 12345678'} • {studentInfo.website || `www.${university.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu`}
              </p>
            </div>

            {/* Signature Box */}
            <div className="w-24 flex flex-col items-center flex-shrink-0">
              <div className="w-full h-7 bg-white border border-[#38BDF8] rounded-[2px] flex items-center justify-center relative overflow-hidden shadow-inner">
                <span className="font-serif italic text-[7.5px] text-neutral-400 select-none">
                  Holder's Signature
                </span>
              </div>
              <span className="text-[5.5px] font-bold text-[#0F172A] uppercase tracking-wider mt-0.5">
                Authorized Signature
              </span>
            </div>
          </div>

          {/* Barcode & Expiry Footer */}
          <div className="flex justify-between items-end pt-1 border-t border-[#BAE6FD]">
            <IntlBarcode value={formattedId} />
            <div className="text-right">
              <span className="text-[5.5px] font-bold text-sky-800 uppercase block">Valid Until</span>
              <span className="font-mono font-black text-[8px] text-[#0F172A]">
                {validUntil}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===================== FRONT SIDE =====================
  return (
    <div
      ref={forwardedRef}
      className="id-card-container shadow-xl bg-[#CCEdf8] overflow-hidden relative rounded-xl border border-neutral-300 font-sans select-none animate-in fade-in duration-300 !flex-col text-neutral-900"
      style={{
        background: 'linear-gradient(135deg, #CCEdf8 0%, #D8F0FA 50%, #C4EBF7 100%)'
      }}
    >
      {/* Intricate Guilloche Security Lines */}
      <IntlGuillochePattern />

      {/* Surface Sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/40 pointer-events-none z-10" />

      {/* Top Header Strip - Centered STUDENT and IDENTITY CARD Titles */}
      <div className="pt-2 px-3 pb-1 border-b border-[#93C5FD]/60 relative z-20">
        <div className="flex items-center justify-center relative w-full">
          {studentInfo.logo && (
            <img src={studentInfo.logo} alt="Logo" className="w-5 h-5 object-contain absolute left-0" />
          )}
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="font-sans font-black text-[13px] sm:text-[14px] tracking-[0.16em] text-[#1E3A8A] uppercase leading-none text-center">
              STUDENT
            </h1>
            <span className="font-sans font-bold text-[7px] sm:text-[7.5px] tracking-[0.22em] text-[#3B82F6] uppercase leading-tight mt-0.5 text-center">
              IDENTITY CARD
            </span>
          </div>
        </div>
      </div>

      {/* Main Body: Left Information + Right Photo */}
      <div className="flex-1 w-full flex flex-row items-center justify-between px-3 py-1.5 relative z-20 overflow-hidden">
        {/* Left Information Block */}
        <div className="flex-1 flex flex-col justify-around h-full pr-2 text-left">
          {/* Studies at */}
          <div className="leading-tight">
            <span
              className="font-sans text-[#475569] font-medium tracking-wide block"
              style={{ fontSize: '10.5px' }}
            >
              Studies at
            </span>
            <span
              className="font-sans font-black text-[#1E3A8A] uppercase tracking-tight block leading-[1.2] break-words"
              style={{
                fontSize: university.length > 34 ? '10px' : university.length > 25 ? '11.5px' : '13px',
                maxWidth: '190px'
              }}
            >
              {university}
            </span>
          </div>

          {/* Name */}
          <div className="leading-tight mt-0.5">
            <span
              className="font-sans text-[#475569] font-medium tracking-wide block"
              style={{ fontSize: '11.5px' }}
            >
              Name
            </span>
            <span
              className="font-sans font-black text-[#0F172A] uppercase tracking-tight block leading-[1.2] break-words"
              style={{
                fontSize: fullName.length > 24 ? '11px' : '13px',
                maxWidth: '190px'
              }}
            >
              {fullName}
            </span>
          </div>

          {/* Validity Date (Replaced Date of Birth) */}
          <div className="leading-tight mt-0.5">
            <span
              className="font-sans text-[#475569] font-medium tracking-wide block"
              style={{ fontSize: '10.5px' }}
            >
              Valid until
            </span>
            <span
              className="font-sans font-black text-[#0F172A] tracking-tight block leading-tight"
              style={{ fontSize: '13px' }}
            >
              {validUntil}
            </span>
          </div>
        </div>

        {/* Right Student Photo Box */}
        <div className="w-[80px] h-[94px] bg-white rounded-[3px] p-0.5 border border-white shadow-md relative overflow-hidden flex-shrink-0">
          <img
            src={studentInfo.photo || '/assets/avatars/male_1.webp'}
            alt={fullName}
            className="w-full h-full object-cover object-top rounded-[2px]"
            referrerPolicy="no-referrer"
            onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/male_1.webp'; }}
          />
        </div>
      </div>

      {/* Bottom Footer: ID Number & Barcode Line matching uploaded image */}
      <div className="px-3 pb-1.5 pt-0.5 w-full flex flex-col relative z-20 flex-shrink-0">
        <div className="w-full flex justify-end items-center mb-0.5">
          <span className="font-mono font-black text-[10px] sm:text-[11px] tracking-[0.2em] text-[#1E3A8A] leading-tight">
            {formattedId}
          </span>
        </div>
        <div className="w-full h-3.5 sm:h-4 flex items-center justify-center overflow-hidden">
          <IntlBottomBarcodeLine className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};
