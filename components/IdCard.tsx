
import React, { forwardRef } from 'react';
import { StudentInfo, IdCardTemplate } from '../types';

interface IdCardProps {
  studentInfo: StudentInfo;
  side?: 'front' | 'back';
  template?: IdCardTemplate;
}

const formatToDDMMYYYY = (dateStr: string): string => {
  if (!dateStr) return '';
  const cleaned = dateStr.trim();
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(cleaned)) {
    return cleaned;
  }
  
  // Try normal Date parsing
  const parsedDate = new Date(cleaned);
  if (!isNaN(parsedDate.getTime())) {
    const dd = String(parsedDate.getDate()).padStart(2, '0');
    const mm = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const yyyy = parsedDate.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  // Fallback for names of months like "31 Aug 2027" or "August 31, 2027"
  const months: Record<string, string> = {
    jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
    jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
    january: '01', february: '02', march: '03', april: '04', june: '06',
    july: '07', august: '08', september: '09', october: '10', november: '11', december: '12'
  };

  const m = cleaned.match(/(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})/);
  if (m) {
    const day = m[1].padStart(2, '0');
    const monthWord = m[2].toLowerCase();
    const year = m[3];
    const monthNum = months[monthWord] || '01';
    return `${day}/${monthNum}/${year}`;
  }

  const m2 = cleaned.match(/([a-zA-Z]+)\s+(\d{1,2})[,\s]+(\d{4})/);
  if (m2) {
    const day = m2[2].padStart(2, '0');
    const monthWord = m2[1].toLowerCase();
    const year = m2[3];
    const monthNum = months[monthWord] || '01';
    return `${day}/${monthNum}/${year}`;
  }

  const parts = cleaned.split(/[-.]/);
  if (parts.length === 3) {
    const p0 = parseInt(parts[0], 10);
    const p1 = parseInt(parts[1], 10);
    const p2 = parseInt(parts[2], 10);
    if (!isNaN(p0) && !isNaN(p1) && !isNaN(p2)) {
      if (p2 > 1000) {
        return `${String(p0).padStart(2, '0')}/${String(p1).padStart(2, '0')}/${p2}`;
      }
      if (p0 > 1000) {
        return `${String(p2).padStart(2, '0')}/${String(p1).padStart(2, '0')}/${p0}`;
      }
    }
  }

  return cleaned;
};

const IdCard = forwardRef<HTMLDivElement, IdCardProps>(({ studentInfo, side = 'front', template = 'elegant' }, ref) => {
  
  // Clean university name for display (remove trailing star if present)
  const displayUniversityName = studentInfo.universityName.replace(/\*$/, '');


  // Helper to dynamically derive Faculty name based on Course
  const getFacultyName = (courseName: string) => {
    const c = courseName.toLowerCase();
    if (c.includes('computer') || c.includes('engineer') || c.includes('software') || c.includes('tech') || c.includes('web') || c.includes('data') || c.includes('program')) {
      return 'School of Engineering';
    }
    if (c.includes('business') || c.includes('management') || c.includes('administr') || c.includes('econom') || c.includes('finance') || c.includes('market')) {
      return 'School of Business';
    }
    if (c.includes('art') || c.includes('design') || c.includes('music') || c.includes('theater') || c.includes('creative')) {
      return 'Faculty of Fine Arts';
    }
    if (c.includes('medic') || c.includes('nurs') || c.includes('health') || c.includes('pharm') || c.includes('clini') || c.includes('dent')) {
      return 'School of Health Sciences';
    }
    if (c.includes('law') || c.includes('legal') || c.includes('justice')) {
      return 'School of Law';
    }
    return 'School of Arts & Sciences';
  };

  const QRPlaceholder = ({ size = 40, className = "" }: { size?: number, className?: string }) => (
    <div className={`bg-white p-0.5 border border-gray-200 shadow-sm ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-black">
        <path d="M0,0 h30 v10 h-20 v20 h-10 z M70,0 h30 v30 h-10 v-20 h-20 z M0,70 h10 v20 h20 v10 h-30 z M70,100 v-10 h20 v-20 h-10 v-30 z" fill="currentColor" opacity="0.1" />
        <rect x="15" y="15" width="20" height="20" fill="currentColor" />
        <rect x="65" y="15" width="20" height="20" fill="currentColor" />
        <rect x="15" y="65" width="20" height="20" fill="currentColor" />
        <rect x="45" y="45" width="10" height="10" fill="currentColor" />
        <rect x="55" y="55" width="10" height="10" fill="currentColor" />
        <rect x="35" y="55" width="10" height="10" fill="currentColor" />
        <rect x="55" y="35" width="10" height="10" fill="currentColor" />
      </svg>
    </div>
  );

  const HologramBackground = () => (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.12]">
      <img 
        src="/background hologram/logo-no-text.png" 
        alt="Hologram" 
        className="w-40 h-40 object-contain"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback if image doesn't exist
          (e.target as HTMLElement).style.display = 'none';
        }}
      />
    </div>
  );

  // Common Back Side for Classic/Elegant/Modern/Official/Northfield
  if (side === 'back') {
    if (template === 'official') {
        return (
          <div ref={ref} className="id-card-container id-card-back shadow-lg bg-white overflow-hidden rounded-xl border border-gray-200">
             {/* Magnetic Stripe */}
             <div className="h-10 w-full mt-4 bg-black"></div>
             
             <div className="p-6 flex flex-col h-full items-center text-center justify-center">
                <div className="flex flex-col items-center mb-6">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">{displayUniversityName}</h3>
                </div>

                <div className="text-[9px] text-gray-600 space-y-2 w-4/5 text-center">
                    <div className="border-t border-b border-gray-100 py-2 mb-2">
                        <p className="font-bold text-black uppercase">{studentInfo.studentName}</p>
                        <p className="font-medium text-gray-500">{studentInfo.academicYear}</p>
                    </div>
                    <p>Loss of this card should be reported as soon as possible to the Student Administration Centre.</p>
                    <p>If this card is found, please contact the Student Administration Centre, {displayUniversityName} or return to {studentInfo.address}.</p>
                </div>
             </div>
          </div>
        );
    }

    if (template === 'northfield') {
      return (
        <div ref={ref} className="id-card-container id-card-back shadow-lg bg-[#FAFBFD] overflow-hidden relative rounded-lg border border-gray-300 font-sans select-none animate-in fade-in duration-300">
          {/* Logo Watermark back side */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.05]">
            <svg className="w-36 h-36 text-[#002B49]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15 L25 25 V55 C25 72.5 50 85 50 85 C50 85 75 72.5 75 55 V25 L50 15 Z" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          {/* Magnetic Stripe */}
          <div className="h-7 w-full bg-[#002B49] mt-2 z-10"></div>

          <div className="relative z-10 flex flex-col h-full p-2 mt-1">
            {/* Top Corporate Branding */}
            <div className="flex items-center justify-between px-2 mb-1">
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-[#002B49]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 15 L25 25 V55 C25 72.5 50 85 50 85 C50 85 75 72.5 75 55 V25 L50 15 Z" fill="#002B49" />
                </svg>
                <span className="text-[#002B49] font-serif font-black text-[7.5px] uppercase tracking-wide whitespace-nowrap overflow-hidden text-ellipsis" style={{ maxWidth: '140px' }}>
                  {displayUniversityName}
                </span>
              </div>
              <span className="text-[#C59B27] font-sans font-bold text-[5.5px]">SECURITY SYSTEM SECURE</span>
            </div>

            {/* Terms and conditions */}
            <div className="px-2 text-left text-[#333333] text-[5.5px] font-medium leading-tight space-y-1 mt-1">
              <p>• This card is the legal property of <span className="font-bold">{displayUniversityName}</span>. It is non-transferable and must be presented on demand by authorized officers.</p>
              <p>• Cardholder agrees to comply with all rules and guidelines of the institution, under penalty of disciplinary actions for misuse.</p>
              <p>• If found, please drop at the nearest security box, or mail to: <span className="italic font-bold">{studentInfo.address}</span>.</p>
            </div>

            {/* Middle divider */}
            <div className="mx-2 my-1 border-t border-gray-150"></div>

            {/* Signature Area */}
            <div className="flex justify-between items-end px-3 mt-1 relative">
              <div className="flex flex-col items-center">
                <div className="h-4 w-20 border-b border-gray-300 relative flex items-center justify-center">
                   <span className="text-gray-400 font-serif italic text-[6px] absolute bottom-0.5">Holder's Sign</span>
                </div>
                <p className="text-gray-500 font-bold text-[4.5px] uppercase mt-0.5">Holder's Signature</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="h-4 w-24 border-b border-gray-300 relative flex items-center justify-center">
                   <span className="font-cursive text-indigo-700 text-[10px] absolute -bottom-1">A. Registrar</span>
                </div>
                <p className="text-gray-500 font-bold text-[4.5px] uppercase mt-0.5">Academic Registrar</p>
              </div>
            </div>

            {/* Footer Area with Barcode */}
            <div className="mt-auto flex justify-between items-center px-2 pb-5 z-20">
              <div className="flex flex-col">
                <span className="text-gray-400 text-[4px] font-bold uppercase leading-none">Barcode ID</span>
                <div className="mt-1">
                  <svg className="w-[85px] h-[10px]" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" width="4" height="20" fill="black" />
                    <rect x="8" width="2" height="20" fill="black" />
                    <rect x="12" width="6" height="20" fill="black" />
                    <rect x="20" width="3" height="20" fill="black" />
                    <rect x="25" width="2" height="20" fill="black" />
                    <rect x="29" width="5" height="20" fill="black" />
                    <rect x="36" width="3" height="20" fill="black" />
                    <rect x="41" width="1" height="20" fill="black" />
                    <rect x="44" width="4" height="20" fill="black" />
                    <rect x="50" width="2" height="20" fill="black" />
                    <rect x="54" width="6" height="20" fill="black" />
                    <rect x="62" width="3" height="20" fill="black" />
                    <rect x="67" width="2" height="20" fill="black" />
                    <rect x="71" width="5" height="20" fill="black" />
                    <rect x="78" width="3" height="20" fill="black" />
                    <rect x="83" width="1" height="20" fill="black" />
                    <rect x="86" width="4" height="20" fill="black" />
                    <rect x="92" width="2" height="20" fill="black" />
                    <rect x="96" width="2" height="20" fill="black" />
                  </svg>
                </div>
                <p className="text-left text-[5px] font-mono tracking-widest text-[#002B49] font-bold leading-none mt-0.5">{studentInfo.studentId}</p>
              </div>

              <div className="text-right">
                <span className="text-[4px] text-gray-400 font-bold uppercase leading-none">Card Holder ID</span>
                <p className="text-[6px] text-black font-extrabold uppercase leading-tight tracking-wider mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis" style={{ maxWidth: '75px' }}>{studentInfo.studentName}</p>
                <div className="flex items-center gap-1 mt-0.5 justify-end">
                  <span className="text-gray-400 text-[4px] font-bold">ISSUED:</span>
                  <span className="text-[5px] text-black font-bold">{studentInfo.issueDate || '01-09-2026'}</span>
                </div>
              </div>
            </div>

            {/* Decorative slanted bottom shape */}
            <div className="absolute bottom-0 left-0 right-0 h-2 overflow-hidden rounded-b-lg">
              <div className="absolute inset-0 bg-[#1C649F]"></div>
              <div className="absolute inset-y-0 left-0 w-[63%] bg-[#002B49]" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' }}></div>
            </div>

          </div>
        </div>
      );
    }

    const isModern = template === 'modern';
    const isElegant = template === 'elegant';
    let stripeColor = 'bg-gray-800';
    if (isModern) stripeColor = 'bg-blue-900';
    if (isElegant) stripeColor = 'bg-purple-900';

    return (
      <div ref={ref} className="id-card-container id-card-back shadow-lg bg-white overflow-hidden rounded-lg border border-gray-300">
         {/* Magnetic Stripe */}
         <div className={`h-10 w-full mt-4 ${stripeColor}`}></div>
         
         <div className="p-4 flex flex-col h-full">
            <div className="flex justify-between items-start">
                <div className="text-[10px] text-gray-600 w-2/3 leading-tight text-left">
                    <p>This card is the property of <span className="font-bold text-black">{displayUniversityName}</span>.</p>
                    <p className="mt-1">If found, please return to the address below:</p>
                    <p className="italic text-[9px] mt-0.5">{studentInfo.address}</p>
                </div>
                <div className="w-1/3 flex flex-col items-center ml-2">
                    <div className="border border-gray-300 h-8 w-full bg-gray-50"></div>
                    <p className="text-[6px] text-gray-400 mt-0.5 uppercase">Authorized Signature</p>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-[9px] text-left">
                <div className="col-span-2 border-b border-gray-100 pb-2 mb-1">
                    <p className="font-bold text-black uppercase">{studentInfo.studentName}</p>
                    <p className="text-gray-600">{displayUniversityName}</p>
                    <p className="text-gray-500 font-medium">Academic Year: {studentInfo.academicYear}</p>
                </div>
            </div>

            <div className="mt-auto mb-1 self-center w-3/4 flex flex-col items-center">
                 <div className="barcode h-8 w-full"></div>
                 <p className="text-center text-[8px] tracking-widest mt-1 font-mono">{studentInfo.studentId}</p>
            </div>
         </div>
      </div>
    );
  }

  // Northfield Template (Front View)
  if (template === 'northfield') {
    const uLabel = (studentInfo.universityName || 'NORTHFIELD UNIVERSITY').trim().toUpperCase();
    const maxTextLen = uLabel.length;
    
    // Scale school name font size dynamically for maximum legibility without overflow
    let schoolFontSizeClass = 'text-[12px]';
    if (maxTextLen > 32) {
      schoolFontSizeClass = 'text-[9.5px]';
    } else if (maxTextLen > 24) {
      schoolFontSizeClass = 'text-[11px]';
    }

    // Determine student name font size depending on length (shrink to fit, no wrapping)
    const stuNameUpper = studentInfo.studentName.toUpperCase();
    const nameLen = stuNameUpper.length;
    let nameSizeClass = 'text-[16px]';
    if (nameLen > 24) {
      nameSizeClass = 'text-[10px]';
    } else if (nameLen > 18) {
      nameSizeClass = 'text-[11.5px]';
    } else if (nameLen > 13) {
      nameSizeClass = 'text-[13px]';
    }

    // Determine course program font size depending on length to prevent cutoff or fullstops
    const courseUpper = studentInfo.course.toUpperCase();
    const courseLen = courseUpper.length;
    let courseSizeClass = 'text-[8.5px] leading-tight';
    if (courseLen > 36) {
      courseSizeClass = 'text-[6.5px] leading-[1.1]';
    } else if (courseLen > 24) {
      courseSizeClass = 'text-[7.5px] leading-[1.15]';
    } else if (courseLen > 16) {
      courseSizeClass = 'text-[8.5px] leading-tight';
    }

    // Determine faculty font size depending on length
    const facultyUpper = getFacultyName(studentInfo.course).toUpperCase();
    const facultyLen = facultyUpper.length;
    let facultySizeClass = 'text-[8.5px] leading-tight';
    if (facultyLen > 24) {
      facultySizeClass = 'text-[7.5px] leading-[1.15]';
    } else if (facultyLen > 16) {
      facultySizeClass = 'text-[8.5px] leading-tight';
    }

    return (
      <div ref={ref} className="id-card-container shadow-xl bg-[#FFFFFF] overflow-hidden relative rounded-lg border border-gray-300 flex flex-col font-sans select-none animate-in fade-in duration-300">
        {/* Large watermark crest in background on the right */}
        <div className="absolute bottom-[4%] right-[0%] z-0 pointer-events-none opacity-[0.06] w-28 h-28 text-[#002B49]" style={{ transform: 'rotate(8deg)' }}>
          <svg className="w-full h-full text-current" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 12 L20 22 V54 C20 72 50 86 50 86 C50 86 80 72 80 54 V22 L50 12 Z" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M50 12 V86" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M32 30h14 M32 35h14 M32 40h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M68 30h-14 M68 35h-14 M68 40h-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M50 42v18" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M50 32c-3.5 0-5 5-5 5s4-1 5-5c1 4 5 5 5 5s-1.5-5-5-5z" fill="currentColor" />
            <path d="M22 55 C25 67, 36 74, 46 76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M78 55 C75 67, 64 74, 54 76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* HEADER SECTION */}
        <div className="w-full h-[54px] bg-[#002B49] px-2.5 flex items-center justify-between relative z-10 border-b-2 border-[#C59B27]">
          {/* Left Panel: White Crest Logo */}
          <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mr-2">
            <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 12 L20 22 V54 C20 72 50 86 50 86 C50 86 80 72 80 54 V22 L50 12 Z" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M50 12 V86" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M32 30h14 M32 35h14 M32 40h10" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M68 30h-14 M68 35h-14 M68 40h-10" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M50 42v18" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M50 32c-3.5 0-5 5-5 5s4-1 5-5c1 4 5 5 5 5s-1.5-5-5-5z" fill="currentColor" />
              <path d="M22 55 C25 67, 36 74, 46 76" stroke="#C59B27" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M78 55 C75 67, 64 74, 54 76" stroke="#C59B27" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Center Panel: Institution Name, Address, and Student ID centered perfectly */}
          <div className="flex-1 flex flex-col justify-center items-center text-center overflow-hidden min-w-0 px-1">
            {/* Row 1: Entire University Name fully on first line */}
            <span 
              className={`font-serif font-black tracking-wide text-white uppercase whitespace-nowrap overflow-hidden text-ellipsis leading-tight ${schoolFontSizeClass}`}
            >
              {uLabel}
            </span>
            {/* Row 2: Address of the School */}
            <span 
              className="font-sans font-bold tracking-[0.1em] text-white/80 uppercase whitespace-nowrap overflow-hidden text-ellipsis leading-none mt-0.5 text-[6.5px]"
            >
              {studentInfo.location || 'NORTHFIELD, MN, USA'}
            </span>
            {/* Row 3: STUDENT ID as the last line after the school address */}
            <span 
              className="font-sans font-extrabold tracking-[0.25em] text-[#C59B27] uppercase whitespace-nowrap overflow-hidden text-ellipsis leading-none mt-[2.5px] text-[7.5px]"
            >
              STUDENT ID
            </span>
          </div>

          {/* Right Logo Symmetry/Spacer to ensure perfect centering inside the main container boundary */}
          <div className="w-8 ml-2 flex-shrink-0" />
        </div>

        {/* DETAILS BODY AREA */}
        <div className="flex-1 flex px-3 pt-1.5 pb-1 relative z-10 items-stretch justify-between">
          
          {/* Column 1: Left - Portrait Image and Barcode */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-[64px] h-[84px] bg-[#93BBE5] border border-gray-300 rounded-[2px] shadow-sm overflow-hidden flex-shrink-0">
              <img 
                src={studentInfo.photo || 'https://picsum.photos/250/300'} 
                alt="Student Headshot" 
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Barcode perfectly aligned below */}
            <div className="w-[64px] h-[13px] mt-[4px] flex items-center justify-center overflow-hidden flex-shrink-0 bg-white">
              <svg className="w-full h-[13px]" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" width="4" height="20" fill="black" />
                <rect x="8" width="2" height="20" fill="black" />
                <rect x="12" width="6" height="20" fill="black" />
                <rect x="20" width="3" height="20" fill="black" />
                <rect x="25" width="2" height="20" fill="black" />
                <rect x="29" width="5" height="20" fill="black" />
                <rect x="36" width="3" height="20" fill="black" />
                <rect x="41" width="1" height="20" fill="black" />
                <rect x="44" width="4" height="20" fill="black" />
                <rect x="50" width="2" height="20" fill="black" />
                <rect x="54" width="6" height="20" fill="black" />
                <rect x="62" width="3" height="20" fill="black" />
                <rect x="67" width="2" height="20" fill="black" />
                <rect x="71" width="5" height="20" fill="black" />
                <rect x="78" width="3" height="20" fill="black" />
                <rect x="83" width="1" height="20" fill="black" />
                <rect x="86" width="4" height="20" fill="black" />
                <rect x="92" width="2" height="20" fill="black" />
                <rect x="96" width="2" height="20" fill="black" />
              </svg>
            </div>
            {/* Student ID Code under barcode */}
            <div className="text-[5.5px] font-bold font-mono tracking-widest text-[#002B49] text-center mt-[3px] uppercase leading-none">
              {studentInfo.studentId}
            </div>
          </div>

          {/* Column 2: Center - Student Name and Meta details */}
          <div className="flex-1 flex flex-col justify-start overflow-hidden ml-3">
            <h2 className={`${nameSizeClass} font-black tracking-wide text-[#002B49] uppercase whitespace-nowrap overflow-hidden text-ellipsis leading-none pt-[1px]`}>
              {stuNameUpper}
            </h2>
            <div className="h-[2px] bg-[#002B49] w-full mt-[2.5px] mb-2" />

            {/* Structured Table Rows */}
            <div className="space-y-[5.5px] text-[8.5px]">
              <div className="flex items-start">
                <span className="w-[62px] text-[#002B49] font-black tracking-wider flex-shrink-0 leading-none">STUDENT ID:</span>
                <span className="text-gray-700 font-bold font-mono leading-none tracking-wide">{studentInfo.studentId}</span>
              </div>

              <div className="flex items-start">
                <span className="w-[62px] text-[#002B49] font-black tracking-wider flex-shrink-0 leading-none">PROGRAM:</span>
                <span className={`text-gray-700 font-bold uppercase min-w-0 break-words ${courseSizeClass}`}>
                  {studentInfo.course}
                </span>
              </div>

              <div className="flex items-start">
                <span className="w-[62px] text-[#002B49] font-black tracking-wider flex-shrink-0 leading-none">FACULTY:</span>
                <span className={`text-gray-700 font-bold uppercase min-w-0 break-words ${facultySizeClass}`}>
                  {facultyUpper}
                </span>
              </div>

              <div className="flex items-start">
                <span className="w-[62px] text-[#002B49] font-black tracking-wider flex-shrink-0 leading-none">ACAD. YEAR:</span>
                <span className="text-gray-700 font-bold leading-none uppercase truncate ml-[1px]">
                  {studentInfo.academicYear}
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Right - Valid Until Badge */}
          <div className="flex flex-col items-center justify-end ml-1.5 flex-shrink-0 pb-[8px]">
            {/* "VALID UNTIL" badge */}
            <div className="flex flex-col items-center bg-[#002B49] rounded-[2px] overflow-hidden w-[62px] shadow-sm py-[2px] justify-center">
              <span className="text-white text-[5.5px] font-black tracking-[0.16em] uppercase block leading-none text-center">VALID UNTIL</span>
            </div>
            {/* Bold Expiry Date */}
            <span className="text-[#002B49] text-[10px] font-black tracking-wider uppercase block leading-none mt-[4px] text-center whitespace-nowrap">
              {formatToDDMMYYYY(studentInfo.validUntil)}
            </span>
          </div>

        </div>

        {/* DECORATIVE BOTTOM FOOTER */}
        <div className="absolute bottom-0 left-0 right-0 h-[10px] overflow-hidden rounded-b-lg select-none z-10 pointer-events-none">
          <div className="absolute inset-0 bg-[#1C649F]"></div>
          <div className="absolute inset-y-0 left-0 w-[63%] bg-[#002B49]" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' }}></div>
        </div>
      </div>
    );
  }

    // Official Template Scaling
    const officialUniFontSize = displayUniversityName.length > 30 ? 'text-[9px]' : 'text-[11px]';
    const officialNameFontSize = studentInfo.studentName.length > 25 ? 'text-[10px]' : studentInfo.studentName.length > 18 ? 'text-[12px]' : 'text-[14px]';

  // Official Template (Redesigned for Authenticity)
  if (template === 'official') {
    return (
      <div ref={ref} className="id-card-container shadow-xl bg-white overflow-hidden flex flex-col relative rounded-xl border border-gray-300">
        <HologramBackground />
        {/* Top Security Strip */}
        <div className="h-2 bg-blue-800 w-full relative z-10"></div>
        
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="px-3 pt-0.5 pb-0 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded shadow-sm p-1">
                <svg className="w-full h-full text-blue-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <h1 className={`${officialUniFontSize} font-black text-gray-900 uppercase tracking-tight leading-tight`}>
                    {displayUniversityName}
                  </h1>
                  <p className="text-[7px] font-black text-blue-800 uppercase tracking-tight">Official Student ID Card</p>
                  <p className="text-[6px] font-bold text-blue-700 uppercase tracking-widest">Issued by {displayUniversityName}</p>
                </div>
              </div>
              <div className="text-right ml-auto">
                <p className="text-[6px] font-bold text-gray-400 uppercase">Academic Year</p>
                <p className="text-[9px] font-black text-blue-800">{studentInfo.academicYear}</p>
              </div>
            </div>
          </div>
  
          {/* Main Content Area */}
          <div className="flex flex-row flex-1 px-3 pt-0.5 pb-0 gap-3">
              {/* Left: Photo */}
              <div className="w-[38%]">
                <div className="relative">
                  <div className="w-full aspect-[3/4] bg-gray-100 rounded border-2 border-gray-200 overflow-hidden shadow-inner">
                    <img 
                      src={studentInfo.photo || 'https://picsum.photos/252/324'} 
                      alt="Student" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Holographic-style Seal Overlay */}
                  <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-blue-50/90 backdrop-blur-[1px] border border-blue-200 flex items-center justify-center shadow-sm opacity-90 z-20">
                     <svg className="w-5 h-5 text-blue-500/40" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.1,7 14,7.9 14,9C14,10.1 13.1,11 12,11C10.9,11 10,10.1 10,9C10,7.9 10.9,7 12,7M12,13C14.67,13 20,14.33 20,17V18H4V17C4,14.33 9.33,13 12,13Z" />
                     </svg>
                  </div>
                </div>
                <div className="mt-1 flex flex-col items-center">
                  <div className="w-full h-6 bg-white border border-gray-200 flex items-center justify-center">
                    <div className="w-full h-full opacity-80" style={{ backgroundImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 2px)', backgroundSize: '100% 100%' }}></div>
                  </div>
                  <p className="text-[5px] font-mono text-gray-500 mt-0.5">{studentInfo.studentId}</p>
                </div>
              </div>
  
              {/* Right: Details */}
              <div className="flex-1 flex flex-col justify-center py-0 gap-y-0.5">
                <div className="space-y-0.5">
                  <div>
                    <label className="text-[6px] font-bold text-gray-400 uppercase tracking-wider block">Full Name</label>
                    <h2 className="text-[12px] font-black text-gray-900 uppercase leading-tight tracking-wide">
                      {studentInfo.studentName}
                    </h2>
                  </div>
  
                  <div className="grid grid-cols-1 gap-y-0.5">
                    <div className="flex justify-between">
                      <div>
                        <label className="text-[6px] font-bold text-gray-400 uppercase tracking-wider block">Course / Enrollment</label>
                        <p className="text-[8px] font-black text-gray-800 uppercase leading-none">{studentInfo.course}</p>
                      </div>
                      <div className="text-right">
                        <label className="text-[6px] font-bold text-gray-400 uppercase tracking-wider block">Status</label>
                        <p className="text-[8px] font-black text-green-700 uppercase leading-none">{studentInfo.status}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-[6px] font-bold text-gray-400 uppercase tracking-wider block">Student ID Number</label>
                      <p className="text-[9px] font-bold text-gray-800 font-mono tracking-tighter">{studentInfo.studentId}</p>
                    </div>
                    <div className="flex justify-between pt-0.5 border-t border-gray-100">
                      <div>
                        <label className="text-[6px] font-bold text-gray-400 uppercase tracking-wider block">Issued</label>
                        <p className="text-[8px] font-bold text-gray-800">{studentInfo.issueDate}</p>
                      </div>
                      <div className="text-right">
                        <label className="text-[6px] font-bold text-gray-400 uppercase tracking-wider block">Valid Until</label>
                        <p className="text-[9px] font-black text-red-700 bg-red-50 px-1 rounded">{formatToDDMMYYYY(studentInfo.validUntil)}</p>
                      </div>
                    </div>
                    <div className="pt-0.5 border-t border-gray-100 flex justify-between items-center">
                      <div className="text-[6px] text-gray-400 font-medium">
                        <p>{studentInfo.website}</p>
                        <p>Verify at registrar office</p>
                      </div>
                      <div className="bg-blue-800 text-white px-1.5 py-0.5 rounded-sm">
                        <p className="text-[7px] font-black uppercase tracking-widest">STUDENT</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  // Elegant Template
  if (template === 'elegant') {
    const names = studentInfo.studentName.split(' ');
    const displayName = studentInfo.studentName;
    const lastNamePart = names.length > 1 ? names[names.length - 1] : names[0];
    
    // Geographical Logic - Now using dynamic field
    const location = studentInfo.location || 'London, UK';

    // Header Font Scaling for long names
    const uniNameLength = displayUniversityName.length;
    let uniFontSize = 'text-[18px]';
    let uniMarginBottom = 'mb-2';
    let locationFontSize = 'text-[11px]';
    
    if (uniNameLength > 35) {
        uniFontSize = 'text-[11px]';
        uniMarginBottom = 'mb-0.5';
        locationFontSize = 'text-[9px]';
    } else if (uniNameLength > 25) {
        uniFontSize = 'text-[13px]';
        uniMarginBottom = 'mb-1';
        locationFontSize = 'text-[10px]';
    } else if (uniNameLength >= 20) {
        uniFontSize = 'text-[15px]';
        uniMarginBottom = 'mb-1';
    } else if (uniNameLength > 15) {
        uniFontSize = 'text-[17px]';
        uniMarginBottom = 'mb-1.5';
    }

    // Student Name Font Scaling
    const nameLength = displayName.length;
    let nameFontSize = 'text-sm';
    if (nameLength > 25) nameFontSize = 'text-[10px]';
    else if (nameLength > 20) nameFontSize = 'text-[12px]';

    return (
      <div ref={ref} className="id-card-container shadow-lg relative bg-white overflow-hidden flex flex-row">
        <HologramBackground />
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.9),transparent_60%),conic-gradient(from_0deg,_#fbcfe8,_#bae6fd,_#e9d5ff,_#fbcfe8)] opacity-30 z-0"></div>
        
        {/* Corner Flourishes */}
        <div className="absolute top-0 left-0 w-24 h-24 z-0 pointer-events-none text-gray-400 opacity-60">
             <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M10,10 Q40,10 50,30 T80,50 M10,20 Q30,20 40,35 M20,10 Q20,30 35,40" />
                <path d="M5,5 C25,5 45,25 50,50" strokeWidth="2"/>
             </svg>
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 z-0 pointer-events-none text-gray-400 opacity-60 transform scale-x-[-1]">
             <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M10,10 Q40,10 50,30 T80,50 M10,20 Q30,20 40,35 M20,10 Q20,30 35,40" />
                <path d="M5,5 C25,5 45,25 50,50" strokeWidth="2"/>
             </svg>
        </div>

        {/* Content */}
        <div className="z-10 w-full h-full flex p-2.5 relative">
            
            {/* Left Column */}
            <div className="flex-1 flex flex-col pt-1 pl-1">
                {/* Header */}
                <div className={`text-center ${uniMarginBottom}`}>
                    <h1 className={`font-sans ${uniFontSize} font-black tracking-tight leading-tight text-gray-900 uppercase`}>
                        {displayUniversityName}
                    </h1>
                    <p className="text-[7px] font-black text-gray-800 uppercase tracking-tight leading-none mb-0.5">Official Student ID Card</p>
                    <p className={`${locationFontSize} text-gray-900 font-bold mt-0.5`}>
                        {location}
                    </p>
                </div>

                {/* Name */}
                <div className="mb-0.5">
                    <p className="font-playfair font-bold text-[8px] text-black leading-none mb-0.5 opacity-80">Name</p>
                    <p className={`font-playfair font-black ${nameFontSize} text-black leading-none uppercase`}>
                        {displayName}
                    </p>
                </div>

                {/* Course */}
                <div className="mb-1">
                    <p className="font-playfair font-bold text-[7px] text-black leading-none mb-0.5 opacity-80 uppercase">Course</p>
                    <p className="font-playfair font-black text-[9px] text-black leading-none uppercase">
                        {studentInfo.course}
                    </p>
                </div>

                {/* ID & Info Grid */}
                <div className="flex items-start">
                    {/* Small Ghost Photo */}
                    <div className="mr-3 flex flex-col items-center">
                        <img 
                            src={studentInfo.photo || 'https://picsum.photos/252/324'} 
                            alt="Ghost" 
                            className="w-12 h-14 object-cover border border-gray-300 bg-orange-50 opacity-90" 
                            referrerPolicy="no-referrer"
                        />
                        <p className="text-[6px] font-bold text-black text-center uppercase leading-none mt-0.5 w-full overflow-hidden text-ellipsis">{lastNamePart}</p>
                    </div>

                    <div className="flex flex-col space-y-1 pt-0">
                        {/* Student ID */}
                        <div>
                             <p className="text-[6px] text-gray-600 font-bold leading-none mb-0.5 uppercase">Student ID</p>
                             <p className="font-playfair text-[12px] font-black text-black tracking-widest leading-none">
                                {studentInfo.studentId.replace(/-/g, '.')}
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-0.5">
                            {/* Academic Year Box */}
                            <div className="bg-yellow-50 border-l-2 border-black pl-2 pr-1 py-0.5 -ml-2">
                                <p className="text-[7px] text-black font-bold leading-none mb-0.5 uppercase">Academic Year</p>
                                <p className="text-[10px] text-black font-black leading-none">{studentInfo.academicYear}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-auto flex justify-between items-end">
                  <div className="text-[6px] text-gray-500 font-medium">
                    <p>{studentInfo.website}</p>
                  </div>
                </div>
            </div>

            {/* Right Column: Main Photo */}
            <div className="w-[34%] h-full flex flex-col items-center ml-2 relative">
                <div className="w-full h-[74%] relative mt-0.5">
                    <img 
                        src={studentInfo.photo || 'https://picsum.photos/252/324'} 
                        alt="Main"
                        className="w-full h-full object-cover shadow-sm" 
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-orange-500 py-0.5 text-center">
                        <p className="font-serif font-black text-white text-[8px] uppercase tracking-wider">STUDENT</p>
                    </div>
                    {/* Microprint style security text */}
                    <div className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap opacity-20 pointer-events-none">
                      <p className="text-[4px] font-mono uppercase text-black leading-none">
                        OFFICIALSTUDENTIDOFFICIALSTUDENTIDOFFICIALSTUDENTID
                      </p>
                    </div>
                </div>
                <div className="mt-auto pb-0.5 text-center">
                    <p className="text-red-700 font-black text-[10px] font-sans bg-red-50 px-1.5 py-0.5 rounded inline-block uppercase">VALID UNTIL 10/8/2027</p>
                </div>
            </div>

        </div>
      </div>
    );
  }

  // Modern Template
  if (template === 'modern') {
    return (
      <div ref={ref} className="id-card-container shadow-lg relative bg-white overflow-hidden flex flex-col">
        <HologramBackground />
        {/* Modern Header */}
        <div className="h-[22%] bg-blue-900 w-full flex items-center px-3 relative z-10">
             <div className="flex items-center gap-2">
                <div className="bg-white p-0.5 rounded-full">
                    <svg className="w-4 h-4 text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L1 7.5V13.75C1 18.31 4.21 22.5 12 24C19.79 22.5 23 18.31 23 13.75V7.5L12 2ZM12 4.3L19.92 8.5L12 12.7L4.08 8.5L12 12.7L4.08 8.5L12 4.3ZM5 14.5C5 15.8 5.75 16.95 7 17.65V15.5H9V19.5C6.2 18.88 5 16.81 5 14.5Z" />
                    </svg>
                </div>
                <div className="flex flex-col">
                    <span className="text-white text-[8px] font-bold leading-none tracking-widest uppercase">
                        {displayUniversityName.split(' ')[0]}
                    </span>
                    <span className="text-blue-200 text-[5px] font-medium leading-none tracking-wider uppercase">
                        {displayUniversityName.split(' ').slice(1).join(' ')}
                    </span>
                </div>
             </div>
             <div className="ml-auto text-right">
                <p className="text-white text-[6px] font-bold uppercase tracking-widest">Academic Year</p>
                <p className="text-blue-200 text-[9px] font-black">{studentInfo.academicYear}</p>
             </div>
        </div>
        
        {/* Sub Header Strip */}
        <div className="h-[4%] bg-blue-400 w-full z-10"></div>

        {/* Body Content */}
        <div className="flex flex-1 p-2 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
            
            {/* Left: Photo */}
            <div className="w-[30%] h-full z-10 relative flex flex-col">
                <div className="w-full aspect-[3/4] border-2 border-white shadow-md bg-gray-200 overflow-hidden rounded-sm">
                    <img 
                        src={studentInfo.photo || 'https://picsum.photos/252/324'} 
                        alt="Student"
                        className="w-full h-full object-cover object-top" 
                        referrerPolicy="no-referrer"
                    />
                </div>
                <p className="mt-auto text-[7px] font-bold text-center text-blue-900 uppercase">{studentInfo.status}</p>
            </div>

            {/* Right: Info */}
            <div className="w-[70%] pl-3 z-10 flex flex-col justify-center">
                <div className="text-right mb-0.5">
                     <h3 className="text-[8px] font-bold text-blue-600 uppercase tracking-widest">Official Student ID Card</h3>
                </div>
                
                <div className="mt-0.5">
                    <h1 className={`${studentInfo.studentName.length > 20 ? 'text-[10px]' : 'text-xs'} font-black text-gray-800 uppercase leading-none tracking-tight`}>
                        {studentInfo.studentName}
                    </h1>
                    <p className="text-[7px] font-black text-blue-900 uppercase mt-0.5">Issued by {displayUniversityName}</p>
                </div>

                <div className="mt-1 grid grid-cols-2 gap-0.5">
                     <div className="col-span-2">
                        <p className="text-[5px] text-gray-400 uppercase font-bold tracking-wider">Course / Enrollment</p>
                        <p className="text-[8px] font-black text-gray-800 uppercase leading-none">{studentInfo.course}</p>
                     </div>
                     <div>
                        <p className="text-[5px] text-gray-400 uppercase font-bold tracking-wider">Issued</p>
                        <p className="text-[7px] font-bold text-gray-800 uppercase">{studentInfo.issueDate}</p>
                     </div>
                     <div>
                        <p className="text-[5px] text-gray-400 uppercase font-bold tracking-wider">Student ID</p>
                        <p className="text-[7px] font-bold text-gray-800 font-mono">{studentInfo.studentId}</p>
                     </div>
                </div>

                <div className="mt-auto flex justify-between items-end">
                     <div>
                         <p className="text-[5px] text-gray-400 uppercase font-bold tracking-wider">Expires</p>
                         <p className="text-[9px] font-black text-red-700 bg-red-50 px-1 rounded">{formatToDDMMYYYY(studentInfo.validUntil)}</p>
                     </div>
                     <QRPlaceholder size={30} />
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="h-[10%] bg-blue-400 w-full flex items-center justify-between px-3">
             <span className="text-white font-bold text-[6px] tracking-wider">{studentInfo.website}</span>
             <span className="text-white font-bold text-[9px] tracking-widest uppercase">STUDENT</span>
        </div>
      </div>
    );
  }

  // Classic Template (Original)
  return (
    <div ref={ref} className="id-card-container shadow-lg flex-row bg-white relative">
      <HologramBackground />
      {/* Microprint Border */}
      <div className="absolute inset-0 border-[0.5px] border-gray-100 pointer-events-none opacity-20"></div>
      
      <div className="photo-section relative">
        <img 
          src={studentInfo.photo || 'https://picsum.photos/252/324'} 
          alt="Student"
          className="w-full h-full object-cover" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-0.5 text-center">
          <p className="text-white font-bold text-[6px] uppercase tracking-widest">STUDENT</p>
        </div>
      </div>
      <div className="info-section !p-2 flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <svg className="w-5 h-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L1 7.5V13.75C1 18.31 4.21 22.5 12 24C19.79 22.5 23 18.31 23 13.75V7.5L12 2ZM12 4.3L19.92 8.5L12 12.7L4.08 8.5L12 12.7L4.08 8.5L12 4.3ZM5 14.5C5 15.8 5.75 16.95 7 17.65V15.5H9V19.5C6.2 18.88 5 16.81 5 14.5Z" />
            </svg>
            <p className="font-semibold text-gray-700 text-[8px] leading-tight uppercase">{displayUniversityName}</p>
          </div>
          <QRPlaceholder size={20} />
        </div>
        
        <p className="text-[9px] font-bold text-orange-600 mt-0.5 tracking-wider uppercase">Official Student ID Card</p>
        <p className="text-[12px] font-extrabold text-black mt-0.5 leading-tight uppercase">{studentInfo.studentName}</p>
        
        <div className="mt-0.5 flex justify-between items-start">
          <div>
            <p className="text-[5px] text-gray-500 font-semibold tracking-wider uppercase">Course / Enrollment</p>
            <p className="text-[8px] text-black font-bold uppercase leading-none">{studentInfo.course}</p>
          </div>
          <div className="text-right">
            <p className="text-[5px] text-gray-500 font-semibold tracking-wider uppercase">Status</p>
            <p className="text-[8px] text-green-700 font-bold uppercase leading-none">{studentInfo.status}</p>
          </div>
        </div>

        <hr className="my-1 border-gray-200" />
        
        <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[7px] flex-grow">
          <div>
            <p className="text-gray-500 font-semibold tracking-wider uppercase">Student ID</p>
            <p className="text-black font-bold font-mono">{studentInfo.studentId}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold tracking-wider uppercase">Academic Year</p>
            <p className="text-black font-bold">{studentInfo.academicYear}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold tracking-wider uppercase">Issued</p>
            <p className="text-black font-medium">{studentInfo.issueDate}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold tracking-wider uppercase">Expires</p>
            <p className="text-red-700 font-black bg-red-50 px-1 rounded inline-block">{formatToDDMMYYYY(studentInfo.validUntil)}</p>
          </div>
          <div className="col-span-2 mt-0.5 pt-0.5 border-t border-gray-100">
            <p className="text-gray-400 font-medium text-[6px] leading-tight">{studentInfo.website}</p>
            <p className="text-gray-400 font-medium text-[5px] leading-tight italic">Verify via registrar office contact</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default IdCard;
