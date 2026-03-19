
import React, { forwardRef } from 'react';
import { StudentInfo, IdCardTemplate } from '../types';

interface IdCardProps {
  studentInfo: StudentInfo;
  side?: 'front' | 'back';
  template?: IdCardTemplate;
}

const IdCard = forwardRef<HTMLDivElement, IdCardProps>(({ studentInfo, side = 'front', template = 'elegant' }, ref) => {
  
  // Clean university name for display (remove trailing star if present)
  const displayUniversityName = studentInfo.universityName.replace(/\*$/, '');

  // Common Back Side for Classic/Elegant/Modern
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

                <div className="text-[9px] text-gray-600 space-y-2 w-4/5">
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

    const isModern = template === 'modern';
    const isElegant = template === 'elegant';
    const isTraining = template === 'training';
    
    if (isTraining) {
      return (
        <div ref={ref} className="id-card-container id-card-back shadow-lg bg-white overflow-hidden relative rounded-lg border border-gray-400 font-sans">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/University_of_Nairobi_Main_Campus.jpg/800px-University_of_Nairobi_Main_Campus.jpg" 
              alt="Campus" 
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative z-10 flex flex-col h-full p-3">
            {/* Top Info */}
            <div className="flex justify-center gap-6 text-black font-black text-[11px] bg-white/80 py-1 px-4 rounded shadow-sm self-center mt-1">
              <p>Issued :</p>
              <p>Expires :</p>
            </div>
            
            <div className="text-center mt-1.5">
              <p className="text-black font-black text-[11px] bg-white/80 inline-block px-4 py-0.5 rounded shadow-sm">{studentInfo.studentId}</p>
            </div>

            {/* Barcode Area */}
            <div className="mt-3 bg-white p-2 w-[85%] mx-auto shadow-md rounded-sm">
              <div className="h-14 w-full opacity-100" style={{ backgroundImage: 'repeating-linear-gradient(to right, black 0, black 2px, transparent 2px, transparent 4px, black 4px, black 5px, transparent 5px, transparent 7px, black 7px, black 10px, transparent 10px, transparent 12px)', backgroundSize: '100% 100%' }}></div>
              <div className="flex justify-between px-2 mt-1 text-[11px] text-black font-mono font-bold tracking-[0.2em]">
                <span>9</span>
                <span>8</span>
                <span>4</span>
                <span>0</span>
                <span>2</span>
                <span>2</span>
                <span>0</span>
                <span>7</span>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="mt-auto text-center text-white text-[9px] font-bold px-2 pb-1">
              <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">This card is the property of the University of Nairobi and should be</p>
              <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">surrendered on request or expiry.</p>
            </div>
          </div>
        </div>
      );
    }

    let stripeColor = 'bg-gray-800';
    if (isModern) stripeColor = 'bg-blue-900';
    if (isElegant) stripeColor = 'bg-purple-900';
    if (isTraining) stripeColor = 'bg-[#2d2d2d]';

    return (
      <div ref={ref} className="id-card-container id-card-back shadow-lg bg-white overflow-hidden">
         {/* Magnetic Stripe */}
         <div className={`h-10 w-full mt-4 ${stripeColor}`}></div>
         
         <div className="p-4 flex flex-col h-full">
            <div className="flex justify-between items-start">
                <div className="text-[10px] text-gray-600 w-2/3 leading-tight">
                    <p>This card is the property of <span className="font-bold text-black">{displayUniversityName}</span>.</p>
                    <p className="mt-1">If found, please return to the address below:</p>
                    <p className="italic text-[9px] mt-0.5">{studentInfo.address}</p>
                </div>
                <div className="w-1/3 flex flex-col items-center ml-2">
                    <div className="border border-gray-300 h-8 w-full bg-gray-50"></div>
                    <p className="text-[6px] text-gray-400 mt-0.5 uppercase">Authorized Signature</p>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-[9px]">
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

  // Calculate expiry date (Common logic)
  const today = new Date();
  const expiryYear = 2029; // Fixed relative to 2026 enrollment
  const expiryMonth = String(today.getMonth() + 1).padStart(2, '0');
  const expiryDay = String(today.getDate()).padStart(2, '0');
  const expiryDateString = `${expiryDay}-${expiryMonth}-${expiryYear}`;

  // Training Template (Now University of Nairobi)
  if (template === 'training') {
    // Extract parts of the name
    const names = studentInfo.studentName.split(' ');
    const lastName = names.length > 0 ? names[names.length - 1].toUpperCase() : '';
    const firstNames = names.slice(0, names.length - 1).join(' ').toUpperCase();
    const formattedName = `${lastName} ${firstNames}`.trim();

    return (
      <div ref={ref} className="id-card-container shadow-xl bg-[#85cbf4] overflow-hidden relative rounded-lg border border-gray-400 flex-col font-sans select-none">
        
        {/* Header Section */}
        <div className="w-full pt-1.5 px-3 flex flex-col items-center relative z-10">
            <h1 className="text-[#003366] font-serif text-[17px] font-bold tracking-tight leading-tight text-center w-full">
                UNIVERSITY OF NAIROBI
            </h1>
            <p className="text-white italic font-serif text-[9px] leading-tight mt-0.5 text-center">
                Towards World Class Excellence
            </p>
            <div className="text-[#003366] text-[7px] text-center mt-0.5 leading-tight font-bold">
                <p>P.O.BOX 30197-00100 NAIROBI TEL:318262</p>
                <p>Website: www.uonbi.ac.ke</p>
            </div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 flex px-3 mt-1.5 gap-3 items-start">
            {/* Left: Photo */}
            <div className="w-[80px] h-[100px] bg-white border border-gray-400 p-0.5 shadow-sm flex-shrink-0">
                <img 
                    src={studentInfo.photo || 'https://picsum.photos/252/324'} 
                    alt="Student" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                />
            </div>

            {/* Right: Details */}
            <div className="flex-1 flex flex-col pt-0">
                <h2 className="text-black font-extrabold text-[9px] mb-1.5 tracking-tight">UNDERGRADUATE STUDENT ID CARD</h2>
                
                <div className="space-y-0.5 text-[9px] text-black font-bold leading-tight">
                    <p className="text-[10px] mb-1">{formattedName || 'MUNGAI ELIZABETH WANJIRU'}</p>
                    <p>Reg. No: {studentInfo.studentId}</p>
                    <p>ID/PP NO: {studentInfo.studentId.replace(/\D/g, '').substring(0, 8) || '27870562'}</p>
                    <p className="mt-2 text-[8px] leading-none">BACHELOR OF MEDICINE AND BACHELOR OF SURGERY</p>
                    <p className="text-[8px] leading-none">FACULTY OF HEALTH SCIENCES</p>
                </div>
            </div>
        </div>

        {/* Bottom Section: Signatures & Validity */}
        <div className="absolute bottom-1.5 left-0 right-0 px-3 z-10">
            <div className="flex justify-between items-end mb-1">
                {/* Holder Sign */}
                <div className="flex flex-col items-center">
                    <div className="h-4 w-16 border-b border-black/30"></div>
                    <p className="text-black font-bold text-[8px] mt-0.5">Holder's Sign</p>
                </div>

                {/* Registrar Sign */}
                <div className="flex flex-col items-center">
                    <div className="h-4 w-24 border-b border-black/30"></div>
                    <p className="text-black font-bold text-[8px] mt-0.5">Academic Registrar Sign</p>
                </div>
            </div>

            <div className="flex justify-between items-center border-t border-black/10 pt-1">
                <p className="text-black font-bold text-[8px]">This ID/Card is valid up to</p>
                <p className="text-black font-serif text-[8px] italic">ISO 9001:2008 Certified</p>
            </div>
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
        {/* Top Security Strip */}
        <div className="h-2 bg-blue-800 w-full"></div>
        
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="px-4 pt-1 pb-0 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded shadow-sm p-1">
                <svg className="w-full h-full text-blue-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h1 className={`${officialUniFontSize} font-black text-gray-900 uppercase tracking-tight leading-tight`}>
                  {displayUniversityName}
                </h1>
                <p className="text-[7px] font-bold text-blue-700 uppercase tracking-widest">Official Student Identity</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-bold text-gray-400 uppercase">Academic Year</p>
              <p className="text-[10px] font-black text-blue-800">{studentInfo.academicYear}</p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-row flex-1 px-4 pt-0 pb-0 gap-4">
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
            </div>

            {/* Right: Details */}
            <div className="flex-1 flex flex-col justify-center py-0 gap-y-1">
              <div className="space-y-1">
                <div>
                  <label className="text-[7px] font-bold text-gray-400 uppercase tracking-wider block">Full Name</label>
                  <h2 className="text-[13px] font-black text-gray-900 uppercase leading-tight tracking-wide">
                    {studentInfo.studentName}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-y-1">
                  <div>
                    <label className="text-[7px] font-bold text-gray-400 uppercase tracking-wider block">Student ID Number</label>
                    <p className="text-[10px] font-bold text-gray-800 font-mono tracking-tighter">{studentInfo.studentId}</p>
                  </div>
                  <div>
                    <label className="text-[7px] font-bold text-gray-400 uppercase tracking-wider block">Date of Birth</label>
                    <p className="text-[9px] font-bold text-gray-800">{studentInfo.dob}</p>
                  </div>
                  <div className="pt-1 border-t border-gray-100">
                    <div className="flex justify-between items-end">
                      <div>
                        <label className="text-[7px] font-bold text-gray-400 uppercase tracking-wider block">Valid Until</label>
                        <p className="text-[9px] font-black text-red-600">{expiryDateString}</p>
                      </div>
                      <div className="bg-blue-800 text-white px-2 py-0.5 rounded-sm">
                        <p className="text-[8px] font-black uppercase tracking-widest">STUDENT</p>
                      </div>
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
    let uniMarginBottom = 'mb-4';
    let locationFontSize = 'text-[11px]';
    
    if (uniNameLength > 35) {
        uniFontSize = 'text-[11px]';
        uniMarginBottom = 'mb-1';
        locationFontSize = 'text-[9px]';
    } else if (uniNameLength > 25) {
        uniFontSize = 'text-[13px]';
        uniMarginBottom = 'mb-1.5';
        locationFontSize = 'text-[10px]';
    } else if (uniNameLength >= 20) {
        uniFontSize = 'text-[15px]';
        uniMarginBottom = 'mb-1.5';
    } else if (uniNameLength > 15) {
        uniFontSize = 'text-[17px]';
        uniMarginBottom = 'mb-2';
    }

    // Student Name Font Scaling
    const nameLength = displayName.length;
    let nameFontSize = 'text-sm';
    if (nameLength > 25) nameFontSize = 'text-[10px]';
    else if (nameLength > 20) nameFontSize = 'text-[12px]';

    return (
      <div ref={ref} className="id-card-container shadow-lg relative bg-white overflow-hidden flex flex-row">
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
        <div className="z-10 w-full h-full flex p-3 relative">
            
            {/* Left Column */}
            <div className="flex-1 flex flex-col pt-2 pl-2">
                {/* Header */}
                <div className={`text-center ${uniMarginBottom}`}>
                    <h1 className={`font-sans ${uniFontSize} font-black tracking-tight leading-tight text-gray-900 uppercase`}>
                        {displayUniversityName}
                    </h1>
                    <p className={`${locationFontSize} text-gray-900 font-bold mt-0.5`}>
                        {location}
                    </p>
                </div>

                {/* Name */}
                <div className="mb-2">
                    <p className="font-playfair font-bold text-[9px] text-black leading-none mb-0.5 opacity-80">Name</p>
                    <p className={`font-playfair font-black ${nameFontSize} text-black leading-none uppercase`}>
                        {displayName}
                    </p>
                </div>

                {/* ID & Info Grid */}
                <div className="flex items-start">
                    {/* Small Ghost Photo */}
                    <div className="mr-3 flex flex-col items-center">
                        <img 
                            src={studentInfo.photo || 'https://picsum.photos/252/324'} 
                            alt="Ghost" 
                            className="w-14 h-16 object-cover border border-gray-300 bg-orange-50 opacity-90" 
                            referrerPolicy="no-referrer"
                        />
                        <p className="text-[7px] font-bold text-black text-center uppercase leading-none mt-0.5 w-full overflow-hidden text-ellipsis">{lastNamePart}</p>
                    </div>

                    <div className="flex flex-col space-y-1.5 pt-0.5">
                        {/* Student ID */}
                        <div>
                             <p className="text-[7px] text-gray-600 font-bold leading-none mb-0.5 uppercase">Student ID</p>
                             <p className="font-playfair text-sm font-black text-black tracking-widest leading-none">
                                {studentInfo.studentId.replace(/-/g, '.')}
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                            <div>
                                <p className="text-[8px] text-black font-bold leading-none mb-0.5 uppercase">Date of Birth</p>
                                <p className="text-[10px] text-black font-black leading-none">{studentInfo.dob}</p>
                            </div>
                            
                            {/* Date Enrolled Box - Updated to 2026 */}
                            <div className="bg-yellow-50 border-l-2 border-black pl-2 pr-1 py-1 -ml-2">
                                <p className="text-[8px] text-black font-bold leading-none mb-0.5 uppercase">Date Enrolled</p>
                                <p className="text-[12px] text-black font-black leading-none">2026</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Main Photo */}
            <div className="w-[34%] h-full flex flex-col items-center ml-2 relative">
                <div className="w-full h-[78%] relative mt-1">
                    <img 
                        src={studentInfo.photo || 'https://picsum.photos/252/324'} 
                        alt="Main"
                        className="w-full h-full object-cover shadow-sm" 
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-orange-500 py-1 text-center">
                        <p className="font-serif font-black text-white text-[9px] uppercase tracking-wider">STUDENT</p>
                    </div>
                </div>
                <div className="mt-auto pb-1 text-center">
                    <p className="text-red-600 font-extrabold text-[10px] font-playfair">EXPIRES: {expiryDateString}</p>
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
        {/* Modern Header */}
        <div className="h-[25%] bg-blue-900 w-full flex items-center px-4 relative z-10">
             <div className="flex items-center gap-2">
                <div className="bg-white p-1 rounded-full">
                    <svg className="w-5 h-5 text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L1 7.5V13.75C1 18.31 4.21 22.5 12 24C19.79 22.5 23 18.31 23 13.75V7.5L12 2ZM12 4.3L19.92 8.5L12 12.7L4.08 8.5L12 4.3ZM5 14.5C5 15.8 5.75 16.95 7 17.65V15.5H9V19.5C6.2 18.88 5 16.81 5 14.5Z" />
                    </svg>
                </div>
                <div className="flex flex-col">
                    <span className="text-white text-[9px] font-bold leading-none tracking-widest uppercase">
                        {displayUniversityName.split(' ')[0]}
                    </span>
                    <span className="text-blue-200 text-[6px] font-medium leading-none tracking-wider uppercase">
                        {displayUniversityName.split(' ').slice(1).join(' ')}
                    </span>
                </div>
             </div>
        </div>
        
        {/* Sub Header Strip */}
        <div className="h-[5%] bg-blue-400 w-full z-10"></div>

        {/* Body Content */}
        <div className="flex flex-1 p-3 relative">
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
                <p className="mt-auto text-[8px] font-bold text-center text-blue-900">200 LEVEL</p>
            </div>

            {/* Right: Info */}
            <div className="w-[70%] pl-4 z-10 flex flex-col justify-center">
                <div className="text-right mb-1">
                     <h3 className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">Student Identity Card</h3>
                </div>
                
                <div className="mt-1">
                    <h1 className={`${studentInfo.studentName.split(' ').slice(1).join(' ').length > 12 ? 'text-sm' : 'text-lg'} font-black text-gray-800 uppercase leading-none tracking-tight`}>
                        {studentInfo.studentName.split(' ').slice(1).join(' ')}
                    </h1>
                    <h2 className={`${studentInfo.studentName.split(' ')[0].length > 12 ? 'text-xs' : 'text-sm'} font-semibold text-gray-600 uppercase leading-tight`}>
                        {studentInfo.studentName.split(' ')[0]}
                    </h2>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-1">
                     <div>
                        <p className="text-[6px] text-gray-400 uppercase font-bold tracking-wider">Department</p>
                        <p className="text-[8px] font-bold text-gray-800 uppercase">Science & Tech</p>
                     </div>
                     <div>
                        <p className="text-[6px] text-gray-400 uppercase font-bold tracking-wider">Matric No.</p>
                        <p className="text-[8px] font-bold text-gray-800 font-mono">{studentInfo.studentId.split('-').slice(2).join('')}</p>
                     </div>
                </div>

                <div className="mt-auto flex justify-between items-end">
                     <div>
                         <p className="text-[6px] text-gray-400 uppercase font-bold tracking-wider">Expires</p>
                         <p className="text-[8px] font-bold text-gray-800">AUG 2029</p>
                     </div>
                     {/* QR Code Placeholder */}
                     <div className="w-10 h-10 bg-white border border-gray-200 p-0.5">
                         <div className="w-full h-full bg-black flex items-center justify-center text-[3px] text-white">QR</div>
                     </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="h-[12%] bg-blue-400 w-full flex items-center justify-end px-3">
             <span className="text-white font-bold text-[10px] tracking-widest">{studentInfo.academicYear}</span>
        </div>
      </div>
    );
  }

  // Classic Template (Original)
  return (
    <div ref={ref} className="id-card-container shadow-lg flex-row bg-white">
      <div className="photo-section">
        <img 
          src={studentInfo.photo || 'https://picsum.photos/252/324'} 
          alt="Student"
          className="w-full h-full object-cover" 
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="info-section">
        <div className="flex items-center gap-2">
          <svg className="w-8 h-8 text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L1 7.5V13.75C1 18.31 4.21 22.5 12 24C19.79 22.5 23 18.31 23 13.75V7.5L12 2ZM12 4.3L19.92 8.5L12 12.7L4.08 8.5L12 4.3ZM5 14.5C5 15.8 5.75 16.95 7 17.65V15.5H9V19.5C6.2 18.88 5 16.81 5 14.5Z" />
          </svg>
          <p className="font-semibold text-gray-700 text-[10px] leading-tight">{displayUniversityName}</p>
        </div>
        
        <p className="text-[14px] font-bold text-orange-600 mt-2 tracking-wider">STUDENT ID CARD</p>
        <p className="text-[16px] font-extrabold text-black mt-1">{studentInfo.studentName}</p>
        
        <hr className="my-2 border-gray-300" />
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[8px] flex-grow">
          <div>
            <p className="text-gray-500 font-semibold tracking-wider">DATE OF BIRTH</p>
            <p className="text-black font-medium">{studentInfo.dob}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold tracking-wider">STUDENT ID</p>
            <p className="text-black font-medium">{studentInfo.studentId}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold tracking-wider">PHONE</p>
            <p className="text-black font-medium">{studentInfo.phone}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold tracking-wider">ADDRESS</p>
            <p className="text-black font-medium leading-tight">{studentInfo.address}</p>
          </div>
        </div>
        
        <div className="text-[8px] mt-auto">
          <p className="text-gray-500 font-semibold tracking-wider">CURRENT ACADEMIC YEAR</p>
          <p className="text-black font-medium">{studentInfo.academicYear}</p>
        </div>
      </div>
    </div>
  );
});

export default IdCard;
