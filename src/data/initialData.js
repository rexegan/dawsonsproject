// Seed data for Johnson County Young Life — Texas

export const SCHOOLS = [
  'Cleburne High School', 'Cleburne Middle School',
  'Burleson High School', 'Burleson Centennial High School', 'Burleson Middle School',
  'Alvarado High School', 'Alvarado Middle School',
  'Joshua High School', 'Joshua Middle School',
  'Godley High School', 'Godley Middle School',
  'Grandview High School', 'Venus High School',
  'Rio Vista High School', 'Hillsboro High School',
];

export const GRADES = ['6th','7th','8th','9th','10th','11th','12th'];
export const MS_GRADES = ['6th','7th','8th'];
export const HS_GRADES = ['9th','10th','11th','12th'];

export const initialStudents = [
  // ── Imported from YL Club Cards 2025-26 ─────────────────────────────────
  { id:'rs1',  firstName:'Abby',      lastName:'Sutton',      grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs2',  firstName:'Addi',      lastName:'Dillard',     grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs3',  firstName:'Addison',   lastName:'Morgan',      grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs4',  firstName:'Allie',     lastName:'Marcontell',  grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs5',  firstName:'Alyssa',    lastName:'Cooke',       grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs6',  firstName:'Amber',     lastName:'Huffman',     grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs7',  firstName:'Amelia',    lastName:'Dougherty',   grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs8',  firstName:'Amelia',    lastName:'Shupbach',    grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs9',  firstName:'Andi',      lastName:'Villareal',   grade:'12th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs10', firstName:'Anna',      lastName:'Easterwood',  grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs11', firstName:'Anna',      lastName:'Garica',      grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs12', firstName:'Anna',      lastName:'Taylor',      grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs13', firstName:'Audrey',    lastName:'Massey',      grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs14', firstName:'Avery',     lastName:'Robertson',   grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs15', firstName:'Bella',     lastName:'Martinez',    grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs16', firstName:'Breckin',   lastName:'Stroman',     grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs17', firstName:'Brynn',     lastName:'Walters',     grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs18', firstName:'Caitlin',   lastName:'Kelley',      grade:'12th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs19', firstName:'Cali',      lastName:'Flores',      grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs20', firstName:'Callie',    lastName:'Chandler',    grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs21', firstName:'Carly',     lastName:'Hinnant',     grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs22', firstName:'Carson',    lastName:'Burris',      grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs23', firstName:'Cassidy',   lastName:'Berry',       grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs24', firstName:'Caylee',    lastName:'Denny',       grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs25', firstName:'Charlie',   lastName:'Brown',       grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs26', firstName:'Chaylea',   lastName:'Dyer',        grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs27', firstName:'Chloe',     lastName:'Kelley',      grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs28', firstName:'Chloe',     lastName:'Teague',      grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs29', firstName:'Cici',      lastName:'Tarkington',  grade:'12th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs30', firstName:'Claire',    lastName:'Cooke',       grade:'12th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs31', firstName:'Claire',    lastName:'Dunn',        grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs32', firstName:'Claire',    lastName:'Rhoades',     grade:'12th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs33', firstName:'Cora',      lastName:'Mathison',    grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs34', firstName:'Ellie',     lastName:'Parker',      grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs35', firstName:'Emma',      lastName:'Barnett',     grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs36', firstName:'Emma',      lastName:'Burnside',    grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs37', firstName:'Emma',      lastName:'Villarreal',  grade:'12th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs38', firstName:'Erica',     lastName:'Sanchez',     grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs39', firstName:'Faith',     lastName:'Rhoades',     grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs40', firstName:'Gillian',   lastName:'Keller',      grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs41', firstName:'Gracie',    lastName:'Teague',      grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs42', firstName:'Haddie',    lastName:'Jones',       grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs43', firstName:'Haley',     lastName:'Osborn',      grade:'12th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs44', firstName:'Halle',     lastName:'Hestand',     grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs45', firstName:'Hannah',    lastName:'Baker',       grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs46', firstName:'Hannah',    lastName:'Lawrence',    grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs47', firstName:'Harper',    lastName:'Hagan',       grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs48', firstName:'Isabella',  lastName:'Orellana',    grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs49', firstName:'Jacee',     lastName:'Cuellar',     grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs50', firstName:'Jada',      lastName:'Wilkins',     grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs51', firstName:'Jana',      lastName:'Mitchell',    grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs52', firstName:'Jayden',    lastName:'Richardson',  grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs53', firstName:'Jenna',     lastName:'Mosher',      grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs54', firstName:'Jessie',    lastName:'Wright',      grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs55', firstName:'Kailee',    lastName:'Gilliam',     grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs56', firstName:'Kambri',    lastName:'Kelley',      grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs57', firstName:'Karlee',    lastName:'Roney',       grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs58', firstName:'Kate',      lastName:'Chambers',    grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs59', firstName:'Kate',      lastName:'Ruiz',        grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs60', firstName:'Katie',     lastName:'Anguiano',    grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs61', firstName:'Kaylee',    lastName:'Herrell',     grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs62', firstName:'Kaylie',    lastName:'Herrell',     grade:'12th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs63', firstName:'Kori',      lastName:'Sanchez',     grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs64', firstName:'Kylie',     lastName:'Parson',      grade:'9th',  school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs65', firstName:'Lakin',     lastName:'Stephens',    grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs66', firstName:'Lauren',    lastName:'Gilliam',     grade:'10th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs67', firstName:'Lexi',      lastName:'Richardson',  grade:'12th', school:'Burleson High School',  phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l2', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs68', firstName:'Lily',      lastName:'Thompson',    grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs69', firstName:'Lindsey',   lastName:'Parson',      grade:'11th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
  { id:'rs70', firstName:'Maggie',    lastName:'Binkley',     grade:'12th', school:'Joshua High School',   phone:'', email:'', parentName:'', parentPhone:'', tags:[], leaderId:'l4', program:'YoungLife', notes:'Imported from YL Club Cards 2025-26', dateAdded:'2025-08-01' },
];

export const initialLeaders = [
  { id:'l1', firstName:'Theresa',  lastName:'Boydston', role:'Area Director',     program:'Both',       phone:'(817)555-0001', email:'theresa.boydston@younglife.org',  bio:'Area Director for Johnson County Young Life. Passionate about reaching every student in JC.',                             schools:['Cleburne High School','Burleson High School','Burleson Centennial High School'],          initials:'TB', color:'#1B4FA3' },
  { id:'l2', firstName:'Josh',     lastName:'Nguyen',   role:'YoungLife Leader',  program:'YoungLife',  phone:'(817)555-0102', email:'josh.nguyen@younglife.org',       bio:'High school leader covering Cleburne, Burleson, Grandview, Godley, and Hillsboro.',                                     schools:['Cleburne High School','Burleson High School','Godley High School','Grandview High School','Hillsboro High School'], initials:'JN', color:'#1B4FA3' },
  { id:'l3', firstName:'Megan',    lastName:'Carter',   role:'WyldLife Leader',   program:'WyldLife',   phone:'(817)555-0103', email:'megan.carter@younglife.org',      bio:'Middle school leader for all WyldLife clubs in Johnson County. Loves the energy of MS kids!',                          schools:['Cleburne Middle School','Burleson Middle School','Alvarado Middle School','Joshua Middle School','Godley Middle School'], initials:'MC', color:'#3AAB35' },
  { id:'l4', firstName:'Marcus',   lastName:'Hill',     role:'YoungLife Leader',  program:'YoungLife',  phone:'(817)555-0104', email:'marcus.hill@younglife.org',       bio:'High school leader covering Burleson Centennial, Alvarado, Joshua, Venus, and Rio Vista.',                               schools:['Burleson Centennial High School','Alvarado High School','Joshua High School','Venus High School','Rio Vista High School'], initials:'MH', color:'#854883' },
];

export const initialEvents = [
  { id:'e1', title:'YoungLife Club — Cleburne',    type:'club',        program:'YoungLife', date:'2026-08-22', time:'19:30', location:'456 Westhill Dr, Cleburne TX',          description:'Weekly club night for Cleburne-area high schoolers.',           leaderId:'l2' },
  { id:'e2', title:'WyldLife Club — Cleburne',     type:'club',        program:'WyldLife',  date:'2026-08-22', time:'18:30', location:'123 Country Club Rd, Cleburne TX',       description:'Weekly club night for Cleburne-area middle schoolers.',          leaderId:'l3' },
  { id:'e3', title:'YoungLife Club — Burleson',    type:'club',        program:'YoungLife', date:'2026-08-21', time:'19:30', location:'789 Renfro St, Burleson TX',             description:'Weekly club for Burleson HS and Burleson Centennial.',           leaderId:'l4' },
  { id:'e4', title:'WyldLife Club — Burleson',     type:'club',        program:'WyldLife',  date:'2026-08-21', time:'18:30', location:'789 Renfro St, Burleson TX',             description:'Weekly middle school club — Burleson.',                          leaderId:'l3' },
  { id:'e5', title:'Campaigners — High School',    type:'campaigners', program:'YoungLife', date:'2026-08-26', time:'16:30', location:'Megan\'s House — TBA',                   description:'Weekly Bible study for HS Campaigners.',                         leaderId:'l2' },
  { id:'e6', title:'Campaigners — Middle School',  type:'campaigners', program:'WyldLife',  date:'2026-08-26', time:'15:30', location:'Leader\'s Home — TBA',                   description:'Weekly Bible study for WyldLife Campaigners.',                   leaderId:'l3' },
  { id:'e7', title:'Fall Kickoff — All JC',        type:'special',     program:'Both',      date:'2026-09-05', time:'18:00', location:'Johnson County Fairgrounds, Cleburne TX', description:'All-county kickoff event — all students and schools welcome!',    leaderId:'l1' },
  { id:'e8', title:'Clay Shoot Fundraiser',        type:'special',     program:'Both',      date:'2026-10-04', time:'08:00', location:'Cleburne Shooting Complex',              description:'Annual fundraiser — all supporters welcome.',                    leaderId:'l1' },
  { id:'e9', title:'Frontier Ranch — Departs',     type:'camp',        program:'YoungLife', date:'2026-07-14', time:'05:30', location:'Cleburne HS Parking Lot',                description:'Summer camp at Frontier Ranch, Buena Vista CO.',                 leaderId:'l2' },
  { id:'e10',title:'Crooked Creek — Departs',      type:'camp',        program:'WyldLife',  date:'2026-07-21', time:'06:00', location:'Burleson Centennial Parking Lot',        description:'WyldLife summer camp — Crooked Creek Ranch, CO.',                leaderId:'l3' },
  { id:'e11',title:'Golf Tournament Fundraiser',   type:'special',     program:'Both',      date:'2026-09-25', time:'07:30', location:'Cleburne Golf Links, Cleburne TX',        description:'Johnson County Young Life Annual Golf Tournament fundraiser. All proceeds support student camp scholarships and local programming.', leaderId:'l1' },
];

export const initialAttendance = [
  // Aug 22 YoungLife Club — Cleburne
  { id:'a1',  eventId:'e1', studentId:'s13', present:true,  notes:'' },
  { id:'a2',  eventId:'e1', studentId:'s14', present:true,  notes:'Brought two volleyball teammates' },
  { id:'a3',  eventId:'e1', studentId:'s15', present:true,  notes:'' },
  { id:'a4',  eventId:'e1', studentId:'s25', present:true,  notes:'Long drive from Godley — faithful' },
  { id:'a5',  eventId:'e1', studentId:'s26', present:true,  notes:'' },
  { id:'a6',  eventId:'e1', studentId:'s27', present:false, notes:'Out of town' },
  { id:'a7',  eventId:'e1', studentId:'s33', present:true,  notes:'First time at club!' },
  { id:'a8',  eventId:'e1', studentId:'s34', present:true,  notes:'' },
  // Aug 22 WyldLife Club — Cleburne
  { id:'a9',  eventId:'e2', studentId:'s1',  present:true,  notes:'' },
  { id:'a10', eventId:'e2', studentId:'s2',  present:true,  notes:'' },
  { id:'a11', eventId:'e2', studentId:'s3',  present:false, notes:'Sick' },
  { id:'a12', eventId:'e2', studentId:'s7',  present:true,  notes:'Quiet but engaged' },
  { id:'a13', eventId:'e2', studentId:'s8',  present:true,  notes:'Brought two friends' },
  // Aug 21 YoungLife Club — Burleson
  { id:'a14', eventId:'e3', studentId:'s16', present:true,  notes:'' },
  { id:'a15', eventId:'e3', studentId:'s17', present:true,  notes:'' },
  { id:'a16', eventId:'e3', studentId:'s18', present:true,  notes:'' },
  { id:'a17', eventId:'e3', studentId:'s19', present:true,  notes:'New kid! Great first night' },
  { id:'a18', eventId:'e3', studentId:'s20', present:true,  notes:'' },
  { id:'a19', eventId:'e3', studentId:'s21', present:false, notes:'' },
  { id:'a20', eventId:'e3', studentId:'s22', present:true,  notes:'' },
];

export const initialFollowUps = [
  // ── COMPLETED — Calls ────────────────────────────────────────────────────
  { id:'f1',  studentId:'s2',  type:'call',  date:'2026-08-05', note:'Called Jana (Lily\'s mom) to introduce myself. She was warm and very thankful someone is investing in Lily. Mentioned Lily has had a hard semester socially.',                                              leaderId:'l3', completed:true  },
  { id:'f2',  studentId:'s7',  type:'call',  date:'2026-08-12', note:'Called Caden\'s mom Maria. Left voicemail — called back next day. Great conversation. Family goes to church occasionally. She wants to know more about WyldLife.',                                          leaderId:'l3', completed:true  },
  { id:'f3',  studentId:'s13', type:'call',  date:'2026-08-20', note:'Called Kevin (Drew\'s dad). He played football too — instant connection. Invited him to dads\' breakfast. He said Drew hasn\'t stopped talking about club.',                                               leaderId:'l2', completed:true  },
  { id:'f4',  studentId:'s19', type:'call',  date:'2026-08-16', note:'Called Scott (Jaxon\'s dad). New to Burleson, doesn\'t know many people yet. Invited them to the Fall Kickoff. Very grateful someone reached out.',                                                        leaderId:'l4', completed:true  },
  { id:'f5',  studentId:'s31', type:'call',  date:'2026-08-22', note:'Called Beth Durham (Callie\'s mom). She had heard about Young Life from a neighbor. Very excited. Said Callie has been looking for community since moving to Rio Vista.',                                  leaderId:'l4', completed:true  },
  { id:'f6',  studentId:'s24', type:'call',  date:'2026-07-30', note:'Called Gary Holt (Brooke\'s dad) to discuss her applying to work crew at Frontier Ranch. He was emotional — said Young Life changed her life. Full support.',                                              leaderId:'l4', completed:true  },

  // ── COMPLETED — Texts ────────────────────────────────────────────────────
  { id:'f7',  studentId:'s5',  type:'text',  date:'2026-08-18', note:'Texted Elijah after WyldLife club. Said "Great having you tonight — you\'re a natural encourager." He replied with three emojis and "I\'m definitely coming back."',                                      leaderId:'l3', completed:true  },
  { id:'f8',  studentId:'s14', type:'text',  date:'2026-08-23', note:'Texted Kaylee: "Hey! Your teammates are welcome anytime." She replied "We\'re all coming to the next one — I told them it was the most fun night of the year."',                                          leaderId:'l2', completed:true  },
  { id:'f9',  studentId:'s16', type:'text',  date:'2026-08-22', note:'Texted Gracie after club. She had a breakthrough conversation with a new girl who was nervous. Affirmed her and encouraged her to invite that girl back.',                                                 leaderId:'l2', completed:true  },
  { id:'f10', studentId:'s25', type:'text',  date:'2026-08-23', note:'Texted Brady: "You drove 40 minutes to be at club tonight. That means so much. How are you really doing?" He opened up about his parents\' divorce. Good conversation.',                                  leaderId:'l2', completed:true  },
  { id:'f11', studentId:'s33', type:'text',  date:'2026-08-23', note:'Texted Rylee after her first club ever. "So glad you came! We\'d love to have you back." She replied "I\'m definitely coming — that was so different from what I expected."',                             leaderId:'l2', completed:true  },

  // ── COMPLETED — Emails ───────────────────────────────────────────────────
  { id:'f12', studentId:'s6',  type:'email', date:'2026-08-10', note:'Emailed Greg Owens (Haley\'s dad) the Campaigners schedule and a description of what it is. Also attached the camp brochure for Crooked Creek. He responded immediately and said Haley is already signed up.',  leaderId:'l3', completed:true  },
  { id:'f13', studentId:'s22', type:'email', date:'2026-08-21', note:'Emailed Donna Graves (Autumn\'s mom) answering her questions about Young Life\'s faith statement, what Campaigners is, and how camp works. She forwarded it to her husband who then called me.',           leaderId:'l4', completed:true  },
  { id:'f14', studentId:'s15', type:'email', date:'2026-08-01', note:'Emailed Tanner the leadership application for the Frontier Ranch work crew. Added a personal note about why I think he\'s ready. He replied "This is exactly what I\'ve been looking for."',             leaderId:'l2', completed:true  },
  { id:'f15', studentId:'s28', type:'email', date:'2026-08-05', note:'Emailed Chloe the work crew application for Windy Gap and a reference form for her parents. Her senior year goal is to bring 10 new students to Young Life. Incredible.',                                  leaderId:'l2', completed:true  },

  // ── COMPLETED — Visits ───────────────────────────────────────────────────
  { id:'f16', studentId:'s1',  type:'visit', date:'2026-08-14', note:'Visited Mason at Cleburne Middle School at lunch. He lit up when he saw me. Introduced me to 5 of his friends. Gave them all flyers for WyldLife club.',                                                  leaderId:'l3', completed:true  },
  { id:'f17', studentId:'s27', type:'visit', date:'2026-08-17', note:'Visited Zach at Grandview HS before school. He\'s been bringing his whole friend group. Talked about stepping into a more intentional leadership role. He\'s ready.',                                      leaderId:'l2', completed:true  },
  { id:'f18', studentId:'s29', type:'visit', date:'2026-08-15', note:'Stopped by Venus HS after football practice. Introduced myself to Levi. He was surprised someone came to campus just to see him. Invited him to club — he came the next week.',                           leaderId:'l4', completed:true  },
  { id:'f19', studentId:'s34', type:'visit', date:'2026-08-11', note:'Sat with Micah at a Hillsboro home game. He introduced me to three other players. Micah has been key to WL growth in Hillsboro — he\'s a real multiplier.',                                              leaderId:'l2', completed:true  },

  // ── PENDING — Calls ──────────────────────────────────────────────────────
  { id:'f20', studentId:'s3',  type:'call',  date:'2026-08-25', note:'Need to call Randy Garrett (Bryson\'s dad) about the camp scholarship fund. Bryson is all in but family can\'t afford the full cost. Get application to them before Sept 1 deadline.',                   leaderId:'l3', completed:false },
  { id:'f21', studentId:'s9',  type:'call',  date:'2026-08-24', note:'Need to call Bill Hutchins (Nolan\'s dad). Haven\'t met the dad yet — only talked to mom. Nolan mentioned his dad is skeptical of church stuff. Important relationship to build.',                        leaderId:'l3', completed:false },
  { id:'f22', studentId:'s21', type:'call',  date:'2026-08-26', note:'Tyler Benson missed club last week and didn\'t respond to text. Need to call and check in — make sure everything is OK and he feels missed.',                                                             leaderId:'l4', completed:false },

  // ── PENDING — Texts ──────────────────────────────────────────────────────
  { id:'f23', studentId:'s4',  type:'text',  date:'2026-08-26', note:'Haven\'t heard from Avery in two weeks. Text her mom to see if she\'s OK — she had mentioned a friend situation at school that was stressful.',                                                           leaderId:'l3', completed:false },
  { id:'f24', studentId:'s10', type:'text',  date:'2026-08-25', note:'Sadie said she wants to go to Crooked Creek camp. Need to text her registration link and scholarship form before the Sept 10 deadline.',                                                                  leaderId:'l3', completed:false },
  { id:'f25', studentId:'s26', type:'text',  date:'2026-08-26', note:'Jordyn mentioned her sister (Addison, 8th grade) is having a tough time. Need to text Jordyn to follow up — see how she\'s doing and if there\'s a way to support the family.',                         leaderId:'l2', completed:false },
  { id:'f26', studentId:'s8',  type:'text',  date:'2026-08-26', note:'Paisley has been at WyldLife 3 weeks in a row and is bringing friends every time. Need to text her and affirm her — she might be a Campaigners candidate.',                                              leaderId:'l3', completed:false },

  // ── PENDING — Emails ─────────────────────────────────────────────────────
  { id:'f27', studentId:'s11', type:'email', date:'2026-08-25', note:'Need to email Dale Yates (Hunter\'s dad) the parent information packet for WyldLife. Hunter\'s family drives from Godley — want to make sure they feel valued and informed.',                             leaderId:'l3', completed:false },
  { id:'f28', studentId:'s30', type:'email', date:'2026-08-26', note:'Nadia asked about internship/work crew opportunities after she graduates. Need to email her the Young Life staff pathway info and talk to Theresa about next steps.',                                     leaderId:'l4', completed:false },

  // ── PENDING — Visits ─────────────────────────────────────────────────────
  { id:'f29', studentId:'s17', type:'visit', date:'2026-08-27', note:'Plan to visit Cole at Burleson HS during lunch on Thursday. He\'s been carrying a lot lately — mentioned his parents are going through a hard time. Just need to show up and be present.',              leaderId:'l2', completed:false },
  { id:'f30', studentId:'s23', type:'visit', date:'2026-08-28', note:'Going to Joshua HS on Friday morning to visit Wyatt. He\'s quiet one-on-one but opens up a lot. He told me last week he hasn\'t had a real adult conversation in months. This matters.',                leaderId:'l4', completed:false },
];
