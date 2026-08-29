// Seed data for Johnson County Young Life

export const SCHOOLS = [
  'Blue Valley', 'Blue Valley North', 'Blue Valley West', 'Blue Valley Northwest',
  'Blue Valley Southwest', 'Olathe East', 'Olathe North', 'Olathe South',
  'Olathe West', 'Olathe Northwest', 'SM East', 'SM West', 'SM North', 'SM South',
  'Lenexa Middle', 'Prairie Trail Middle', 'Harmony Middle', 'Oxford Middle',
];

export const GRADES = ['6th','7th','8th','9th','10th','11th','12th'];

export const MS_GRADES = ['6th','7th','8th'];
export const HS_GRADES = ['9th','10th','11th','12th'];

export const initialStudents = [
  { id:'s1', firstName:'Aiden', lastName:'Mitchell', grade:'10th', school:'Blue Valley North', phone:'(913)555-0201', email:'aiden.m@email.com', parentName:'Steve Mitchell', parentPhone:'(913)555-0200', parentEmail:'steve.mitchell@email.com', program:'YoungLife', leaderId:'l2', notes:'Plays soccer. Came to camp last summer.', tags:['camp','interested'], dateAdded:'2024-09-01' },
  { id:'s2', firstName:'Brianna', lastName:'Torres', grade:'7th', school:'Harmony Middle', phone:'(913)555-0202', email:'', parentName:'Maria Torres', parentPhone:'(913)555-0203', parentEmail:'m.torres@email.com', program:'WyldLife', leaderId:'l3', notes:'Very shy at first but opening up. Loves art.', tags:['interested'], dateAdded:'2024-09-05' },
  { id:'s3', firstName:'Caleb', lastName:'Johnson', grade:'11th', school:'Olathe Northwest', phone:'(913)555-0204', email:'caleb.j@email.com', parentName:'Derek Johnson', parentPhone:'(913)555-0205', parentEmail:'derek.j@email.com', program:'YoungLife', leaderId:'l2', notes:'Campaigners regular. Interested in leadership.', tags:['campaigners','camp','leadership'], dateAdded:'2024-08-20' },
  { id:'s4', firstName:'Danika', lastName:'Williams', grade:'8th', school:'Prairie Trail Middle', phone:'(913)555-0206', email:'', parentName:'Lisa Williams', parentPhone:'(913)555-0207', parentEmail:'lisa.w@email.com', program:'WyldLife', leaderId:'l3', notes:'Brings friends every week!', tags:['interested','multiplier'], dateAdded:'2024-10-01' },
  { id:'s5', firstName:'Ethan', lastName:'Park', grade:'9th', school:'SM East', phone:'(913)555-0208', email:'ethan.park@email.com', parentName:'James Park', parentPhone:'(913)555-0209', parentEmail:'james.park@email.com', program:'YoungLife', leaderId:'l4', notes:'New this semester. Met at football game.', tags:['new'], dateAdded:'2025-01-15' },
  { id:'s6', firstName:'Faith', lastName:'Robinson', grade:'12th', school:'Blue Valley', phone:'(913)555-0210', email:'faith.r@email.com', parentName:'Carol Robinson', parentPhone:'(913)555-0211', parentEmail:'carol.r@email.com', program:'YoungLife', leaderId:'l2', notes:'Senior leader in Campaigners. Heading to college.', tags:['campaigners','leadership','camp'], dateAdded:'2023-09-01' },
  { id:'s7', firstName:'Gavin', lastName:'Lee', grade:'6th', school:'Lenexa Middle', phone:'', email:'', parentName:'Tom Lee', parentPhone:'(913)555-0213', parentEmail:'tom.lee@email.com', program:'WyldLife', leaderId:'l3', notes:'First year. Neighbor of a leader.', tags:['new'], dateAdded:'2025-02-01' },
  { id:'s8', firstName:'Hannah', lastName:'Scott', grade:'10th', school:'Olathe East', phone:'(913)555-0214', email:'hannah.s@email.com', parentName:'Bob Scott', parentPhone:'(913)555-0215', parentEmail:'bob.scott@email.com', program:'YoungLife', leaderId:'l4', notes:'Loves music. Interested in camp this summer.', tags:['interested','camp'], dateAdded:'2024-11-10' },
  { id:'s9', firstName:'Isaiah', lastName:'Brown', grade:'8th', school:'Oxford Middle', phone:'(913)555-0216', email:'', parentName:'Denise Brown', parentPhone:'(913)555-0217', parentEmail:'denise.b@email.com', program:'WyldLife', leaderId:'l3', notes:'Quiet but engaged. Needs more follow-up.', tags:['follow-up'], dateAdded:'2024-09-15' },
  { id:'s10', firstName:'Jada', lastName:'Harris', grade:'11th', school:'Blue Valley West', phone:'(913)555-0218', email:'jada.h@email.com', parentName:'Mike Harris', parentPhone:'(913)555-0219', parentEmail:'mike.h@email.com', program:'YoungLife', leaderId:'l2', notes:'Very connected. Brings 3-4 friends regularly.', tags:['campaigners','multiplier','camp'], dateAdded:'2024-08-20' },
  { id:'s11', firstName:'Kevin', lastName:'Martinez', grade:'7th', school:'Harmony Middle', phone:'', email:'', parentName:'Rosa Martinez', parentPhone:'(913)555-0221', parentEmail:'rosa.m@email.com', program:'WyldLife', leaderId:'l3', notes:'Signed up at school event.', tags:['new','interested'], dateAdded:'2025-03-01' },
  { id:'s12', firstName:'Lauren', lastName:'Davis', grade:'12th', school:'SM North', phone:'(913)555-0222', email:'lauren.d@email.com', parentName:'Ann Davis', parentPhone:'(913)555-0223', parentEmail:'ann.davis@email.com', program:'YoungLife', leaderId:'l4', notes:'Wants to be a leader after graduation.', tags:['campaigners','leadership'], dateAdded:'2023-08-15' },
];

export const initialLeaders = [
  { id:'l1', firstName:'Tyler', lastName:'Brooks', role:'Area Director', program:'Both', phone:'(913)555-0101', email:'tyler.brooks@younglife.org', bio:'Area Director for 12 years. Father of 3.', schools:['Blue Valley North','Blue Valley','Blue Valley West'], initials:'TB', color:'#E8392A' },
  { id:'l2', firstName:'Josh', lastName:'Nguyen', role:'YoungLife Leader', program:'YoungLife', phone:'(913)555-0103', email:'josh.nguyen@younglife.org', bio:'Reaches high schoolers across the county.', schools:['Blue Valley North','Olathe Northwest','Blue Valley'], initials:'JN', color:'#1d4ed8' },
  { id:'l3', firstName:'Megan', lastName:'Carter', role:'WyldLife Leader', program:'WyldLife', phone:'(913)555-0102', email:'megan.carter@younglife.org', bio:'Loves middle schoolers and their energy.', schools:['Harmony Middle','Prairie Trail Middle','Oxford Middle','Lenexa Middle'], initials:'MC', color:'#059669' },
  { id:'l4', firstName:'Marcus', lastName:'Hill', role:'YoungLife Leader', program:'YoungLife', phone:'(913)555-0105', email:'marcus.hill@younglife.org', bio:'Coaches soccer at BVNW.', schools:['SM East','Olathe East','Blue Valley West','SM North'], initials:'MH', color:'#7c3aed' },
];

export const initialEvents = [
  { id:'e1', title:'YoungLife Club', type:'club', program:'YoungLife', date:'2025-07-11', time:'19:30', location:'456 Oak Ridge Dr, Olathe KS', description:'Weekly club night for high schoolers.', leaderId:'l2' },
  { id:'e2', title:'WyldLife Club', type:'club', program:'WyldLife', date:'2025-07-11', time:'19:00', location:'Johnson County Community Center', description:'Weekly club for middle schoolers.', leaderId:'l3' },
  { id:'e3', title:'Campaigners — HS', type:'campaigners', program:'YoungLife', date:'2025-07-16', time:'16:00', location:'Leaders Home — TBA', description:'Weekly Bible study for high schoolers.', leaderId:'l2' },
  { id:'e4', title:'Campaigners — MS', type:'campaigners', program:'WyldLife', date:'2025-07-16', time:'15:00', location:'Leaders Home — TBA', description:'Weekly Bible study for middle schoolers.', leaderId:'l3' },
  { id:'e5', title:'Summer Pool Party', type:'special', program:'Both', date:'2025-07-24', time:'14:00', location:'Leawood City Aquatic Center', description:'All students welcome!', leaderId:'l1' },
  { id:'e6', title:'YoungLife Club', type:'club', program:'YoungLife', date:'2025-07-18', time:'19:30', location:'456 Oak Ridge Dr, Olathe KS', description:'Weekly club night for high schoolers.', leaderId:'l2' },
  { id:'e7', title:'WyldLife Club', type:'club', program:'WyldLife', date:'2025-07-18', time:'19:00', location:'Johnson County Community Center', description:'Weekly club for middle schoolers.', leaderId:'l3' },
  { id:'e8', title:'Malibu Camp — Departs', type:'camp', program:'YoungLife', date:'2025-08-04', time:'06:00', location:'BVNW Parking Lot', description:'Summer camp at Malibu Club, BC Canada.', leaderId:'l1' },
  { id:'e9', title:'Silver Cliff Ranch — Departs', type:'camp', program:'WyldLife', date:'2025-08-11', time:'07:00', location:'Blue Valley North Parking Lot', description:'Summer camp at Silver Cliff Ranch, CO.', leaderId:'l1' },
];

export const initialAttendance = [
  { id:'a1', eventId:'e1', studentId:'s1', present:true, notes:'' },
  { id:'a2', eventId:'e1', studentId:'s3', present:true, notes:'' },
  { id:'a3', eventId:'e1', studentId:'s5', present:false, notes:'Sick' },
  { id:'a4', eventId:'e1', studentId:'s6', present:true, notes:'' },
  { id:'a5', eventId:'e1', studentId:'s8', present:true, notes:'Brought 2 friends' },
  { id:'a6', eventId:'e1', studentId:'s10', present:true, notes:'' },
  { id:'a7', eventId:'e1', studentId:'s12', present:true, notes:'' },
  { id:'a8', eventId:'e2', studentId:'s2', present:true, notes:'' },
  { id:'a9', eventId:'e2', studentId:'s4', present:true, notes:'Brought Kaitlyn' },
  { id:'a10', eventId:'e2', studentId:'s7', present:false, notes:'' },
  { id:'a11', eventId:'e2', studentId:'s9', present:true, notes:'' },
  { id:'a12', eventId:'e2', studentId:'s11', present:true, notes:'' },
];

export const initialFollowUps = [
  { id:'f1', studentId:'s5', type:'text', date:'2025-07-08', note:'Texted Ethan to check in. Missed last club. Said he\'ll be there Friday.', leaderId:'l4', completed:true },
  { id:'f2', studentId:'s9', type:'call', date:'2025-07-07', note:'Called Isaiah\'s mom. Left voicemail about upcoming camp.', leaderId:'l3', completed:true },
  { id:'f3', studentId:'s7', type:'visit', date:'2025-07-05', note:'Stopped by the school after football practice. Good convo with Gavin.', leaderId:'l3', completed:true },
  { id:'f4', studentId:'s9', type:'email', date:'2025-07-09', note:'Sent camp info email to parent.', leaderId:'l3', completed:true },
  { id:'f5', studentId:'s2', type:'text', date:'2025-07-10', note:'Need to follow up with Brianna about Campaigners.', leaderId:'l3', completed:false },
  { id:'f6', studentId:'s11', type:'call', date:'2025-07-10', note:'Call Kevin\'s parents about summer camp scholarship.', leaderId:'l3', completed:false },
  { id:'f7', studentId:'s5', type:'text', date:'2025-07-10', note:'Check in with Ethan after this week\'s club.', leaderId:'l4', completed:false },
];
