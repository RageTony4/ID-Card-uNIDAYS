import React from 'react';
import { StudentInfo } from '../../types';

interface SainikTemplateProps {
  studentInfo: StudentInfo;
  side: 'front' | 'back';
  forwardedRef: React.ForwardedRef<HTMLDivElement>;
}

// Crisp Vector Barcode
const SainikBarcode = ({ value }: { value: string }) => {
  const bars = [
    2, 1, 1, 2, 3, 1, 1, 1, 2, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2,
    1, 1, 1, 3, 2, 2, 1, 1, 3, 1, 2, 1, 2, 2, 1, 1, 3, 2, 1, 2, 1, 1, 2, 2,
    3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 2, 2, 1, 1, 3, 1, 2, 2, 1, 2, 1, 3, 1, 1,
    2, 3, 1, 2, 1, 1, 2, 1, 3, 2, 1, 2, 2, 1, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1
  ];
  let curX = 0;

  return (
    <div className="flex flex-col items-start">
      <svg className="h-4 w-36" viewBox="0 0 170 20" preserveAspectRatio="none" fill="currentColor">
        {bars.map((w, idx) => {
          const x = curX;
          curX += w + 1;
          return <rect key={idx} x={x} y="0" width={w} height="20" fill="#000000" />;
        })}
      </svg>
      <span className="font-mono text-[6px] tracking-widest text-black font-semibold mt-0.5">
        {value}
      </span>
    </div>
  );
};

// Indian Ashoka Lion Capital Vector Emblem
const AshokaLionEmblem = ({ className = "w-9 h-9" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Golden Gradient Definition */}
    <defs>
      <linearGradient id="ashokaGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="50%" stopColor="#FFC107" />
        <stop offset="100%" stopColor="#FFA000" />
      </linearGradient>
    </defs>
    {/* 3 Lions Stylized */}
    <g fill="url(#ashokaGold)" stroke="#B78103" strokeWidth="0.8">
      {/* Central Lion Head & Mane */}
      <circle cx="50" cy="22" r="14" />
      <path d="M 42,12 C 45,6 55,6 58,12 C 65,14 65,26 58,32 C 54,34 46,34 42,32 C 35,26 35,14 42,12 Z" />
      {/* Left Lion Head */}
      <circle cx="28" cy="26" r="11" />
      <path d="M 20,18 C 24,12 32,14 34,20 C 37,27 33,35 26,35 C 20,33 18,25 20,18 Z" />
      {/* Right Lion Head */}
      <circle cx="72" cy="26" r="11" />
      <path d="M 80,18 C 76,12 68,14 66,20 C 63,27 67,35 74,35 C 80,33 82,25 80,18 Z" />
      {/* Central Body & Pillar Base */}
      <path d="M 32,36 L 68,36 L 62,72 L 38,72 Z" />
      {/* Paws */}
      <ellipse cx="40" cy="74" rx="7" ry="4" />
      <ellipse cx="60" cy="74" rx="7" ry="4" />
      <ellipse cx="28" cy="73" rx="5" ry="3" />
      <ellipse cx="72" cy="73" rx="5" ry="3" />
    </g>
    {/* Abacus Base Platform with Ashoka Chakra */}
    <rect x="18" y="78" width="64" height="12" rx="2" fill="url(#ashokaGold)" stroke="#B78103" strokeWidth="0.8" />
    {/* Center Wheel / Chakra */}
    <circle cx="50" cy="84" r="5" fill="#FFFFFF" stroke="#0D47A1" strokeWidth="0.8" />
    <circle cx="50" cy="84" r="1.2" fill="#0D47A1" />
    {/* Galloping Horse on Left & Bull on Right */}
    <ellipse cx="32" cy="84" rx="4" ry="2.5" fill="#B78103" />
    <ellipse cx="68" cy="84" rx="4" ry="2.5" fill="#B78103" />
    {/* Lotus Base */}
    <path d="M 22,90 C 30,98 70,98 78,90 L 75,98 C 65,102 35,102 25,98 Z" fill="url(#ashokaGold)" stroke="#B78103" strokeWidth="0.8" />
    {/* Satyameva Jayate Banner Text */}
    <text x="50" y="110" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">
      सत्यमेव जयते
    </text>
  </svg>
);

// Sainik School Crest Logo
const SainikCrestLogo = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#CA8A04" />
      </linearGradient>
    </defs>
    {/* Outer Shield */}
    <path d="M 50,4 C 78,4 88,14 88,36 C 88,68 50,96 50,96 C 50,96 12,68 12,36 C 12,14 22,4 50,4 Z" fill="#0B2545" stroke="url(#crestGold)" strokeWidth="3" />
    {/* Inner Shield Accent */}
    <path d="M 50,10 C 72,10 80,18 80,36 C 80,62 50,86 50,86 C 50,86 20,62 20,36 C 20,18 28,10 50,10 Z" fill="#133E6B" />
    {/* Crossed Spears */}
    <line x1="28" y1="72" x2="72" y2="22" stroke="url(#crestGold)" strokeWidth="2.5" strokeLinecap="round" />
    <polygon points="72,22 76,20 74,26" fill="url(#crestGold)" />
    <line x1="72" y1="72" x2="28" y2="22" stroke="url(#crestGold)" strokeWidth="2.5" strokeLinecap="round" />
    <polygon points="28,22 24,20 26,26" fill="url(#crestGold)" />
    {/* Central Sword */}
    <line x1="50" y1="18" x2="50" y2="68" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
    <polygon points="50,14 47,20 53,20" fill="#FFFFFF" />
    <line x1="42" y1="62" x2="58" y2="62" stroke="url(#crestGold)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="50" cy="70" r="2" fill="url(#crestGold)" />
    {/* Ashoka Chakra at top */}
    <circle cx="50" cy="24" r="5" fill="#FFFFFF" stroke="#0B2545" strokeWidth="1" />
    <circle cx="50" cy="24" r="1.5" fill="#0B2545" />
    {/* Bottom Scroll Ribbon */}
    <path d="M 24,80 Q 50,86 76,80 L 80,87 Q 50,93 20,87 Z" fill="url(#crestGold)" stroke="#854D0E" strokeWidth="0.8" />
  </svg>
);

// Cadet Silhouette Vector Graphic
const CadetSilhouette = () => (
  <svg className="w-11 h-9 opacity-85" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Flagpole */}
    <line x1="25" y1="5" x2="25" y2="78" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <circle cx="25" cy="5" r="2.5" fill="#FDE047" />
    {/* Indian Tricolor style fluttering banner */}
    <path d="M 27,8 Q 45,14 62,8 L 62,26 Q 45,32 27,26 Z" fill="#FFFFFF" opacity="0.9" />
    <path d="M 27,8 Q 45,14 62,8 L 62,14 Q 45,20 27,14 Z" fill="#FF9933" />
    <path d="M 27,20 Q 45,26 62,20 L 62,26 Q 45,32 27,26 Z" fill="#138808" />
    {/* Cadet in Salute / Attention */}
    <circle cx="78" cy="20" r="5" fill="#FFFFFF" />
    <rect x="76" y="16" width="7" height="3" rx="1.5" fill="#FFFFFF" />
    {/* Body / Uniform */}
    <path d="M 72,27 L 84,27 L 85,54 L 71,54 Z" fill="#FFFFFF" />
    {/* Saluting Right Arm */}
    <path d="M 84,28 L 92,36 L 85,22 Z" fill="#FFFFFF" />
    {/* Left Arm at side */}
    <line x1="72" y1="28" x2="70" y2="50" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    {/* Legs in discipline stance */}
    <line x1="75" y1="54" x2="74" y2="75" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    <line x1="81" y1="54" x2="82" y2="75" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    {/* Ground base */}
    <line x1="18" y1="78" x2="92" y2="78" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
  </svg>
);

export const SainikTemplate: React.FC<SainikTemplateProps> = ({ studentInfo, side, forwardedRef }) => {
  const schoolName = (studentInfo.universityName || 'SAINIK SCHOOL').trim().toUpperCase();
  const studentName = (studentInfo.studentName || 'ADITYA SINGH').trim().toUpperCase();
  const studentId = studentInfo.studentId || 'SS/2023/0456';
  const barcodeValue = `SSX${studentId.replace(/[^a-zA-Z0-9]/g, '').slice(-8) || '23VIII0456'}`;
  const validDate = studentInfo.validUntil || '31 MAR 2026';
  const dob = studentInfo.dob || '14-07-2010';
  const bloodGroup = studentInfo.bloodGroup || 'O+';
  const rawCourse = studentInfo.course || 'Class VIII';
  const classText = rawCourse.includes('Class') ? rawCourse : `Class ${rawCourse.split(' ')[0] || 'VIII'}`;
  const rollNo = (studentId.match(/\d+$/)?.[0] || '23').slice(-2);
  const houseName = studentInfo.house || (studentInfo.course?.includes('House') ? studentInfo.course.split('House')[1]?.trim() : 'SHIVALIK');

  // ===================== BACK SIDE =====================
  if (side === 'back') {
    return (
      <div
        ref={forwardedRef}
        className="id-card-container id-card-back shadow-xl bg-[#1B345D] overflow-hidden relative rounded-xl border border-neutral-300 font-sans select-none animate-in fade-in duration-300 flex flex-col justify-between text-white"
      >
        {/* Subtle Sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20 pointer-events-none z-10" />

        {/* Top & Middle Navy Section */}
        <div className="p-2.5 flex-1 flex flex-row justify-between relative z-10">
          {/* Left Instructions Column */}
          <div className="w-[58%] flex flex-col justify-between pr-2">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="bg-[#4CAF50] w-1.5 h-3 rounded-[1px]" />
                <h4 className="font-sans font-black text-[8.5px] uppercase tracking-wider text-white">
                  INSTRUCTIONS
                </h4>
              </div>
              <ul className="text-[5.8px] leading-[1.3] text-white/95 space-y-0.5 font-normal list-none">
                <li>• This card is the property of {schoolName}.</li>
                <li>• It must be carried at all times within campus.</li>
                <li>• This card is non-transferable.</li>
                <li>• In case of loss, report to school office immediately.</li>
                <li>• Misuse of this card will lead to disciplinary action.</li>
              </ul>
            </div>

            {/* School Motto & National Commitment */}
            <div className="mt-1 pt-1 border-t border-white/20">
              <span className="font-serif italic text-[6px] tracking-wider text-amber-300 block">
                "Nurturing Tomorrow's Leaders for the Nation"
              </span>
              <span className="text-[5.2px] text-white/80 tracking-widest font-mono uppercase">
                Card Ref: {barcodeValue}
              </span>
            </div>
          </div>

          {/* Right Emblem & Mottos */}
          <div className="w-[42%] flex flex-col items-center justify-center text-center pl-1 border-l border-white/15">
            <AshokaLionEmblem className="w-8 h-9 mb-0.5" />
            <h3 className="font-sans font-black text-[8.5px] tracking-wider text-white leading-tight uppercase line-clamp-2 px-1">
              {schoolName}
            </h3>
            <span className="text-amber-300 text-[8px] leading-none my-0.5">★</span>
            <span className="text-[5.5px] tracking-[0.15em] text-white/90 font-bold uppercase">
              LEADERSHIP • DISCIPLINE
            </span>
            <span className="text-[5px] text-emerald-300 tracking-wider font-semibold uppercase mt-0.5">
              {studentInfo.location ? studentInfo.location.toUpperCase() : (schoolName.includes('SAINIK') ? 'Govt. of India' : 'Official Pass')}
            </span>
          </div>
        </div>

        {/* Curved Green Bottom Banner (#4CAF50) */}
        <div className="relative z-10 bg-[#4CAF50] px-3 py-1.5 flex items-center justify-between text-white border-t border-[#66BB6A]">
          {/* Contact Details */}
          <div className="space-y-0.5 text-[5.8px] leading-tight flex-1">
            <div className="flex items-center gap-1">
              <svg className="w-2.5 h-2.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="truncate max-w-[190px]">
                {studentInfo.address || `${schoolName}, Campus Address`}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <svg className="w-2.5 h-2.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
                </svg>
                <span>{studentInfo.phone || '07662-297700'}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-2.5 h-2.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-.2c0-1.002-.79-1.8-1.8-1.8H7a2 2 0 00-2-2v-1.1c0-.49-.197-.96-.55-1.294A5.962 5.962 0 014.332 8.027z" clipRule="evenodd" />
                </svg>
                <span>{studentInfo.website || `www.${schoolName.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu`}</span>
              </div>
            </div>
          </div>

          {/* QR Code on Right */}
          <div className="bg-white p-1 rounded-[2px] shadow-sm ml-2 flex-shrink-0">
            <svg className="w-8 h-8" viewBox="0 0 45 45" fill="none">
              <rect width="45" height="45" fill="#FFFFFF" />
              {/* Corner Position Detection Patterns */}
              <rect x="2" y="2" width="12" height="12" fill="#000000" />
              <rect x="4" y="4" width="8" height="8" fill="#FFFFFF" />
              <rect x="6" y="6" width="4" height="4" fill="#000000" />

              <rect x="31" y="2" width="12" height="12" fill="#000000" />
              <rect x="33" y="4" width="8" height="8" fill="#FFFFFF" />
              <rect x="35" y="6" width="4" height="4" fill="#000000" />

              <rect x="2" y="31" width="12" height="12" fill="#000000" />
              <rect x="4" y="33" width="8" height="8" fill="#FFFFFF" />
              <rect x="6" y="35" width="4" height="4" fill="#000000" />

              {/* Data matrix dots */}
              <rect x="18" y="4" width="2" height="6" fill="#000" />
              <rect x="24" y="2" width="4" height="2" fill="#000" />
              <rect x="22" y="8" width="6" height="2" fill="#000" />
              <rect x="16" y="16" width="4" height="4" fill="#000" />
              <rect x="24" y="14" width="4" height="4" fill="#000" />
              <rect x="34" y="18" width="4" height="4" fill="#000" />
              <rect x="6" y="18" width="4" height="4" fill="#000" />
              <rect x="16" y="24" width="4" height="4" fill="#000" />
              <rect x="24" y="22" width="6" height="4" fill="#000" />
              <rect x="18" y="34" width="4" height="4" fill="#000" />
              <rect x="26" y="32" width="4" height="6" fill="#000" />
              <rect x="34" y="34" width="6" height="4" fill="#000" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // ===================== FRONT SIDE =====================
  return (
    <div
      ref={forwardedRef}
      className="id-card-container shadow-xl bg-white overflow-hidden relative rounded-xl border border-neutral-300 font-sans select-none animate-in fade-in duration-300 !flex-col text-neutral-900"
    >
      {/* Top Banner (#1B345D Navy Blue) */}
      <div className="h-[46px] w-full bg-[#1B345D] px-2.5 py-1.5 flex items-center justify-between relative z-20 flex-shrink-0 text-white shadow-sm border-b border-[#254A80]">
        {/* Left Emblem */}
        <div className="flex items-center gap-2">
          {studentInfo.logo ? (
            <img src={studentInfo.logo} alt="School Logo" className="w-8 h-8 object-contain flex-shrink-0" />
          ) : (
            <SainikCrestLogo className="w-8 h-8 flex-shrink-0" />
          )}
          {/* Header Typography */}
          <div className="flex flex-col text-left max-w-[215px]">
            <h1
              className="font-sans font-black tracking-[0.05em] uppercase leading-[1.1] text-white break-words line-clamp-2"
              style={{ fontSize: schoolName.length > 32 ? '8.5px' : schoolName.length > 22 ? '9.5px' : '11px' }}
              title={schoolName}
            >
              {schoolName}
            </h1>
            <span className="font-sans font-semibold text-[5.5px] sm:text-[6px] tracking-wider uppercase text-white/90 leading-tight truncate">
              {schoolName.includes('SAINIK')
                ? 'MINISTRY OF DEFENCE, GOVERNMENT OF INDIA'
                : (studentInfo.location ? studentInfo.location.toUpperCase() : 'AFFILIATED & RECOGNIZED INSTITUTION')}
            </span>
            <span className="font-sans font-bold text-[5px] sm:text-[5.5px] tracking-[0.08em] uppercase text-amber-300 leading-tight truncate">
              {studentInfo.address
                ? studentInfo.address.toUpperCase()
                : (studentInfo.location ? studentInfo.location.toUpperCase() : 'LEADERSHIP • DISCIPLINE • CHARACTER')}
            </span>
          </div>
        </div>

        {/* Right Cadet Silhouette Graphic */}
        <CadetSilhouette />
      </div>

      {/* Main Body Area: Pure White with Diagonal Faint Watermark */}
      <div className="flex-1 w-full flex flex-row relative p-2 overflow-hidden bg-white">
        {/* Repeating Faint Watermark */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-around items-center opacity-[0.045] rotate-[-18deg] scale-125 select-none z-0">
          <span className="font-black text-xl tracking-[0.2em] text-[#1B345D] text-center truncate max-w-[300px]">{schoolName}</span>
          <span className="font-black text-xl tracking-[0.2em] text-[#1B345D] text-center truncate max-w-[300px]">{schoolName}</span>
          <span className="font-black text-xl tracking-[0.2em] text-[#1B345D] text-center truncate max-w-[300px]">{schoolName}</span>
        </div>

        {/* Left Column: Student Portrait Photo */}
        <div className="w-[84px] h-full flex flex-col items-center justify-between relative z-10 flex-shrink-0 pr-1.5">
          <div className="w-full h-[96px] bg-neutral-100 rounded-[2px] overflow-hidden border border-[#1B345D] shadow-sm relative">
            <img
              src={studentInfo.photo || '/assets/avatars/male_1.webp'}
              alt={studentName}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/male_1.webp'; }}
            />
          </div>
          {/* Identity Chip Marker */}
          <div className="w-full bg-[#1B345D]/10 py-0.5 mt-1 rounded-[1px] text-center border border-[#1B345D]/20">
            <span className="text-[5.5px] font-black uppercase tracking-wider text-[#1B345D]">
              CADET IDENTITY
            </span>
          </div>
        </div>

        {/* Center & Right Column: Student Data Grid */}
        <div className="flex-1 h-full flex flex-col justify-between pl-1.5 relative z-10">
          {/* Student Name */}
          <div>
            <h2 className="font-sans font-black text-[12px] sm:text-[13px] leading-tight text-black tracking-tight uppercase line-clamp-1">
              {studentName}
            </h2>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-[55px_1fr] gap-y-0.5 text-[7.5px] sm:text-[8px] font-sans my-0.5">
            <span className="text-neutral-700 font-medium">Class</span>
            <span className="text-black font-bold">: {classText}</span>

            <span className="text-neutral-700 font-medium">Roll No.</span>
            <span className="text-black font-bold">: {rollNo}</span>

            <span className="text-neutral-700 font-medium">House</span>
            <span className="text-black font-bold">: {houseName}</span>

            <span className="text-neutral-700 font-medium">Admn No.</span>
            <span className="text-black font-bold">: {studentId}</span>

            <span className="text-neutral-700 font-medium">Date of Birth</span>
            <span className="text-black font-bold">: {dob}</span>

            <span className="text-neutral-700 font-medium">Blood Group</span>
            <span className="text-black font-bold">: {bloodGroup}</span>
          </div>

          {/* Principal Signature Block */}
          <div className="flex justify-end items-end pr-1 mt-auto">
            <div className="flex flex-col items-center">
              <span className="font-serif italic font-bold text-[8px] text-neutral-800 -mb-0.5">
                Bhalerao
              </span>
              <div className="w-16 border-t border-neutral-800 my-0.2" />
              <span className="font-sans font-bold text-[5.5px] uppercase tracking-wider text-neutral-700">
                Principal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip: Barcode on Left + Angled Green VALID UPTO Block on Right */}
      <div className="h-[28px] w-full bg-[#F1F5F9] border-t border-neutral-300 flex items-center justify-between pl-3 relative z-20 flex-shrink-0 overflow-hidden">
        {/* Left Barcode */}
        <SainikBarcode value={barcodeValue} />

        {/* Right Angled Green Block (#4CAF50) */}
        <div
          className="h-full bg-[#4CAF50] text-white flex flex-col justify-center items-center px-4 pl-6"
          style={{ clipPath: 'polygon(16% 0, 100% 0, 100% 100%, 0 100%)' }}
        >
          <span className="font-sans font-bold text-[5.5px] tracking-widest uppercase text-white/95">
            VALID UPTO
          </span>
          <span className="font-sans font-black text-[8px] tracking-wider text-white uppercase leading-tight">
            {validDate}
          </span>
        </div>
      </div>
    </div>
  );
};
