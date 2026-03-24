
import React, { useState } from 'react';
import { StudentInfo, IdCardTemplate, ToastType } from '../types';
import InputField from './InputField';

interface EditorPanelProps {
  studentInfo: StudentInfo;
  template: IdCardTemplate;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onTemplateChange: (template: IdCardTemplate) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhotoSelect: (url: string) => void;
  onGenerateSample: () => void;
  onAutoGenerate?: () => void;
  showToast: (message: string, type: ToastType) => void;
  setActiveTab: (tab: 'edit' | 'preview') => void;
  activeTab: 'edit' | 'preview';
}

const MALE_HEADSHOTS = [
  "https://files.catbox.moe/m7lj8u.png",
  "https://files.catbox.moe/u1skwz.png",
  "https://files.catbox.moe/z2ersq.png",
  "https://files.catbox.moe/3kliif.png",
  "https://files.catbox.moe/a4f1ct.png",
  "https://files.catbox.moe/8eq6dp.png"
];

const FEMALE_HEADSHOTS = [
  "https://files.catbox.moe/bx9f18.png",
  "https://files.catbox.moe/w22pf1.png",
  "https://files.catbox.moe/4w42hk.png",
  "https://files.catbox.moe/c0ot8t.png"
];

const SCHOOL_DATA = {
    'United Kingdom': [
        'Community-Ed Academy',
        'Birmingham City FC Community Trust',
        'Communicate School',
        'Manchester Communication Academy',
        'Ysgol Comins Coch',
        'Adanac Commercial College',
        'Giggleswick School',
        'Carlton Keighley',
        'CommunityNI',
        'University of Warwick',
        'Brookfield Community School',
        'Cranford Community College',
        'Delgado Community College',
        'Faringdon Community College',
        'Heston Community School',
        'Hinds Community College',
        'Knowsley Community College',
        'Laurelhill Community College',
        'Bournemouth University',
        'Church Stretton School'
    ],
    'Kenya': [
        'Kenya Medical Training College (Kakamega)',
        'Alliance High School',
        'Maseno University'
    ],
    'Germany': [
        'Salem Community School',
        'Shepherd School',
        'Fichteschule',
        'JurGrad gGmbH',
        'oeoemrang-Skuul',
        'Fritz-Henßler-Berufskolleg*',
        'Luise-Henriette-Gymnasium*',
        'Städtisches Gymnasium Hennef*'
    ],
    'Australia': [
        'Cornerstone Community'
    ],
    'USA': [
        'Cole Co. R-I Middle',
        'Commack Middle School',
        'Cohagen School',
        'Coalfield School',
        'Mona School',
        'Deary School',
        'Park University'
    ],
    'Canada': [
        'DelMar College',
        'Cargair, St-Hubert',
        'Kikino School',
        'Cegep Limoilou',
        'Dental Dynamic Institute',
        'Kikkawa College',
        'Kootenay Columbia College',
        'Cegep Gerald-Godin',
        'École Mathieu-Martin'
    ],
    'India': [
        'Degloor College Degloor',
        'FEEDS College',
        'Tihu College',
        'Tikrikilla College',
        'DIET Dibrugarh',
        'Dibru College',
        'Beant College of Engineering & Technology',
        'SRM TRP Engineering College',
        'St. Stephen\'s College',
        'Stella Maris College',
        'Stella Mary\'s College of Engineering',
        'Amrita Vishwa Vidyapeetham',
        'Atal Bihari Vajpayee Vishwavidyalaya'
    ],
    'France': [
        'Lycée Delamare-Deboutteville',
        'Terre & Feu',
        'Hiloza',
        'Ecole Kienz',
        'MFR Vernines',
        'Next Advance'
    ],
    'Italy': [
        'Università di Bologna',
        'Università di Roma La Sapienza',
        'Politecnico di Milano',
        'Università di Padova',
        'Università di Firenze',
        'Università di Napoli Federico II'
    ]
};

const EditorPanel: React.FC<EditorPanelProps> = ({ 
  studentInfo, 
  template, 
  theme,
  onToggleTheme,
  onTemplateChange, 
  onInputChange, 
  onPhotoChange, 
  onPhotoSelect,
  onGenerateSample,
  onAutoGenerate,
  showToast,
  setActiveTab,
  activeTab
}) => {
  const [selectedCountry, setSelectedCountry] = useState<'United Kingdom' | 'Kenya' | 'Germany' | 'Australia' | 'USA' | 'Canada' | 'India' | 'France' | 'Italy'>('United Kingdom');
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (activeTab === 'edit' && panelRef.current) {
      panelRef.current.scrollTo({ top: 0 });
    }
  }, [activeTab]);

  const handleCountrySwitch = (country: 'United Kingdom' | 'Kenya' | 'Germany' | 'Australia' | 'USA' | 'Canada' | 'India' | 'France' | 'Italy') => {
    setSelectedCountry(country);
    const firstSchool = SCHOOL_DATA[country][0].replace(/\*$/, '');
    const event = {
        target: {
            name: 'universityName',
            value: firstSchool
        }
    } as React.ChangeEvent<HTMLSelectElement>;
    onInputChange(event);
  };

  const handleCopyName = () => {
    if (studentInfo.studentName) {
      navigator.clipboard.writeText(studentInfo.studentName)
        .then(() => showToast("Name copied to clipboard!", "success"))
        .catch(() => showToast("Failed to copy name.", "error"));
    }
  };

  const handleCopySchool = () => {
    if (studentInfo.universityName) {
      navigator.clipboard.writeText(studentInfo.universityName)
        .then(() => showToast("School name copied to clipboard!", "success"))
        .catch(() => showToast("Failed to copy school name.", "error"));
    }
  };

  const handleAutoGenerate = () => {
    if (onAutoGenerate) {
      onAutoGenerate();
    }
  };

  const handleRandomize = () => {
    onGenerateSample();
  };

  const isDark = theme === 'dark';

  return (
    <div ref={panelRef} className={`w-full p-6 md:p-8 space-y-4 border-r overflow-y-auto transition-colors duration-300 ${isDark ? 'border-zinc-800 text-zinc-100' : 'border-gray-200 text-gray-800'} lg:max-h-[90vh] pb-24 lg:pb-8`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>ID Card Editor</h2>
        <button 
          onClick={onToggleTheme}
          className={`p-2 rounded-full transition-colors ${isDark ? 'bg-zinc-800 text-yellow-400 hover:bg-zinc-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          title="Toggle Light/Dark Mode"
        >
          {isDark ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
          )}
        </button>
      </div>

      <div className={`border-b pb-6 mb-4 ${isDark ? 'border-zinc-800' : 'border-gray-200'}`}>
        <label className={`block text-sm font-bold mb-3 uppercase tracking-wide ${isDark ? 'text-zinc-400' : 'text-gray-700'}`}>Design Template</label>
        <div className="grid grid-cols-5 gap-2">
           <button 
            onClick={() => onTemplateChange('elegant')}
            className={`py-3 px-1 rounded-lg border-2 text-[10px] md:text-xs font-bold transition-all ${
              template === 'elegant' 
                ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-md' 
                : isDark ? 'border-zinc-800 text-zinc-500 hover:border-zinc-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            Elegant
          </button>
          <button 
            onClick={() => onTemplateChange('modern')}
            className={`py-3 px-1 rounded-lg border-2 text-[10px] md:text-xs font-bold transition-all ${
              template === 'modern' 
                ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md' 
                : isDark ? 'border-zinc-800 text-zinc-500 hover:border-zinc-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            Modern
          </button>
          <button 
            onClick={() => onTemplateChange('official')}
            className={`py-3 px-1 rounded-lg border-2 text-[10px] md:text-xs font-bold transition-all ${
              template === 'official' 
                ? isDark ? 'border-zinc-400 bg-zinc-700 text-white' : 'border-gray-800 bg-gray-100 text-gray-900 shadow-md' 
                : isDark ? 'border-zinc-800 text-zinc-500 hover:border-zinc-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            Official
          </button>
          <button 
            onClick={() => onTemplateChange('classic')}
            className={`py-3 px-1 rounded-lg border-2 text-[10px] md:text-xs font-bold transition-all ${
              template === 'classic' 
                ? 'border-orange-600 bg-orange-50 text-orange-700 shadow-md' 
                : isDark ? 'border-zinc-800 text-zinc-500 hover:border-zinc-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            Classic
          </button>
          <button 
            onClick={() => onTemplateChange('training')}
            className={`py-3 px-1 rounded-lg border-2 text-[10px] md:text-xs font-bold transition-all ${
              template === 'training' 
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md' 
                : isDark ? 'border-zinc-800 text-zinc-500 hover:border-zinc-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            UoN
          </button>
        </div>
      </div>

      <div className={`border-b pb-4 ${isDark ? 'border-zinc-800' : 'border-gray-200'}`}>
        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-zinc-300' : 'text-gray-700'}`}>Controls</label>
        
        <div className="mb-4">
            <label className={`block text-xs font-bold mb-2 uppercase tracking-wide ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>Select Avatar (Male)</label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-2">
                {MALE_HEADSHOTS.map((url, index) => (
                    <button 
                        key={`male-${index}`}
                        onClick={() => onPhotoSelect(url)}
                        className={`relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden border-2 transition-all ${studentInfo.photo === url ? 'border-purple-600 ring-2 ring-purple-100 scale-110' : isDark ? 'border-zinc-800 hover:border-zinc-600' : 'border-gray-200 hover:border-purple-400'}`}
                    >
                        <img src={url} alt={`Male Avatar ${index + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                ))}
            </div>
            
            <label className={`block text-xs font-bold mb-2 uppercase tracking-wide ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>Select Avatar (Female)</label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {FEMALE_HEADSHOTS.map((url, index) => (
                    <button 
                        key={`female-${index}`}
                        onClick={() => onPhotoSelect(url)}
                        className={`relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden border-2 transition-all ${studentInfo.photo === url ? 'border-purple-600 ring-2 ring-purple-100 scale-110' : isDark ? 'border-zinc-800 hover:border-zinc-600' : 'border-gray-200 hover:border-purple-400'}`}
                    >
                        <img src={url} alt={`Female Avatar ${index + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                ))}
            </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-2 w-full mb-2">
            <button onClick={handleAutoGenerate} className="modern-button-blue">
                Auto
            </button>
            <button onClick={handleRandomize} className="modern-button-green">
                Randomize Data
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <div>
              <label htmlFor="studentPhotoUpload" className="modern-button">Upload Photo</label>
              <input 
                type="file" 
                id="studentPhotoUpload" 
                accept="image/*" 
                className="hidden" 
                onChange={onPhotoChange} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
             <label className={`block text-sm font-bold mb-2 uppercase tracking-wide ${isDark ? 'text-zinc-400' : 'text-gray-700'}`}>Select Country</label>
             <div className="flex flex-wrap gap-2 mb-3">
                 <button 
                    onClick={() => handleCountrySwitch('United Kingdom')}
                    className={`flex-1 py-2 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all border-2 ${selectedCountry === 'United Kingdom' ? 'bg-blue-600 border-blue-600 text-white shadow-md' : isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600' : 'bg-white border-gray-200 text-gray-500 hover:border-blue-300'}`}
                 >
                     UK Schools
                 </button>
                 <button 
                    onClick={() => handleCountrySwitch('Kenya')}
                    className={`flex-1 py-2 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all border-2 ${selectedCountry === 'Kenya' ? 'bg-red-600 border-red-600 text-white shadow-md' : isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600' : 'bg-white border-gray-200 text-gray-500 hover:border-red-300'}`}
                 >
                     Kenya Schools
                 </button>
                 <button 
                    onClick={() => handleCountrySwitch('Germany')}
                    className={`flex-1 py-2 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all border-2 ${selectedCountry === 'Germany' ? 'bg-yellow-600 border-yellow-600 text-white shadow-md' : isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600' : 'bg-white border-gray-200 text-gray-500 hover:border-yellow-300'}`}
                 >
                     Germany Schools
                 </button>
                 <button 
                    onClick={() => handleCountrySwitch('Australia')}
                    className={`flex-1 py-2 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all border-2 ${selectedCountry === 'Australia' ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' : isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600' : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-300'}`}
                 >
                     Australia Schools
                 </button>
                 <button 
                    onClick={() => handleCountrySwitch('USA')}
                    className={`flex-1 py-2 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all border-2 ${selectedCountry === 'USA' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600' : 'bg-white border-gray-200 text-gray-500 hover:border-indigo-300'}`}
                 >
                     USA Schools
                 </button>
                 <button 
                    onClick={() => handleCountrySwitch('Canada')}
                    className={`flex-1 py-2 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all border-2 ${selectedCountry === 'Canada' ? 'bg-red-600 border-red-600 text-white shadow-md' : isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600' : 'bg-white border-gray-200 text-gray-500 hover:border-red-300'}`}
                 >
                     Canada Schools
                 </button>
                 <button 
                    onClick={() => handleCountrySwitch('India')}
                    className={`flex-1 py-2 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all border-2 ${selectedCountry === 'India' ? 'bg-orange-600 border-orange-600 text-white shadow-md' : isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600' : 'bg-white border-gray-200 text-gray-500 hover:border-orange-300'}`}
                 >
                     India Schools
                 </button>
                 <button 
                    onClick={() => handleCountrySwitch('France')}
                    className={`flex-1 py-2 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all border-2 ${selectedCountry === 'France' ? 'bg-blue-700 border-blue-700 text-white shadow-md' : isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600' : 'bg-white border-gray-200 text-gray-500 hover:border-blue-300'}`}
                 >
                     France Schools
                 </button>
                 <button 
                    onClick={() => handleCountrySwitch('Italy')}
                    className={`flex-1 py-2 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all border-2 ${selectedCountry === 'Italy' ? 'bg-green-700 border-green-700 text-white shadow-md' : isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600' : 'bg-white border-gray-200 text-gray-500 hover:border-green-300'}`}
                 >
                     Italy Schools
                 </button>
             </div>

             <label htmlFor="universitySelect" className={`block text-sm font-medium mb-1 ${isDark ? 'text-zinc-400' : 'text-gray-700'}`}>Select School</label>
             <select 
                id="universitySelect"
                name="universityName"
                value={studentInfo.universityName}
                onChange={onInputChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-300 ${isDark ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'} font-medium`}
             >
                {SCHOOL_DATA[selectedCountry].map((school) => (
                    <option key={school} value={school.replace(/\*$/, '')}>
                        {school}
                    </option>
                ))}
             </select>
        </div>
        <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
                <label htmlFor="universityName" className={`block text-sm font-medium transition-colors duration-300 ${isDark ? 'text-zinc-400' : 'text-gray-700'}`}>University Name (Manual Edit):</label>
                <button 
                    onClick={handleCopySchool}
                    className={`text-[10px] font-bold flex items-center gap-1 transition-colors px-1 rounded ${isDark ? 'text-indigo-400 hover:text-indigo-300 hover:bg-zinc-800' : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'}`}
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    COPY
                </button>
            </div>
            <input
                type="text"
                id="universityName"
                name="universityName"
                value={studentInfo.universityName}
                onChange={onInputChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-300 ${isDark ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-white border-gray-300 text-black'}`}
            />
        </div>
        <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
                <label className={`block text-sm font-medium ${isDark ? 'text-zinc-400' : 'text-gray-700'}`}>Student Name:</label>
                <button 
                    onClick={handleCopyName}
                    className={`text-[10px] font-bold flex items-center gap-1 transition-colors px-1 rounded ${isDark ? 'text-indigo-400 hover:text-indigo-300 hover:bg-zinc-800' : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'}`}
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    COPY
                </button>
            </div>
            <input
                type="text"
                name="studentName"
                value={studentInfo.studentName}
                onChange={onInputChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-300 ${isDark ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300 text-black'}`}
            />
        </div>
        <InputField 
          label="Student ID:" 
          name="studentId" 
          value={studentInfo.studentId} 
          onChange={onInputChange}
          isDark={isDark}
        />
        <InputField 
          label="Phone:" 
          name="phone" 
          value={studentInfo.phone} 
          onChange={onInputChange}
          isDark={isDark}
        />
        <InputField 
          label="Academic Year:" 
          name="academicYear" 
          value={studentInfo.academicYear} 
          onChange={onInputChange}
          isDark={isDark}
        />
        <InputField 
          label="Course / Enrollment:" 
          name="course" 
          value={studentInfo.course} 
          onChange={onInputChange}
          isDark={isDark}
          placeholder="e.g. Bachelor of Computer Science"
        />
        <InputField 
          label="Blood Group:" 
          name="bloodGroup" 
          value={studentInfo.bloodGroup} 
          onChange={onInputChange}
          isDark={isDark}
        />
        <InputField 
          label="Emergency Contact:" 
          name="emergencyContact" 
          value={studentInfo.emergencyContact} 
          onChange={onInputChange}
          isDark={isDark}
        />
        <InputField 
          label="Location (City, Country):" 
          name="location" 
          value={studentInfo.location} 
          onChange={onInputChange}
          isDark={isDark}
        />
        <div className="md:col-span-2">
          <InputField 
            label="Address:" 
            name="address" 
            value={studentInfo.address} 
            onChange={onInputChange}
            isDark={isDark}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
