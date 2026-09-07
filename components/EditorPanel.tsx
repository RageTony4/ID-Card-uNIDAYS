
import React, { useState } from 'react';
import { StudentInfo, IdCardTemplate, ToastType } from '../types';
import InputField from './InputField';
import { getRandomValidUntilDate } from '../lib/sampleData';

interface EditorPanelProps {
  studentInfo: StudentInfo;
  template: IdCardTemplate;
  theme: 'light' | 'dark';
  isNameLocked?: boolean;
  onToggleNameLock?: () => void;
  isDateLocked?: boolean;
  onToggleDateLock?: () => void;
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
  "/assets/avatars/male_1.webp",
  "/assets/avatars/male_2.webp",
  "/assets/avatars/male_3.webp",
  "/assets/avatars/male_4.webp",
  "/assets/avatars/male_5.webp",
  "/assets/avatars/male_6.webp",
  "/assets/avatars/male_7.webp",
  "/assets/avatars/male_8.webp",
  "/assets/avatars/male_9.webp",
  "/assets/avatars/male_10.webp",
  "/assets/avatars/male_11.webp",
  "/assets/avatars/male_12.webp",
  "/assets/avatars/male_13.webp",
  "/assets/avatars/male_14.webp",
  "/assets/avatars/male_15.webp",
  "/assets/avatars/male_16.webp",
  "/assets/avatars/male_17.webp",
  "/assets/avatars/male_18.webp",
  "/assets/avatars/male_19.webp",
  "/assets/avatars/male_20.webp",
  "/assets/avatars/male_21.webp",
  "/assets/avatars/male_22.webp",
  "/assets/avatars/male_23.webp",
  "/assets/avatars/male_24.webp",
  "/assets/avatars/male_25.webp",
  "/assets/avatars/male_26.webp",
  "/assets/avatars/male_27.webp",
  "/assets/avatars/male_28.webp",
  "/assets/avatars/male_29.webp"
];

const FEMALE_HEADSHOTS = [
  "/assets/avatars/female_1.webp",
  "/assets/avatars/female_2.webp",
  "/assets/avatars/female_3.webp",
  "/assets/avatars/female_4.webp",
  "/assets/avatars/female_5.webp",
  "/assets/avatars/female_6.webp",
  "/assets/avatars/female_7.webp",
  "/assets/avatars/female_8.webp",
  "/assets/avatars/female_9.webp",
  "/assets/avatars/female_10.webp",
  "/assets/avatars/female_11.webp",
  "/assets/avatars/female_12.webp",
  "/assets/avatars/female_13.webp",
  "/assets/avatars/female_14.webp",
  "/assets/avatars/female_15.webp",
  "/assets/avatars/female_16.webp",
  "/assets/avatars/female_17.webp",
  "/assets/avatars/female_18.webp",
  "/assets/avatars/female_19.webp",
  "/assets/avatars/female_20.webp",
  "/assets/avatars/female_21.webp",
  "/assets/avatars/female_22.webp",
  "/assets/avatars/female_23.webp",
  "/assets/avatars/female_24.webp",
  "/assets/avatars/female_25.webp",
  "/assets/avatars/female_26.webp",
  "/assets/avatars/female_27.webp"
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
        'University of Leeds',
        'Roo University',
        'Arden University',
        'University of Buckingham',
        'University of Surrey',
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
        'Maseno University',
        'Masinde Muliro University',
        'Masinde Muliro University of Science and Technology'
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
        'Cranbourne East Secondary College',
        'Bond University',
        'University of Tasmania',
        'University of Canberra',
        'University of murdoch',
        'University of Wollongong',
        'Mini Bambini Early Learning Centre',
        'Cornerstone Community'
    ],
    'USA': [
        'The University of Texas at Austin',
        'Northwood Academy',
        'Hudson County Community College',
        'Lee University',
        'Air University',
        'Ross University',
        'ADEN University',
        'Duke University',
        'University City',
        'University of Houston',
        'University of Guam',
        'Northfield University',
        'Cole Co. R-I Middle',
        'Commack Middle School',
        'Cohagen School',
        'Coalfield School',
        'Mona School',
        'Deary School',
        'Park University'
    ],
    'Canada': [
        'Westdale Secondary School',
        'Brandon University',
        'York University',
        'Assumption University',
        'McMaster University',
        'Huntington University',
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
    ],
    'Ireland': [
        'University of Limerick',
        'University of Galway',
        'National University of Ireland',
        'Trinity University'
    ],
    'Austria': [
        'Deutsche Pop Wien',
        'Borg Murau',
        'BRG-Viktring',
        'University of Innsbruck',
        'University of Vienna',
        'University of Leoben',
        'University of Klagenfurt'
    ],
    'Malaysia': [
        'Mila University',
        'University Of Wales',
        'University of Malaya',
        'Tanta university',
        'Alexandria University',
        'Sunway University'
    ]
};

const EditorPanel: React.FC<EditorPanelProps> = ({ 
  studentInfo, 
  template, 
  theme,
  isNameLocked = true,
  onToggleNameLock,
  isDateLocked = true,
  onToggleDateLock,
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
  const [selectedCountry, setSelectedCountry] = useState<'United Kingdom' | 'Kenya' | 'Germany' | 'Australia' | 'USA' | 'Canada' | 'India' | 'France' | 'Italy' | 'Ireland' | 'Austria' | 'Malaysia'>('United Kingdom');
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (activeTab === 'edit' && panelRef.current) {
      panelRef.current.scrollTo({ top: 0 });
    }
  }, [activeTab]);

  const handleCountrySwitch = (country: 'United Kingdom' | 'Kenya' | 'Germany' | 'Australia' | 'USA' | 'Canada' | 'India' | 'France' | 'Italy' | 'Ireland' | 'Austria' | 'Malaysia') => {
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
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-11 gap-1.5">
          <button 
            onClick={() => onTemplateChange('t2')}
            className={`py-3 px-1 rounded-lg border-2 text-[10px] md:text-xs font-bold transition-all ${
              template === 't2' 
                ? 'border-[#142144] bg-[#142144]/15 text-[#142144] dark:text-amber-300 shadow-md font-black ring-2 ring-[#142144]/30' 
                : isDark ? 'border-zinc-800 text-zinc-500 hover:border-zinc-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            T2
          </button>
          <button 
            onClick={() => onTemplateChange('t1')}
            className={`py-3 px-1 rounded-lg border-2 text-[10px] md:text-xs font-bold transition-all ${
              template === 't1' 
                ? 'border-[#BF5700] bg-[#BF5700]/15 text-[#BF5700] dark:text-orange-400 shadow-md font-black ring-2 ring-[#BF5700]/30' 
                : isDark ? 'border-zinc-800 text-zinc-500 hover:border-zinc-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            T1
          </button>
          <button 
            onClick={() => onTemplateChange('d2')}
            className={`py-3 px-1 rounded-lg border-2 text-[10px] md:text-xs font-bold transition-all ${
              template === 'd2' 
                ? 'border-[#24304A] bg-[#24304A]/15 text-[#24304A] dark:text-blue-300 shadow-md font-black ring-2 ring-[#24304A]/30' 
                : isDark ? 'border-zinc-800 text-zinc-500 hover:border-zinc-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            D2
          </button>
          <button 
            onClick={() => onTemplateChange('d1')}
            className={`py-3 px-1 rounded-lg border-2 text-[10px] md:text-xs font-bold transition-all ${
              template === 'd1' 
                ? 'border-[#0B2545] bg-[#0B2545]/10 text-[#0B2545] shadow-md font-black ring-2 ring-[#0B2545]/30' 
                : isDark ? 'border-zinc-800 text-zinc-500 hover:border-zinc-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            D1
          </button>
          <button 
            onClick={() => onTemplateChange('westdale')}
            className={`py-3 px-1 rounded-lg border-2 text-[10px] md:text-xs font-bold transition-all ${
              template === 'westdale' 
                ? 'border-[#7b0d1e] bg-[#7b0d1e]/15 text-[#7b0d1e] dark:text-red-400 shadow-md font-black ring-2 ring-[#7b0d1e]/30' 
                : isDark ? 'border-zinc-800 text-zinc-500 hover:border-zinc-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            Westdale
          </button>
          <button 
            onClick={() => onTemplateChange('shepherd')}
            className={`py-3 px-1 rounded-lg border-2 text-[10px] md:text-xs font-bold transition-all ${
              template === 'shepherd' 
                ? 'border-[#2B5842] bg-[#F8F6ED] text-[#2B5842] shadow-md' 
                : isDark ? 'border-zinc-800 text-zinc-500 hover:border-zinc-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            Shepherd
          </button>
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
            onClick={() => onTemplateChange('northfield')}
            className={`py-3 px-1 rounded-lg border-2 text-[10px] md:text-xs font-bold transition-all ${
              template === 'northfield' 
                ? 'border-[#002B49] bg-[#E2EAF4] text-[#002B49] shadow-md' 
                : isDark ? 'border-zinc-800 text-zinc-500 hover:border-zinc-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            Northfield
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
                        <img 
                            src={url} 
                            alt={`Male Avatar ${index + 1}`} 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/male_1.webp'; }}
                        />
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
                        <img 
                            src={url} 
                            alt={`Female Avatar ${index + 1}`} 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatars/female_1.webp'; }}
                        />
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
                 <button 
                    onClick={() => handleCountrySwitch('Ireland')}
                    className={`flex-1 py-2 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all border-2 ${selectedCountry === 'Ireland' ? 'bg-emerald-700 border-emerald-700 text-white shadow-md' : isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600' : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-300'}`}
                 >
                     Ireland Schools
                 </button>
                 <button 
                    onClick={() => handleCountrySwitch('Austria')}
                    className={`flex-1 py-2 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all border-2 ${selectedCountry === 'Austria' ? 'bg-red-700 border-red-700 text-white shadow-md' : isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600' : 'bg-white border-gray-200 text-gray-500 hover:border-red-300'}`}
                 >
                     Austria Schools
                 </button>
                 <button 
                    onClick={() => handleCountrySwitch('Malaysia')}
                    className={`flex-1 py-2 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all border-2 ${selectedCountry === 'Malaysia' ? 'bg-teal-600 border-teal-600 text-white shadow-md' : isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600' : 'bg-white border-gray-200 text-gray-500 hover:border-teal-300'}`}
                 >
                     Malaysia Schools
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
                <div className="flex items-center gap-1.5">
                    {onToggleNameLock && (
                      <button 
                          type="button"
                          onClick={onToggleNameLock}
                          className={`text-[10px] font-bold flex items-center gap-1 transition-all px-2 py-0.5 rounded border ${
                              isNameLocked 
                                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 font-black shadow-sm' 
                                  : isDark ? 'text-zinc-400 hover:text-zinc-200 border-zinc-700 hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 border-gray-300 hover:bg-gray-100'
                          }`}
                          title={isNameLocked ? "Student Name is LOCKED (Will not change when switching schools or randomizing)" : "Student Name is UNLOCKED (Click to lock name)"}
                      >
                          {isNameLocked ? (
                              <>
                                  <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                                  <span>LOCKED NAME</span>
                              </>
                          ) : (
                              <>
                                  <svg className="w-3 h-3 opacity-70" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" /></svg>
                                  <span>LOCK NAME</span>
                              </>
                          )}
                      </button>
                    )}
                    {onToggleDateLock && (
                      <button 
                          type="button"
                          onClick={onToggleDateLock}
                          className={`text-[10px] font-bold flex items-center gap-1 transition-all px-2 py-0.5 rounded border ${
                              isDateLocked 
                                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 font-black shadow-sm' 
                                  : isDark ? 'text-zinc-400 hover:text-zinc-200 border-zinc-700 hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 border-gray-300 hover:bg-gray-100'
                          }`}
                          title={isDateLocked ? "Dates are LOCKED (Will not change when switching schools or randomizing)" : "Dates are UNLOCKED (Click to lock dates)"}
                      >
                          {isDateLocked ? (
                              <>
                                  <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                                  <span>LOCKED DATE</span>
                              </>
                          ) : (
                              <>
                                  <svg className="w-3 h-3 opacity-70" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" /></svg>
                                  <span>LOCK DATE</span>
                              </>
                          )}
                      </button>
                    )}
                    <button 
                        onClick={handleCopyName}
                        className={`text-[10px] font-bold flex items-center gap-1 transition-colors px-1.5 py-0.5 rounded ${isDark ? 'text-indigo-400 hover:text-indigo-300 hover:bg-zinc-800' : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'}`}
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        COPY
                    </button>
                </div>
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
          label="Date of Birth:" 
          name="dob" 
          value={studentInfo.dob} 
          onChange={onInputChange}
          isDark={isDark}
          placeholder="e.g. 12 May 2005"
        />
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
          label="Current Status:" 
          name="status" 
          value={studentInfo.status} 
          onChange={onInputChange}
          isDark={isDark}
          placeholder="e.g. Currently Enrolled"
        />
        <InputField 
          label="Issue Date:" 
          name="issueDate" 
          value={studentInfo.issueDate} 
          onChange={onInputChange}
          isDark={isDark}
        />
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="validUntil" className={`block text-sm font-medium ${isDark ? 'text-zinc-400' : 'text-gray-700'}`}>
              Valid Until Date:
            </label>
            <div className="flex items-center gap-1.5">
              {onToggleDateLock && (
                <button 
                    type="button"
                    onClick={onToggleDateLock}
                    className={`text-[10px] font-bold flex items-center gap-1 transition-all px-2 py-0.5 rounded border ${
                        isDateLocked 
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 font-black shadow-sm' 
                            : isDark ? 'text-zinc-400 hover:text-zinc-200 border-zinc-700 hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 border-gray-300 hover:bg-gray-100'
                    }`}
                    title={isDateLocked ? "Dates are LOCKED (Will not change when switching schools or randomizing)" : "Dates are UNLOCKED (Click to lock dates)"}
                >
                    {isDateLocked ? (
                        <>
                            <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                            <span>LOCKED</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-3 h-3 opacity-70" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" /></svg>
                            <span>LOCK DATE</span>
                        </>
                    )}
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  const newDate = getRandomValidUntilDate();
                  onInputChange({
                    target: { name: 'validUntil', value: newDate }
                  } as React.ChangeEvent<HTMLInputElement>);
                  showToast(`Valid Until date set to ${newDate}`, 'success');
                }}
                className={`text-[10px] font-bold flex items-center gap-1 transition-colors px-1.5 py-0.5 rounded ${isDark ? 'text-emerald-400 hover:text-emerald-300 hover:bg-zinc-800' : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50'}`}
                title="Generate Random Date between 10/08/2027 and 30/09/2027"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                Randomize (Aug-Sep '27)
              </button>
            </div>
          </div>
          <input
            type="text"
            id="validUntil"
            name="validUntil"
            value={studentInfo.validUntil}
            onChange={onInputChange}
            placeholder="e.g. 10/08/2027 or 31 Aug 2027"
            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-300 ${isDark ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-white border-gray-300 text-black'}`}
          />
        </div>
        <InputField 
          label="Institution Website:" 
          name="website" 
          value={studentInfo.website} 
          onChange={onInputChange}
          isDark={isDark}
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
