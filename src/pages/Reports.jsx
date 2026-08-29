import { useState } from 'react'
import Modal from '../components/Modal'
import './Reports.css'

const GRADES = ['6th','7th','8th','9th','10th','11th','12th']

export default function Reports({ store, setPage }) {
  const { students, events, attendance, followUps, leaders } = store

  const wyldlife  = students.filter(s => s.program === 'WyldLife')
  const younglife = students.filter(s => s.program === 'YoungLife')

  const gradeCounts = {}
  students.forEach(s => { gradeCounts[s.grade] = (gradeCounts[s.grade]||0)+1 })

  const schoolCounts = {}
  students.forEach(s => { schoolCounts[s.school] = (schoolCounts[s.school]||0)+1 })
  const topSchools = Object.entries(schoolCounts).sort((a,b)=>b[1]-a[1]).slice(0,8)

  const eventsWithAtt = events.map(e => {
    const att = attendance.filter(a => a.eventId === e.id)
    const present = att.filter(a => a.present).length
    return { ...e, total: att.length, present, rate: att.length ? Math.round(present/att.length*100) : null }
  }).filter(e => e.total > 0).sort((a,b) => b.date.localeCompare(a.date)).slice(0,8)

  const fuByType = { call:0, email:0, text:0, visit:0 }
  followUps.forEach(f => { if (fuByType[f.type]!==undefined) fuByType[f.type]++ })

  const tagCounts = {}
  students.forEach(s => (s.tags||[]).forEach(t => { tagCounts[t]=(tagCounts[t]||0)+1 }))

  const leaderStats = leaders.map(l => ({
    ...l,
    students: students.filter(s=>s.leaderId===l.id).length,
    followUps: followUps.filter(f=>f.leaderId===l.id).length,
    pending: followUps.filter(f=>f.leaderId===l.id && !f.completed).length,
  }))

  const maxSchool = topSchools[0]?.[1] || 1
  const maxAtt = Math.max(...eventsWithAtt.map(e=>e.present), 1)

  const [modal, setModal] = useState(null)

  // ── Deep-dive modal content ──────────────────────────────────────────────────

  function ProgramModal() {
    const campaigners = students.filter(s=>(s.tags||[]).includes('campaigners'))
    const campInterest = students.filter(s=>(s.tags||[]).includes('camp'))
    const pending = followUps.filter(f=>!f.completed)
    return (
      <Modal open title="Program Overview — Full Detail" onClose={() => setModal(null)} size="lg">
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div className="rpt-dive-grid">
            {[
              {label:'YoungLife (HS)', val:younglife.length, color:'#1B4FA3', sub: younglife.map(s=>s.grade).filter((v,i,a)=>a.indexOf(v)===i).sort().join(', ')},
              {label:'WyldLife (MS)', val:wyldlife.length, color:'#3AAB35', sub: wyldlife.map(s=>s.grade).filter((v,i,a)=>a.indexOf(v)===i).sort().join(', ')},
              {label:'Campaigners', val:campaigners.length, color:'#854883', sub:'In weekly Bible study'},
              {label:'Camp Interest', val:campInterest.length, color:'#d97706', sub:'Tagged for camp'},
              {label:'Pending Follow-ups', val:pending.length, color:'#dc2626', sub:'Need attention now'},
              {label:'Total Events', val:events.length, color:'#1B4FA3', sub:`${eventsWithAtt.length} with attendance`},
            ].map(c => (
              <div key={c.label} className="rpt-dive-card" style={{borderTop:`4px solid ${c.color}`}}>
                <div className="rpt-dive-num" style={{color:c.color}}>{c.val}</div>
                <div className="rpt-dive-lbl">{c.label}</div>
                <div className="rpt-dive-sub">{c.sub}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="rpt-dive-section-title">YoungLife (High School) Students</div>
            <div className="rpt-student-list">{younglife.map(s=><span key={s.id} className="rpt-student-chip">{s.firstName} {s.lastName} · {s.grade}</span>)}</div>
          </div>
          <div>
            <div className="rpt-dive-section-title">WyldLife (Middle School) Students</div>
            <div className="rpt-student-list">{wyldlife.map(s=><span key={s.id} className="rpt-student-chip rpt-student-chip--green">{s.firstName} {s.lastName} · {s.grade}</span>)}</div>
          </div>
          <div className="modal-actions">
            <button className="btn-secondary" onClick={() => setModal(null)}>Close</button>
            <button className="btn-primary" onClick={() => { setModal(null); setPage('students') }}>Open Students →</button>
          </div>
        </div>
      </Modal>
    )
  }

  function GradeModal() {
    return (
      <Modal open title="Grade Distribution — Full Breakdown" onClose={() => setModal(null)} size="md">
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <div className="rpt-dive-grid" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
            {['MS','HS'].map(lvl => {
              const grades = lvl==='MS'?['6th','7th','8th']:['9th','10th','11th','12th']
              const total = grades.reduce((s,g)=>s+(gradeCounts[g]||0),0)
              return <div key={lvl} className="rpt-dive-card" style={{borderTop:`4px solid ${lvl==='MS'?'#3AAB35':'#1B4FA3'}`}}>
                <div className="rpt-dive-num" style={{color:lvl==='MS'?'#3AAB35':'#1B4FA3'}}>{total}</div>
                <div className="rpt-dive-lbl">{lvl==='MS'?'Middle School':'High School'}</div>
              </div>
            })}
            <div className="rpt-dive-card" style={{borderTop:'4px solid #854883'}}>
              <div className="rpt-dive-num" style={{color:'#854883'}}>{students.length}</div>
              <div className="rpt-dive-lbl">Total Students</div>
            </div>
            <div className="rpt-dive-card" style={{borderTop:'4px solid #d97706'}}>
              <div className="rpt-dive-num" style={{color:'#d97706'}}>{Object.keys(gradeCounts).length}</div>
              <div className="rpt-dive-lbl">Active Grades</div>
            </div>
          </div>
          {GRADES.map(g => {
            const count = gradeCounts[g] || 0
            const isMS = ['6th','7th','8th'].includes(g)
            const color = isMS ? '#3AAB35' : '#1B4FA3'
            const gradeStudents = students.filter(s=>s.grade===g)
            return (
              <div key={g} className="rpt-drill-row">
                <div className="rpt-drill-header">
                  <span className="rpt-drill-label" style={{color}}>{g} Grade</span>
                  <span className="rpt-drill-count" style={{color}}>{count} student{count!==1?'s':''}</span>
                </div>
                <div className="bar-track" style={{marginBottom:4}}>
                  <div className="bar-fill" style={{width:students.length?Math.round(count/students.length*100)+'%':'0%',background:color}} />
                </div>
                <div className="rpt-student-list" style={{marginTop:4}}>
                  {gradeStudents.map(s=><span key={s.id} className="rpt-student-chip" style={{borderColor:color+'44',color}}>{s.firstName} {s.lastName} · {s.school}</span>)}
                </div>
              </div>
            )
          })}
          <div className="modal-actions" style={{marginTop:8}}>
            <button className="btn-primary" onClick={() => setModal(null)}>Close</button>
          </div>
        </div>
      </Modal>
    )
  }

  function SchoolModal() {
    const allSchools = Object.entries(schoolCounts).sort((a,b)=>b[1]-a[1])
    return (
      <Modal open title="School Distribution — Full Breakdown" onClose={() => setModal(null)} size="lg">
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <div className="rpt-dive-grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
            <div className="rpt-dive-card" style={{borderTop:'4px solid #854883'}}>
              <div className="rpt-dive-num" style={{color:'#854883'}}>{allSchools.length}</div>
              <div className="rpt-dive-lbl">Schools Represented</div>
            </div>
            <div className="rpt-dive-card" style={{borderTop:'4px solid #1B4FA3'}}>
              <div className="rpt-dive-num" style={{color:'#1B4FA3'}}>{allSchools[0]?.[0]||'—'}</div>
              <div className="rpt-dive-lbl">Top School</div>
            </div>
            <div className="rpt-dive-card" style={{borderTop:'4px solid #3AAB35'}}>
              <div className="rpt-dive-num" style={{color:'#3AAB35'}}>{students.length}</div>
              <div className="rpt-dive-lbl">Total Students</div>
            </div>
          </div>
          {allSchools.map(([school, count]) => {
            const schoolStudents = students.filter(s=>s.school===school)
            const yl = schoolStudents.filter(s=>s.program==='YoungLife').length
            const wl = schoolStudents.filter(s=>s.program==='WyldLife').length
            return (
              <div key={school} className="rpt-drill-row">
                <div className="rpt-drill-header">
                  <span className="rpt-drill-label">{school}</span>
                  <span className="rpt-drill-count">{count} student{count!==1?'s':''}{yl?' · '+yl+' HS':''}{wl?' · '+wl+' MS':''}</span>
                </div>
                <div className="bar-track" style={{marginBottom:4}}>
                  <div className="bar-fill" style={{width:Math.round(count/maxSchool*100)+'%',background:'#854883'}} />
                </div>
                <div className="rpt-student-list" style={{marginTop:4}}>
                  {schoolStudents.map(s=><span key={s.id} className="rpt-student-chip" style={{borderColor:'#85488344',color:'#854883'}}>{s.firstName} {s.lastName} · {s.grade}</span>)}
                </div>
              </div>
            )
          })}
          <div className="modal-actions" style={{marginTop:8}}>
            <button className="btn-primary" onClick={() => setModal(null)}>Close</button>
          </div>
        </div>
      </Modal>
    )
  }

  function AttendanceModal() {
    const allEvents = events.map(e => {
      const att = attendance.filter(a => a.eventId === e.id)
      const present = att.filter(a => a.present).length
      return { ...e, total: att.length, present, rate: att.length ? Math.round(present/att.length*100) : null, attList: att }
    }).sort((a,b) => b.date.localeCompare(a.date))
    const avgRate = allEvents.filter(e=>e.rate!==null).length ? Math.round(allEvents.filter(e=>e.rate!==null).reduce((s,e)=>s+e.rate,0)/allEvents.filter(e=>e.rate!==null).length) : 0
    const TYPE_COLOR = {club:'#1B4FA3',campaigners:'#3AAB35',camp:'#d97706',special:'#854883'}
    return (
      <Modal open title="Attendance — Full Report" onClose={() => setModal(null)} size="lg">
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <div className="rpt-dive-grid" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
            {[
              {label:'Events Tracked',val:allEvents.filter(e=>e.total>0).length,color:'#1B4FA3'},
              {label:'Total Check-ins',val:attendance.filter(a=>a.present).length,color:'#3AAB35'},
              {label:'Avg Attendance Rate',val:avgRate+'%',color:'#854883'},
              {label:'Total Events',val:events.length,color:'#d97706'},
            ].map(c=><div key={c.label} className="rpt-dive-card" style={{borderTop:`4px solid ${c.color}`}}>
              <div className="rpt-dive-num" style={{color:c.color}}>{c.val}</div>
              <div className="rpt-dive-lbl">{c.label}</div>
            </div>)}
          </div>
          {allEvents.filter(e=>e.total>0).map(e => (
            <div key={e.id} className="rpt-drill-row">
              <div className="rpt-drill-header">
                <span className="rpt-drill-label" style={{color:TYPE_COLOR[e.type]||'#999'}}>{e.title}</span>
                <span className="rpt-drill-count">{e.present}/{e.total} present{e.rate!==null?' ('+e.rate+'%)':''} · {e.date}</span>
              </div>
              <div className="bar-track" style={{marginBottom:4}}>
                <div className="bar-fill" style={{width:e.rate+'%',background:TYPE_COLOR[e.type]||'#999'}} />
              </div>
              <div className="rpt-student-list" style={{marginTop:4}}>
                {e.attList.map(a => {
                  const s = students.find(x=>x.id===a.studentId)
                  return s ? <span key={a.id} className="rpt-student-chip" style={a.present?{}:{opacity:.4,textDecoration:'line-through'}}>{s.firstName} {s.lastName}</span> : null
                })}
              </div>
            </div>
          ))}
          {allEvents.filter(e=>e.total>0).length===0 && <p style={{color:'var(--gray-400)',textAlign:'center',padding:16}}>No attendance recorded yet.</p>}
          <div className="modal-actions" style={{marginTop:8}}>
            <button className="btn-secondary" onClick={() => setModal(null)}>Close</button>
            <button className="btn-primary" onClick={() => { setModal(null); setPage('attendance') }}>Open Roll Call →</button>
          </div>
        </div>
      </Modal>
    )
  }

  function FollowUpModal() {
    const FU_COLORS = {call:'#1B4FA3',email:'#3AAB35',text:'#854883',visit:'#d97706'}
    const FU_ICONS  = {call:'📞',email:'✉️',text:'💬',visit:'🤝'}
    const completed = followUps.filter(f=>f.completed)
    const pending   = followUps.filter(f=>!f.completed)
    return (
      <Modal open title="Follow-up Breakdown — Full Detail" onClose={() => setModal(null)} size="lg">
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <div className="rpt-dive-grid" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
            {[
              {label:'Total Logged',val:followUps.length,color:'#1B4FA3'},
              {label:'Completed',val:completed.length,color:'#3AAB35'},
              {label:'Pending',val:pending.length,color:'#dc2626'},
              {label:'Completion Rate',val:followUps.length?Math.round(completed.length/followUps.length*100)+'%':'—',color:'#854883'},
            ].map(c=><div key={c.label} className="rpt-dive-card" style={{borderTop:`4px solid ${c.color}`}}>
              <div className="rpt-dive-num" style={{color:c.color}}>{c.val}</div>
              <div className="rpt-dive-lbl">{c.label}</div>
            </div>)}
          </div>
          {Object.entries(fuByType).map(([type,count]) => {
            const typeItems = followUps.filter(f=>f.type===type)
            const done = typeItems.filter(f=>f.completed).length
            return (
              <div key={type} className="rpt-drill-row">
                <div className="rpt-drill-header">
                  <span className="rpt-drill-label">{FU_ICONS[type]} {type}</span>
                  <span className="rpt-drill-count">{count} total · {done} done · {count-done} pending</span>
                </div>
                <div className="bar-track" style={{marginBottom:6}}>
                  <div className="bar-fill" style={{width:followUps.length?Math.round(count/followUps.length*100)+'%':'0%',background:FU_COLORS[type]}} />
                </div>
                {typeItems.slice(0,5).map(f => {
                  const s = students.find(x=>x.id===f.studentId)
                  return (
                    <div key={f.id} style={{display:'flex',justifyContent:'space-between',padding:'5px 8px',background:'var(--gray-50)',borderRadius:6,marginBottom:3,fontSize:12}}>
                      <span style={{fontWeight:600}}>{s?s.firstName+' '+s.lastName:'Unknown'}</span>
                      <span style={{color:'var(--gray-500)'}}>{f.date} · {f.completed?'✅ Done':'⏳ Pending'}</span>
                    </div>
                  )
                })}
                {typeItems.length>5 && <div style={{fontSize:11,color:'var(--gray-400)',paddingLeft:8}}>+{typeItems.length-5} more</div>}
              </div>
            )
          })}
          <div className="modal-actions" style={{marginTop:8}}>
            <button className="btn-secondary" onClick={() => setModal(null)}>Close</button>
            <button className="btn-primary" onClick={() => { setModal(null); setPage('followup') }}>Open Follow-ups →</button>
          </div>
        </div>
      </Modal>
    )
  }

  function TagModal() {
    const TAG_COLORS = {interested:'#1B4FA3',campaigners:'#3AAB35',camp:'#d97706',leadership:'#854883',multiplier:'#FF837D',new:'#059669','follow-up':'#dc2626'}
    const sorted = Object.entries(tagCounts).sort((a,b)=>b[1]-a[1])
    return (
      <Modal open title="Student Tags — Full Breakdown" onClose={() => setModal(null)} size="lg">
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {sorted.map(([tag,count]) => {
            const c = TAG_COLORS[tag] || '#999'
            const tagged = students.filter(s=>(s.tags||[]).includes(tag))
            return (
              <div key={tag} className="rpt-drill-row">
                <div className="rpt-drill-header">
                  <span className="rpt-drill-label" style={{color:c}}>{tag}</span>
                  <span className="rpt-drill-count" style={{color:c}}>{count} student{count!==1?'s':''} · {students.length?Math.round(count/students.length*100):0}%</span>
                </div>
                <div className="bar-track" style={{marginBottom:4}}>
                  <div className="bar-fill" style={{width:students.length?Math.round(count/students.length*100)+'%':'0%',background:c}} />
                </div>
                <div className="rpt-student-list" style={{marginTop:4}}>
                  {tagged.map(s=><span key={s.id} className="rpt-student-chip" style={{borderColor:c+'44',color:c}}>{s.firstName} {s.lastName}</span>)}
                </div>
              </div>
            )
          })}
          {sorted.length===0 && <p style={{color:'var(--gray-400)',textAlign:'center',padding:16}}>No tags assigned yet.</p>}
          <div className="modal-actions" style={{marginTop:8}}><button className="btn-primary" onClick={() => setModal(null)}>Close</button></div>
        </div>
      </Modal>
    )
  }

  function LeaderModal() {
    return (
      <Modal open title="Leader Engagement — Full Detail" onClose={() => setModal(null)} size="lg">
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <div className="rpt-dive-grid" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
            {[
              {label:'Total Leaders',val:leaders.length,color:'#1B4FA3'},
              {label:'Total Students',val:students.length,color:'#3AAB35'},
              {label:'Total Follow-ups',val:followUps.length,color:'#854883'},
              {label:'Pending FU',val:followUps.filter(f=>!f.completed).length,color:'#dc2626'},
            ].map(c=><div key={c.label} className="rpt-dive-card" style={{borderTop:`4px solid ${c.color}`}}>
              <div className="rpt-dive-num" style={{color:c.color}}>{c.val}</div>
              <div className="rpt-dive-lbl">{c.label}</div>
            </div>)}
          </div>
          {leaderStats.map(l => {
            const assigned = students.filter(s=>s.leaderId===l.id)
            const lFU = followUps.filter(f=>f.leaderId===l.id)
            return (
              <div key={l.id} className="rpt-drill-row">
                <div className="rpt-drill-header">
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div className="leader-avatar-sm" style={{background:l.color}}>{l.initials}</div>
                    <span className="rpt-drill-label">{l.firstName} {l.lastName}</span>
                    <span style={{fontSize:11,color:'var(--gray-400)'}}>{l.role} · {l.program}</span>
                  </div>
                  <span className="rpt-drill-count">{l.students} students · {l.followUps} FU · {l.pending} pending</span>
                </div>
                <div className="rpt-student-list" style={{marginTop:6}}>
                  {assigned.map(s=><span key={s.id} className="rpt-student-chip">{s.firstName} {s.lastName} · {s.grade}</span>)}
                  {assigned.length===0 && <span style={{fontSize:12,color:'var(--gray-400)'}}>No students assigned</span>}
                </div>
                {lFU.length>0 && (
                  <div style={{marginTop:6}}>
                    <div style={{fontSize:11,fontWeight:700,color:'var(--gray-400)',textTransform:'uppercase',letterSpacing:'.4px',marginBottom:4}}>Recent Follow-ups</div>
                    {lFU.slice(0,3).map(f=>{
                      const s=students.find(x=>x.id===f.studentId)
                      return <div key={f.id} style={{fontSize:12,color:'var(--gray-600)',padding:'3px 0'}}>{f.date} · {f.type} · {s?s.firstName+' '+s.lastName:'?'} · {f.completed?'✅':'⏳'}</div>
                    })}
                  </div>
                )}
              </div>
            )
          })}
          <div className="modal-actions" style={{marginTop:8}}>
            <button className="btn-secondary" onClick={() => setModal(null)}>Close</button>
            <button className="btn-primary" onClick={() => { setModal(null); setPage('leaders') }}>Open Leaders →</button>
          </div>
        </div>
      </Modal>
    )
  }

  return (
    <div className="reports-page">
      <div className="report-section">
        <h3 className="report-section-title">📊 Program Overview <span className="rpt-click-hint">— click any card for details</span></h3>
        <div className="overview-cards">
          {[
            {cls:'ov-card--blue',   num:younglife.length, lbl:'YoungLife (HS)',        modal:'program'},
            {cls:'ov-card--green',  num:wyldlife.length,  lbl:'WyldLife (MS)',         modal:'program'},
            {cls:'ov-card--purple', num:students.filter(s=>(s.tags||[]).includes('campaigners')).length, lbl:'Campaigners', modal:'program'},
            {cls:'ov-card--amber',  num:students.filter(s=>(s.tags||[]).includes('camp')).length,  lbl:'Camp Interest', modal:'program'},
            {cls:'ov-card--red',    num:followUps.filter(f=>!f.completed).length, lbl:'Pending Follow-ups', modal:'followup'},
            {cls:'',                num:events.length, lbl:'Total Events', modal:'attendance'},
          ].map(c => (
            <button key={c.lbl} className={`ov-card ${c.cls} ov-card--clickable`} onClick={() => setModal(c.modal)}>
              <div className="ov-num">{c.num}</div>
              <div className="ov-lbl">{c.lbl}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="report-cols">
        <div className="report-card report-card--clickable" onClick={() => setModal('grade')}>
          <h4 className="report-card-title">Grade Distribution <span className="rpt-click-hint">click to drill down</span></h4>
          {GRADES.map(g => {
            const count = gradeCounts[g]||0
            const pct = students.length ? Math.round(count/students.length*100) : 0
            const isMS = ['6th','7th','8th'].includes(g)
            return (
              <div key={g} className="bar-row">
                <span className="bar-label">{g}</span>
                <div className="bar-track"><div className="bar-fill" style={{width:`${pct}%`,background:isMS?'#3AAB35':'#1B4FA3'}} /></div>
                <span className="bar-count">{count}</span>
              </div>
            )
          })}
        </div>

        <div className="report-card report-card--clickable" onClick={() => setModal('school')}>
          <h4 className="report-card-title">Top Schools <span className="rpt-click-hint">click to drill down</span></h4>
          {topSchools.map(([school,count]) => (
            <div key={school} className="bar-row">
              <span className="bar-label bar-label--school">{school}</span>
              <div className="bar-track"><div className="bar-fill" style={{width:`${Math.round(count/maxSchool*100)}%`,background:'#854883'}} /></div>
              <span className="bar-count">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {eventsWithAtt.length > 0 && (
        <div className="report-card report-card--clickable" onClick={() => setModal('attendance')}>
          <h4 className="report-card-title">Recent Event Attendance <span className="rpt-click-hint">click to drill down</span></h4>
          <div className="att-chart">
            {eventsWithAtt.map(e => (
              <div key={e.id} className="att-chart-col">
                <div className="att-chart-num">{e.present}</div>
                <div className="att-chart-bar-wrap">
                  <div className="att-chart-bar" style={{height:`${Math.round(e.present/maxAtt*100)}%`,background:e.type==='club'?'#1B4FA3':e.type==='campaigners'?'#3AAB35':'#854883'}} />
                </div>
                <div className="att-chart-label">{e.title.slice(0,10)}</div>
                <div className="att-chart-date">{e.date.slice(5)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="report-cols">
        <div className="report-card report-card--clickable" onClick={() => setModal('followup')}>
          <h4 className="report-card-title">Follow-up Breakdown <span className="rpt-click-hint">click to drill down</span></h4>
          {Object.entries(fuByType).map(([type,count]) => {
            const icons={call:'📞',email:'✉️',text:'💬',visit:'🤝'}
            const colors={call:'#1B4FA3',email:'#3AAB35',text:'#854883',visit:'#d97706'}
            return (
              <div key={type} className="bar-row">
                <span className="bar-label">{icons[type]} {type}</span>
                <div className="bar-track"><div className="bar-fill" style={{width:`${Math.round(count/Math.max(followUps.length,1)*100)}%`,background:colors[type]}} /></div>
                <span className="bar-count">{count}</span>
              </div>
            )
          })}
          <div className="bar-row" style={{borderTop:'1px solid var(--gray-100)',paddingTop:8,marginTop:4}}>
            <span className="bar-label" style={{fontWeight:700}}>Completed</span>
            <div className="bar-track"><div className="bar-fill" style={{width:`${Math.round(followUps.filter(f=>f.completed).length/Math.max(followUps.length,1)*100)}%`,background:'#15803d'}} /></div>
            <span className="bar-count">{followUps.filter(f=>f.completed).length}/{followUps.length}</span>
          </div>
        </div>

        <div className="report-card report-card--clickable" onClick={() => setModal('tags')}>
          <h4 className="report-card-title">Student Tags <span className="rpt-click-hint">click to drill down</span></h4>
          {Object.entries(tagCounts).sort((a,b)=>b[1]-a[1]).map(([tag,count]) => {
            const TAG_COLORS={interested:'#1B4FA3',campaigners:'#3AAB35',camp:'#d97706',leadership:'#854883',multiplier:'#FF837D',new:'#059669','follow-up':'#dc2626'}
            const c=TAG_COLORS[tag]||'#999'
            return (
              <div key={tag} className="bar-row">
                <span className="bar-label" style={{color:c,fontWeight:600}}>{tag}</span>
                <div className="bar-track"><div className="bar-fill" style={{width:`${Math.round(count/students.length*100)}%`,background:c}} /></div>
                <span className="bar-count">{count}</span>
              </div>
            )
          })}
          {Object.keys(tagCounts).length===0 && <p className="empty-msg-sm">No tags assigned yet</p>}
        </div>
      </div>

      <div className="report-card report-card--clickable" onClick={() => setModal('leaders')}>
        <h4 className="report-card-title">Leader Engagement <span className="rpt-click-hint">click to drill down</span></h4>
        <div className="leader-table-wrap">
          <table className="leader-report-table">
            <thead><tr><th>Leader</th><th>Role</th><th>Program</th><th>Students</th><th>Follow-ups</th><th>Pending</th></tr></thead>
            <tbody>
              {leaderStats.map(l => (
                <tr key={l.id}>
                  <td><div style={{display:'flex',alignItems:'center',gap:8}}><div className="leader-avatar-sm" style={{background:l.color}}>{l.initials}</div>{l.firstName} {l.lastName}</div></td>
                  <td style={{color:'var(--gray-500)'}}>{l.role}</td>
                  <td><span className={`program-pill program-pill--${l.program==='YoungLife'?'yl':l.program==='WyldLife'?'wl':'both'}`}>{l.program}</span></td>
                  <td><strong>{l.students}</strong></td>
                  <td>{l.followUps}</td>
                  <td>{l.pending>0?<span style={{color:l.pending>2?'#dc2626':'#d97706',fontWeight:700}}>{l.pending}</span>:<span style={{color:'#15803d',fontWeight:700}}>✓</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal === 'program'    && <ProgramModal />}
      {modal === 'grade'      && <GradeModal />}
      {modal === 'school'     && <SchoolModal />}
      {modal === 'attendance' && <AttendanceModal />}
      {modal === 'followup'   && <FollowUpModal />}
      {modal === 'tags'       && <TagModal />}
      {modal === 'leaders'    && <LeaderModal />}
    </div>
  )
}
