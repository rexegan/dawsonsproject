import { useState, useRef, useEffect } from 'react'
import Modal from '../components/Modal'
import { formatPhone } from '../utils/phone'
import './Leaders.css'

const ROLES = ['Area Director','YoungLife Leader','WyldLife Leader','Campaigners Leader','Committee Member','Volunteer','Staff']
const COLORS = ['#E8392A','#1B4FA3','#3AAB35','#854883','#d97706','#0891b2','#FF837D','#F3C546']
const EMPTY = { firstName:'', lastName:'', role:'YoungLife Leader', program:'YoungLife', phone:'', email:'', bio:'', schools:[], initials:'', color:'#1B4FA3' }

const DEFAULT_COMMITTEE = [
  { id:'cm1', name:'Monica Farum', role:'Committee Member', phone:'(817) 247-7495', email:'monicafaram@gmail.com', initials:'MF', color:'#854883' },
  { id:'cm2', name:'Rex Russell', role:'Committee Chair', phone:'(817) 689-4560', email:'rex@russellwg.com', initials:'RR', color:'#1B4FA3' },
  { id:'cm3', name:'Brenda Henderson', role:'Committee Member', phone:'(817) 781-3628', email:'auntb22@sbcglobal.net', initials:'BH', color:'#0891b2' },
]

function load(key, def) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def } catch { return def } }
function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)) } catch {} }

function applyOrder(leaders, orderIds) {
  const known = orderIds.map(id => leaders.find(l => l.id === id)).filter(Boolean)
  const rest = leaders.filter(l => !orderIds.includes(l.id))
  return [...known, ...rest]
}

function moveItem(arr, fromId, toId) {
  const from = arr.findIndex(x => x.id === fromId)
  const to = arr.findIndex(x => x.id === toId)
  if (from === -1 || to === -1 || from === to) return arr
  const next = [...arr]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

export default function Leaders({ store }) {
  const { leaders, students, followUps, schools: storeSchools, addLeader, updateLeader, deleteLeader, addNotification } = store

  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [filterProgram, setFilterProgram] = useState('All')
  const [order, setOrder] = useState(() => load('yl_leaders_order', []))
  const [committee, setCommittee] = useState(() => load('yl_committee_order', DEFAULT_COMMITTEE))

  // Keep order in sync when leaders are added/removed
  useEffect(() => {
    setOrder(prev => {
      const valid = prev.filter(id => leaders.find(l => l.id === id))
      const newIds = leaders.filter(l => !prev.includes(l.id)).map(l => l.id)
      return [...valid, ...newIds]
    })
  }, [leaders.map(l => l.id).join(',')])  // eslint-disable-line

  const sorted = applyOrder(leaders, order)
  const filtered = sorted.filter(l => filterProgram === 'All' || l.program === filterProgram || l.program === 'Both')

  // Drag state for leader cards
  const leaderDragId = useRef(null)
  const leaderDidDrag = useRef(false)

  function leaderDragStart(e, id) {
    leaderDragId.current = id
    leaderDidDrag.current = false
    e.dataTransfer.effectAllowed = 'move'
    setTimeout(() => { if (e.target) e.target.style.opacity = '0.5' }, 0)
  }
  function leaderDragOver(e, id) {
    e.preventDefault()
    if (!leaderDragId.current || leaderDragId.current === id) return
    leaderDidDrag.current = true
    setOrder(prev => {
      const next = moveItem(applyOrder(leaders, prev), leaderDragId.current, id).map(l => l.id)
      leaderDragId.current = id
      return next
    })
  }
  function leaderDragEnd(e) {
    if (e.target) e.target.style.opacity = ''
    save('yl_leaders_order', order)
    leaderDragId.current = null
  }

  // Drag state for committee
  const cmDragId = useRef(null)
  const cmDidDrag = useRef(false)

  function cmDragStart(e, id) {
    cmDragId.current = id
    cmDidDrag.current = false
    e.dataTransfer.effectAllowed = 'move'
    setTimeout(() => { if (e.target) e.target.style.opacity = '0.5' }, 0)
  }
  function cmDragOver(e, id) {
    e.preventDefault()
    if (!cmDragId.current || cmDragId.current === id) return
    cmDidDrag.current = true
    setCommittee(prev => {
      const next = moveItem(prev, cmDragId.current, id)
      cmDragId.current = id
      return next
    })
  }
  function cmDragEnd(e) {
    if (e.target) e.target.style.opacity = ''
    save('yl_committee_order', committee)
    cmDragId.current = null
  }

  function openAdd() { setForm(EMPTY); setEditId(null); setModal('form') }
  function openEdit(l) { setForm({...l, schools: l.schools||[]}); setEditId(l.id); setModal('form') }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: name === 'phone' ? formatPhone(value) : value }))
  }

  function toggleSchool(school) {
    setForm(f => ({
      ...f,
      schools: f.schools.includes(school) ? f.schools.filter(s=>s!==school) : [...f.schools, school]
    }))
  }

  function handleSave() {
    if (!form.firstName || !form.lastName) return
    const initials = (form.firstName[0]||'') + (form.lastName[0]||'')
    const payload = { ...form, initials }
    if (editId) { updateLeader(editId, payload); addNotification('Leader updated!') }
    else { addLeader(payload); addNotification('Leader added!') }
    setModal(null)
  }

  function handleDelete(id) {
    deleteLeader(id)
    setConfirmDelete(null)
    setModal(null)
    addNotification('Leader removed','error')
  }

  function leaderStudents(id) { return students.filter(s => s.leaderId === id) }
  function leaderFollowUps(id) { return followUps.filter(f => f.leaderId === id) }

  return (
    <div className="leaders-page">
      <div className="page-toolbar">
        <div className="toolbar-left">
          <select className="filter-select" value={filterProgram} onChange={e => setFilterProgram(e.target.value)}>
            <option value="All">All Programs</option>
            <option>YoungLife</option>
            <option>WyldLife</option>
          </select>
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Add Leader</button>
      </div>

      <div className="leaders-grid">
        {filtered.map(l => {
          const myStudents = leaderStudents(l.id)
          const myFU = leaderFollowUps(l.id)
          return (
            <div key={l.id} className="leader-card"
              draggable
              onDragStart={e => leaderDragStart(e, l.id)}
              onDragOver={e => leaderDragOver(e, l.id)}
              onDrop={e => e.preventDefault()}
              onDragEnd={leaderDragEnd}
              onClick={() => { if (!leaderDidDrag.current) openEdit(l) }}
            >
              <div className="leader-drag-handle" title="Drag to reorder">⠿</div>
              <div className="leader-card-top">
                <div className="leader-avatar-lg" style={{background: l.color}}>{l.initials}</div>
                <div>
                  <h4 className="leader-card-name">{l.firstName} {l.lastName}</h4>
                  <p className="leader-card-role">{l.role}</p>
                  <span className={`program-pill program-pill--${l.program==='YoungLife'?'yl':l.program==='WyldLife'?'wl':'both'}`}>{l.program}</span>
                </div>
              </div>
              {l.bio && <p className="leader-card-bio">{l.bio}</p>}
              <div className="leader-card-stats">
                <div className="leader-stat"><span className="ls-val">{myStudents.length}</span><span className="ls-lbl">Students</span></div>
                <div className="leader-stat"><span className="ls-val">{myFU.filter(f=>!f.completed).length}</span><span className="ls-lbl">Pending<br/>Follow-up</span></div>
                <div className="leader-stat"><span className="ls-val">{(l.schools||[]).length}</span><span className="ls-lbl">Schools</span></div>
              </div>
              <div className="leader-card-contact">
                {l.phone && <a href={`tel:${l.phone}`} className="contact-link" onClick={e=>e.stopPropagation()}>📞 {formatPhone(l.phone)}</a>}
                {l.email && <a href={`mailto:${l.email}`} className="contact-link" onClick={e=>e.stopPropagation()}>✉️ {l.email}</a>}
              </div>
            </div>
          )
        })}
      </div>

      {/* Johnson County YL Committee */}
      <div className="leaders-committee">
        <h3 className="leaders-committee-title">Johnson County Young Life Committee</h3>
        <div className="leaders-committee-grid">
          {committee.map(m => (
            <div key={m.id} className="committee-card"
              draggable
              onDragStart={e => cmDragStart(e, m.id)}
              onDragOver={e => cmDragOver(e, m.id)}
              onDrop={e => e.preventDefault()}
              onDragEnd={cmDragEnd}
              style={{cursor:'grab'}}
            >
              <div style={{color:'var(--gray-300)',fontSize:18,lineHeight:1,cursor:'grab',userSelect:'none',paddingRight:4,alignSelf:'center'}}>⠿</div>
              <div className="leader-avatar-lg" style={{background:m.color,width:44,height:44,fontSize:15,flexShrink:0}}>{m.initials}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:15,color:'var(--gray-900)'}}>{m.name}</div>
                <div style={{fontSize:12,color:'var(--gray-500)',marginBottom:8}}>{m.role}</div>
                <div style={{display:'flex',flexDirection:'column',gap:4}}>
                  <a href={`tel:${m.phone}`} className="contact-link">📞 {m.phone}</a>
                  <a href={`mailto:${m.email}`} className="contact-link">✉️ {m.email}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal === 'form' && (
        <Modal title={editId ? 'Edit Leader' : 'Add Leader'} onClose={() => setModal(null)} size="lg">
          <div className="form-grid">
            <div className="form-row-2">
              <div className="form-group">
                <label>First Name *</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" />
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>Role</label>
                <select name="role" value={form.role} onChange={handleChange}>
                  {ROLES.map(r => <option key={r}>{r}</option>)}
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
                <label>Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="(913) 555-0000" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="leader@younglife.org" />
              </div>
            </div>
            <div className="form-group">
              <label>Avatar Color</label>
              <div className="color-picker">
                {COLORS.map(c => (
                  <button key={c} type="button" className={`color-swatch ${form.color===c?'color-swatch--on':''}`}
                    style={{background:c}} onClick={() => setForm(f => ({...f, color:c}))} />
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Schools</label>
              <div className="school-selector">
                {(storeSchools || []).map(s => (
                  <button key={s} type="button"
                    className={`tag-sel-btn ${(form.schools||[]).includes(s)?'tag-sel-btn--on':''}`}
                    onClick={() => toggleSchool(s)}
                  >{s}</button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} placeholder="A short bio…" />
            </div>
            <div className="modal-actions">
              {editId && <button className="btn-danger" onClick={() => setConfirmDelete({id:editId})}>Delete</button>}
              <button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>{editId?'Save':'Add Leader'}</button>
            </div>
          </div>
        </Modal>
      )}

      {confirmDelete && (
        <Modal title="Delete Leader" onClose={() => setConfirmDelete(null)} size="sm">
          <p style={{marginBottom:20}}>Delete this leader? Their student assignments will remain but they'll be unlinked.</p>
          <div className="modal-actions">
            <button className="btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
            <button className="btn-danger" onClick={() => handleDelete(confirmDelete.id)}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
