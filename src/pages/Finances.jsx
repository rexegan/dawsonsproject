import { useState } from 'react'
import Modal from '../components/Modal'
import { formatPhone } from '../utils/phone'
import './Finances.css'

const fmt$ = (n) => '$' + Number(n || 0).toLocaleString()
const fmtDate = (d) => {
  if (!d) return '—'
  const dt = new Date(d + 'T00:00:00')
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const FUNDRAISER_TYPES = ['event','campaign','matching','online','other']
const FUNDRAISER_STATUS = ['planning','active','complete','cancelled']
const DONOR_TYPES = ['individual','church','business','foundation','other']
const GRANT_STATUS = ['planning','submitted','awarded','declined']
const FU_TYPES = ['call','email','text','meeting','letter']

const STATUS_COLOR_FR = { planning:'#f59e0b', active:'#3AAB35', complete:'#1B4FA3', cancelled:'#9ca3af' }
const STATUS_COLOR_GR = { planning:'#f59e0b', submitted:'#1B4FA3', awarded:'#3AAB35', declined:'#9ca3af' }
const STATUS_ICON_GR  = { planning:'📝', submitted:'📬', awarded:'🏆', declined:'❌' }
const FU_ICON = { call:'📞', email:'✉️', text:'💬', meeting:'🤝', letter:'📝' }
const TYPE_ICON_D = { individual:'👤', church:'⛪', business:'🏢', foundation:'🏛️', other:'📌' }

const pct = (f) => f.goal ? Math.min(100, Math.round(Number(f.raised) / Number(f.goal) * 100)) : 0

// ─── Reusable detail modals ────────────────────────────────────────────────────

function FundraiserModal({ f, onClose, onEdit, onDelete, store }) {
  const [showLogFU, setShowLogFU] = useState(false)
  const [fuForm, setFuForm] = useState({ type:'call', date: new Date().toISOString().slice(0,10), note:'' })

  function logFU() {
    if (!fuForm.note) return
    store.addFinanceFollowUp({ ...fuForm, donorId: 'fundraiser:' + f.id })
    setShowLogFU(false)
    store.addNotification('Note logged on fundraiser!')
  }

  return (
    <Modal open title={f.name} onClose={onClose} size="lg">
      <div className="fin-detail">
        <div className="fin-detail-hero">
          <div className="fin-detail-hero-left">
            <span className="fin-status-badge" style={{background:STATUS_COLOR_FR[f.status]+'22',color:STATUS_COLOR_FR[f.status],fontSize:13,padding:'4px 12px'}}>{f.status}</span>
            <div className="fin-detail-amount">{fmt$(f.raised)} <span>raised</span></div>
            <div className="fin-detail-goal">of {fmt$(f.goal)} goal</div>
          </div>
          <div className="fin-detail-pct-circle" style={{'--pct': pct(f), '--color': STATUS_COLOR_FR[f.status]}}>
            <span>{pct(f)}%</span>
          </div>
        </div>
        <div className="fin-progress-bar" style={{height:12,marginBottom:4}}>
          <div className="fin-progress-fill" style={{width:pct(f)+'%', background:STATUS_COLOR_FR[f.status]}} />
        </div>
        <div className="fin-detail-grid">
          {[['Type',f.type],['Date',fmtDate(f.date)],['Goal',fmt$(f.goal)],['Raised',fmt$(f.raised)],['Remaining',fmt$(Number(f.goal||0)-Number(f.raised||0))],['Progress',pct(f)+'%']].map(([k,v])=>(
            <div className="fin-detail-cell" key={k}><div className="fin-dc-label">{k}</div><div className="fin-dc-val">{v}</div></div>
          ))}
        </div>
        {f.notes && <div className="fin-detail-notes"><strong>Notes:</strong> {f.notes}</div>}
        <div className="modal-actions" style={{marginTop:16}}>
          <button className="btn-secondary" onClick={() => { onClose(); onDelete(f) }}>Delete</button>
          <button className="fin-btn fin-btn--ghost" onClick={() => setShowLogFU(v=>!v)}>+ Log Note</button>
          <button className="btn-primary" onClick={() => { onClose(); onEdit(f) }}>Edit</button>
        </div>
        {showLogFU && (
          <div className="fin-inline-log">
            <div className="form-row-2">
              <div className="form-group"><label>Type</label>
                <select value={fuForm.type} onChange={e=>setFuForm(d=>({...d,type:e.target.value}))}>
                  {FU_TYPES.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Date</label><input type="date" value={fuForm.date} onChange={e=>setFuForm(d=>({...d,date:e.target.value}))} /></div>
            </div>
            <div className="form-group"><label>Note</label><textarea value={fuForm.note} onChange={e=>setFuForm(d=>({...d,note:e.target.value}))} rows={2} /></div>
            <button className="fin-btn fin-btn--primary" onClick={logFU}>Save Note</button>
          </div>
        )}
      </div>
    </Modal>
  )
}

function DonorModal({ d, onClose, onEdit, onDelete, store }) {
  const { financeFollowUps, updateFinanceFollowUp, deleteFinanceFollowUp, addFinanceFollowUp, addNotification } = store
  const [showFU, setShowFU] = useState(false)
  const [fuForm, setFuForm] = useState({ type:'call', date: new Date().toISOString().slice(0,10), note:'' })
  const donorFUs = financeFollowUps.filter(f => f.donorId === d.id)

  function logFU() {
    if (!fuForm.note) return
    addFinanceFollowUp({ ...fuForm, donorId: d.id })
    setShowFU(false); setFuForm({ type:'call', date: new Date().toISOString().slice(0,10), note:'' })
    addNotification('Follow-up logged!')
  }

  const annualized = (Number(d.monthlyAmt||0)*12) + Number(d.totalGiven||0)

  return (
    <Modal open title={d.name} onClose={onClose} size="lg">
      <div className="fin-detail">
        <div className="fin-detail-hero" style={{background:'linear-gradient(135deg,#1B4FA3,#153e85)'}}>
          <div className="fin-detail-hero-left">
            <span style={{fontSize:28}}>{TYPE_ICON_D[d.type]||'📌'}</span>
            <div className="fin-detail-amount" style={{color:'white'}}>{fmt$(d.totalGiven)}</div>
            <div className="fin-detail-goal" style={{color:'rgba(255,255,255,.75)'}}>total given · {fmt$(d.monthlyAmt||0)}/mo</div>
          </div>
          <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:6}}>
            <span className={`fin-status-badge fin-status-${d.status}`}>{d.status}</span>
            <div style={{fontSize:11,color:'rgba(255,255,255,.7)',textAlign:'right'}}>Last gift<br/>{fmtDate(d.lastGift)}</div>
          </div>
        </div>
        <div className="fin-detail-grid">
          {[['Type',d.type],['Phone',d.phone ? formatPhone(d.phone) : '—'],['Email',d.email||'—'],['Monthly Gift',fmt$(d.monthlyAmt)],['Total Given',fmt$(d.totalGiven)],['Last Gift',fmtDate(d.lastGift)]].map(([k,v])=>(
            <div className="fin-detail-cell" key={k}><div className="fin-dc-label">{k}</div>
              <div className="fin-dc-val">
                {k==='Phone'&&d.phone ? <a href={`tel:${d.phone}`}>{v}</a> : k==='Email'&&d.email ? <a href={`mailto:${d.email}`}>{v}</a> : v}
              </div>
            </div>
          ))}
        </div>
        {d.notes && <div className="fin-detail-notes"><strong>Notes:</strong> {d.notes}</div>}

        <div className="fin-fu-section">
          <div className="fin-fu-header">
            <h4>Follow-up History ({donorFUs.length})</h4>
            <button className="fin-btn fin-btn--primary" onClick={() => setShowFU(v=>!v)}>+ Log Follow-up</button>
          </div>
          {showFU && (
            <div className="fin-inline-log">
              <div className="form-row-2">
                <div className="form-group"><label>Type</label>
                  <select value={fuForm.type} onChange={e=>setFuForm(d=>({...d,type:e.target.value}))}>
                    {FU_TYPES.map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group"><label>Date</label><input type="date" value={fuForm.date} onChange={e=>setFuForm(d=>({...d,date:e.target.value}))} /></div>
              </div>
              <div className="form-group"><label>Note</label><textarea value={fuForm.note} onChange={e=>setFuForm(d=>({...d,note:e.target.value}))} rows={2} /></div>
              <button className="fin-btn fin-btn--primary" onClick={logFU}>Save</button>
            </div>
          )}
          {donorFUs.length === 0 && !showFU && <div className="fin-empty" style={{padding:'8px 0'}}>No follow-ups yet.</div>}
          {donorFUs.map(f => (
            <div className="fin-fu-row" key={f.id}>
              <span className="fin-fu-type">{FU_ICON[f.type]||'📌'}</span>
              <div className="fin-fu-body">
                <div className="fin-fu-note">{f.note}</div>
                <div className="fin-fu-meta">{fmtDate(f.date)} · {f.type}</div>
              </div>
              <span className={f.completed ? 'badge-done' : 'fin-badge-pending'}>{f.completed ? 'Done' : 'Pending'}</span>
              {!f.completed && <button className="fin-btn fin-btn--ghost" style={{fontSize:11,padding:'3px 8px'}} onClick={()=>updateFinanceFollowUp(f.id,{completed:true})}>✓ Done</button>}
              <button className="fin-btn fin-btn--ghost" style={{fontSize:11,padding:'3px 8px',color:'#dc2626'}} onClick={()=>deleteFinanceFollowUp(f.id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="modal-actions" style={{marginTop:16}}>
          <button className="btn-secondary" onClick={() => { onClose(); onDelete(d) }}>Delete</button>
          <button className="btn-secondary" onClick={() => { onClose(); onEdit(d) }}>Edit</button>
          {d.phone && <a className="btn-primary" href={`tel:${d.phone}`}>📞 Call</a>}
          {d.email && <a className="btn-primary" href={`mailto:${d.email}`}>✉️ Email</a>}
        </div>
      </div>
    </Modal>
  )
}

function GrantModal({ g, onClose, onEdit, onDelete }) {
  return (
    <Modal open title={g.name} onClose={onClose} size="md">
      <div className="fin-detail">
        <div className="fin-detail-hero" style={{background:'linear-gradient(135deg,#3AAB35,#2d8a29)'}}>
          <div className="fin-detail-hero-left">
            <span style={{fontSize:28}}>{STATUS_ICON_GR[g.status]}</span>
            <div className="fin-detail-amount" style={{color:'white'}}>{fmt$(g.amount)}</div>
            <div className="fin-detail-goal" style={{color:'rgba(255,255,255,.75)'}}>grant amount</div>
          </div>
          <span className="fin-status-badge" style={{background:STATUS_COLOR_GR[g.status]+'33',color:'white',border:'1px solid rgba(255,255,255,.3)'}}>{g.status}</span>
        </div>
        <div className="fin-detail-grid">
          {[['Status',g.status],['Amount',fmt$(g.amount)],['Deadline',fmtDate(g.deadline)],['Submitted',fmtDate(g.submitted)],['Awarded',fmtDate(g.awarded)]].map(([k,v])=>(
            <div className="fin-detail-cell" key={k}><div className="fin-dc-label">{k}</div><div className="fin-dc-val">{v}</div></div>
          ))}
        </div>
        {g.notes && <div className="fin-detail-notes"><strong>Notes:</strong> {g.notes}</div>}
        <div className="modal-actions" style={{marginTop:16}}>
          <button className="btn-secondary" onClick={() => { onClose(); onDelete(g) }}>Delete</button>
          <button className="btn-primary" onClick={() => { onClose(); onEdit(g) }}>Edit</button>
        </div>
      </div>
    </Modal>
  )
}

function FUModal({ f, donors, onClose, store }) {
  const donorName = (id) => { const d = donors.find(x=>x.id===id); return d ? d.name : id?.startsWith('fundraiser:') ? 'Fundraiser Note' : 'Unknown' }
  return (
    <Modal open title="Follow-up Detail" onClose={onClose} size="sm">
      <div className="fin-detail">
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
          <span style={{fontSize:32}}>{FU_ICON[f.type]||'📌'}</span>
          <div>
            <div style={{fontSize:15,fontWeight:700,color:'var(--gray-900)'}}>{donorName(f.donorId)}</div>
            <div style={{fontSize:12,color:'var(--gray-500)'}}>{f.type} · {fmtDate(f.date)}</div>
          </div>
          <span className={f.completed ? 'badge-done' : 'fin-badge-pending'} style={{marginLeft:'auto'}}>{f.completed ? 'Done' : 'Pending'}</span>
        </div>
        <div className="fin-detail-notes">{f.note}</div>
        <div className="modal-actions" style={{marginTop:16}}>
          <button className="btn-secondary" onClick={() => { store.deleteFinanceFollowUp(f.id); onClose(); store.addNotification('Follow-up deleted') }}>Delete</button>
          {!f.completed && <button className="btn-primary" onClick={() => { store.updateFinanceFollowUp(f.id,{completed:true}); onClose(); store.addNotification('Marked complete!') }}>Mark Complete</button>}
        </div>
      </div>
    </Modal>
  )
}

// ─── Shared add/edit forms ────────────────────────────────────────────────────

function FundraiserForm({ initial, onSave, onClose, title }) {
  const EMPTY = { name:'', type:'event', date:'', goal:'', raised:'', status:'planning', notes:'' }
  const [form, setForm] = useState(initial || EMPTY)
  return (
    <Modal open title={title} onClose={onClose} size="md">
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
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={() => form.name && onSave(form)}>Save</button>
        </div>
      </div>
    </Modal>
  )
}

function DonorForm({ initial, onSave, onClose, title }) {
  const EMPTY = { name:'', type:'individual', phone:'', email:'', monthlyAmt:'', totalGiven:'', lastGift:'', notes:'', status:'active' }
  const [form, setForm] = useState(initial || EMPTY)
  return (
    <Modal open title={title} onClose={onClose} size="md">
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
          <div className="form-group"><label>Phone</label><input value={form.phone} onChange={e=>setForm(d=>({...d,phone:formatPhone(e.target.value)}))} placeholder="(817) 555-0000" /></div>
          <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={e=>setForm(d=>({...d,email:e.target.value}))} /></div>
        </div>
        <div className="form-row-2">
          <div className="form-group"><label>Monthly Gift ($)</label><input type="number" value={form.monthlyAmt} onChange={e=>setForm(d=>({...d,monthlyAmt:e.target.value}))} placeholder="0" /></div>
          <div className="form-group"><label>Total Given ($)</label><input type="number" value={form.totalGiven} onChange={e=>setForm(d=>({...d,totalGiven:e.target.value}))} placeholder="0" /></div>
        </div>
        <div className="form-group"><label>Last Gift Date</label><input type="date" value={form.lastGift} onChange={e=>setForm(d=>({...d,lastGift:e.target.value}))} /></div>
        <div className="form-group"><label>Notes</label><textarea value={form.notes} onChange={e=>setForm(d=>({...d,notes:e.target.value}))} rows={3} /></div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={() => form.name && onSave(form)}>Save</button>
        </div>
      </div>
    </Modal>
  )
}

function GrantForm({ initial, onSave, onClose, title }) {
  const EMPTY = { name:'', amount:'', deadline:'', status:'planning', notes:'', submitted:'', awarded:'' }
  const [form, setForm] = useState(initial || EMPTY)
  return (
    <Modal open title={title} onClose={onClose} size="md">
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
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={() => form.name && onSave(form)}>Save</button>
        </div>
      </div>
    </Modal>
  )
}

function ConfirmDelete({ name, onConfirm, onClose }) {
  return (
    <Modal open title="Confirm Delete" onClose={onClose} size="sm">
      <p style={{color:'var(--gray-600)',fontSize:14}}>Permanently delete <strong>{name}</strong>? This cannot be undone.</p>
      <div className="modal-actions" style={{marginTop:16}}>
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-danger" onClick={onConfirm}>Delete</button>
      </div>
    </Modal>
  )
}

// ─── Main Finances page ───────────────────────────────────────────────────────

const TABS = ['Overview','Fundraisers','Donors','Grants','Follow-ups']

export default function Finances({ store }) {
  const [tab, setTab] = useState('Overview')
  const { fundraisers, donors, grants, financeFollowUps,
    addFundraiser, updateFundraiser, deleteFundraiser,
    addDonor, updateDonor, deleteDonor,
    addGrant, updateGrant, deleteGrant,
    addFinanceFollowUp, updateFinanceFollowUp,
    addNotification } = store

  // Global modal state — anything can open these
  const [viewFR, setViewFR] = useState(null)
  const [viewDonor, setViewDonor] = useState(null)
  const [viewGrant, setViewGrant] = useState(null)
  const [viewFU, setViewFU] = useState(null)
  const [editFR, setEditFR] = useState(null)     // { data } or 'new'
  const [editDonor, setEditDonor] = useState(null)
  const [editGrant, setEditGrant] = useState(null)
  const [delFR, setDelFR] = useState(null)
  const [delDonor, setDelDonor] = useState(null)
  const [delGrant, setDelGrant] = useState(null)
  // Overview stat-card deep-dive modals
  const [statModal, setStatModal] = useState(null) // 'raised' | 'monthly' | 'grants' | 'followups'
  // Finance FU form
  const [showFUForm, setShowFUForm] = useState(false)
  const [fuForm, setFuForm] = useState({ donorId:'', type:'call', date: new Date().toISOString().slice(0,10), note:'' })
  const [fuFilter, setFuFilter] = useState('pending')
  // Donors filter
  const [donorSearch, setDonorSearch] = useState('')

  // ── Helpers ────────────────────────────────────────────────────────────────
  function donorName(id) {
    const d = donors.find(x=>x.id===id)
    if (d) return d.name
    if (id?.startsWith('fundraiser:')) return 'Fundraiser Note'
    return 'Unknown'
  }

  function saveFR(data) {
    if (editFR === 'new') { addFundraiser(data); addNotification('Fundraiser added!') }
    else { updateFundraiser(editFR.id, data); addNotification('Fundraiser updated!') }
    setEditFR(null)
  }
  function saveDonor(data) {
    if (editDonor === 'new') { addDonor(data); addNotification('Donor added!') }
    else { updateDonor(editDonor.id, data); addNotification('Donor updated!') }
    setEditDonor(null)
  }
  function saveGrant(data) {
    if (editGrant === 'new') { addGrant(data); addNotification('Grant added!') }
    else { updateGrant(editGrant.id, data); addNotification('Grant updated!') }
    setEditGrant(null)
  }
  function saveFU() {
    if (!fuForm.donorId || !fuForm.note) return
    addFinanceFollowUp(fuForm)
    setShowFUForm(false)
    setFuForm({ donorId:'', type:'call', date: new Date().toISOString().slice(0,10), note:'' })
    addNotification('Follow-up logged!')
  }

  function exportCSV(rows, filename) {
    const csv = rows.map(r => r.map(c=>`"${String(c||'').replace(/"/g,'""')}"`).join(',')).join('\n')
    const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
    a.download = filename; a.click(); addNotification('Exported ' + filename)
  }
  function importCSV(e, handler) {
    const file = e.target.files[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = ev => { handler(ev.target.result); addNotification('Import complete!') }
    reader.readAsText(file); e.target.value = ''
  }

  // ── Overview data ──────────────────────────────────────────────────────────
  const totalGoal = fundraisers.reduce((s,f) => s + Number(f.goal||0), 0)
  const totalRaised = fundraisers.reduce((s,f) => s + Number(f.raised||0), 0)
  const monthlyRecurring = donors.filter(d=>d.status==='active').reduce((s,d) => s + Number(d.monthlyAmt||0), 0)
  const awardsTotal = grants.filter(g=>g.status==='awarded').reduce((s,g) => s + Number(g.amount||0), 0)
  const pendingFU = financeFollowUps.filter(f=>!f.completed).length

  const displayedFUs = financeFollowUps
    .filter(f => fuFilter==='all' || (fuFilter==='pending'?!f.completed:f.completed))
    .sort((a,b) => b.date.localeCompare(a.date))

  const filteredDonors = donors.filter(d => !donorSearch || d.name.toLowerCase().includes(donorSearch.toLowerCase()) || (d.email||'').toLowerCase().includes(donorSearch.toLowerCase()))

  return (
    <div className="finances-page">
      {/* ── Tab bar ─────────────────────────────────────────────────────────── */}
      <div className="fin-tabs">
        {TABS.map(t => (
          <button key={t} className={`fin-tab ${tab===t?'fin-tab--active':''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {/* ════ OVERVIEW ════════════════════════════════════════════════════════ */}
      {tab === 'Overview' && (
        <div className="fin-tab-content">
          {/* Stat cards — click for deep-dive modal */}
          <div className="fin-overview">
            <button className="fin-stat fin-stat--blue fin-stat--btn" onClick={() => setStatModal('raised')}>
              <div className="fin-stat-icon">🎯</div>
              <div className="fin-stat-val">{fmt$(totalRaised)}</div>
              <div className="fin-stat-label">Raised of {fmt$(totalGoal)} Goal</div>
              <div className="fin-stat-bar"><div style={{width: totalGoal ? Math.min(100,Math.round(totalRaised/totalGoal*100))+'%' : '0%'}} /></div>
              <div className="fin-stat-sub">{Math.round(totalRaised/totalGoal*100)||0}% to goal · tap for details</div>
            </button>
            <button className="fin-stat fin-stat--green fin-stat--btn" onClick={() => setStatModal('monthly')}>
              <div className="fin-stat-icon">🔁</div>
              <div className="fin-stat-val">{fmt$(monthlyRecurring)}</div>
              <div className="fin-stat-label">Monthly Recurring Income</div>
              <div className="fin-stat-sub">{donors.filter(d=>d.status==='active'&&d.monthlyAmt>0).length} active monthly donors · tap for details</div>
            </button>
            <button className="fin-stat fin-stat--amber fin-stat--btn" onClick={() => setStatModal('grants')}>
              <div className="fin-stat-icon">🏆</div>
              <div className="fin-stat-val">{fmt$(awardsTotal)}</div>
              <div className="fin-stat-label">Grants Awarded</div>
              <div className="fin-stat-sub">{grants.filter(g=>g.status==='awarded').length} awarded · {grants.filter(g=>g.status==='submitted').length} pending · tap for details</div>
            </button>
            <button className="fin-stat fin-stat--purple fin-stat--btn" onClick={() => setStatModal('followups')}>
              <div className="fin-stat-icon">📞</div>
              <div className="fin-stat-val">{pendingFU}</div>
              <div className="fin-stat-label">Fundraising Follow-ups</div>
              <div className="fin-stat-sub">Donor outreach needed · tap for details</div>
            </button>
          </div>

          <div className="fin-overview-grid">
            {/* Fundraiser progress */}
            <div className="fin-ov-card">
              <div className="fin-ov-card-header">
                <h3>Fundraiser Progress</h3>
                <button className="fin-link-btn" onClick={() => setTab('Fundraisers')}>View all →</button>
              </div>
              {fundraisers.map(f => {
                const p = pct(f)
                const color = STATUS_COLOR_FR[f.status] || '#999'
                return (
                  <div key={f.id} className="fin-ov-row fin-ov-row--clickable" onClick={() => setViewFR(f)}>
                    <div className="fin-ov-row-label">
                      {f.name}
                      <span className="fin-status-badge" style={{background:color+'22',color,fontSize:10,padding:'1px 7px',marginLeft:6}}>{f.status}</span>
                    </div>
                    <div className="fin-ov-bar-wrap">
                      <div className="fin-ov-bar"><div style={{width:p+'%',background:color,height:'100%',borderRadius:4,transition:'width .4s'}} /></div>
                      <span className="fin-ov-bar-pct">{p}%</span>
                    </div>
                    <span className="fin-ov-amount">{fmt$(f.raised)} / {fmt$(f.goal)}</span>
                  </div>
                )
              })}
              {fundraisers.length===0 && <div className="fin-empty">No fundraisers yet.</div>}
            </div>

            {/* Top donors */}
            <div className="fin-ov-card">
              <div className="fin-ov-card-header">
                <h3>Top Donors</h3>
                <button className="fin-link-btn" onClick={() => setTab('Donors')}>View all →</button>
              </div>
              {[...donors].sort((a,b) => Number(b.totalGiven)-Number(a.totalGiven)).slice(0,6).map(d => (
                <div key={d.id} className="fin-ov-donor-row fin-ov-row--clickable" onClick={() => setViewDonor(d)}>
                  <div>
                    <div className="fin-ov-donor-name">{TYPE_ICON_D[d.type]||'📌'} {d.name}</div>
                    <div style={{fontSize:11,color:'var(--gray-500)'}}>{d.type}{d.monthlyAmt>0?' · '+fmt$(d.monthlyAmt)+'/mo':''}</div>
                  </div>
                  <span className="fin-ov-donor-amt">{fmt$(d.totalGiven)}</span>
                </div>
              ))}
              {donors.length===0 && <div className="fin-empty">No donors yet.</div>}
            </div>

            {/* Grants pipeline */}
            <div className="fin-ov-card">
              <div className="fin-ov-card-header">
                <h3>Grants Pipeline</h3>
                <button className="fin-link-btn" onClick={() => setTab('Grants')}>View all →</button>
              </div>
              {grants.map(g => {
                const color = STATUS_COLOR_GR[g.status]
                return (
                  <div key={g.id} className="fin-ov-donor-row fin-ov-row--clickable" onClick={() => setViewGrant(g)}>
                    <div>
                      <div style={{fontWeight:600,fontSize:13}}>{STATUS_ICON_GR[g.status]} {g.name}</div>
                      <div style={{fontSize:11,color:'var(--gray-500)'}}>{g.status}{g.deadline ? ' · Due ' + fmtDate(g.deadline) : ''}</div>
                    </div>
                    <span className="fin-status-badge" style={{background:color+'22',color}}>{fmt$(g.amount)}</span>
                  </div>
                )
              })}
              {grants.length===0 && <div className="fin-empty">No grants yet.</div>}
            </div>

            {/* Pending follow-ups */}
            <div className="fin-ov-card">
              <div className="fin-ov-card-header">
                <h3>Fundraising Follow-ups</h3>
                <button className="fin-link-btn" onClick={() => setTab('Follow-ups')}>View all →</button>
              </div>
              {financeFollowUps.filter(f=>!f.completed).slice(0,6).map(f => {
                const donor = donors.find(d=>d.id===f.donorId)
                return (
                  <div key={f.id} className="fin-ov-donor-row fin-ov-row--clickable" onClick={() => setViewFU(f)}>
                    <div>
                      <div style={{fontWeight:600,fontSize:13}}>{FU_ICON[f.type]} {donor?.name||donorName(f.donorId)}</div>
                      <div style={{fontSize:11,color:'var(--gray-500)'}}>{f.type} · {fmtDate(f.date)}</div>
                    </div>
                    <button className="fin-btn fin-btn--ghost" style={{fontSize:11,padding:'3px 8px'}}
                      onClick={e=>{e.stopPropagation();updateFinanceFollowUp(f.id,{completed:true});addNotification('Marked done!')}}>Done</button>
                  </div>
                )
              })}
              {financeFollowUps.filter(f=>!f.completed).length===0 && <div className="fin-empty" style={{padding:'8px 0'}}>All caught up! 🎉</div>}
            </div>
          </div>
        </div>
      )}

      {/* ════ FUNDRAISERS ═════════════════════════════════════════════════════ */}
      {tab === 'Fundraisers' && (
        <div className="fin-tab-content">
          <div className="fin-tab-toolbar">
            <span className="fin-tab-count">{fundraisers.length} fundraisers</span>
            <div className="fin-tab-actions">
              <button className="fin-btn fin-btn--ghost" onClick={() => exportCSV([['Name','Type','Date','Goal','Raised','%','Status','Notes'],...fundraisers.map(f=>[f.name,f.type,f.date,f.goal,f.raised,pct(f)+'%',f.status,f.notes])],'fundraisers.csv')}>⬇ Export CSV</button>
              <label className="fin-btn fin-btn--ghost">⬆ Import CSV
                <input type="file" accept=".csv" style={{display:'none'}} onChange={e=>importCSV(e, text=>{
                  text.split('\n').slice(1).forEach(line=>{
                    const c=line.split(',').map(x=>x.replace(/^"|"$/g,'').replace(/""/g,'"'))
                    if(c[0]) addFundraiser({name:c[0],type:c[1]||'event',date:c[2]||'',goal:Number(c[3])||0,raised:Number(c[4])||0,status:c[6]||'planning',notes:c[7]||''})
                  })
                })}/>
              </label>
              <button className="fin-btn fin-btn--primary" onClick={() => setEditFR('new')}>+ Add Fundraiser</button>
            </div>
          </div>
          <div className="fin-cards">
            {fundraisers.map(f => (
              <div className="fin-fundraiser-card" key={f.id} onClick={() => setViewFR(f)} role="button" tabIndex={0}>
                <div className="fin-fc-header">
                  <div>
                    <div className="fin-fc-name">{f.name}</div>
                    <div className="fin-fc-meta">{f.type} · {fmtDate(f.date)}</div>
                  </div>
                  <span className="fin-status-badge" style={{background:STATUS_COLOR_FR[f.status]+'22',color:STATUS_COLOR_FR[f.status]}}>{f.status}</span>
                </div>
                <div className="fin-fc-amounts">
                  <span className="fin-fc-raised">{fmt$(f.raised)}</span>
                  <span className="fin-fc-goal"> of {fmt$(f.goal)}</span>
                </div>
                <div className="fin-progress-bar"><div className="fin-progress-fill" style={{width:pct(f)+'%',background:STATUS_COLOR_FR[f.status]}} /></div>
                <div className="fin-fc-pct">{pct(f)}% of goal · click for full details</div>
              </div>
            ))}
            {fundraisers.length===0 && <div className="fin-empty">No fundraisers yet.</div>}
          </div>
        </div>
      )}

      {/* ════ DONORS ══════════════════════════════════════════════════════════ */}
      {tab === 'Donors' && (
        <div className="fin-tab-content">
          <div className="fin-tab-toolbar">
            <input className="fin-search" placeholder="Search donors…" value={donorSearch} onChange={e=>setDonorSearch(e.target.value)} />
            <div className="fin-tab-actions">
              <button className="fin-btn fin-btn--ghost" onClick={() => exportCSV([['Name','Type','Phone','Email','Monthly','Total Given','Last Gift','Status','Notes'],...donors.map(d=>[d.name,d.type,d.phone,d.email,d.monthlyAmt,d.totalGiven,d.lastGift,d.status,d.notes])],'donors.csv')}>⬇ Export CSV</button>
              <label className="fin-btn fin-btn--ghost">⬆ Import CSV
                <input type="file" accept=".csv" style={{display:'none'}} onChange={e=>importCSV(e, text=>{
                  text.split('\n').slice(1).forEach(line=>{
                    const c=line.split(',').map(x=>x.replace(/^"|"$/g,'').replace(/""/g,'"'))
                    if(c[0]) addDonor({name:c[0],type:c[1]||'individual',phone:c[2]||'',email:c[3]||'',monthlyAmt:Number(c[4])||0,totalGiven:Number(c[5])||0,lastGift:c[6]||'',status:c[7]||'active',notes:c[8]||''})
                  })
                })}/>
              </label>
              <button className="fin-btn fin-btn--primary" onClick={() => setEditDonor('new')}>+ Add Donor</button>
            </div>
          </div>
          <div className="fin-table-wrap">
            <table className="fin-table">
              <thead><tr><th>Name</th><th>Type</th><th>Monthly</th><th>Total Given</th><th>Last Gift</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {filteredDonors.map(d => (
                  <tr key={d.id} className="fin-table-row" onClick={() => setViewDonor(d)}>
                    <td><span className="fin-donor-icon">{TYPE_ICON_D[d.type]||'📌'}</span> {d.name}</td>
                    <td>{d.type}</td>
                    <td>{d.monthlyAmt ? fmt$(d.monthlyAmt) : '—'}</td>
                    <td>{fmt$(d.totalGiven)}</td>
                    <td>{fmtDate(d.lastGift)}</td>
                    <td><span className={`fin-status-badge fin-status-${d.status}`}>{d.status}</span></td>
                    <td><button className="fin-row-btn" onClick={e=>{e.stopPropagation();setEditDonor(d)}}>Edit</button></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="fin-table-totals">
                  <td colSpan={2}>Totals — {filteredDonors.length} donor{filteredDonors.length!==1?'s':''}</td>
                  <td>
                    <div className="fin-total-label">Monthly Total</div>
                    <div className="fin-total-val">{fmt$(filteredDonors.reduce((s,d)=>s+Number(d.monthlyAmt||0),0))}</div>
                  </td>
                  <td>
                    <div className="fin-total-label">Total</div>
                    <div className="fin-total-val">{fmt$(filteredDonors.reduce((s,d)=>s+Number(d.totalGiven||0),0))}</div>
                  </td>
                  <td colSpan={3}></td>
                </tr>
              </tfoot>
            </table>
            {filteredDonors.length===0 && <div className="fin-empty">No donors found.</div>}
          </div>
        </div>
      )}

      {/* ════ GRANTS ══════════════════════════════════════════════════════════ */}
      {tab === 'Grants' && (
        <div className="fin-tab-content">
          <div className="fin-tab-toolbar">
            <span className="fin-tab-count">{grants.length} grants tracked</span>
            <button className="fin-btn fin-btn--primary" onClick={() => setEditGrant('new')}>+ Add Grant</button>
          </div>
          <div className="fin-cards fin-cards--grants">
            {grants.map(g => (
              <div className="fin-grant-card" key={g.id} onClick={() => setViewGrant(g)} role="button" tabIndex={0}>
                <div className="fin-gc-top">
                  <span className="fin-gc-status-icon">{STATUS_ICON_GR[g.status]}</span>
                  <span className="fin-status-badge" style={{background:STATUS_COLOR_GR[g.status]+'22',color:STATUS_COLOR_GR[g.status]}}>{g.status}</span>
                </div>
                <div className="fin-gc-name">{g.name}</div>
                <div className="fin-gc-amount">{fmt$(g.amount)}</div>
                <div className="fin-gc-meta">
                  {g.deadline && <span>Deadline: {fmtDate(g.deadline)}</span>}
                  {g.submitted && <span>Submitted: {fmtDate(g.submitted)}</span>}
                  <span style={{fontSize:10,color:'var(--gray-400)'}}>Click for full details</span>
                </div>
              </div>
            ))}
            {grants.length===0 && <div className="fin-empty">No grants tracked yet.</div>}
          </div>
        </div>
      )}

      {/* ════ FOLLOW-UPS ══════════════════════════════════════════════════════ */}
      {tab === 'Follow-ups' && (
        <div className="fin-tab-content">
          <div className="fin-tab-toolbar">
            <div className="fin-filter-tabs">
              {['pending','completed','all'].map(f => (
                <button key={f} className={`fin-filter-tab ${fuFilter===f?'fin-filter-tab--on':''}`} onClick={() => setFuFilter(f)}>{f}</button>
              ))}
            </div>
            <button className="fin-btn fin-btn--primary" onClick={() => setShowFUForm(true)}>+ Log Follow-up</button>
          </div>
          <div className="fin-fu-list">
            {displayedFUs.map(f => (
              <div className="fin-fu-list-row" key={f.id} onClick={() => setViewFU(f)} role="button" tabIndex={0}>
                <span className="fin-fu-type-icon">{FU_ICON[f.type]||'📌'}</span>
                <div className="fin-fu-list-body">
                  <div className="fin-fu-list-donor">{donorName(f.donorId)}</div>
                  <div className="fin-fu-list-note">{f.note.slice(0,90)}{f.note.length>90?'…':''}</div>
                </div>
                <div className="fin-fu-list-right">
                  <span>{fmtDate(f.date)}</span>
                  <span className={f.completed ? 'badge-done' : 'fin-badge-pending'}>{f.completed ? 'Done' : 'Pending'}</span>
                </div>
              </div>
            ))}
            {displayedFUs.length===0 && <div className="fin-empty">No follow-ups in this view.</div>}
          </div>
        </div>
      )}

      {/* ════ GLOBAL MODALS ═══════════════════════════════════════════════════ */}

      {/* ════ STAT-CARD DEEP-DIVE MODALS ════════════════════════════════════ */}

      {/* Raised / Fundraiser breakdown */}
      {statModal === 'raised' && (
        <Modal open title="Fundraiser Progress — Full Breakdown" onClose={() => setStatModal(null)} size="lg">
          <div className="fin-detail">
            <div className="fin-statdive-summary">
              <div className="fin-sds-item"><div className="fin-sds-label">Total Goal</div><div className="fin-sds-val">{fmt$(totalGoal)}</div></div>
              <div className="fin-sds-item fin-sds-item--blue"><div className="fin-sds-label">Total Raised</div><div className="fin-sds-val">{fmt$(totalRaised)}</div></div>
              <div className="fin-sds-item"><div className="fin-sds-label">Remaining</div><div className="fin-sds-val">{fmt$(totalGoal - totalRaised)}</div></div>
              <div className="fin-sds-item fin-sds-item--green"><div className="fin-sds-label">Overall %</div><div className="fin-sds-val">{totalGoal ? Math.round(totalRaised/totalGoal*100) : 0}%</div></div>
            </div>
            {fundraisers.map(f => {
              const p = pct(f); const color = STATUS_COLOR_FR[f.status]
              return (
                <div key={f.id} className="fin-sds-row" onClick={() => { setStatModal(null); setViewFR(f) }}>
                  <div className="fin-sds-row-top">
                    <div>
                      <div className="fin-sds-row-name">{f.name}</div>
                      <div className="fin-sds-row-meta">{f.type} · {fmtDate(f.date)}</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <span className="fin-status-badge" style={{background:color+'22',color}}>{f.status}</span>
                      <div style={{fontSize:12,marginTop:4,color:'var(--gray-500)'}}>{fmt$(f.raised)} of {fmt$(f.goal)}</div>
                    </div>
                  </div>
                  <div className="fin-progress-bar" style={{height:10}}>
                    <div className="fin-progress-fill" style={{width:p+'%',background:color}} />
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--gray-400)',marginTop:2}}>
                    <span>{p}% of goal</span>
                    <span>Remaining: {fmt$(Number(f.goal||0)-Number(f.raised||0))}</span>
                  </div>
                </div>
              )
            })}
            <div className="modal-actions" style={{marginTop:16}}>
              <button className="btn-secondary" onClick={() => setStatModal(null)}>Close</button>
              <button className="btn-primary" onClick={() => { setStatModal(null); setTab('Fundraisers') }}>Open Fundraisers Tab →</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Monthly recurring deep-dive */}
      {statModal === 'monthly' && (
        <Modal open title="Monthly Recurring Income — Donor Breakdown" onClose={() => setStatModal(null)} size="lg">
          <div className="fin-detail">
            <div className="fin-statdive-summary">
              <div className="fin-sds-item fin-sds-item--blue"><div className="fin-sds-label">Monthly Total</div><div className="fin-sds-val">{fmt$(monthlyRecurring)}</div></div>
              <div className="fin-sds-item fin-sds-item--green"><div className="fin-sds-label">Annual Projection</div><div className="fin-sds-val">{fmt$(monthlyRecurring * 12)}</div></div>
              <div className="fin-sds-item"><div className="fin-sds-label">Monthly Donors</div><div className="fin-sds-val">{donors.filter(d=>d.status==='active'&&d.monthlyAmt>0).length}</div></div>
              <div className="fin-sds-item"><div className="fin-sds-label">All Donors</div><div className="fin-sds-val">{donors.length}</div></div>
            </div>
            {[...donors].filter(d=>Number(d.monthlyAmt||0)>0).sort((a,b)=>Number(b.monthlyAmt)-Number(a.monthlyAmt)).map(d => (
              <div key={d.id} className="fin-sds-row" onClick={() => { setStatModal(null); setViewDonor(d) }}>
                <div className="fin-sds-row-top">
                  <div>
                    <div className="fin-sds-row-name">{TYPE_ICON_D[d.type]||'📌'} {d.name}</div>
                    <div className="fin-sds-row-meta">{d.type} · Last gift {fmtDate(d.lastGift)}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:18,fontWeight:800,color:'#1B4FA3'}}>{fmt$(d.monthlyAmt)}<span style={{fontSize:11,fontWeight:400,color:'var(--gray-400)'}}>/mo</span></div>
                    <div style={{fontSize:11,color:'var(--gray-400)'}}>= {fmt$(d.monthlyAmt*12)}/yr · {fmt$(d.totalGiven)} lifetime</div>
                  </div>
                </div>
                <div className="fin-progress-bar" style={{height:6}}>
                  <div className="fin-progress-fill" style={{width: monthlyRecurring ? Math.round(d.monthlyAmt/monthlyRecurring*100)+'%' : '0%', background:'#3AAB35'}} />
                </div>
                <div style={{fontSize:11,color:'var(--gray-400)',marginTop:2}}>{monthlyRecurring ? Math.round(d.monthlyAmt/monthlyRecurring*100) : 0}% of monthly total</div>
              </div>
            ))}
            {donors.filter(d=>Number(d.monthlyAmt||0)>0).length===0 && <div className="fin-empty">No monthly donors yet.</div>}
            <div className="modal-actions" style={{marginTop:16}}>
              <button className="btn-secondary" onClick={() => setStatModal(null)}>Close</button>
              <button className="btn-primary" onClick={() => { setStatModal(null); setTab('Donors') }}>Open Donors Tab →</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Grants deep-dive */}
      {statModal === 'grants' && (
        <Modal open title="Grants — Full Pipeline" onClose={() => setStatModal(null)} size="lg">
          <div className="fin-detail">
            <div className="fin-statdive-summary">
              <div className="fin-sds-item fin-sds-item--green"><div className="fin-sds-label">Awarded</div><div className="fin-sds-val">{fmt$(awardsTotal)}</div></div>
              <div className="fin-sds-item fin-sds-item--blue"><div className="fin-sds-label">Submitted / Pending</div><div className="fin-sds-val">{fmt$(grants.filter(g=>g.status==='submitted').reduce((s,g)=>s+Number(g.amount||0),0))}</div></div>
              <div className="fin-sds-item"><div className="fin-sds-label">In Planning</div><div className="fin-sds-val">{fmt$(grants.filter(g=>g.status==='planning').reduce((s,g)=>s+Number(g.amount||0),0))}</div></div>
              <div className="fin-sds-item"><div className="fin-sds-label">Total Tracked</div><div className="fin-sds-val">{grants.length}</div></div>
            </div>
            {['awarded','submitted','planning','declined'].map(status => {
              const group = grants.filter(g=>g.status===status)
              if (!group.length) return null
              return (
                <div key={status} style={{marginBottom:12}}>
                  <div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.5px',color:'var(--gray-400)',marginBottom:6}}>{STATUS_ICON_GR[status]} {status} ({group.length})</div>
                  {group.map(g => (
                    <div key={g.id} className="fin-sds-row" onClick={() => { setStatModal(null); setViewGrant(g) }}>
                      <div className="fin-sds-row-top">
                        <div>
                          <div className="fin-sds-row-name">{g.name}</div>
                          <div className="fin-sds-row-meta">
                            {g.deadline ? 'Deadline: ' + fmtDate(g.deadline) : ''}
                            {g.submitted ? ' · Submitted: ' + fmtDate(g.submitted) : ''}
                            {g.awarded ? ' · Awarded: ' + fmtDate(g.awarded) : ''}
                          </div>
                          {g.notes && <div className="fin-sds-row-meta" style={{marginTop:2,fontStyle:'italic'}}>{g.notes.slice(0,100)}{g.notes.length>100?'…':''}</div>}
                        </div>
                        <div style={{fontSize:18,fontWeight:800,color:STATUS_COLOR_GR[status],flexShrink:0}}>{fmt$(g.amount)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
            <div className="modal-actions" style={{marginTop:16}}>
              <button className="btn-secondary" onClick={() => setStatModal(null)}>Close</button>
              <button className="btn-primary" onClick={() => { setStatModal(null); setTab('Grants') }}>Open Grants Tab →</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Pending follow-ups deep-dive */}
      {statModal === 'followups' && (
        <Modal open title="Pending Donor Follow-ups" onClose={() => setStatModal(null)} size="lg">
          <div className="fin-detail">
            <div className="fin-statdive-summary">
              <div className="fin-sds-item fin-sds-item--blue"><div className="fin-sds-label">Pending</div><div className="fin-sds-val">{pendingFU}</div></div>
              <div className="fin-sds-item fin-sds-item--green"><div className="fin-sds-label">Completed</div><div className="fin-sds-val">{financeFollowUps.filter(f=>f.completed).length}</div></div>
              <div className="fin-sds-item"><div className="fin-sds-label">Total Logged</div><div className="fin-sds-val">{financeFollowUps.length}</div></div>
              <div className="fin-sds-item"><div className="fin-sds-label">Completion Rate</div><div className="fin-sds-val">{financeFollowUps.length ? Math.round(financeFollowUps.filter(f=>f.completed).length/financeFollowUps.length*100) : 0}%</div></div>
            </div>
            {financeFollowUps.filter(f=>!f.completed).sort((a,b)=>a.date.localeCompare(b.date)).map(f => {
              const donor = donors.find(d=>d.id===f.donorId)
              return (
                <div key={f.id} className="fin-sds-row" onClick={() => { setStatModal(null); setViewFU(f) }}>
                  <div className="fin-sds-row-top">
                    <div style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                      <span style={{fontSize:24}}>{FU_ICON[f.type]||'📌'}</span>
                      <div>
                        <div className="fin-sds-row-name">{donor?.name || 'Unknown Donor'}</div>
                        <div className="fin-sds-row-meta">{f.type} · {fmtDate(f.date)}</div>
                        <div style={{fontSize:13,color:'var(--gray-700)',marginTop:4,lineHeight:1.4}}>{f.note}</div>
                        {donor?.phone && <div style={{fontSize:12,color:'var(--gray-500)',marginTop:4}}>📞 {formatPhone(donor.phone)}{donor.email ? ' · ✉️ '+donor.email : ''}</div>}
                      </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:6,flexShrink:0}}>
                      {donor?.phone && f.type==='call' && <a className="fin-btn fin-btn--primary" href={`tel:${donor.phone}`} onClick={e=>e.stopPropagation()} style={{fontSize:12}}>📞 Call</a>}
                      {donor?.email && f.type==='email' && <a className="fin-btn fin-btn--primary" href={`mailto:${donor.email}`} onClick={e=>e.stopPropagation()} style={{fontSize:12}}>✉️ Email</a>}
                      {donor?.phone && f.type==='text' && <a className="fin-btn fin-btn--primary" href={`sms:${donor.phone}`} onClick={e=>e.stopPropagation()} style={{fontSize:12}}>💬 Text</a>}
                      <button className="fin-btn fin-btn--ghost" style={{fontSize:12}} onClick={e=>{e.stopPropagation();updateFinanceFollowUp(f.id,{completed:true});addNotification('Marked done!')}}>✓ Done</button>
                    </div>
                  </div>
                </div>
              )
            })}
            {pendingFU === 0 && <div className="fin-empty">All caught up! No pending follow-ups. 🎉</div>}
            <div className="modal-actions" style={{marginTop:16}}>
              <button className="btn-secondary" onClick={() => setStatModal(null)}>Close</button>
              <button className="btn-primary" onClick={() => { setStatModal(null); setTab('Follow-ups') }}>Open Follow-ups Tab →</button>
            </div>
          </div>
        </Modal>
      )}

      {viewFR && <FundraiserModal f={viewFR} onClose={() => setViewFR(null)} onEdit={f=>{setEditFR(f);setViewFR(null)}} onDelete={f=>{setDelFR(f);setViewFR(null)}} store={store} />}
      {viewDonor && <DonorModal d={viewDonor} onClose={() => setViewDonor(null)} onEdit={d=>{setEditDonor(d);setViewDonor(null)}} onDelete={d=>{setDelDonor(d);setViewDonor(null)}} store={store} />}
      {viewGrant && <GrantModal g={viewGrant} onClose={() => setViewGrant(null)} onEdit={g=>{setEditGrant(g);setViewGrant(null)}} onDelete={g=>{setDelGrant(g);setViewGrant(null)}} />}
      {viewFU && <FUModal f={viewFU} donors={donors} onClose={() => setViewFU(null)} store={store} />}

      {editFR && <FundraiserForm title={editFR==='new'?'Add Fundraiser':'Edit Fundraiser'} initial={editFR==='new'?null:editFR} onSave={saveFR} onClose={() => setEditFR(null)} />}
      {editDonor && <DonorForm title={editDonor==='new'?'Add Donor':'Edit Donor'} initial={editDonor==='new'?null:editDonor} onSave={saveDonor} onClose={() => setEditDonor(null)} />}
      {editGrant && <GrantForm title={editGrant==='new'?'Add Grant':'Edit Grant'} initial={editGrant==='new'?null:editGrant} onSave={saveGrant} onClose={() => setEditGrant(null)} />}

      {delFR && <ConfirmDelete name={delFR.name} onClose={() => setDelFR(null)} onConfirm={() => { deleteFundraiser(delFR.id); setDelFR(null); addNotification('Fundraiser deleted') }} />}
      {delDonor && <ConfirmDelete name={delDonor.name} onClose={() => setDelDonor(null)} onConfirm={() => { deleteDonor(delDonor.id); setDelDonor(null); addNotification('Donor deleted') }} />}
      {delGrant && <ConfirmDelete name={delGrant.name} onClose={() => setDelGrant(null)} onConfirm={() => { deleteGrant(delGrant.id); setDelGrant(null); addNotification('Grant deleted') }} />}

      {showFUForm && (
        <Modal open title="Log Follow-up" onClose={() => setShowFUForm(false)} size="sm">
          <div className="fin-form">
            <div className="form-group"><label>Donor*</label>
              <select value={fuForm.donorId} onChange={e=>setFuForm(d=>({...d,donorId:e.target.value}))}>
                <option value="">— Select donor —</option>
                {donors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div className="form-row-2">
              <div className="form-group"><label>Type</label>
                <select value={fuForm.type} onChange={e=>setFuForm(d=>({...d,type:e.target.value}))}>
                  {FU_TYPES.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Date</label><input type="date" value={fuForm.date} onChange={e=>setFuForm(d=>({...d,date:e.target.value}))} /></div>
            </div>
            <div className="form-group"><label>Note*</label><textarea value={fuForm.note} onChange={e=>setFuForm(d=>({...d,note:e.target.value}))} rows={3} placeholder="What happened / what to discuss?" /></div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowFUForm(false)}>Cancel</button>
              <button className="btn-primary" onClick={saveFU}>Log Follow-up</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
