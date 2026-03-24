
import React, { useState, useEffect } from 'react';
import { StudentInfo, ToastMessage, ToastType, IdCardTemplate } from './types';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import Toast from './components/Toast';
import { generateRandomStudentInfo } from './lib/sampleData';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('id_gen_theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  const [studentInfo, setStudentInfo] = useState<StudentInfo>(() => {
    const saved = localStorage.getItem('id_gen_student_info');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved student info', e);
      }
    }
    return {
      universityName: 'Community-Ed Academy',
      studentName: 'EMILY WATSON',
      studentId: 'CEA-26-8219',
      phone: '+44 7700 900461',
      address: '42 High Street, Kensington, London, SW7 2AZ, UK',
      location: 'London, UK',
      academicYear: '2026/2027',
      course: 'Bachelor of Computer Science',
      photo: 'https://picsum.photos/seed/ukstudent/252/324',
      logo: null,
      bloodGroup: 'O+',
      emergencyContact: '+44 7700 900999'
    };
  });

  const [template, setTemplate] = useState<IdCardTemplate>(() => {
    const saved = localStorage.getItem('id_gen_template');
    return (saved as IdCardTemplate) || 'elegant';
  });

  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [autoTrigger, setAutoTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('id_gen_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('id_gen_student_info', JSON.stringify(studentInfo));
  }, [studentInfo]);

  useEffect(() => {
    localStorage.setItem('id_gen_template', template);
  }, [template]);

  useEffect(() => {
    const CATBOX_URLS = [
      "https://files.catbox.moe/m7lj8u.png",
      "https://files.catbox.moe/u1skwz.png",
      "https://files.catbox.moe/z2ersq.png",
      "https://files.catbox.moe/3kliif.png",
      "https://files.catbox.moe/a4f1ct.png",
      "https://files.catbox.moe/8eq6dp.png",
      "https://files.catbox.moe/bx9f18.png",
      "https://files.catbox.moe/w22pf1.png",
      "https://files.catbox.moe/4w42hk.png",
      "https://files.catbox.moe/c0ot8t.png",
      "https://files.catbox.moe/021b0u.png",
      "https://files.catbox.moe/6rjppv.jfif",
      "https://files.catbox.moe/j9s890.png",
      "https://files.catbox.moe/0nk6tf.png",
      "https://files.catbox.moe/jkxmsd.png",
      "https://files.catbox.moe/mdd3ye.png"
    ];

    CATBOX_URLS.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // If the university is changed, we want to auto-populate the address and details
    if (name === 'universityName') {
      const newInfo = generateRandomStudentInfo(value);
      setStudentInfo(prev => ({ ...newInfo, logo: prev.logo }));
      
      if (value === 'Shepherd School') {
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
    const newInfo = generateRandomStudentInfo(studentInfo.universityName);
    setStudentInfo(prev => ({ ...newInfo, logo: prev.logo }));
    setAutoTrigger(prev => prev + 1);
    
    // Copy the new name to clipboard
    if (newInfo.studentName) {
      navigator.clipboard.writeText(newInfo.studentName)
        .then(() => showToast(`Name "${newInfo.studentName}" copied to clipboard!`, 'success'))
        .catch(() => showToast('Failed to copy name to clipboard', 'error'));
    }
  };

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-0 md:p-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-100'}`}>
      {/* Mobile Tab Switcher */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <button 
          onClick={() => setActiveTab('edit')}
          className={`px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'edit' ? 'bg-white text-black shadow-lg scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Edit
        </button>
        <button 
          onClick={() => setActiveTab('preview')}
          className={`px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'preview' ? 'bg-white text-black shadow-lg scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Preview
        </button>
      </div>

      <div className={`flex flex-col lg:flex-row rounded-none md:rounded-xl shadow-2xl overflow-hidden w-full max-w-[1600px] border transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-white'}`}>
        <div className={`${activeTab === 'edit' ? 'block' : 'hidden'} lg:block w-full lg:w-1/2`}>
          <EditorPanel
            studentInfo={studentInfo}
            template={template}
            theme={theme}
            onToggleTheme={toggleTheme}
            onTemplateChange={setTemplate}
            onInputChange={handleInputChange}
            onPhotoChange={handlePhotoChange}
            onPhotoSelect={handlePhotoSelect}
            onGenerateSample={handleGenerateSample}
            onAutoGenerate={handleAutoTrigger}
            showToast={showToast}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
        <div className={`${activeTab === 'preview' ? 'block' : 'absolute top-0 left-0 opacity-0 pointer-events-none lg:static lg:block lg:opacity-100 lg:pointer-events-auto'} w-full lg:w-1/2`}>
          <PreviewPanel 
            studentInfo={studentInfo} 
            template={template}
            theme={theme}
            showToast={showToast} 
            autoTrigger={autoTrigger}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
    </div>
  );
};

export default App;
