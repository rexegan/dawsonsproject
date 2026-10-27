import { useState, useEffect } from 'react'
import {
  initialStudents, initialLeaders, initialEvents,
  initialAttendance, initialFollowUps, SCHOOLS,
} from '../data/initialData'

const initialOrg = {
  areaName: 'Johnson County Young Life',
  areaDirector: 'Theresa Boydston',
  region: 'North Texas',
  website: 'www.younglife.org',
  phone: '(817) 555-0100',
  email: 'johnsoncountytx@younglife.org',
}

const initialPrograms = [
  { id: 'p1', name: 'YoungLife', grade: 'High School (9th–12th)', active: true, description: 'Weekly club nights for high schoolers' },
  { id: 'p2', name: 'WyldLife', grade: 'Middle School (6th–8th)', active: true, description: 'Weekly club for middle schoolers' },
  { id: 'p3', name: 'Campaigners', grade: 'All Students', active: true, description: 'Weekly Bible study' },
  { id: 'p4', name: 'Summer Camp', grade: 'All Students', active: true, description: 'Malibu Club (HS) · Crooked Creek Ranch (MS)' },
]

// ── Finance seed data ──────────────────────────────────────────────
const initialFundraisers = [
  { id:'fr1', name:'Clay Shoot', type:'event', date:'2025-10-11', goal:25000, raised:18500, status:'active', notes:'Annual clay shoot at Cleburne Gun Club. Sponsorships open.', contacts:[] },
  { id:'fr2', name:'Golf Tournament', type:'event', date:'2026-09-25', goal:30000, raised:0, status:'active', notes:'Annual golf tournament at Cleburne Golf Links. September 25, 2026. Tee time 7:30am. Sponsorships and foursomes available.', contacts:[] },
  { id:'fr3', name:'Fall Banquet', type:'event', date:'2025-11-08', goal:20000, raised:5200, status:'active', notes:'Annual fundraising dinner. Tables available.', contacts:[] },
  { id:'fr4', name:'Spring Banquet', type:'event', date:'2026-03-14', goal:20000, raised:0, status:'planning', notes:'Save the date set. Venue TBD.', contacts:[] },
]

const initialDonors = [
  { id:'d1', name:'First Baptist Cleburne', type:'church', phone:'(817)555-0301', email:'office@fbcleburne.org', monthlyAmt:500, totalGiven:6000, lastGift:'2025-08-01', notes:'Monthly supporter since 2022.', status:'active' },
  { id:'d2', name:'Rick & Cindy Dawson', type:'individual', phone:'(817)555-0302', email:'rdawson@email.com', monthlyAmt:250, totalGiven:3000, lastGift:'2025-08-01', notes:'Board members.', status:'active' },
  { id:'d3', name:'Johnson County Community Foundation', type:'foundation', phone:'(817)555-0310', email:'grants@jccf.org', monthlyAmt:0, totalGiven:10000, lastGift:'2025-01-15', notes:'Annual grant. Next cycle Feb 2026.', status:'active' },
  { id:'d4', name:'Burleson Area Chamber', type:'business', phone:'(817)555-0320', email:'info@burlesonchamber.com', monthlyAmt:0, totalGiven:2500, lastGift:'2024-10-01', notes:'Golf tournament sponsor.', status:'active' },
]

const initialGrants = [
  { id:'g1', name:'Johnson County Community Foundation', amount:10000, deadline:'2026-02-15', status:'planning', notes:'Annual general operating grant. Application opens Dec.', submitted:'', awarded:'' },
  { id:'g2', name:'Tarrant Area Food Bank Youth Fund', amount:5000, deadline:'2025-09-30', status:'submitted', notes:'Youth programming grant.', submitted:'2025-08-10', awarded:'' },
  { id:'g3', name:'Young Life National Ministry Fund', amount:8000, deadline:'2025-07-01', status:'awarded', notes:'National matching grant for new area directors.', submitted:'2025-05-15', awarded:'2025-07-20' },
]

const initialCommitteeMeetings = [
  { id:'cm1', title:'Committee Meeting', date:'2026-09-09', time:'6:30 PM', location:'First Baptist Cleburne — Room 201', notes:'Monthly committee. Agenda: Clay Shoot debrief, Fall Banquet planning, budget review.' },
  { id:'cm2', title:'Committee Meeting', date:'2026-10-07', time:'6:30 PM', location:'First Baptist Cleburne — Room 201', notes:'Monthly committee. Agenda: Fall Banquet final prep, camp scholarship fund.' },
  { id:'cm3', title:'Committee Meeting', date:'2026-11-04', time:'6:30 PM', location:'First Baptist Cleburne — Room 201', notes:'Monthly committee. Agenda: Fall Banquet debrief, year-end giving push.' },
  { id:'cm4', title:'Committee Meeting', date:'2026-12-02', time:'6:30 PM', location:'First Baptist Cleburne — Room 201', notes:'Year-end committee. Agenda: Budget review, 2027 planning, holiday outreach.' },
  { id:'cm5', title:'Committee Meeting', date:'2027-01-06', time:'6:30 PM', location:'First Baptist Cleburne — Room 201', notes:'New year kickoff. Agenda: 2027 goals, Golf Tournament planning begins.' },
]

const initialFinanceFollowUps = [
  { id:'ff1', donorId:'d1', type:'call', date:'2025-08-20', note:'Thank you call for August gift. Discuss Fall Banquet table.', completed:false },
  { id:'ff2', donorId:'d3', type:'email', date:'2025-09-01', note:'Send impact report ahead of next grant cycle.', completed:false },
  { id:'ff3', donorId:'d2', type:'meeting', date:'2025-09-15', note:'Board member quarterly check-in.', completed:true },
]

const initialSchools = [
  'Cleburne High School', 'Cleburne Middle School', 'Burleson High School',
  'Burleson Centennial High School', 'Kerr Middle School', 'Hughes Middle School', 'Alvarado High School',
  'Alvarado Middle School', 'Joshua High School', 'Loflin Middle School', 'Nichols Middle School',
  'Godley High School', 'Godley Middle School', 'Grandview High School',
  'Venus High School', 'Rio Vista High School', 'Hillsboro High School',
]

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch { return fallback }
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

const GRADE_BUMP_UP = { '6th':'7th', '7th':'8th', '8th':'9th', '9th':'10th', '10th':'11th', '11th':'12th', '12th':'Alumni' }
function withGradeBumpOnce(list) {
  const flagKey = 'yl_grade_bump_v1'
  try { if (localStorage.getItem(flagKey)) return list } catch {}
  const next = list.map(s => GRADE_BUMP_UP[s.grade] ? { ...s, grade: GRADE_BUMP_UP[s.grade] } : s)
  try { localStorage.setItem(flagKey, '1') } catch {}
  return next
}

const GRAD_YEAR_FROM_GRADE = { 'Alumni':2026, '6th':2033, '7th':2032, '8th':2031, '9th':2030, '10th':2029, '11th':2028, '12th':2027 }
function withGradYear(list) {
  return list.map(s => {
    const correct = GRAD_YEAR_FROM_GRADE[s.grade]
    if (correct && Number(s.gradYear) !== correct) return { ...s, gradYear: correct }
    if (!s.gradYear) return { ...s, gradYear: correct || '' }
    return s
  })
}

const MS_GRADES_SET = new Set(['6th', '7th', '8th'])
function withProgramByGrade(list) {
  return list.map(s => {
    if (!s.grade) return s
    const shouldBeYoungLife = !MS_GRADES_SET.has(s.grade) && s.grade !== 'Alumni'
    if (shouldBeYoungLife && s.program !== 'YoungLife') return { ...s, program: 'YoungLife' }
    if (!shouldBeYoungLife && s.grade !== 'Alumni' && s.program !== 'WyldLife') return { ...s, program: 'WyldLife' }
    return s
  })
}

const IMPORTED_ROSTER_ID_PATTERN = /^wl(8[3-9]|9[0-9]|1[01][0-9])$/
function withImportedRoster(list) {
  const existingIds = new Set(list.map(s => s.id))
  const missing = initialStudents.filter(s => IMPORTED_ROSTER_ID_PATTERN.test(s.id) && !existingIds.has(s.id))
  if (!missing.length) return list
  return [...list, ...missing]
}

function withBrinleyBurnsGreen(list) {
  return list.map(l => {
    const name = `${l.firstName || ''} ${l.lastName || ''}`.trim().toLowerCase()
    if ((name === 'brinley burns' || name === 'brindley burns') && l.color !== '#3AAB35') {
      return { ...l, color: '#3AAB35' }
    }
    return l
  })
}

function withShellyRandle(list) {
  const hasHer = list.some(l => `${l.firstName || ''} ${l.lastName || ''}`.trim().toLowerCase() === 'shelly randle')
  if (hasHer) return list
  return [...list, { id:'l5', firstName:'Shelly', lastName:'Randle', role:'Adult Helper', program:'WyldLife', phone:'(254) 723-6955', email:'shellyrandle6@gmail.com', bio:'Adult helper supporting WyldLife clubs in Burleson.', schools:['Kerr Middle School'], initials:'SR', color:'#3AAB35' }]
}

function withKZSabolchick(list) {
  const hasHer = list.some(l => `${l.firstName || ''} ${l.lastName || ''}`.trim().toLowerCase() === 'kz sabolchick')
  if (hasHer) return list
  return [...list, { id:'l6', firstName:'KZ', lastName:'Sabolchick', role:'WyldLife Leader', program:'WyldLife', phone:'(936) 514-2234', email:'kzsabolchick@icloud.com', bio:'WyldLife leader serving Johnson County middle schoolers.', schools:['Loflin Middle School','Nichols Middle School'], initials:'KZ', color:'#3AAB35' }]
}

function withReedClements(list) {
  const hasHim = list.some(l => `${l.firstName || ''} ${l.lastName || ''}`.trim().toLowerCase() === 'reed clements')
  if (hasHim) return list
  return [...list, { id:'l7', firstName:'Reed', lastName:'Clements', role:'WyldLife Leader', program:'WyldLife', phone:'(682) 458-8329', email:'reedlclements@icloud.com', bio:'WyldLife leader serving Johnson County middle schoolers.', schools:['Loflin Middle School','Nichols Middle School'], initials:'RC', color:'#3AAB35' }]
}

function withAlyMerino(list) {
  const hasHer = list.some(l => `${l.firstName || ''} ${l.lastName || ''}`.trim().toLowerCase() === 'aly merino')
  if (hasHer) return list
  return [...list, { id:'l8', firstName:'Aly', lastName:'Merino', role:'WyldLife Leader', program:'WyldLife', phone:'(817) 805-2470', email:'merinoaly08@gmail.com', bio:'WyldLife leader serving Johnson County middle schoolers.', schools:['Loflin Middle School','Nichols Middle School'], initials:'AM', color:'#3AAB35' }]
}

const PROGRAM_COLOR = { YoungLife:'#1B4FA3', WyldLife:'#3AAB35' }
const ALLOWED_LEADER_COLORS = ['#1B4FA3', '#3AAB35', '#854883']
function withProgramColors(list) {
  return list.map(l => {
    if (PROGRAM_COLOR[l.program] && l.color !== PROGRAM_COLOR[l.program]) return { ...l, color: PROGRAM_COLOR[l.program] }
    if (!ALLOWED_LEADER_COLORS.includes(l.color)) return { ...l, color: '#1B4FA3' }
    return l
  })
}

const SCHOOL_RENAMES = {
  'Joshua Middle School': ['Loflin Middle School', 'Nichols Middle School'],
  'Burleson Middle School': ['Kerr Middle School', 'Hughes Middle School'],
}
function fixSchoolNames(list) {
  const fixed = []
  for (const s of list) {
    if (SCHOOL_RENAMES[s]) fixed.push(...SCHOOL_RENAMES[s])
    else fixed.push(s)
  }
  return [...new Set(fixed)]
}
function withCorrectedLeaderSchools(list) {
  return list.map(l => {
    if (!l.schools || !l.schools.some(s => SCHOOL_RENAMES[s])) return l
    return { ...l, schools: fixSchoolNames(l.schools) }
  })
}
function withCorrectedSchoolList(list) {
  return fixSchoolNames(list)
}

function withoutCityClubNights(list) {
  return list.filter(e => !(e.type === 'club' && /Cleburne|Burleson/.test(e.title || '')))
}

const CLUB_ADDRESS = '102 North Main Street, Joshua, TX 76058'
function withClubAddress(list) {
  return list.map(e => (e.type === 'club' && (e.title === 'YoungLife Club' || e.title === 'WyldLife Club') && e.location !== CLUB_ADDRESS)
    ? { ...e, location: CLUB_ADDRESS }
    : e)
}

const CLUB_SERIES_ID_PATTERN = /^e(1[2-9]|[2-3][0-9])$/
function withOngoingClubNights(list) {
  const authoritative = initialEvents.filter(e => CLUB_SERIES_ID_PATTERN.test(e.id))
  const authoritativeById = new Map(authoritative.map(e => [e.id, e]))
  const kept = list.filter(e => !CLUB_SERIES_ID_PATTERN.test(e.id))
  const changed = list.length !== kept.length || authoritative.some(e => {
    const existing = list.find(x => x.id === e.id)
    return !existing || existing.date !== e.date || existing.time !== e.time || existing.location !== e.location
  })
  if (!changed) return list
  return [...kept, ...authoritative]
}

const RETIRED_EVENT_IDS = new Set(['e1', 'e2', 'e3', 'e4', 'e7', 'e9', 'e10'])
function withoutRetiredEvents(list) {
  return list.filter(e => !RETIRED_EVENT_IDS.has(e.id))
}

const PROGRAM_EVENT_TIME = { YoungLife: '19:02', WyldLife: '17:02' }
function withProgramEventTimes(list) {
  return list.map(e => PROGRAM_EVENT_TIME[e.program] && e.time !== PROGRAM_EVENT_TIME[e.program]
    ? { ...e, time: PROGRAM_EVENT_TIME[e.program] }
    : e)
}

export function useStore() {
  const [students, setStudents] = useState(() => withProgramByGrade(withGradYear(withImportedRoster(withGradeBumpOnce(load('yl_students', initialStudents))))))
  const [leaders, setLeaders] = useState(() => withCorrectedLeaderSchools(withProgramColors(withAlyMerino(withReedClements(withKZSabolchick(withShellyRandle(withBrinleyBurnsGreen(load('yl_leaders', initialLeaders)))))))))
  const [events, setEvents] = useState(() => withProgramEventTimes(withClubAddress(withOngoingClubNights(withoutCityClubNights(withoutRetiredEvents(load('yl_events', initialEvents)))))))
  const [attendance, setAttendance] = useState(() => load('yl_attendance', initialAttendance))
  const [followUps, setFollowUps] = useState(() => load('yl_followUps', initialFollowUps))
  const [notifications, setNotifications] = useState(() => load('yl_notifications', []))
  const [org, setOrg] = useState(() => load('yl_org', initialOrg))
  const [programs, setPrograms] = useState(() => load('yl_programs', initialPrograms))
  const [schools, setSchools] = useState(() => withCorrectedSchoolList(load('yl_schools', initialSchools)))
  const [fundraisers, setFundraisers] = useState(() => load('yl_fundraisers', initialFundraisers))
  const [donors, setDonors] = useState(() => load('yl_donors', initialDonors))
  const [grants, setGrants] = useState(() => load('yl_grants', initialGrants))
  const [financeFollowUps, setFinanceFollowUps] = useState(() => load('yl_financeFollowUps', initialFinanceFollowUps))
  const [committeeMeetings, setCommitteeMeetings] = useState(() => load('yl_committeeMeetings', initialCommitteeMeetings))

  useEffect(() => { save('yl_students', students) }, [students])
  useEffect(() => { save('yl_leaders', leaders) }, [leaders])
  useEffect(() => { save('yl_events', events) }, [events])
  useEffect(() => { save('yl_attendance', attendance) }, [attendance])
  useEffect(() => { save('yl_followUps', followUps) }, [followUps])
  useEffect(() => { save('yl_notifications', notifications) }, [notifications])
  useEffect(() => { save('yl_org', org) }, [org])
  useEffect(() => { save('yl_programs', programs) }, [programs])
  useEffect(() => { save('yl_schools', schools) }, [schools])
  useEffect(() => { save('yl_fundraisers', fundraisers) }, [fundraisers])
  useEffect(() => { save('yl_donors', donors) }, [donors])
  useEffect(() => { save('yl_grants', grants) }, [grants])
  useEffect(() => { save('yl_financeFollowUps', financeFollowUps) }, [financeFollowUps])
  useEffect(() => { save('yl_committeeMeetings', committeeMeetings) }, [committeeMeetings])

  // Students
  const addStudent = (s) => setStudents(p => [...p, { ...s, id: 's' + uid(), dateAdded: new Date().toISOString().slice(0,10) }])
  const updateStudent = (id, patch) => setStudents(p => p.map(s => s.id === id ? { ...s, ...patch } : s))
  const deleteStudent = (id) => setStudents(p => p.filter(s => s.id !== id))

  // Leaders
  const addLeader = (l) => setLeaders(p => [...p, { ...l, id: 'l' + uid() }])
  const updateLeader = (id, patch) => setLeaders(p => p.map(l => l.id === id ? { ...l, ...patch } : l))
  const deleteLeader = (id) => setLeaders(p => p.filter(l => l.id !== id))

  // Events
  const addEvent = (e) => setEvents(p => [...p, { ...e, id: 'e' + uid() }])
  const updateEvent = (id, patch) => setEvents(p => p.map(e => e.id === id ? { ...e, ...patch } : e))
  const deleteEvent = (id) => setEvents(p => p.filter(e => e.id !== id))

  // Attendance
  const saveAttendance = (eventId, records) => {
    setAttendance(p => {
      const filtered = p.filter(a => a.eventId !== eventId)
      const newRecords = records.map(r => ({ ...r, id: 'a' + uid() }))
      return [...filtered, ...newRecords]
    })
  }
  const getEventAttendance = (eventId) => attendance.filter(a => a.eventId === eventId)
  const getStudentAttendance = (studentId) => attendance.filter(a => a.studentId === studentId)

  // Follow-ups
  const addFollowUp = (f) => {
    const newF = { ...f, id: 'f' + uid() }
    setFollowUps(p => [newF, ...p])
    return newF
  }
  const updateFollowUp = (id, patch) => setFollowUps(p => p.map(f => f.id === id ? { ...f, ...patch } : f))
  const deleteFollowUp = (id) => setFollowUps(p => p.filter(f => f.id !== id))
  const getStudentFollowUps = (studentId) => followUps.filter(f => f.studentId === studentId)

  // Notifications
  const addNotification = (msg, type = 'success') => {
    const n = { id: uid(), msg, type, ts: Date.now() }
    setNotifications(p => [n, ...p.slice(0, 49)])
    return n.id
  }

  // Org
  const updateOrg = (patch) => setOrg(p => ({ ...p, ...patch }))

  // Programs
  const addProgram = (prog) => setPrograms(p => [...p, { ...prog, id: 'p' + uid(), active: true }])
  const updateProgram = (id, patch) => setPrograms(p => p.map(x => x.id === id ? { ...x, ...patch } : x))
  const deleteProgram = (id) => setPrograms(p => p.filter(x => x.id !== id))

  // Schools
  const addSchool = (name) => setSchools(p => [...p, name])
  const deleteSchool = (name) => setSchools(p => p.filter(s => s !== name))
  const reorderSchools = (list) => setSchools(list)

  // Fundraisers
  const addFundraiser = (f) => setFundraisers(p => [...p, { ...f, id: 'fr' + uid(), contacts: [] }])
  const updateFundraiser = (id, patch) => setFundraisers(p => p.map(x => x.id === id ? { ...x, ...patch } : x))
  const deleteFundraiser = (id) => setFundraisers(p => p.filter(x => x.id !== id))

  // Donors
  const addDonor = (d) => setDonors(p => [...p, { ...d, id: 'd' + uid(), totalGiven: d.totalGiven || 0 }])
  const updateDonor = (id, patch) => setDonors(p => p.map(x => x.id === id ? { ...x, ...patch } : x))
  const deleteDonor = (id) => setDonors(p => p.filter(x => x.id !== id))

  // Grants
  const addGrant = (g) => setGrants(p => [...p, { ...g, id: 'g' + uid() }])
  const updateGrant = (id, patch) => setGrants(p => p.map(x => x.id === id ? { ...x, ...patch } : x))
  const deleteGrant = (id) => setGrants(p => p.filter(x => x.id !== id))

  // Finance Follow-ups
  const addFinanceFollowUp = (f) => setFinanceFollowUps(p => [{ ...f, id: 'ff' + uid(), completed: false }, ...p])
  const updateFinanceFollowUp = (id, patch) => setFinanceFollowUps(p => p.map(x => x.id === id ? { ...x, ...patch } : x))
  const deleteFinanceFollowUp = (id) => setFinanceFollowUps(p => p.filter(x => x.id !== id))

  // Reset to seed data
  const resetData = () => {
    setStudents(initialStudents)
    setLeaders(initialLeaders)
    setEvents(initialEvents)
    setAttendance(initialAttendance)
    setFollowUps(initialFollowUps)
    setOrg(initialOrg)
    setPrograms(initialPrograms)
    setSchools(initialSchools)
    setFundraisers(initialFundraisers)
    setDonors(initialDonors)
    setGrants(initialGrants)
    setFinanceFollowUps(initialFinanceFollowUps)
    setCommitteeMeetings(initialCommitteeMeetings)
  }

  return {
    students, leaders, events, attendance, followUps, notifications,
    org, programs, schools,
    addStudent, updateStudent, deleteStudent,
    addLeader, updateLeader, deleteLeader,
    addEvent, updateEvent, deleteEvent,
    saveAttendance, getEventAttendance, getStudentAttendance,
    addFollowUp, updateFollowUp, deleteFollowUp, getStudentFollowUps,
    addNotification, resetData,
    updateOrg, addProgram, updateProgram, deleteProgram,
    addSchool, deleteSchool, reorderSchools,
    fundraisers, donors, grants, financeFollowUps,
    addFundraiser, updateFundraiser, deleteFundraiser,
    addDonor, updateDonor, deleteDonor,
    addGrant, updateGrant, deleteGrant,
    addFinanceFollowUp, updateFinanceFollowUp, deleteFinanceFollowUp,
    committeeMeetings, setCommitteeMeetings,
  }
}
