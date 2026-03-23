
import React, { useRef, useState, useEffect } from 'react';
import { StudentInfo, ToastType, IdCardTemplate } from '../types';
import IdCard from './IdCard';
import { GoogleGenAI } from "@google/genai";
import * as htmlToImage from 'html-to-image';

// Defining the missing props interface for PreviewPanel
interface PreviewPanelProps {
  studentInfo: StudentInfo;
  template: IdCardTemplate;
  theme: 'light' | 'dark';
  showToast: (message: string, type: ToastType) => void;
  autoTrigger?: number;
  setActiveTab: (tab: 'edit' | 'preview') => void;
  activeTab: 'edit' | 'preview';
}

const MOCKUP_SCENES = [
  { url: "https://files.catbox.moe/021b0u.png", label: "Table Lanyard" },
  { url: "https://files.catbox.moe/6rjppv.jfif", label: "Hand Held" },
  { url: "https://files.catbox.moe/j9s890.png", label: "Natural View 1" },
  { url: "https://files.catbox.moe/0nk6tf.png", label: "Natural View 2" },
  { url: "https://files.catbox.moe/jkxmsd.png", label: "Natural View 3" },
  { url: "https://files.catbox.moe/mdd3ye.png", label: "Natural View 4" }
];

const PreviewPanel: React.FC<PreviewPanelProps> = ({ studentInfo, template, theme, showToast, autoTrigger = 0, setActiveTab, activeTab }) => {
  const frontCardRef = useRef<HTMLDivElement>(null);
  const backCardRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'preview' && panelRef.current) {
      panelRef.current.scrollTo({ top: panelRef.current.scrollHeight });
    }
  }, [activeTab]);
  
  // AI Mockup State
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [mockupImage, setMockupImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mockupSide, setMockupSide] = useState<'front' | 'back'>('front');
  const [lockScene, setLockScene] = useState(false);

  // Cropper Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const editorImageRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<any>(null);

  const isDark = theme === 'dark';

  // Auto Generate Effect
  useEffect(() => {
    if (autoTrigger > 0) {
      let finalScene = referenceImage;
      
      // If scene is not locked OR no scene is selected, pick a random one
      if (!lockScene || !finalScene) {
        const randomScene = MOCKUP_SCENES[Math.floor(Math.random() * MOCKUP_SCENES.length)];
        finalScene = randomScene.url;
        setReferenceImage(finalScene);
      }
      
      setMockupImage(null);
      // Brief delay to ensure state and DOM have updated with the randomized student info
      setTimeout(() => {
        handleGenerateMockup(finalScene!);
      }, 500);
    }
  }, [autoTrigger]);

  useEffect(() => {
    if (isEditModalOpen && editorImageRef.current) {
        if (cropperRef.current) {
            cropperRef.current.destroy();
        }
        
        const Cropper = (window as any).Cropper;
        if (Cropper) {
             cropperRef.current = new Cropper(editorImageRef.current, {
                viewMode: 1,
                dragMode: 'move',
                autoCropArea: 0.8,
                restore: false,
                modal: true,
                guides: true,
                highlight: false,
                cropBoxMovable: true,
                cropBoxResizable: true,
                toggleDragModeOnDblclick: false,
                background: false
            });
        }
    }
    return () => {
        if (cropperRef.current) {
            cropperRef.current.destroy();
            cropperRef.current = null;
        }
    }
  }, [isEditModalOpen, mockupImage]);

  const captureCard = async (ref: React.RefObject<HTMLDivElement>, scaleFactor: number = 4) => {
    let originalCard = ref.current;
    
    // If ref is null, wait a bit and try again (can happen during tab transitions)
    if (!originalCard) {
      await new Promise(resolve => setTimeout(resolve, 100));
      originalCard = ref.current;
    }

    if (!originalCard) {
      console.warn("Capture failed: Ref is null after retry");
      return null;
    }

    // Check if the element has dimensions
    if (originalCard.offsetWidth === 0 || originalCard.offsetHeight === 0) {
      // Wait a bit for layout if dimensions are 0
      await new Promise(resolve => setTimeout(resolve, 200));
      
      if (originalCard.offsetWidth === 0 || originalCard.offsetHeight === 0) {
        console.warn("Capture failed: Element has 0 dimensions after retry", {
          width: originalCard.offsetWidth,
          height: originalCard.offsetHeight,
          display: window.getComputedStyle(originalCard).display,
          visibility: window.getComputedStyle(originalCard).visibility
        });
        return null;
      }
    }

    try {
      // Clear any active selections which can interfere with text measurement
      window.getSelection()?.removeAllRanges();

      // Using html-to-image as it's more stable than html2canvas for complex text/layout
      // and avoids the "setEnd on Range" error.
      const canvas = await htmlToImage.toCanvas(originalCard, {
        pixelRatio: scaleFactor,
        backgroundColor: null,
        style: {
          transform: 'none',
          margin: '0',
          display: 'flex',
        },
        // Filter out problematic external stylesheets that cause CORS errors when reading rules
        filter: (node: any) => {
          if (node.tagName === 'LINK' && node.getAttribute('rel') === 'stylesheet') {
            const href = node.getAttribute('href');
            if (href && (href.includes('cdnjs.cloudflare.com') || href.includes('fonts.googleapis.com'))) {
              return false;
            }
          }
          return true;
        }
      });
      
      return canvas;
    } catch (err) {
      console.error("html-to-image capture failed:", err);
      throw err;
    }
  };

  const handleCopyName = () => {
    if (studentInfo.studentName) {
      navigator.clipboard.writeText(studentInfo.studentName)
        .then(() => {
          showToast("Name copied to clipboard!", "success");
        })
        .catch((err) => {
          console.error('Could not copy text: ', err);
          showToast("Failed to copy name.", "error");
        });
    }
  };

  const handleCopySchool = () => {
    if (studentInfo.universityName) {
      navigator.clipboard.writeText(studentInfo.universityName)
        .then(() => {
          showToast("School name copied to clipboard!", "success");
        })
        .catch((err) => {
          console.error('Could not copy text: ', err);
          showToast("Failed to copy school name.", "error");
        });
    }
  };

  const handleDownloadImage = async (side: 'front' | 'back') => {
    const ref = side === 'front' ? frontCardRef : backCardRef;
    if (!ref.current) return;

    try {
      showToast(`Generating ${side} image...`, "info");
      const canvas = await captureCard(ref);
      if (!canvas) {
        showToast("Library missing or element not found.", "error");
        return;
      }

      const safeStudentName = studentInfo.studentName.trim().replace(/\s+/g, '_') || 'Student';
      const firstSchoolWord = studentInfo.universityName.trim().split(/\s+/)[0] || 'School';
      const fileName = `${safeStudentName}_${firstSchoolWord}.png`;
      
      const pngUrl = canvas.toDataURL('image/png');
      const pngLink = document.createElement('a');
      pngLink.href = pngUrl;
      pngLink.download = fileName;
      document.body.appendChild(pngLink);
      pngLink.click();
      document.body.removeChild(pngLink);
      showToast(`${side.charAt(0).toUpperCase() + side.slice(1)} downloaded!`, "success");
    } catch (e) {
      console.error(e);
      showToast("Error downloading image.", "error");
    }
  };

  const handleDownloadPDF = async () => {
    const { jsPDF } = (window as any).jspdf;
    if (!jsPDF) {
      showToast('jsPDF library not loaded.', 'error');
      return;
    }

    try {
      showToast("Generating PDF...", "info");
      const frontCanvas = await captureCard(frontCardRef);
      const backCanvas = await captureCard(backCardRef);

      if (!frontCanvas || !backCanvas) {
        showToast("Error capturing card elements.", "error");
        return;
      }

      const pdfWidth = 85.7;
      const pdfHeight = 54;

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
      });

      pdf.addImage(frontCanvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.addPage();
      pdf.addImage(backCanvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);

      const safeStudentName = studentInfo.studentName.trim().replace(/\s+/g, '_') || 'Student';
      const firstSchoolWord = studentInfo.universityName.trim().split(/\s+/)[0] || 'School';
      const fileName = `${safeStudentName}_${firstSchoolWord}.pdf`;
      pdf.save(fileName);

      showToast("PDF downloaded!", "success");
    } catch (error) {
      console.error("Error generating PDF:", error);
      showToast("Failed to generate PDF.", "error");
    }
  };

  const handleDownloadCrop = () => {
    if (cropperRef.current) {
        const canvas = cropperRef.current.getCroppedCanvas();
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = url;
            const safeStudentName = studentInfo.studentName.trim().replace(/\s+/g, '_') || 'Student';
            const firstSchoolWord = studentInfo.universityName.trim().split(/\s+/)[0] || 'School';
            const fileName = `${safeStudentName}_${firstSchoolWord}.png`;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToast("Edited image downloaded", "success");
        }
    }
  };

  const handleReferenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setReferenceImage(event.target?.result as string);
        setMockupImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseDefaultMockup = (url: string) => {
    setReferenceImage(url);
    setMockupImage(null);
    showToast("Default scene selected!", "success");
  };

  const processImage = async (source: string | HTMLCanvasElement, maxWidth: number = 768, mimeType: string = 'image/jpeg'): Promise<{ base64: string, mimeType: string }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const isCanvas = source instanceof HTMLCanvasElement;
      
      const onImageReady = () => {
        const canvas = document.createElement('canvas');
        let width = isCanvas ? (source as HTMLCanvasElement).width : img.width;
        let height = isCanvas ? (source as HTMLCanvasElement).height : img.height;

        if (width === 0 || height === 0) {
          reject(new Error('Image has no dimensions'));
          return;
        }

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width *= maxWidth / height;
            height = maxWidth;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          if (isCanvas) {
            ctx.drawImage(source as HTMLCanvasElement, 0, 0, width, height);
          } else {
            ctx.drawImage(img, 0, 0, width, height);
          }
          const dataURL = canvas.toDataURL(mimeType, mimeType === 'image/png' ? undefined : 0.7);
          const parts = dataURL.split(',');
          if (parts.length < 2 || !parts[1]) {
            reject(new Error('Generated image data is empty'));
            return;
          }
          resolve({ base64: parts[1], mimeType });
        } else {
          reject(new Error('Canvas context failed'));
        }
      };

      if (isCanvas) {
        onImageReady();
      } else {
        const url = source as string;
        img.crossOrigin = 'Anonymous';
        img.onload = onImageReady;
        img.onerror = () => reject(new Error('Image load failed (CORS or network issue)'));
        img.src = url;
      }
    });
  };

  const handleGenerateMockup = async (overrideReference?: string) => {
    const activeReference = overrideReference || referenceImage;
    if (!activeReference) {
      showToast("Please upload or select a reference image first.", "error");
      return;
    }

    if (!process.env.API_KEY && !process.env.GEMINI_API_KEY) {
       showToast("API Key not found.", "error");
       return;
    }

    setIsGenerating(true);
    try {
      showToast(`Capturing ${mockupSide} of ID card...`, "info");
      const refToCapture = mockupSide === 'front' ? frontCardRef : backCardRef;
      const cardCanvas = await captureCard(refToCapture, 1.5);
      if (!cardCanvas || cardCanvas.width === 0 || cardCanvas.height === 0) {
         throw new Error("Failed to capture ID card image. Please ensure the card is visible.");
      }
      
      showToast("Processing images...", "info");
      
      // Process ID card design (PNG for quality)
      const { base64: cardBase64 } = await processImage(cardCanvas, 768, 'image/png');
      
      // Process reference scene (JPEG for speed/size)
      const { base64: referenceBase64, mimeType: referenceMimeType } = await processImage(activeReference, 768, 'image/jpeg');

      if (!referenceBase64 || referenceBase64.length < 100) {
        throw new Error("Reference image data is incomplete. Please try a different scene.");
      }
      if (!cardBase64 || cardBase64.length < 100) {
        throw new Error("ID card design data is incomplete. Please try again.");
      }

      showToast("AI processing... this may take a few seconds.", "info");

      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      const ai = new GoogleGenAI({ apiKey: apiKey! });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        config: {
          temperature: 0.5,
          topP: 0.9,
        },
        contents: {
          parts: [
            { inlineData: { mimeType: referenceMimeType, data: referenceBase64 } },
            { inlineData: { mimeType: 'image/png', data: cardBase64 } },
            { text: "The first image is a real photo of an ID card in a scene. The second image is a flat digital ID card design. Meticulously replace the visual content of the ID card in the first image with the design from the second image. Preserve the lighting, shadows, and perspective of the original scene. The result must be a realistic photo." }
          ]
        }
      });

      let generatedImageUrl = null;
      if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            generatedImageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (generatedImageUrl) {
        setMockupImage(generatedImageUrl);
        showToast("Mockup generated successfully!", "success");
        setIsEditModalOpen(true);
      } else {
        throw new Error("AI returned no image. The model might have filtered the content or failed to generate a result. Try a different scene.");
      }
    } catch (error: any) {
      console.error("AI Mockup Error:", error);
      const errorMessage = error?.message || "An unexpected error occurred during generation.";
      showToast(errorMessage, "error");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div ref={panelRef} className={`w-full p-6 md:p-8 flex flex-col items-center overflow-y-auto transition-colors duration-300 ${isDark ? 'bg-zinc-950' : 'bg-gray-200'} lg:max-h-[90vh] pb-24 lg:pb-8`}>
      <h2 className={`text-3xl font-bold mb-6 text-center transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>Live ID Card Preview</h2>
      
      <div className="space-y-6 w-full flex flex-col items-center">
        <div>
           <p className={`font-bold mb-2 text-center text-sm uppercase tracking-wide transition-colors duration-300 ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>Front Side</p>
           <IdCard ref={frontCardRef} studentInfo={studentInfo} side="front" template={template} />
        </div>
        <div>
           <p className={`font-bold mb-2 text-center text-sm uppercase tracking-wide transition-colors duration-300 ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>Back Side</p>
           <IdCard ref={backCardRef} studentInfo={studentInfo} side="back" template={template} />
        </div>
      </div>

      <div className={`mt-8 flex flex-wrap justify-center gap-3 border-b pb-8 w-full transition-colors duration-300 ${isDark ? 'border-zinc-800' : 'border-gray-300'}`}>
        <button onClick={handleCopyName} className="modern-button text-xs">
          Copy Name
        </button>
        <button onClick={handleCopySchool} className="modern-button text-xs">
          Copy School
        </button>
        <button onClick={() => handleDownloadImage('front')} className="modern-button text-xs">
          Download Front PNG
        </button>
        <button onClick={() => handleDownloadImage('back')} className="modern-button text-xs">
          Download Back PNG
        </button>
        <button onClick={handleDownloadPDF} className="modern-button-green">
          Download Full PDF
        </button>
      </div>

      <div className={`mt-8 w-full max-w-md p-6 rounded-xl shadow-sm border transition-colors duration-300 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-300'}`}>
        <div className="flex items-center justify-between gap-2 mb-4">
             <div className="flex items-center gap-2">
                <div className={`p-2 rounded-full transition-colors duration-300 ${isDark ? 'bg-purple-900/40' : 'bg-purple-100'}`}>
                    <svg className={`w-5 h-5 transition-colors duration-300 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                </div>
                <h3 className={`text-lg font-bold transition-colors duration-300 ${isDark ? 'text-zinc-100' : 'text-gray-800'}`}>AI Reality Mockup</h3>
             </div>

             <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setLockScene(!lockScene)}>
                <span className={`text-[10px] font-bold uppercase tracking-tight transition-colors ${lockScene ? 'text-purple-500' : 'text-gray-400'}`}>
                  {lockScene ? 'Locked' : 'Random'}
                </span>
                <div className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 relative ${lockScene ? 'bg-purple-600' : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 flex items-center justify-center ${lockScene ? 'translate-x-5' : 'translate-x-0'}`}>
                    {lockScene ? (
                      <svg className="w-2.5 h-2.5 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                    ) : (
                      <svg className="w-2.5 h-2.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2V7a5 5 0 00-5-5zM7 7a3 3 0 116 0v2H7V7z"></path></svg>
                    )}
                  </div>
                </div>
             </div>
        </div>
        
        <div className="space-y-4">
            <div className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors duration-300 ${isDark ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-50'}`}>
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleReferenceUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {referenceImage ? (
                    <img src={referenceImage} alt="Reference" className="max-h-32 mx-auto rounded shadow-sm" />
                ) : (
                    <div className="text-gray-400">
                        <p className={`text-sm font-medium transition-colors duration-300 ${isDark ? 'text-zinc-400' : 'text-gray-600'}`}>Click to upload Scene Photo</p>
                        <p className="text-xs mt-1">JPEG or PNG</p>
                    </div>
                )}
            </div>

            <div className={`flex flex-col gap-2 border-t border-b py-3 transition-colors duration-300 ${isDark ? 'border-zinc-800' : 'border-gray-100'}`}>
                 <p className={`text-xs font-medium transition-colors duration-300 ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>Or select a default scene:</p>
                 <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                     {MOCKUP_SCENES.map((scene, idx) => (
                         <button 
                            key={idx}
                            onClick={() => handleUseDefaultMockup(scene.url)}
                            className={`flex flex-col items-center gap-1 group cursor-pointer p-1 rounded-md border transition-all flex-shrink-0 ${referenceImage === scene.url ? 'border-purple-600 ring-2 ring-purple-50' : isDark ? 'border-zinc-700 hover:border-purple-300' : 'border-gray-200 hover:border-purple-300'}`}
                         >
                             <img 
                                src={scene.url} 
                                alt={scene.label} 
                                className="w-16 h-12 object-cover rounded shadow-sm opacity-80 group-hover:opacity-100" 
                                referrerPolicy="no-referrer"
                             />
                             <span className={`text-[9px] font-bold group-hover:text-purple-600 transition-colors duration-300 ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>
                                {scene.label}
                             </span>
                         </button>
                     ))}
                 </div>
            </div>

            <div className={`p-2 rounded-lg flex items-center justify-between transition-colors duration-300 ${isDark ? 'bg-zinc-800' : 'bg-gray-50'}`}>
                <span className={`text-xs font-bold transition-colors duration-300 ${isDark ? 'text-zinc-400' : 'text-gray-600'}`}>Render Side:</span>
                <div className={`flex rounded-md shadow-sm border p-0.5 transition-colors duration-300 ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'}`}>
                    <button 
                        onClick={() => setMockupSide('front')}
                        className={`text-xs px-3 py-1 rounded-sm font-bold transition-colors ${mockupSide === 'front' ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Front
                    </button>
                    <button 
                        onClick={() => setMockupSide('back')}
                        className={`text-xs px-3 py-1 rounded-sm font-bold transition-colors ${mockupSide === 'back' ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Back
                    </button>
                </div>
            </div>

            <button 
                onClick={() => handleGenerateMockup()} 
                disabled={!referenceImage || isGenerating}
                className={`w-full py-2 rounded-full font-bold text-sm tracking-wide uppercase transition-all shadow-md ${
                    !referenceImage || isGenerating 
                    ? isDark ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed shadow-none' : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
                    : 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-900/20'
                }`}
            >
                {isGenerating ? (
                   <span className="flex items-center justify-center gap-2">
                       <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                       </svg>
                       Processing...
                   </span>
                ) : 'Generate Realistic Mockup'}
            </button>
        </div>

        {mockupImage && (
            <div className="mt-6 animate-in fade-in zoom-in duration-300 w-full">
                <p className={`text-xs font-bold mb-2 uppercase tracking-wide text-center transition-colors duration-300 ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>Latest Result</p>
                <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="w-full mb-3 modern-button text-xs"
                >
                    Preview & Edit Mockup
                </button>
                <div className={`rounded-lg overflow-hidden shadow-lg border transition-colors duration-300 ${isDark ? 'border-zinc-800' : 'border-gray-200'}`}>
                    <img src={mockupImage} alt="AI Mockup" className="w-full h-auto" referrerPolicy="no-referrer" />
                </div>
            </div>
        )}
      </div>

      {isEditModalOpen && mockupImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 backdrop-blur-sm">
            <div className={`rounded-xl shadow-2xl w-full max-w-5xl h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 transition-colors duration-300 ${isDark ? 'bg-zinc-900' : 'bg-white'}`}>
                <div className={`p-4 border-b flex justify-between items-center transition-colors duration-300 ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-gray-50'}`}>
                    <h3 className={`font-bold text-lg transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>Preview & Resize Mockup</h3>
                    <button 
                        onClick={() => setIsEditModalOpen(false)} 
                        className={`transition-colors p-1 rounded-full ${isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200'}`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <div className="flex-1 bg-black overflow-hidden relative flex items-center justify-center">
                    <img ref={editorImageRef} src={mockupImage} alt="Edit" className="max-w-full max-h-full" referrerPolicy="no-referrer" />
                </div>

                <div className={`p-4 border-t flex justify-between items-center transition-colors duration-300 ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-gray-50'}`}>
                     <p className={`text-xs transition-colors duration-300 ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>Drag corners to crop/resize.</p>
                     <div className="flex gap-3">
                         <button onClick={() => setIsEditModalOpen(false)} className={`px-4 py-2 text-sm font-bold transition-colors duration-300 ${isDark ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}>Cancel</button>
                         <button onClick={handleDownloadCrop} className="modern-button-purple text-sm px-6">Download Crop</button>
                     </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPanel;
