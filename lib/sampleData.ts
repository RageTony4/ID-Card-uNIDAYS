
import { StudentInfo } from '../types';

const firstNames = [
  'James', 'Olivia', 'Jack', 'Sophie', 'Harry', 'Emily', 'Charlie', 'Amelia', 'Thomas', 'Isabella',
  'George', 'Ava', 'Oscar', 'Mia', 'William', 'Grace', 'Noah', 'Lily', 'Alfie', 'Evie',
  'Leo', 'Freya', 'Jacob', 'Florence', 'Archie', 'Daisy', 'Henry', 'Poppy', 'Joshua', 'Sienna'
];

const lastNames = [
  'Smith', 'Jones', 'Taylor', 'Williams', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas', 'Roberts',
  'Johnson', 'Lewis', 'Walker', 'Robinson', 'Wood', 'Thompson', 'White', 'Watson', 'Jackson', 'Wright',
  'Green', 'Harris', 'Cooper', 'King', 'Lee', 'Martin', 'Clarke', 'James', 'Morgan', 'Hughes'
];

const universities = [
  'Community-Ed Academy',
  'CommunityNI'
];

const streets = [
  'High Street', 'Station Road', 'London Road', 'Church Lane', 'Victoria Road', 'Park Road', 'Manor Road',
  'Queens Road', 'Kings Road', 'Baker Street', 'Oxford Street', 'Piccadilly', 'Bond Street', 'Regent Street'
];

const cities = [
  'London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Southampton', 'Liverpool', 'Newcastle', 'Sheffield',
  'Bristol', 'Nottingham', 'Leicester', 'Edinburgh', 'Cardiff', 'Belfast', 'Brighton', 'Cambridge', 'Oxford'
];

const counties = [
  'Greater London', 'Greater Manchester', 'West Midlands', 'West Yorkshire', 'Hampshire', 'Merseyside', 'Tyne and Wear',
  'South Yorkshire', 'Nottinghamshire', 'Leicestershire', 'Midlothian', 'Glamorgan', 'Antrim', 'East Sussex', 'Cambridgeshire', 'Oxfordshire'
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getRandomDate = (): string => {
  const start = new Date(2000, 0, 1);
  const end = new Date(2007, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  // UK Date format: DD Month YYYY
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const getRandomPhoneNumber = (): string => {
  // UK mobile format: +44 7xxx xxxxxx
  const number = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return `+44 7${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
};

const getRandomId = (): string => {
  // Format CEA-YY-XXXX
  const year = new Date().getFullYear().toString().slice(-2);
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  return `CEA-${year}-${randomNum}`;
};

const getRandomPostcode = (): string => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const L = () => letters.charAt(Math.floor(Math.random() * letters.length));
    const N = () => Math.floor(Math.random() * 9) + 1;
    // Simple mock UK postcode
    return `${L()}${L()}${N()} ${N()}${L()}${L()}`;
}

export const generateRandomStudentInfo = (): StudentInfo => {
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  const street = getRandomElement(streets);
  const city = getRandomElement(cities);
  const county = getRandomElement(counties);
  const postcode = getRandomPostcode();

  return {
    universityName: getRandomElement(universities),
    studentName: `${firstName} ${lastName}`.toUpperCase(),
    dob: getRandomDate(),
    studentId: getRandomId(),
    phone: getRandomPhoneNumber(),
    address: `${Math.floor(Math.random() * 100) + 1} ${street}, ${city}, ${postcode}`,
    academicYear: `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
    photo: `https://picsum.photos/seed/${Math.random()}/252/324`,
    logo: null,
    bloodGroup: getRandomElement(bloodGroups),
    emergencyContact: getRandomPhoneNumber(),
  };
};
