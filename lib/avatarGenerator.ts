import { StudentInfo } from '../types';

export type AvatarBgOption = 'white' | 'blue' | 'random';
export type AvatarProviderOption = 'default' | 'pollinations' | 'openrouter';
export type AvatarGenderOption = 'random' | 'male' | 'female';

export const RECRAFT_FREE_CUTOFF = new Date("2026-11-27T00:00:00Z");

export function isRecraftFreeCutoffPassed(): boolean {
  return Date.now() >= RECRAFT_FREE_CUTOFF.getTime();
}

export interface GeneratedAvatarItem {
  id: string;
  url: string;
  studentName: string;
  ethnicity: string;
  gender: 'male' | 'female';
  bgType: 'white' | 'blue';
  clothing: string;
  provider?: AvatarProviderOption;
  modelUsed?: string;
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

/**
 * Cryptographically strong random float in [0, 1) using Web Crypto API mixed with high-res time entropy.
 * Guarantees zero predictable sequences across devices, browsers, or page reloads.
 */
export function cryptoRandom(): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const buf = new Uint32Array(2);
    window.crypto.getRandomValues(buf);
    // Mix both 32-bit words with high-res timestamp fractional bits for extra entropy
    const timeJitter = Math.floor((typeof performance !== 'undefined' ? performance.now() : Date.now()) * 1000) >>> 0;
    const mixed = (buf[0] ^ ((buf[1] << 13) | (buf[1] >>> 19)) ^ timeJitter) >>> 0;
    return mixed / 0x100000000;
  }
  return Math.random();
}

export function cryptoRandomInt(min: number, maxInclusive: number): number {
  const span = maxInclusive - min + 1;
  if (span <= 1) return min;
  return min + Math.floor(cryptoRandom() * span);
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(cryptoRandom() * arr.length)];
}

export function cryptoShuffle<T>(arr: readonly T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(cryptoRandom() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
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
    gender = cryptoRandom() > 0.5 ? 'female' : 'male';
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
    : cryptoRandom() < 0.65
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
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.onerror = () => resolve(rawDataUrl);
    img.src = rawDataUrl;
  });
}

const SYNTH_HISTORY_STORAGE_KEY = 'id_gen_synth_avatar_signatures_v5';
const inMemoryUsedSignatures = new Set<string>();
const inMemoryRecentBaseIndices = new Map<'male' | 'female', number[]>();

function getUsedSignatures(): Set<string> {
  if (typeof window === 'undefined') return inMemoryUsedSignatures;
  try {
    const raw = localStorage.getItem(SYNTH_HISTORY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        parsed.forEach((s: string) => inMemoryUsedSignatures.add(s));
      }
    }
  } catch {
    // ignore storage read errors
  }
  return inMemoryUsedSignatures;
}

function recordUsedSignature(sig: string, gender: 'male' | 'female', idxA: number, idxB: number) {
  inMemoryUsedSignatures.add(sig);
  const recent = inMemoryRecentBaseIndices.get(gender) || [];
  recent.push(idxA, idxB);
  const maxRecent = gender === 'male' ? 40 : 75;
  while (recent.length > maxRecent) {
    recent.shift();
  }
  inMemoryRecentBaseIndices.set(gender, recent);

  if (typeof window !== 'undefined') {
    try {
      const arr = Array.from(inMemoryUsedSignatures).slice(-350);
      localStorage.setItem(SYNTH_HISTORY_STORAGE_KEY, JSON.stringify(arr));
    } catch {
      // ignore storage quota errors
    }
  }
}

function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

interface FaceMetrics {
  meanR: number;
  meanG: number;
  meanB: number;
  stdR: number;
  stdG: number;
  stdB: number;
  skinLuma: number;
  eyeY: number;
  faceX: number;
  bgR: number;
  bgG: number;
  bgB: number;
}

/**
 * Analyzes a 400x500 studio portrait buffer to extract:
 * - Corner studio backdrop color (bgR, bgG, bgB)
 * - Cheek & forehead skin color distribution (mean/std RGB & luminance)
 * - Detected eye-level Y coordinate & horizontal nose/face center X
 */
function analyzeStudioPortrait(data: Uint8ClampedArray, w: number, h: number): FaceMetrics {
  // 1. Sample top-left & top-right corner studio backdrop color
  let bgR = 0, bgG = 0, bgB = 0, bgCount = 0;
  for (let y = 2; y < 28; y += 2) {
    for (let x = 2; x < 28; x += 2) {
      const i1 = (y * w + x) * 4;
      const i2 = (y * w + (w - 1 - x)) * 4;
      bgR += data[i1] + data[i2];
      bgG += data[i1 + 1] + data[i2 + 1];
      bgB += data[i1 + 2] + data[i2 + 2];
      bgCount += 2;
    }
  }
  bgR /= Math.max(1, bgCount);
  bgG /= Math.max(1, bgCount);
  bgB /= Math.max(1, bgCount);

  // 2. Sample cheek & nose-bridge skin patch pixels
  const rVals: number[] = [];
  const gVals: number[] = [];
  const bVals: number[] = [];

  const yStart = Math.floor(h * 0.34);
  const yEnd = Math.floor(h * 0.45);
  const xStart = Math.floor(w * 0.37);
  const xEnd = Math.floor(w * 0.63);

  for (let y = yStart; y <= yEnd; y += 2) {
    for (let x = xStart; x <= xEnd; x += 2) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      // Exclude very dark hair/pupil pixels or pure specular highlights
      if (luma > 42 && luma < 242 && r >= b - 10) {
        rVals.push(r);
        gVals.push(g);
        bVals.push(b);
      }
    }
  }

  let meanR = 195, meanG = 152, meanB = 132;
  if (rVals.length > 10) {
    meanR = rVals.reduce((a, b) => a + b, 0) / rVals.length;
    meanG = gVals.reduce((a, b) => a + b, 0) / gVals.length;
    meanB = bVals.reduce((a, b) => a + b, 0) / bVals.length;
  }

  let varR = 0, varG = 0, varB = 0;
  for (let i = 0; i < rVals.length; i++) {
    varR += (rVals[i] - meanR) ** 2;
    varG += (gVals[i] - meanG) ** 2;
    varB += (bVals[i] - meanB) ** 2;
  }
  const n = Math.max(1, rVals.length);
  const stdR = Math.max(8, Math.sqrt(varR / n));
  const stdG = Math.max(8, Math.sqrt(varG / n));
  const stdB = Math.max(8, Math.sqrt(varB / n));
  const skinLuma = 0.299 * meanR + 0.587 * meanG + 0.114 * meanB;

  // 3. Detect vertical eye line (eyeY) by finding the row with strongest dark iris/lash contrast in y ∈ [0.28H, 0.37H]
  let bestEyeY = h * 0.322;
  let minRowLuma = Infinity;
  const eyeYMin = Math.floor(h * 0.285);
  const eyeYMax = Math.floor(h * 0.365);
  const leftEyeX0 = Math.floor(w * 0.36);
  const leftEyeX1 = Math.floor(w * 0.45);
  const rightEyeX0 = Math.floor(w * 0.55);
  const rightEyeX1 = Math.floor(w * 0.64);

  for (let y = eyeYMin; y <= eyeYMax; y++) {
    let rowSum = 0;
    let cnt = 0;
    for (let x = leftEyeX0; x <= leftEyeX1; x += 2) {
      const idx = (y * w + x) * 4;
      rowSum += 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
      cnt++;
    }
    for (let x = rightEyeX0; x <= rightEyeX1; x += 2) {
      const idx = (y * w + x) * 4;
      rowSum += 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
      cnt++;
    }
    const avg = rowSum / Math.max(1, cnt);
    if (avg < minRowLuma) {
      minRowLuma = avg;
      bestEyeY = y;
    }
  }

  // Clamp eyeY to a safe studio range so outliers never misalign
  const clampedEyeY = Math.max(h * 0.30, Math.min(h * 0.345, bestEyeY));

  return {
    meanR,
    meanG,
    meanB,
    stdR,
    stdG,
    stdB,
    skinLuma,
    eyeY: clampedEyeY,
    faceX: w * 0.5,
    bgR,
    bgG,
    bgB,
  };
}

const STUDIO_BLUE_BACKDROPS: Array<[number, number, number]> = [
  [219, 234, 254], // Soft sky blue (#DBEAFE)
  [191, 219, 254], // Classic studio blue (#BFDBFE)
  [186, 230, 253], // Ice studio blue (#BAE6FD)
  [199, 210, 254], // Periwinkle studio blue (#C7D2FE)
  [147, 197, 253], // Vibrant academic blue (#93C5FD)
  [184, 224, 246], // Classic v4 cyan-blue (#B8E0F6)
  [216, 238, 254], // Pale powder blue (#D8EEFE)
  [165, 216, 255], // Cerulean portrait blue (#A5D8FF)
  [207, 232, 252], // Crisp glacial blue (#CFE8FC)
  [176, 212, 245], // Steel studio blue (#B0D4F5)
];

const STUDIO_WHITE_BACKDROPS: Array<[number, number, number]> = [
  [255, 255, 255], // Pure studio white
  [249, 250, 252], // Cool daylight white
  [252, 251, 249], // Warm softbox white
  [245, 247, 250], // Crisp neutral gallery white
];

const STUDIO_WARDROBE_TINTS: Array<{ name: string; r: number; g: number; b: number; strength: number }> = [
  { name: 'deep navy collegiate sweater', r: 24, g: 43, b: 78, strength: 0.65 },
  { name: 'burgundy knit pullover', r: 108, g: 24, b: 42, strength: 0.68 },
  { name: 'forest green smart-casual top', r: 22, g: 68, b: 50, strength: 0.66 },
  { name: 'charcoal tailored blazer', r: 44, g: 48, b: 56, strength: 0.60 },
  { name: 'royal blue oxford shirt', r: 32, g: 74, b: 145, strength: 0.65 },
  { name: 'deep teal polo shirt', r: 20, g: 82, b: 92, strength: 0.66 },
  { name: 'plum academic cardigan', r: 78, g: 34, b: 84, strength: 0.64 },
  { name: 'olive green smart-casual jacket', r: 62, g: 76, b: 46, strength: 0.64 },
  { name: 'slate blue button-up shirt', r: 58, g: 82, b: 112, strength: 0.64 },
  { name: 'warm espresso brown overshirt', r: 76, g: 48, b: 36, strength: 0.64 },
  { name: 'crimson collegiate sweater', r: 128, g: 28, b: 38, strength: 0.66 },
  { name: 'heather indigo crewneck', r: 48, g: 56, b: 98, strength: 0.64 },
];

/**
 * Synthesizes a brand-new, never-before-seen studio portrait on an HTML5 Canvas
 * by combining two compatible v4 studio portraits (skin-tone matched inner-face morph),
 * replacing the studio backdrop (Pure White or Studio Blue), re-coloring the wardrobe,
 * and applying cryptographic geometric micro-variations.
 */
async function synthesizeNovelStudioAvatar(
  gender: 'male' | 'female',
  resolvedBg: 'white' | 'blue'
): Promise<{ dataUrl: string; clothingLabel: string }> {
  const maxIndex = gender === 'male' ? 59 : 109;
  const usedSigs = getUsedSignatures();
  const recentIndices = new Set(inMemoryRecentBaseIndices.get(gender) || []);

  // Build cryptographically shuffled index pool
  const allIndices: number[] = [];
  for (let i = 1; i <= maxIndex; i++) allIndices.push(i);
  const shuffled = cryptoShuffle(allIndices);

  // Pick base portrait idxA avoiding recently used base indices
  let idxA = shuffled[0];
  for (const candidate of shuffled) {
    if (!recentIndices.has(candidate)) {
      idxA = candidate;
      break;
    }
  }

  // Pick 4 candidate indices for idxB (distinct from idxA)
  const candidatesB = shuffled.filter((i) => i !== idxA).slice(0, 4);
  const flipA = cryptoRandom() < 0.5;
  const flipB = cryptoRandom() < 0.5;

  const W = 380;
  const H = 460;

  const drawSourceToBuffer = (img: HTMLImageElement, flip: boolean): ImageData => {
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const ctx = c.getContext('2d')!;
    ctx.save();
    if (flip) {
      ctx.translate(W, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(img, 0, 0, W, H);
    ctx.restore();
    return ctx.getImageData(0, 0, W, H);
  };

  const imgA = await loadImageElement(`/assets/avatars/${gender}_${idxA}.webp`);
  const bufA = drawSourceToBuffer(imgA, flipA);
  const metricsA = analyzeStudioPortrait(bufA.data, W, H);

  // Load candidate B images in parallel and select the one with the closest natural skin luminance
  let bestIdxB = candidatesB[0] || ((idxA % maxIndex) + 1);
  let bestBufB: ImageData | null = null;
  let bestMetricsB: FaceMetrics | null = null;
  let bestSkinDiff = Infinity;

  const loadedCandidates = await Promise.all(
    candidatesB.map(async (cIdx) => {
      try {
        const img = await loadImageElement(`/assets/avatars/${gender}_${cIdx}.webp`);
        const buf = drawSourceToBuffer(img, flipB);
        const metrics = analyzeStudioPortrait(buf.data, W, H);
        return { cIdx, buf, metrics };
      } catch {
        return null;
      }
    })
  );

  for (const item of loadedCandidates) {
    if (!item) continue;
    const skinDiff =
      Math.abs(item.metrics.skinLuma - metricsA.skinLuma) * 1.4 +
      Math.abs(item.metrics.meanR - metricsA.meanR) * 0.5 +
      Math.abs(item.metrics.meanG - metricsA.meanG) * 0.5;
    const sig = `${gender}:${idxA}:${item.cIdx}:${flipA ? 1 : 0}:${flipB ? 1 : 0}`;
    const penalty = usedSigs.has(sig) ? 500 : 0;
    if (skinDiff + penalty < bestSkinDiff) {
      bestSkinDiff = skinDiff + penalty;
      bestIdxB = item.cIdx;
      bestBufB = item.buf;
      bestMetricsB = item.metrics;
    }
  }

  const wardrobe = pickRandom(STUDIO_WARDROBE_TINTS);
  const bgPalette =
    resolvedBg === 'white'
      ? pickRandom(STUDIO_WHITE_BACKDROPS)
      : pickRandom(STUDIO_BLUE_BACKDROPS);

  const morphMode = cryptoRandomInt(0, 2); // 0: Full Inner Face, 1: Upper Eyes/Brows/Nose Bridge, 2: Eyes/Nose/Mouth Oval
  const blendPeak = 0.72 + cryptoRandom() * 0.18; // 0.72 .. 0.90

  const sig = `${gender}:${idxA}:${bestIdxB}:${flipA ? 1 : 0}:${flipB ? 1 : 0}:${wardrobe.name}:${resolvedBg}`;
  recordUsedSignature(sig, gender, idxA, bestIdxB);

  const outCanvas = document.createElement('canvas');
  outCanvas.width = W;
  outCanvas.height = H;
  const outCtx = outCanvas.getContext('2d')!;
  const outImgData = outCtx.createImageData(W, H);
  const dst = outImgData.data;
  const srcA = bufA.data;

  // Eye-alignment offset from B to A
  const shiftX = bestMetricsB ? Math.round(metricsA.faceX - bestMetricsB.faceX) : 0;
  const shiftY = bestMetricsB ? Math.round(metricsA.eyeY - bestMetricsB.eyeY) : 0;

  // Inner face ellipse geometry anchored to A's detected eye line
  const centerX = metricsA.faceX;
  const centerY =
    morphMode === 1
      ? metricsA.eyeY + H * 0.025 // Upper T-zone (brows, eyes, nose bridge)
      : metricsA.eyeY + H * 0.062; // Full inner face (brows, eyes, nose, lips)
  const radiusX = W * 0.142;
  const radiusY = morphMode === 1 ? H * 0.095 : H * 0.138;

  // Skin color transfer ratios (clamped for natural appearance)
  const gainR = bestMetricsB ? Math.max(0.78, Math.min(1.25, metricsA.stdR / bestMetricsB.stdR)) : 1;
  const gainG = bestMetricsB ? Math.max(0.78, Math.min(1.25, metricsA.stdG / bestMetricsB.stdG)) : 1;
  const gainB = bestMetricsB ? Math.max(0.78, Math.min(1.25, metricsA.stdB / bestMetricsB.stdB)) : 1;

  // Slight studio lighting warmth/contrast variation
  const warmthShift = (cryptoRandom() - 0.5) * 7; // -3.5 .. +3.5
  const contrastFactor = 0.98 + cryptoRandom() * 0.05; // 0.98 .. 1.03

  for (let y = 0; y < H; y++) {
    const ny = y / H;
    for (let x = 0; x < W; x++) {
      const nx = x / W;
      const idx = (y * w_const(W) + x) * 4;

      let r = srcA[idx];
      let g = srcA[idx + 1];
      let b = srcA[idx + 2];

      // 1. Inner-face feature synthesis with portrait B
      if (bestBufB && bestMetricsB) {
        const dx = (x - centerX) / radiusX;
        const dy = (y - centerY) / radiusY;
        const distSq = dx * dx + dy * dy;

        if (distSq < 1.0) {
          const bx = Math.max(0, Math.min(W - 1, x - shiftX));
          const by = Math.max(0, Math.min(H - 1, y - shiftY));
          const bIdx = (by * W + bx) * 4;

          const rB = bestBufB.data[bIdx];
          const gB = bestBufB.data[bIdx + 1];
          const bB = bestBufB.data[bIdx + 2];

          // Raised-cosine smooth elliptical feather mask (zero visible seam)
          const dist = Math.sqrt(distSq);
          const feather = 0.5 * (1 + Math.cos(Math.PI * dist));
          const wBlend = feather * blendPeak;

          // Match B's skin chromaticity & luminance to A's skin tone while preserving dark eye/brow details
          const lumaB = 0.299 * rB + 0.587 * gB + 0.114 * bB;
          const darkFeaturePreserve = lumaB < 65 ? 0.35 : 1.0;

          const matchedRB =
            rB * (1 - darkFeaturePreserve) +
            (metricsA.meanR + (rB - bestMetricsB.meanR) * gainR) * darkFeaturePreserve;
          const matchedGB =
            gB * (1 - darkFeaturePreserve) +
            (metricsA.meanG + (gB - bestMetricsB.meanG) * gainG) * darkFeaturePreserve;
          const matchedBB =
            bB * (1 - darkFeaturePreserve) +
            (metricsA.meanB + (bB - bestMetricsB.meanB) * gainB) * darkFeaturePreserve;

          r = r * (1 - wBlend) + matchedRB * wBlend;
          g = g * (1 - wBlend) + matchedGB * wBlend;
          b = b * (1 - wBlend) + matchedBB * wBlend;
        }
      }

      // 2. Detect studio backdrop pixel vs subject
      // Studio backdrop in v4 portraits is blue-dominant (b > r + 10) and close to sampled corner backdrop color
      const dBg = Math.hypot(r - metricsA.bgR, g - metricsA.bgG, b - metricsA.bgB);
      const isOuterMargin = nx < 0.16 || nx > 0.84 || ny < 0.12;
      const isUpperBgZone = ny < 0.72 && (nx < 0.25 || nx > 0.75 || ny < 0.18);
      const blueDominance = b - r;

      let bgAlpha = 0;
      if (ny < 0.86 && blueDominance > 8) {
        const threshold = isOuterMargin ? 68 : isUpperBgZone ? 54 : 38;
        if (dBg < threshold) {
          bgAlpha = Math.min(1, Math.max(0, (threshold - dBg) / 18));
        }
      }

      if (bgAlpha > 0) {
        // Subtle radial studio softbox vignette on the new backdrop
        const radDist = Math.hypot(nx - 0.5, ny - 0.38);
        const vignette = Math.max(0.92, 1 - radDist * 0.12);
        const targetBgR = bgPalette[0] * vignette;
        const targetBgG = bgPalette[1] * vignette;
        const targetBgB = bgPalette[2] * vignette;

        r = r * (1 - bgAlpha) + targetBgR * bgAlpha;
        g = g * (1 - bgAlpha) + targetBgG * bgAlpha;
        b = b * (1 - bgAlpha) + targetBgB * bgAlpha;
      } else if (ny > 0.60) {
        // 3. Wardrobe / Attire Color Transformation on lower portrait region
        // Exclude neck/chest skin region (central V-zone or pixels close to student's skin color)
        const dSkin = Math.hypot(r - metricsA.meanR, g - metricsA.meanG, b - metricsA.meanB);
        const isNeckCenter = Math.abs(nx - 0.5) < 0.11 && ny < 0.78;
        const skinThreshold = isNeckCenter ? 62 : 34;

        if (dSkin > skinThreshold) {
          const verticalRamp = Math.min(1, (ny - 0.60) / 0.08);
          const skinRamp = Math.min(1, (dSkin - skinThreshold) / 28);
          const clothWeight = verticalRamp * skinRamp * wardrobe.strength;

          const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          // Preserve fabric folds, collar shadows, and button highlights via luminance shading
          const shade = Math.pow(Math.max(0.08, Math.min(1.35, luma * 1.45)), 0.85);
          const tintedR = Math.min(255, wardrobe.r * shade + r * 0.22);
          const tintedG = Math.min(255, wardrobe.g * shade + g * 0.22);
          const tintedB = Math.min(255, wardrobe.b * shade + b * 0.22);

          r = r * (1 - clothWeight) + tintedR * clothWeight;
          g = g * (1 - clothWeight) + tintedG * clothWeight;
          b = b * (1 - clothWeight) + tintedB * clothWeight;
        }
      }

      // 4. Subtle studio key-light warmth & contrast grading
      r = (r - 128) * contrastFactor + 128 + warmthShift;
      g = (g - 128) * contrastFactor + 128 + warmthShift * 0.3;
      b = (b - 128) * contrastFactor + 128 - warmthShift * 0.6;

      dst[idx] = Math.max(0, Math.min(255, Math.round(r)));
      dst[idx + 1] = Math.max(0, Math.min(255, Math.round(g)));
      dst[idx + 2] = Math.max(0, Math.min(255, Math.round(b)));
      dst[idx + 3] = 255;
    }
  }

  outCtx.putImageData(outImgData, 0, 0);

  // 5. Apply subtle cryptographically randomized studio framing / facial aspect ratio micro-variation
  const finalCanvas = document.createElement('canvas');
  finalCanvas.width = W;
  finalCanvas.height = H;
  const finalCtx = finalCanvas.getContext('2d')!;

  const zoomX = 1.01 + cryptoRandom() * 0.045; // 1.01 .. 1.055
  const zoomY = 1.01 + cryptoRandom() * 0.045;
  const offsetX = (cryptoRandom() - 0.5) * 6;
  const offsetY = (cryptoRandom() - 0.5) * 5;

  finalCtx.fillStyle = `rgb(${bgPalette[0]}, ${bgPalette[1]}, ${bgPalette[2]})`;
  finalCtx.fillRect(0, 0, W, H);
  finalCtx.save();
  finalCtx.translate(W / 2 + offsetX, H / 2 + offsetY);
  finalCtx.scale(zoomX, zoomY);
  finalCtx.drawImage(outCanvas, -W / 2, -H / 2, W, H);
  finalCtx.restore();

  return {
    dataUrl: finalCanvas.toDataURL('image/jpeg', 0.92),
    clothingLabel: wardrobe.name,
  };
}

function w_const(w: number): number {
  return w;
}

export async function generateUniqueStudentAvatar(
  studentInfo: StudentInfo,
  bgOption: AvatarBgOption = 'white',
  provider: AvatarProviderOption = 'default',
  genderOption: AvatarGenderOption = 'random'
): Promise<GeneratedAvatarItem> {
  const inferred = inferStudentDemographics(studentInfo);
  const gender: 'male' | 'female' =
    genderOption === 'male' || genderOption === 'female'
      ? genderOption
      : provider === 'pollinations' || provider === 'openrouter'
      ? cryptoRandom() < 0.5
        ? 'male'
        : 'female'
      : inferred.gender;
  const { ethnicityDescription, shortEthnicityLabel } = inferred;

  const resolvedBg: 'white' | 'blue' =
    bgOption === 'random'
      ? cryptoRandom() > 0.45 ? 'white' : 'blue'
      : bgOption;

  const uniqueSeed = cryptoRandomInt(100000, 999999);

  if (provider === 'openrouter') {
    const cutoffPassed = Date.now() >= RECRAFT_FREE_CUTOFF.getTime();
    if (cutoffPassed) {
      console.warn('Recraft free model disabled ahead of Nov 28 expiration');
    }

    const endpoint = cutoffPassed
      ? '/api/generate-avatar-pollinations'
      : '/api/generate-avatar-openrouter';

    const response = await fetch(endpoint, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gender,
        bgColor: resolvedBg,
      }),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.success || !data?.image) {
      throw new Error(data?.error || `OpenRouter Recraft generation failed (HTTP ${response.status})`);
    }

    return {
      id: `openrouter-avatar-${Date.now()}-${uniqueSeed}`,
      url: data.image,
      studentName: studentInfo.studentName || 'Student',
      ethnicity: shortEthnicityLabel,
      gender,
      bgType: resolvedBg,
      clothing: 'everyday university attire',
      provider: cutoffPassed ? 'pollinations' : 'openrouter',
      modelUsed: data.modelUsed || data.provider || 'recraft/recraft-v4.1-flash-v2:free',
      timestamp: Date.now(),
    };
  }

  if (provider === 'pollinations') {
    const response = await fetch('/api/generate-avatar-pollinations', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gender,
        bgColor: resolvedBg,
      }),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.success || !data?.image) {
      throw new Error(data?.error || `Pollinations generation failed (HTTP ${response.status})`);
    }

    return {
      id: `pollinations-avatar-${Date.now()}-${uniqueSeed}`,
      url: data.image,
      studentName: studentInfo.studentName || 'Student',
      ethnicity: shortEthnicityLabel,
      gender,
      bgType: resolvedBg,
      clothing: 'everyday university attire',
      provider: 'pollinations',
      modelUsed: data.modelUsed || 'community/scriptsnsenses-sys/flux-2-dev-free',
      timestamp: Date.now(),
    };
  }

  const clothing = pickRandom(STUDENT_CLOTHING_OPTIONS);
  const hairstyle = gender === 'male' ? pickRandom(HAIRSTYLE_MALE) : pickRandom(HAIRSTYLE_FEMALE);
  const expression = pickRandom(FACIAL_EXPRESSIONS);
  const age = cryptoRandomInt(18, 25);
  const glassesTrait = cryptoRandom() < 0.22 ? 'wearing modern thin-framed eyeglasses,' : 'no glasses,';

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
          provider: 'default',
          timestamp: Date.now()
        };
      }
    }
  } catch (err) {
    console.warn('Server avatar generation failed, synthesizing unique studio portrait:', err);
  }

  // Synthesize a brand-new, never-before-seen v4 studio portrait using cryptographic randomness
  const synthesized = await synthesizeNovelStudioAvatar(gender, resolvedBg);
  return {
    id: `ai-avatar-${Date.now()}-${uniqueSeed}`,
    url: synthesized.dataUrl,
    studentName: studentInfo.studentName || 'Student',
    ethnicity: shortEthnicityLabel,
    gender,
    bgType: resolvedBg,
    clothing: synthesized.clothingLabel,
    provider: 'default',
    timestamp: Date.now()
  };
}

