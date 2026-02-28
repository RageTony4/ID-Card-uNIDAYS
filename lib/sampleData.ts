
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

const UK_MALE_FIRST_NAMES = ['James', 'Jack', 'Harry', 'Charlie', 'George', 'Oscar', 'William', 'Noah', 'Alfie', 'Leo', 'Jacob', 'Archie', 'Henry', 'Joshua', 'Arthur', 'Theo', 'Freddie', 'Mason', 'Isaac', 'Lucas', 'Alexander', 'Ethan', 'Daniel', 'Joseph', 'Samuel', 'Sebastian', 'David', 'Adam', 'Mohammed', 'Benjamin', 'Max', 'Lucas', 'Harrison', 'Teddy', 'Finley', 'Arlo', 'Edward', 'Jude', 'Louie', 'Tommy', 'Rory', 'Arthur', 'Louis', 'Bobby', 'Elliott', 'Ronnie', 'Harvey', 'Hugo', 'Luca', 'Ollie'];
const UK_FEMALE_FIRST_NAMES = ['Olivia', 'Sophie', 'Emily', 'Amelia', 'Isabella', 'Ava', 'Mia', 'Grace', 'Lily', 'Evie', 'Freya', 'Florence', 'Daisy', 'Poppy', 'Sienna', 'Ivy', 'Willow', 'Phoebe', 'Evelyn', 'Ella', 'Rosie', 'Ruby', 'Maya', 'Isabelle', 'Alice', 'Charlotte', 'Jessica', 'Ada', 'Sienna', 'Isla', 'Mila', 'Chloe', 'Hallie', 'Eliza', 'Bonnie', 'Lottie', 'Aria', 'Penelope', 'Aurora', 'Violet', 'Luna', 'Imogen', 'Eleanor', 'Bella', 'Molly', 'Nancy', 'Thea', 'Lyra', 'Orla', 'Edith'];
const KENYA_MALE_FIRST_NAMES = ['Kiprop', 'Wanjala', 'Juma', 'Kiplagat', 'Kamau', 'Mutua', 'Samuel', 'David', 'Daniel', 'Michael', 'Emmanuel', 'Joshua', 'Caleb', 'Brian', 'Kevin', 'Moses', 'Peter', 'John', 'Joseph', 'Silas', 'Ezekiel', 'Gideon', 'Abel', 'Enock', 'Felix', 'Victor', 'Collins', 'Dennis', 'Evans', 'Geoffrey', 'Hillary', 'Isaac', 'Job', 'Kelvin', 'Lameck', 'Meshack', 'Nelson', 'Oscar', 'Patrick', 'Quentin', 'Robert', 'Stephen', 'Titus', 'Urbanus', 'Vincent', 'Wilson', 'Xavier', 'Yusuf', 'Zachary', 'Amos'];
const KENYA_FEMALE_FIRST_NAMES = ['Achieng', 'Moraa', 'Nekesa', 'Sarah', 'Jessica', 'Ruth', 'Naomi', 'Atieno', 'Adhiambo', 'Akoth', 'Mercy', 'Faith', 'Joy', 'Hope', 'Patience', 'Grace', 'Charity', 'Blessing', 'Esther', 'Mary', 'Jane', 'Alice', 'Beatrice', 'Catherine', 'Dorothy', 'Elizabeth', 'Florence', 'Gertrude', 'Hellen', 'Irene', 'Janet', 'Lydia', 'Margaret', 'Nancy', 'Olive', 'Phyllis', 'Rose', 'Stacy', 'Tabitha', 'Ursula', 'Vivian', 'Winifred', 'Zipporah', 'Brenda', 'Caroline', 'Diana', 'Eunice', 'Fridah', 'Gladys', 'Hilda'];
const GERMANY_MALE_FIRST_NAMES = ['Lukas', 'Leon', 'Luca', 'Finn', 'Elias', 'Jonas', 'Luis', 'Liam', 'Felix', 'Ben', 'Noah', 'Maximilian', 'Paul', 'Alexander', 'Julian', 'Matteo', 'Theo', 'Karl', 'Otto', 'Erik', 'Jan', 'Niklas', 'Tim', 'Tom', 'David', 'Simon', 'Fabian', 'Sebastian', 'Philipp', 'Moritz', 'Jakob', 'Anton', 'Emil', 'Oskar', 'Henry', 'Milo', 'Levi', 'Samuel', 'Rafael', 'Aaron', 'Marius', 'Vincent', 'Konrad', 'Friedrich', 'Wilhelm', 'Ludwig', 'Hans', 'Gustav', 'Bruno', 'Valentin'];
const GERMANY_FEMALE_FIRST_NAMES = ['Mia', 'Emma', 'Sofia', 'Hannah', 'Emilia', 'Anna', 'Marie', 'Mila', 'Lina', 'Lea', 'Leni', 'Clara', 'Luisa', 'Maja', 'Frieda', 'Charlotte', 'Johanna', 'Paula', 'Laura', 'Julia', 'Sarah', 'Lisa', 'Elena', 'Amelie', 'Sophie', 'Marie', 'Lara', 'Nele', 'Ida', 'Greta', 'Mathilda', 'Ella', 'Marlene', 'Romy', 'Lia', 'Lotta', 'Pia', 'Alina', 'Mira', 'Nora', 'Theresa', 'Viktoria', 'Helena', 'Isabel', 'Anni', 'Klara', 'Mina', 'Thea', 'Edda', 'Alma'];
const AUSTRALIA_MALE_FIRST_NAMES = ['Oliver', 'William', 'Noah', 'Jack', 'Henry', 'Leo', 'Lucas', 'Thomas', 'Hudson', 'Charlie', 'James', 'Archer', 'Levi', 'Cooper', 'Harrison', 'Max', 'Oscar', 'Hunter', 'Mason', 'Harvey', 'Theo', 'Arlo', 'Xavier', 'Sebastian', 'Liam', 'Alexander', 'Ethan', 'Hugo', 'Louis', 'Finn', 'Samuel', 'Isaac', 'George', 'Arthur', 'Edward', 'Felix', 'Jasper', 'Jude', 'Lachlan', 'Hamish', 'Angus', 'Flynn', 'Darcy', 'Banjo', 'Riley', 'Cooper', 'Blake', 'Toby', 'Ryan', 'Luke'];
const AUSTRALIA_FEMALE_FIRST_NAMES = ['Charlotte', 'Amelia', 'Olivia', 'Isla', 'Mia', 'Ava', 'Grace', 'Willow', 'Harper', 'Chloe', 'Isabella', 'Sophie', 'Ivy', 'Ruby', 'Evie', 'Lily', 'Ella', 'Sienna', 'Zoe', 'Alice', 'Matilda', 'Florence', 'Daisy', 'Poppy', 'Phoebe', 'Evelyn', 'Aria', 'Penelope', 'Luna', 'Mila', 'Freya', 'Elsie', 'Hazel', 'Billie', 'Bonnie', 'Lottie', 'Piper', 'Frankie', 'Imogen', 'Eleanor', 'Maya', 'Audrey', 'Scarlett', 'Layla', 'Georgia', 'Indiana', 'Savannah', 'Summer', 'Zara', 'Molly'];
const US_MALE_FIRST_NAMES = ['Liam', 'Noah', 'Oliver', 'James', 'Elijah', 'William', 'Henry', 'Lucas', 'Benjamin', 'Theodore', 'Mateo', 'Levi', 'Sebastian', 'Daniel', 'Jack', 'Wyatt', 'Owen', 'Asher', 'Christopher', 'Julian', 'Hudson', 'Grayson', 'Isaac', 'Maverick', 'Gabriel', 'Carter', 'Anthony', 'Dylan', 'Leo', 'Lincoln', 'Jaxon', 'Ezra', 'Thomas', 'Charles', 'Christopher', 'Miles', 'Josiah', 'Isaiah', 'Andrew', 'Elias', 'Joshua', 'Nathan', 'Caleb', 'Ryan', 'Adrian', 'Miles', 'Nolan', 'Christian', 'Aaron', 'Cameron'];
const US_FEMALE_FIRST_NAMES = ['Olivia', 'Emma', 'Charlotte', 'Amelia', 'Sophia', 'Mia', 'Isabella', 'Ava', 'Evelyn', 'Luna', 'Harper', 'Sofia', 'Scarlett', 'Elizabeth', 'Eleanor', 'Emily', 'Chloe', 'Mila', 'Violet', 'Penelope', 'Gianna', 'Aria', 'Abigail', 'Ella', 'Avery', 'Hazel', 'Nora', 'Layla', 'Lily', 'Aurora', 'Nova', 'Ellie', 'Madison', 'Grace', 'Isla', 'Willow', 'Zoe', 'Riley', 'Stella', 'Eliana', 'Ivy', 'Victoria', 'Maya', 'Natalie', 'Naomi', 'Elena', 'Sarah', 'Ariana', 'Allison', 'Gabriella'];
const CANADA_MALE_FIRST_NAMES = ['Liam', 'Noah', 'Oliver', 'Lucas', 'William', 'Leo', 'Benjamin', 'Theodore', 'Jack', 'Henry', 'James', 'Ethan', 'Owen', 'Jackson', 'Logan', 'Mason', 'Nathan', 'Jacob', 'Alexander', 'Daniel'];
const CANADA_FEMALE_FIRST_NAMES = ['Olivia', 'Emma', 'Charlotte', 'Amelia', 'Sophia', 'Mia', 'Isabella', 'Ava', 'Evelyn', 'Luna', 'Harper', 'Chloe', 'Mila', 'Abigail', 'Emily', 'Elizabeth', 'Eleanor', 'Sofia', 'Scarlett', 'Aria'];

const UK_LAST_NAMES = ['Smith', 'Jones', 'Taylor', 'Williams', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas', 'Roberts', 'Johnson', 'Lewis', 'Walker', 'Robinson', 'Wood', 'Thompson', 'White', 'Watson', 'Jackson', 'Wright', 'Green', 'Harris', 'Cooper', 'King', 'Lee', 'Martin', 'Clarke', 'James', 'Morgan', 'Hughes', 'Edwards', 'Hill', 'Moore', 'Harrison', 'Scott', 'Young', 'Morris', 'Hall', 'Ward', 'Turner', 'Carter', 'Phillips', 'Mitchell', 'Adams', 'Campbell', 'Anderson', 'Allen', 'Cook', 'Bailey', 'Parker'];
const KENYA_LAST_NAMES = ['Onyango', 'Kariuki', 'Mwangi', 'Otieno', 'Njoroge', 'Maina', 'Kipchumba', 'Ochieng', 'Kamau', 'Karanja', 'Mutua', 'Musyoka', 'Wambua', 'Kioko', 'Mulei', 'Ndambuki', 'Kilonzo', 'Muthoka', 'Wambui', 'Njeri', 'Wangari', 'Nyambura', 'Wanjiku', 'Atieno', 'Adhiambo', 'Achieng', 'Anyango', 'Awino', 'Juma', 'Kiplagat', 'Kiprotich', 'Kipkorir', 'Kipkemboi', 'Kibet', 'Koech', 'Cheruiyot', 'Lagat', 'Tanui', 'Rono', 'Sang', 'Chepkwony', 'Keter', 'Bett', 'Kirui', 'Kiprono', 'Kipkoech', 'Mutai', 'Korir', 'Kipsang', 'Rotich'];
const GERMANY_LAST_NAMES = ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf', 'Schröder', 'Neumann', 'Schwarz', 'Zimmermann', 'Braun', 'Krüger', 'Hofmann', 'Hartmann', 'Lange', 'Schmitt', 'Werner', 'Krause', 'Meier', 'Schmid', 'Schulze', 'Maier', 'Köhler', 'Herrmann', 'König', 'Walter', 'Mayer', 'Huber', 'Kaiser', 'Fuchs', 'Peters', 'Lang', 'Scholz', 'Möller', 'Weiß', 'Jung', 'Hahn', 'Schubert', 'Vogel', 'Friedrich'];
const AUSTRALIA_LAST_NAMES = ['Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Johnson', 'White', 'Anderson', 'Thompson', 'Walker', 'Robinson', 'Kelly', 'King', 'Davis', 'Wright', 'Evans', 'Roberts', 'Green', 'Hall', 'Wood', 'Harris', 'Clarke', 'Miller', 'Martin', 'Hughes', 'Lewis', 'Campbell', 'Moore', 'Scott', 'Young', 'Adams', 'Mitchell', 'Allen', 'Lee', 'Watson', 'Cooper', 'Morgan', 'James', 'Harrison', 'Ward', 'Edwards', 'Morris', 'Turner', 'Carter', 'Phillips', 'Parker', 'Collins', 'Cook', 'Murphy'];
const US_LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'];
const CANADA_LAST_NAMES = ['Smith', 'Brown', 'Wilson', 'Taylor', 'Campbell', 'Anderson', 'Thompson', 'Johnson', 'MacDonald', 'White', 'Martin', 'Miller', 'Davis', 'Jones', 'Williams', 'Tremblay', 'Gagnon', 'Roy', 'Cote', 'Bouchard'];

const usedNames = new Set<string>();

const SCHOOL_ADDRESS_MAP: Record<string, { city: string, address: string, postcode: string, country: 'UK' | 'Kenya' | 'Germany' | 'Australia' | 'USA' | 'Canada' }> = {
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
  'Shepherd School': { city: 'Rendsburg', address: 'Am Stadtsee 1, 24768 Rendsburg', postcode: '24768', country: 'Germany' },
  'Fichteschule': { city: 'Weida', address: 'Schloßberg 1, 07570 Weida', postcode: '07570', country: 'Germany' },
  'JurGrad gGmbH': { city: 'Munster', address: 'Königsstraße 47, 48143 Münster', postcode: '48143', country: 'Germany' },
  'oeoemrang-Skuul': { city: 'Nebel', address: 'Uasterstigh 43, 25946 Nebel', postcode: '25946', country: 'Germany' },
  'Cornerstone Community': { city: 'Dubbo', address: '123 Macquarie St, Dubbo', postcode: '2830', country: 'Australia' },
  'Cole Co. R-I Middle': { city: 'Russellville', address: '13600 Route C, Russellville, MO', postcode: '65074', country: 'USA' },
  'Commack Middle School': { city: 'Commack', address: '700 Townline Rd, Commack, NY', postcode: '11725', country: 'USA' },
  'Cohagen School': { city: 'Cohagen', address: '100 School St, Cohagen, MT', postcode: '59322', country: 'USA' },
  'Coalfield School': { city: 'Coalfield', address: '1720 Coalfield Rd, Coalfield, TN', postcode: '37719', country: 'USA' },
  'Mona School': { city: 'Mona', address: '150 S 100 E, Mona, UT', postcode: '84645', country: 'USA' },
  'Deary School': { city: 'Deary', address: '502 1st Ave, Deary, ID', postcode: '83823', country: 'USA' },
  'DelMar College': { city: 'Red Deer', address: '4813 50 St, Red Deer, AB', postcode: 'T4N 1X4', country: 'Canada' },
  'Cargair, St-Hubert': { city: 'Saint-Hubert', address: '4800 Route de l\'Aéroport, Saint-Hubert, QC', postcode: 'J3Y 8Y9', country: 'Canada' },
  'Kikino School': { city: 'Kikino', address: 'General Delivery, Kikino, AB', postcode: 'T0A 2B0', country: 'Canada' },
  'Cegep Limoilou': { city: 'Quebec City', address: '1300 8e Ave, Québec, QC', postcode: 'G1J 5L5', country: 'Canada' }
};

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getRandomDate = (): string => {
  const start = new Date(2000, 0, 1);
  const end = new Date(2007, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const getRandomPhoneNumber = (country: 'Kenya' | 'UK' | 'Germany' | 'Australia' | 'USA' | 'Canada'): string => {
  if (country === 'Kenya') {
    const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    return `+254 7${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5)}`;
  } else if (country === 'Germany') {
    const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    return `+49 15${Math.floor(Math.random() * 9)} ${number.slice(0, 4)} ${number.slice(4)}`;
  } else if (country === 'Australia') {
    const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    return `+61 4${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5)}`;
  } else if (country === 'USA') {
    const areaCode = Math.floor(Math.random() * 800) + 200;
    const prefix = Math.floor(Math.random() * 800) + 200;
    const line = Math.floor(Math.random() * 9000) + 1000;
    return `+1 (${areaCode}) ${prefix}-${line}`;
  } else if (country === 'Canada') {
    const areaCode = [403, 587, 825, 780, 418, 581, 450, 579, 514, 438, 819, 873].sort(() => Math.random() - 0.5)[0];
    const prefix = Math.floor(Math.random() * 800) + 200;
    const line = Math.floor(Math.random() * 9000) + 1000;
    return `+1 (${areaCode}) ${prefix}-${line}`;
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
  if (university === 'Fichteschule') return `FS-DE-${year}-${randomNum}`;
  if (university === 'JurGrad gGmbH') return `JG-DE-${year}-${randomNum}`;
  if (university === 'oeoemrang-Skuul') return `OS-DE-${year}-${randomNum}`;
  if (university === 'Cornerstone Community') return `CC-AU-${year}-${randomNum}`;
  if (university === 'Cole Co. R-I Middle') return `CCR-US-${year}-${randomNum}`;
  if (university === 'Commack Middle School') return `CMS-US-${year}-${randomNum}`;
  if (university === 'Cohagen School') return `CS-US-${year}-${randomNum}`;
  if (university === 'Coalfield School') return `CFS-US-${year}-${randomNum}`;
  if (university === 'Mona School') return `MS-US-${year}-${randomNum}`;
  if (university === 'Deary School') return `DS-US-${year}-${randomNum}`;
  if (university === 'DelMar College') return `DMC-CA-${year}-${randomNum}`;
  if (university === 'Cargair, St-Hubert') return `CSH-CA-${year}-${randomNum}`;
  if (university === 'Kikino School') return `KS-CA-${year}-${randomNum}`;
  if (university === 'Cegep Limoilou') return `CL-CA-${year}-${randomNum}`;
  return `CEA-${year}-${randomNum}`;
};

export const generateRandomStudentInfo = (fixedUniversity?: string): StudentInfo => {
  const university = fixedUniversity || getRandomElement(Object.keys(SCHOOL_ADDRESS_MAP));
  const details = SCHOOL_ADDRESS_MAP[university] || { city: 'London', address: 'High Street, London', postcode: 'SW1A 1AA', country: 'UK' };
  
  const countryType = details.country;
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  
  const lastNamePool = countryType === 'Kenya' ? KENYA_LAST_NAMES : countryType === 'Germany' ? GERMANY_LAST_NAMES : countryType === 'Australia' ? AUSTRALIA_LAST_NAMES : countryType === 'USA' ? US_LAST_NAMES : countryType === 'Canada' ? CANADA_LAST_NAMES : UK_LAST_NAMES;
  
  let fullName = '';
  let photo = '';
  let attempts = 0;
  const maxAttempts = 100;

  do {
    let firstName: string;
    if (gender === 'male') {
      firstName = countryType === 'Kenya' ? getRandomElement(KENYA_MALE_FIRST_NAMES) : countryType === 'Germany' ? getRandomElement(GERMANY_MALE_FIRST_NAMES) : countryType === 'Australia' ? getRandomElement(AUSTRALIA_MALE_FIRST_NAMES) : countryType === 'USA' ? getRandomElement(US_MALE_FIRST_NAMES) : countryType === 'Canada' ? getRandomElement(CANADA_MALE_FIRST_NAMES) : getRandomElement(UK_MALE_FIRST_NAMES);
      photo = getRandomElement(MALE_AVATARS);
    } else {
      firstName = countryType === 'Kenya' ? getRandomElement(KENYA_FEMALE_FIRST_NAMES) : countryType === 'Germany' ? getRandomElement(GERMANY_FEMALE_FIRST_NAMES) : countryType === 'Australia' ? getRandomElement(AUSTRALIA_FEMALE_FIRST_NAMES) : countryType === 'USA' ? getRandomElement(US_FEMALE_FIRST_NAMES) : countryType === 'Canada' ? getRandomElement(CANADA_FEMALE_FIRST_NAMES) : getRandomElement(UK_FEMALE_FIRST_NAMES);
      photo = getRandomElement(FEMALE_AVATARS);
    }
    const lastName = getRandomElement(lastNamePool);
    fullName = `${firstName} ${lastName}`.toUpperCase();
    attempts++;
  } while (usedNames.has(fullName) && attempts < maxAttempts);

  usedNames.add(fullName);
  
  const phone = getRandomPhoneNumber(countryType);

  return {
    universityName: university,
    studentName: fullName,
    dob: getRandomDate(),
    studentId: getRandomId(university),
    phone: phone,
    address: `${details.address}, ${details.postcode}, ${countryType === 'UK' ? 'UK' : countryType === 'USA' ? 'USA' : countryType === 'Canada' ? 'Canada' : countryType}`,
    location: `${details.city}, ${countryType === 'UK' ? 'UK' : countryType === 'USA' ? 'USA' : countryType === 'Canada' ? 'Canada' : countryType}`,
    academicYear: '2026/2027',
    photo: photo,
    logo: null,
    bloodGroup: getRandomElement(bloodGroups),
    emergencyContact: getRandomPhoneNumber(countryType),
  };
};
