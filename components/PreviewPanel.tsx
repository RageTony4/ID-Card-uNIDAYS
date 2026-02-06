
import React, { useRef, useState, useEffect } from 'react';
import { StudentInfo, ToastType, IdCardTemplate } from '../types';
import IdCard from './IdCard';
import { GoogleGenAI } from "@google/genai";

// Defining the missing props interface for PreviewPanel
interface PreviewPanelProps {
  studentInfo: StudentInfo;
  template: IdCardTemplate;
  showToast: (message: string, type: ToastType) => void;
  autoTrigger?: number;
}

const MOCKUP_SCENES = [
  { url: "https://files.catbox.moe/021b0u.png", label: "Table Lanyard" },
  { url: "https://files.catbox.moe/6rjppv.jfif", label: "Hand Held" },
  { url: "https://files.catbox.moe/j9s890.png", label: "Natural View 1" },
  { url: "https://files.catbox.moe/0nk6tf.png", label: "Natural View 2" },
  { url: "https://files.catbox.moe/jkxmsd.png", label: "Natural View 3" },
  { url: "https://files.catbox.moe/mdd3ye.png", label: "Natural View 4" }
];

const PreviewPanel: React.FC<PreviewPanelProps> = ({ studentInfo, template, showToast, autoTrigger = 0 }) => {
  const frontCardRef = useRef<HTMLDivElement>(null);
  const backCardRef = useRef<HTMLDivElement>(null);
  
  // AI Mockup State
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [mockupImage, setMockupImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mockupSide, setMockupSide] = useState<'front' | 'back'>('front');

  // Cropper Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const editorImageRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<any>(null);

  // Auto Generate Effect
  useEffect(() => {
    if (autoTrigger > 0) {
      const randomScene = MOCKUP_SCENES[Math.floor(Math.random() * MOCKUP_SCENES.length)];
      setReferenceImage(randomScene.url);
      setMockupImage(null);
      // Brief delay to ensure state and DOM have updated with the randomized student info
      setTimeout(() => {
        handleGenerateMockup(randomScene.url);
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
    const card = ref.current;
    if (!card) return null;
    const { html2canvas } = window as any;
    if (!html2canvas) return null;

    return await html2canvas(card, {
      scale: scaleFactor,
      useCORS: true,
      logging: false,
      width: card.offsetWidth,
      height: card.offsetHeight
    });
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

      const studentName = studentInfo.studentName.replace(/ /g, '_') || 'student';
      const pngUrl = canvas.toDataURL('image/png');
      const pngLink = document.createElement('a');
      pngLink.href = pngUrl;
      pngLink.download = `${studentName}_id_${side}.png`;
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

      const studentName = studentInfo.studentName.replace(/ /g, '_') || 'student';
      pdf.save(`${studentName}_id_card.pdf`);

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
            const safeName = studentInfo.studentName.trim().replace(/ /g, '_') || 'student';
            link.download = `${safeName}.png`;
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

  const imageUrlToBase64 = async (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL('image/jpeg', 0.8);
          resolve(dataURL.split(',')[1]);
        } else {
          reject(new Error('Canvas context failed'));
        }
      };
      img.onerror = () => reject(new Error('Image load failed (CORS or network issue)'));
      img.src = url;
    });
  };

  const handleGenerateMockup = async (overrideReference?: string) => {
    const activeReference = overrideReference || referenceImage;
    if (!activeReference) {
      showToast("Please upload or select a reference image first.", "error");
      return;
    }

    if (!process.env.API_KEY) {
       showToast("API Key not found.", "error");
       return;
    }

    setIsGenerating(true);
    try {
      showToast(`Capturing ${mockupSide} of ID card...`, "info");
      const refToCapture = mockupSide === 'front' ? frontCardRef : backCardRef;
      const cardCanvas = await captureCard(refToCapture, 2);
      if (!cardCanvas) {
         throw new Error("Failed to capture ID card.");
      }
      
      const cardBase64 = cardCanvas.toDataURL('image/png').split(',')[1];
      
      let referenceBase64 = '';
      if (activeReference.startsWith('data:')) {
        referenceBase64 = activeReference.split(',')[1];
      } else {
        showToast("Preparing reference scene...", "info");
        referenceBase64 = await imageUrlToBase64(activeReference);
      }

      showToast("AI processing... this may take a few seconds.", "info");

      // Initializing GoogleGenAI client according to updated guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: referenceBase64 } },
            { inlineData: { mimeType: 'image/png', data: cardBase64 } },
            { text: "The first image is a real photo of an ID card in a scene with a phone camera aesthetic, featuring natural lighting and realistic reflections. The second image is a flat digital ID card design. Replace the visual content of the ID card in the first image with the design from the second image. Meticulously preserve the phone camera lens characteristics, natural lighting, soft shadows, realistic glares/reflections on the card surface, color temperature, and any physical obstructions (like lanyards, clips, or plastic holders). The result must look like a realistic smartphone snapshot of the new ID card in the original scene." }
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
        showToast("AI returned no image. Try a different scene.", "error");
      }
    } catch (error) {
      console.error("AI Mockup Error:", error);
      showToast("Failed to process scene. Ensure image is accessible.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full lg:w-1/2 p-6 md:p-8 flex flex-col items-center bg-gray-200 overflow-y-auto" style={{ maxHeight: '90vh' }}>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Live ID Card Preview</h2>
      
      <div className="space-y-6 w-full flex flex-col items-center">
        <div>
           <p className="text-gray-500 font-bold mb-2 text-center text-sm uppercase tracking-wide">Front Side</p>
           <IdCard ref={frontCardRef} studentInfo={studentInfo} side="front" template={template} />
        </div>
        <div>
           <p className="text-gray-500 font-bold mb-2 text-center text-sm uppercase tracking-wide">Back Side</p>
           <IdCard ref={backCardRef} studentInfo={studentInfo} side="back" template={template} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3 border-b border-gray-300 pb-8 w-full">
        <button onClick={handleCopyName} className="modern-button text-xs">
          Copy Name
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

      <div className="mt-8 w-full max-w-md bg-white p-6 rounded-xl shadow-sm border border-gray-300">
        <div className="flex items-center gap-2 mb-4">
             <div className="bg-purple-100 p-2 rounded-full">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
             </div>
             <h3 className="text-lg font-bold text-gray-800">AI Reality Mockup</h3>
        </div>
        
        <div className="space-y-4">
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
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
                        <p className="text-sm font-medium">Click to upload Scene Photo</p>
                        <p className="text-xs mt-1">JPEG or PNG</p>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2 border-t border-b border-gray-100 py-3">
                 <p className="text-xs text-gray-500 font-medium">Or select a default scene:</p>
                 <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                     {MOCKUP_SCENES.map((scene, idx) => (
                         <button 
                            key={idx}
                            onClick={() => handleUseDefaultMockup(scene.url)}
                            className={`flex flex-col items-center gap-1 group cursor-pointer p-1 rounded-md border transition-all flex-shrink-0 ${referenceImage === scene.url ? 'border-purple-600 ring-2 ring-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
                         >
                             <img 
                                src={scene.url} 
                                alt={scene.label} 
                                className="w-16 h-12 object-cover rounded shadow-sm opacity-80 group-hover:opacity-100" 
                             />
                             <span className="text-[9px] font-bold text-gray-500 group-hover:text-purple-600">
                                {scene.label}
                             </span>
                         </button>
                     ))}
                 </div>
            </div>

            <div className="bg-gray-50 p-2 rounded-lg flex items-center justify-between">
                <span className="text-xs font-bold text-gray-600 ml-1">Render Side:</span>
                <div className="flex bg-white rounded-md shadow-sm border border-gray-200 p-0.5">
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
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
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
                <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide text-center">Latest Result</p>
                <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="w-full mb-3 modern-button text-xs"
                >
                    Preview & Edit Mockup
                </button>
                <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
                    <img src={mockupImage} alt="AI Mockup" className="w-full h-auto" />
                </div>
            </div>
        )}
      </div>

      {isEditModalOpen && mockupImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-lg text-gray-800">Preview & Resize Mockup</h3>
                    <button 
                        onClick={() => setIsEditModalOpen(false)} 
                        className="text-gray-500 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <div className="flex-1 bg-gray-900 overflow-hidden relative flex items-center justify-center">
                    <img ref={editorImageRef} src={mockupImage} alt="Edit" className="max-w-full max-h-full" />
                </div>

                <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                     <p className="text-xs text-gray-500">Drag corners to crop/resize.</p>
                     <div className="flex gap-3">
                         <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-800">Cancel</button>
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
