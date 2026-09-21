import React from 'react';
import { StudentInfo } from '../../types';

interface UOfLifeTemplateProps {
  studentInfo: StudentInfo;
  side: 'front' | 'back';
  forwardedRef: React.ForwardedRef<HTMLDivElement>;
}

// Contactless Wave Arc Vector Icon
const ContactlessIcon = ({ className = "w-5 h-5 text-white" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M7 16a6 6 0 0 1 0-8" />
    <path d="M11 19a10 10 0 0 1 0-14" />
    <path d="M15 22a14 14 0 0 1 0-20" />
  </svg>
);

// High-fidelity Barcode
const UOfLifeBarcode = ({ value }: { value: string }) => {
  const bars = [
    2, 1, 1, 2, 3, 1, 1, 1, 2, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2,
    1, 1, 1, 3, 2, 2, 1, 1, 3, 1, 2, 1, 2, 2, 1, 1, 3, 2, 1, 2, 1, 1, 2, 2,
    3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 2, 2, 1, 1, 3, 1, 2, 2, 1, 2, 1, 3, 1, 1
  ];
  let curX = 0;

  return (
    <div className="flex flex-col items-center">
      <svg className="h-5 w-36" viewBox="0 0 150 20" preserveAspectRatio="none" fill="currentColor">
        {bars.map((w, idx) => {
          const x = curX;
          curX += w + 1;
          return <rect key={idx} x={x} y="0" width={w} height="20" fill="#FFFFFF" />;
        })}
      </svg>
      <span className="font-mono text-[6.5px] tracking-widest text-white/90 font-bold mt-0.5">
        {value}
      </span>
    </div>
  );
};

export const UOfLifeTemplate: React.FC<UOfLifeTemplateProps> = ({ studentInfo, side, forwardedRef }) => {
  const fullName = (studentInfo.studentName || 'ALEX ANDERSON').trim();
  const nameParts = fullName.split(' ');
  const surname = nameParts.length > 1 ? nameParts.slice(1).join(' ').toUpperCase() : fullName.toUpperCase();
  const firstNames = nameParts.length > 1 ? nameParts[0].toUpperCase() : 'ALEX';
  
  const university = (studentInfo.universityName || 'UNIVERSITY OF LIFE').trim().toUpperCase();
  const studentId = studentInfo.studentId || '100012345-12345';
  const dob = studentInfo.dob || '01-01-2005';
  const validUntil = studentInfo.validUntil || '31/08/2027';
  const issueDate = studentInfo.issueDate || '01/01/2023';

  // Extract year for the top right corner: from issueDate or academicYear or '2023'
  const yearMatch = issueDate.match(/\d{4}/) || (studentInfo.academicYear || '').match(/\d{4}/);
  const displayYear = yearMatch ? yearMatch[0] : '2023';

  // ===================== BACK SIDE =====================
  if (side === 'back') {
    return (
      <div
        ref={forwardedRef}
        className="id-card-container id-card-back shadow-xl bg-[#111827] overflow-hidden relative rounded-xl border border-neutral-300 font-sans select-none animate-in fade-in duration-300 flex flex-col justify-between text-white"
      >
        {/* Top Magnetic Stripe */}
        <div className="w-full h-8 bg-black relative flex-shrink-0 flex items-center justify-end px-4 border-b border-neutral-800">
          <div className="h-1.5 w-16 bg-white/10 rounded-full" />
        </div>

        {/* Dual Column Back Content */}
        <div className="flex-1 w-full flex flex-row relative z-10 p-2.5">
          {/* Left Side: Rules & Emergency Contact in English & Irish */}
          <div className="w-[58%] h-full flex flex-col justify-between pr-2 border-r border-white/15">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="bg-[#8B1E2D] w-1.5 h-3 rounded-[1px]" />
                <h4 className="font-sans font-black text-[8px] uppercase tracking-wider text-white">
                  STUDENT ID & TRANSIT TERMS
                </h4>
              </div>
              <div className="text-[5.6px] leading-[1.3] text-neutral-300 space-y-0.5 font-medium">
                <p>1. This card is issued by {university} for student identification, library privileges, and campus access.</p>
                <p>2. Ceadaíonn an cárta seo taisteal agus rochtain oifigiúil do mhic léinn. Ní féidir é a aistriú.</p>
                <p>3. If found, please return to: Student Desk, {studentInfo.address || `${university}, Student Desk`}.</p>
                <p className="text-amber-300 font-semibold">4. Emergency / Cabhair: {studentInfo.phone || '+353 1 496 0000'} • {studentInfo.website || `www.${university.toLowerCase().replace(/[^a-z0-9]/g, '')}.ie`}</p>
              </div>
            </div>

            {/* Signature Box */}
            <div className="mt-1 pt-1 border-t border-white/15 flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[5px] text-neutral-400 font-semibold uppercase">Cardholder Signature</span>
                <span className="font-serif italic text-[7.5px] text-white/90">{fullName}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[5px] text-neutral-400 font-semibold uppercase">Valid Until</span>
                <span className="font-mono font-bold text-[6.5px] text-emerald-400">{studentInfo.validUntil || '31/12/2025'}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Contactless Chip & Barcode */}
          <div className="w-[42%] h-full flex flex-col items-center justify-between pl-2 text-center">
            <div className="flex items-center gap-2">
              <ContactlessIcon className="w-5 h-5 text-emerald-400" />
              <div className="text-left">
                <span className="text-[6.5px] font-black uppercase text-white block">Contactless Enabled</span>
                <span className="text-[5px] text-neutral-400">Smart Campus Pass</span>
              </div>
            </div>

            {/* Barcode */}
            <div className="my-auto py-1">
              <UOfLifeBarcode value={studentId} />
            </div>

            <div className="text-[5.2px] text-neutral-400 uppercase tracking-wider font-mono">
              OFFICIAL STUDENT CREDENTIAL
            </div>
          </div>
        </div>

        {/* Bottom Microprint Border */}
        <div className="h-2 w-full bg-[#8B1E2D] flex items-center justify-center">
          <span className="text-[4.5px] tracking-[0.2em] font-mono text-white/80 uppercase">
            IRISH NATIONAL STUDENT TRANSPORT SCHEME • OLLSCOIL NA BEATHA
          </span>
        </div>
      </div>
    );
  }

  // ===================== FRONT SIDE =====================
  return (
    <div
      ref={forwardedRef}
      className="id-card-container shadow-xl bg-white overflow-hidden relative rounded-xl border border-neutral-300 font-sans select-none animate-in fade-in duration-300 !flex-row text-neutral-900"
    >
      {/* LEFT SECTION (~58% Width): Dusty Rose Background with Deep Maroon Header */}
      <div className="w-[58%] h-full flex flex-col relative bg-[#FBF1F3] border-r border-[#8B1E2D]/20 overflow-hidden">
        {/* Faint watermark texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[radial-gradient(#8B1E2D_1px,transparent_1px)] [background-size:6px_6px] z-0" />

        {/* Top Header Strip: Deep Maroon (#8B1E2D) */}
        <div className="h-[28px] w-full bg-[#8B1E2D] px-2.5 flex items-center justify-between relative z-10 flex-shrink-0 shadow-sm">
          <span className="font-sans font-black text-[10px] sm:text-[11px] tracking-[0.12em] text-white uppercase drop-shadow-sm">
            STUDENT ID CARD
          </span>
          {studentInfo.logo && (
            <img src={studentInfo.logo} alt="Logo" className="w-5 h-5 object-contain" />
          )}
        </div>

        {/* Left Information Area: Trilingual Labels */}
        <div className="flex-1 px-2.5 py-1.5 flex flex-col justify-between relative z-10 text-left">
          {/* SURNAME */}
          <div className="leading-tight">
            <span className="font-sans text-[5.2px] text-neutral-600 font-medium tracking-tight block">
              SURNAME / SLOINNE / NOM
            </span>
            <span className="font-sans font-black text-[9.5px] sm:text-[10px] text-neutral-900 uppercase tracking-tight block leading-tight">
              {surname}
            </span>
          </div>

          {/* FIRST NAME(S) */}
          <div className="leading-tight">
            <span className="font-sans text-[5.2px] text-neutral-600 font-medium tracking-tight block">
              FIRST NAME(S) / RÉAMH-AINM (NEACHA) / PRÉNOM (S)
            </span>
            <span className="font-sans font-black text-[9.5px] sm:text-[10px] text-neutral-900 uppercase tracking-tight block leading-tight">
              {firstNames}
            </span>
          </div>

          {/* VALID UNTIL / VALIDITY DATE */}
          <div className="leading-tight">
            <span className="font-sans text-[5.2px] text-neutral-600 font-medium tracking-tight block">
              VALID UNTIL / DÁTA ÉAGA / DATE D'EXPIRATION
            </span>
            <span className="font-sans font-black text-[8px] sm:text-[8.5px] text-neutral-900 tracking-tight block leading-tight">
              {validUntil}
            </span>
          </div>

          {/* PLACE OF STUDY */}
          <div className="leading-tight">
            <span className="font-sans text-[5.2px] text-neutral-600 font-medium tracking-tight block">
              PLACE OF STUDY / ÁIT STÁIDÉIR / ÉTUDIANT À
            </span>
            <span
              className="font-sans font-black text-[#8B1E2D] uppercase tracking-tight block leading-[1.15] break-words max-w-[175px]"
              style={{ fontSize: university.length > 32 ? '7.2px' : '8.5px' }}
            >
              {university}
            </span>
          </div>

          {/* NUMBER */}
          <div className="leading-tight">
            <span className="font-sans text-[5.2px] text-neutral-600 font-medium tracking-tight block">
              NUMBER / UIMHIR / NUMERO
            </span>
            <span className="font-mono font-black text-[8.5px] sm:text-[9px] text-neutral-900 tracking-wider block leading-tight">
              {studentId}
            </span>
          </div>

          {/* ISSUED ON */}
          <div className="leading-tight">
            <span className="font-sans text-[5.2px] text-neutral-600 font-medium tracking-tight block">
              ISSUED ON / DÁTA EISIÚNA / DATE DE DÉLIVRANCE
            </span>
            <span className="font-sans font-bold text-[7.5px] text-neutral-900 tracking-tight block leading-tight">
              {issueDate}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION (~42% Width): Rich Royal Gradient Blue with Glowing Headshot */}
      <div className="w-[42%] h-full flex flex-col justify-between p-2 relative bg-gradient-to-b from-[#0F1E3D] via-[#162C5B] to-[#1E3A8A] text-white overflow-hidden">
        {/* Subtle Horizontal Light Streaks */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-full h-px bg-white/40 my-3" />
          <div className="w-full h-px bg-white/30 my-5" />
          <div className="w-full h-px bg-white/40 my-6" />
        </div>

        {/* Top Right Academic Year */}
        <div className="flex justify-end items-center relative z-10">
          <span className="font-sans font-black text-[14px] sm:text-[16px] tracking-wider text-white drop-shadow-md">
            {displayYear}
          </span>
        </div>

        {/* Center Student Photo with Fluorescent Glowing Green Halo */}
        <div className="relative z-10 flex items-center justify-center my-auto">
          <div
            className="w-[74px] h-[92px] sm:w-[78px] sm:h-[96px] bg-white rounded-[4px] p-0.5 overflow-hidden transition-all"
            style={{
              border: '2px solid #22C55E',
              boxShadow: '0 0 16px rgba(34, 197, 94, 0.75), 0 0 6px rgba(34, 197, 94, 0.9)'
            }}
          >
            <img
              src={studentInfo.photo || '/assets/avatars/male_1.webp'}
              alt={fullName}
              className="w-full h-full object-cover object-top rounded-[2px]"
              referrerPolicy="no-referrer"
              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/male_1.webp'; }}
            />
          </div>
        </div>

        {/* Bottom Right: Contactless Symbol & Text */}
        <div className="flex items-center justify-end gap-1.5 relative z-10">
          <ContactlessIcon className="w-4 h-4 text-white" />
          <span className="font-sans font-bold text-[8.5px] sm:text-[9px] text-white tracking-wide">
            Contactless
          </span>
        </div>
      </div>
    </div>
  );
};
