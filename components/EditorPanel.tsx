
import React from 'react';
import { StudentInfo, IdCardTemplate } from '../types';
import InputField from './InputField';

interface EditorPanelProps {
  studentInfo: StudentInfo;
  template: IdCardTemplate;
  onTemplateChange: (template: IdCardTemplate) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhotoSelect: (url: string) => void;
  onGenerateSample: () => void;
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

const SCHOOLS = [
    'Community-Ed Academy',
    'CommunityNI',
    'University of Warwick',
    'Kenya Medical Training College (Kakamega)'
];

const EditorPanel: React.FC<EditorPanelProps> = ({ 
  studentInfo, 
  template, 
  onTemplateChange, 
  onInputChange, 
  onPhotoChange, 
  onLogoChange,
  onPhotoSelect,
  onGenerateSample 
}) => {
  return (
    <div className="w-full lg:w-1/2 p-6 md:p-8 space-y-4 border-r border-gray-200 overflow-y-auto" style={{ maxHeight: '90vh' }}>
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">ID Card Editor</h2>

      <div className="border-b pb-6 mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Design Template</label>
        <div className="grid grid-cols-4 gap-2">
           <button 
            onClick={() => onTemplateChange('elegant')}
            className={`py-3 px-1 rounded-lg border-2 text-[10px] md:text-xs font-bold transition-all ${
              template === 'elegant' 
                ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-md' 
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            Elegant
          </button>
          <button 
            onClick={() => onTemplateChange('modern')}
            className={`py-3 px-1 rounded-lg border-2 text-[10px] md:text-xs font-bold transition-all ${
              template === 'modern' 
                ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md' 
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            Modern
          </button>
          <button 
            onClick={() => onTemplateChange('official')}
            className={`py-3 px-1 rounded-lg border-2 text-[10px] md:text-xs font-bold transition-all ${
              template === 'official' 
                ? 'border-gray-800 bg-gray-100 text-gray-900 shadow-md' 
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            Official
          </button>
          <button 
            onClick={() => onTemplateChange('classic')}
            className={`py-3 px-1 rounded-lg border-2 text-[10px] md:text-xs font-bold transition-all ${
              template === 'classic' 
                ? 'border-orange-600 bg-orange-50 text-orange-700 shadow-md' 
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            Classic
          </button>
        </div>
      </div>

      <div className="border-b pb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Controls</label>
        
        {/* Quick Select Avatars */}
        <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Select Avatar (Male)</label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-2">
                {MALE_HEADSHOTS.map((url, index) => (
                    <button 
                        key={`male-${index}`}
                        onClick={() => onPhotoSelect(url)}
                        className={`relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden border-2 transition-all ${studentInfo.photo === url ? 'border-purple-600 ring-2 ring-purple-100 scale-110' : 'border-gray-200 hover:border-purple-400'}`}
                    >
                        <img src={url} alt={`Male Avatar ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
            
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Select Avatar (Female)</label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {FEMALE_HEADSHOTS.map((url, index) => (
                    <button 
                        key={`female-${index}`}
                        onClick={() => onPhotoSelect(url)}
                        className={`relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden border-2 transition-all ${studentInfo.photo === url ? 'border-purple-600 ring-2 ring-purple-100 scale-110' : 'border-gray-200 hover:border-purple-400'}`}
                    >
                        <img src={url} alt={`Female Avatar ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
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

          <div>
            <label htmlFor="logoUpload" className="modern-button-purple">Upload Logo</label>
            <input 
              type="file" 
              id="logoUpload" 
              accept="image/*" 
              className="hidden" 
              onChange={onLogoChange} 
            />
          </div>

          <button onClick={onGenerateSample} className="modern-button-green">
            Randomize Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
             <label className="block text-sm font-medium text-gray-700 mb-1">Select School</label>
             <div className="flex flex-wrap gap-2 mb-2">
                {SCHOOLS.map(school => (
                    <button
                        key={school}
                        onClick={() => onInputChange({ target: { name: 'universityName', value: school } } as React.ChangeEvent<HTMLInputElement>)}
                        className={`px-3 py-1.5 rounded text-xs font-bold border transition-colors ${studentInfo.universityName === school ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                    >
                        {school}
                    </button>
                ))}
             </div>
        </div>
        <InputField 
          label="University Name (Editable):" 
          name="universityName" 
          value={studentInfo.universityName} 
          onChange={onInputChange} 
        />
        <InputField 
          label="Student Name:" 
          name="studentName" 
          value={studentInfo.studentName} 
          onChange={onInputChange} 
        />
        <InputField 
          label="Date of Birth:" 
          name="dob" 
          value={studentInfo.dob} 
          onChange={onInputChange} 
        />
        <InputField 
          label="Student ID:" 
          name="studentId" 
          value={studentInfo.studentId} 
          onChange={onInputChange} 
        />
        <InputField 
          label="Phone:" 
          name="phone" 
          value={studentInfo.phone} 
          onChange={onInputChange} 
        />
        <InputField 
          label="Academic Year:" 
          name="academicYear" 
          value={studentInfo.academicYear} 
          onChange={onInputChange} 
        />
        <InputField 
          label="Blood Group:" 
          name="bloodGroup" 
          value={studentInfo.bloodGroup} 
          onChange={onInputChange} 
        />
        <InputField 
          label="Emergency Contact:" 
          name="emergencyContact" 
          value={studentInfo.emergencyContact} 
          onChange={onInputChange} 
        />
        <div className="md:col-span-2">
          <InputField 
            label="Address:" 
            name="address" 
            value={studentInfo.address} 
            onChange={onInputChange} 
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
