
import React, { useState, useEffect } from 'react';
import { StudentInfo, ToastMessage, ToastType, IdCardTemplate } from './types';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import Toast from './components/Toast';
import { generateRandomStudentInfo } from './lib/sampleData';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    universityName: 'Community-Ed Academy',
    studentName: 'EMILY WATSON',
    dob: '14 May 2004',
    studentId: 'CEA-26-8219',
    phone: '+44 7700 900461',
    address: '42 High Street, Kensington, London, SW7 2AZ, UK',
    location: 'London, UK',
    academicYear: '2026/2027',
    photo: 'https://picsum.photos/seed/ukstudent/252/324',
    logo: null,
    bloodGroup: 'O+',
    emergencyContact: '+44 7700 900999'
  });

  const [template, setTemplate] = useState<IdCardTemplate>('elegant');
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [autoTrigger, setAutoTrigger] = useState(0);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // If the university is changed, we want to auto-populate the address and details
    if (name === 'universityName') {
      const newInfo = generateRandomStudentInfo(value);
      setStudentInfo(prev => ({ ...newInfo, logo: prev.logo }));
      
      if (value === 'HeRendschule Rendsburg') {
        setTemplate('official');
      }
    } else {
      setStudentInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setStudentInfo(prev => ({ ...prev, photo: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setStudentInfo(prev => ({ ...prev, logo: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoSelect = (url: string) => {
    setStudentInfo(prev => ({ ...prev, photo: url }));
  };

  const handleGenerateSample = () => {
    const newInfo = generateRandomStudentInfo(studentInfo.universityName);
    setStudentInfo(prev => ({ ...newInfo, logo: prev.logo })); 
    showToast('Student details randomized!', 'success');
  };

  const handleAutoTrigger = () => {
    handleGenerateSample();
    setAutoTrigger(prev => prev + 1);
  };

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-100'}`}>
      <div className={`flex flex-col lg:flex-row rounded-xl shadow-2xl overflow-hidden w-full max-w-7xl border transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-white'}`}>
        <EditorPanel
          studentInfo={studentInfo}
          template={template}
          theme={theme}
          onToggleTheme={toggleTheme}
          onTemplateChange={setTemplate}
          onInputChange={handleInputChange}
          onPhotoChange={handlePhotoChange}
          onLogoChange={handleLogoChange}
          onPhotoSelect={handlePhotoSelect}
          onGenerateSample={handleGenerateSample}
          onAutoGenerate={handleAutoTrigger}
          showToast={showToast}
        />
        <PreviewPanel 
          studentInfo={studentInfo} 
          template={template}
          theme={theme}
          showToast={showToast} 
          autoTrigger={autoTrigger}
        />
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
    </div>
  );
};

export default App;
