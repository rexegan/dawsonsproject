import './Dashboard.css'

export default function Dashboard({ store, setPage }) {
  const { students, events, followUps, attendance } = store

  const today = new Date().toISOString().slice(0,10)
  const upcoming = events
    .filter(e => e.date >= today)
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

  return (
    <div className="dashboard">
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card stat-card--blue">
          <div className="stat-icon">👥</div>
          <div className="stat-val">{students.length}</div>
          <div className="stat-label">Total Students</div>
          <div className="stat-sub">{wyldlife} MS · {younglife} HS</div>
        </div>
        <div className="stat-card stat-card--green">
          <div className="stat-icon">📋</div>
          <div className="stat-val">{pendingFollowUps.length}</div>
          <div className="stat-label">Pending Follow-ups</div>
          <div className="stat-sub">Need attention</div>
        </div>
        <div className="stat-card stat-card--amber">
          <div className="stat-icon">📅</div>
          <div className="stat-val">{upcoming.length}</div>
          <div className="stat-label">Upcoming Events</div>
          <div className="stat-sub">Next 30 days</div>
        </div>
        <div className="stat-card stat-card--purple">
          <div className="stat-icon">✅</div>
          <div className="stat-val">{thisWeekAttendance}</div>
          <div className="stat-label">Roll Call</div>
          <div className="stat-sub">Total logged</div>
        </div>
      </div>

      <div className="dash-cols">
        {/* Upcoming Events */}
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

        {/* Pending Follow-ups */}
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

      {/* Quick Actions */}
      <div className="dash-card">
        <h3 className="dash-card-title-plain">Quick Actions</h3>
        <div className="quick-actions">
          <button className="qa-btn" onClick={() => setPage('students')}>
            <span>➕</span> Add Student
          </button>
          <button className="qa-btn" onClick={() => setPage('attendance')}>
            <span>📋</span> Take Roll Call
          </button>
          <button className="qa-btn" onClick={() => setPage('followup')}>
            <span>💬</span> Log Follow-up
          </button>
          <button className="qa-btn" onClick={() => setPage('events')}>
            <span>📅</span> Add Event
          </button>
          <button className="qa-btn" onClick={() => setPage('reports')}>
            <span>📊</span> View Reports
          </button>
          <button className="qa-btn" onClick={() => setPage('leaders')}>
            <span>🛡️</span> Manage Leaders
          </button>
        </div>
      </div>

      {/* Recent Activity */}
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
    </div>
  )
}
