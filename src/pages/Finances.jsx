import { useState } from 'react'
import Modal from '../components/Modal'
import './Finances.css'

const fmt$ = (n) => '$' + Number(n || 0).toLocaleString()
const fmtDate = (d) => { if (!d) return '—'; const dt = new Date(d + 'T00:00:00'); return dt.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) }

const FUNDRAISER_TYPES = ['event','campaign','matching','online','other']
const FUNDRAISER_STATUS = ['planning','active','complete','cancelled']
const DONOR_TYPES = ['individual','church','business','foundation','other']
const GRANT_STATUS = ['planning','submitted','awarded','declined']
const FU_TYPES = ['call','email','text','meeting','letter']

// ── Overview cards ────────────────────────────────────────────────────────────
function OverviewCards({ fundraisers, donors, grants, financeFollowUps }) {
  const totalGoal = fundraisers.reduce((s,f) => s + Number(f.goal||0), 0)
  const totalRaised = fundraisers.reduce((s,f) => s + Number(f.raised||0), 0)
  const monthlyRecurring = donors.filter(d=>d.status==='active').reduce((s,d) => s + Number(d.monthlyAmt||0), 0)
  const totalFromDonors = donors.reduce((s,d) => s + Number(d.totalGiven||0), 0)
  const awardsTotal = grants.filter(g=>g.status==='awarded').reduce((s,g) => s + Number(g.amount||0), 0)
  const pendingFU = financeFollowUps.filter(f=>!f.completed).length

  return (
    <div className="fin-overview">
      <div className="fin-stat fin-stat--blue">
        <div className="fin-stat-icon">🎯</div>
        <div className="fin-stat-val">{fmt$(totalRaised)}</div>
        <div className="fin-stat-label">Raised of {fmt$(totalGoal)} Goal</div>
        <div className="fin-stat-bar"><div style={{width: totalGoal ? Math.min(100,Math.round(totalRaised/totalGoal*100))+'%' : '0%'}} /></div>
      </div>
      <div className="fin-stat fin-stat--green">
        <div className="fin-stat-icon">🔁</div>
        <div className="fin-stat-val">{fmt$(monthlyRecurring)}</div>
        <div className="fin-stat-label">Monthly Recurring</div>
        <div className="fin-stat-sub">{donors.filter(d=>d.status==='active'&&d.monthlyAmt>0).length} monthly donors</div>
      </div>
      <div className="fin-stat fin-stat--amber">
        <div className="fin-stat-icon">🏆</div>
        <div className="fin-stat-val">{fmt$(awardsTotal)}</div>
        <div className="fin-stat-label">Grants Awarded</div>
        <div className="fin-stat-sub">{grants.filter(g=>g.status==='awarded').length} active grants</div>
      </div>
      <div className="fin-stat fin-stat--purple">
        <div className="fin-stat-icon">📞</div>
        <div className="fin-stat-val">{pendingFU}</div>
        <div className="fin-stat-label">Pending Follow-ups</div>
        <div className="fin-stat-sub">Donor outreach needed</div>
      </div>
    </div>
  )
}

// ── Fundraisers tab ───────────────────────────────────────────────────────────
function FundraisersTab({ store }) {
  const { fundraisers, addFundraiser, updateFundraiser, deleteFundraiser, addNotification } = store
  const [view, setView] = useState(null)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [confirmDel, setConfirmDel] = useState(null)
  const [form, setForm] = useState({ name:'', type:'event', date:'', goal:'', raised:'', status:'planning', notes:'' })

  const EMPTY = { name:'', type:'event', date:'', goal:'', raised:'', status:'planning', notes:'' }
  const pct = (f) => f.goal ? Math.min(100, Math.round(f.raised / f.goal * 100)) : 0
  const STATUS_COLOR = { planning:'#f59e0b', active:'#3AAB35', complete:'#1B4FA3', cancelled:'#9ca3af' }

  function save() {
    if (!form.name) return
    if (editing) { updateFundraiser(editing, form); addNotification('Fundraiser updated!') }
    else { addFundraiser(form); addNotification('Fundraiser added!') }
    setShowForm(false); setEditing(null); setForm(EMPTY)
  }

  function startEdit(f) { setForm({ name:f.name,type:f.type,date:f.date,goal:f.goal,raised:f.raised,status:f.status,notes:f.notes }); setEditing(f.id); setShowForm(true); setView(null) }

  // CSV export
  function exportCSV() {
    const rows = [['Name','Type','Date','Goal','Raised','%','Status','Notes']]
    fundraisers.forEach(f => rows.push([f.name,f.type,f.date,f.goal,f.raised,pct(f)+'%',f.status,f.notes]))
    const csv = rows.map(r => r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n')
    const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
    a.download = 'fundraisers.csv'; a.click()
    addNotification('Exported fundraisers CSV')
  }

  // CSV import
  function importCSV(e) {
    const file = e.target.files[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      const lines = ev.target.result.split('\n').slice(1)
      lines.forEach(line => {
        const cols = line.split(',').map(c => c.replace(/^"|"$/g,'').replace(/""/g,'"'))
        if (cols[0]) addFundraiser({ name:cols[0],type:cols[1]||'event',date:cols[2]||'',goal:Number(cols[3])||0,raised:Number(cols[4])||0,status:cols[6]||'planning',notes:cols[7]||'' })
      })
      addNotification('Fundraisers imported!')
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="fin-tab-content">
      <div className="fin-tab-toolbar">
        <span className="fin-tab-count">{fundraisers.length} fundraisers</span>
        <div className="fin-tab-actions">
          <button className="fin-btn fin-btn--ghost" onClick={exportCSV}>⬇ Export CSV</button>
          <label className="fin-btn fin-btn--ghost">⬆ Import CSV<input type="file" accept=".csv" style={{display:'none'}} onChange={importCSV}/></label>
          <button className="fin-btn fin-btn--primary" onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true) }}>+ Add Fundraiser</button>
        </div>
      </div>

      <div className="fin-cards">
        {fundraisers.map(f => (
          <div className="fin-fundraiser-card" key={f.id} onClick={() => setView(f)} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&setView(f)}>
            <div className="fin-fc-header">
              <div>
                <div className="fin-fc-name">{f.name}</div>
                <div className="fin-fc-meta">{f.type} · {fmtDate(f.date)}</div>
              </div>
              <span className="fin-status-badge" style={{background: STATUS_COLOR[f.status]+'22', color: STATUS_COLOR[f.status]}}>{f.status}</span>
            </div>
            <div className="fin-fc-amounts">
              <span className="fin-fc-raised">{fmt$(f.raised)}</span>
              <span className="fin-fc-goal"> of {fmt$(f.goal)}</span>
            </div>
            <div className="fin-progress-bar">
              <div className="fin-progress-fill" style={{width: pct(f)+'%', background: STATUS_COLOR[f.status]}} />
            </div>
            <div className="fin-fc-pct">{pct(f)}% of goal</div>
          </div>
        ))}
        {fundraisers.length === 0 && <div className="fin-empty">No fundraisers yet. Add one above.</div>}
      </div>

      {/* Detail modal */}
      {view && (
        <Modal open onClose={() => setView(null)} title={view.name} size="md">
          <div className="fin-detail">
            <div className="fin-detail-row"><span>Type</span><span>{view.type}</span></div>
            <div className="fin-detail-row"><span>Date</span><span>{fmtDate(view.date)}</span></div>
            <div className="fin-detail-row"><span>Status</span><span className="fin-status-badge" style={{background:STATUS_COLOR[view.status]+'22',color:STATUS_COLOR[view.status]}}>{view.status}</span></div>
            <div className="fin-detail-row"><span>Goal</span><span>{fmt$(view.goal)}</span></div>
            <div className="fin-detail-row"><span>Raised</span><span>{fmt$(view.raised)}</span></div>
            <div className="fin-detail-row"><span>Progress</span><span>{pct(view)}%</span></div>
            <div className="fin-progress-bar" style={{margin:'8px 0'}}><div className="fin-progress-fill" style={{width:pct(view)+'%',background:STATUS_COLOR[view.status]}} /></div>
            {view.notes && <div className="fin-detail-notes">{view.notes}</div>}
            <div className="modal-actions" style={{marginTop:16}}>
              <button className="btn-secondary" onClick={() => { setView(null); setConfirmDel(view) }}>Delete</button>
              <button className="btn-primary" onClick={() => startEdit(view)}>Edit</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add/edit modal */}
      {showForm && (
        <Modal open onClose={() => { setShowForm(false); setEditing(null) }} title={editing ? 'Edit Fundraiser' : 'Add Fundraiser'} size="md">
          <div className="fin-form">
            <div className="form-group"><label>Name*</label><input value={form.name} onChange={e=>setForm(d=>({...d,name:e.target.value}))} placeholder="e.g. Clay Shoot" /></div>
            <div className="form-row-2">
              <div className="form-group"><label>Type</label>
                <select value={form.type} onChange={e=>setForm(d=>({...d,type:e.target.value}))}>
                  {FUNDRAISER_TYPES.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm(d=>({...d,status:e.target.value}))}>
                  {FUNDRAISER_STATUS.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group"><label>Date</label><input type="date" value={form.date} onChange={e=>setForm(d=>({...d,date:e.target.value}))} /></div>
            <div className="form-row-2">
              <div className="form-group"><label>Goal ($)</label><input type="number" value={form.goal} onChange={e=>setForm(d=>({...d,goal:e.target.value}))} placeholder="25000" /></div>
              <div className="form-group"><label>Raised ($)</label><input type="number" value={form.raised} onChange={e=>setForm(d=>({...d,raised:e.target.value}))} placeholder="0" /></div>
            </div>
            <div className="form-group"><label>Notes</label><textarea value={form.notes} onChange={e=>setForm(d=>({...d,notes:e.target.value}))} rows={3} /></div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => { setShowForm(false); setEditing(null) }}>Cancel</button>
              <button className="btn-primary" onClick={save}>{editing ? 'Save Changes' : 'Add Fundraiser'}</button>
            </div>
          </div>
        </Modal>
      )}

      {confirmDel && (
        <Modal open onClose={() => setConfirmDel(null)} title="Delete Fundraiser?" size="sm">
          <p style={{color:'var(--gray-600)',fontSize:14}}>This will permanently delete <strong>{confirmDel.name}</strong>.</p>
          <div className="modal-actions" style={{marginTop:16}}>
            <button className="btn-secondary" onClick={() => setConfirmDel(null)}>Cancel</button>
            <button className="btn-danger" onClick={() => { deleteFundraiser(confirmDel.id); setConfirmDel(null); addNotification('Fundraiser deleted') }}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── Donors tab ────────────────────────────────────────────────────────────────
function DonorsTab({ store }) {
  const { donors, addDonor, updateDonor, deleteDonor, financeFollowUps, addFinanceFollowUp, addNotification } = store
  const [view, setView] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [confirmDel, setConfirmDel] = useState(null)
  const [showFU, setShowFU] = useState(false)
  const [fuForm, setFuForm] = useState({ type:'call', date: new Date().toISOString().slice(0,10), note:'' })
  const [search, setSearch] = useState('')
  const EMPTY = { name:'', type:'individual', phone:'', email:'', monthlyAmt:'', totalGiven:'', lastGift:'', notes:'', status:'active' }
  const [form, setForm] = useState(EMPTY)

  const filtered = donors.filter(d => !search || d.name.toLowerCase().includes(search.toLowerCase()) || (d.email||'').toLowerCase().includes(search.toLowerCase()))
  const TYPE_ICON = { individual:'👤', church:'⛪', business:'🏢', foundation:'🏛️', other:'📌' }

  function save() {
    if (!form.name) return
    if (editing) { updateDonor(editing, form); addNotification('Donor updated!') }
    else { addDonor(form); addNotification('Donor added!') }
    setShowForm(false); setEditing(null); setForm(EMPTY)
  }

  function startEdit(d) { setForm({ name:d.name,type:d.type,phone:d.phone,email:d.email,monthlyAmt:d.monthlyAmt,totalGiven:d.totalGiven,lastGift:d.lastGift,notes:d.notes,status:d.status }); setEditing(d.id); setShowForm(true); setView(null) }

  function logFU() {
    if (!fuForm.note) return
    addFinanceFollowUp({ ...fuForm, donorId: view.id })
    setShowFU(false); setFuForm({ type:'call', date: new Date().toISOString().slice(0,10), note:'' })
    addNotification('Follow-up logged!')
  }

  function exportCSV() {
    const rows = [['Name','Type','Phone','Email','Monthly','Total Given','Last Gift','Status','Notes']]
    donors.forEach(d => rows.push([d.name,d.type,d.phone,d.email,d.monthlyAmt,d.totalGiven,d.lastGift,d.status,d.notes]))
    const csv = rows.map(r => r.map(c=>`"${String(c||'').replace(/"/g,'""')}"`).join(',')).join('\n')
    const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
    a.download = 'donors.csv'; a.click(); addNotification('Exported donors CSV')
  }

  function importCSV(e) {
    const file = e.target.files[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      const lines = ev.target.result.split('\n').slice(1)
      lines.forEach(line => {
        const c = line.split(',').map(x => x.replace(/^"|"$/g,'').replace(/""/g,'"'))
        if (c[0]) addDonor({ name:c[0],type:c[1]||'individual',phone:c[2]||'',email:c[3]||'',monthlyAmt:Number(c[4])||0,totalGiven:Number(c[5])||0,lastGift:c[6]||'',status:c[7]||'active',notes:c[8]||'' })
      })
      addNotification('Donors imported!')
    }
    reader.readAsText(file); e.target.value = ''
  }

  const donorFUs = view ? financeFollowUps.filter(f=>f.donorId===view.id) : []

  return (
    <div className="fin-tab-content">
      <div className="fin-tab-toolbar">
        <input className="fin-search" placeholder="Search donors…" value={search} onChange={e=>setSearch(e.target.value)} />
        <div className="fin-tab-actions">
          <button className="fin-btn fin-btn--ghost" onClick={exportCSV}>⬇ Export CSV</button>
          <label className="fin-btn fin-btn--ghost">⬆ Import CSV<input type="file" accept=".csv" style={{display:'none'}} onChange={importCSV}/></label>
          <button className="fin-btn fin-btn--primary" onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true) }}>+ Add Donor</button>
        </div>
      </div>
      <div className="fin-table-wrap">
        <table className="fin-table">
          <thead><tr><th>Name</th><th>Type</th><th>Monthly</th><th>Total Given</th><th>Last Gift</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id} className="fin-table-row" onClick={() => setView(d)}>
                <td><span className="fin-donor-icon">{TYPE_ICON[d.type]||'📌'}</span> {d.name}</td>
                <td>{d.type}</td>
                <td>{d.monthlyAmt ? fmt$(d.monthlyAmt) : '—'}</td>
                <td>{fmt$(d.totalGiven)}</td>
                <td>{fmtDate(d.lastGift)}</td>
                <td><span className={`fin-status-badge fin-status-${d.status}`}>{d.status}</span></td>
                <td><button className="fin-row-btn" onClick={e=>{e.stopPropagation();startEdit(d)}}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="fin-empty">No donors found.</div>}
      </div>

      {view && (
        <Modal open onClose={() => setView(null)} title={view.name} size="lg">
          <div className="fin-detail">
            <div className="fin-detail-2col">
              <div>
                <div className="fin-detail-row"><span>Type</span><span>{TYPE_ICON[view.type]} {view.type}</span></div>
                <div className="fin-detail-row"><span>Phone</span><span><a href={`tel:${view.phone}`}>{view.phone||'—'}</a></span></div>
                <div className="fin-detail-row"><span>Email</span><span>{view.email ? <a href={`mailto:${view.email}`}>{view.email}</a> : '—'}</span></div>
                <div className="fin-detail-row"><span>Status</span><span className={`fin-status-badge fin-status-${view.status}`}>{view.status}</span></div>
              </div>
              <div>
                <div className="fin-detail-row"><span>Monthly</span><span>{fmt$(view.monthlyAmt)}</span></div>
                <div className="fin-detail-row"><span>Total Given</span><span><strong>{fmt$(view.totalGiven)}</strong></span></div>
                <div className="fin-detail-row"><span>Last Gift</span><span>{fmtDate(view.lastGift)}</span></div>
              </div>
            </div>
            {view.notes && <div className="fin-detail-notes">{view.notes}</div>}

            <div className="fin-fu-section">
              <div className="fin-fu-header">
                <h4>Follow-up History</h4>
                <button className="fin-btn fin-btn--primary" onClick={() => setShowFU(true)}>+ Log Follow-up</button>
              </div>
              {donorFUs.length === 0 && <div className="fin-empty" style={{padding:'8px 0'}}>No follow-ups yet.</div>}
              {donorFUs.map(f => (
                <div className="fin-fu-row" key={f.id}>
                  <span className="fin-fu-type">{f.type==='call'?'📞':f.type==='email'?'✉️':f.type==='text'?'💬':f.type==='meeting'?'🤝':'📝'}</span>
                  <div className="fin-fu-body">
                    <div className="fin-fu-note">{f.note}</div>
                    <div className="fin-fu-meta">{fmtDate(f.date)} · {f.type}</div>
                  </div>
                  <span className={f.completed ? 'badge-done' : 'fin-badge-pending'}>{f.completed ? 'Done' : 'Pending'}</span>
                  {!f.completed && <button className="fin-btn fin-btn--ghost" style={{fontSize:11}} onClick={()=>store.updateFinanceFollowUp(f.id,{completed:true})}>Mark Done</button>}
                </div>
              ))}
            </div>

            <div className="modal-actions" style={{marginTop:16}}>
              <button className="btn-secondary" onClick={() => { setView(null); setConfirmDel(view) }}>Delete</button>
              <button className="btn-secondary" onClick={() => startEdit(view)}>Edit</button>
              {view.phone && <a className="btn-primary" href={`tel:${view.phone}`} onClick={e=>e.stopPropagation()}>📞 Call</a>}
              {view.email && <a className="btn-primary" href={`mailto:${view.email}`} onClick={e=>e.stopPropagation()}>✉️ Email</a>}
            </div>
          </div>
        </Modal>
      )}

      {showFU && (
        <Modal open onClose={() => setShowFU(false)} title="Log Follow-up" size="sm">
          <div className="fin-form">
            <div className="form-row-2">
              <div className="form-group"><label>Type</label>
                <select value={fuForm.type} onChange={e=>setFuForm(d=>({...d,type:e.target.value}))}>
                  {FU_TYPES.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Date</label><input type="date" value={fuForm.date} onChange={e=>setFuForm(d=>({...d,date:e.target.value}))} /></div>
            </div>
            <div className="form-group"><label>Note*</label><textarea value={fuForm.note} onChange={e=>setFuForm(d=>({...d,note:e.target.value}))} rows={3} placeholder="What was discussed?" /></div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowFU(false)}>Cancel</button>
              <button className="btn-primary" onClick={logFU}>Log Follow-up</button>
            </div>
          </div>
        </Modal>
      )}

      {showForm && (
        <Modal open onClose={() => { setShowForm(false); setEditing(null) }} title={editing ? 'Edit Donor' : 'Add Donor'} size="md">
          <div className="fin-form">
            <div className="form-group"><label>Name*</label><input value={form.name} onChange={e=>setForm(d=>({...d,name:e.target.value}))} /></div>
            <div className="form-row-2">
              <div className="form-group"><label>Type</label>
                <select value={form.type} onChange={e=>setForm(d=>({...d,type:e.target.value}))}>
                  {DONOR_TYPES.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm(d=>({...d,status:e.target.value}))}>
                  <option>active</option><option>inactive</option><option>prospect</option>
                </select>
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-group"><label>Phone</label><input value={form.phone} onChange={e=>setForm(d=>({...d,phone:e.target.value}))} /></div>
              <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={e=>setForm(d=>({...d,email:e.target.value}))} /></div>
            </div>
            <div className="form-row-2">
              <div className="form-group"><label>Monthly Gift ($)</label><input type="number" value={form.monthlyAmt} onChange={e=>setForm(d=>({...d,monthlyAmt:e.target.value}))} placeholder="0" /></div>
              <div className="form-group"><label>Total Given ($)</label><input type="number" value={form.totalGiven} onChange={e=>setForm(d=>({...d,totalGiven:e.target.value}))} placeholder="0" /></div>
            </div>
            <div className="form-group"><label>Last Gift Date</label><input type="date" value={form.lastGift} onChange={e=>setForm(d=>({...d,lastGift:e.target.value}))} /></div>
            <div className="form-group"><label>Notes</label><textarea value={form.notes} onChange={e=>setForm(d=>({...d,notes:e.target.value}))} rows={3} /></div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => { setShowForm(false); setEditing(null) }}>Cancel</button>
              <button className="btn-primary" onClick={save}>{editing ? 'Save' : 'Add Donor'}</button>
            </div>
          </div>
        </Modal>
      )}

      {confirmDel && (
        <Modal open onClose={() => setConfirmDel(null)} title="Delete Donor?" size="sm">
          <p style={{color:'var(--gray-600)',fontSize:14}}>Delete <strong>{confirmDel.name}</strong>? All their follow-ups remain.</p>
          <div className="modal-actions" style={{marginTop:16}}>
            <button className="btn-secondary" onClick={() => setConfirmDel(null)}>Cancel</button>
            <button className="btn-danger" onClick={() => { deleteDonor(confirmDel.id); setConfirmDel(null); addNotification('Donor deleted') }}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── Grants tab ────────────────────────────────────────────────────────────────
function GrantsTab({ store }) {
  const { grants, addGrant, updateGrant, deleteGrant, addNotification } = store
  const [view, setView] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [confirmDel, setConfirmDel] = useState(null)
  const EMPTY = { name:'', amount:'', deadline:'', status:'planning', notes:'', submitted:'', awarded:'' }
  const [form, setForm] = useState(EMPTY)

  const STATUS_COLOR = { planning:'#f59e0b', submitted:'#1B4FA3', awarded:'#3AAB35', declined:'#9ca3af' }
  const STATUS_ICON = { planning:'📝', submitted:'📬', awarded:'🏆', declined:'❌' }

  function save() {
    if (!form.name) return
    if (editing) { updateGrant(editing, form); addNotification('Grant updated!') }
    else { addGrant(form); addNotification('Grant added!') }
    setShowForm(false); setEditing(null); setForm(EMPTY)
  }

  function startEdit(g) { setForm({ name:g.name,amount:g.amount,deadline:g.deadline,status:g.status,notes:g.notes,submitted:g.submitted,awarded:g.awarded }); setEditing(g.id); setShowForm(true); setView(null) }

  return (
    <div className="fin-tab-content">
      <div className="fin-tab-toolbar">
        <span className="fin-tab-count">{grants.length} grants tracked</span>
        <button className="fin-btn fin-btn--primary" onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true) }}>+ Add Grant</button>
      </div>
      <div className="fin-cards fin-cards--grants">
        {grants.map(g => (
          <div className="fin-grant-card" key={g.id} onClick={() => setView(g)} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&setView(g)}>
            <div className="fin-gc-top">
              <span className="fin-gc-status-icon">{STATUS_ICON[g.status]}</span>
              <span className="fin-status-badge" style={{background:STATUS_COLOR[g.status]+'22',color:STATUS_COLOR[g.status]}}>{g.status}</span>
            </div>
            <div className="fin-gc-name">{g.name}</div>
            <div className="fin-gc-amount">{fmt$(g.amount)}</div>
            <div className="fin-gc-meta">
              {g.deadline && <span>Deadline: {fmtDate(g.deadline)}</span>}
              {g.submitted && <span>Submitted: {fmtDate(g.submitted)}</span>}
            </div>
          </div>
        ))}
        {grants.length === 0 && <div className="fin-empty">No grants tracked yet.</div>}
      </div>

      {view && (
        <Modal open onClose={() => setView(null)} title={view.name} size="md">
          <div className="fin-detail">
            <div className="fin-detail-row"><span>Amount</span><span><strong>{fmt$(view.amount)}</strong></span></div>
            <div className="fin-detail-row"><span>Status</span><span className="fin-status-badge" style={{background:STATUS_COLOR[view.status]+'22',color:STATUS_COLOR[view.status]}}>{STATUS_ICON[view.status]} {view.status}</span></div>
            <div className="fin-detail-row"><span>Deadline</span><span>{fmtDate(view.deadline)}</span></div>
            <div className="fin-detail-row"><span>Submitted</span><span>{fmtDate(view.submitted)}</span></div>
            <div className="fin-detail-row"><span>Awarded</span><span>{fmtDate(view.awarded)}</span></div>
            {view.notes && <div className="fin-detail-notes">{view.notes}</div>}
            <div className="modal-actions" style={{marginTop:16}}>
              <button className="btn-secondary" onClick={() => { setView(null); setConfirmDel(view) }}>Delete</button>
              <button className="btn-primary" onClick={() => startEdit(view)}>Edit</button>
            </div>
          </div>
        </Modal>
      )}

      {showForm && (
        <Modal open onClose={() => { setShowForm(false); setEditing(null) }} title={editing ? 'Edit Grant' : 'Add Grant'} size="md">
          <div className="fin-form">
            <div className="form-group"><label>Grantor Name*</label><input value={form.name} onChange={e=>setForm(d=>({...d,name:e.target.value}))} placeholder="Foundation or org name" /></div>
            <div className="form-row-2">
              <div className="form-group"><label>Amount ($)</label><input type="number" value={form.amount} onChange={e=>setForm(d=>({...d,amount:e.target.value}))} placeholder="5000" /></div>
              <div className="form-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm(d=>({...d,status:e.target.value}))}>
                  {GRANT_STATUS.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-group"><label>Deadline</label><input type="date" value={form.deadline} onChange={e=>setForm(d=>({...d,deadline:e.target.value}))} /></div>
              <div className="form-group"><label>Submitted Date</label><input type="date" value={form.submitted} onChange={e=>setForm(d=>({...d,submitted:e.target.value}))} /></div>
            </div>
            <div className="form-group"><label>Awarded Date</label><input type="date" value={form.awarded} onChange={e=>setForm(d=>({...d,awarded:e.target.value}))} /></div>
            <div className="form-group"><label>Notes</label><textarea value={form.notes} onChange={e=>setForm(d=>({...d,notes:e.target.value}))} rows={3} /></div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => { setShowForm(false); setEditing(null) }}>Cancel</button>
              <button className="btn-primary" onClick={save}>{editing ? 'Save' : 'Add Grant'}</button>
            </div>
          </div>
        </Modal>
      )}

      {confirmDel && (
        <Modal open onClose={() => setConfirmDel(null)} title="Delete Grant?" size="sm">
          <p style={{color:'var(--gray-600)',fontSize:14}}>Delete <strong>{confirmDel.name}</strong>?</p>
          <div className="modal-actions" style={{marginTop:16}}>
            <button className="btn-secondary" onClick={() => setConfirmDel(null)}>Cancel</button>
            <button className="btn-danger" onClick={() => { deleteGrant(confirmDel.id); setConfirmDel(null); addNotification('Grant deleted') }}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── Finance Follow-ups tab ────────────────────────────────────────────────────
function FinanceFollowUpsTab({ store }) {
  const { financeFollowUps, donors, updateFinanceFollowUp, deleteFinanceFollowUp, addFinanceFollowUp, addNotification } = store
  const [view, setView] = useState(null)
  const [filter, setFilter] = useState('pending')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ donorId:'', type:'call', date: new Date().toISOString().slice(0,10), note:'' })

  const FU_ICON = { call:'📞', email:'✉️', text:'💬', meeting:'🤝', letter:'📝' }

  const displayed = financeFollowUps
    .filter(f => filter === 'all' || (filter === 'pending' ? !f.completed : f.completed))
    .sort((a,b) => b.date.localeCompare(a.date))

  function donorName(id) { const d = donors.find(x=>x.id===id); return d ? d.name : 'Unknown' }

  function saveNew() {
    if (!form.donorId || !form.note) return
    addFinanceFollowUp(form)
    setShowForm(false)
    setForm({ donorId:'', type:'call', date: new Date().toISOString().slice(0,10), note:'' })
    addNotification('Follow-up logged!')
  }

  return (
    <div className="fin-tab-content">
      <div className="fin-tab-toolbar">
        <div className="fin-filter-tabs">
          {['pending','completed','all'].map(f => (
            <button key={f} className={`fin-filter-tab ${filter===f?'fin-filter-tab--on':''}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <button className="fin-btn fin-btn--primary" onClick={() => setShowForm(true)}>+ Log Follow-up</button>
      </div>
      <div className="fin-fu-list">
        {displayed.map(f => (
          <div className="fin-fu-list-row" key={f.id} onClick={() => setView(f)} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&setView(f)}>
            <span className="fin-fu-type-icon">{FU_ICON[f.type]||'📌'}</span>
            <div className="fin-fu-list-body">
              <div className="fin-fu-list-donor">{donorName(f.donorId)}</div>
              <div className="fin-fu-list-note">{f.note.slice(0,80)}{f.note.length>80?'…':''}</div>
            </div>
            <div className="fin-fu-list-right">
              <span>{fmtDate(f.date)}</span>
              <span className={f.completed ? 'badge-done' : 'fin-badge-pending'}>{f.completed ? 'Done' : 'Pending'}</span>
            </div>
          </div>
        ))}
        {displayed.length === 0 && <div className="fin-empty">No follow-ups in this view.</div>}
      </div>

      {view && (
        <Modal open onClose={() => setView(null)} title="Follow-up Detail" size="sm">
          <div className="fin-detail">
            <div className="fin-detail-row"><span>Donor</span><span>{donorName(view.donorId)}</span></div>
            <div className="fin-detail-row"><span>Type</span><span>{FU_ICON[view.type]} {view.type}</span></div>
            <div className="fin-detail-row"><span>Date</span><span>{fmtDate(view.date)}</span></div>
            <div className="fin-detail-row"><span>Status</span><span className={view.completed ? 'badge-done' : 'fin-badge-pending'}>{view.completed ? 'Completed' : 'Pending'}</span></div>
            <div className="fin-detail-notes" style={{marginTop:8}}>{view.note}</div>
            <div className="modal-actions" style={{marginTop:16}}>
              <button className="btn-secondary" onClick={() => { deleteFinanceFollowUp(view.id); setView(null); addNotification('Follow-up deleted') }}>Delete</button>
              {!view.completed && <button className="btn-primary" onClick={() => { updateFinanceFollowUp(view.id,{completed:true}); setView(null); addNotification('Marked complete!') }}>Mark Complete</button>}
            </div>
          </div>
        </Modal>
      )}

      {showForm && (
        <Modal open onClose={() => setShowForm(false)} title="Log Follow-up" size="sm">
          <div className="fin-form">
            <div className="form-group"><label>Donor*</label>
              <select value={form.donorId} onChange={e=>setForm(d=>({...d,donorId:e.target.value}))}>
                <option value="">— Select donor —</option>
                {donors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div className="form-row-2">
              <div className="form-group"><label>Type</label>
                <select value={form.type} onChange={e=>setForm(d=>({...d,type:e.target.value}))}>
                  {FU_TYPES.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Date</label><input type="date" value={form.date} onChange={e=>setForm(d=>({...d,date:e.target.value}))} /></div>
            </div>
            <div className="form-group"><label>Note*</label><textarea value={form.note} onChange={e=>setForm(d=>({...d,note:e.target.value}))} rows={3} placeholder="What happened / what to discuss?" /></div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn-primary" onClick={saveNew}>Log Follow-up</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── Main Finances page ────────────────────────────────────────────────────────
const TABS = ['Overview','Fundraisers','Donors','Grants','Follow-ups']

export default function Finances({ store }) {
  const [tab, setTab] = useState('Overview')
  const { fundraisers, donors, grants, financeFollowUps } = store

  return (
    <div className="finances-page">
      <div className="fin-tabs">
        {TABS.map(t => (
          <button key={t} className={`fin-tab ${tab===t?'fin-tab--active':''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div className="fin-tab-content">
          <OverviewCards fundraisers={fundraisers} donors={donors} grants={grants} financeFollowUps={financeFollowUps} />

          <div className="fin-overview-grid">
            <div className="fin-ov-card">
              <h3>Fundraiser Progress</h3>
              {fundraisers.map(f => {
                const pct = f.goal ? Math.min(100, Math.round(f.raised/f.goal*100)) : 0
                const color = f.status==='complete' ? '#1B4FA3' : f.status==='active' ? '#3AAB35' : '#f59e0b'
                return (
                  <div key={f.id} className="fin-ov-row">
                    <div className="fin-ov-row-label">{f.name}</div>
                    <div className="fin-ov-bar-wrap">
                      <div className="fin-ov-bar"><div style={{width:pct+'%',background:color,height:'100%',borderRadius:4,transition:'width .4s'}} /></div>
                      <span className="fin-ov-bar-pct">{pct}%</span>
                    </div>
                    <span className="fin-ov-amount">{fmt$(f.raised)} / {fmt$(f.goal)}</span>
                  </div>
                )
              })}
            </div>

            <div className="fin-ov-card">
              <h3>Top Donors</h3>
              {[...donors].sort((a,b) => Number(b.totalGiven)-Number(a.totalGiven)).slice(0,6).map(d => (
                <div key={d.id} className="fin-ov-donor-row">
                  <span className="fin-ov-donor-name">{d.name}</span>
                  <span className="fin-ov-donor-amt">{fmt$(d.totalGiven)}</span>
                </div>
              ))}
            </div>

            <div className="fin-ov-card">
              <h3>Grants Pipeline</h3>
              {grants.map(g => {
                const color = {planning:'#f59e0b',submitted:'#1B4FA3',awarded:'#3AAB35',declined:'#9ca3af'}[g.status]
                return (
                  <div key={g.id} className="fin-ov-donor-row">
                    <div>
                      <div style={{fontWeight:600,fontSize:13}}>{g.name}</div>
                      <div style={{fontSize:11,color:'var(--gray-500)'}}>{g.status}{g.deadline ? ' · Due ' + fmtDate(g.deadline) : ''}</div>
                    </div>
                    <span style={{fontWeight:700,color,fontSize:13}}>{fmt$(g.amount)}</span>
                  </div>
                )
              })}
            </div>

            <div className="fin-ov-card">
              <h3>Pending Follow-ups</h3>
              {financeFollowUps.filter(f=>!f.completed).slice(0,6).map(f => {
                const donor = donors.find(d=>d.id===f.donorId)
                return (
                  <div key={f.id} className="fin-ov-donor-row">
                    <div>
                      <div style={{fontWeight:600,fontSize:13}}>{donor?.name||'Unknown'}</div>
                      <div style={{fontSize:11,color:'var(--gray-500)'}}>{f.type} · {fmtDate(f.date)}</div>
                    </div>
                    <button className="fin-btn fin-btn--ghost" style={{fontSize:11,padding:'3px 8px'}} onClick={() => store.updateFinanceFollowUp(f.id,{completed:true})}>Done</button>
                  </div>
                )
              })}
              {financeFollowUps.filter(f=>!f.completed).length === 0 && <div className="fin-empty" style={{padding:'8px 0'}}>All caught up!</div>}
            </div>
          </div>
        </div>
      )}

      {tab === 'Fundraisers' && <FundraisersTab store={store} />}
      {tab === 'Donors' && <DonorsTab store={store} />}
      {tab === 'Grants' && <GrantsTab store={store} />}
      {tab === 'Follow-ups' && <FinanceFollowUpsTab store={store} />}
    </div>
  )
}
