import { useState, useEffect } from 'react'
import {
  initialStudents, initialLeaders, initialEvents,
  initialAttendance, initialFollowUps,
} from '../data/initialData'

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

export function useStore() {
  const [students, setStudents] = useState(() => load('yl_students', initialStudents))
  const [leaders, setLeaders] = useState(() => load('yl_leaders', initialLeaders))
  const [events, setEvents] = useState(() => load('yl_events', initialEvents))
  const [attendance, setAttendance] = useState(() => load('yl_attendance', initialAttendance))
  const [followUps, setFollowUps] = useState(() => load('yl_followUps', initialFollowUps))
  const [notifications, setNotifications] = useState(() => load('yl_notifications', []))

  useEffect(() => { save('yl_students', students) }, [students])
  useEffect(() => { save('yl_leaders', leaders) }, [leaders])
  useEffect(() => { save('yl_events', events) }, [events])
  useEffect(() => { save('yl_attendance', attendance) }, [attendance])
  useEffect(() => { save('yl_followUps', followUps) }, [followUps])
  useEffect(() => { save('yl_notifications', notifications) }, [notifications])

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

  // Reset to seed data
  const resetData = () => {
    setStudents(initialStudents)
    setLeaders(initialLeaders)
    setEvents(initialEvents)
    setAttendance(initialAttendance)
    setFollowUps(initialFollowUps)
  }

  return {
    students, leaders, events, attendance, followUps, notifications,
    addStudent, updateStudent, deleteStudent,
    addLeader, updateLeader, deleteLeader,
    addEvent, updateEvent, deleteEvent,
    saveAttendance, getEventAttendance, getStudentAttendance,
    addFollowUp, updateFollowUp, deleteFollowUp, getStudentFollowUps,
    addNotification, resetData,
  }
}
