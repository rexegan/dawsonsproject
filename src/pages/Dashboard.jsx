import { useState } from 'react'
import './Dashboard.css'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function getBirthdayISO(s) {
  return s.birthday || (s.notes && (s.notes.match(/DOB (\d{4}-\d{2}-\d{2})/)||[])[1]) || ''
}

export default function Dashboard({ store, setPage }) {
  const { students, events, followUps, attendance, fundraisers, committeeMeetings } = store
  const [tab, setTab] = useState('overview')

  const today = new Date()
  const todayStr = today.toISOString().slice(0,10)

  const upcoming = events
    .filter(e => e.date >= todayStr)
    .sort((a,b) => a.date.localeCompare(b.date))
    .slice(0,4)

  const pendingFollowUps = followUps.filter(f => !f.completed)
  const thisWeekAttendance = attendance.length
  const wyldlife = students.filter(s => s.program === 'WyldLife').length
  const younglife = students.filter(s => s.program === 'YoungLife').length
  const recentFollowUps = [...followUps].sort((a,b) => b.date.localeCompare(a.date)).slice(0,5)

  const TYPE_COLOR = { club:'#1B4FA3', campaigners:'#3AAB35', camp:'#F3C546', special:'#854883' }
  const TYPE_EMOJI = { club:'🎉', campaigners:'📖', camp:'⛺', special:'⭐' }

  function fmtDate(d) {
    const dt = new Date(d + 'T00:00:00')
    return dt.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})
  }

  // ── Deep Dive data ─────────────────────────────────────────────────────────

  // Birthdays in next 30 days
  const upcomingBirthdays = (() => {
    const result = []
    const now = new Date()
    students.forEach(s => {
      const raw = getBirthdayISO(s)
      if (!raw) return
      const [y, m, d] = raw.split('-').map(Number)
      if (!m || !d) return
      // Check this year and next year
      ;[now.getFullYear(), now.getFullYear() + 1].forEach(yr => {
        const bday = new Date(yr, m - 1, d)
        const diff = Math.ceil((bday - now) / 86400000)
        if (diff >= 0 && diff <= 30) {
          result.push({ student: s, date: bday, diff, month: m, day: d, year: y })
        }
      })
    })
    return result.sort((a, b) => a.date - b.date)
  })()

  // Upcoming events (next 30 days)
  const thirtyDaysOut = new Date(today); thirtyDaysOut.setDate(thirtyDaysOut.getDate() + 30)
  const thirtyStr = thirtyDaysOut.toISOString().slice(0,10)
  const upcomingEvents = events.filter(e => e.date >= todayStr && e.date <= thirtyStr).sort((a,b) => a.date.localeCompare(b.date))

  // Budget snapshot — active fundraisers
  const activeFundraisers = (fundraisers || []).filter(f => f.status === 'active' || f.status === 'planning')
  const totalGoal = activeFundraisers.reduce((s,f) => s + (Number(f.goal)||0), 0)
  const totalRaised = activeFundraisers.reduce((s,f) => s + (Number(f.raised)||0), 0)
  const pct = totalGoal ? Math.min(100, Math.round(totalRaised / totalGoal * 100)) : 0

  // Committee meetings upcoming
  const upcomingCommittee = (committeeMeetings || []).filter(m => m.date >= todayStr).sort((a,b) => a.date.localeCompare(b.date))

  const fmt$ = (n) => '$' + Number(n||0).toLocaleString()

  return (
    <div className="dashboard">
      {/* Stats row */}
      <div className="stats-grid">
        <button className="stat-card stat-card--blue stat-card--clickable" onClick={() => setPage('students')}>
          <div className="stat-icon">👥</div>
          <div className="stat-val">{students.length}</div>
          <div className="stat-label">Total Students</div>
          <div className="stat-sub">{wyldlife} MS · {younglife} HS</div>
        </button>
        <button className="stat-card stat-card--green stat-card--clickable" onClick={() => setPage('followup')}>
          <div className="stat-icon">📋</div>
          <div className="stat-val">{pendingFollowUps.length}</div>
          <div className="stat-label">Pending Follow-ups</div>
          <div className="stat-sub">Need attention</div>
        </button>
        <button className="stat-card stat-card--amber stat-card--clickable" onClick={() => setPage('events')}>
          <div className="stat-icon">📅</div>
          <div className="stat-val">{upcoming.length}</div>
          <div className="stat-label">Upcoming Events</div>
          <div className="stat-sub">Next 30 days</div>
        </button>
        <button className="stat-card stat-card--purple stat-card--clickable" onClick={() => setPage('attendance')}>
          <div className="stat-icon">✅</div>
          <div className="stat-val">{thisWeekAttendance}</div>
          <div className="stat-label">Roll Call</div>
          <div className="stat-sub">Total logged</div>
        </button>
      </div>

      {/* Tab bar */}
      <div className="dash-tabs">
        <button className={`dash-tab ${tab==='overview'?'dash-tab--active':''}`} onClick={()=>setTab('overview')}>Overview</button>
        <button className={`dash-tab dash-tab--green ${tab==='deepdive'?'dash-tab--active dash-tab--green-active':''}`} onClick={()=>setTab('deepdive')}>🔍 Deep Dive</button>
      </div>

      {/* OVERVIEW TAB */}
      {tab === 'overview' && (
        <>
          <div className="dash-cols">
            <div className="dash-card">
              <div className="dash-card-header">
                <h3>Upcoming Events</h3>
                <button className="link-btn" onClick={() => setPage('events')}>View all →</button>
              </div>
              {upcoming.length === 0 && <p className="empty-msg">No upcoming events</p>}
              {upcoming.map(e => (
                <div className="dash-event" key={e.id}>
                  <div className="dash-event-dot" style={{background: TYPE_COLOR[e.type] || '#999'}} />
                  <div className="dash-event-body">
                    <div className="dash-event-title">{TYPE_EMOJI[e.type]} {e.title}</div>
                    <div className="dash-event-meta">{fmtDate(e.date)} · {e.time} · {e.location}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="dash-card">
              <div className="dash-card-header">
                <h3>Needs Follow-up</h3>
                <button className="link-btn" onClick={() => setPage('followup')}>View all →</button>
              </div>
              {pendingFollowUps.length === 0 && <p className="empty-msg">All caught up! 🎉</p>}
              {pendingFollowUps.slice(0,5).map(f => {
                const student = store.students.find(s => s.id === f.studentId)
                if (!student) return null
                return (
                  <div className="dash-followup" key={f.id}>
                    <div className="dash-fu-avatar" style={{background: f.type === 'call' ? '#1B4FA3' : f.type === 'email' ? '#3AAB35' : '#854883'}}>
                      {f.type === 'call' ? '📞' : f.type === 'email' ? '✉️' : '💬'}
                    </div>
                    <div>
                      <div className="dash-fu-name">{student.firstName} {student.lastName}</div>
                      <div className="dash-fu-note">{f.note.slice(0,60)}{f.note.length>60?'…':''}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="dash-card">
            <h3 className="dash-card-title-plain">Quick Actions</h3>
            <div className="quick-actions">
              <button className="qa-btn" onClick={() => setPage('students')}><span>➕</span> Add Student</button>
              <button className="qa-btn" onClick={() => setPage('attendance')}><span>📋</span> Take Roll Call</button>
              <button className="qa-btn" onClick={() => setPage('followup')}><span>💬</span> Log Follow-up</button>
              <button className="qa-btn" onClick={() => setPage('events')}><span>📅</span> Add Event</button>
              <button className="qa-btn" onClick={() => setPage('reports')}><span>📊</span> View Reports</button>
              <button className="qa-btn" onClick={() => setPage('leaders')}><span>🛡️</span> Manage Leaders</button>
            </div>
          </div>

          <div className="dash-card">
            <div className="dash-card-header">
              <h3>Recent Follow-up Activity</h3>
              <button className="link-btn" onClick={() => setPage('followup')}>See all →</button>
            </div>
            {recentFollowUps.map(f => {
              const student = store.students.find(s => s.id === f.studentId)
              const leader = store.leaders.find(l => l.id === f.leaderId)
              if (!student) return null
              return (
                <div className="activity-row" key={f.id}>
                  <span className={`activity-type activity-type--${f.type}`}>
                    {f.type === 'call' ? '📞' : f.type === 'email' ? '✉️' : f.type === 'text' ? '💬' : '🤝'}
                  </span>
                  <div className="activity-body">
                    <span className="activity-name">{student.firstName} {student.lastName}</span>
                    <span className="activity-note"> — {f.note.slice(0,80)}{f.note.length>80?'…':''}</span>
                  </div>
                  <div className="activity-meta">
                    <span>{f.date}</span>
                    {f.completed && <span className="badge-done">Done</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* DEEP DIVE TAB */}
      {tab === 'deepdive' && (
        <div className="deepdive-grid">

          {/* Birthdays next 30 days */}
          <div className="dash-card">
            <div className="dash-card-header">
              <h3>🎂 Birthdays — Next 30 Days</h3>
              <span style={{fontSize:12,color:'var(--gray-500)'}}>{upcomingBirthdays.length} upcoming</span>
            </div>
            {upcomingBirthdays.length === 0 && <p className="empty-msg">No birthdays in the next 30 days</p>}
            {upcomingBirthdays.map(({ student: s, diff, month, day, year }) => (
              <div key={s.id} className="dd-row">
                <div className="dd-avatar" style={{background: s.program === 'WyldLife' ? '#3AAB35' : '#1B4FA3'}}>
                  {s.firstName[0]}{s.lastName[0]}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:14}}>{s.firstName} {s.lastName}</div>
                  <div style={{fontSize:12,color:'var(--gray-500)'}}>{MONTHS[month-1]} {day}, {year} · {s.program} · {s.school}</div>
                </div>
                <div style={{textAlign:'right',flexShrink:0}}>
                  <div style={{fontWeight:800,fontSize:13,color: diff===0?'#dc2626': diff<=3?'#d97706':'#1B4FA3'}}>
                    {diff === 0 ? '🎉 Today!' : diff === 1 ? 'Tomorrow' : `${diff} days`}
                  </div>
                  <div style={{fontSize:11,color:'var(--gray-400)'}}>{MONTHS_SHORT[month-1]} {day}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Events next 30 days */}
          <div className="dash-card">
            <div className="dash-card-header">
              <h3>📅 Events — Next 30 Days</h3>
              <button className="link-btn" onClick={() => setPage('events')}>View all →</button>
            </div>
            {upcomingEvents.length === 0 && <p className="empty-msg">No events in the next 30 days</p>}
            {upcomingEvents.map(e => (
              <div key={e.id} className="dd-row">
                <div className="dd-event-dot" style={{background: TYPE_COLOR[e.type]||'#999'}} />
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:14}}>{TYPE_EMOJI[e.type]} {e.title}</div>
                  <div style={{fontSize:12,color:'var(--gray-500)'}}>{fmtDate(e.date)} · {e.time}</div>
                  {e.location && <div style={{fontSize:11,color:'var(--gray-400)'}}>{e.location}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Budget snapshot */}
          <div className="dash-card">
            <div className="dash-card-header">
              <h3>💰 Current Budget</h3>
              <button className="link-btn" onClick={() => setPage('finances')}>View finances →</button>
            </div>
            <div style={{marginBottom:16}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:6}}>
                <span style={{fontWeight:700,fontSize:22,color:'#1B4FA3'}}>{fmt$(totalRaised)}</span>
                <span style={{fontSize:13,color:'var(--gray-500)'}}>of {fmt$(totalGoal)} goal</span>
              </div>
              <div style={{background:'var(--gray-100)',borderRadius:999,height:10,overflow:'hidden'}}>
                <div style={{background:'linear-gradient(90deg,#3AAB35,#1B4FA3)',height:'100%',width:pct+'%',borderRadius:999,transition:'width .4s'}} />
              </div>
              <div style={{fontSize:12,color:'var(--gray-500)',marginTop:4}}>{pct}% of annual fundraising goal raised</div>
            </div>
            {activeFundraisers.map(f => {
              const fp = f.goal ? Math.min(100, Math.round(Number(f.raised)/Number(f.goal)*100)) : 0
              return (
                <div key={f.id} className="dd-row" style={{alignItems:'center'}}>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:13}}>{f.name}</div>
                    <div style={{fontSize:11,color:'var(--gray-500)'}}>{fmt$(f.raised)} raised of {fmt$(f.goal)}</div>
                  </div>
                  <div style={{width:80,textAlign:'right'}}>
                    <div style={{fontWeight:800,fontSize:13,color: fp>=75?'#3AAB35': fp>=40?'#d97706':'#dc2626'}}>{fp}%</div>
                    <div style={{background:'var(--gray-100)',borderRadius:999,height:5,marginTop:3,overflow:'hidden'}}>
                      <div style={{background: fp>=75?'#3AAB35': fp>=40?'#F3C546':'#1B4FA3',height:'100%',width:fp+'%',borderRadius:999}} />
                    </div>
                  </div>
                </div>
              )
            })}
            {activeFundraisers.length === 0 && <p className="empty-msg">No active fundraisers</p>}
          </div>

          {/* Committee meetings */}
          <div className="dash-card">
            <div className="dash-card-header">
              <h3>🤝 Committee Meetings</h3>
              <span style={{fontSize:12,color:'var(--gray-500)'}}>{upcomingCommittee.length} upcoming</span>
            </div>
            {upcomingCommittee.length === 0 && <p className="empty-msg">No upcoming committee meetings</p>}
            {upcomingCommittee.map(m => (
              <div key={m.id} className="dd-row">
                <div className="dd-cm-dot" />
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:14}}>{m.title}</div>
                  <div style={{fontSize:12,color:'var(--gray-500)'}}>{fmtDate(m.date)} · {m.time}</div>
                  <div style={{fontSize:12,color:'var(--gray-600)'}}>{m.location}</div>
                  {m.notes && <div style={{fontSize:11,color:'var(--gray-400)',marginTop:2,fontStyle:'italic'}}>{m.notes}</div>}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  )
}
