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
  'garcia', 'rodriguez', 'martinez', 'hernandez', 'lopez', 'gonzalez', 'perez', 'sanchez', 'ramirez', 'torres', 'flores', 'rivera', 'gomez', 'diaz', 'cruz', 'morales', 'ortiz', 'reyes'
]);

const EAST_ASIAN_NAMES = new Set([
  'nguyen', 'lee', 'tan', 'wong', 'lim', 'ng', 'chua', 'chen', 'teoh', 'goh', 'chung', 'wei', 'mei', 'hui',
  'lin', 'huang', 'chang', 'wang', 'wu', 'liu', 'tsai', 'yang', 'hsu', 'cheng', 'hsieh', 'kuo', 'hung', 'tseng', 'liao', 'chou', 'yeh', 'lu'
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
  'a calm, natural, approachable slight closed-lip smile suitable for a studio headshot',
  'a confident, friendly, relaxed neutral studio expression looking straight into the lens',
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

  if (
    EAST_ASIAN_NAMES.has(lastName) ||
    EAST_ASIAN_NAMES.has(firstName) ||
    location.includes('taiwan') ||
    location.includes('taipei') ||
    location.includes('tainan') ||
    location.includes('taichung') ||
    location.includes('hsinchu') ||
    location.includes('puzi')
  ) {
    return {
      gender,
      ethnicityDescription: 'East Asian / Taiwanese heritage with natural warm fair-to-light-tan skin tone and East Asian facial features',
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
 * Downscales a base64 image dataURL to a clean 360x360 JPEG so it embeds fast in html-to-image
 * and fits comfortably in memory / localStorage.
 */
async function downscaleDataUrl(rawDataUrl: string, size: number = 360): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(rawDataUrl);
        return;
      }
      ctx.drawImage(img, 0, 0, size, size);
      resolve(canvas.toDataURL('image/jpeg', 0.88));
    };
    img.onerror = () => resolve(rawDataUrl);
    img.src = rawDataUrl;
  });
}

// Track used studio v4 avatar indices so each generation picks a fresh, unused v4 studio portrait
const usedMaleV4Indices = new Set<number>();
const usedFemaleV4Indices = new Set<number>();

function pickNextUnusedV4Avatar(gender: 'male' | 'female', currentPhoto?: string): string {
  const maxIndex = gender === 'male' ? 59 : 109;
  const usedSet = gender === 'male' ? usedMaleV4Indices : usedFemaleV4Indices;

  if (usedSet.size >= maxIndex) {
    usedSet.clear();
  }

  const candidates: number[] = [];
  for (let i = 1; i <= maxIndex; i++) {
    const url = `/assets/avatars/${gender}_${i}.webp`;
    if (!usedSet.has(i) && url !== currentPhoto) {
      candidates.push(i);
    }
  }

  const chosenIdx =
    candidates.length > 0
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : Math.floor(Math.random() * maxIndex) + 1;

  usedSet.add(chosenIdx);
  return `/assets/avatars/${gender}_${chosenIdx}.webp`;
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
  const age = Math.floor(Math.random() * 7) + 18; // 18-24 college student
  const glassesTrait = Math.random() < 0.22 ? 'wearing modern thin-framed eyeglasses,' : 'no glasses,';
  const uniqueSeed = Math.floor(Math.random() * 900000) + 100000;

  const bgPrompt =
    resolvedBg === 'white'
      ? 'a completely flat, solid, pure studio white backdrop (#FFFFFF) with even lighting and zero wall shadows'
      : 'a completely flat, solid, soft studio light-blue backdrop (#DBEAFE) with even studio lighting';

  const prompt = `Photorealistic studio head-and-shoulders portrait photograph of a ${age}-year-old ${gender} college student of ${ethnicityDescription}.
- Hair: ${hairstyle}
- Attire: Wearing ${clothing}, visible from the chest and shoulders up.
- Details: ${glassesTrait} ${expression}, natural skin texture, distinct individual facial features (variation #${uniqueSeed}).
- Composition: Centered front-facing head-and-shoulders studio portrait, looking directly into the camera lens, level shoulders, even soft studio lighting.
- Background: Set against ${bgPrompt}.
- Clean studio portrait photograph only, no text, no watermarks, no borders.`;

  try {
    const response = await fetch('/api/gemini/avatar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.dataUrl) {
        const compactUrl = await downscaleDataUrl(data.dataUrl, 360);
        return {
          id: `ai-avatar-${Date.now()}-${uniqueSeed}`,
          url: compactUrl,
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
    console.warn('Server avatar generation failed, using v4 studio avatar:', err);
  }

  // Fallback to the v4 studio portrait collection (unused index per session)
  const fallbackUrl = pickNextUnusedV4Avatar(gender, studentInfo.photo || undefined);
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
