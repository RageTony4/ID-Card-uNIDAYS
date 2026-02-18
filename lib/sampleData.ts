
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
  'Rory', 'Ezra', 'Oliver', 'Benjamin', 'Samuel', 'Alexander', 'Daniel', 'Joseph', 'Harrison',
  'Edward', 'Sebastian', 'Adam', 'Luke', 'Max', 'Dylan', 'Zachary', 'Toby', 'Nathan', 'Ethan',
  'Lewis', 'Tyler', 'Harvey', 'Caleb', 'Liam', 'Elijah', 'Gabriel', 'Owen', 'Elliot', 'Carter',
  'Stanley', 'Albert', 'Frankie', 'Louis', 'Jackson', 'Frederick', 'Bobby', 'Ronnie', 'Reggie',
  'Chester', 'Otis', 'Miles', 'Jasper', 'Wilfred', 'Alfred', 'Rafferty', 'Sonny', 'Ellis', 'Albie',
  'Oakley', 'Brody', 'Finn', 'Leon', 'Kai', 'Gabriel', 'Caleb', 'Seth', 'Ralph', 'Monty',
  'Leonard', 'Vincent', 'Victor', 'Francis', 'Benedict', 'Julian', 'Dominic', 'Marcus', 'Adrian',
  'Austin', 'Maxwell', 'Sidney', 'Percy', 'Rupert', 'Barnaby', 'Caspian', 'Gideon', 'Hamish',
  'Fergus', 'Lachlan', 'Cormac', 'Ewan', 'Callum', 'Angus', 'Alastair', 'Fraser', 'Rowan',
  'Tristan', 'Xavier', 'Rafael', 'Dante', 'Marco', 'Nico', 'Enzo', 'Luca', 'Matteo', 'Giovanni',
  'Stefan', 'Erik', 'Axel', 'Magnus', 'Soren', 'Lars', 'Anders', 'Bjorn', 'Klaus', 'Hans'
];

const UK_FEMALE_FIRST_NAMES = [
  'Olivia', 'Sophie', 'Emily', 'Amelia', 'Isabella', 'Ava', 'Mia', 'Grace', 'Lily', 'Evie',
  'Freya', 'Florence', 'Daisy', 'Poppy', 'Sienna', 'Ivy', 'Willow', 'Phoebe', 'Evelyn', 'Ella',
  'Zoe', 'Luna', 'Maya', 'Mila', 'Thea', 'Ada', 'Hallie', 'Lottie', 'Rose', 'Aurora',
  'Orla', 'Iris', 'Matilda', 'Charlotte', 'Alice', 'Lucy', 'Chloe', 'Ruby', 'Jessica', 'Eleanor',
  'Imogen', 'Holly', 'Elizabeth', 'Scarlett', 'Harriet', 'Eliza', 'Penelope', 'Mollie', 'Nancy',
  'Beatrice', 'Martha', 'Clara', 'Violet', 'Mabel', 'Hazel', 'Olive', 'Delilah', 'Aria', 'Lyra',
  'Elowen', 'Seraphina', 'Genevieve', 'Arabella', 'Clementine', 'Tabitha', 'Jemima', 'Ophelia',
  'Cordelia', 'Beatrix', 'Emmeline', 'Adelaide', 'Margot', 'Etta', 'Edith', 'Nellie', 'Annie',
  'Bonnie', 'Winnie', 'Dottie', 'Dolly', 'Effie', 'Nelly', 'Hattie', 'Tilly', 'Millie', 'Maisie',
  'Lola', 'Layla', 'Nora', 'Erin', 'Aoife', 'Siobhan', 'Caoimhe', 'Niamh', 'Eimear', 'Roisin',
  'Maeve', 'Clodagh', 'Saoirse', 'Aisling', 'Bronagh', 'Catriona', 'Sinead', 'Orlagh', 'Tara',
  'Elena', 'Sofia', 'Isabel', 'Clara', 'Julia', 'Marta', 'Lucia', 'Chiara', 'Alessia', 'Giorgia',
  'Heidi', 'Greta', 'Ingrid', 'Astrid', 'Freja', 'Sigrid', 'Lumi', 'Saga', 'Linnea', 'Klara'
];

const KENYA_MALE_FIRST_NAMES = [
  'Kiprop', 'Wanjala', 'Juma', 'Kiplagat', 'Kamau', 'Mutua', 'Samuel', 'David', 'Daniel', 'Michael',
  'Peter', 'John', 'Kibet', 'Kipkorir', 'Kipkemoi', 'Maina', 'Mwangi', 'Njoroge', 'Karanja', 'Njenga',
  'Kimani', 'Otieno', 'Onyango', 'Ochieng', 'Odhiambo', 'Okoth', 'Owino', 'Wekesa', 'Wafula', 'Simiyu',
  'Barasa', 'Hamisi', 'Bakari', 'Omar', 'Ali', 'Hassan', 'Saidi', 'Abdallah', 'Musa', 'Yusuf', 'Ibrahim',
  'Titus', 'Festus', 'Meshack', 'Shadrack', 'Abednego', 'Moses', 'Aaron', 'Joshua', 'Caleb', 'Gideon',
  'Solomon', 'Ezekiel', 'Jeremiah', 'Isaiah', 'Job', 'Lazarus', 'Barnabas', 'Silas', 'Timothy', 'Elias',
  'Elisha', 'Malachi', 'Zachariah', 'Amos', 'Joel', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
  'Zephaniah', 'Haggai', 'Emmanuel', 'Abigael', 'Beryl', 'Collins', 'Dennis', 'Evans', 'Felix', 'Geoffrey',
  'Humphrey', 'Ian', 'Justus', 'Kelvin', 'Leakey', 'Morgan', 'Newton', 'Oscar', 'Patrick', 'Quentin',
  'Robert', 'Stephen', 'Victor', 'Wycliffe', 'Xavier', 'Yussuf', 'Zaddock', 'Mwashumbe', 'Mwakideu',
  'Mwangemi', 'Mwamose', 'Mwamburi', 'Kipchumba', 'Kiprotich', 'Kipchirchir', 'Kiprono', 'Kiptoo',
  'Kiptum', 'Chelimo', 'Chemboi', 'Kigen', 'Kandie', 'Lagat', 'Cheruiyot', 'Rono', 'Yego', 'Biwott',
  'Korir', 'Tanui', 'Bett', 'Komen', 'Rotich', 'Serem', 'Kosgei', 'Keino', 'Tergat', 'Rudisha'
];

const KENYA_FEMALE_FIRST_NAMES = [
  'Achieng', 'Moraa', 'Nekesa', 'Sarah', 'Jessica', 'Ruth', 'Naomi', 'Atieno', 'Adhiambo', 'Akoth',
  'Akinyi', 'Anyango', 'Nafula', 'Nasimiyu', 'Njeri', 'Wambui', 'Wangari', 'Muthoni', 'Nyambura', 'Mumbi',
  'Dzame', 'Mbeyu', 'Khadija', 'Fatuma', 'Amina', 'Zainabu', 'Zawadi', 'Neema', 'Pendo', 'Rehema',
  'Mercy', 'Faith', 'Hope', 'Joy', 'Grace', 'Peace', 'Patience', 'Blessing', 'Lydia', 'Tabitha',
  'Dorcas', 'Priscilla', 'Eunice', 'Lois', 'Mary', 'Martha', 'Magdalene', 'Salome', 'Elizabeth', 'Damaris',
  'Hadassah', 'Esther', 'Deborah', 'Miriam', 'Rachel', 'Leah', 'Rebecca', 'Sarah', 'Hannah', 'Jemimah',
  'Keziah', 'Keren', 'Zipporah', 'Abigail', 'Delilah', 'Peninah', 'Dinah', 'Tamar', 'Vashti', 'Beryl',
  'Cynthia', 'Daisy', 'Everlyne', 'Fridah', 'Gloria', 'Hellen', 'Irene', 'Jane', 'Karen', 'Lucy',
  'Mildred', 'Nancy', 'Phyllis', 'Rose', 'Stacy', 'Trudy', 'Ursula', 'Vivian', 'Winifred', 'Zilda',
  'Wanjiku', 'Wanjira', 'Waceke', 'Wambere', 'Wandia', 'Wawira', 'Waguthi', 'Wamaitha', 'Wamuyu', 'Wanja',
  'Chebet', 'Chepkoech', 'Chepkirui', 'Cherono', 'Chepngetich', 'Chepkorir', 'Jebet', 'Jerono', 'Jepchirchir',
  'Jepkosgei', 'Jepkemoi', 'Jegat', 'Jerotich', 'Jemutai', 'Jeptoo', 'Jepkorir', 'Kwamboka', 'Nyaboke',
  'Kerubo', 'Kemunto', 'Bosibori', 'Minsari', 'Mokeira', 'Gesare', 'Biyaki', 'Osebe', 'Mogiti', 'Nyanchama'
];

const UK_LAST_NAMES = [
  'Smith', 'Jones', 'Taylor', 'Williams', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas', 'Roberts',
  'Johnson', 'Lewis', 'Walker', 'Robinson', 'Wood', 'Thompson', 'White', 'Watson', 'Jackson', 'Wright',
  'Green', 'Harris', 'Cooper', 'King', 'Lee', 'Martin', 'Clarke', 'James', 'Morgan', 'Hughes',
  'Edwards', 'Hill', 'Moore', 'Harrison', 'Scott', 'Young', 'Morris', 'Ward', 'Knight', 'Turner',
  'Miller', 'Davis', 'Anderson', 'Clark', 'Marshall', 'Collins', 'Bennett', 'Cox', 'Richardson', 'Fox',
  'Gray', 'Hunter', 'Palmer', 'Rose', 'Ball', 'Chapman', 'Powell', 'Payne', 'Rogers', 'Webb', 'Rice',
  'Porter', 'Birch', 'Stone', 'Grant', 'Lane', 'Wells', 'Ford', 'Owen', 'Cole', 'Ellis', 'West', 'Day',
  'Mills', 'Read', 'May', 'Hart', 'Hunt', 'Page', 'Cross', 'Shaw', 'Cook', 'Brooks', 'Bell', 'Webb',
  'Barker', 'Butler', 'Pearson', 'Gardner', 'Fletcher', 'Stevens', 'Holland', 'Andrews', 'Berry', 'Bird',
  'Fisher', 'Newman', 'Sutton', 'Jordan', 'Curtis', 'Sharp', 'Banks', 'Oliver', 'Dean', 'Mason',
  'Arnold', 'Harvey', 'Walsh', 'Foster', 'Atkinson', 'Austin', 'Bailey', 'Baker', 'Barber', 'Barnes',
  'Barrett', 'Barton', 'Bates', 'Baxter', 'Beattie', 'Bellamy', 'Bennett', 'Benson', 'Bentley', 'Beverly',
  'Bishop', 'Black', 'Blair', 'Blake', 'Blanchard', 'Blythe', 'Bolton', 'Booth', 'Bourne', 'Bowen',
  'Boyd', 'Bradley', 'Bradshaw', 'Brady', 'Brennan', 'Brewster', 'Briggs', 'Bright', 'Brock', 'Brophy',
  'Broughton', 'Buckley', 'Bullock', 'Burgess', 'Burke', 'Burnett', 'Burns', 'Burrows', 'Burton', 'Bush'
];

const KENYA_LAST_NAMES = [
  'Onyango', 'Kariuki', 'Mwangi', 'Otieno', 'Njoroge', 'Maina', 'Kipchumba', 'Ochieng', 'Kamau', 'Karanja',
  'Kipkorir', 'Kipkemoi', 'Kiprotich', 'Kipchirchir', 'Kipsang', 'Kiprono', 'Kiplagat', 'Kiprop', 'Kiptoo', 'Kiptum',
  'Chebet', 'Chepkoech', 'Chepkirui', 'Cherono', 'Cheruiyot', 'Chepngetich', 'Chepkorir', 'Juma', 'Wanjala', 'Wafula',
  'Simiyu', 'Wekesa', 'Barasa', 'Nekesa', 'Nafula', 'Nasimiyu', 'Okoth', 'Owino', 'Odhiambo', 'Omondi',
  'Okeyo', 'Oluoch', 'Obiero', 'Ouma', 'Okumu', 'Ogeto', 'Moraa', 'Nyaboke', 'Kerubo', 'Kwamboka',
  'Kemunto', 'Bosibori', 'Minsari', 'Mokeira', 'Gesare', 'Biyaki', 'Osebe', 'Mogiti', 'Nyanchama',
  'Wambui', 'Njeri', 'Wanjiku', 'Wanjira', 'Waceke', 'Muthoni', 'Nyambura', 'Wangari', 'Mumbi', 'Ngugi',
  'Kihika', 'Koinange', 'Michuki', 'Matiba', 'Kimathi', 'Kenyatta', 'Odinga', 'Mboya', 'Kariuki', 'Kodhek',
  'Oneko', 'Ngei', 'Kaggia', 'Kubai', 'Khalwale', 'Wetangula', 'Lusaka', 'Panyako', 'Atwoli', 'Mudavadi',
  'Kidero', 'Sonko', 'Igathe', 'Sakata', 'Sifuna', 'Passaris', 'Shebesh', 'Kananu', 'Sakaja', 'Aladwa',
  'Murathe', 'Tuju', 'Kanyutu', 'Kinuthia', 'Kibe', 'Koinange', 'Gachagua', 'Ruto', 'Gideon', 'Moi',
  'Biwott', 'Saitoti', 'Kalonzo', 'Musyoka', 'Ngilu', 'Kivutha', 'Mutua', 'Ndeti', 'Wavinya', 'Kingi',
  'Joho', 'Mvurya', 'Nassir', 'Mbalu', 'Mule', 'Kilonzo', 'Maitha', 'Mungatana', 'Orengo', 'Rasanga'
];

const universities = [
  'Community-Ed Academy',
  'Birmingham City FC Community Trust',
  'Communicate School',
  'Manchester Communication Academy',
  'Ysgol Comins Coch',
  'Adanac Commercial College',
  'Giggleswick School',
  'Carlton Keighley',
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
  'Bristol', 'Nottingham', 'Leicester', 'Edinburgh', 'Cardiff', 'Belfast', 'Brighton', 'Cambridge', 'Oxford',
  'Aberdeen', 'Plymouth', 'Hull', 'Wolverhampton', 'Stoke-on-Trent', 'Derby', 'Swansea', 'York', 'Bath', 'Durham'
];

const KENYA_CITIES = [
  'Kakamega', 'Nairobi', 'Kisumu', 'Mombasa', 'Eldoret', 'Nakuru', 'Machakos', 'Thika', 'Garissa', 'Nyeri',
  'Kitale', 'Malindi', 'Kericho', 'Lodwar', 'Voi', 'Isiolo', 'Busia', 'Narok', 'Bungoma', 'Webuye'
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
    return `P.O. BOX ${Math.floor(Math.random() * 2000) + 100} - 50100`;
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
  
  // Custom logic for specific schools to match user screenshots
  let city: string;
  if (university === 'Birmingham City FC Community Trust') {
      city = 'Birmingham';
  } else if (university === 'Communicate School' || university === 'Manchester Communication Academy') {
      city = 'Manchester';
  } else if (university === 'Ysgol Comins Coch') {
      city = 'Ceredigion';
  } else if (university === 'Giggleswick School') {
      city = 'Settle';
  } else if (university === 'Carlton Keighley') {
      city = 'Keighley';
  } else if (university === 'Adanac Commercial College') {
      city = getRandomElement(['Birmingham', 'Manchester', 'London', 'Sheffield']);
  } else {
      city = isKenyan ? getRandomElement(KENYA_CITIES) : getRandomElement(UK_CITIES);
  }

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
