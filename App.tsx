
import React, { useState, useEffect } from 'react';
import { StudentInfo, ToastMessage, ToastType, IdCardTemplate, GenerationHistoryItem } from './types';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import Toast from './components/Toast';
import { generateRandomStudentInfo, getRandomValidUntilDate } from './lib/sampleData';
import { copyTextToClipboard } from './lib/clipboard';
import {
  AvatarBgOption,
  AvatarProviderOption,
  AvatarGenderOption,
  GeneratedAvatarItem,
  RECRAFT_FREE_CUTOFF,
  generateUniqueStudentAvatar
} from './lib/avatarGenerator';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('id_gen_theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  const [studentInfo, setStudentInfo] = useState<StudentInfo>(() => {
    const saved = localStorage.getItem('id_gen_student_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          !parsed.photo ||
          parsed.photo.includes('catbox.moe') ||
          parsed.photo.includes('picsum.photos') ||
          parsed.photo.includes('any-link-me') ||
          parsed.photo.includes('xsgames.co') ||
          parsed.photo.includes('randomuser.me') ||
          parsed.photo.includes('thispersondoesnotexist.com')
        ) {
          parsed.photo = generateRandomStudentInfo(parsed.universityName || 'Community-Ed Academy').photo;
        }
        parsed.logo = null;
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved student info', e);
      }
    }
    return generateRandomStudentInfo('Community-Ed Academy');
  });

  const [template, setTemplate] = useState<IdCardTemplate>(() => {
    const saved = localStorage.getItem('id_gen_template');
    if (saved === 'training') return 'northfield';
    return (saved as IdCardTemplate) || 'elegant';
  });

  const [t1Variant, setT1Variant] = useState<'white' | 'dark'>(() => {
    const saved = localStorage.getItem('id_gen_t1_variant');
    return (saved === 'dark' || saved === 'white') ? saved : 'white';
  });

  const [avatarSide, setAvatarSide] = useState<'left' | 'right'>(() => {
    const saved = localStorage.getItem('id_gen_avatar_side');
    return (saved === 'left' || saved === 'right') ? saved : 'right';
  });

  const [isNameLocked, setIsNameLocked] = useState<boolean>(() => {
    const saved = localStorage.getItem('id_gen_name_locked');
    return saved !== null ? saved === 'true' : true;
  });

  const [isDateLocked, setIsDateLocked] = useState<boolean>(() => {
    const saved = localStorage.getItem('id_gen_date_locked');
    return saved !== null ? saved === 'true' : true;
  });

  // AI Avatar Generator Toggle & Settings (Default OFF so it only generates when turned ON)
  const [isAiAvatarEnabled, setIsAiAvatarEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('id_gen_ai_avatar_enabled');
    return saved === 'true';
  });

  const [aiAvatarBg, setAiAvatarBg] = useState<AvatarBgOption>(() => {
    const saved = localStorage.getItem('id_gen_ai_avatar_bg');
    return (saved === 'white' || saved === 'blue' || saved === 'random') ? saved : 'white';
  });

  const [aiAvatarProvider, setAiAvatarProvider] = useState<AvatarProviderOption>(() => {
    const saved = localStorage.getItem('id_gen_ai_avatar_provider');
    const cutoffPassed = Date.now() >= RECRAFT_FREE_CUTOFF.getTime();
    if (saved === 'openrouter' && !cutoffPassed) return 'openrouter';
    if (saved === 'openrouter' && cutoffPassed) return 'pollinations';
    return (saved === 'default' || saved === 'pollinations') ? saved : 'default';
  });

  const [aiAvatarGender, setAiAvatarGender] = useState<AvatarGenderOption>(() => {
    const saved = localStorage.getItem('id_gen_ai_avatar_gender');
    return (saved === 'random' || saved === 'male' || saved === 'female') ? saved : 'random';
  });

  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState<boolean>(false);

  const [generatedAvatars, setGeneratedAvatars] = useState<GeneratedAvatarItem[]>(() => {
    const saved = localStorage.getItem('id_gen_generated_avatars_v4');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.slice(0, 12);
      } catch (e) {
        console.error('Failed to parse saved generated avatars', e);
      }
    }
    return [];
  });

  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [autoTrigger, setAutoTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  // Last 5 generations history
  const [history, setHistory] = useState<GenerationHistoryItem[]>(() => {
    const saved = localStorage.getItem('id_gen_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.slice(0, 5);
        }
      } catch (e) {
        console.error('Failed to parse saved history', e);
      }
    }
    return [];
  });

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('id_gen_theme', theme);
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('id_gen_student_info', JSON.stringify(studentInfo));
    } catch (e) {
      console.warn('Could not save studentInfo to localStorage', e);
    }
  }, [studentInfo]);

  useEffect(() => {
    localStorage.setItem('id_gen_template', template);
  }, [template]);

  useEffect(() => {
    localStorage.setItem('id_gen_t1_variant', t1Variant);
  }, [t1Variant]);

  useEffect(() => {
    localStorage.setItem('id_gen_avatar_side', avatarSide);
  }, [avatarSide]);

  useEffect(() => {
    localStorage.setItem('id_gen_name_locked', String(isNameLocked));
  }, [isNameLocked]);

  useEffect(() => {
    localStorage.setItem('id_gen_date_locked', String(isDateLocked));
  }, [isDateLocked]);

  useEffect(() => {
    localStorage.setItem('id_gen_ai_avatar_enabled', String(isAiAvatarEnabled));
  }, [isAiAvatarEnabled]);

  useEffect(() => {
    localStorage.setItem('id_gen_ai_avatar_bg', aiAvatarBg);
  }, [aiAvatarBg]);

  useEffect(() => {
    localStorage.setItem('id_gen_ai_avatar_provider', aiAvatarProvider);
  }, [aiAvatarProvider]);

  useEffect(() => {
    localStorage.setItem('id_gen_ai_avatar_gender', aiAvatarGender);
  }, [aiAvatarGender]);

  useEffect(() => {
    try {
      localStorage.setItem('id_gen_generated_avatars_v4', JSON.stringify(generatedAvatars.slice(0, 6)));
    } catch (e) {
      console.warn('Could not persist generated avatars in localStorage', e);
    }
  }, [generatedAvatars]);

  useEffect(() => {
    try {
      localStorage.setItem('id_gen_history', JSON.stringify(history));
    } catch (e) {
      console.warn('Could not persist history in localStorage', e);
    }
  }, [history]);

  // Seed history with initial profile if empty
  useEffect(() => {
    setHistory(prev => {
      if (prev.length === 0 && studentInfo.studentName) {
        return [{
          id: `${Date.now()}-init`,
          timestamp: Date.now(),
          studentInfo: { ...studentInfo },
          template,
          t1Variant
        }];
      }
      return prev;
    });
  }, []);

  const recordGeneration = (newInfo: StudentInfo, tpl?: IdCardTemplate) => {
    setHistory(prev => {
      if (prev.length > 0) {
        const top = prev[0].studentInfo;
        if (
          top.studentName === newInfo.studentName &&
          top.studentId === newInfo.studentId &&
          top.universityName === newInfo.universityName &&
          top.issueDate === newInfo.issueDate
        ) {
          const updatedTop = {
            ...prev[0],
            studentInfo: { ...newInfo },
            template: tpl || prev[0].template
          };
          return [updatedTop, ...prev.slice(1)];
        }
      }
      const newItem: GenerationHistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        timestamp: Date.now(),
        studentInfo: { ...newInfo },
        template: tpl || template,
        t1Variant,
        avatarSide
      };
      return [newItem, ...prev].slice(0, 5);
    });
  };

  const handleToggleAvatarSide = () => {
    setAvatarSide(prev => {
      const next = prev === 'right' ? 'left' : 'right';
      setStudentInfo(info => ({ ...info, avatarSide: next }));
      showToast(
        next === 'left'
          ? 'Switched: Avatar Profile on LEFT side • Student Details on RIGHT side'
          : 'Switched: Avatar Profile on RIGHT side • Student Details on LEFT side',
        'info'
      );
      return next;
    });
  };

  const toggleNameLock = () => {
    setIsNameLocked(prev => {
      const next = !prev;
      showToast(
        next 
          ? 'Student Name LOCKED 🔒 (Name won\'t change when changing schools or randomizing)' 
          : 'Student Name UNLOCKED 🔓', 
        'info'
      );
      return next;
    });
  };

  const toggleDateLock = () => {
    setIsDateLocked(prev => {
      const next = !prev;
      showToast(
        next 
          ? 'Dates LOCKED 🔒 (Issue Date, Valid Until & DOB won\'t change when changing schools or randomizing)' 
          : 'Dates UNLOCKED 🔓', 
        'info'
      );
      return next;
    });
  };

  useEffect(() => {
    const ALL_AVATAR_URLS = [
      "/assets/avatars/t3_headshot.jpg",
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
      "/assets/avatars/male_29.webp",
      "/assets/avatars/male_30.webp",
      "/assets/avatars/male_31.webp",
      "/assets/avatars/male_32.webp",
      "/assets/avatars/male_33.webp",
      "/assets/avatars/male_34.webp",
      "/assets/avatars/male_35.webp",
      "/assets/avatars/male_36.webp",
      "/assets/avatars/male_37.webp",
      "/assets/avatars/male_38.webp",
      "/assets/avatars/male_39.webp",
      "/assets/avatars/male_40.webp",
      "/assets/avatars/male_41.webp",
      "/assets/avatars/male_42.webp",
      "/assets/avatars/male_43.webp",
      "/assets/avatars/male_44.webp",
      "/assets/avatars/male_45.webp",
      "/assets/avatars/male_46.webp",
      "/assets/avatars/male_47.webp",
      "/assets/avatars/male_48.webp",
      "/assets/avatars/male_49.webp",
      "/assets/avatars/male_50.webp",
      "/assets/avatars/male_51.webp",
      "/assets/avatars/male_52.webp",
      "/assets/avatars/male_53.webp",
      "/assets/avatars/male_54.webp",
      "/assets/avatars/male_55.webp",
      "/assets/avatars/male_56.webp",
      "/assets/avatars/male_57.webp",
      "/assets/avatars/male_58.webp",
      "/assets/avatars/male_59.webp",
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
      "/assets/avatars/female_27.webp",
      "/assets/avatars/female_28.webp",
      "/assets/avatars/female_29.webp",
      "/assets/avatars/female_30.webp",
      "/assets/avatars/female_31.webp",
      "/assets/avatars/female_32.webp",
      "/assets/avatars/female_33.webp",
      "/assets/avatars/female_34.webp",
      "/assets/avatars/female_35.webp",
      "/assets/avatars/female_36.webp",
      "/assets/avatars/female_37.webp",
      "/assets/avatars/female_38.webp",
      "/assets/avatars/female_39.webp",
      "/assets/avatars/female_40.webp",
      "/assets/avatars/female_41.webp",
      "/assets/avatars/female_42.webp",
      "/assets/avatars/female_43.webp",
      "/assets/avatars/female_44.webp",
      "/assets/avatars/female_45.webp",
      "/assets/avatars/female_46.webp",
      "/assets/avatars/female_47.webp",
      "/assets/avatars/female_48.webp",
      "/assets/avatars/female_49.webp",
      "/assets/avatars/female_50.webp",
      "/assets/avatars/female_51.webp",
      "/assets/avatars/female_52.webp",
      "/assets/avatars/female_53.webp",
      "/assets/avatars/female_54.webp",
      "/assets/avatars/female_55.webp",
      "/assets/avatars/female_56.webp",
      "/assets/avatars/female_57.webp",
      "/assets/avatars/female_58.webp",
      "/assets/avatars/female_59.webp",
      "/assets/avatars/female_60.webp",
      "/assets/avatars/female_61.webp",
      "/assets/avatars/female_62.webp",
      "/assets/avatars/female_63.webp",
      "/assets/avatars/female_64.webp",
      "/assets/avatars/female_65.webp",
      "/assets/avatars/female_66.webp",
      "/assets/avatars/female_67.webp",
      "/assets/avatars/female_68.webp",
      "/assets/avatars/female_69.webp",
      "/assets/avatars/female_70.webp",
      "/assets/avatars/female_71.webp",
      "/assets/avatars/female_72.webp",
      "/assets/avatars/female_73.webp",
      "/assets/avatars/female_74.webp",
      "/assets/avatars/female_75.webp",
      "/assets/avatars/female_76.webp",
      "/assets/avatars/female_77.webp",
      "/assets/avatars/female_78.webp",
      "/assets/avatars/female_79.webp",
      "/assets/avatars/female_80.webp",
      "/assets/avatars/female_81.webp",
      "/assets/avatars/female_82.webp",
      "/assets/avatars/female_83.webp",
      "/assets/avatars/female_84.webp",
      "/assets/avatars/female_85.webp",
      "/assets/avatars/female_86.webp",
      "/assets/avatars/female_87.webp",
      "/assets/avatars/female_88.webp",
      "/assets/avatars/female_89.webp",
      "/assets/avatars/female_90.webp",
      "/assets/avatars/female_91.webp",
      "/assets/avatars/female_92.webp",
      "/assets/avatars/female_93.webp",
      "/assets/avatars/female_94.webp",
      "/assets/avatars/female_95.webp",
      "/assets/avatars/female_96.webp",
      "/assets/avatars/female_97.webp",
      "/assets/avatars/female_98.webp",
      "/assets/avatars/female_99.webp",
      "/assets/avatars/female_100.webp",
      "/assets/avatars/female_101.webp",
      "/assets/avatars/female_102.webp",
      "/assets/avatars/female_103.webp",
      "/assets/avatars/female_104.webp",
      "/assets/avatars/female_105.webp",
      "/assets/avatars/female_106.webp",
      "/assets/avatars/female_107.webp",
      "/assets/avatars/female_108.webp",
      "/assets/avatars/female_109.webp"
    ];

    ALL_AVATAR_URLS.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const triggerAiAvatarForStudent = async (targetStudent: StudentInfo, tpl?: IdCardTemplate): Promise<StudentInfo> => {
    setIsGeneratingAvatar(true);
    try {
      const generated = await generateUniqueStudentAvatar(
        targetStudent,
        aiAvatarBg,
        aiAvatarProvider,
        aiAvatarGender
      );
      const updatedWithFace: StudentInfo = {
        ...targetStudent,
        photo: generated.url
      };
      setGeneratedAvatars(prev => [generated, ...prev].slice(0, 12));
      setStudentInfo(prev => ({
        ...prev,
        photo: generated.url
      }));
      recordGeneration(updatedWithFace, tpl || template);
      return updatedWithFace;
    } catch (e: any) {
      console.error('AI Avatar generation failed:', e);
      showToast(e?.message || 'Avatar generation failed. Please try again.', 'error');
      return targetStudent;
    } finally {
      setIsGeneratingAvatar(false);
    }
  };

  const handleToggleAiAvatar = () => {
    setIsAiAvatarEnabled(prev => {
      const next = !prev;
      showToast(
        next
          ? 'AI Avatar Generator ON: A new unique face will be generated automatically when you randomize data!'
          : 'AI Avatar Generator OFF: Using standard selectable avatars when randomizing.',
        'info'
      );
      return next;
    });
  };

  const handleGenerateAiAvatarNow = async () => {
    if (isGeneratingAvatar) return;
    showToast(
      aiAvatarProvider === 'openrouter'
        ? 'Generating passport portrait via Recraft V4.1 Flash (OpenRouter Free)...'
        : aiAvatarProvider === 'pollinations'
        ? 'Generating passport portrait via Flux 2 Dev (Pollinations)...'
        : 'Generating unique AI student portrait...',
      'info'
    );
    const updated = await triggerAiAvatarForStudent(studentInfo, template);
    if (updated.photo !== studentInfo.photo) {
      showToast(
        aiAvatarProvider === 'openrouter'
          ? 'New Recraft V4.1 Flash (OpenRouter Free) passport photo generated and selected!'
          : aiAvatarProvider === 'pollinations'
          ? 'New Flux 2 Dev (Pollinations) passport photo generated and selected!'
          : 'New unique AI avatar generated and selected!',
        'success'
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // If the university is changed, auto-populate details for the selected school while keeping the student's name (and dates if locked)
    if (name === 'universityName') {
      const newInfo = generateRandomStudentInfo(value);

      const updatedInfo: StudentInfo = { 
        ...newInfo, 
        studentName: studentInfo.studentName, // Keep name unchanged when switching schools
        issueDate: isDateLocked ? studentInfo.issueDate : newInfo.issueDate,
        validUntil: isDateLocked ? studentInfo.validUntil : newInfo.validUntil,
        dob: isDateLocked ? studentInfo.dob : newInfo.dob,
        photo: studentInfo.photo || newInfo.photo,
        logo: null
      };

      setStudentInfo(updatedInfo);
      recordGeneration(updatedInfo, template);

      if (isAiAvatarEnabled) {
        triggerAiAvatarForStudent(updatedInfo, template);
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

  const handleTemplateChange = (newTemplate: IdCardTemplate) => {
    setTemplate(newTemplate);
    recordGeneration(studentInfo, newTemplate);
  };

  const handlePhotoSelect = (url: string) => {
    setStudentInfo(prev => ({ ...prev, photo: url }));
  };

  const handleGenerateSample = async () => {
    const newInfo = generateRandomStudentInfo(studentInfo.universityName);
    const finalName = isNameLocked ? studentInfo.studentName : newInfo.studentName;
    const finalInfo: StudentInfo = { 
      ...newInfo, 
      studentName: finalName,
      issueDate: isDateLocked ? studentInfo.issueDate : newInfo.issueDate,
      validUntil: isDateLocked ? studentInfo.validUntil : newInfo.validUntil,
      dob: isDateLocked ? studentInfo.dob : newInfo.dob,
      logo: null
    };

    setStudentInfo(finalInfo);
    recordGeneration(finalInfo, template);

    const locks = [];
    if (isNameLocked) locks.push('Name');
    if (isDateLocked) locks.push('Dates');
    const lockNotice = locks.length > 0 ? ` (${locks.join(' & ')} locked)` : '';

    if (finalName) {
      const copied = await copyTextToClipboard(finalName);
      if (copied) {
        showToast(
          isAiAvatarEnabled
            ? `Randomized "${finalName}" & generating new AI face...${lockNotice}`
            : `Randomized & "${finalName}" copied to clipboard!${lockNotice}`,
          'success'
        );
      } else {
        showToast(`Student details randomized${lockNotice}!`, 'success');
      }
    } else {
      showToast(`Student details randomized${lockNotice}!`, 'success');
    }

    if (isAiAvatarEnabled) {
      await triggerAiAvatarForStudent(finalInfo, template);
    }
  };

  const handleAutoTrigger = async () => {
    const newInfo = generateRandomStudentInfo(studentInfo.universityName);
    const finalName = isNameLocked ? studentInfo.studentName : newInfo.studentName;
    let finalInfo: StudentInfo = { 
      ...newInfo, 
      studentName: finalName,
      issueDate: isDateLocked ? studentInfo.issueDate : newInfo.issueDate,
      validUntil: isDateLocked ? studentInfo.validUntil : newInfo.validUntil,
      dob: isDateLocked ? studentInfo.dob : newInfo.dob,
      logo: null
    };

    setStudentInfo(finalInfo);
    recordGeneration(finalInfo, template);

    // Copy the name to clipboard
    if (finalName) {
      await copyTextToClipboard(finalName);
      showToast(
        isAiAvatarEnabled
          ? `Name "${finalName}" copied! Generating AI face before mockup...`
          : `Name "${finalName}" copied to clipboard!`,
        'success'
      );
    }

    if (isAiAvatarEnabled) {
      finalInfo = await triggerAiAvatarForStudent(finalInfo, template);
    }

    setAutoTrigger(prev => prev + 1);
  };

  const handleRestoreHistory = async (item: GenerationHistoryItem) => {
    setStudentInfo(item.studentInfo);
    if (item.template) {
      setTemplate(item.template);
    }
    if (item.t1Variant) {
      setT1Variant(item.t1Variant);
    }
    if (item.avatarSide) {
      setAvatarSide(item.avatarSide);
    }
    const name = item.studentInfo.studentName;
    if (name) {
      await copyTextToClipboard(name);
      showToast(`Restored: "${name}" (copied to clipboard)!`, 'success');
    } else {
      showToast('Restored previous generation!', 'info');
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
            t1Variant={t1Variant}
            onT1VariantChange={(variant) => {
              setT1Variant(variant);
              showToast(`Switched T1 to ${variant === 'dark' ? 'Dark' : 'White'} design`, 'info');
            }}
            avatarSide={avatarSide}
            onToggleAvatarSide={handleToggleAvatarSide}
            isNameLocked={isNameLocked}
            onToggleNameLock={toggleNameLock}
            isDateLocked={isDateLocked}
            onToggleDateLock={toggleDateLock}
            isAiAvatarEnabled={isAiAvatarEnabled}
            onToggleAiAvatar={handleToggleAiAvatar}
            aiAvatarBg={aiAvatarBg}
            onAiAvatarBgChange={setAiAvatarBg}
            aiAvatarProvider={aiAvatarProvider}
            onAiAvatarProviderChange={setAiAvatarProvider}
            aiAvatarGender={aiAvatarGender}
            onAiAvatarGenderChange={setAiAvatarGender}
            isGeneratingAvatar={isGeneratingAvatar}
            onGenerateAiAvatarNow={handleGenerateAiAvatarNow}
            generatedAvatars={generatedAvatars}
            onToggleTheme={toggleTheme}
            onTemplateChange={handleTemplateChange}
            onInputChange={handleInputChange}
            onPhotoChange={handlePhotoChange}
            onPhotoSelect={handlePhotoSelect}
            onGenerateSample={handleGenerateSample}
            onAutoGenerate={handleAutoTrigger}
            showToast={showToast}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            history={history}
            onRestoreHistory={handleRestoreHistory}
          />
        </div>
        <div className={`${activeTab === 'preview' ? 'block' : 'absolute top-0 left-0 opacity-0 pointer-events-none lg:static lg:block lg:opacity-100 lg:pointer-events-auto'} w-full lg:w-1/2`}>
          <PreviewPanel 
            studentInfo={studentInfo} 
            template={template}
            theme={theme}
            t1Variant={t1Variant}
            onT1VariantChange={(variant) => {
              setT1Variant(variant);
              showToast(`Switched T1 to ${variant === 'dark' ? 'Dark' : 'White'} design`, 'info');
            }}
            avatarSide={avatarSide}
            onToggleAvatarSide={handleToggleAvatarSide}
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
