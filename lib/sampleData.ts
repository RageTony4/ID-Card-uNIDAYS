
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

const UK_MALE_FIRST_NAMES = ['James', 'Jack', 'Harry', 'Charlie', 'George', 'Oscar', 'William', 'Noah', 'Alfie', 'Leo', 'Jacob', 'Archie', 'Henry', 'Joshua', 'Arthur', 'Theo', 'Freddie', 'Mason', 'Isaac', 'Lucas'];
const UK_FEMALE_FIRST_NAMES = ['Olivia', 'Sophie', 'Emily', 'Amelia', 'Isabella', 'Ava', 'Mia', 'Grace', 'Lily', 'Evie', 'Freya', 'Florence', 'Daisy', 'Poppy', 'Sienna', 'Ivy', 'Willow', 'Phoebe', 'Evelyn', 'Ella'];
const KENYA_MALE_FIRST_NAMES = ['Kiprop', 'Wanjala', 'Juma', 'Kiplagat', 'Kamau', 'Mutua', 'Samuel', 'David', 'Daniel', 'Michael'];
const KENYA_FEMALE_FIRST_NAMES = ['Achieng', 'Moraa', 'Nekesa', 'Sarah', 'Jessica', 'Ruth', 'Naomi', 'Atieno', 'Adhiambo', 'Akoth'];
const GERMANY_MALE_FIRST_NAMES = ['Lukas', 'Leon', 'Luca', 'Finn', 'Elias', 'Jonas', 'Luis', 'Liam', 'Felix', 'Ben', 'Noah', 'Maximilian', 'Paul', 'Alexander', 'Julian', 'Matteo', 'Theo', 'Karl', 'Otto'];
const GERMANY_FEMALE_FIRST_NAMES = ['Mia', 'Emma', 'Sofia', 'Hannah', 'Emilia', 'Anna', 'Marie', 'Mila', 'Lina', 'Lea', 'Leni', 'Clara', 'Luisa', 'Maja', 'Frieda', 'Charlotte', 'Johanna', 'Paula'];

const UK_LAST_NAMES = ['Smith', 'Jones', 'Taylor', 'Williams', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas', 'Roberts'];
const KENYA_LAST_NAMES = ['Onyango', 'Kariuki', 'Mwangi', 'Otieno', 'Njoroge', 'Maina', 'Kipchumba', 'Ochieng', 'Kamau', 'Karanja'];
const GERMANY_LAST_NAMES = ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann'];

const SCHOOL_ADDRESS_MAP: Record<string, { city: string, address: string, postcode: string, country: 'UK' | 'Kenya' | 'Germany' }> = {
  'Birmingham City FC Community Trust': { city: 'Birmingham', address: 'St. Andrew\'s Stadium, Birmingham', postcode: 'B9 4RL', country: 'UK' },
  'Communicate School': { city: 'Manchester', address: '24 Nicholas St, Manchester', postcode: 'M1 4EJ', country: 'UK' },
  'Manchester Communication Academy': { city: 'Manchester', address: 'Silchester Drive, Manchester', postcode: 'M40 8NT', country: 'UK' },
  'Ysgol Comins Coch': { city: 'Ceredigion', address: 'Comins Coch, Aberystwyth', postcode: 'SY23 3BD', country: 'UK' },
  'Adanac Commercial College': { city: 'London', address: '162-164 High St, London', postcode: 'SE13 6JL', country: 'UK' },
  'Giggleswick School': { city: 'Settle', address: 'Settle, North Yorkshire', postcode: 'BD24 0DE', country: 'UK' },
  'Carlton Keighley': { city: 'Keighley', address: 'Undercliffe Lane, Keighley', postcode: 'BD21 4RN', country: 'UK' },
  'Community-Ed Academy': { city: 'London', address: '42 High Street, Kensington, London', postcode: 'SW7 2AZ', country: 'UK' },
  'CommunityNI': { city: 'Belfast', address: '35 Donegall St, Belfast', postcode: 'BT1 2FG', country: 'UK' },
  'University of Warwick': { city: 'Coventry', address: 'University Road, Coventry', postcode: 'CV4 7AL', country: 'UK' },
  'Brookfield Community School': { city: 'Chesterfield', address: 'Chatsworth Rd, Chesterfield', postcode: 'S40 3NR', country: 'UK' },
  'Cranford Community College': { city: 'Hounslow', address: 'High St, Hounslow', postcode: 'TW5 9PD', country: 'UK' },
  'Delgado Community College': { city: 'London', address: '12-14 New Fetter Ln, London', postcode: 'EC4A 1AN', country: 'UK' },
  'Faringdon Community College': { city: 'Faringdon', address: 'Fernham Rd, Faringdon', postcode: 'SN7 7JZ', country: 'UK' },
  'Heston Community School': { city: 'Hounslow', address: 'Heston Rd, Hounslow', postcode: 'TW5 0QR', country: 'UK' },
  'Hinds Community College': { city: 'Oxford', address: 'Gipsy Ln, Headington, Oxford', postcode: 'OX3 0BP', country: 'UK' },
  'Knowsley Community College': { city: 'Prescot', address: 'Stockbridge Ln, Huyton, Prescot', postcode: 'L36 3SD', country: 'UK' },
  'Laurelhill Community College': { city: 'Lisburn', address: '22 Laurelhill Rd, Lisburn', postcode: 'BT28 2UH', country: 'UK' },
  'Bournemouth University': { city: 'Bournemouth', address: 'Fern Barrow, Poole, Bournemouth', postcode: 'BH12 5BB', country: 'UK' },
  'Church Stretton School': { city: 'Shropshire', address: 'Shrewsbury Rd, Church Stretton', postcode: 'SY6 6EX', country: 'UK' },
  'Kenya Medical Training College (Kakamega)': { city: 'Kakamega', address: 'P.O. Box 535, Kakamega', postcode: '50100', country: 'Kenya' },
  'Salem Community School': { city: 'Salem', address: 'Schlossbezirk 1, 88682 Salem', postcode: '88682', country: 'Germany' },
  'Shepherd School': { city: 'Rendsburg', address: 'Am Stadtsee 1, 24768 Rendsburg', postcode: '24768', country: 'Germany' }
};

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getRandomDate = (): string => {
  const start = new Date(2000, 0, 1);
  const end = new Date(2007, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const getRandomPhoneNumber = (country: 'Kenya' | 'UK' | 'Germany'): string => {
  if (country === 'Kenya') {
    const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    return `+254 7${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5)}`;
  } else if (country === 'Germany') {
    const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    return `+49 15${Math.floor(Math.random() * 9)} ${number.slice(0, 4)} ${number.slice(4)}`;
  }
  const number = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return `+44 7${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
};

const getRandomId = (university: string): string => {
  const year = "26"; 
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  if (university.includes('Kenya Medical Training College')) return `KMTC/KKM/20${year}/${randomNum}`;
  if (university === 'Salem Community School') return `SCS-DE-${year}-${randomNum}`;
  if (university === 'Shepherd School') return `SS-DE-${year}-${randomNum}`;
  return `CEA-${year}-${randomNum}`;
};

export const generateRandomStudentInfo = (fixedUniversity?: string): StudentInfo => {
  const university = fixedUniversity || getRandomElement(Object.keys(SCHOOL_ADDRESS_MAP));
  const details = SCHOOL_ADDRESS_MAP[university] || { city: 'London', address: 'High Street, London', postcode: 'SW1A 1AA', country: 'UK' };
  
  const countryType = details.country;
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  
  let firstName: string;
  let photo: string;

  if (gender === 'male') {
    firstName = countryType === 'Kenya' ? getRandomElement(KENYA_MALE_FIRST_NAMES) : countryType === 'Germany' ? getRandomElement(GERMANY_MALE_FIRST_NAMES) : getRandomElement(UK_MALE_FIRST_NAMES);
    photo = getRandomElement(MALE_AVATARS);
  } else {
    firstName = countryType === 'Kenya' ? getRandomElement(KENYA_FEMALE_FIRST_NAMES) : countryType === 'Germany' ? getRandomElement(GERMANY_FEMALE_FIRST_NAMES) : getRandomElement(UK_FEMALE_FIRST_NAMES);
    photo = getRandomElement(FEMALE_AVATARS);
  }

  const lastName = countryType === 'Kenya' ? getRandomElement(KENYA_LAST_NAMES) : countryType === 'Germany' ? getRandomElement(GERMANY_LAST_NAMES) : getRandomElement(UK_LAST_NAMES);
  
  const phone = getRandomPhoneNumber(countryType);

  return {
    universityName: university,
    studentName: `${firstName} ${lastName}`.toUpperCase(),
    dob: getRandomDate(),
    studentId: getRandomId(university),
    phone: phone,
    address: `${details.address}, ${details.postcode}, ${countryType === 'UK' ? 'UK' : countryType}`,
    location: `${details.city}, ${countryType === 'UK' ? 'UK' : countryType}`,
    academicYear: '2026/2027',
    photo: photo,
    logo: null,
    bloodGroup: getRandomElement(bloodGroups),
    emergencyContact: getRandomPhoneNumber(countryType),
  };
};
