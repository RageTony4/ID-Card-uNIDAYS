
import { StudentInfo } from '../types';

const MALE_AVATARS = [
  "/assets/avatars/male_1.webp",
  "/assets/avatars/male_2.webp",
  "/assets/avatars/male_3.webp",
  "/assets/avatars/male_4.webp",
  "/assets/avatars/male_5.webp",
  "/assets/avatars/male_6.webp",
  "/assets/avatars/male_7.webp",
  "/assets/avatars/male_8.webp",
  "/assets/avatars/male_9.webp",
  "/assets/avatars/male_10.webp",
  "/assets/avatars/male_11.webp",
  "https://files.catbox.moe/m7lj8u.png",
  "https://files.catbox.moe/u1skwz.png",
  "https://files.catbox.moe/z2ersq.png",
  "https://files.catbox.moe/3kliif.png",
  "https://files.catbox.moe/a4f1ct.png",
  "https://files.catbox.moe/8eq6dp.png"
];

const FEMALE_AVATARS = [
  "/assets/avatars/female_1.webp",
  "/assets/avatars/female_2.webp",
  "/assets/avatars/female_3.webp",
  "/assets/avatars/female_4.webp",
  "/assets/avatars/female_5.webp",
  "/assets/avatars/female_6.webp",
  "/assets/avatars/female_7.webp",
  "/assets/avatars/female_8.webp",
  "/assets/avatars/female_9.webp",
  "/assets/avatars/female_10.webp",
  "https://files.catbox.moe/bx9f18.png",
  "https://files.catbox.moe/w22pf1.png",
  "https://files.catbox.moe/4w42hk.png",
  "https://files.catbox.moe/c0ot8t.png"
];

export const cleanDiacritics = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/ß/g, 'SS')
    .replace(/æ/gi, 'ae')
    .replace(/ø/gi, 'o')
    .replace(/å/gi, 'a')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

const UK_MALE_FIRST_NAMES = ['James', 'Jack', 'Harry', 'Charlie', 'George', 'Oscar', 'William', 'Noah', 'Alfie', 'Leo', 'Jacob', 'Archie', 'Henry', 'Joshua', 'Arthur', 'Theo', 'Freddie', 'Mason', 'Isaac', 'Lucas', 'Alexander', 'Ethan', 'Daniel', 'Joseph', 'Samuel', 'Sebastian', 'David', 'Adam', 'Mohammed', 'Benjamin', 'Max', 'Harrison', 'Teddy', 'Finley', 'Arlo', 'Edward', 'Jude', 'Louie', 'Tommy', 'Rory', 'Louis', 'Bobby', 'Elliott', 'Ronnie', 'Harvey', 'Hugo', 'Luca', 'Ollie', 'Toby', 'Zachary', 'Gabriel', 'Reuben', 'Caleb', 'Logan', 'Dexter', 'Felix', 'Elijah', 'Roman', 'Nathan', 'Austin', 'Albert', 'Frankie', 'Stanley', 'Brody', 'Seth'];
const UK_FEMALE_FIRST_NAMES = ['Olivia', 'Sophie', 'Emily', 'Amelia', 'Isabella', 'Ava', 'Mia', 'Grace', 'Lily', 'Evie', 'Freya', 'Florence', 'Daisy', 'Poppy', 'Sienna', 'Ivy', 'Willow', 'Phoebe', 'Evelyn', 'Ella', 'Rosie', 'Ruby', 'Maya', 'Isabelle', 'Alice', 'Charlotte', 'Jessica', 'Ada', 'Isla', 'Mila', 'Chloe', 'Hallie', 'Eliza', 'Bonnie', 'Lottie', 'Aria', 'Penelope', 'Aurora', 'Violet', 'Luna', 'Imogen', 'Eleanor', 'Bella', 'Molly', 'Nancy', 'Thea', 'Lyra', 'Orla', 'Edith', 'Harriet', 'Georgia', 'Clara', 'Summer', 'Amber', 'Iris', 'Robyn', 'Darcie', 'Hannah', 'Beatrice', 'Holly'];
const UK_LAST_NAMES = ['Smith', 'Jones', 'Taylor', 'Williams', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas', 'Roberts', 'Johnson', 'Lewis', 'Walker', 'Robinson', 'Wood', 'Thompson', 'White', 'Watson', 'Jackson', 'Wright', 'Green', 'Harris', 'Cooper', 'King', 'Lee', 'Martin', 'Clarke', 'James', 'Morgan', 'Hughes', 'Edwards', 'Hill', 'Moore', 'Harrison', 'Scott', 'Young', 'Morris', 'Hall', 'Ward', 'Turner', 'Carter', 'Phillips', 'Mitchell', 'Adams', 'Campbell', 'Anderson', 'Allen', 'Cook', 'Bailey', 'Parker', 'Miller', 'Davis', 'Bennett', 'Cox', 'Richardson', 'Howard', 'Ward', 'Marshall', 'Simpson', 'Ellis'];

const KENYA_MALE_FIRST_NAMES = ['Kiprop', 'Wanjala', 'Juma', 'Kiplagat', 'Kamau', 'Mutua', 'Samuel', 'David', 'Daniel', 'Michael', 'Emmanuel', 'Joshua', 'Caleb', 'Brian', 'Kevin', 'Moses', 'Peter', 'John', 'Joseph', 'Silas', 'Ezekiel', 'Gideon', 'Abel', 'Enock', 'Felix', 'Victor', 'Collins', 'Dennis', 'Evans', 'Geoffrey', 'Hillary', 'Isaac', 'Job', 'Kelvin', 'Lameck', 'Meshack', 'Nelson', 'Oscar', 'Patrick', 'Quentin', 'Robert', 'Stephen', 'Titus', 'Urbanus', 'Vincent', 'Wilson', 'Xavier', 'Yusuf', 'Zachary', 'Amos', 'Duncan', 'Edwin', 'Francis', 'Gilbert', 'Haron', 'Ian', 'James', 'Justus', 'Kenneth', 'Linus', 'Mark', 'Nicholas', 'Philip', 'Reuben', 'Solomon'];
const KENYA_FEMALE_FIRST_NAMES = ['Achieng', 'Moraa', 'Nekesa', 'Sarah', 'Jessica', 'Ruth', 'Naomi', 'Atieno', 'Adhiambo', 'Akoth', 'Mercy', 'Faith', 'Joy', 'Hope', 'Patience', 'Grace', 'Charity', 'Blessing', 'Esther', 'Mary', 'Jane', 'Alice', 'Beatrice', 'Catherine', 'Dorothy', 'Elizabeth', 'Florence', 'Gertrude', 'Hellen', 'Irene', 'Janet', 'Lydia', 'Margaret', 'Nancy', 'Olive', 'Phyllis', 'Rose', 'Stacy', 'Tabitha', 'Ursula', 'Vivian', 'Winifred', 'Zipporah', 'Brenda', 'Caroline', 'Diana', 'Eunice', 'Fridah', 'Gladys', 'Hilda', 'Ivy', 'Joan', 'Karen', 'Lucy', 'Maureen', 'Nicole', 'Pamela', 'Salome', 'Teresa', 'Veronica', 'Violet'];
const KENYA_LAST_NAMES = ['Onyango', 'Kariuki', 'Mwangi', 'Otieno', 'Njoroge', 'Maina', 'Kipchumba', 'Ochieng', 'Kamau', 'Karanja', 'Mutua', 'Musyoka', 'Wambua', 'Kioko', 'Mulei', 'Ndambuki', 'Kilonzo', 'Muthoka', 'Wambui', 'Njeri', 'Wangari', 'Nyambura', 'Wanjiku', 'Atieno', 'Adhiambo', 'Achieng', 'Anyango', 'Awino', 'Juma', 'Kiplagat', 'Kiprotich', 'Kipkorir', 'Kipkemboi', 'Kibet', 'Koech', 'Cheruiyot', 'Lagat', 'Tanui', 'Rono', 'Sang', 'Chepkwony', 'Keter', 'Bett', 'Kirui', 'Kiprono', 'Kipkoech', 'Mutai', 'Korir', 'Kipsang', 'Rotich', 'Omwamba', 'Wekesa', 'Kimani', 'Macharia', 'Omondi', 'Odhiambo', 'Chebet', 'Wafula', 'Oduor', 'Nyaga'];

const GERMANY_MALE_FIRST_NAMES = ['Lukas', 'Leon', 'Luca', 'Finn', 'Elias', 'Jonas', 'Luis', 'Liam', 'Felix', 'Ben', 'Noah', 'Maximilian', 'Paul', 'Alexander', 'Julian', 'Matteo', 'Theo', 'Karl', 'Otto', 'Erik', 'Jan', 'Niklas', 'Tim', 'Tom', 'David', 'Simon', 'Fabian', 'Sebastian', 'Philipp', 'Moritz', 'Jakob', 'Anton', 'Emil', 'Oskar', 'Henry', 'Milo', 'Levi', 'Samuel', 'Rafael', 'Aaron', 'Marius', 'Vincent', 'Konrad', 'Friedrich', 'Wilhelm', 'Ludwig', 'Hans', 'Gustav', 'Bruno', 'Valentin', 'Benjamin', 'Christopher', 'Dominic', 'Florian', 'Jannik', 'Kilian', 'Linus', 'Marcel', 'Pascal', 'Yannick', 'Adrian', 'Benedikt', 'Constantin', 'Lennard', 'Tobias'];
const GERMANY_FEMALE_FIRST_NAMES = ['Mia', 'Emma', 'Sofia', 'Hannah', 'Emilia', 'Anna', 'Marie', 'Mila', 'Lina', 'Lea', 'Leni', 'Clara', 'Luisa', 'Maja', 'Frieda', 'Charlotte', 'Johanna', 'Paula', 'Laura', 'Julia', 'Sarah', 'Lisa', 'Elena', 'Amelie', 'Sophie', 'Lara', 'Nele', 'Ida', 'Greta', 'Mathilda', 'Ella', 'Marlene', 'Romy', 'Lia', 'Lotta', 'Pia', 'Alina', 'Mira', 'Nora', 'Theresa', 'Viktoria', 'Helena', 'Isabel', 'Anni', 'Klara', 'Mina', 'Thea', 'Edda', 'Alma', 'Antonia', 'Annika', 'Carlotta', 'Franziska', 'Jasmin', 'Katharina', 'Miriam', 'Stella', 'Valerie', 'Teresa', 'Ronja'];
const GERMANY_LAST_NAMES = ['Muller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann', 'Schafer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf', 'Schroder', 'Neumann', 'Schwarz', 'Zimmermann', 'Braun', 'Kruger', 'Hofmann', 'Hartmann', 'Lange', 'Schmitt', 'Werner', 'Krause', 'Meier', 'Schmid', 'Schulze', 'Maier', 'Kohler', 'Herrmann', 'Konig', 'Walter', 'Mayer', 'Huber', 'Kaiser', 'Fuchs', 'Peters', 'Lang', 'Scholz', 'Moller', 'Weiss', 'Jung', 'Hahn', 'Schubert', 'Vogel', 'Friedrich', 'Keller', 'Gunther', 'Frank', 'Berger', 'Roth', 'Lorenz', 'Ludwig', 'Franke', 'Albrecht', 'Schuster'];

const AUSTRALIA_MALE_FIRST_NAMES = ['Oliver', 'William', 'Noah', 'Jack', 'Henry', 'Leo', 'Lucas', 'Thomas', 'Hudson', 'Charlie', 'James', 'Archer', 'Levi', 'Cooper', 'Harrison', 'Max', 'Oscar', 'Hunter', 'Mason', 'Harvey', 'Theo', 'Arlo', 'Xavier', 'Sebastian', 'Liam', 'Alexander', 'Ethan', 'Hugo', 'Louis', 'Finn', 'Samuel', 'Isaac', 'George', 'Arthur', 'Edward', 'Felix', 'Jasper', 'Jude', 'Lachlan', 'Hamish', 'Angus', 'Flynn', 'Darcy', 'Banjo', 'Riley', 'Blake', 'Toby', 'Ryan', 'Luke', 'Bodhi', 'Caleb', 'Connor', 'Eli', 'Jordan', 'Kobe', 'Lincoln', 'Nate', 'Owen', 'Patrick', 'Zachary', 'Asher', 'Brodie', 'Calvin', 'Declan', 'Fletcher'];
const AUSTRALIA_FEMALE_FIRST_NAMES = ['Charlotte', 'Amelia', 'Olivia', 'Isla', 'Mia', 'Ava', 'Grace', 'Willow', 'Harper', 'Chloe', 'Isabella', 'Sophie', 'Ivy', 'Ruby', 'Evie', 'Lily', 'Ella', 'Sienna', 'Zoe', 'Alice', 'Matilda', 'Florence', 'Daisy', 'Poppy', 'Phoebe', 'Evelyn', 'Aria', 'Penelope', 'Luna', 'Mila', 'Freya', 'Elsie', 'Hazel', 'Billie', 'Bonnie', 'Lottie', 'Piper', 'Frankie', 'Imogen', 'Eleanor', 'Maya', 'Audrey', 'Scarlett', 'Layla', 'Georgia', 'Indiana', 'Savannah', 'Summer', 'Zara', 'Molly', 'Abigail', 'Alexis', 'Eden', 'Hannah', 'Mackenzie', 'Olive', 'Paige', 'Stella', 'Violet', 'Gemma'];
const AUSTRALIA_LAST_NAMES = ['Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Johnson', 'White', 'Anderson', 'Thompson', 'Walker', 'Robinson', 'Kelly', 'King', 'Davis', 'Wright', 'Evans', 'Roberts', 'Green', 'Hall', 'Wood', 'Harris', 'Clarke', 'Miller', 'Martin', 'Hughes', 'Lewis', 'Campbell', 'Moore', 'Scott', 'Young', 'Adams', 'Mitchell', 'Allen', 'Lee', 'Watson', 'Cooper', 'Morgan', 'James', 'Harrison', 'Ward', 'Edwards', 'Morris', 'Turner', 'Carter', 'Phillips', 'Parker', 'Collins', 'Cook', 'Murphy', 'Baker', 'Bennett', 'Cox', 'Graham', 'Marshall', 'Murray', 'Stewart', 'Walsh', 'Gibson', 'Ellis'];

const US_MALE_FIRST_NAMES = ['Liam', 'Noah', 'Oliver', 'James', 'Elijah', 'William', 'Henry', 'Lucas', 'Benjamin', 'Theodore', 'Mateo', 'Levi', 'Sebastian', 'Daniel', 'Jack', 'Wyatt', 'Owen', 'Asher', 'Christopher', 'Julian', 'Hudson', 'Grayson', 'Isaac', 'Maverick', 'Gabriel', 'Carter', 'Anthony', 'Dylan', 'Leo', 'Lincoln', 'Jaxon', 'Ezra', 'Thomas', 'Charles', 'Miles', 'Josiah', 'Isaiah', 'Andrew', 'Elias', 'Joshua', 'Nathan', 'Caleb', 'Ryan', 'Adrian', 'Nolan', 'Christian', 'Aaron', 'Cameron', 'Ezekiel', 'Colton', 'Eli', 'Landon', 'Jonathan', 'Robert', 'Nicholas', 'Jeremiah', 'Angel', 'Connor', 'Dominic', 'Austin', 'Ian', 'Brandon', 'Jordan', 'Tyler', 'Hunter'];
const US_FEMALE_FIRST_NAMES = ['Olivia', 'Emma', 'Charlotte', 'Amelia', 'Sophia', 'Mia', 'Isabella', 'Ava', 'Evelyn', 'Luna', 'Harper', 'Sofia', 'Scarlett', 'Elizabeth', 'Eleanor', 'Emily', 'Chloe', 'Mila', 'Violet', 'Penelope', 'Gianna', 'Aria', 'Abigail', 'Ella', 'Avery', 'Hazel', 'Nora', 'Layla', 'Lily', 'Aurora', 'Nova', 'Ellie', 'Madison', 'Grace', 'Isla', 'Willow', 'Zoe', 'Riley', 'Stella', 'Eliana', 'Ivy', 'Victoria', 'Maya', 'Natalie', 'Naomi', 'Elena', 'Sarah', 'Ariana', 'Allison', 'Gabriella', 'Alice', 'Madelyn', 'Autumn', 'Paisley', 'Ruby', 'Piper', 'Claire', 'Skylar', 'Kinsley', 'Hailey'];
const US_LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Stewart'];

const CANADA_MALE_FIRST_NAMES = ['Liam', 'Noah', 'Oliver', 'Lucas', 'William', 'Leo', 'Benjamin', 'Theodore', 'Jack', 'Henry', 'James', 'Ethan', 'Owen', 'Jackson', 'Logan', 'Mason', 'Nathan', 'Jacob', 'Alexander', 'Daniel', 'Gabriel', 'Caleb', 'Samuel', 'Felix', 'Hudson', 'Thomas', 'Xavier', 'Isaac', 'Dylan', 'Carter', 'Wyatt', 'Ryan', 'Anthony', 'David', 'Joseph', 'Hunter', 'Luke', 'Eli', 'Connor', 'Nolan', 'Max', 'Charles', 'Grayson', 'Adam', 'Zachary', 'Nicolas', 'Tristan', 'Antoine', 'Alexis', 'Justin', 'Etiënne', 'Simon', 'Matthieu', 'Alexandre', 'Cedric'];
const CANADA_FEMALE_FIRST_NAMES = ['Olivia', 'Emma', 'Charlotte', 'Amelia', 'Sophia', 'Mia', 'Isabella', 'Ava', 'Evelyn', 'Luna', 'Harper', 'Chloe', 'Mila', 'Abigail', 'Emily', 'Elizabeth', 'Eleanor', 'Sofia', 'Scarlett', 'Aria', 'Grace', 'Ella', 'Avery', 'Lily', 'Hannah', 'Maya', 'Zoe', 'Florence', 'Rose', 'Clara', 'Alice', 'Beatrice', 'Audrey', 'Victoria', 'Sarah', 'Charlie', 'Rosalie', 'Lea', 'Juliette', 'Ophelie', 'Camille', 'Annabelle', 'Laurie', 'Maeva', 'Oceane', 'Delphine', 'Jade', 'Gabrielle', 'Mathilde', 'Alicia', 'Evelyne', 'Raphaelle', 'Arianne', 'Megan', 'Mylène'];
const CANADA_LAST_NAMES = ['Smith', 'Brown', 'Wilson', 'Taylor', 'Campbell', 'Anderson', 'Thompson', 'Johnson', 'MacDonald', 'White', 'Martin', 'Miller', 'Davis', 'Jones', 'Williams', 'Tremblay', 'Gagnon', 'Roy', 'Cote', 'Bouchard', 'Gauthier', 'Morin', 'Lavoie', 'Fortin', 'Gagne', 'Pelletier', 'Belanger', 'Levesque', 'Bergeron', 'Leblanc', 'Paquette', 'Giroux', 'Simard', 'Ouellet', 'Caron', 'Beaulieu', 'Cloutier', 'Desjardins', 'Bedard', 'Fournier', 'Lapointe', 'Nadeau', 'Perreault', 'Savard', 'St-Pierre', 'Hebert', 'Landry', 'Cormier', 'Arsenault', 'Lefebvre', 'Boudreau', 'Thibault', 'Gaudreault', 'Lemieux', 'Marcoux'];

const FRANCE_MALE_FIRST_NAMES = ['Thomas', 'Lucas', 'Leo', 'Gabriel', 'Timeo', 'Hugo', 'Arthur', 'Louis', 'Nathan', 'Raphael', 'Mael', 'Enzo', 'Adam', 'Liam', 'Ethan', 'Noah', 'Jules', 'Paul', 'Mohamed', 'Gabin', 'Sacha', 'Marius', 'Axel', 'Victor', 'Clement', 'Baptiste', 'Maxime', 'Antoine', 'Valentin', 'Alexis', 'Benjamin', 'Damien', 'Etienne', 'Florian', 'Guillaume', 'Julien', 'Laurent', 'Nicolas', 'Olivier', 'Pierre', 'Quentin', 'Romain', 'Sebastien', 'Theo', 'Thibault', 'Vincent', 'Xavier', 'Yanis', 'Timothee', 'Mathieu', 'Alexandre', 'Francois', 'Christophe', 'Benoit', 'Adrien'];
const FRANCE_FEMALE_FIRST_NAMES = ['Emma', 'Jade', 'Louise', 'Alice', 'Chloe', 'Lina', 'Lea', 'Rose', 'Anna', 'Mila', 'Ines', 'Mia', 'Manon', 'Julia', 'Lou', 'Zoe', 'Camille', 'Agathe', 'Lena', 'Sarah', 'Eva', 'Louna', 'Clara', 'Adele', 'Charlotte', 'Margaux', 'Lola', 'Lucie', 'Ambre', 'Anais', 'Capucine', 'Clemence', 'Juliette', 'Mathilde', 'Oceane', 'Romane', 'Solene', 'Victoria', 'Pauline', 'Marion', 'Marine', 'Laurine', 'Elise', 'Coline', 'Apolline', 'Celeste', 'Margot', 'Ninon', 'Jeanne', 'Suzanne', 'Heloise', 'Eléonore', 'Clarisse', 'Aurore', 'Salome'];
const FRANCE_LAST_NAMES = ['Martin', 'Bernard', 'Thomas', 'Petit', 'Robert', 'Richard', 'Durand', 'Dubois', 'Moreau', 'Laurent', 'Simon', 'Michel', 'Lefebvre', 'Leroy', 'Roux', 'David', 'Bertrand', 'Morel', 'Fournier', 'Girard', 'Bonnet', 'Dupont', 'Lambert', 'Fontaine', 'Rousseau', 'Vincent', 'Muller', 'Lefevre', 'Faure', 'Andre', 'Mercier', 'Blanc', 'Guerin', 'Boyer', 'Garnier', 'Chevalier', 'Francois', 'Legrand', 'Gauthier', 'Garcia', 'Perron', 'Clement', 'Morin', 'Nicolas', 'Henry', 'Roussel', 'Mathieu', 'Gautier', 'Masson', 'Marchand', 'Duchemin', 'Pires', 'Lemaire', 'Dufour', 'Meunier'];

const ITALY_MALE_FIRST_NAMES = ['Leonardo', 'Francesco', 'Alessandro', 'Lorenzo', 'Mattia', 'Andrea', 'Gabriele', 'Riccardo', 'Tommaso', 'Edoardo', 'Giuseppe', 'Antonio', 'Giovanni', 'Luigi', 'Vincenzo', 'Pietro', 'Salvatore', 'Carlo', 'Filippo', 'Federico', 'Matteo', 'Marco', 'Davide', 'Christian', 'Samuele', 'Nicola', 'Daniele', 'Jacopo', 'Manuel', 'Simone', 'Alessio', 'Michele', 'Alberto', 'Diego', 'Gabriel', 'Stefano', 'Giacomo', 'Giorgio', 'Luca', 'Mario', 'Roberto', 'Claudio', 'Domenico', 'Angelo', 'Enrico', 'Fabio', 'Gianluca', 'Paolo', 'Rosario', 'Valerio', 'Tiziano', 'Massimo', 'Emiliano', 'Luciano', 'Renato'];
const ITALY_FEMALE_FIRST_NAMES = ['Sofia', 'Giulia', 'Aurora', 'Alice', 'Ginevra', 'Emma', 'Giorgia', 'Greta', 'Beatrice', 'Anna', 'Maria', 'Francesca', 'Elena', 'Lucia', 'Giovanna', 'Rosa', 'Caterina', 'Angela', 'Teresa', 'Paola', 'Chiara', 'Sara', 'Ludovica', 'Vittoria', 'Camilla', 'Martina', 'Nicole', 'Noemi', 'Matilde', 'Elisa', 'Alessia', 'Benedetta', 'Carlotta', 'Eleonora', 'Federica', 'Gaia', 'Irene', 'Margherita', 'Marta', 'Rebecca', 'Serena', 'Silvia', 'Valentina', 'Veronica', 'Arianna', 'Bianca', 'Claudia', 'Flavia', 'Laura', 'Miriam', 'Simona', 'Alessandra', 'Cristina', 'Ilaria', 'Sabrina'];
const ITALY_LAST_NAMES = ['Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco', 'Bruno', 'Gallo', 'Conti', 'De Luca', 'Mancini', 'Costa', 'Giordano', 'Rizzo', 'Lombardi', 'Moretti', 'Barbieri', 'Fontana', 'Santoro', 'Mariani', 'Rinaldi', 'Caruso', 'Ferrara', 'Galli', 'Martini', 'Leone', 'Longo', 'Gentile', 'Martinelli', 'Vitale', 'Lombardo', 'Serra', 'Coppola', 'De Santis', 'D Angelo', 'Marini', 'Palmieri', 'Monti', 'Farina', 'Benedetti', 'Silvestri', 'Bernardi', 'De Rosa', 'Fiore', 'Villa', 'Pellegrini', 'Ruggiero', 'Sanna', 'Palumbo', 'D Amico', 'Piras'];

const INDIA_MALE_FIRST_NAMES = ['Aarav', 'Vihaan', 'Vivaan', 'Ananya', 'Arjun', 'Sai', 'Ishan', 'Krishna', 'Aryan', 'Shaurya', 'Atharv', 'Advik', 'Pranav', 'Ayush', 'Kabir', 'Rehaan', 'Reyansh', 'Mohammed', 'Rudra', 'Aaryan', 'Devansh', 'Kushagra', 'Ishaan', 'Arnav', 'Aayush', 'Abhimanyu', 'Aditya', 'Advait', 'Agastya', 'Akshaj', 'Anay', 'Aniruddh', 'Arhaan', 'Ayaan', 'Darsh', 'Daksh', 'Dhruv', 'Hridaan', 'Idhant', 'Ivaan', 'Jivaj', 'Kanav', 'Laksh', 'Madhav', 'Naksh', 'Ojas', 'Parth', 'Pranay', 'Rishaan', 'Rohan', 'Samar', 'Shlok', 'Tanmay', 'Utkarsh', 'Vedant', 'Viraj', 'Yash', 'Yug', 'Zayan', 'Ahad', 'Chirag', 'Deepak', 'Gaurav', 'Karan', 'Manish'];
const INDIA_FEMALE_FIRST_NAMES = ['Aadya', 'Ananya', 'Shanaya', 'Myra', 'Saanvi', 'Pari', 'Anaya', 'Aadhya', 'Diya', 'Anvi', 'Isha', 'Avni', 'Navya', 'Sara', 'Siya', 'Kavya', 'Aavya', 'Aayushi', 'Aditi', 'Ahana', 'Akshara', 'Amaya', 'Amrita', 'Anika', 'Anisha', 'Anushka', 'Aradhya', 'Bhavya', 'Chhavi', 'Drishti', 'Esha', 'Gia', 'Hia', 'Inaya', 'Ishani', 'Jiya', 'Kaira', 'Kiara', 'Kyra', 'Lipi', 'Mahi', 'Meher', 'Mishka', 'Naisha', 'Nitya', 'Ovi', 'Prisha', 'Riya', 'Sana', 'Tanya', 'Tara', 'Trisha', 'Vanya', 'Vedika', 'Yashvi', 'Zoya', 'Riddhi', 'Siddhi', 'Pooja', 'Neha', 'Priya'];
const INDIA_LAST_NAMES = ['Sharma', 'Verma', 'Gupta', 'Malhotra', 'Khanna', 'Iyer', 'Nair', 'Reddy', 'Singh', 'Khan', 'Patel', 'Joshi', 'Kulkarni', 'Deshmukh', 'Chauhan', 'Mishra', 'Pandey', 'Yadav', 'Bose', 'Chatterjee', 'Mukherjee', 'Dutta', 'Das', 'Sen', 'Banerjee', 'Ghosh', 'Sarkar', 'Roy', 'Pillai', 'Menon', 'Rao', 'Naidu', 'Hegde', 'Shetty', 'Bhat', 'Prabhu', 'Agarwal', 'Bansal', 'Goel', 'Mittal', 'Shah', 'Mehta', 'Trivedi', 'Pathak', 'Dubey', 'Tiwari', 'Shukla', 'Kapoor', 'Chopra', 'Anand', 'Saxena', 'Srivastava', 'Rastogi', 'Bhatia', 'Gill', 'Ahuja', 'Somani', 'Jain', 'Tandon', 'Bajaj', 'Thakur'];

const IRELAND_MALE_FIRST_NAMES = ['Liam', 'Sean', 'Conor', 'Patrick', 'Cillian', 'Oisin', 'Fionn', 'Daniel', 'Jack', 'James', 'Cian', 'Eoin', 'Rory', 'Darragh', 'Callum', 'Finn', 'Ryan', 'Harry', 'Adam', 'Alex', 'Luke', 'Jamie', 'Thomas', 'Michael', 'Ronan', 'Aaron', 'Cormac', 'Donnacha', 'Shane', 'Mark', 'Cathal', 'Padraig', 'Tadgh', 'Brian', 'Shay', 'Dylan', 'Kevin', 'Lorcan', 'Odhran', 'Senan', 'Fiachra', 'Niall', 'David', 'Matthew', 'Christopher', 'Joseph', 'Robert', 'John', 'Paul', 'Stephen', 'Colm', 'Diarmuid', 'Enda', 'Eoghan', 'Fergal'];
const IRELAND_FEMALE_FIRST_NAMES = ['Aoife', 'Saoirse', 'Ciara', 'Niamh', 'Roisin', 'Siobhan', 'Cara', 'Fiadh', 'Maeve', 'Orla', 'Sophie', 'Emily', 'Hannah', 'Mia', 'Grace', 'Lucy', 'Ella', 'Chloe', 'Anna', 'Sarah', 'Katie', 'Emma', 'Holly', 'Kate', 'Sadhbh', 'Eimear', 'Clodagh', 'Caoimhe', 'Aisling', 'Sinead', 'Laura', 'Rachel', 'Amy', 'Freya', 'Molly', 'Lauren', 'Robyn', 'Faye', 'Isabelle', 'Zoe', 'Abbie', 'Leah', 'Megan', 'Amber', 'Rebecca', 'Shauna', 'Grainne', 'Emer', 'Dearbhla', 'Bronagh', 'Deirdre', 'Grainne', 'Orlaith', 'Riona', 'Tara'];
const IRELAND_LAST_NAMES = ['Murphy', 'Kelly', 'Byrne', 'Ryan', 'O Brien', 'Walsh', 'O Sullivan', 'O Connor', 'Doyle', 'McCarthy', 'Gallagher', 'O Neill', 'Lynch', 'Murray', 'Quinn', 'Moore', 'McLoughlin', 'O Carroll', 'Daly', 'Connolly', 'Wilson', 'Dunne', 'Brennan', 'Burke', 'Collins', 'Campbell', 'Clarke', 'Johnston', 'Hughes', 'Farrell', 'Fitzgerald', 'O Reilly', 'Hayes', 'Power', 'Moloney', 'Hogan', 'O Donnell', 'Regan', 'Kenny', 'Whelan', 'Moran', 'Higgins', 'McGrath', 'Casey', 'Foley', 'O Mahony', 'Sullivan', 'Maher', 'Brady', 'Sweeney', 'Keane', 'Flanagan', 'Cullen', 'Nolan', 'Brophy'];

const AUSTRIA_MALE_FIRST_NAMES = ['Lukas', 'Florian', 'Maximilian', 'Tobias', 'Paul', 'David', 'Alexander', 'Felix', 'Jakob', 'Jonas', 'Elias', 'Sebastian', 'Moritz', 'Leon', 'Philipp', 'Julian', 'Marcel', 'Simon', 'Fabian', 'Daniel', 'Michael', 'Thomas', 'Matthias', 'Stefan', 'Christian', 'Christoph', 'Johannes', 'Manuel', 'Benjamin', 'Clemens', 'Dominik', 'Gabriel', 'Jan', 'Kilian', 'Lorenz', 'Mario', 'Martin', 'Niklas', 'Oliver', 'Patrick', 'Raphael', 'Samuel', 'Tim', 'Valentin', 'Vincent', 'Adrian', 'Andreas', 'Anton', 'Bernhard', 'Gerald', 'Harald', 'Helmut', 'Josef', 'Karl', 'Markus'];
const AUSTRIA_FEMALE_FIRST_NAMES = ['Anna', 'Sophie', 'Lena', 'Emma', 'Marie', 'Mia', 'Laura', 'Hannah', 'Katharina', 'Julia', 'Sarah', 'Lara', 'Elena', 'Johanna', 'Valentina', 'Theresa', 'Victoria', 'Lisa', 'Miriam', 'Nina', 'Clara', 'Lea', 'Emilia', 'Amelie', 'Anja', 'Annalena', 'Barbara', 'Christina', 'Elisabeth', 'Eva', 'Franziska', 'Jana', 'Jasmin', 'Jennifer', 'Kerstin', 'Leonie', 'Magdalena', 'Maria', 'Marlene', 'Melanie', 'Nicole', 'Patricia', 'Romina', 'Sabrina', 'Stefanie', 'Verena', 'Sandra', 'Astrid', 'Birgit', 'Claudia'];
const AUSTRIA_LAST_NAMES = ['Gruber', 'Brunner', 'Pichler', 'Steiner', 'Moser', 'Mayer', 'Hofer', 'Leitner', 'Berger', 'Fuchs', 'Eder', 'Fischer', 'Schmid', 'Winkler', 'Weber', 'Schwarz', 'Maier', 'Schneider', 'Huber', 'Bauer', 'Wagner', 'Wallner', 'Egger', 'Baumgartner', 'Binder', 'Aigner', 'Haas', 'Wurzer', 'Koller', 'Ebner', 'Reiter', 'Mayr', 'Schuster', 'Wolf', 'Ortner', 'Zauner', 'Hackl', 'Weiss', 'Graf', 'Wimmer', 'Kern', 'Stadler', 'Kaser', 'Kaufmann', 'Brandl', 'Unger', 'Rieder', 'Friedl', 'Strobl', 'Kohl', 'Schmidl', 'Rauch', 'Lackner', 'Koller', 'Kogler'];

const MALAYSIA_MALE_FIRST_NAMES = ['Ahmad', 'Muhammad', 'Adam', 'Amir', 'Daniel', 'Harith', 'Chung', 'Wei', 'Bryan', 'Sivanesan', 'Kavinesh', 'Zakir', 'Faizal', 'Imran', 'Danish', 'Jason', 'Kevin', 'Adrian'];
const MALAYSIA_FEMALE_FIRST_NAMES = ['Siti', 'Nur', 'Aisha', 'Irdina', 'Mei Ling', 'Hui Ling', 'Priya', 'Anis', 'Farah', 'Hannah', 'Michelle', 'Kavitha', 'Zara', 'Amanda', 'Chloe', 'Yasmin', 'Divya'];
const MALAYSIA_LAST_NAMES = ['Tan', 'Wong', 'Lee', 'Lim', 'Ng', 'Chua', 'Rahman', 'Abdullah', 'Ismail', 'Ibrahim', 'Razak', 'Subramaniam', 'Ramasamy', 'Kaur', 'Singh', 'Chen', 'Teoh', 'Goh'];

const usedNames = new Set<string>();

const SCHOOL_ADDRESS_MAP: Record<string, { city: string, address: string, postcode: string, country: 'UK' | 'Kenya' | 'Germany' | 'Australia' | 'USA' | 'Canada' | 'India' | 'France' | 'Italy' | 'Ireland' | 'Austria' | 'Malaysia' }> = {
  'Birmingham City FC Community Trust': { city: 'Birmingham, UK', address: 'St. Andrew\'s Stadium, Birmingham', postcode: 'B9 4RL', country: 'UK' },
  'Communicate School': { city: 'Manchester, UK', address: '24 Nicholas St, Manchester', postcode: 'M1 4EJ', country: 'UK' },
  'Manchester Communication Academy': { city: 'Manchester, UK', address: 'Silchester Drive, Manchester', postcode: 'M40 8NT', country: 'UK' },
  'Ysgol Comins Coch': { city: 'Ceredigion, UK', address: 'Comins Coch, Aberystwyth', postcode: 'SY23 3BD', country: 'UK' },
  'Adanac Commercial College': { city: 'London, UK', address: '162-164 High St, London', postcode: 'SE13 6JL', country: 'UK' },
  'Giggleswick School': { city: 'Settle, UK', address: 'Settle, North Yorkshire', postcode: 'BD24 0DE', country: 'UK' },
  'Carlton Keighley': { city: 'Keighley, UK', address: 'Undercliffe Lane, Keighley', postcode: 'BD21 4RN', country: 'UK' },
  'Community-Ed Academy': { city: 'London, UK', address: '42 High Street, Kensington, London', postcode: 'SW7 2AZ', country: 'UK' },
  'CommunityNI': { city: 'Belfast, UK', address: '35 Donegall St, Belfast', postcode: 'BT1 2FG', country: 'UK' },
  'University of Warwick': { city: 'Coventry, UK', address: 'University Road, Coventry', postcode: 'CV4 7AL', country: 'UK' },
  'University of Leeds': { city: 'Leeds, UK', address: 'Woodhouse Lane, Leeds', postcode: 'LS2 9JT', country: 'UK' },
  'Roo University': { city: 'London, UK', address: 'Roehampton Lane, London', postcode: 'SW15 5PU', country: 'UK' },
  'Arden University': { city: 'Coventry, UK', address: 'Arden House, Middlemarch Park, Coventry', postcode: 'CV3 4FJ', country: 'UK' },
  'University of Buckingham': { city: 'Buckingham, UK', address: 'Hunter Street, Buckingham', postcode: 'MK18 1EG', country: 'UK' },
  'University of Surrey': { city: 'Guildford, UK', address: 'Stag Hill, Guildford', postcode: 'GU2 7XH', country: 'UK' },
  'Brookfield Community School': { city: 'Chesterfield, UK', address: 'Chatsworth Rd, Chesterfield', postcode: 'S40 3NR', country: 'UK' },
  'Cranford Community College': { city: 'Hounslow, UK', address: 'High St, Hounslow', postcode: 'TW5 9PD', country: 'UK' },
  'Delgado Community College': { city: 'London, UK', address: '12-14 New Fetter Ln, London', postcode: 'EC4A 1AN', country: 'UK' },
  'Faringdon Community College': { city: 'Faringdon, UK', address: 'Fernham Rd, Faringdon', postcode: 'SN7 7JZ', country: 'UK' },
  'Heston Community School': { city: 'Hounslow, UK', address: 'Heston Rd, Hounslow', postcode: 'TW5 0QR', country: 'UK' },
  'Hinds Community College': { city: 'Oxford, UK', address: 'Gipsy Ln, Headington, Oxford', postcode: 'OX3 0BP', country: 'UK' },
  'Knowsley Community College': { city: 'Prescot, UK', address: 'Stockbridge Ln, Huyton, Prescot', postcode: 'L36 3SD', country: 'UK' },
  'Laurelhill Community College': { city: 'Lisburn, UK', address: '22 Laurelhill Rd, Lisburn', postcode: 'BT28 2UH', country: 'UK' },
  'Bournemouth University': { city: 'Bournemouth, UK', address: 'Fern Barrow, Poole, Bournemouth', postcode: 'BH12 5BB', country: 'UK' },
  'Church Stretton School': { city: 'Shropshire, UK', address: 'Shrewsbury Rd, Church Stretton', postcode: 'SY6 6EX', country: 'UK' },
  'University of Limerick': { city: 'Limerick, Ireland', address: 'Castletroy, Limerick', postcode: 'V94 T9PX', country: 'Ireland' },
  'University of Galway': { city: 'Galway, Ireland', address: 'University Rd, Galway', postcode: 'H91 TK33', country: 'Ireland' },
  'National University of Ireland': { city: 'Dublin, Ireland', address: '49 Merrion Square E, Dublin 2', postcode: 'D02 V632', country: 'Ireland' },
  'Trinity University': { city: 'Dublin, Ireland', address: 'College Green, Dublin 2', postcode: 'D02 PN40', country: 'Ireland' },
  'Deutsche Pop Wien': { city: 'Vienna, Austria', address: 'Gürtelstraße 27, 1150 Wien', postcode: '1150', country: 'Austria' },
  'Borg Murau': { city: 'Murau, Austria', address: 'Bundesstraße 7, 8850 Murau', postcode: '8850', country: 'Austria' },
  'BRG-Viktring': { city: 'Klagenfurt, Austria', address: 'Stiftsgebaeude 1, 9073 Klagenfurt-Viktring', postcode: '9073', country: 'Austria' },
  'University of Innsbruck': { city: 'Innsbruck, Austria', address: 'Innrain 52, 6020 Innsbruck', postcode: '6020', country: 'Austria' },
  'University of Vienna': { city: 'Vienna, Austria', address: 'Universitätsring 1, 1010 Wien', postcode: '1010', country: 'Austria' },
  'University of Leoben': { city: 'Leoben, Austria', address: 'Franz-Josef-Straße 18, 8700 Leoben', postcode: '8700', country: 'Austria' },
  'University of Klagenfurt': { city: 'Klagenfurt, Austria', address: 'Universitätsstraße 65-67, 9020 Klagenfurt', postcode: '9020', country: 'Austria' },
  'Kenya Medical Training College (Kakamega)': { city: 'Kakamega, Kenya', address: 'P.O. Box 535, Kakamega', postcode: '50100', country: 'Kenya' },
  'Alliance High School': { city: 'Kikuyu, Kenya', address: 'P.O. Box 7-00602, Kikuyu', postcode: '00602', country: 'Kenya' },
  'Maseno University': { city: 'Maseno, Kenya', address: 'Private Bag, Maseno', postcode: '40105', country: 'Kenya' },
  'Salem Community School': { city: 'Salem, Germany', address: 'Schlossbezirk 1, 88682 Salem', postcode: '88682', country: 'Germany' },
  'Shepherd School': { city: 'Rendsburg, Germany', address: 'Am Stadtsee 1, 24768 Rendsburg', postcode: '24768', country: 'Germany' },
  'Fichteschule': { city: 'Weida, Germany', address: 'Schloßberg 1, 07570 Weida', postcode: '07570', country: 'Germany' },
  'JurGrad gGmbH': { city: 'Munster, Germany', address: 'Königsstraße 47, 48143 Münster', postcode: '48143', country: 'Germany' },
  'oeoemrang-Skuul': { city: 'Nebel, Germany', address: 'Uasterstigh 43, 25946 Nebel', postcode: '25946', country: 'Germany' },
  'Fritz-Henßler-Berufskolleg': { city: 'Dortmund, Germany', address: 'Brügmannstraße 21', postcode: '44135', country: 'Germany' },
  'Luise-Henriette-Gymnasium': { city: 'Berlin, Germany', address: 'Germaniastraße 4-6', postcode: '12099', country: 'Germany' },
  'Städtisches Gymnasium Hennef': { city: 'Hennef, Germany', address: 'Fritz-Jacobi-Straße 10', postcode: '53773', country: 'Germany' },
  'Cornerstone Community': { city: 'Dubbo, Australia', address: '123 Macquarie St, Dubbo', postcode: '2830', country: 'Australia' },
  'Bond University': { city: 'Gold Coast, QLD, Australia', address: '14 University Dr, Robina', postcode: '4226', country: 'Australia' },
  'University of Tasmania': { city: 'Hobart, TAS, Australia', address: 'Churchill Ave, Hobart', postcode: '7005', country: 'Australia' },
  'University of Canberra': { city: 'Canberra, ACT, Australia', address: '11 Kirinari St, Bruce', postcode: '2617', country: 'Australia' },
  'University of murdoch': { city: 'Perth, WA, Australia', address: '90 South St, Murdoch', postcode: '6150', country: 'Australia' },
  'University of Wollongong': { city: 'Wollongong, NSW, Australia', address: 'Northfields Ave, Wollongong', postcode: '2522', country: 'Australia' },
  'Mini Bambini Early Learning Centre': { city: 'Sydney, NSW, Australia', address: '15 Bambini Way, Sydney', postcode: '2000', country: 'Australia' },
  'Northfield University': { city: 'Boston, MA, USA', address: '750 University Avenue, Boston, MA', postcode: '02115', country: 'USA' },
  'Cole Co. R-I Middle': { city: 'Russellville, MO, USA', address: '13600 Route C, Russellville, MO', postcode: '65074', country: 'USA' },
  'Commack Middle School': { city: 'Commack, NY, USA', address: '700 Townline Rd, Commack, NY', postcode: '11725', country: 'USA' },
  'Cohagen School': { city: 'Cohagen, MT, USA', address: '100 School St, Cohagen, MT', postcode: '59322', country: 'USA' },
  'Coalfield School': { city: 'Coalfield, TN, USA', address: '1720 Coalfield Rd, Coalfield, TN', postcode: '37719', country: 'USA' },
  'Mona School': { city: 'Mona, UT, USA', address: '150 S 100 E, Mona, UT', postcode: '84645', country: 'USA' },
  'Deary School': { city: 'Deary, ID, USA', address: '502 1st Ave, Deary, ID', postcode: '83823', country: 'USA' },
  'Park University': { city: 'Parkville, MO', address: '8700 NW River Park Dr', postcode: '64152', country: 'USA' },
  'Hudson County Community College': { city: 'Jersey City, NJ, USA', address: '70 Sip Ave, Jersey City, NJ', postcode: '07306', country: 'USA' },
  'University of Houston': { city: 'Houston, TX, USA', address: '4800 Calhoun Rd, Houston, TX', postcode: '77004', country: 'USA' },
  'University of Guam': { city: 'Mangilao, GU, USA', address: '303 University Dr, Mangilao, GU', postcode: '96923', country: 'USA' },
  'Lee University': { city: 'Cleveland, TN, USA', address: '1120 N Ocoee St, Cleveland, TN', postcode: '37311', country: 'USA' },
  'Air University': { city: 'Montgomery, AL, USA', address: '55 LeMay Plaza, Montgomery, AL', postcode: '36112', country: 'USA' },
  'Ross University': { city: 'North Brunswick, NJ, USA', address: '630 US-1, North Brunswick, NJ', postcode: '08902', country: 'USA' },
  'ADEN University': { city: 'Miami, FL, USA', address: '2121 Ponce de Leon Blvd, Coral Gables, FL', postcode: '33134', country: 'USA' },
  'Duke University': { city: 'Durham, NC, USA', address: '2020 Campus Dr, Durham, NC', postcode: '27708', country: 'USA' },
  'University City': { city: 'University City, MO, USA', address: '6800 Delmar Blvd, University City, MO', postcode: '63130', country: 'USA' },
  'Brandon University': { city: 'Brandon, MB, Canada', address: '270 18th St, Brandon, MB', postcode: 'R7A 6A9', country: 'Canada' },
  'York University': { city: 'Toronto, ON, Canada', address: '4700 Keele St, Toronto, ON', postcode: 'M3J 1P3', country: 'Canada' },
  'Assumption University': { city: 'Windsor, ON, Canada', address: '400 Huron Church Rd, Windsor, ON', postcode: 'N9B 3P4', country: 'Canada' },
  'McMaster University': { city: 'Hamilton, ON, Canada', address: '1280 Main St W, Hamilton, ON', postcode: 'L8S 4L8', country: 'Canada' },
  'Huntington University': { city: 'Sudbury, ON, Canada', address: '935 Ramsey Lake Rd, Sudbury, ON', postcode: 'P3E 2C6', country: 'Canada' },
  'DelMar College': { city: 'Red Deer, AB, Canada', address: '4813 50 St, Red Deer, AB', postcode: 'T4N 1X4', country: 'Canada' },
  'Cargair, St-Hubert': { city: 'Saint-Hubert, QC, Canada', address: '4800 Route de l\'Aéroport, Saint-Hubert, QC', postcode: 'J3Y 8Y9', country: 'Canada' },
  'Kikino School': { city: 'Kikino, AB, Canada', address: 'General Delivery, Kikino, AB', postcode: 'T0A 2B0', country: 'Canada' },
  'Cegep Limoilou': { city: 'Quebec City, QC, Canada', address: '1300 8e Ave, Québec, QC', postcode: 'G1J 5L5', country: 'Canada' },
  'Dental Dynamic Institute': { city: 'Red Deer, AB, Canada', address: '4813 50 St, Red Deer, AB', postcode: 'T4N 1X4', country: 'Canada' },
  'Kikkawa College': { city: 'Toronto, ON, Canada', address: '2736 Danforth Ave, Toronto, ON', postcode: 'M4C 1L7', country: 'Canada' },
  'Kootenay Columbia College': { city: 'Burnaby, BC, Canada', address: '4501 Kingsway, Burnaby, BC', postcode: 'V5H 2A9', country: 'Canada' },
  'Cegep Gerald-Godin': { city: 'Sainte-Genevieve, QC, Canada', address: '15615 Boul Gouin O, Sainte-Geneviève, QC', postcode: 'H9H 5K8', country: 'Canada' },
  'École Mathieu-Martin': { city: 'Dieppe, NB, Canada', address: '511 Champlain St, Dieppe, NB', postcode: 'E1A 1P2', country: 'Canada' },
  'Degloor College Degloor': { city: 'Deglur, Maharashtra, India', address: 'Deglur, Nanded, Maharashtra', postcode: '431717', country: 'India' },
  'FEEDS College': { city: 'Hengbung, Manipur, India', address: 'Hengbung, Senapati, Manipur', postcode: '795129', country: 'India' },
  'Tihu College': { city: 'Nalbari, Assam, India', address: 'Tihu, Nalbari, Assam', postcode: '781371', country: 'India' },
  'Tikrikilla College': { city: 'West Garo Hills, Meghalaya, India', address: 'Tikrikilla, West Garo Hills, Meghalaya', postcode: '794109', country: 'India' },
  'DIET Dibrugarh': { city: 'Dibrugarh, Assam, India', address: 'Chowkidingee, Dibrugarh, Assam', postcode: '786001', country: 'India' },
  'Dibru College': { city: 'Dibrugarh, Assam, India', address: 'Dibrugarh, Assam', postcode: '786001', country: 'India' },
  'Lycée Delamare-Deboutteville': { city: 'Forges-les-Eaux, France', address: '1 Rue du Lycée, Forges-les-Eaux', postcode: '76440', country: 'France' },
  'Terre & Feu': { city: 'Lille, France', address: '12 Rue de Lille, Lille', postcode: '59000', country: 'France' },
  'Hiloza': { city: 'Andrézieux-Bouthéon, France', address: '5 Rue de la Loire, Andrézieux-Bouthéon', postcode: '42160', country: 'France' },
  'Ecole Kienz': { city: 'Marcq-en-Baroeul, France', address: '8 Rue de Marcq, Marcq-en-Baroeul', postcode: '59700', country: 'France' },
  'MFR Vernines': { city: 'Vernines, France', address: 'Le Bourg, Vernines', postcode: '63210', country: 'France' },
  'Next Advance': { city: 'Paris, France', address: '15 Rue de Paris, Paris', postcode: '75000', country: 'France' },
  'Farmacia Bologna Unibo': { city: 'Bologna, Italy', address: 'Via Irnerio, 48', postcode: '40126', country: 'Italy' },
  'LICEO MINGHETTI Bologna': { city: 'Bologna, Italy', address: 'Via Nazario Sauro, 18', postcode: '40121', country: 'Italy' },
  'Università di Bologna': { city: 'Bologna, Italy', address: 'Via Zamboni, 33', postcode: '40126', country: 'Italy' },
  'Accademia Belle Arti Bologna': { city: 'Bologna, Italy', address: 'Via delle Belle Arti, 54', postcode: '40126', country: 'Italy' },
  'University of Bologna - Unibo': { city: 'Bologna, Italy', address: 'Via Zamboni, 33', postcode: '40126', country: 'Italy' },
  'Mila University': { city: 'Nilai, Malaysia', address: 'Persiaran Murni Barat, Putra Nilai', postcode: '71800', country: 'Malaysia' },
  'University Of Wales': { city: 'Kuala Lumpur, Malaysia', address: 'Jalan Sultan Ismail, Kuala Lumpur', postcode: '50250', country: 'Malaysia' },
  'University of Malaya': { city: 'Kuala Lumpur, Malaysia', address: 'Jln Prof. Diraja Ungku Abdul Aziz', postcode: '50603', country: 'Malaysia' },
  'Tanta university': { city: 'Kuala Lumpur, Malaysia', address: 'Jalan Ampang, Kuala Lumpur', postcode: '50450', country: 'Malaysia' },
  'Alexandria University': { city: 'Petaling Jaya, Malaysia', address: 'Jalan Utara, Petaling Jaya, Selangor', postcode: '46200', country: 'Malaysia' },
  'Sunway University': { city: 'Subang Jaya, Malaysia', address: '5 Jalan Universiti, Bandar Sunway', postcode: '47500', country: 'Malaysia' }
};

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const COURSES = [
  'Bachelor of Computer Science',
  'Bachelor of Medicine',
  'Bachelor of Engineering',
  'Bachelor of Business Administration',
  'Bachelor of Arts in Economics',
  'Bachelor of Science in Nursing',
  'Bachelor of Laws (LLB)',
  'Bachelor of Pharmacy',
  'Bachelor of Architecture',
  'Bachelor of Education'
];

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getRandomPhoneNumber = (country: 'Kenya' | 'UK' | 'Germany' | 'Australia' | 'USA' | 'Canada' | 'India' | 'France' | 'Italy' | 'Ireland' | 'Austria' | 'Malaysia'): string => {
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
  } else if (country === 'India') {
    const prefix = [7, 8, 9].sort(() => Math.random() - 0.5)[0];
    const rest = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
    return `+91 ${prefix}${rest.slice(0, 4)} ${rest.slice(4)}`;
  } else if (country === 'France') {
    const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    return `+33 6 ${number.slice(0, 2)} ${number.slice(2, 4)} ${number.slice(4, 6)} ${number.slice(6)}`;
  } else if (country === 'Italy') {
    const number = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
    return `+39 3${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ${number.slice(0, 3)} ${number.slice(3)}`;
  } else if (country === 'Ireland') {
    const number = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
    return `+353 8${Math.floor(Math.random() * 9)} ${number.slice(0, 3)} ${number.slice(3)}`;
  } else if (country === 'Austria') {
    const number = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
    return `+43 6${Math.floor(Math.random() * 9)}0 ${number.slice(0, 3)} ${number.slice(3)}`;
  } else if (country === 'Malaysia') {
    const prefix = ['12', '13', '14', '16', '17', '18', '19'].sort(() => Math.random() - 0.5)[0];
    const rest1 = Math.floor(Math.random() * 900) + 100;
    const rest2 = Math.floor(Math.random() * 9000) + 1000;
    return `+60 ${prefix}-${rest1} ${rest2}`;
  }
  const number = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return `+44 7${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
};

const getRandomId = (university: string): string => {
  const year = "26"; 
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  if (university.includes('Kenya Medical Training College')) return `KMTC/KKM/20${year}/${randomNum}`;
  if (university === 'Alliance High School') return `AHS-KE-${year}-${randomNum}`;
  if (university === 'Maseno University') return `MSU-KE-${year}-${randomNum}`;
  if (university === 'Salem Community School') return `SCS-DE-${year}-${randomNum}`;
  if (university === 'Shepherd School') return `SS-DE-${year}-${randomNum}`;
  if (university === 'Fichteschule') return `FS-DE-${year}-${randomNum}`;
  if (university === 'JurGrad gGmbH') return `JG-DE-${year}-${randomNum}`;
  if (university === 'oeoemrang-Skuul') return `OS-DE-${year}-${randomNum}`;
  if (university === 'Fritz-Henßler-Berufskolleg') return `FHB-DE-${year}-${randomNum}`;
  if (university === 'Luise-Henriette-Gymnasium') return `LHG-DE-${year}-${randomNum}`;
  if (university === 'Städtisches Gymnasium Hennef') return `SGH-DE-${year}-${randomNum}`;
  if (university === 'Cornerstone Community') return `CC-AU-${year}-${randomNum}`;
  if (university === 'Bond University') return `BU-AU-${year}-${randomNum}`;
  if (university === 'University of Tasmania') return `UTAS-AU-${year}-${randomNum}`;
  if (university === 'University of Canberra') return `UC-AU-${year}-${randomNum}`;
  if (university === 'University of murdoch') return `MU-AU-${year}-${randomNum}`;
  if (university === 'University of Wollongong') return `UOW-AU-${year}-${randomNum}`;
  if (university === 'Mini Bambini Early Learning Centre') return `MBELC-AU-${year}-${randomNum}`;
  if (university === 'Northfield University') return `NU-${year}-${randomNum}`;
  if (university === 'Cole Co. R-I Middle') return `CCR-US-${year}-${randomNum}`;
  if (university === 'Commack Middle School') return `CMS-US-${year}-${randomNum}`;
  if (university === 'Cohagen School') return `CS-US-${year}-${randomNum}`;
  if (university === 'Coalfield School') return `CFS-US-${year}-${randomNum}`;
  if (university === 'Mona School') return `MS-US-${year}-${randomNum}`;
  if (university === 'Deary School') return `DS-US-${year}-${randomNum}`;
  if (university === 'Park University') return `PU-US-${year}-${randomNum}`;
  if (university === 'Hudson County Community College') return `HCCC-US-${year}-${randomNum}`;
  if (university === 'University of Houston') return `UH-US-${year}-${randomNum}`;
  if (university === 'University of Guam') return `UOG-US-${year}-${randomNum}`;
  if (university === 'Lee University') return `LU-US-${year}-${randomNum}`;
  if (university === 'Air University') return `AU-US-${year}-${randomNum}`;
  if (university === 'Ross University') return `RU-US-${year}-${randomNum}`;
  if (university === 'ADEN University') return `ADEN-US-${year}-${randomNum}`;
  if (university === 'Duke University') return `DU-US-${year}-${randomNum}`;
  if (university === 'University City') return `UC-US-${year}-${randomNum}`;
  if (university === 'Brandon University') return `BU-CA-${year}-${randomNum}`;
  if (university === 'York University') return `YU-CA-${year}-${randomNum}`;
  if (university === 'Assumption University') return `AU-CA-${year}-${randomNum}`;
  if (university === 'McMaster University') return `MU-CA-${year}-${randomNum}`;
  if (university === 'Huntington University') return `HU-CA-${year}-${randomNum}`;
  if (university === 'DelMar College') return `DMC-CA-${year}-${randomNum}`;
  if (university === 'Cargair, St-Hubert') return `CSH-CA-${year}-${randomNum}`;
  if (university === 'Kikino School') return `KS-CA-${year}-${randomNum}`;
  if (university === 'Cegep Limoilou') return `CL-CA-${year}-${randomNum}`;
  if (university === 'Dental Dynamic Institute') return `DDI-CA-${year}-${randomNum}`;
  if (university === 'Kikkawa College') return `KC-CA-${year}-${randomNum}`;
  if (university === 'Kootenay Columbia College') return `KCC-CA-${year}-${randomNum}`;
  if (university === 'Cegep Gerald-Godin') return `CGG-CA-${year}-${randomNum}`;
  if (university === 'École Mathieu-Martin') return `EMM-CA-${year}-${randomNum}`;
  if (university === 'Degloor College Degloor') return `DCD-IN-${year}-${randomNum}`;
  if (university === 'FEEDS College') return `FC-IN-${year}-${randomNum}`;
  if (university === 'Tihu College') return `TC-IN-${year}-${randomNum}`;
  if (university === 'Tikrikilla College') return `TKC-IN-${year}-${randomNum}`;
  if (university === 'DIET Dibrugarh') return `DIET-IN-${year}-${randomNum}`;
  if (university === 'Dibru College') return `DC-IN-${year}-${randomNum}`;
  if (university === 'Lycée Delamare-Deboutteville') return `LDD-FR-${year}-${randomNum}`;
  if (university === 'Terre & Feu') return `TF-FR-${year}-${randomNum}`;
  if (university === 'Hiloza') return `HLZ-FR-${year}-${randomNum}`;
  if (university === 'Ecole Kienz') return `EK-FR-${year}-${randomNum}`;
  if (university === 'MFR Vernines') return `MFR-FR-${year}-${randomNum}`;
  if (university === 'Next Advance') return `NA-FR-${year}-${randomNum}`;
  if (university === 'Farmacia Bologna Unibo') return `FBU-IT-${year}-${randomNum}`;
  if (university === 'LICEO MINGHETTI Bologna') return `LMB-IT-${year}-${randomNum}`;
  if (university === 'Università di Bologna') return `UNIBO-IT-${year}-${randomNum}`;
  if (university === 'Accademia Belle Arti Bologna') return `ABAB-IT-${year}-${randomNum}`;
  if (university === 'University of Bologna - Unibo') return `UNIBO-IT-${year}-${randomNum}`;
  if (university === 'University of Warwick') return `UOW-UK-${year}-${randomNum}`;
  if (university === 'University of Leeds') return `UOL-UK-${year}-${randomNum}`;
  if (university === 'Roo University') return `ROO-UK-${year}-${randomNum}`;
  if (university === 'Arden University') return `ARD-UK-${year}-${randomNum}`;
  if (university === 'University of Buckingham') return `UOB-UK-${year}-${randomNum}`;
  if (university === 'University of Surrey') return `UOS-UK-${year}-${randomNum}`;
  if (university === 'University of Limerick') return `UL-IE-${year}-${randomNum}`;
  if (university === 'University of Galway') return `UOG-IE-${year}-${randomNum}`;
  if (university === 'National University of Ireland') return `NUI-IE-${year}-${randomNum}`;
  if (university === 'Trinity University') return `TU-IE-${year}-${randomNum}`;
  if (university === 'Deutsche Pop Wien') return `DPW-AT-${year}-${randomNum}`;
  if (university === 'Borg Murau') return `BM-AT-${year}-${randomNum}`;
  if (university === 'BRG-Viktring') return `BRGV-AT-${year}-${randomNum}`;
  if (university === 'University of Innsbruck') return `UII-AT-${year}-${randomNum}`;
  if (university === 'University of Vienna') return `UNIVIE-AT-${year}-${randomNum}`;
  if (university === 'University of Leoben') return `MUL-AT-${year}-${randomNum}`;
  if (university === 'University of Klagenfurt') return `AAU-AT-${year}-${randomNum}`;
  if (university === 'Mila University') return `MILA-MY-${year}-${randomNum}`;
  if (university === 'University Of Wales') return `UW-MY-${year}-${randomNum}`;
  if (university === 'University of Malaya') return `UM-MY-${year}-${randomNum}`;
  if (university === 'Tanta university') return `TU-MY-${year}-${randomNum}`;
  if (university === 'Alexandria University') return `AU-MY-${year}-${randomNum}`;
  if (university === 'Sunway University') return `SUN-MY-${year}-${randomNum}`;
  return `CEA-${year}-${randomNum}`;
};

export const getRandomValidUntilDate = (): string => {
  // Random date between 10/08/2027 and 30/09/2027
  const startMs = new Date(2027, 7, 10).getTime(); // 10 Aug 2027
  const endMs = new Date(2027, 8, 30).getTime();   // 30 Sep 2027
  const randomMs = startMs + Math.random() * (endMs - startMs);
  const randomDate = new Date(randomMs);
  
  const dd = String(randomDate.getDate()).padStart(2, '0');
  const mm = String(randomDate.getMonth() + 1).padStart(2, '0');
  const yyyy = randomDate.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

export const generateRandomStudentInfo = (fixedUniversity?: string): StudentInfo => {
  const university = fixedUniversity || getRandomElement(Object.keys(SCHOOL_ADDRESS_MAP));
  const details = SCHOOL_ADDRESS_MAP[university] || { city: 'London', address: 'High Street, London', postcode: 'SW1A 1AA', country: 'UK' };
  
  const countryType = details.country;
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  
  const lastNamePool = countryType === 'Kenya' ? KENYA_LAST_NAMES : countryType === 'Germany' ? GERMANY_LAST_NAMES : countryType === 'Australia' ? AUSTRALIA_LAST_NAMES : countryType === 'USA' ? US_LAST_NAMES : countryType === 'Canada' ? CANADA_LAST_NAMES : countryType === 'India' ? INDIA_LAST_NAMES : countryType === 'France' ? FRANCE_LAST_NAMES : countryType === 'Italy' ? ITALY_LAST_NAMES : countryType === 'Ireland' ? IRELAND_LAST_NAMES : countryType === 'Austria' ? AUSTRIA_LAST_NAMES : countryType === 'Malaysia' ? MALAYSIA_LAST_NAMES : UK_LAST_NAMES;
  
  let fullName = '';
  let photo = '';
  let attempts = 0;
  const maxAttempts = 100;

  do {
    let firstName: string;
    if (gender === 'male') {
      firstName = countryType === 'Kenya' ? getRandomElement(KENYA_MALE_FIRST_NAMES) : countryType === 'Germany' ? getRandomElement(GERMANY_MALE_FIRST_NAMES) : countryType === 'Australia' ? getRandomElement(AUSTRALIA_MALE_FIRST_NAMES) : countryType === 'USA' ? getRandomElement(US_MALE_FIRST_NAMES) : countryType === 'Canada' ? getRandomElement(CANADA_MALE_FIRST_NAMES) : countryType === 'India' ? getRandomElement(INDIA_MALE_FIRST_NAMES) : countryType === 'France' ? getRandomElement(FRANCE_MALE_FIRST_NAMES) : countryType === 'Italy' ? getRandomElement(ITALY_MALE_FIRST_NAMES) : countryType === 'Ireland' ? getRandomElement(IRELAND_MALE_FIRST_NAMES) : countryType === 'Austria' ? getRandomElement(AUSTRIA_MALE_FIRST_NAMES) : countryType === 'Malaysia' ? getRandomElement(MALAYSIA_MALE_FIRST_NAMES) : getRandomElement(UK_MALE_FIRST_NAMES);
      photo = getRandomElement(MALE_AVATARS);
    } else {
      firstName = countryType === 'Kenya' ? getRandomElement(KENYA_FEMALE_FIRST_NAMES) : countryType === 'Germany' ? getRandomElement(GERMANY_FEMALE_FIRST_NAMES) : countryType === 'Australia' ? getRandomElement(AUSTRALIA_FEMALE_FIRST_NAMES) : countryType === 'USA' ? getRandomElement(US_FEMALE_FIRST_NAMES) : countryType === 'Canada' ? getRandomElement(CANADA_FEMALE_FIRST_NAMES) : countryType === 'India' ? getRandomElement(INDIA_FEMALE_FIRST_NAMES) : countryType === 'France' ? getRandomElement(FRANCE_FEMALE_FIRST_NAMES) : countryType === 'Italy' ? getRandomElement(ITALY_FEMALE_FIRST_NAMES) : countryType === 'Ireland' ? getRandomElement(IRELAND_FEMALE_FIRST_NAMES) : countryType === 'Austria' ? getRandomElement(AUSTRIA_FEMALE_FIRST_NAMES) : countryType === 'Malaysia' ? getRandomElement(MALAYSIA_FEMALE_FIRST_NAMES) : getRandomElement(UK_FEMALE_FIRST_NAMES);
      photo = getRandomElement(FEMALE_AVATARS);
    }
    const lastName = getRandomElement(lastNamePool);
    fullName = cleanDiacritics(`${firstName} ${lastName}`).toUpperCase();
    attempts++;
  } while (usedNames.has(fullName) && attempts < maxAttempts);

  usedNames.add(fullName);
  
  const phone = getRandomPhoneNumber(countryType);

  return {
    universityName: university,
    studentName: fullName,
    dob: '12 May 2005', // Default or random
    studentId: getRandomId(university),
    phone: phone,
    address: `${details.address}, ${details.postcode}, ${countryType === 'UK' ? 'UK' : countryType === 'USA' ? 'USA' : countryType === 'Canada' ? 'Canada' : countryType === 'India' ? 'India' : countryType === 'France' ? 'France' : countryType === 'Italy' ? 'Italy' : countryType}`,
    location: details.city,
    academicYear: '2026/2027',
    course: getRandomElement(COURSES),
    status: 'Currently Enrolled',
    issueDate: '01 Sep 2026',
    validUntil: getRandomValidUntilDate(),
    website: university === 'Hudson County Community College' ? 'www.hccc.edu' : `www.${university.toLowerCase().replace(/[^a-z0-9]/g, '-')}.edu`,
    photo: photo,
    logo: null,
    bloodGroup: getRandomElement(bloodGroups),
    emergencyContact: getRandomPhoneNumber(countryType),
  };
};
