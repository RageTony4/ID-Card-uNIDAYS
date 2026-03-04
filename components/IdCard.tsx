
import React, { forwardRef } from 'react';
import { StudentInfo, IdCardTemplate } from '../types';

interface IdCardProps {
  studentInfo: StudentInfo;
  side?: 'front' | 'back';
  template?: IdCardTemplate;
}

const IdCard = forwardRef<HTMLDivElement, IdCardProps>(({ studentInfo, side = 'front', template = 'elegant' }, ref) => {
  
  // Common Back Side for Classic/Elegant/Modern
  if (side === 'back') {
    if (template === 'official') {
        return (
          <div ref={ref} className="id-card-container id-card-back shadow-lg bg-white overflow-hidden rounded-xl border border-gray-200">
             {/* Magnetic Stripe */}
             <div className="h-10 w-full mt-4 bg-black"></div>
             
             <div className="p-6 flex flex-col h-full items-center text-center justify-center">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-12 h-12 mb-2 flex items-center justify-center">
                        {studentInfo.logo ? (
                            <img src={studentInfo.logo} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold text-xs">LOGO</div>
                        )}
                    </div>
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">{studentInfo.universityName}</h3>
                </div>

                <div className="text-[9px] text-gray-600 space-y-2 w-4/5">
                    <div className="border-t border-b border-gray-100 py-2 mb-2">
                        <p className="font-bold text-black uppercase">{studentInfo.studentName}</p>
                        <p className="font-medium text-gray-500">{studentInfo.academicYear}</p>
                    </div>
                    <p>Loss of this card should be reported as soon as possible to the Student Administration Centre.</p>
                    <p>If this card is found, please contact the Student Administration Centre, {studentInfo.universityName} or return to {studentInfo.address}.</p>
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
      <div ref={ref} className="id-card-container id-card-back shadow-lg bg-white overflow-hidden">
         {/* Magnetic Stripe */}
         <div className={`h-10 w-full mt-4 ${stripeColor}`}></div>
         
         <div className="p-4 flex flex-col h-full">
            <div className="flex justify-between items-start">
                <div className="text-[10px] text-gray-600 w-2/3 leading-tight">
                    <p>This card is the property of <span className="font-bold text-black">{studentInfo.universityName}</span>.</p>
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
                    <p className="text-gray-600">{studentInfo.universityName}</p>
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

    // Official Template Scaling
    const officialUniFontSize = studentInfo.universityName.length > 30 ? 'text-[9px]' : 'text-[11px]';
    const officialNameFontSize = studentInfo.studentName.length > 25 ? 'text-[10px]' : studentInfo.studentName.length > 18 ? 'text-[12px]' : 'text-[14px]';

  // Official Template (Based on provided image)
  if (template === 'official') {
    return (
      <div ref={ref} className="id-card-container shadow-lg bg-white overflow-hidden flex flex-col relative rounded-xl border border-gray-100">
        
        {/* Main Layout: Top to bottom of content area leaving space (pb-12) for footer barcode */}
        <div className="flex flex-row h-full p-4 pb-12"> 
            
            {/* Left Content Column */}
            <div className="flex flex-col w-[65%] pr-2 h-full">
                
                {/* Header Section */}
                <div className="flex items-center mb-3">
                    <div className="w-9 h-9 mr-2 flex-shrink-0 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-sm overflow-hidden">
                        {studentInfo.logo ? (
                            <img src={studentInfo.logo} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                        ) : (
                            <span className="text-[8px] font-bold text-gray-300">LOGO</span>
                        )}
                    </div>
                    <div className="flex flex-col justify-center">
                         {/* School Name: Bold */}
                        {studentInfo.universityName === 'HeRendschule Rendsburg' ? (
                            <>
                                <h1 className="text-[13px] font-bold text-blue-600 leading-tight">
                                    Shepherd School
                                </h1>
                                <p className="text-[8px] font-medium text-gray-500 leading-none">HeRendschule Rendsburg</p>
                                <p className="text-[8px] font-medium text-gray-500 leading-none">Rendsburg</p>
                            </>
                        ) : (
                            <h1 className={`font-black text-gray-900 leading-tight uppercase tracking-tight ${officialUniFontSize}`}>
                                {studentInfo.universityName}
                            </h1>
                        )}
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-lg font-black text-gray-800 mb-2 tracking-tight">Student Card</h2>
                
                {/* Key Details */}
                <div className="space-y-1 mb-2">
                    {/* Expiry Date */}
                    <div className="flex items-baseline text-[10px]">
                         <span className="text-gray-500 font-medium w-14">Expires</span>
                         <span className="font-black text-black">{expiryDateString}</span>
                    </div>
                    
                    {/* ID */}
                    <div className="flex items-baseline text-[10px]">
                         <span className="text-gray-500 font-medium w-14">ID No</span>
                         <span className="font-black text-black">{studentInfo.studentId}</span>
                    </div>
                    
                     {/* Enrolled - Updated to 2026 */}
                    <div className="flex items-baseline text-[10px]">
                         <span className="text-gray-500 font-medium w-14">Enrolled</span>
                         <span className="font-black text-black">2026</span>
                    </div>
                </div>

                {/* Student Name Section - Pushed down to just above padding */}
                <div className="mt-auto">
                    <p className={`${officialNameFontSize} font-black text-black leading-none uppercase tracking-wide mb-0.5`}>
                        {studentInfo.studentName}
                    </p>
                    <p className="text-[10px] font-bold text-gray-600 uppercase">
                        {studentInfo.academicYear}
                    </p>
                </div>
            </div>

            {/* Right Photo Column */}
            <div className="w-[35%] h-full flex flex-col items-end pt-1">
                <div className="w-full aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden shadow-sm border border-gray-200">
                    <img 
                        src={studentInfo.photo || 'https://picsum.photos/252/324'} 
                        alt="Student" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                </div>
            </div>
        </div>
        
        {/* Footer Barcode - Absolute positioned in the reserved padding area */}
        <div className="absolute bottom-3 left-4 right-4 h-8 flex flex-col justify-center">
            <div className="barcode w-full h-full opacity-90"></div>
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
    const uniNameLength = studentInfo.universityName.length;
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
                        {studentInfo.universityName}
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
                        {studentInfo.universityName.split(' ')[0]}
                    </span>
                    <span className="text-blue-200 text-[6px] font-medium leading-none tracking-wider uppercase">
                        {studentInfo.universityName.split(' ').slice(1).join(' ')}
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
          <p className="font-semibold text-gray-700 text-[10px] leading-tight">{studentInfo.universityName}</p>
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
