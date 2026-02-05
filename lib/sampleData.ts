
import { StudentInfo } from '../types';

const MALE_AVATARS = [
  "https://files.catbox.moe/m7lj8u.png",
  "https://files.catbox.moe/u1skwz.png",
  "https://files.catbox.moe/z2ersq.png",
  "https://files.catbox.moe/3kliif.png",
  "https://files.catbox.moe/a4f1ct.png",
  "https://files.catbox.moe/8eq6dp.png"
];

const FEMALE_AVATARS = [
  "https://files.catbox.moe/bx9f18.png",
  "https://files.catbox.moe/w22pf1.png",
  "https://files.catbox.moe/4w42hk.png",
  "https://files.catbox.moe/c0ot8t.png"
];

const UK_MALE_FIRST_NAMES = [
  'James', 'Jack', 'Harry', 'Charlie', 'George', 'Oscar', 'William', 'Noah', 'Alfie', 'Leo',
  'Jacob', 'Archie', 'Henry', 'Joshua', 'Arthur', 'Theo', 'Freddie', 'Mason', 'Isaac', 'Lucas',
  'Arlo', 'Teddy', 'Finley', 'Toby', 'Jude', 'Hugo', 'Roman', 'Sebastian', 'Felix', 'Reuben',
  'Rory', 'Ezra', 'Oliver', 'Benjamin'
];

const UK_FEMALE_FIRST_NAMES = [
  'Olivia', 'Sophie', 'Emily', 'Amelia', 'Isabella', 'Ava', 'Mia', 'Grace', 'Lily', 'Evie',
  'Freya', 'Florence', 'Daisy', 'Poppy', 'Sienna', 'Ivy', 'Willow', 'Phoebe', 'Evelyn', 'Ella',
  'Zoe', 'Luna', 'Maya', 'Mila', 'Thea', 'Ada', 'Hallie', 'Lottie', 'Rose', 'Aurora',
  'Orla', 'Iris', 'Matilda', 'Charlotte', 'Alice'
];

const KENYA_MALE_FIRST_NAMES = [
  'Kiprop', 'Wanjala', 'Juma', 'Kiplagat', 'Kamau', 'Mutua', 'Samuel', 'David', 'Daniel', 'Michael',
  'Peter', 'John', 'Kibet', 'Kipkorir', 'Kipkemoi', 'Maina', 'Mwangi', 'Njoroge', 'Karanja', 'Njenga',
  'Kimani', 'Otieno', 'Onyango', 'Ochieng', 'Odhiambo', 'Okoth', 'Owino', 'Wekesa', 'Wafula', 'Simiyu',
  'Barasa', 'Hamisi', 'Bakari', 'Omar', 'Ali', 'Hassan', 'Saidi', 'Abdallah', 'Musa', 'Yusuf', 'Ibrahim'
];

const KENYA_FEMALE_FIRST_NAMES = [
  'Achieng', 'Moraa', 'Nekesa', 'Sarah', 'Jessica', 'Ruth', 'Naomi', 'Atieno', 'Adhiambo', 'Akoth',
  'Akinyi', 'Anyango', 'Nafula', 'Nasimiyu', 'Njeri', 'Wambui', 'Wangari', 'Muthoni', 'Nyambura', 'Mumbi',
  'Dzame', 'Mbeyu', 'Khadija', 'Fatuma', 'Amina', 'Zainabu', 'Zawadi', 'Neema', 'Pendo', 'Rehema'
];

const UK_LAST_NAMES = [
  'Smith', 'Jones', 'Taylor', 'Williams', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas', 'Roberts',
  'Johnson', 'Lewis', 'Walker', 'Robinson', 'Wood', 'Thompson', 'White', 'Watson', 'Jackson', 'Wright',
  'Green', 'Harris', 'Cooper', 'King', 'Lee', 'Martin', 'Clarke', 'James', 'Morgan', 'Hughes',
  'Edwards', 'Hill', 'Moore', 'Harrison', 'Scott', 'Young', 'Morris', 'Ward', 'Knight', 'Turner',
  'Miller', 'Davis', 'Anderson', 'Clark', 'Marshall', 'Collins', 'Bennett', 'Cox', 'Richardson', 'Fox'
];

const KENYA_LAST_NAMES = [
  'Onyango', 'Kariuki', 'Mwangi', 'Otieno', 'Njoroge', 'Maina', 'Kipchumba', 'Ochieng', 'Kamau', 'Karanja',
  'Kipkorir', 'Kipkemoi', 'Kiprotich', 'Kipchirchir', 'Kipsang', 'Kiprono', 'Kiplagat', 'Kiprop', 'Kiptoo', 'Kiptum',
  'Chebet', 'Chepkoech', 'Chepkirui', 'Cherono', 'Cheruiyot', 'Chepngetich', 'Chepkorir', 'Juma', 'Wanjala', 'Wafula',
  'Simiyu', 'Wekesa', 'Barasa', 'Nekesa', 'Nafula', 'Nasimiyu', 'Okoth', 'Owino', 'Odhiambo', 'Omondi',
  'Okeyo', 'Oluoch', 'Obiero', 'Ouma', 'Okumu', 'Ogeto', 'Moraa', 'Nyaboke', 'Kerubo', 'Kwamboka'
];

const universities = [
  'Community-Ed Academy',
  'CommunityNI',
  'University of Warwick',
  'Brookfield Community School',
  'Cranford Community College',
  'Delgado Community College',
  'Faringdon Community College',
  'Heston Community School',
  'Hinds Community College',
  'Knowsley Community College',
  'Laurelhill Community College',
  'Bournemouth University',
  'Church Stretton School',
  'Kenya Medical Training College (Kakamega)'
];

const UK_CITIES = [
  'London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Southampton', 'Liverpool', 'Newcastle', 'Sheffield',
  'Bristol', 'Nottingham', 'Leicester', 'Edinburgh', 'Cardiff', 'Belfast', 'Brighton', 'Cambridge', 'Oxford'
];

const KENYA_CITIES = [
  'Kakamega', 'Nairobi', 'Kisumu', 'Mombasa', 'Eldoret', 'Nakuru', 'Machakos', 'Thika'
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getRandomDate = (): string => {
  const start = new Date(2000, 0, 1);
  const end = new Date(2007, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const getRandomPhoneNumber = (isKenyan: boolean): string => {
  if (isKenyan) {
    const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    return `+254 7${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5)}`;
  }
  const number = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return `+44 7${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
};

const getRandomId = (university: string): string => {
  const year = "26"; 
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  if (university.includes('Kenya Medical Training College')) {
    return `KMTC/KKM/20${year}/${randomNum}`;
  }
  return `CEA-${year}-${randomNum}`;
};

const getRandomPostcode = (isKenyan: boolean): string => {
  if (isKenyan) {
    return `P.O. BOX 535 - 50100`;
  }
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const L = () => letters.charAt(Math.floor(Math.random() * letters.length));
  const N = () => Math.floor(Math.random() * 9) + 1;
  return `${L()}${L()}${N()} ${N()}${L()}${L()}`;
}

/**
 * Generates random student info. 
 * If fixedUniversity is provided, it will stay on that school and use relevant region data.
 */
export const generateRandomStudentInfo = (fixedUniversity?: string): StudentInfo => {
  const university = fixedUniversity || getRandomElement(universities);
  const isKenyan = university.includes('Kenya Medical Training College');
  
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  
  let firstName: string;
  let photo: string;

  if (gender === 'male') {
    firstName = isKenyan ? getRandomElement(KENYA_MALE_FIRST_NAMES) : getRandomElement(UK_MALE_FIRST_NAMES);
    photo = getRandomElement(MALE_AVATARS);
  } else {
    firstName = isKenyan ? getRandomElement(KENYA_FEMALE_FIRST_NAMES) : getRandomElement(UK_FEMALE_FIRST_NAMES);
    photo = getRandomElement(FEMALE_AVATARS);
  }

  const lastName = isKenyan ? getRandomElement(KENYA_LAST_NAMES) : getRandomElement(UK_LAST_NAMES);
  const city = isKenyan ? getRandomElement(KENYA_CITIES) : getRandomElement(UK_CITIES);
  const postcode = getRandomPostcode(isKenyan);

  return {
    universityName: university,
    studentName: `${firstName} ${lastName}`.toUpperCase(),
    dob: getRandomDate(),
    studentId: getRandomId(university),
    phone: getRandomPhoneNumber(isKenyan),
    address: isKenyan ? `${postcode}, ${city}, Kenya` : `${Math.floor(Math.random() * 100) + 1} High Street, ${city}, ${postcode}`,
    academicYear: '2026/2027',
    photo: photo,
    logo: null,
    bloodGroup: getRandomElement(bloodGroups),
    emergencyContact: getRandomPhoneNumber(isKenyan),
  };
};
