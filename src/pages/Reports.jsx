import './Reports.css'

export default function Reports({ store }) {
  const { students, events, attendance, followUps, leaders } = store

  const wyldlife = students.filter(s => s.program === 'WyldLife')
  const younglife = students.filter(s => s.program === 'YoungLife')

  // Grade distribution
  const gradeCounts = {}
  students.forEach(s => { gradeCounts[s.grade] = (gradeCounts[s.grade]||0)+1 })

  // School distribution
  const schoolCounts = {}
  students.forEach(s => { schoolCounts[s.school] = (schoolCounts[s.school]||0)+1 })
  const topSchools = Object.entries(schoolCounts).sort((a,b)=>b[1]-a[1]).slice(0,8)

  // Attendance rate per event
  const eventsWithAtt = events.map(e => {
    const att = attendance.filter(a => a.eventId === e.id)
    const present = att.filter(a => a.present).length
    return { ...e, total: att.length, present, rate: att.length ? Math.round(present/att.length*100) : null }
  }).filter(e => e.total > 0).sort((a,b) => b.date.localeCompare(a.date)).slice(0,8)

  // Follow-up stats
  const fuByType = { call:0, email:0, text:0, visit:0 }
  followUps.forEach(f => { if (fuByType[f.type]!==undefined) fuByType[f.type]++ })

  // Tag breakdown
  const tagCounts = {}
  students.forEach(s => (s.tags||[]).forEach(t => { tagCounts[t]=(tagCounts[t]||0)+1 }))

  // Leader engagement
  const leaderStats = leaders.map(l => ({
    ...l,
    students: students.filter(s=>s.leaderId===l.id).length,
    followUps: followUps.filter(f=>f.leaderId===l.id).length,
    pending: followUps.filter(f=>f.leaderId===l.id && !f.completed).length,
  }))

  const maxSchool = topSchools[0]?.[1] || 1
  const maxAtt = Math.max(...eventsWithAtt.map(e=>e.present), 1)

  return (
    <div className="reports-page">
      {/* Overview */}
      <div className="report-section">
        <h3 className="report-section-title">📊 Program Overview</h3>
        <div className="overview-cards">
          <div className="ov-card ov-card--blue">
            <div className="ov-num">{younglife.length}</div>
            <div className="ov-lbl">YoungLife (HS)</div>
          </div>
          <div className="ov-card ov-card--green">
            <div className="ov-num">{wyldlife.length}</div>
            <div className="ov-lbl">WyldLife (MS)</div>
          </div>
          <div className="ov-card ov-card--purple">
            <div className="ov-num">{students.filter(s=>(s.tags||[]).includes('campaigners')).length}</div>
            <div className="ov-lbl">Campaigners</div>
          </div>
          <div className="ov-card ov-card--amber">
            <div className="ov-num">{students.filter(s=>(s.tags||[]).includes('camp')).length}</div>
            <div className="ov-lbl">Camp Interest</div>
          </div>
          <div className="ov-card ov-card--red">
            <div className="ov-num">{followUps.filter(f=>!f.completed).length}</div>
            <div className="ov-lbl">Pending Follow-ups</div>
          </div>
          <div className="ov-card">
            <div className="ov-num">{events.length}</div>
            <div className="ov-lbl">Total Events</div>
          </div>
        </div>
      </div>

      <div className="report-cols">
        {/* Grade Distribution */}
        <div className="report-card">
          <h4 className="report-card-title">Grade Distribution</h4>
          {['6th','7th','8th','9th','10th','11th','12th'].map(g => {
            const count = gradeCounts[g] || 0
            const pct = students.length ? Math.round(count/students.length*100) : 0
            const isMS = ['6th','7th','8th'].includes(g)
            return (
              <div key={g} className="bar-row">
                <span className="bar-label">{g}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{width:`${pct}%`, background: isMS ? '#3AAB35' : '#1B4FA3'}} />
                </div>
                <span className="bar-count">{count}</span>
              </div>
            )
          })}
        </div>

        {/* School Distribution */}
        <div className="report-card">
          <h4 className="report-card-title">Top Schools</h4>
          {topSchools.map(([school, count]) => (
            <div key={school} className="bar-row">
              <span className="bar-label bar-label--school">{school}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{width:`${Math.round(count/maxSchool*100)}%`, background:'#854883'}} />
              </div>
              <span className="bar-count">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Chart */}
      {eventsWithAtt.length > 0 && (
        <div className="report-card">
          <h4 className="report-card-title">Recent Event Attendance</h4>
          <div className="att-chart">
            {eventsWithAtt.map(e => (
              <div key={e.id} className="att-chart-col">
                <div className="att-chart-num">{e.present}</div>
                <div className="att-chart-bar-wrap">
                  <div className="att-chart-bar" style={{
                    height:`${Math.round(e.present/maxAtt*100)}%`,
                    background: e.type==='club'?'#1B4FA3':e.type==='campaigners'?'#3AAB35':'#854883'
                  }} />
                </div>
                <div className="att-chart-label">{e.title.slice(0,10)}</div>
                <div className="att-chart-date">{e.date.slice(5)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="report-cols">
        {/* Follow-up Types */}
        <div className="report-card">
          <h4 className="report-card-title">Follow-up Breakdown</h4>
          {Object.entries(fuByType).map(([type, count]) => {
            const icons = {call:'📞',email:'✉️',text:'💬',visit:'🤝'}
            const colors = {call:'#1B4FA3',email:'#3AAB35',text:'#854883',visit:'#d97706'}
            const total = followUps.length || 1
            return (
              <div key={type} className="bar-row">
                <span className="bar-label">{icons[type]} {type}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{width:`${Math.round(count/total*100)}%`, background:colors[type]}} />
                </div>
                <span className="bar-count">{count}</span>
              </div>
            )
          })}
          <div className="bar-row" style={{borderTop:'1px solid var(--gray-100)',paddingTop:8,marginTop:4}}>
            <span className="bar-label" style={{fontWeight:700}}>Completed</span>
            <div className="bar-track">
              <div className="bar-fill" style={{width:`${Math.round(followUps.filter(f=>f.completed).length/Math.max(followUps.length,1)*100)}%`, background:'#15803d'}} />
            </div>
            <span className="bar-count">{followUps.filter(f=>f.completed).length}/{followUps.length}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="report-card">
          <h4 className="report-card-title">Student Tags</h4>
          {Object.entries(tagCounts).sort((a,b)=>b[1]-a[1]).map(([tag, count]) => {
            const TAG_COLORS = {
              interested:'#1B4FA3', campaigners:'#3AAB35', camp:'#d97706',
              leadership:'#854883', multiplier:'#FF837D', new:'#059669', 'follow-up':'#E8392A',
            }
            const c = TAG_COLORS[tag] || '#999'
            return (
              <div key={tag} className="bar-row">
                <span className="bar-label" style={{color:c, fontWeight:600}}>{tag}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{width:`${Math.round(count/students.length*100)}%`, background:c}} />
                </div>
                <span className="bar-count">{count}</span>
              </div>
            )
          })}
          {Object.keys(tagCounts).length === 0 && <p className="empty-msg-sm">No tags assigned yet</p>}
        </div>
      </div>

      {/* Leader Table */}
      <div className="report-card">
        <h4 className="report-card-title">Leader Engagement</h4>
        <div className="leader-table-wrap">
          <table className="leader-report-table">
            <thead>
              <tr>
                <th>Leader</th>
                <th>Role</th>
                <th>Program</th>
                <th>Students</th>
                <th>Follow-ups</th>
                <th>Pending</th>
              </tr>
            </thead>
            <tbody>
              {leaderStats.map(l => (
                <tr key={l.id}>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <div className="leader-avatar-sm" style={{background:l.color}}>{l.initials}</div>
                      {l.firstName} {l.lastName}
                    </div>
                  </td>
                  <td style={{color:'var(--gray-500)'}}>{l.role}</td>
                  <td><span className={`program-pill program-pill--${l.program==='YoungLife'?'yl':l.program==='WyldLife'?'wl':'both'}`}>{l.program}</span></td>
                  <td><strong>{l.students}</strong></td>
                  <td>{l.followUps}</td>
                  <td>
                    {l.pending > 0
                      ? <span style={{color:l.pending>2?'#dc2626':'#d97706',fontWeight:700}}>{l.pending}</span>
                      : <span style={{color:'#15803d',fontWeight:700}}>✓</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
