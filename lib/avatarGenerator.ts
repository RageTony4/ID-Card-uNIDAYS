import { GoogleGenAI } from '@google/genai';
import { StudentInfo } from '../types';

export type AvatarBgOption = 'white' | 'blue' | 'random';

export interface GeneratedAvatarItem {
  id: string;
  url: string;
  studentName: string;
  ethnicity: string;
  gender: 'male' | 'female';
  bgType: 'white' | 'blue';
  clothing: string;
  timestamp: number;
}

const FEMALE_NAMES_SET = new Set([
  'olivia', 'sophie', 'emily', 'amelia', 'isabella', 'ava', 'mia', 'grace', 'lily', 'evie', 'freya', 'florence', 'daisy', 'poppy', 'sienna', 'ivy', 'willow', 'phoebe', 'evelyn', 'ella', 'rosie', 'ruby', 'maya', 'isabelle', 'alice', 'charlotte', 'jessica', 'ada', 'isla', 'mila', 'chloe', 'hallie', 'eliza', 'bonnie', 'lottie', 'aria', 'penelope', 'aurora', 'violet', 'luna', 'imogen', 'eleanor', 'bella', 'molly', 'nancy', 'thea', 'lyra', 'orla', 'edith', 'harriet', 'georgia', 'clara', 'summer', 'amber', 'iris', 'robyn', 'darcie', 'hannah', 'beatrice', 'holly',
  'achieng', 'moraa', 'nekesa', 'sarah', 'ruth', 'naomi', 'atieno', 'adhiambo', 'akoth', 'mercy', 'faith', 'joy', 'hope', 'patience', 'charity', 'blessing', 'esther', 'mary', 'jane', 'catherine', 'dorothy', 'elizabeth', 'gertrude', 'hellen', 'irene', 'janet', 'lydia', 'margaret', 'olive', 'phyllis', 'rose', 'stacy', 'tabitha', 'ursula', 'vivian', 'winifred', 'zipporah', 'brenda', 'caroline', 'diana', 'eunice', 'fridah', 'gladys', 'hilda', 'joan', 'karen', 'lucy', 'maureen', 'nicole', 'pamela', 'salome', 'teresa', 'veronica',
  'emma', 'sofia', 'emilia', 'anna', 'marie', 'lina', 'lea', 'leni', 'luisa', 'maja', 'frieda', 'johanna', 'paula', 'laura', 'julia', 'lisa', 'elena', 'amelie', 'lara', 'nele', 'ida', 'greta', 'mathilda', 'marlene', 'romy', 'lia', 'lotta', 'pia', 'alina', 'mira', 'nora', 'theresa', 'viktoria', 'helena', 'isabel', 'anni', 'klara', 'mina', 'edda', 'alma', 'antonia', 'annika', 'carlotta', 'franziska', 'jasmin', 'katharina', 'miriam', 'stella', 'valerie', 'ronja',
  'harper', 'zoe', 'matilda', 'elsie', 'hazel', 'billie', 'piper', 'audrey', 'scarlett', 'layla', 'indiana', 'savannah', 'zara', 'abigail', 'alexis', 'eden', 'mackenzie', 'paige', 'gemma',
  'sophia', 'gianna', 'avery', 'nova', 'ellie', 'madison', 'riley', 'eliana', 'victoria', 'natalie', 'ariana', 'allison', 'gabriella', 'madelyn', 'autumn', 'paisley', 'claire', 'skylar', 'kinsley', 'hailey',
  'rosalie', 'juliette', 'ophelie', 'camille', 'annabelle', 'laurie', 'maeva', 'oceane', 'delphine', 'jade', 'gabrielle', 'mathilde', 'alicia', 'evelyne', 'raphaelle', 'arianne', 'megan', 'mylene',
  'louise', 'ines', 'manon', 'lou', 'agathe', 'lena', 'eva', 'louna', 'adele', 'margaux', 'lola', 'lucie', 'ambre', 'anais', 'capucine', 'clemence', 'romane', 'solene', 'pauline', 'marion', 'marine', 'laurine', 'elise', 'coline', 'apolline', 'celeste', 'margot', 'ninon', 'jeanne', 'suzanne', 'heloise', 'eleonora', 'clarisse', 'aurore',
  'giulia', 'ginevra', 'giorgia', 'maria', 'francesca', 'lucia', 'giovanna', 'caterina', 'angela', 'paola', 'chiara', 'sara', 'ludovica', 'vittoria', 'camilla', 'martina', 'noemi', 'matilde', 'alessia', 'benedetta', 'federica', 'gaia', 'margherita', 'marta', 'rebecca', 'serena', 'silvia', 'valentina', 'bianca', 'claudia', 'flavia', 'simona', 'alessandra', 'cristina', 'ilaria', 'sabrina',
  'aadya', 'ananya', 'shanaya', 'myra', 'saanvi', 'pari', 'anaya', 'aadhya', 'diya', 'anvi', 'isha', 'avni', 'navya', 'siya', 'kavya', 'aavya', 'aayushi', 'aditi', 'ahana', 'akshara', 'amaya', 'amrita', 'anika', 'anisha', 'anushka', 'aradhya', 'bhavya', 'chhavi', 'drishti', 'esha', 'gia', 'hia', 'inaya', 'ishani', 'jiya', 'kaira', 'kiara', 'kyra', 'lipi', 'mahi', 'meher', 'mishka', 'naisha', 'nitya', 'ovi', 'prisha', 'riya', 'sana', 'tanya', 'tara', 'trisha', 'vanya', 'vedika', 'yashvi', 'zoya', 'riddhi', 'siddhi', 'pooja', 'neha', 'priya',
  'aoife', 'saoirse', 'ciara', 'niamh', 'roisin', 'siobhan', 'cara', 'fiadh', 'maeve', 'katie', 'kate', 'sadhbh', 'eimear', 'clodagh', 'caoimhe', 'aisling', 'sinead', 'rachel', 'amy', 'lauren', 'faye', 'abbie', 'leah', 'shauna', 'grainne', 'emer', 'dearbhla', 'bronagh', 'deirdre', 'orlaith', 'riona',
  'nina', 'anja', 'annalena', 'barbara', 'christina', 'elisabeth', 'jana', 'jennifer', 'kerstin', 'leonie', 'magdalena', 'melanie', 'patricia', 'romina', 'stefanie', 'verena', 'sandra', 'astrid', 'birgit',
  'siti', 'nur', 'aisha', 'irdina', 'mei', 'hui', 'anis', 'farah', 'michelle', 'kavitha', 'amanda', 'yasmin', 'divya',
  'nusrat', 'sadia', 'fatima', 'ayesha', 'tasnim', 'farhana', 'samira', 'sumaiya'
]);

const HISPANIC_SURNAMES = new Set([
  'garcia', 'rodriguez', 'martinez', 'hernandez', 'lopez', 'gonzalez', 'perez', 'sanchez', 'ramirez', 'torres', 'flores', 'rivera', 'gomez', 'diaz', 'cruz', 'morales', 'ortiz', 'REYES'
]);

const EAST_ASIAN_NAMES = new Set([
  'nguyen', 'lee', 'tan', 'wong', 'lim', 'ng', 'chua', 'chen', 'teoh', 'goh', 'chung', 'wei', 'mei', 'hui'
]);

const ARAB_MUSLIM_NAMES = new Set([
  'mohammed', 'mohamed', 'yusuf', 'ahmad', 'muhammad', 'amir', 'harith', 'zakir', 'faizal', 'imran', 'danish', 'siti', 'nur', 'aisha', 'irdina', 'anis', 'farah', 'yasmin', 'rahman', 'abdullah', 'ismail', 'ibrahim', 'razak', 'yanis', 'ines'
]);

const SOUTH_ASIAN_SURNAMES = new Set([
  'sharma', 'verma', 'gupta', 'malhotra', 'khanna', 'iyer', 'nair', 'reddy', 'singh', 'khan', 'patel', 'joshi', 'kulkarni', 'deshmukh', 'chauhan', 'mishra', 'pandey', 'yadav', 'bose', 'chatterjee', 'mukherjee', 'dutta', 'das', 'sen', 'banerjee', 'ghosh', 'sarkar', 'roy', 'pillai', 'menon', 'rao', 'naidu', 'hegde', 'shetty', 'bhat', 'prabhu', 'agarwal', 'bansal', 'goel', 'mittal', 'shah', 'mehta', 'trivedi', 'pathak', 'dubey', 'tiwari', 'shukla', 'kapoor', 'chopra', 'anand', 'saxena', 'srivastava', 'rastogi', 'bhatia', 'gill', 'ahuja', 'somani', 'jain', 'tandon', 'bajaj', 'thakur', 'subramaniam', 'ramasamy', 'kaur', 'ullah', 'hasan', 'ahmed', 'chowdhury', 'islam', 'hossain', 'ali', 'siddique'
]);

const AFRICAN_SURNAMES = new Set([
  'onyango', 'kariuki', 'mwangi', 'otieno', 'njoroge', 'maina', 'kipchumba', 'ochieng', 'kamau', 'karanja', 'mutua', 'musyoka', 'wambua', 'kioko', 'mulei', 'ndambuki', 'kilonzo', 'muthoka', 'wambui', 'njeri', 'wangari', 'nyambura', 'wanjiku', 'atieno', 'adhiambo', 'achieng', 'anyango', 'awino', 'juma', 'kiplagat', 'kiprotich', 'kipkorir', 'kipkemboi', 'kibet', 'koech', 'cheruiyot', 'lagat', 'tanui', 'rono', 'sang', 'chepkwony', 'keter', 'bett', 'kirui', 'kiprono', 'kipkoech', 'mutai', 'korir', 'kipsang', 'rotich', 'omwamba', 'wekesa', 'kimani', 'macharia', 'omondi', 'odhiambo', 'chebet', 'wafula', 'oduor', 'nyaga', 'okello'
]);

const STUDENT_CLOTHING_OPTIONS = [
  'a crisp navy blue crewneck sweater layered over a white collared shirt',
  'a forest green smart-casual polo shirt with a neat collar',
  'a burgundy knit V-neck pullover over a light oxford button-down shirt',
  'a dark charcoal tailored student blazer over a pale blue dress shirt',
  'a clean royal blue button-down oxford shirt',
  'a heather grey crewneck sweatshirt with a subtle white undershirt collar showing',
  'an olive green smart casual jacket over a crisp crew-neck t-shirt',
  'a maroon collegiate cardigan over a white collared shirt',
  'a classic black turtleneck sweater',
  'a slate blue denim button-up shirt over a clean white tee',
  'a warm cream cable-knit sweater',
  'a deep teal smart-casual polo shirt',
  'a dark brown corduroy overshirt layered over a beige crewneck tee',
  'a dusty rose or terracotta smart-casual knit top',
  'a navy and white striped Breton smart-casual top'
];

const HAIRSTYLE_MALE = [
  'neatly styled short tapered haircut with natural texture',
  'modern textured crop with clean side fade',
  'natural wavy medium-length hair parted to the side',
  'short curly hair with a clean-cut academic look',
  'classic side-parted brush-back hairstyle',
  'short buzz-fade haircut with well-groomed eyebrows'
];

const HAIRSTYLE_FEMALE = [
  'shoulder-length wavy hair worn down naturally',
  'neat high bun with soft framing strands',
  'long straight hair parted in the middle',
  'natural curly hair styled neatly around the shoulders',
  'sleek low ponytail with a clean side part',
  'protective braided hairstyle pulled back neatly',
  'chic chin-length bob haircut tucked behind the ears'
];

const FACIAL_EXPRESSIONS = [
  'a calm, natural, approachable slight closed-lip smile suitable for an official university ID card',
  'a confident, friendly, relaxed neutral passport expression looking straight into the lens',
  'a warm, composed academic portrait expression with natural eye contact'
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function inferStudentDemographics(studentInfo: StudentInfo): {
  gender: 'male' | 'female';
  ethnicityDescription: string;
  shortEthnicityLabel: string;
} {
  const fullName = (studentInfo.studentName || 'Alex Smith').trim();
  const parts = fullName.split(/\s+/);
  const firstName = (parts[0] || '').toLowerCase().replace(/[^a-z]/g, '');
  const lastName = (parts[parts.length - 1] || '').toLowerCase().replace(/[^a-z]/g, '');
  const location = (studentInfo.location || '').toLowerCase();
  const uni = (studentInfo.universityName || '').toLowerCase();
  const currentPhoto = (studentInfo.photo || '').toLowerCase();

  // 1. Infer Gender
  let gender: 'male' | 'female' = 'male';
  if (FEMALE_NAMES_SET.has(firstName)) {
    gender = 'female';
  } else if (currentPhoto.includes('female_')) {
    gender = 'female';
  } else if (currentPhoto.includes('male_') || currentPhoto.includes('t3_headshot')) {
    gender = 'male';
  } else {
    gender = Math.random() > 0.5 ? 'female' : 'male';
  }

  // 2. Infer Ethnicity / Race based on Name + Location + School + Diversity
  if (AFRICAN_SURNAMES.has(lastName) || AFRICAN_SURNAMES.has(firstName) || location.includes('kenya') || uni.includes('maseno') || uni.includes('masinde') || uni.includes('kenya')) {
    return {
      gender,
      ethnicityDescription: 'East African / Black heritage with rich dark brown skin tone and authentic African facial features',
      shortEthnicityLabel: 'African'
    };
  }

  if (location.includes('bangladesh') || uni.includes('brac')) {
    return {
      gender,
      ethnicityDescription: 'Bangladeshi South Asian heritage with warm medium-brown skin tone and South Asian facial features',
      shortEthnicityLabel: 'South Asian'
    };
  }

  if (SOUTH_ASIAN_SURNAMES.has(lastName) || location.includes('india') || uni.includes('degloor') || uni.includes('dibru')) {
    return {
      gender,
      ethnicityDescription: 'Indian / South Asian heritage with natural warm brown complexion and authentic South Asian facial structure',
      shortEthnicityLabel: 'South Asian'
    };
  }

  if (EAST_ASIAN_NAMES.has(lastName) || EAST_ASIAN_NAMES.has(firstName)) {
    return {
      gender,
      ethnicityDescription: 'East / Southeast Asian Chinese heritage with natural warm fair-to-light-tan skin tone and East Asian facial features',
      shortEthnicityLabel: 'East Asian'
    };
  }

  if (ARAB_MUSLIM_NAMES.has(firstName) || ARAB_MUSLIM_NAMES.has(lastName) || location.includes('malaysia') || uni.includes('malaya') || uni.includes('sunway') || uni.includes('mila')) {
    const isMalay = location.includes('malaysia') || uni.includes('malaya') || uni.includes('sunway') || uni.includes('mila');
    return {
      gender,
      ethnicityDescription: isMalay
        ? 'Southeast Asian Malay heritage with warm olive-tan complexion and authentic Southeast Asian features'
        : 'Middle Eastern / Mediterranean heritage with olive complexion and expressive dark eyes',
      shortEthnicityLabel: isMalay ? 'Southeast Asian' : 'Middle Eastern'
    };
  }

  if (HISPANIC_SURNAMES.has(lastName)) {
    return {
      gender,
      ethnicityDescription: 'Hispanic / Latino heritage with warm olive-tan skin tone and dark brown hair',
      shortEthnicityLabel: 'Hispanic / Latino'
    };
  }

  if (location.includes('italy') || uni.includes('bologna') || uni.includes('minghetti')) {
    return {
      gender,
      ethnicityDescription: 'Southern European / Italian Mediterranean heritage with warm olive skin tone and dark expressive features',
      shortEthnicityLabel: 'Mediterranean'
    };
  }

  // For UK, USA, Canada, Australia, Germany, France, Ireland, Austria:
  // Provide diverse multi-ethnic university demographics so repeated randomizations generate unique races and faces
  const diversePool = [
    {
      ethnicityDescription: 'European / Caucasian heritage with natural fair-to-medium complexion and distinct facial bone structure',
      shortEthnicityLabel: 'European'
    },
    {
      ethnicityDescription: 'Black / African-Diaspora heritage with warm brown skin tone and distinct facial features',
      shortEthnicityLabel: 'Black'
    },
    {
      ethnicityDescription: 'East Asian heritage with natural light-warm skin tone and distinct East Asian facial features',
      shortEthnicityLabel: 'East Asian'
    },
    {
      ethnicityDescription: 'Hispanic / Latino heritage with warm tan complexion and expressive features',
      shortEthnicityLabel: 'Latino'
    },
    {
      ethnicityDescription: 'Mixed-race / Multiracial heritage with warm golden-brown complexion and unique facial features',
      shortEthnicityLabel: 'Mixed Heritage'
    },
    {
      ethnicityDescription: 'South Asian heritage with warm medium-brown skin tone and expressive dark eyes',
      shortEthnicityLabel: 'South Asian'
    },
    {
      ethnicityDescription: 'Northern / Central European heritage with fair skin tone and light brown or auburn hair',
      shortEthnicityLabel: 'European'
    }
  ];

  // Weight slightly towards European for Germany/Austria/Ireland while keeping strong diversity for USA/UK/Canada/Australia
  const isMulticulturalHub = location.includes('usa') || location.includes('uk') || location.includes('canada') || location.includes('australia') || location.includes('london');
  const chosen = isMulticulturalHub
    ? pickRandom(diversePool)
    : Math.random() < 0.65
    ? diversePool[0]
    : pickRandom(diversePool);

  return {
    gender,
    ethnicityDescription: chosen.ethnicityDescription,
    shortEthnicityLabel: chosen.shortEthnicityLabel
  };
}

/**
 * Normalizes any image data URL to a clean 512x512 square WebP/JPEG data URL
 * so it embeds cleanly in ID cards and html-to-image exports.
 */
async function normalizeAvatarDataUrl(rawDataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 512;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(rawDataUrl);
        return;
      }
      // Center-crop square
      const minDim = Math.min(img.width, img.height);
      const sx = (img.width - minDim) / 2;
      const sy = (img.height - minDim) * 0.25; // slight top bias for headshots
      ctx.drawImage(img, sx, Math.max(0, sy), minDim, minDim, 0, 0, size, size);
      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };
    img.onerror = (err) => reject(err);
    img.src = rawDataUrl;
  });
}

/**
 * Fallback Canvas Synthesizer in case Gemini API hits a 429 rate-limit or network error:
 * Takes a random local headshot matching gender, replaces its white background with
 * crisp Studio White or ID Blue, and shifts clothing hue/contrast so the user still gets
 * a unique portrait with the requested background color.
 */
async function synthesizeFallbackAvatar(
  gender: 'male' | 'female',
  bgType: 'white' | 'blue'
): Promise<string> {
  const index = gender === 'male'
    ? Math.floor(Math.random() * 59) + 1
    : Math.floor(Math.random() * 109) + 1;
  const srcUrl = `/assets/avatars/${gender}_${index}.webp`;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 512;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(srcUrl);
        return;
      }

      // Draw base image
      ctx.drawImage(img, 0, 0, size, size);
      const imgData = ctx.getImageData(0, 0, size, size);
      const data = imgData.data;

      // Randomize clothing hue shift for lower third (shoulders/shirt area)
      const hueShift = (Math.random() * 140 + 40) * (Math.PI / 180);
      const cosA = Math.cos(hueShift);
      const sinA = Math.sin(hueShift);

      // Target background RGB
      const bgR = bgType === 'blue' ? 214 : 255;
      const bgG = bgType === 'blue' ? 232 : 255;
      const bgB = bgType === 'blue' ? 252 : 255;

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const idx = (y * size + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          // Detect near-white studio background pixels
          const isNearWhite = r > 236 && g > 236 && b > 236 && Math.abs(r - g) < 12 && Math.abs(g - b) < 12;
          if (isNearWhite && (y < size * 0.72 || x < size * 0.15 || x > size * 0.85)) {
            data[idx] = bgR;
            data[idx + 1] = bgG;
            data[idx + 2] = bgB;
          } else if (y > size * 0.68) {
            // In the clothing region (bottom 32%), if not skin tone, shift clothing color
            const isSkin = r > g && g > b && (r - b) > 25 && r > 90;
            if (!isSkin && !(r > 230 && g > 230 && b > 230)) {
              const nr = r * (0.299 + 0.701 * cosA + 0.168 * sinA) + g * (0.587 - 0.587 * cosA + 0.330 * sinA) + b * (0.114 - 0.114 * cosA - 0.497 * sinA);
              const ng = r * (0.299 - 0.299 * cosA - 0.328 * sinA) + g * (0.587 + 0.413 * cosA + 0.035 * sinA) + b * (0.114 - 0.114 * cosA + 0.292 * sinA);
              const nb = r * (0.299 - 0.300 * cosA + 1.250 * sinA) + g * (0.587 - 0.588 * cosA - 1.050 * sinA) + b * (0.114 + 0.886 * cosA - 0.203 * sinA);
              data[idx] = Math.max(0, Math.min(255, Math.round(nr)));
              data[idx + 1] = Math.max(0, Math.min(255, Math.round(ng)));
              data[idx + 2] = Math.max(0, Math.min(255, Math.round(nb)));
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };
    img.onerror = () => resolve(srcUrl);
    img.src = srcUrl;
  });
}

export async function generateUniqueStudentAvatar(
  studentInfo: StudentInfo,
  bgOption: AvatarBgOption = 'white'
): Promise<GeneratedAvatarItem> {
  const { gender, ethnicityDescription, shortEthnicityLabel } = inferStudentDemographics(studentInfo);
  const resolvedBg: 'white' | 'blue' =
    bgOption === 'random'
      ? Math.random() > 0.45 ? 'white' : 'blue'
      : bgOption;

  const clothing = pickRandom(STUDENT_CLOTHING_OPTIONS);
  const hairstyle = gender === 'male' ? pickRandom(HAIRSTYLE_MALE) : pickRandom(HAIRSTYLE_FEMALE);
  const expression = pickRandom(FACIAL_EXPRESSIONS);
  const age = Math.floor(Math.random() * 7) + 18; // 18-24 university student
  const glassesTrait = Math.random() < 0.22 ? 'wearing modern thin-framed prescription glasses,' : 'no glasses,';
  const uniqueSeed = Math.floor(Math.random() * 900000) + 100000;

  const bgPrompt =
    resolvedBg === 'white'
      ? 'a completely flat, solid, pure studio white background (#FFFFFF) with zero shadows or gradients on the wall, exactly like a cutout passport/ID headshot'
      : 'a completely flat, solid, even studio passport light-blue background (#DBEAFE) with subtle studio lighting';

  const prompt = `Photorealistic official university student ID card portrait photograph of a ${age}-year-old ${gender} university student of ${ethnicityDescription}.
- Hair: ${hairstyle}
- Attire: Wearing ${clothing}, visible from the chest/shoulders up.
- Details: ${glassesTrait} ${expression}, natural skin texture, distinct individual facial features (seed #${uniqueSeed}).
- Composition: Centered front-facing head-and-shoulders passport/student ID portrait, looking directly into the camera lens, level shoulders, even soft studio lighting.
- Background: Set against ${bgPrompt}.
- No text, no watermarks, no borders, no badges, just the clean studio portrait photograph.`;

  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.API_KEY ||
    (import.meta as any).env?.VITE_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        config: {
          temperature: 0.85,
          topP: 0.95,
        },
        contents: {
          parts: [{ text: prompt }]
        }
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData?.data) {
          const rawDataUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
          const normalizedUrl = await normalizeAvatarDataUrl(rawDataUrl);
          return {
            id: `ai-avatar-${Date.now()}-${uniqueSeed}`,
            url: normalizedUrl,
            studentName: studentInfo.studentName || 'Student',
            ethnicity: shortEthnicityLabel,
            gender,
            bgType: resolvedBg,
            clothing,
            timestamp: Date.now()
          };
        }
      }
    } catch (err) {
      console.warn('Gemini avatar generation fallback triggered:', err);
    }
  }

  // Fallback synthesis if API quota is exhausted or unavailable
  const fallbackUrl = await synthesizeFallbackAvatar(gender, resolvedBg);
  return {
    id: `ai-avatar-${Date.now()}-${uniqueSeed}`,
    url: fallbackUrl,
    studentName: studentInfo.studentName || 'Student',
    ethnicity: shortEthnicityLabel,
    gender,
    bgType: resolvedBg,
    clothing,
    timestamp: Date.now()
  };
}
