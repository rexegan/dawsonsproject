import { useState } from 'react'
import './CheckIn.css'

const TYPE_COLOR  = { club:'#1B4FA3', campaigners:'#3AAB35', camp:'#d97706', special:'#854883' }
const TYPE_EMOJI  = { club:'🎉', campaigners:'📖', camp:'⛺', special:'⭐' }
const TYPE_BG     = {
  club:        'linear-gradient(135deg,#1B4FA3 0%,#153e85 100%)',
  campaigners: 'linear-gradient(135deg,#3AAB35 0%,#2d8a29 100%)',
  camp:        'linear-gradient(135deg,#d97706 0%,#b45309 100%)',
  special:     'linear-gradient(135deg,#854883 0%,#6b3870 100%)',
}

function fmtDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  return `${months[m-1]} ${d}, ${y}`
}

function fmtShort(iso) {
  if (!iso) return ''
  const [,m,d] = iso.split('-').map(Number)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[m-1]} ${d}`
}

export default function CheckIn({ store }) {
  const { events, students, saveAttendance, getEventAttendance, addNotification } = store
  const [activeEvent, setActiveEvent] = useState(null)
  const [records, setRecords]         = useState({})
  const [saved, setSaved]             = useState(false)
  const [search, setSearch]           = useState('')
  const [filter, setFilter]           = useState('all') // all | unmarked | present | absent
  const [tab, setTab]                 = useState('upcoming') // upcoming | past

  const today = new Date().toISOString().slice(0,10)

  const upcoming = [...events]
    .filter(e => e.date >= today)
    .sort((a,b) => a.date.localeCompare(b.date))

  const past = [...events]
    .filter(e => e.date < today)
    .sort((a,b) => b.date.localeCompare(a.date))

  function openEvent(ev) {
    setActiveEvent(ev)
    setSaved(false)
    setSearch('')
    setFilter('all')
    const eligible = students.filter(s => ev.program === 'Both' || s.program === ev.program)
    const existing = getEventAttendance(ev.id)
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

  function markAll(present) {
    setRecords(r => {
      const next = {}
      Object.keys(r).forEach(id => { next[id] = { ...r[id], present } })
      return next
    })
    setSaved(false)
  }

  function handleSave() {
    if (!activeEvent) return
    const recs = Object.entries(records).map(([studentId, val]) => ({
      eventId: activeEvent.id,
      studentId,
      present: val.present ?? false,
      notes: val.notes || '',
    }))
    saveAttendance(activeEvent.id, recs)
    setSaved(true)
    addNotification('Check-in saved!')
  }

  const eligible = activeEvent
    ? students
        .filter(s => activeEvent.program === 'Both' || s.program === activeEvent.program)
        .sort((a,b) => a.lastName.localeCompare(b.lastName))
    : []

  const filtered = eligible.filter(s => {
    const rec = records[s.id] || { present: null }
    const matchSearch = search === '' ||
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      (s.school||'').toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      filter === 'all' ? true :
      filter === 'present' ? rec.present === true :
      filter === 'absent' ? rec.present === false :
      filter === 'unmarked' ? rec.present === null : true
    return matchSearch && matchFilter
  })

  const presentCount  = Object.values(records).filter(r => r.present === true).length
  const absentCount   = Object.values(records).filter(r => r.present === false).length
  const unmarkedCount = Object.values(records).filter(r => r.present === null).length

  // — Event card grid —
  if (!activeEvent) {
    const list = tab === 'upcoming' ? upcoming : past
    return (
      <div className="checkin-page">
        <div className="checkin-top-bar">
          <div className="checkin-tabs">
            <button className={`checkin-tab ${tab==='upcoming'?'checkin-tab--active':''}`} onClick={()=>setTab('upcoming')}>
              Upcoming Events
            </button>
            <button className={`checkin-tab ${tab==='past'?'checkin-tab--active':''}`} onClick={()=>setTab('past')}>
              Past Events
            </button>
          </div>
          <div className="checkin-count">{list.length} events</div>
        </div>

        {list.length === 0 && (
          <div className="checkin-empty">
            <div style={{fontSize:48,marginBottom:12}}>📅</div>
            <div style={{fontWeight:700,fontSize:16,color:'var(--gray-700)'}}>No {tab} events</div>
          </div>
        )}

        <div className="checkin-grid">
          {list.map(ev => {
            const att = getEventAttendance(ev.id)
            const checkedIn = att.filter(a => a.present).length
            const total = students.filter(s => ev.program === 'Both' || s.program === ev.program).length
            const hasData = att.length > 0
            return (
              <button
                key={ev.id}
                className="checkin-card"
                onClick={() => openEvent(ev)}
              >
                <div className="checkin-card-art" style={{background: TYPE_BG[ev.type] || TYPE_BG.club}}>
                  <div className="checkin-card-emoji">{TYPE_EMOJI[ev.type] || '📅'}</div>
                  <div className="checkin-card-type-badge">{ev.type}</div>
                  {hasData && (
                    <div className="checkin-card-status-badge">
                      ✓ {checkedIn}/{total}
                    </div>
                  )}
                </div>
                <div className="checkin-card-body">
                  <div className="checkin-card-title">{ev.title}</div>
                  <div className="checkin-card-date">{fmtDate(ev.date)}</div>
                  <div className="checkin-card-meta">
                    {ev.time && <span>🕐 {ev.time}</span>}
                    {ev.location && <span>📍 {ev.location}</span>}
                  </div>
                  <div className="checkin-card-prog" style={{color: ev.program==='WyldLife'?'#3AAB35':'#1B4FA3'}}>
                    {ev.program === 'Both' ? 'All Students' : ev.program}
                  </div>
                  <div className="checkin-card-action">
                    {hasData ? 'View / Update Check-in →' : 'Start Check-in →'}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // — Check-in roster for selected event —
  return (
    <div className="checkin-page">
      {/* Header bar */}
      <div className="checkin-roster-header" style={{background: TYPE_BG[activeEvent.type] || TYPE_BG.club}}>
        <button className="checkin-back-btn" onClick={() => setActiveEvent(null)}>← Back</button>
        <div className="checkin-roster-info">
          <div className="checkin-roster-emoji">{TYPE_EMOJI[activeEvent.type]}</div>
          <div>
            <div className="checkin-roster-title">{activeEvent.title}</div>
            <div className="checkin-roster-meta">{fmtDate(activeEvent.date)} · {activeEvent.time} · {activeEvent.location}</div>
          </div>
        </div>
        <div className="checkin-counts">
          <div className="checkin-count-pill checkin-count-pill--present">✓ {presentCount}</div>
          <div className="checkin-count-pill checkin-count-pill--absent">✗ {absentCount}</div>
          {unmarkedCount > 0 && <div className="checkin-count-pill checkin-count-pill--unmarked">? {unmarkedCount}</div>}
        </div>
      </div>

      {/* Controls */}
      <div className="checkin-controls">
        <input
          className="checkin-search"
          placeholder="Search students…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="checkin-filter-pills">
          {['all','unmarked','present','absent'].map(f => (
            <button
              key={f}
              className={`checkin-filter-pill ${filter===f?'checkin-filter-pill--active':''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? `All (${eligible.length})` :
               f === 'present' ? `✓ Present (${presentCount})` :
               f === 'absent' ? `✗ Absent (${absentCount})` :
               `? Unmarked (${unmarkedCount})`}
            </button>
          ))}
        </div>
        <div className="checkin-bulk">
          <button className="bulk-mark bulk-mark--present" onClick={() => markAll(true)}>Mark All Present</button>
          <button className="bulk-mark bulk-mark--absent" onClick={() => markAll(false)}>Mark All Absent</button>
        </div>
      </div>

      {/* Student roster */}
      <div className="checkin-roster">
        {filtered.length === 0 && (
          <div className="checkin-empty" style={{padding:'40px 0'}}>No students match</div>
        )}
        {filtered.map(s => {
          const rec = records[s.id] || { present: null, notes: '' }
          const state = rec.present === true ? 'present' : rec.present === false ? 'absent' : 'unmarked'
          return (
            <div key={s.id} className={`checkin-student checkin-student--${state}`}>
              <div className="checkin-student-left">
                <div
                  className="checkin-avatar"
                  style={{background: s.program==='YoungLife'?'#1B4FA3':'#3AAB35'}}
                >
                  {s.firstName[0]}{s.lastName[0]}
                </div>
                <div>
                  <div className="checkin-student-name">{s.firstName} {s.lastName}</div>
                  <div className="checkin-student-sub">{s.grade} · {s.school}</div>
                </div>
              </div>
              <div className="checkin-student-right">
                <button
                  className={`checkin-btn checkin-btn--present ${state==='present'?'checkin-btn--on':''}`}
                  onClick={() => toggle(s.id, state==='present' ? null : true)}
                  title="Present"
                >✓</button>
                <button
                  className={`checkin-btn checkin-btn--absent ${state==='absent'?'checkin-btn--on':''}`}
                  onClick={() => toggle(s.id, state==='absent' ? null : false)}
                  title="Absent"
                >✗</button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Save footer */}
      <div className="checkin-save-bar">
        {saved && <span className="checkin-saved-msg">✓ Saved!</span>}
        <button className="btn-primary" style={{minWidth:160}} onClick={handleSave}>
          Save Check-in
        </button>
      </div>
    </div>
  )
}
