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
  // ── CLEBURNE MIDDLE SCHOOL (6th, 7th, 8th — WyldLife) ───────────────────
  { id:'s1',  firstName:'Mason',    lastName:'Alvarez',   grade:'6th',  school:'Cleburne Middle School',          phone:'(817)555-0101', email:'', parentName:'Carlos Alvarez',    parentPhone:'(817)555-0100', parentEmail:'carlos.alvarez@email.com',   program:'WyldLife',   leaderId:'l3', notes:'Met at Cleburne pep rally. Super energetic.',               tags:['new','interested'],               dateAdded:'2025-08-01' },
  { id:'s2',  firstName:'Lily',     lastName:'Hensley',   grade:'7th',  school:'Cleburne Middle School',          phone:'(817)555-0103', email:'', parentName:'Jana Hensley',       parentPhone:'(817)555-0102', parentEmail:'jana.hensley@email.com',      program:'WyldLife',   leaderId:'l3', notes:'Comes every week with her cousin. Loves crafts.',          tags:['interested'],                     dateAdded:'2025-09-05' },
  { id:'s3',  firstName:'Bryson',   lastName:'Garrett',   grade:'8th',  school:'Cleburne Middle School',          phone:'(817)555-0105', email:'', parentName:'Randy Garrett',      parentPhone:'(817)555-0104', parentEmail:'randy.garrett@email.com',     program:'WyldLife',   leaderId:'l3', notes:'8th grader interested in camp. Needs scholarship info.',   tags:['camp','follow-up'],               dateAdded:'2025-08-20' },

  // ── BURLESON MIDDLE SCHOOL (6th, 7th, 8th — WyldLife) ───────────────────
  { id:'s4',  firstName:'Avery',    lastName:'Simmons',   grade:'6th',  school:'Burleson Middle School',          phone:'',              email:'', parentName:'Tina Simmons',        parentPhone:'(817)555-0106', parentEmail:'tina.simmons@email.com',      program:'WyldLife',   leaderId:'l3', notes:'First event ever. Mom came to drop-off, seemed interested.', tags:['new'],                           dateAdded:'2025-10-01' },
  { id:'s5',  firstName:'Elijah',   lastName:'Morrison',  grade:'7th',  school:'Burleson Middle School',          phone:'(817)555-0108', email:'', parentName:'Sharon Morrison',    parentPhone:'(817)555-0107', parentEmail:'sharon.m@email.com',          program:'WyldLife',   leaderId:'l3', notes:'Very outgoing. Already inviting friends.',                 tags:['interested','multiplier'],        dateAdded:'2025-09-15' },
  { id:'s6',  firstName:'Haley',    lastName:'Owens',     grade:'8th',  school:'Burleson Middle School',          phone:'(817)555-0110', email:'', parentName:'Greg Owens',         parentPhone:'(817)555-0109', parentEmail:'greg.owens@email.com',        program:'WyldLife',   leaderId:'l3', notes:'In Campaigners. Solid leader in training.',               tags:['campaigners','leadership'],       dateAdded:'2024-09-01' },

  // ── ALVARADO MIDDLE SCHOOL (6th, 7th — WyldLife) ────────────────────────
  { id:'s7',  firstName:'Caden',    lastName:'Ramos',     grade:'6th',  school:'Alvarado Middle School',          phone:'',              email:'', parentName:'Maria Ramos',         parentPhone:'(817)555-0111', parentEmail:'maria.ramos@email.com',       program:'WyldLife',   leaderId:'l3', notes:'Quiet, but smiles a lot. Keep following up.',             tags:['new','follow-up'],                dateAdded:'2025-10-10' },
  { id:'s8',  firstName:'Paisley',  lastName:'Bowen',     grade:'7th',  school:'Alvarado Middle School',          phone:'(817)555-0113', email:'', parentName:'Darla Bowen',        parentPhone:'(817)555-0112', parentEmail:'darla.bowen@email.com',       program:'WyldLife',   leaderId:'l3', notes:'Brings two friends every week. Natural connector.',        tags:['interested','multiplier'],        dateAdded:'2025-09-01' },

  // ── JOSHUA MIDDLE SCHOOL (7th, 8th — WyldLife) ──────────────────────────
  { id:'s9',  firstName:'Nolan',    lastName:'Hutchins',  grade:'7th',  school:'Joshua Middle School',            phone:'(817)555-0115', email:'', parentName:'Bill Hutchins',      parentPhone:'(817)555-0114', parentEmail:'bill.hutchins@email.com',     program:'WyldLife',   leaderId:'l3', notes:'Dad coaches little league. Very community-oriented family.', tags:['interested'],                   dateAdded:'2025-09-20' },
  { id:'s10', firstName:'Sadie',    lastName:'Franks',    grade:'8th',  school:'Joshua Middle School',            phone:'(817)555-0117', email:'', parentName:'Connie Franks',      parentPhone:'(817)555-0116', parentEmail:'connie.franks@email.com',     program:'WyldLife',   leaderId:'l3', notes:'Asking good questions. Follow up about camp.',            tags:['camp','interested'],              dateAdded:'2025-08-25' },

  // ── GODLEY MIDDLE SCHOOL (6th, 8th — WyldLife) ──────────────────────────
  { id:'s11', firstName:'Hunter',   lastName:'Yates',     grade:'6th',  school:'Godley Middle School',            phone:'',              email:'', parentName:'Dale Yates',         parentPhone:'(817)555-0118', parentEmail:'dale.yates@email.com',        program:'WyldLife',   leaderId:'l3', notes:'Long drive from Godley — family is very committed.',       tags:['interested'],                     dateAdded:'2025-10-05' },
  { id:'s12', firstName:'Addison',  lastName:'Cross',     grade:'8th',  school:'Godley Middle School',            phone:'(817)555-0120', email:'', parentName:'Amy Cross',          parentPhone:'(817)555-0119', parentEmail:'amy.cross@email.com',         program:'WyldLife',   leaderId:'l3', notes:'Campaigners regular. Ready to go to camp.',               tags:['campaigners','camp'],             dateAdded:'2024-09-10' },

  // ── CLEBURNE HIGH SCHOOL (9th, 10th, 11th — YoungLife) ──────────────────
  { id:'s13', firstName:'Drew',     lastName:'Chandler',  grade:'9th',  school:'Cleburne High School',            phone:'(817)555-0121', email:'drew.c@email.com',   parentName:'Kevin Chandler',     parentPhone:'(817)555-0122', parentEmail:'kevin.chandler@email.com',    program:'YoungLife',  leaderId:'l2', notes:'Freshman on the JV football team. Met him at a game.',    tags:['new','interested'],               dateAdded:'2025-09-01' },
  { id:'s14', firstName:'Kaylee',   lastName:'Pena',      grade:'10th', school:'Cleburne High School',            phone:'(817)555-0123', email:'kaylee.p@email.com',  parentName:'Rosa Pena',          parentPhone:'(817)555-0124', parentEmail:'rosa.pena@email.com',         program:'YoungLife',  leaderId:'l2', notes:'Varsity volleyball. Brings 3–4 teammates regularly.',     tags:['interested','multiplier'],        dateAdded:'2024-09-05' },
  { id:'s15', firstName:'Tanner',   lastName:'Whitfield', grade:'11th', school:'Cleburne High School',            phone:'(817)555-0125', email:'tanner.w@email.com',  parentName:'Linda Whitfield',    parentPhone:'(817)555-0126', parentEmail:'linda.w@email.com',           program:'YoungLife',  leaderId:'l2', notes:'Campaigners. Wants to be a leader after graduation.',     tags:['campaigners','leadership','camp'],dateAdded:'2023-09-01' },

  // ── BURLESON HIGH SCHOOL (10th, 11th, 12th — YoungLife) ─────────────────
  { id:'s16', firstName:'Gracie',   lastName:'Tatum',     grade:'10th', school:'Burleson High School',            phone:'(817)555-0127', email:'gracie.t@email.com',  parentName:'Shelly Tatum',       parentPhone:'(817)555-0128', parentEmail:'shelly.tatum@email.com',      program:'YoungLife',  leaderId:'l2', notes:'Very welcoming to new kids at club. Great heart.',         tags:['interested','multiplier'],        dateAdded:'2024-09-10' },
  { id:'s17', firstName:'Cole',     lastName:'Ingram',    grade:'11th', school:'Burleson High School',            phone:'(817)555-0129', email:'cole.i@email.com',    parentName:'Jeff Ingram',        parentPhone:'(817)555-0130', parentEmail:'jeff.ingram@email.com',       program:'YoungLife',  leaderId:'l2', notes:'In Campaigners. Sharp kid, great at asking questions.',   tags:['campaigners','leadership'],       dateAdded:'2023-09-15' },
  { id:'s18', firstName:'Madison',  lastName:'Vance',     grade:'12th', school:'Burleson High School',            phone:'(817)555-0131', email:'madison.v@email.com', parentName:'Pam Vance',          parentPhone:'(817)555-0132', parentEmail:'pam.vance@email.com',         program:'YoungLife',  leaderId:'l2', notes:'Senior. Went to Frontier Ranch last summer. Life changed.', tags:['camp','campaigners','leadership'],dateAdded:'2022-09-01' },

  // ── BURLESON CENTENNIAL HIGH SCHOOL (9th, 12th — YoungLife) ─────────────
  { id:'s19', firstName:'Jaxon',    lastName:'Kelley',    grade:'9th',  school:'Burleson Centennial High School', phone:'(817)555-0133', email:'jaxon.k@email.com',   parentName:'Scott Kelley',       parentPhone:'(817)555-0134', parentEmail:'scott.kelley@email.com',      program:'YoungLife',  leaderId:'l4', notes:'New to area, moved from Alvarado. Good connection already.', tags:['new','interested'],             dateAdded:'2025-08-15' },
  { id:'s20', firstName:'Sierra',   lastName:'Fleming',   grade:'12th', school:'Burleson Centennial High School', phone:'(817)555-0135', email:'sierra.f@email.com',  parentName:'Brenda Fleming',     parentPhone:'(817)555-0136', parentEmail:'brenda.f@email.com',          program:'YoungLife',  leaderId:'l4', notes:'Senior heading to Tarleton. Great leader potential.',      tags:['campaigners','leadership','camp'],dateAdded:'2022-09-10' },

  // ── ALVARADO HIGH SCHOOL (9th, 11th — YoungLife) ────────────────────────
  { id:'s21', firstName:'Tyler',    lastName:'Benson',    grade:'9th',  school:'Alvarado High School',            phone:'(817)555-0137', email:'tyler.b@email.com',   parentName:'Keith Benson',       parentPhone:'(817)555-0138', parentEmail:'keith.benson@email.com',      program:'YoungLife',  leaderId:'l4', notes:'Plays basketball. Friend of Cole Ingram at Burleson.',    tags:['new'],                            dateAdded:'2025-10-01' },
  { id:'s22', firstName:'Autumn',   lastName:'Graves',    grade:'11th', school:'Alvarado High School',            phone:'(817)555-0139', email:'autumn.g@email.com',  parentName:'Donna Graves',       parentPhone:'(817)555-0140', parentEmail:'donna.graves@email.com',      program:'YoungLife',  leaderId:'l4', notes:'Consistent attender. Asks about faith a lot. Follow up.',  tags:['interested','follow-up'],         dateAdded:'2024-01-15' },

  // ── JOSHUA HIGH SCHOOL (10th, 12th — YoungLife) ──────────────────────────
  { id:'s23', firstName:'Wyatt',    lastName:'Norris',    grade:'10th', school:'Joshua High School',              phone:'(817)555-0141', email:'wyatt.n@email.com',   parentName:'Terri Norris',       parentPhone:'(817)555-0142', parentEmail:'terri.norris@email.com',      program:'YoungLife',  leaderId:'l4', notes:'Quiet at first but great one-on-one. Needs mentoring.',   tags:['interested','follow-up'],         dateAdded:'2024-10-01' },
  { id:'s24', firstName:'Brooke',   lastName:'Holt',      grade:'12th', school:'Joshua High School',              phone:'(817)555-0143', email:'brooke.h@email.com',  parentName:'Gary Holt',          parentPhone:'(817)555-0144', parentEmail:'gary.holt@email.com',         program:'YoungLife',  leaderId:'l4', notes:'Senior. Was at camp 3 summers. Wants to volunteer.',       tags:['camp','leadership','campaigners'],dateAdded:'2022-08-20' },

  // ── GODLEY HIGH SCHOOL (9th, 10th — YoungLife) ──────────────────────────
  { id:'s25', firstName:'Brady',    lastName:'Stanton',   grade:'9th',  school:'Godley High School',              phone:'(817)555-0145', email:'brady.s@email.com',   parentName:'Mark Stanton',       parentPhone:'(817)555-0146', parentEmail:'mark.stanton@email.com',      program:'YoungLife',  leaderId:'l2', notes:'Long drive to club. Shows up every single week.',          tags:['interested'],                     dateAdded:'2025-09-01' },
  { id:'s26', firstName:'Jordyn',   lastName:'Prater',    grade:'10th', school:'Godley High School',              phone:'(817)555-0147', email:'jordyn.p@email.com',  parentName:'Sue Prater',         parentPhone:'(817)555-0148', parentEmail:'sue.prater@email.com',        program:'YoungLife',  leaderId:'l2', notes:'Brings her little sister (Godley Middle). Family connected.', tags:['interested','multiplier'],      dateAdded:'2024-09-10' },

  // ── GRANDVIEW HIGH SCHOOL (11th, 12th — YoungLife) ──────────────────────
  { id:'s27', firstName:'Zach',     lastName:'Pennington', grade:'11th', school:'Grandview High School',          phone:'(817)555-0149', email:'zach.p@email.com',    parentName:'Don Pennington',     parentPhone:'(817)555-0150', parentEmail:'don.penn@email.com',           program:'YoungLife',  leaderId:'l2', notes:'Ropes in his whole friend group. Natural leader.',         tags:['campaigners','multiplier','leadership'], dateAdded:'2023-09-05' },
  { id:'s28', firstName:'Chloe',    lastName:'Hubbard',   grade:'12th', school:'Grandview High School',           phone:'(817)555-0151', email:'chloe.h@email.com',   parentName:'Janet Hubbard',      parentPhone:'(817)555-0152', parentEmail:'janet.hubbard@email.com',     program:'YoungLife',  leaderId:'l2', notes:'Senior. Went to Windy Gap. Applying to be a work crew.', tags:['camp','leadership','campaigners'],dateAdded:'2022-09-01' },

  // ── VENUS HIGH SCHOOL (9th, 11th — YoungLife) ────────────────────────────
  { id:'s29', firstName:'Levi',     lastName:'Barton',    grade:'9th',  school:'Venus High School',               phone:'(817)555-0153', email:'levi.b@email.com',    parentName:'Mike Barton',        parentPhone:'(817)555-0154', parentEmail:'mike.barton@email.com',       program:'YoungLife',  leaderId:'l4', notes:'First-time at club last month. Seems curious.',            tags:['new'],                            dateAdded:'2025-10-01' },
  { id:'s30', firstName:'Nadia',    lastName:'Castillo',  grade:'11th', school:'Venus High School',               phone:'(817)555-0155', email:'nadia.c@email.com',   parentName:'Elena Castillo',     parentPhone:'(817)555-0156', parentEmail:'elena.c@email.com',           program:'YoungLife',  leaderId:'l4', notes:'Campaigners regular. Very vocal in Bible study.',          tags:['campaigners','interested'],       dateAdded:'2023-09-10' },

  // ── RIO VISTA HIGH SCHOOL (10th, 12th — YoungLife) ──────────────────────
  { id:'s31', firstName:'Callie',   lastName:'Durham',    grade:'10th', school:'Rio Vista High School',           phone:'(817)555-0157', email:'callie.d@email.com',  parentName:'Beth Durham',        parentPhone:'(817)555-0158', parentEmail:'beth.durham@email.com',       program:'YoungLife',  leaderId:'l4', notes:'Met at a FCA meeting. Super interested in Young Life.',    tags:['new','interested'],               dateAdded:'2025-09-15' },
  { id:'s32', firstName:'Austin',   lastName:'Mercer',    grade:'12th', school:'Rio Vista High School',           phone:'(817)555-0159', email:'austin.m@email.com',  parentName:'Dale Mercer',        parentPhone:'(817)555-0160', parentEmail:'dale.mercer@email.com',       program:'YoungLife',  leaderId:'l4', notes:'Senior. Long-time Campaigners member. Great testimony.',  tags:['campaigners','camp','leadership'],dateAdded:'2022-08-15' },

  // ── HILLSBORO HIGH SCHOOL (9th, 11th — YoungLife) ───────────────────────
  { id:'s33', firstName:'Rylee',    lastName:'Watts',     grade:'9th',  school:'Hillsboro High School',           phone:'(817)555-0161', email:'rylee.w@email.com',   parentName:'Nancy Watts',        parentPhone:'(817)555-0162', parentEmail:'nancy.watts@email.com',       program:'YoungLife',  leaderId:'l2', notes:'Freshman. Friend invited her. First time last week.',     tags:['new'],                            dateAdded:'2025-10-10' },
  { id:'s34', firstName:'Micah',    lastName:'Langley',   grade:'11th', school:'Hillsboro High School',           phone:'(817)555-0163', email:'micah.l@email.com',   parentName:'Steve Langley',      parentPhone:'(817)555-0164', parentEmail:'steve.langley@email.com',     program:'YoungLife',  leaderId:'l2', notes:'Hillsboro club is small but Micah\'s been key to growth.', tags:['campaigners','multiplier','leadership'], dateAdded:'2023-09-01' },
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
