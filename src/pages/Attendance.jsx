import { useState, useEffect } from 'react'
import { fmtTime } from '../utils/time'
import './Attendance.css'

function fmtDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  return `${months[m - 1]} ${d}, ${y}`
}

export default function Attendance({ store }) {
  const { events, students, saveAttendance, getEventAttendance, addNotification } = store
  const [selectedEvent, setSelectedEvent] = useState('')
  const [records, setRecords] = useState({}) // studentId -> { present, notes }
  const [saved, setSaved] = useState(false)
  const [viewEvent, setViewEvent] = useState('')

  const sortedEvents = [...events].sort((a,b) => b.date.localeCompare(a.date))

  // Auto-select most recent event on mount
  useEffect(() => {
    if (events.length && !selectedEvent) {
      const most = [...events].sort((a,b) => b.date.localeCompare(a.date))[0]
      if (most) {
        loadEvent(most.id)
        setViewEvent(most.id)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function loadEvent(eventId) {
    setSelectedEvent(eventId)
    setSaved(false)
    if (!eventId) { setRecords({}); return }
    const ev = events.find(e => e.id === eventId)
    const program = ev.program
    const eligible = students.filter(s =>
      program === 'Both' || s.program === program
    )
    const existing = getEventAttendance(eventId)
    const init = {}
    eligible.forEach(s => {
      const rec = existing.find(a => a.studentId === s.id)
      init[s.id] = rec ? { present: rec.present, notes: rec.notes } : { present: null, notes: '' }
    })
    setRecords(init)
  }

  function toggle(studentId, present) {
    setRecords(r => ({ ...r, [studentId]: { ...r[studentId], present } }))
    setSaved(false)
  }

  function setNote(studentId, notes) {
    setRecords(r => ({ ...r, [studentId]: { ...r[studentId], notes } }))
  }

  function markAll(present) {
    setRecords(r => {
      const next = {}
      Object.keys(r).forEach(id => { next[id] = { ...r[id], present } })
      return next
    })
    setSaved(false)
  }

  function handleSave() {
    if (!selectedEvent) return
    const recs = Object.entries(records).map(([studentId, val]) => ({
      eventId: selectedEvent,
      studentId,
      present: val.present ?? false,
      notes: val.notes || '',
    }))
    saveAttendance(selectedEvent, recs)
    setSaved(true)
    addNotification('Attendance saved!')
  }

  const ev = events.find(e => e.id === selectedEvent)
  const eligible = ev
    ? students.filter(s => ev.program === 'Both' || s.program === ev.program)
        .sort((a,b) => a.lastName.localeCompare(b.lastName))
    : []

  const presentCount = Object.values(records).filter(r => r.present === true).length
  const absentCount = Object.values(records).filter(r => r.present === false).length
  const unmarkedCount = Object.values(records).filter(r => r.present === null).length

  // History view
  const viewEv = events.find(e => e.id === viewEvent)
  const viewRecords = viewEvent ? getEventAttendance(viewEvent) : []

  return (
    <div className="attendance-page">
      <div className="att-cols">
        {/* Take Attendance */}
        <div className="att-main">
          <div className="att-header-card">
            <h3>Take Roll Call</h3>
            <select
              className="filter-select"
              value={selectedEvent}
              onChange={e => loadEvent(e.target.value)}
            >
              <option value="">— Select an Event —</option>
              {sortedEvents.map(e => (
                <option key={e.id} value={e.id}>
                  {fmtDate(e.date)} · {e.title}
                </option>
              ))}
            </select>
          </div>

          {ev && (
            <>
              <div className="att-event-banner">
                <div>
                  <div className="att-event-title">{ev.title}</div>
                  <div className="att-event-meta">{fmtDate(ev.date)} · {fmtTime(ev.time)} · {ev.location}</div>
                </div>
                <div className="att-counts">
                  <span className="att-count att-count--present">✓ {presentCount}</span>
                  <span className="att-count att-count--absent">✗ {absentCount}</span>
                  {unmarkedCount > 0 && <span className="att-count att-count--unmarked">? {unmarkedCount}</span>}
                </div>
              </div>

              <div className="att-bulk-actions">
                <button className="bulk-btn bulk-btn--present" onClick={() => markAll(true)}>Mark All Present</button>
                <button className="bulk-btn bulk-btn--absent" onClick={() => markAll(false)}>Mark All Absent</button>
              </div>

              <div className="att-list">
                {eligible.map(s => {
                  const rec = records[s.id] || { present: null, notes: '' }
                  return (
                    <div key={s.id} className={`att-row ${rec.present === true ? 'att-row--present' : rec.present === false ? 'att-row--absent' : ''}`}>
                      <div className="att-student">
                        <div className="att-avatar" style={{background: s.program==='YoungLife'?'#1B4FA3':'#3AAB35'}}>
                          {s.firstName[0]}{s.lastName[0]}
                        </div>
                        <div>
                          <div className="att-name">{s.firstName} {s.lastName}</div>
                          <div className="att-school">{s.grade} · {s.school}</div>
                        </div>
                      </div>
                      <div className="att-controls">
                        <input
                          className="att-note-input"
                          placeholder="Note…"
                          value={rec.notes}
                          onChange={e => setNote(s.id, e.target.value)}
                        />
                        <button
                          className={`att-btn att-btn--present ${rec.present === true ? 'att-btn--on' : ''}`}
                          onClick={() => toggle(s.id, true)}
                          title="Present"
                        >✓</button>
                        <button
                          className={`att-btn att-btn--absent ${rec.present === false ? 'att-btn--on' : ''}`}
                          onClick={() => toggle(s.id, false)}
                          title="Absent"
                        >✗</button>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="att-footer">
                {saved && <span className="att-saved">✓ Saved</span>}
                <button className="btn-primary" onClick={handleSave}>
                  Save Attendance
                </button>
              </div>
            </>
          )}

          {!ev && <div className="att-empty">Select an event above to take roll call.</div>}
        </div>

        {/* History */}
        <div className="att-history">
          <h3>Attendance History</h3>
          <select
            className="filter-select"
            value={viewEvent}
            onChange={e => setViewEvent(e.target.value)}
          >
            <option value="">— View Event —</option>
            {sortedEvents.map(e => (
              <option key={e.id} value={e.id}>{fmtDate(e.date)} · {e.title}</option>
            ))}
          </select>

          {viewEv && (
            <>
              <div className="hist-event-info">
                <strong>{viewEv.title}</strong>
                <span>{fmtDate(viewEv.date)}</span>
              </div>
              {viewRecords.length === 0
                ? <p className="empty-msg-sm">No records for this event</p>
                : viewRecords.map(r => {
                    const s = students.find(s => s.id === r.studentId)
                    if (!s) return null
                    return (
                      <div key={r.id} className="hist-row">
                        <span className={r.present ? 'hist-present' : 'hist-absent'}>{r.present ? '✓' : '✗'}</span>
                        <span className="hist-name">{s.firstName} {s.lastName}</span>
                        {r.notes && <span className="hist-note">· {r.notes}</span>}
                      </div>
                    )
                  })
              }
              <div className="hist-summary">
                {viewRecords.filter(r=>r.present).length} present · {viewRecords.filter(r=>!r.present).length} absent
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
