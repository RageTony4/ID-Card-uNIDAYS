import React from 'react';
import { StudentInfo, IdCardTemplate } from '../../types';
import { ScannableBarcode } from '../ScannableBarcode';
import { ScannableQRCode } from '../ScannableQRCode';
import { SingleLineText } from '../SingleLineText';
import { parseMatchingExpiryDate } from './NewReferenceTemplates';

interface GSeriesTemplateProps {
  studentInfo: StudentInfo;
  side: 'front' | 'back';
  template: Extract<IdCardTemplate, 'g1' | 'g2' | 'g3' | 'g4'>;
  forwardedRef: React.ForwardedRef<HTMLDivElement>;
}

const toTitleCase = (str: string): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
};

const HarvardValidThruBadge: React.FC<{
  expiryFormatted: string;
  labelColorClass?: string;
  dateColorClass?: string;
  labelFontClass?: string;
  dateFontClass?: string;
}> = ({
  expiryFormatted,
  labelColorClass = 'text-neutral-600',
  dateColorClass = 'text-neutral-950',
  labelFontClass = 'font-sans',
  dateFontClass = 'font-sans'
}) => (
  <div className="flex items-center gap-1.5 flex-shrink-0">
    <div className={`flex flex-col text-[5.5px] ${labelFontClass} font-bold tracking-[0.06em] ${labelColorClass} leading-[1.05] text-right uppercase`}>
      <span>VALID</span>
      <span>THRU</span>
    </div>
    <span className={`${dateFontClass} font-bold text-[11px] ${dateColorClass} tabular-nums leading-none`}>
      {expiryFormatted}
    </span>
  </div>
);

// G1 Heraldic Shield + Torch + Open Book + 3 Stars + Laurel Wreath
const G1ShieldCrestSvg = ({ className = 'w-11 h-11' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Three Top Stars */}
    <polygon points="50,5 52,11 58,11 53,15 55,21 50,17 45,21 47,15 42,11 48,11" fill="#D9B04C" />
    <polygon points="34,11 35.6,15.5 40.5,15.5 36.5,18.5 38,23 34,20 30,23 31.5,18.5 27.5,15.5 32.4,15.5" fill="#D9B04C" />
    <polygon points="66,11 67.6,15.5 72.5,15.5 68.5,18.5 70,23 66,20 62,23 63.5,18.5 59.5,15.5 64.4,15.5" fill="#D9B04C" />
    {/* Laurel Wreath Left & Right */}
    <path d="M26 30 C16 44, 18 68, 36 86" stroke="#D9B04C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M74 30 C84 44, 82 68, 64 86" stroke="#D9B04C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <ellipse cx={21 + i * 2.5} cy={38 + i * 9} rx="4" ry="2" transform={`rotate(-35 ${21 + i * 2.5} ${38 + i * 9})`} fill="#D9B04C" />
        <ellipse cx={79 - i * 2.5} cy={38 + i * 9} rx="4" ry="2" transform={`rotate(35 ${79 - i * 2.5} ${38 + i * 9})`} fill="#D9B04C" />
      </g>
    ))}
    {/* Inner Shield */}
    <path d="M30 27 H70 V56 C70 72, 50 84, 50 84 C50 84, 30 72, 30 56 V27 Z" fill="#061E3E" stroke="#D9B04C" strokeWidth="2.8" />
    {/* Torch & Flame */}
    <path d="M50 30 C54 35, 55 41, 50 45 C45 41, 46 35, 50 30 Z" fill="#FBBF24" />
    <rect x="47" y="45" width="6" height="12" rx="1" fill="#D9B04C" />
    {/* Open Book */}
    <path d="M35 58 C41 55, 47 56, 50 59 C53 56, 59 55, 65 58 V71 C59 68, 53 69, 50 72 C47 69, 41 68, 35 71 V58 Z" fill="#FFFFFF" stroke="#D9B04C" strokeWidth="1.4" />
    <line x1="50" y1="59" x2="50" y2="72" stroke="#061E3E" strokeWidth="1.5" />
  </svg>
);

// G2 Forest Green Shield + White Oak Tree
const G2TreeShieldSvg = ({ className = 'w-8 h-9' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 92" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 8 H72 V50 C72 72, 40 86, 40 86 C40 86, 8 72, 8 50 V8 Z" fill="#0E3A2A" stroke="#0E3A2A" strokeWidth="2" />
    <path d="M12 12 H68 V49 C68 68, 40 81, 40 81 C40 81, 12 68, 12 49 V12 Z" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
    {/* Oak Tree Silhouette */}
    <path d="M37 52 L34 69 H46 L43 52 Z" fill="#FFFFFF" />
    <circle cx="40" cy="30" r="10" fill="#FFFFFF" />
    <circle cx="30" cy="39" r="9" fill="#FFFFFF" />
    <circle cx="50" cy="39" r="9" fill="#FFFFFF" />
    <circle cx="34" cy="46" r="7" fill="#FFFFFF" />
    <circle cx="46" cy="46" r="7" fill="#FFFFFF" />
    <path d="M40 24 V52 M33 38 L40 44 M47 38 L40 44" stroke="#0E3A2A" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// G3 Cyber Navy & Cyan Classical Shield Crest Paths
const G3CyberCrestPaths = () => (
  <>
    <path d="M10 10 L40 4 L70 10 V48 C70 70, 40 86, 40 86 C40 86, 10 70, 10 48 V10 Z" fill="#041938" stroke="#E2E8F0" strokeWidth="2.5" />
    <path d="M15 14 L40 9 L65 14 V46 C65 65, 40 79, 40 79 C40 79, 15 65, 15 46 V14 Z" stroke="#00D4FF" strokeWidth="1.4" fill="none" />
    {/* Star at Top */}
    <polygon points="40,14 41.5,18.5 46,18.5 42.3,21.2 43.7,25.5 40,22.8 36.3,25.5 37.7,21.2 34,18.5 38.5,18.5" fill="#FFFFFF" />
    {/* Cyan Laurels */}
    <path d="M23 36 C19 48, 24 62, 37 70" stroke="#00D4FF" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M57 36 C61 48, 56 62, 43 70" stroke="#00D4FF" strokeWidth="2.6" strokeLinecap="round" />
    {/* Classical Temple Pillars */}
    <polygon points="40,28 27,36 53,36" fill="#FFFFFF" />
    <rect x="29" y="38" width="4" height="20" fill="#FFFFFF" />
    <rect x="38" y="38" width="4" height="20" fill="#FFFFFF" />
    <rect x="47" y="38" width="4" height="20" fill="#FFFFFF" />
    <rect x="26" y="59" width="28" height="3.5" fill="#FFFFFF" />
  </>
);

const G3CyberCrestSvg = ({ className = 'w-9 h-10' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 92" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G3CyberCrestPaths />
  </svg>
);

// G4 Interlocking Orange/White/Teal Hex Cube Emblem
const G4HexLogoSvg = ({ className = 'w-8 h-9' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 88" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="40,6 70,23 70,65 40,82 10,65 10,23" stroke="#06B6D4" strokeWidth="4.5" fill="#041A33" />
    <path d="M12 24 L40 8 L58 18 L51 24 L40 17 L20 28 V58 L40 70 L50 64 L57 70 L40 79 L12 63 Z" fill="#F97316" />
    <path d="M40 24 L58 34 V56 L40 66 L26 58 V36 L34 31 V53 L40 57 L50 51 V39 L40 33 Z" fill="#FFFFFF" />
    <path d="M58 26 L67 31 V61 L44 74 L44 65 L59 56 V35 L52 31 Z" fill="#14B8A6" />
  </svg>
);

export const GSeriesTemplates: React.FC<GSeriesTemplateProps> = ({
  studentInfo,
  side,
  template,
  forwardedRef
}) => {
  const fullName = (studentInfo.studentName || 'ALEXANDER JOHNSON').trim();
  const displayId = (studentInfo.studentId || 'YSN2026-00125').trim();
  const photoUrl = studentInfo.photo || '/assets/avatars/male_1.webp';
  const cleanUniName = (studentInfo.universityName || 'YOUR SCHOOL NAME').replace(/\*$/, '').trim();
  const exp = parseMatchingExpiryDate(studentInfo.validUntil, studentInfo.issueDate, studentInfo.academicYear, 31, 4);
  const expiryFormatted = `${String(exp.monthIndex + 1).padStart(2, '0')}/${String(exp.day).padStart(2, '0')}/${exp.year}`;

  // Cohesive Back Side for G1 - G4 (with matching Harvard VALID THRU format)
  if (side === 'back') {
    const themeMap = {
      g1: { stripe: 'bg-[#061E3E]', accentText: 'text-[#061E3E]', border: 'border-[#D9B04C]' },
      g2: { stripe: 'bg-[#0E3A2A]', accentText: 'text-[#0E3A2A]', border: 'border-[#C6AC6A]' },
      g3: { stripe: 'bg-[#03122B]', accentText: 'text-[#041938]', border: 'border-[#00D4FF]' },
      g4: { stripe: 'bg-[#041A33]', accentText: 'text-[#041A33]', border: 'border-[#06B6D4]' }
    }[template];

    return (
      <div
        ref={forwardedRef}
        className="id-card-container id-card-back shadow-xl bg-[#FAFAFA] overflow-hidden relative rounded-xl border border-neutral-300 font-sans select-none animate-in fade-in duration-300 flex flex-col justify-between text-neutral-900"
      >
        <div className={`w-full h-8 ${themeMap.stripe} relative flex-shrink-0 flex items-center justify-between px-4`}>
          <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/85 truncate max-w-[200px]">
            {cleanUniName}
          </span>
          <div className="h-1.5 w-14 bg-white/20 rounded-full" />
        </div>

        <div className="px-4 py-2 flex-1 flex flex-col justify-between text-left">
          <div>
            <div className="flex items-center justify-between border-b border-neutral-200 pb-1 mb-1 gap-2">
              <div className="flex-1 min-w-0">
                <SingleLineText fontSize={9.5} className={`font-bold uppercase tracking-wider ${themeMap.accentText} text-left`}>
                  {cleanUniName}
                </SingleLineText>
              </div>
              <HarvardValidThruBadge
                expiryFormatted={expiryFormatted}
                labelColorClass="text-neutral-500"
                dateColorClass="text-neutral-900"
                labelFontClass="font-sans"
                dateFontClass="font-sans"
              />
            </div>
            <p className="text-[6.8px] text-neutral-600 leading-[1.32]">
              This card is the official property of <span className="font-semibold text-neutral-800">{cleanUniName}</span> and is non-transferable. It must be carried on campus at all times and surrendered upon request by authorized officials.
            </p>
            {studentInfo.course && (
              <SingleLineText fontSize={6.4} className="font-semibold text-neutral-700 mt-0.5 text-left">
                {`Program: ${studentInfo.course}${studentInfo.academicYear ? ` • Session: ${studentInfo.academicYear}` : ''}`}
              </SingleLineText>
            )}
          </div>

          <div className="flex items-end justify-between gap-3 my-1">
            <div className={`flex-1 bg-neutral-100 border ${themeMap.border}/40 rounded p-1.5 min-w-0`}>
              <p className="text-[6px] font-bold uppercase tracking-wider text-neutral-700">
                If found, please return to:
              </p>
              <SingleLineText fontSize={6.2} className="text-neutral-600 text-left">
                {studentInfo.address || 'Student Services & Campus Security Office'}
              </SingleLineText>
              <SingleLineText fontSize={6} className="text-neutral-500 text-left">
                {`Tel: ${studentInfo.phone || '+1 (800) 555-0199'} • ${studentInfo.website || 'www.university.edu'}`}
              </SingleLineText>
            </div>

            <div className="w-24 flex flex-col items-center flex-shrink-0">
              <div className="w-full h-6 bg-white border border-neutral-300 rounded-[2px] flex items-center justify-center px-1">
                <SingleLineText fontSize={9} className="font-serif italic text-neutral-600 text-center">
                  {toTitleCase(fullName)}
                </SingleLineText>
              </div>
              <span className="text-[5.5px] uppercase tracking-widest text-neutral-400 mt-0.5">
                Cardholder Signature
              </span>
            </div>
          </div>

          <div className="pt-1 border-t border-neutral-200 flex items-center justify-between gap-2">
            <ScannableBarcode
              value={displayId}
              className="h-4 w-36 flex-shrink-0"
              fill="#111827"
              showValue={false}
            />
            <div className="flex-1 min-w-0 text-right">
              <SingleLineText fontSize={7} className="font-mono font-bold text-neutral-700 text-right">
                {`ID: ${displayId} • ${template.toUpperCase()}`}
              </SingleLineText>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // G1 — Navy & Gold Wave Crest Banner + Harvard VALID THRU Footer
  // ==========================================================================
  if (template === 'g1') {
    return (
      <div
        ref={forwardedRef}
        className="id-card-container shadow-xl bg-[#F6F7F9] overflow-hidden relative rounded-xl border border-neutral-300 font-sans select-none animate-in fade-in duration-300 flex flex-col justify-between text-[#061E3E]"
      >
        {/* Top Navy Curved Wave Header SVG */}
        <svg
          className="absolute top-0 left-0 w-full h-[94px] pointer-events-none z-0"
          viewBox="0 0 340 94"
          preserveAspectRatio="none"
        >
          {/* Gold Wave Accent Border */}
          <path d="M0,0 H340 V48 C255,82 120,88 0,74 Z" fill="#D9B04C" />
          {/* Deep Navy Main Header */}
          <path d="M0,0 H340 V42 C255,76 120,82 0,68 Z" fill="#061E3E" />
          {/* Subtle Inner Highlight Curve */}
          <path d="M0,12 C95,4 220,26 340,14 V0 H0 Z" fill="#0B2A54" opacity="0.55" />
        </svg>

        {/* Faint Watermark Shield on Right White Body */}
        <div className="absolute right-2 bottom-9 opacity-[0.09] pointer-events-none z-0">
          <G1ShieldCrestSvg className="w-24 h-24 grayscale" />
        </div>

        {/* Top Header Content: Crest Left + School Title / Motto / Pill Right */}
        <div className="relative z-10 px-3.5 pt-2 flex items-center gap-2.5 h-[68px]">
          <div className="flex items-center gap-2 flex-shrink-0">
            <G1ShieldCrestSvg className="w-11 h-11 drop-shadow-xs" />
            <div className="w-[1.5px] h-11 bg-[#D9B04C]/85 rounded-full" />
          </div>

          <div className="flex-1 flex flex-col items-start justify-center min-w-0 text-left">
            <SingleLineText
              fontSize={cleanUniName.length > 22 ? 12 : 15}
              minFontSize={8.5}
              className="font-sans font-black text-white uppercase tracking-wide leading-none text-left"
            >
              {cleanUniName.toUpperCase()}
            </SingleLineText>
            <div
              className="mt-1.5 bg-[#D9B04C] px-2.5 py-[2px] text-[7px] font-sans font-extrabold text-[#061E3E] uppercase tracking-[0.09em] leading-none shadow-2xs"
              style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0% 100%)' }}
            >
              STUDENT IDENTIFICATION CARD
            </div>
          </div>
        </div>

        {/* Middle Row: Gold-Bordered Rounded Portrait + Name, ID & Barcode */}
        <div className="relative z-10 flex-1 px-4 flex items-center gap-3.5 min-h-0">
          {/* Portrait Photo */}
          <div className="w-[78px] h-[94px] rounded-xl bg-white p-[2.5px] border-[1.5px] border-[#D9B04C] shadow-md flex-shrink-0 translate-y-1.5">
            <div className="w-full h-full rounded-[9px] overflow-hidden bg-neutral-200 border border-neutral-300">
              <img
                src={photoUrl}
                alt={fullName}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
                onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/male_1.webp'; }}
              />
            </div>
          </div>

          {/* Student Name, ID & Barcode */}
          <div className="flex-1 flex flex-col justify-center min-w-0 text-left pt-4">
            <span className="text-[6.2px] font-bold uppercase tracking-[0.1em] text-neutral-500 leading-none">
              STUDENT NAME
            </span>
            <SingleLineText
              fontSize={13.5}
              minFontSize={9}
              className="font-sans font-black text-[#061E3E] uppercase tracking-tight leading-tight mt-0.5 text-left"
            >
              {fullName.toUpperCase()}
            </SingleLineText>

            <span className="text-[6.2px] font-bold uppercase tracking-[0.1em] text-neutral-500 leading-none mt-1.5">
              STUDENT ID
            </span>
            <SingleLineText
              fontSize={10.5}
              minFontSize={8}
              className="font-sans font-bold text-[#061E3E] tabular-nums tracking-wide leading-tight mt-0.5 text-left"
            >
              {displayId}
            </SingleLineText>

            <div className="w-[144px] mt-1">
              <ScannableBarcode
                value={displayId}
                className="h-[21px] w-full"
                fill="#0F172A"
                showValue={false}
              />
            </div>
          </div>
        </div>

        {/* Bottom Navy Bar with Harvard VALID THRU Date */}
        <div className="relative z-0 h-[33px] w-full bg-[#061E3E] flex items-center pl-[108px] pr-4 flex-shrink-0">
          <HarvardValidThruBadge
            expiryFormatted={expiryFormatted}
            labelColorClass="text-slate-300"
            dateColorClass="text-white"
            labelFontClass="font-sans"
            dateFontClass="font-sans"
          />
        </div>
      </div>
    );
  }

  // ==========================================================================
  // G2 — Ivory & Forest Green Minimalist Heritage + Harvard VALID THRU Footer
  // ==========================================================================
  if (template === 'g2') {
    const yrFull = String(exp.year > 2000 ? exp.year - 1 : 2026);
    const yrPrefix = yrFull.slice(0, 2);
    const yrSuffix = yrFull.slice(2);

    return (
      <div
        ref={forwardedRef}
        className="id-card-container shadow-xl bg-[#F8F9F7] overflow-hidden relative rounded-xl border border-neutral-300 font-serif select-none animate-in fade-in duration-300 flex flex-col justify-between text-[#0E3A2A]"
      >
        {/* Subtle Topographic Wave Lines Background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.14] z-0" viewBox="0 0 340 214" preserveAspectRatio="none">
          <path d="M120 0 C170 40, 150 95, 220 120 C270 140, 310 110, 340 130" stroke="#0E3A2A" strokeWidth="0.9" fill="none" />
          <path d="M145 0 C190 45, 175 100, 240 130 C285 150, 320 125, 340 145" stroke="#0E3A2A" strokeWidth="0.8" fill="none" />
          <path d="M170 0 C215 50, 200 105, 260 140 C300 160, 325 140, 340 160" stroke="#0E3A2A" strokeWidth="0.7" fill="none" />
        </svg>

        {/* Right Vertical Forest Green Edge Bar + Gold Accent Block */}
        <div className="absolute right-0 top-0 bottom-0 w-[16px] bg-[#0E3A2A] z-20 flex flex-col justify-end pb-[34px]">
          <div className="w-full h-[6px] bg-[#C6AC6A]" />
        </div>

        {/* Top Header: 20 [Tree Shield] 26 | School Name + Student ID Card */}
        <div className="relative z-10 px-3.5 pt-2.5 pr-7 flex items-center gap-2.5">
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="font-serif font-bold text-[8.5px] text-[#0E3A2A] tracking-tight tabular-nums">
              {yrPrefix}
            </span>
            <G2TreeShieldSvg className="w-8 h-9" />
            <span className="font-serif font-bold text-[8.5px] text-[#0E3A2A] tracking-tight tabular-nums">
              {yrSuffix}
            </span>
          </div>

          <div className="w-[1px] h-9 bg-[#0E3A2A]/60 flex-shrink-0" />

          <div className="flex-1 flex flex-col items-start justify-center min-w-0 text-left">
            <SingleLineText
              fontSize={cleanUniName.length > 22 ? 12 : 14.5}
              minFontSize={8.5}
              className="font-serif font-extrabold text-[#0E3A2A] uppercase tracking-wide leading-tight text-left"
            >
              {cleanUniName.toUpperCase()}
            </SingleLineText>
            <span className="font-sans font-semibold text-[6.8px] text-[#0E3A2A]/75 uppercase tracking-[0.16em] mt-0.5">
              STUDENT IDENTIFICATION CARD
            </span>
          </div>
        </div>

        {/* Middle Row: Rounded Green-Bordered Portrait + Name & ID */}
        <div className="relative z-10 px-4 pr-8 flex items-center gap-4 my-auto">
          <div className="w-[82px] h-[94px] rounded-xl p-[2px] border-[1.2px] border-[#0E3A2A]/80 bg-white shadow-2xs flex-shrink-0">
            <div className="w-full h-full rounded-[9px] overflow-hidden bg-neutral-200 border border-[#0E3A2A]/30">
              <img
                src={photoUrl}
                alt={fullName}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
                onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/male_2.webp'; }}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center min-w-0 text-left">
            <span className="font-sans text-[6.5px] font-bold uppercase tracking-[0.1em] text-[#0E3A2A]/75 leading-none">
              STUDENT NAME
            </span>
            <SingleLineText
              fontSize={14}
              minFontSize={9}
              className="font-serif font-extrabold text-[#0E3A2A] uppercase tracking-tight leading-tight mt-0.5 text-left"
            >
              {fullName.toUpperCase()}
            </SingleLineText>

            <span className="font-sans text-[6.5px] font-bold uppercase tracking-[0.1em] text-[#0E3A2A]/75 leading-none mt-2.5">
              STUDENT ID
            </span>
            <SingleLineText
              fontSize={11.5}
              minFontSize={8.5}
              className="font-sans font-medium text-[#0E3A2A] tabular-nums tracking-wide leading-tight mt-0.5 text-left"
            >
              {displayId}
            </SingleLineText>
          </div>
        </div>

        {/* Bottom Gold Hairline + Harvard VALID THRU Date & Handwritten Motto */}
        <div className="relative z-10 px-4 pr-8 pb-[10px]">
          <div className="w-full h-[2px] bg-[#C6AC6A] mb-[6px]" />
          <div className="h-[20px] flex items-center justify-between gap-2">
            <HarvardValidThruBadge
              expiryFormatted={expiryFormatted}
              labelColorClass="text-[#0E3A2A]/80"
              dateColorClass="text-[#0E3A2A]"
              labelFontClass="font-serif"
              dateFontClass="font-serif"
            />
            <div className="flex flex-col items-end">
              <span className="font-serif italic text-[10.5px] text-[#2B473C] leading-none tracking-tight">
                Excellence in Education
              </span>
              <svg className="w-24 h-1.5 mt-0.5 text-[#2B473C]/70" viewBox="0 0 100 8" fill="none">
                <path d="M6 6 Q52 1 94 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // G3 — Cyber Navy & Electric Cyan Security HUD + Harvard VALID THRU
  // ==========================================================================
  if (template === 'g3') {
    return (
      <div
        ref={forwardedRef}
        className="id-card-container shadow-xl bg-[#03122B] overflow-hidden relative rounded-xl border border-[#0E3A66] font-sans select-none animate-in fade-in duration-300 flex flex-col justify-between text-white"
        style={{
          background: 'radial-gradient(circle at 76% 52%, #0A3268 0%, #041738 56%, #020D22 100%)'
        }}
      >
        {/* Background Tech Circuit Traces & Glowing Padlock HUD Ring */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-85" viewBox="0 0 340 214">
          {/* Circuit Traces */}
          <g stroke="#00D4FF" strokeWidth="0.7" strokeOpacity="0.28" fill="none">
            <path d="M180 35 H235 L252 52" />
            <path d="M210 62 H238 L250 74" />
            <path d="M210 142 H242 L256 128" />
            <path d="M275 45 L300 20 H340" />
            <path d="M312 85 L340 85" />
            <path d="M308 138 L340 165" />
            <circle cx="180" cy="35" r="1.5" fill="#00D4FF" />
            <circle cx="210" cy="62" r="1.5" fill="#00D4FF" />
            <circle cx="210" cy="142" r="1.5" fill="#00D4FF" />
          </g>
          {/* Glowing HUD Concentric Rings on Right */}
          <g transform="translate(278, 108)">
            <circle cx="0" cy="0" r="44" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.28" strokeDasharray="10 4 2 4" fill="none" />
            <circle cx="0" cy="0" r="35" stroke="#0EA5E9" strokeWidth="2.2" strokeOpacity="0.45" strokeDasharray="24 8" fill="none" />
            <circle cx="0" cy="0" r="27" stroke="#00D4FF" strokeWidth="1.2" strokeOpacity="0.55" fill="#021433" fillOpacity="0.45" />
            {/* School Logo inside HUD Ring */}
            {studentInfo.logo ? (
              <image
                href={studentInfo.logo}
                x="-18"
                y="-18"
                width="36"
                height="36"
                preserveAspectRatio="xMidYMid meet"
              />
            ) : (
              <g transform="translate(-16, -18.4) scale(0.4)">
                <G3CyberCrestPaths />
              </g>
            )}
          </g>
        </svg>

        {/* Top Header: Cyber Shield Crest | School Name + Student ID Card */}
        <div className="relative z-10 px-3.5 pt-2.5 flex items-center gap-2.5">
          <G3CyberCrestSvg className="w-9 h-10 flex-shrink-0 drop-shadow-[0_0_6px_rgba(0,212,255,0.35)]" />
          <div className="w-[1.5px] h-9 bg-[#00D4FF]/65 flex-shrink-0" />
          <div className="flex-1 flex flex-col items-start justify-center min-w-0 text-left">
            <SingleLineText
              fontSize={cleanUniName.length > 22 ? 12.5 : 15.5}
              minFontSize={8.5}
              className="font-sans font-extrabold text-white uppercase tracking-wide leading-tight text-left"
            >
              {cleanUniName.toUpperCase()}
            </SingleLineText>
            <span className="font-sans font-bold text-[7px] text-[#00D4FF] uppercase tracking-[0.14em] mt-0.5">
              STUDENT IDENTIFICATION CARD
            </span>
          </div>
        </div>

        {/* Middle Row: Neon Cyan Bordered Portrait + Student Details */}
        <div className="relative z-10 px-3.5 flex items-center gap-3.5 my-auto">
          <div
            className="w-[82px] h-[98px] rounded-xl border-[1.5px] border-[#00D4FF] bg-[#0B2245] overflow-hidden flex-shrink-0"
            style={{ boxShadow: '0 0 11px rgba(0, 212, 255, 0.45)' }}
          >
            <img
              src={photoUrl}
              alt={fullName}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/female_2.webp'; }}
            />
          </div>

          <div className="flex-1 flex flex-col justify-center min-w-0 pr-14 text-left">
            <span className="text-[6px] font-bold uppercase tracking-[0.1em] text-cyan-200/75 leading-none">
              STUDENT NAME
            </span>
            <SingleLineText
              fontSize={13.5}
              minFontSize={8.5}
              className="font-sans font-black text-white uppercase tracking-tight leading-tight mt-0.5 pb-1 border-b border-[#00D4FF]/25 text-left"
            >
              {fullName.toUpperCase()}
            </SingleLineText>

            <span className="text-[6px] font-bold uppercase tracking-[0.1em] text-cyan-200/75 leading-none mt-1.5">
              STUDENT ID
            </span>
            <SingleLineText
              fontSize={10.5}
              minFontSize={8}
              className="font-sans font-bold text-white tabular-nums tracking-wide leading-tight mt-0.5 text-left"
            >
              {displayId}
            </SingleLineText>

            <div className="mt-1.5">
              <HarvardValidThruBadge
                expiryFormatted={expiryFormatted}
                labelColorClass="text-cyan-200/80"
                dateColorClass="text-white"
                labelFontClass="font-sans"
                dateFontClass="font-sans"
              />
            </div>
          </div>
        </div>

        {/* Bottom Progress Chevrons */}
        <div className="relative z-10 pb-2.5 pr-4 flex items-center gap-2.5">
          <div className="flex items-center gap-1 flex-shrink-0">
            <div
              className="h-[8px] w-[72px]"
              style={{
                background: 'linear-gradient(90deg, #0284C7 0%, #22D3EE 100%)',
                clipPath: 'polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%)'
              }}
            />
            <span className="font-sans font-black text-[10px] tracking-[-0.12em] text-[#0284C7] leading-none">
              ›››››
            </span>
          </div>

          <div className="flex-1 flex items-center min-w-0">
            <div className="w-full h-[1px] bg-[#00D4FF]/40" />
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // G4 — Navy, Teal & Tangerine Geometric + QR Code + Harvard VALID THRU
  // ==========================================================================
  return (
    <div
      ref={forwardedRef}
      className="id-card-container shadow-xl bg-[#041A33] overflow-hidden relative rounded-xl border border-[#0B3057] font-sans select-none animate-in fade-in duration-300 flex flex-col justify-between text-white"
    >
      {/* Dynamic Geometric Polygonal Accents Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 340 214" preserveAspectRatio="none">
        {/* Bottom-Left Tangerine Orange & Teal Wedges */}
        <polygon points="0,122 52,214 0,214" fill="#F97316" />
        <polygon points="28,214 78,164 114,214" fill="#0F766E" />
        {/* Top-Right Teal & Cyan Chevron Ribbon */}
        <polygon points="212,68 278,0 328,0 242,88" fill="#0F766E" />
        <polygon points="295,28 340,0 340,56" fill="#06B6D4" />
        {/* Bottom-Right Orange & Cyan Diagonal Blocks */}
        <polygon points="236,92 315,172 285,204 236,154" fill="#EA580C" />
        <polygon points="256,214 340,130 340,214" fill="#06B6D4" opacity="0.88" />
        <polygon points="232,214 278,168 308,214" fill="#0F766E" opacity="0.7" />
      </svg>

      {/* Subtle Hex Cube Watermark on Right */}
      <div className="absolute right-4 top-10 opacity-[0.06] pointer-events-none z-0">
        <G4HexLogoSvg className="w-24 h-24 grayscale" />
      </div>

      {/* Top Header: Hex Monogram + School Name & Subtitle */}
      <div className="relative z-10 px-3.5 pt-2.5 flex items-center gap-2.5">
        <G4HexLogoSvg className="w-8 h-9 flex-shrink-0" />
        <div className="flex-1 flex flex-col items-start justify-center min-w-0 text-left">
          <SingleLineText
            fontSize={cleanUniName.length > 22 ? 12.5 : 15.5}
            minFontSize={8.5}
            className="font-sans font-extrabold text-white uppercase tracking-wide leading-tight text-left"
          >
            {cleanUniName.toUpperCase()}
          </SingleLineText>
          <span className="font-sans font-bold text-[7px] text-[#14B8A6] uppercase tracking-[0.14em] mt-0.5">
            STUDENT IDENTIFICATION CARD
          </span>
        </div>
      </div>

      {/* Middle & Bottom Body: Teal-Bordered Portrait + Center Info + QR Code */}
      <div className="relative z-10 flex-1 px-3.5 pb-3 pt-1 flex items-center justify-between gap-2.5 min-h-0">
        {/* Left Portrait */}
        <div className="w-[82px] h-[98px] rounded-xl border-[1.5px] border-[#06B6D4] bg-white overflow-hidden flex-shrink-0 shadow-sm">
          <img
            src={photoUrl}
            alt={fullName}
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
            onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/female_4.webp'; }}
          />
        </div>

        {/* Center Details + Harvard VALID THRU */}
        <div className="flex-1 flex flex-col justify-center min-w-0 text-left">
          <span className="text-[6px] font-bold uppercase tracking-[0.1em] text-slate-300 leading-none">
            STUDENT NAME
          </span>
          <SingleLineText
            fontSize={13}
            minFontSize={8.5}
            className="font-sans font-black text-white uppercase tracking-tight leading-tight mt-0.5 pb-1 border-b border-[#06B6D4]/30 text-left"
          >
            {fullName.toUpperCase()}
          </SingleLineText>

          <span className="text-[6px] font-bold uppercase tracking-[0.1em] text-slate-300 leading-none mt-1.5">
            STUDENT ID
          </span>
          <SingleLineText
            fontSize={10.5}
            minFontSize={8}
            className="font-sans font-bold text-white tabular-nums tracking-wide leading-tight mt-0.5 text-left"
          >
            {displayId}
          </SingleLineText>

          <div className="mt-1.5">
            <HarvardValidThruBadge
              expiryFormatted={expiryFormatted}
              labelColorClass="text-slate-300"
              dateColorClass="text-white"
              labelFontClass="font-sans"
              dateFontClass="font-sans"
            />
          </div>
        </div>

        {/* Bottom-Right Teal Dot Matrix & Scannable QR Code */}
        <div className="flex items-end gap-2 self-end flex-shrink-0 pb-0.5">
          <div className="grid grid-cols-4 gap-[3px] opacity-80 pb-1">
            {[...Array(16)].map((_, idx) => (
              <span key={idx} className="w-[2px] h-[2px] rounded-full bg-[#14B8A6]" />
            ))}
          </div>
          <div className="bg-white p-1 rounded-[5px] shadow-md flex-shrink-0">
            <ScannableQRCode
              website={studentInfo.website}
              schoolName={cleanUniName}
              size={40}
              paddingClass="p-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
