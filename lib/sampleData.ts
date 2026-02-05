
import { StudentInfo } from '../types';

const UK_FIRST_NAMES = [
  'James', 'Olivia', 'Jack', 'Sophie', 'Harry', 'Emily', 'Charlie', 'Amelia', 'Thomas', 'Isabella',
  'George', 'Ava', 'Oscar', 'Mia', 'William', 'Grace', 'Noah', 'Lily', 'Alfie', 'Evie',
  'Leo', 'Freya', 'Jacob', 'Florence', 'Archie', 'Daisy', 'Henry', 'Poppy', 'Joshua', 'Sienna',
  'Arthur', 'Ivy', 'Theo', 'Willow', 'Freddie', 'Phoebe', 'Mason', 'Evelyn', 'Isaac', 'Ella',
  'Zoe', 'Lucas', 'Arlo', 'Luna', 'Teddy', 'Maya', 'Finley', 'Mila', 'Toby', 'Thea',
  'Jude', 'Ada', 'Hugo', 'Hallie', 'Roman', 'Lottie', 'Sebastian', 'Rose', 'Felix', 'Aurora',
  'Reuben', 'Orla', 'Rory', 'Iris', 'Ezra', 'Matilda', 'Oliver', 'Charlotte', 'Benjamin', 'Alice'
];

const UK_LAST_NAMES = [
  'Smith', 'Jones', 'Taylor', 'Williams', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas', 'Roberts',
  'Johnson', 'Lewis', 'Walker', 'Robinson', 'Wood', 'Thompson', 'White', 'Watson', 'Jackson', 'Wright',
  'Green', 'Harris', 'Cooper', 'King', 'Lee', 'Martin', 'Clarke', 'James', 'Morgan', 'Hughes',
  'Edwards', 'Hill', 'Moore', 'Harrison', 'Scott', 'Young', 'Morris', 'Ward', 'Knight', 'Turner',
  'Miller', 'Davis', 'Anderson', 'Clark', 'Marshall', 'Collins', 'Bennett', 'Cox', 'Richardson', 'Fox',
  'Gray', 'Rose', 'Chapman', 'Hunt', 'Palmer', 'Mills', 'Holmes', 'Rogers', 'Stevens', 'Walsh',
  'Hunter', 'Webb', 'Simpson', 'Mason', 'Butler'
];

const KENYA_FIRST_NAMES = [
  'Kiprop', 'Wanjala', 'Achieng', 'Moraa', 'Nekesa', 'Juma', 'Kiplagat', 'Kamau', 'Mutua', 'Samuel',
  'David', 'Sarah', 'Jessica', 'Daniel', 'Michael', 'Ruth', 'Naomi', 'Peter', 'John', 'Kibet',
  'Kipkorir', 'Kipkemoi', 'Maina', 'Mwangi', 'Njoroge', 'Karanja', 'Njenga', 'Kimani', 'Otieno', 'Onyango',
  'Ochieng', 'Odhiambo', 'Okoth', 'Owino', 'Atieno', 'Adhiambo', 'Akoth', 'Akinyi', 'Anyango', 'Wekesa',
  'Wafula', 'Simiyu', 'Barasa', 'Nafula', 'Nasimiyu', 'Njeri', 'Wambui', 'Wangari', 'Muthoni', 'Nyambura',
  'Mumbi', 'Dzame', 'Mbeyu', 'Khadija', 'Fatuma', 'Amina', 'Zainabu', 'Zawadi', 'Neema', 'Pendo',
  'Rehema', 'Hamisi', 'Bakari', 'Omar', 'Ali', 'Hassan', 'Saidi', 'Abdallah', 'Musa', 'Yusuf', 'Ibrahim'
];

const KENYA_LAST_NAMES = [
  'Onyango', 'Kariuki', 'Mwangi', 'Otieno', 'Njoroge', 'Maina', 'Kipchumba', 'Ochieng', 'Kamau', 'Karanja',
  'Kipkorir', 'Kipkemoi', 'Kiprotich', 'Kipchirchir', 'Kipsang', 'Kiprono', 'Kiplagat', 'Kiprop', 'Kiptoo', 'Kiptum',
  'Chebet', 'Chepkoech', 'Chepkirui', 'Cherono', 'Cheruiyot', 'Chepngetich', 'Chepkorir', 'Juma', 'Wanjala', 'Wafula',
  'Simiyu', 'Wekesa', 'Barasa', 'Nekesa', 'Nafula', 'Nasimiyu', 'Okoth', 'Owino', 'Odhiambo', 'Omondi',
  'Okeyo', 'Oluoch', 'Obiero', 'Ouma', 'Okumu', 'Ogeto', 'Moraa', 'Nyaboke', 'Kerubo', 'Kwamboka',
  'Kemunto', 'Mogaka', 'Onsongo', 'Nyambane', 'Makori', 'Kebaso', 'Mutua', 'Musyoka', 'Muli', 'Mwikali',
  'Syombua', 'Ndambuki', 'Kilonzo', 'Mutisya', 'Musyoki'
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
  
  const firstName = isKenyan ? getRandomElement(KENYA_FIRST_NAMES) : getRandomElement(UK_FIRST_NAMES);
  const lastName = isKenyan ? getRandomElement(KENYA_LAST_NAMES) : getRandomElement(UK_LAST_NAMES);
  const city = isKenyan ? getRandomElement(KENYA_CITIES) : getRandomElement(UK_CITIES);
  const postcode = getRandomPostcode(isKenyan);

  // Using timestamp in seed to ensure high uniqueness for photos
  const photoSeed = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  return {
    universityName: university,
    studentName: `${firstName} ${lastName}`.toUpperCase(),
    dob: getRandomDate(),
    studentId: getRandomId(university),
    phone: getRandomPhoneNumber(isKenyan),
    address: isKenyan ? `${postcode}, ${city}, Kenya` : `${Math.floor(Math.random() * 100) + 1} High Street, ${city}, ${postcode}`,
    academicYear: '2026/2027',
    photo: `https://picsum.photos/seed/${photoSeed}/252/324`,
    logo: null,
    bloodGroup: getRandomElement(bloodGroups),
    emergencyContact: getRandomPhoneNumber(isKenyan),
  };
};
