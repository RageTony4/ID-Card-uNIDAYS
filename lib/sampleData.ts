
import { StudentInfo } from '../types';

const firstNames = [
  'James', 'Olivia', 'Jack', 'Sophie', 'Harry', 'Emily', 'Charlie', 'Amelia', 'Thomas', 'Isabella',
  'George', 'Ava', 'Oscar', 'Mia', 'William', 'Grace', 'Noah', 'Lily', 'Alfie', 'Evie',
  'Leo', 'Freya', 'Jacob', 'Florence', 'Archie', 'Daisy', 'Henry', 'Poppy', 'Joshua', 'Sienna',
  'Kiprop', 'Wanjala', 'Achieng', 'Moraa', 'Nekesa', 'Juma', 'Kiplagat', 'Kamau', 'Mutua',
  'Samuel', 'David', 'Sarah', 'Jessica', 'Daniel', 'Michael', 'Ruth', 'Naomi', 'Peter', 'John'
];

const lastNames = [
  'Smith', 'Jones', 'Taylor', 'Williams', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas', 'Roberts',
  'Johnson', 'Lewis', 'Walker', 'Robinson', 'Wood', 'Thompson', 'White', 'Watson', 'Jackson', 'Wright',
  'Green', 'Harris', 'Cooper', 'King', 'Lee', 'Martin', 'Clarke', 'James', 'Morgan', 'Hughes',
  'Onyango', 'Kariuki', 'Mwangi', 'Otieno', 'Njoroge', 'Maina', 'Kipchumba', 'Ochieng', 'Kamau', 'Karanja'
];

const universities = [
  'Community-Ed Academy',
  'CommunityNI',
  'University of Warwick',
  'Kenya Medical Training College (Kakamega)'
];

const cities = [
  'London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Southampton', 'Liverpool', 'Newcastle', 'Sheffield',
  'Bristol', 'Nottingham', 'Leicester', 'Edinburgh', 'Cardiff', 'Belfast', 'Brighton', 'Cambridge', 'Oxford',
  'Kakamega', 'Nairobi', 'Kisumu', 'Mombasa', 'Eldoret'
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
 * If fixedUniversity is provided, it will stay on that school.
 */
export const generateRandomStudentInfo = (fixedUniversity?: string): StudentInfo => {
  const university = fixedUniversity || getRandomElement(universities);
  const isKenyan = university.includes('Kenya Medical Training College');
  
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  const city = isKenyan ? 'Kakamega' : getRandomElement(cities);
  const postcode = getRandomPostcode(isKenyan);

  // Using timestamp in seed to ensure high uniqueness for photos
  const photoSeed = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  return {
    universityName: university,
    studentName: `${firstName} ${lastName}`.toUpperCase(),
    dob: getRandomDate(),
    studentId: getRandomId(university),
    phone: getRandomPhoneNumber(isKenyan),
    address: isKenyan ? `${postcode}, Kakamega, Kenya` : `${Math.floor(Math.random() * 100) + 1} High Street, ${city}, ${postcode}`,
    academicYear: '2026/2027',
    photo: `https://picsum.photos/seed/${photoSeed}/252/324`,
    logo: null,
    bloodGroup: getRandomElement(bloodGroups),
    emergencyContact: getRandomPhoneNumber(isKenyan),
  };
};
