
import React, { useState } from 'react';
import { StudentInfo, ToastMessage, ToastType, IdCardTemplate } from './types';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import Toast from './components/Toast';
import { generateRandomStudentInfo } from './lib/sampleData';

const App: React.FC = () => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    universityName: 'Community-Ed Academy',
    studentName: 'EMILY WATSON',
    dob: '14 May 2004',
    studentId: 'CEA-26-8219',
    phone: '+44 7700 900461',
    address: '42 High Street, Kensington, London, SW7 2AZ',
    academicYear: '2026/2027',
    photo: 'https://picsum.photos/seed/ukstudent/252/324',
    logo: null,
    bloodGroup: 'O+',
    emergencyContact: '+44 7700 900999'
  });

  const [template, setTemplate] = useState<IdCardTemplate>('elegant');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentInfo(prev => ({ ...prev, [name]: value }));
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
    // Pass current university to keep it fixed while randomizing other details
    const newInfo = generateRandomStudentInfo(studentInfo.universityName);
    // Keep existing logo if user uploaded one
    setStudentInfo(prev => ({ ...newInfo, logo: prev.logo })); 
    showToast('Student details randomized!', 'success');
  };

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-7xl">
        <EditorPanel
          studentInfo={studentInfo}
          template={template}
          onTemplateChange={setTemplate}
          onInputChange={handleInputChange}
          onPhotoChange={handlePhotoChange}
          onLogoChange={handleLogoChange}
          onPhotoSelect={handlePhotoSelect}
          onGenerateSample={handleGenerateSample}
        />
        <PreviewPanel 
          studentInfo={studentInfo} 
          template={template}
          showToast={showToast} 
        />
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
    </div>
  );
};

export default App;
