import { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import { formatPhone } from '../utils/phone'
import './Events.css'

const TYPE_COLOR = { club:'#1B4FA3', campaigners:'#3AAB35', camp:'#d97706', special:'#854883' }
const TYPE_LABEL = { club:'Club Night', campaigners:'Campaigners', camp:'Camp', special:'Special Event' }
const EMPTY_EVENT = { title:'', type:'club', program:'YoungLife', date:'', time:'19:30', location:'', description:'', leaderId:'' }

const SPONSOR_EVENTS = [
  { id:'golf',    label:'Golf Tournament' },
  { id:'clay',    label:'Clay Shoot' },
  { id:'banquet', label:'Banquet' },
  { id:'garage',  label:'Garage Sale' },
]

const SPONSOR_TIERS = {
  golf:    ['Title Sponsor','Eagle Sponsor','Birdie Sponsor','Hole Sponsor','Individual Player'],
  clay:    ['Platinum Sponsor','Gold Sponsor','Silver Sponsor','Station Sponsor','Individual Shooter'],
  banquet: ['Table Sponsor','Presenting Sponsor','Gold Sponsor','Silver Sponsor','Individual Ticket'],
  garage:  ['Drop-Off Partner','Volunteer Sponsor','Advertising Sponsor','General Donor'],
}

const INITIAL_SPONSORS = {
  golf: [
    { id:'gs1', name:'Cleburne Ford',         contact:'Mike Daniels',    phone:'(817) 641-2200', email:'mike@cleburneford.com',       tier:'Title Sponsor',      amount:5000, paid:true,  notes:'Foursome + banner on 1st tee' },
    { id:'gs2', name:'First National Bank',   contact:'Susan Harmon',    phone:'(817) 641-5500', email:'sharmon@fnbcleburne.com',     tier:'Eagle Sponsor',      amount:2500, paid:true,  notes:'Foursome + hole 9 signage' },
    { id:'gs3', name:'Johnson County CDJR',   contact:'Brad Tillman',    phone:'(817) 556-7200', email:'brad@jccdjr.com',            tier:'Eagle Sponsor',      amount:2500, paid:false, notes:'Invoice sent 8/15 — awaiting payment' },
    { id:'gs4', name:'Burleson Pediatrics',   contact:'Dr. Amy Kessler', phone:'(817) 295-1122', email:'akessler@burlesonpeds.com',  tier:'Birdie Sponsor',     amount:1000, paid:true,  notes:'Hole 4 signage' },
    { id:'gs5', name:'Granbury Stone & Tile', contact:'Carl Owens',      phone:'(817) 573-0044', email:'carl@granburystone.com',     tier:'Birdie Sponsor',     amount:1000, paid:true,  notes:'Hole 12 signage' },
    { id:'gs6', name:'Hilltop Realty Group',  contact:'Pam Fletcher',    phone:'(817) 641-9900', email:'pam@hilltopjc.com',         tier:'Hole Sponsor',       amount:250,  paid:true,  notes:'Hole 17' },
    { id:'gs7', name:'Double J Pest Control', contact:'James Juarez',    phone:'(817) 629-3344', email:'jj@doublejpest.com',        tier:'Hole Sponsor',       amount:250,  paid:false, notes:'Hole 3 — verbal commitment, need check' },
    { id:'gs8', name:'Theresa Boydston',      contact:'Theresa Boydston',phone:'(817) 555-0001', email:'theresa.boydston@yl.org',   tier:'Individual Player',  amount:150,  paid:true,  notes:'Area Director foursome' },
  ],
  clay: [
    { id:'cs1', name:'Lone Star Ag Credit',   contact:'Rick Thurston',   phone:'(817) 556-3300', email:'rthurston@lonestarag.com',   tier:'Platinum Sponsor',   amount:3000, paid:true,  notes:'Station 1 naming rights + banner' },
    { id:'cs2', name:'Atwood Ranch Supply',   contact:'Doug Atwood',     phone:'(817) 641-4400', email:'doug@atwoodranch.com',       tier:'Gold Sponsor',       amount:1500, paid:true,  notes:'Station 4 naming + 2 shooters' },
    { id:'cs3', name:'Cleburne Propane',      contact:'Terry Mayes',     phone:'(817) 641-8800', email:'terry@cleburnegas.com',      tier:'Silver Sponsor',     amount:750,  paid:false, notes:'Follow up — left voicemail 8/20' },
    { id:'cs4', name:'JC Farm Bureau',        contact:'Lori Campbell',   phone:'(817) 556-5500', email:'lcampbell@jcfb.com',        tier:'Station Sponsor',    amount:400,  paid:true,  notes:'Station 6' },
    { id:'cs5', name:'Alvarado Co-Op Gin',    contact:'Roy Simmons',     phone:'(817) 783-5050', email:'rsimmons@alvgin.com',       tier:'Station Sponsor',    amount:400,  paid:true,  notes:'Station 2' },
    { id:'cs6', name:'Godley State Bank',     contact:'Paula Riggs',     phone:'(817) 389-2200', email:'priggs@godleybank.com',     tier:'Individual Shooter', amount:100,  paid:true,  notes:'2 individual shooters' },
  ],
  banquet: [
    { id:'bs1', name:'Cleburne Regional MC',  contact:'CEO Office',      phone:'(817) 641-2500', email:'admin@crmc.com',            tier:'Presenting Sponsor', amount:7500, paid:true,  notes:'Program recognition + table of 8 + stage banner' },
    { id:'bs2', name:'Central Texas Electric',contact:'Phil Garza',      phone:'(817) 645-6100', email:'pgarza@ctec.com',           tier:'Table Sponsor',      amount:500,  paid:true,  notes:'Table 4 — family of Phil' },
    { id:'bs3', name:'Cleburne Glass & Door', contact:'Stan Whitaker',   phone:'(817) 641-3300', email:'stan@cleburne-glass.com',  tier:'Gold Sponsor',       amount:2500, paid:false, notes:'Verbal yes — sending invoice 9/1' },
    { id:'bs4', name:'Burleson Chevrolet',    contact:'Dale Morris',     phone:'(817) 295-7700', email:'dale@burlesonchevy.com',   tier:'Table Sponsor',      amount:500,  paid:true,  notes:'Table 11' },
    { id:'bs5', name:'First Baptist Cleburne',contact:'Pastor Ron Gray', phone:'(817) 641-6000', email:'ron@fbccleburne.org',      tier:'Silver Sponsor',     amount:1000, paid:true,  notes:'Full table + program ad' },
    { id:'bs6', name:'Joshua Family Dentistry',contact:'Dr. Wade Ellis', phone:'(817) 556-2222', email:'wade@joshuadental.com',   tier:'Individual Ticket',  amount:75,   paid:true,  notes:'2 tickets — Wade + wife' },
  ],
  garage: [
    { id:'gg1', name:'Cleburne Storage Plus', contact:'Donna Kim',       phone:'(817) 641-7700', email:'donna@cleburnestorage.com', tier:'Drop-Off Partner',   amount:0,    paid:true,  notes:'Free 10x20 storage unit for donations all summer' },
    { id:'gg2', name:'KFJZ Radio Cleburne',   contact:'Mark Bellamy',    phone:'(817) 641-1450', email:'mbellamy@kfjz.com',        tier:'Advertising Sponsor',amount:500,  paid:true,  notes:'4 radio spots + social media shoutout' },
    { id:'gg3', name:'H-E-B Cleburne',        contact:'Store Director',  phone:'(817) 641-6600', email:'cleburne@heb.com',         tier:'Volunteer Sponsor',  amount:250,  paid:true,  notes:'Donated water + snacks for volunteers' },
    { id:'gg4', name:'Burleson Community Fdn',contact:'Gail Morton',     phone:'(817) 295-4400', email:'gmorton@burlesonfdn.org',  tier:'General Donor',      amount:200,  paid:true,  notes:'Anonymous matching grant — double first $200' },
  ],
}

function fmtDate(d) {
  const dt = new Date(d + 'T00:00:00')
  return dt.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})
}

export default function Events({ store, openEventId }) {
  const { events, leaders, students, getEventAttendance, addEvent, updateEvent, deleteEvent, addNotification } = store
  const [filter, setFilter] = useState('all')
  const [filterType, setFilterType] = useState('All')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY_EVENT)
  const [editId, setEditId] = useState(null)
  const [viewEvent, setViewEvent] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [sponsorEvent, setSponsorEvent] = useState('')        // '' = closed, event id = open
  const [sponsors, setSponsors] = useState(INITIAL_SPONSORS)
  const [editSponsor, setEditSponsor] = useState(null)        // sponsor object being edited
  const [addingSponsor, setAddingSponsor] = useState(false)
  const [sponsorDraft, setSponsorDraft] = useState({name:'',contact:'',phone:'',email:'',tier:'',amount:'',paid:false,notes:''})

  const today = new Date().toISOString().slice(0,10)

  const filtered = [...events]
    .filter(e => {
      if (filter === 'upcoming' && e.date < today) return false
      if (filter === 'past' && e.date >= today) return false
      if (filterType !== 'All' && e.type !== filterType) return false
      return true
    })
    .sort((a,b) => filter === 'past' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date))

  useEffect(() => {
    if (openEventId) {
      const e = events.find(e => e.id === openEventId)
      if (e) openView(e)
    }
  }, [openEventId]) // eslint-disable-line

  function openAdd() { setForm(EMPTY_EVENT); setEditId(null); setModal('form') }
  function openEdit(e) { setForm({...e}); setEditId(e.id); setModal('form') }
  function openView(e) { setViewEvent(e); setModal('view') }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  function handleSave() {
    if (!form.title || !form.date) return
    if (editId) {
      updateEvent(editId, form)
      addNotification('Event updated!')
    } else {
      addEvent(form)
      addNotification('Event added!')
    }
    setModal(null)
  }

  function handleDelete(id) {
    deleteEvent(id)
    setConfirmDelete(null)
    setModal(null)
    addNotification('Event deleted','error')
  }

  return (
    <div className="events-page">
      <div className="page-toolbar">
        <div className="toolbar-left">
          <div className="tab-group">
            {['upcoming','past','all'].map(f => (
              <button key={f} className={`tab-btn ${filter===f?'tab-btn--on':''}`} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>
          <select className="filter-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="All">All Types</option>
            {Object.entries(TYPE_LABEL).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
        <div style={{display:'flex',gap:8}}>
          <select className="filter-select" value={sponsorEvent} onChange={e=>setSponsorEvent(e.target.value)} style={{fontWeight:600}}>
            <option value="">🤝 Event Sponsors</option>
            <option value="all">— All Events —</option>
            {SPONSOR_EVENTS.map(ev=><option key={ev.id} value={ev.id}>{ev.label}</option>)}
          </select>
          <button className="btn-primary" onClick={openAdd}>+ Add Event</button>
        </div>
      </div>

      <div className="events-count">{filtered.length} event{filtered.length!==1?'s':''}</div>

      <div className="events-grid">
        {filtered.map(e => {
          const att = getEventAttendance(e.id)
          const presentCount = att.filter(a=>a.present).length
          const leader = leaders.find(l => l.id === e.leaderId)
          return (
            <div key={e.id} className="event-card" onClick={() => openView(e)}>
              <div className="event-card-top" style={{background: TYPE_COLOR[e.type]}}>
                <div className="event-type-label">{TYPE_LABEL[e.type]}</div>
                <div className="event-card-date">
                  <div className="event-card-month">{new Date(e.date+'T00:00:00').toLocaleDateString('en-US',{month:'short'})}</div>
                  <div className="event-card-day">{new Date(e.date+'T00:00:00').getDate()}</div>
                </div>
              </div>
              <div className="event-card-body">
                <h4 className="event-card-title">{e.title}</h4>
                <div className="event-card-meta">
                  <span>🕐 {e.time}</span>
                  <span>📍 {e.location}</span>
                  {leader && <span>👤 {leader.firstName} {leader.lastName}</span>}
                </div>
                <div className="event-card-footer">
                  <span className={`program-pill program-pill--${e.program==='YoungLife'?'yl':e.program==='WyldLife'?'wl':'both'}`}>
                    {e.program}
                  </span>
                  {att.length > 0 && (
                    <span className="att-pill">✓ {presentCount}/{att.length} attended</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && <div className="empty-table">No events found.</div>}
      </div>

      {/* Add/Edit */}
      {modal === 'form' && (
        <Modal title={editId ? 'Edit Event' : 'Add Event'} onClose={() => setModal(null)} size="md">
          <div className="form-grid">
            <div className="form-group">
              <label>Event Title *</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. YoungLife Club Night" />
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>Type</label>
                <select name="type" value={form.type} onChange={handleChange}>
                  {Object.entries(TYPE_LABEL).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Program</label>
                <select name="program" value={form.program} onChange={handleChange}>
                  <option>YoungLife</option>
                  <option>WyldLife</option>
                  <option>Both</option>
                </select>
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>Date *</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input type="time" name="time" value={form.time} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="Address or venue name" />
            </div>
            <div className="form-group">
              <label>Assigned Leader</label>
              <select name="leaderId" value={form.leaderId} onChange={handleChange}>
                <option value="">— None —</option>
                {leaders.map(l => <option key={l.id} value={l.id}>{l.firstName} {l.lastName}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Details about this event…" />
            </div>
            <div className="modal-actions">
              {editId && <button className="btn-danger" onClick={() => setConfirmDelete({id:editId})}>Delete</button>}
              <button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>{editId?'Save':'Add Event'}</button>
            </div>
          </div>
        </Modal>
      )}

      {/* View */}
      {modal === 'view' && viewEvent && (
        <Modal title="Event Details" onClose={() => setModal(null)} size="md">
          <div className="event-detail">
            <div className="event-detail-banner" style={{background: TYPE_COLOR[viewEvent.type]}}>
              <div className="event-detail-type">{TYPE_LABEL[viewEvent.type]}</div>
              <div className="event-detail-title">{viewEvent.title}</div>
              <div className="event-detail-sub">{fmtDate(viewEvent.date)} · {viewEvent.time}</div>
            </div>
            <div className="event-detail-body">
              <div className="event-detail-row"><span>📍</span>{viewEvent.location}</div>
              <div className="event-detail-row">
                <span>🏷</span>
                <span className={`program-pill program-pill--${viewEvent.program==='YoungLife'?'yl':viewEvent.program==='WyldLife'?'wl':'both'}`}>{viewEvent.program}</span>
              </div>
              {leaders.find(l=>l.id===viewEvent.leaderId) && (
                <div className="event-detail-row"><span>👤</span>{leaders.find(l=>l.id===viewEvent.leaderId)?.firstName} {leaders.find(l=>l.id===viewEvent.leaderId)?.lastName}</div>
              )}
              {viewEvent.description && <p className="event-detail-desc">{viewEvent.description}</p>}

              <div className="event-detail-att">
                <div className="profile-section-title">Attendance</div>
                {(() => {
                  const att = getEventAttendance(viewEvent.id)
                  if (att.length === 0) return <p className="empty-msg-sm">No attendance recorded yet. <button className="link-btn" onClick={() => setModal(null)}>Go to Roll Call →</button></p>
                  return (
                    <div>
                      <div className="att-summary-pill">
                        {att.filter(a=>a.present).length} present · {att.filter(a=>!a.present).length} absent
                      </div>
                      {att.map(a => {
                        const s = students.find(s=>s.id===a.studentId)
                        if (!s) return null
                        return (
                          <div key={a.id} className="att-record">
                            <span className={a.present?'att-present':'att-absent'}>{a.present?'✓':'✗'}</span>
                            <span>{s.firstName} {s.lastName}</span>
                            {a.notes && <span className="att-note">· {a.notes}</span>}
                          </div>
                        )
                      })}
                    </div>
                  )
                })()}
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setModal(null)}>Close</button>
              <button className="btn-primary" onClick={() => openEdit(viewEvent)}>Edit Event</button>
            </div>
          </div>
        </Modal>
      )}

      {confirmDelete && (
        <Modal title="Delete Event" onClose={() => setConfirmDelete(null)} size="sm">
          <p style={{marginBottom:20}}>Delete this event? This also removes its attendance records.</p>
          <div className="modal-actions">
            <button className="btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
            <button className="btn-danger" onClick={() => handleDelete(confirmDelete.id)}>Delete</button>
          </div>
        </Modal>
      )}

      {/* EVENT SPONSORS MODAL */}
      {sponsorEvent && (
        <Modal open title={sponsorEvent === 'all' ? 'All Event Sponsors' : `${SPONSOR_EVENTS.find(e=>e.id===sponsorEvent)?.label} — Sponsors`} onClose={()=>setSponsorEvent('')} size="xl">
          {(() => {
            const eventList = sponsorEvent === 'all' ? SPONSOR_EVENTS : SPONSOR_EVENTS.filter(e=>e.id===sponsorEvent)
            return (
              <div style={{display:'flex',flexDirection:'column',gap:20}}>
                {eventList.map(ev => {
                  const evSponsors = sponsors[ev.id] || []
                  const total = evSponsors.reduce((s,sp)=>s+(Number(sp.amount)||0),0)
                  const paid = evSponsors.filter(sp=>sp.paid).reduce((s,sp)=>s+(Number(sp.amount)||0),0)
                  return (
                    <div key={ev.id}>
                      {sponsorEvent==='all' && <div style={{fontWeight:800,fontSize:16,color:'var(--gray-900)',marginBottom:8,paddingBottom:6,borderBottom:'2px solid #EEF3FB'}}>{ev.label}</div>}
                      <div style={{display:'flex',gap:12,marginBottom:12,flexWrap:'wrap'}}>
                        <div style={{background:'#EEF3FB',borderRadius:8,padding:'8px 14px',fontSize:13}}>
                          <span style={{fontWeight:700,color:'#1B4FA3'}}>{evSponsors.length}</span><span style={{color:'var(--gray-600)'}}> sponsors</span>
                        </div>
                        <div style={{background:'#EDFAEC',borderRadius:8,padding:'8px 14px',fontSize:13}}>
                          <span style={{fontWeight:700,color:'#3AAB35'}}>${paid.toLocaleString()}</span><span style={{color:'var(--gray-600)'}}> collected</span>
                        </div>
                        <div style={{background:'#fef3c7',borderRadius:8,padding:'8px 14px',fontSize:13}}>
                          <span style={{fontWeight:700,color:'#d97706'}}>${(total-paid).toLocaleString()}</span><span style={{color:'var(--gray-600)'}}> outstanding</span>
                        </div>
                        <button className="btn-primary" style={{fontSize:12,padding:'6px 14px',marginLeft:'auto'}} onClick={()=>{ setSponsorDraft({name:'',contact:'',phone:'',email:'',tier:SPONSOR_TIERS[ev.id]?.[0]||'',amount:'',paid:false,notes:''}); setAddingSponsor(ev.id) }}>+ Add Sponsor</button>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',gap:8}}>
                        {evSponsors.length === 0 && <div style={{color:'var(--gray-400)',fontSize:13}}>No sponsors yet.</div>}
                        {evSponsors.map(sp => (
                          <div key={sp.id} style={{background:'white',border:'1px solid var(--gray-100)',borderRadius:10,padding:'12px 14px',display:'flex',alignItems:'center',gap:12,flexWrap:'wrap'}}>
                            <div style={{flex:1,minWidth:160}}>
                              <div style={{fontWeight:700,fontSize:14,color:'var(--gray-900)'}}>{sp.name}</div>
                              <div style={{fontSize:12,color:'var(--gray-500)'}}>{sp.contact}{sp.phone ? ` · ${formatPhone(sp.phone)}` : ''}</div>
                              {sp.notes && <div style={{fontSize:11,color:'var(--gray-400)',fontStyle:'italic',marginTop:2}}>{sp.notes}</div>}
                            </div>
                            <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:4}}>
                              <span style={{background:'#EEF3FB',color:'#1B4FA3',padding:'2px 8px',borderRadius:20,fontSize:11,fontWeight:700}}>{sp.tier}</span>
                              {Number(sp.amount)>0 && <span style={{fontWeight:800,fontSize:14,color:'var(--gray-800)'}}>${Number(sp.amount).toLocaleString()}</span>}
                              <span style={{padding:'2px 8px',borderRadius:20,fontSize:11,fontWeight:700,background:sp.paid?'#EDFAEC':'#fee2e2',color:sp.paid?'#3AAB35':'#dc2626'}}>{sp.paid?'✓ Paid':'⏳ Outstanding'}</span>
                            </div>
                            <button style={{fontSize:11,padding:'4px 10px',border:'1px solid var(--gray-200)',borderRadius:6,background:'white',cursor:'pointer',color:'var(--gray-600)'}} onClick={()=>{ setSponsorDraft({...sp}); setEditSponsor({eventId:ev.id,sponsorId:sp.id}) }}>✏️ Edit</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
                <div className="modal-actions">
                  <button className="btn-secondary" onClick={()=>setSponsorEvent('')}>Close</button>
                </div>
              </div>
            )
          })()}
        </Modal>
      )}

      {/* ADD SPONSOR MODAL */}
      {addingSponsor && (
        <Modal open title={`Add Sponsor — ${SPONSOR_EVENTS.find(e=>e.id===addingSponsor)?.label}`} onClose={()=>setAddingSponsor(false)} size="md">
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[['Organization / Name','name'],['Contact Person','contact'],['Phone','phone'],['Email','email']].map(([label,key])=>(
                <div key={key} style={key==='name'?{gridColumn:'1/-1'}:{}}>
                  <div style={{fontSize:11,fontWeight:700,color:'var(--gray-500)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:3}}>{label}</div>
                  <input className="settings-input" style={{width:'100%',boxSizing:'border-box'}} value={sponsorDraft[key]||''} onChange={e=>setSponsorDraft(d=>({...d,[key]:key==='phone'?formatPhone(e.target.value):e.target.value}))}/>
                </div>
              ))}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:'var(--gray-500)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:3}}>Tier / Level</div>
                <select className="settings-input" value={sponsorDraft.tier} onChange={e=>setSponsorDraft(d=>({...d,tier:e.target.value}))}>
                  {(SPONSOR_TIERS[addingSponsor]||[]).map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:'var(--gray-500)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:3}}>Amount ($)</div>
                <input className="settings-input" type="number" style={{width:'100%',boxSizing:'border-box'}} value={sponsorDraft.amount} onChange={e=>setSponsorDraft(d=>({...d,amount:e.target.value}))}/>
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <input type="checkbox" id="paid-cb" checked={!!sponsorDraft.paid} onChange={e=>setSponsorDraft(d=>({...d,paid:e.target.checked}))} style={{width:16,height:16,cursor:'pointer'}}/>
              <label htmlFor="paid-cb" style={{fontSize:13,fontWeight:600,color:'var(--gray-700)',cursor:'pointer'}}>Payment received</label>
            </div>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:'var(--gray-500)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:3}}>Notes</div>
              <textarea className="settings-input" rows={2} style={{width:'100%',boxSizing:'border-box',resize:'vertical'}} value={sponsorDraft.notes||''} onChange={e=>setSponsorDraft(d=>({...d,notes:e.target.value}))}/>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={()=>setAddingSponsor(false)}>Cancel</button>
              <button className="btn-primary" onClick={()=>{
                if(!sponsorDraft.name.trim()) return
                const newSp = {...sponsorDraft, id:'sp'+Date.now(), amount:Number(sponsorDraft.amount)||0}
                setSponsors(s=>({...s,[addingSponsor]:[...(s[addingSponsor]||[]),newSp]}))
                setAddingSponsor(false)
              }}>Add Sponsor</button>
            </div>
          </div>
        </Modal>
      )}

      {/* EDIT SPONSOR MODAL */}
      {editSponsor && (
        <Modal open title="Edit Sponsor" onClose={()=>setEditSponsor(null)} size="md">
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[['Organization / Name','name'],['Contact Person','contact'],['Phone','phone'],['Email','email']].map(([label,key])=>(
                <div key={key} style={key==='name'?{gridColumn:'1/-1'}:{}}>
                  <div style={{fontSize:11,fontWeight:700,color:'var(--gray-500)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:3}}>{label}</div>
                  <input className="settings-input" style={{width:'100%',boxSizing:'border-box'}} value={sponsorDraft[key]||''} onChange={e=>setSponsorDraft(d=>({...d,[key]:key==='phone'?formatPhone(e.target.value):e.target.value}))}/>
                </div>
              ))}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:'var(--gray-500)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:3}}>Tier / Level</div>
                <select className="settings-input" value={sponsorDraft.tier} onChange={e=>setSponsorDraft(d=>({...d,tier:e.target.value}))}>
                  {(SPONSOR_TIERS[editSponsor.eventId]||[]).map(t=><option key={t}>{t}</option>)}
                  {!(SPONSOR_TIERS[editSponsor.eventId]||[]).includes(sponsorDraft.tier) && <option>{sponsorDraft.tier}</option>}
                </select>
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:'var(--gray-500)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:3}}>Amount ($)</div>
                <input className="settings-input" type="number" style={{width:'100%',boxSizing:'border-box'}} value={sponsorDraft.amount} onChange={e=>setSponsorDraft(d=>({...d,amount:e.target.value}))}/>
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <input type="checkbox" id="edit-paid-cb" checked={!!sponsorDraft.paid} onChange={e=>setSponsorDraft(d=>({...d,paid:e.target.checked}))} style={{width:16,height:16,cursor:'pointer'}}/>
              <label htmlFor="edit-paid-cb" style={{fontSize:13,fontWeight:600,color:'var(--gray-700)',cursor:'pointer'}}>Payment received</label>
            </div>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:'var(--gray-500)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:3}}>Notes</div>
              <textarea className="settings-input" rows={2} style={{width:'100%',boxSizing:'border-box',resize:'vertical'}} value={sponsorDraft.notes||''} onChange={e=>setSponsorDraft(d=>({...d,notes:e.target.value}))}/>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" style={{marginRight:'auto',color:'#dc2626',borderColor:'#fee2e2'}} onClick={()=>{ setSponsors(s=>({...s,[editSponsor.eventId]:s[editSponsor.eventId].filter(sp=>sp.id!==editSponsor.sponsorId)})); setEditSponsor(null) }}>Remove</button>
              <button className="btn-secondary" onClick={()=>setEditSponsor(null)}>Cancel</button>
              <button className="btn-primary" onClick={()=>{
                setSponsors(s=>({...s,[editSponsor.eventId]:s[editSponsor.eventId].map(sp=>sp.id===editSponsor.sponsorId?{...sponsorDraft,amount:Number(sponsorDraft.amount)||0}:sp)}))
                setEditSponsor(null)
              }}>Save Changes</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
