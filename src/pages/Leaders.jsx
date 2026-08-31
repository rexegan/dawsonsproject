import { useState } from 'react'
import Modal from '../components/Modal'
import { formatPhone } from '../utils/phone'
import './Leaders.css'

const ROLES = ['Area Director','YoungLife Leader','WyldLife Leader','Campaigners Leader','Volunteer','Staff']
const COLORS = ['#E8392A','#1B4FA3','#3AAB35','#854883','#d97706','#0891b2','#FF837D','#F3C546']
const EMPTY = { firstName:'', lastName:'', role:'YoungLife Leader', program:'YoungLife', phone:'', email:'', bio:'', schools:[], initials:'', color:'#1B4FA3' }

export default function Leaders({ store }) {
  const { leaders, students, followUps, schools: storeSchools, getStudentAttendance, addLeader, updateLeader, deleteLeader, addNotification } = store
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [viewLeader, setViewLeader] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [filterProgram, setFilterProgram] = useState('All')

  const filtered = leaders.filter(l => filterProgram === 'All' || l.program === filterProgram || l.program === 'Both')

  function openAdd() { setForm(EMPTY); setEditId(null); setModal('form') }
  function openEdit(l) { setForm({...l, schools: l.schools||[]}); setEditId(l.id); setModal('form') }
  function openView(l) { setViewLeader(l); setModal('view') }

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
    if (editId) {
      updateLeader(editId, payload)
      addNotification('Leader updated!')
    } else {
      addLeader(payload)
      addNotification('Leader added!')
    }
    setModal(null)
  }

  function handleDelete(id) {
    deleteLeader(id)
    setConfirmDelete(null)
    setModal(null)
    addNotification('Leader removed','error')
  }

  function leaderStudents(leaderId) {
    return students.filter(s => s.leaderId === leaderId)
  }

  function leaderFollowUps(leaderId) {
    return followUps.filter(f => f.leaderId === leaderId)
  }

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
            <div key={l.id} className="leader-card" onClick={() => openView(l)}>
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
          {[
            { name: 'Monica Farum', role: 'Committee Member', phone: '(817) 247-7495', email: 'monicafaram@gmail.com', initials: 'MF', color: '#854883' },
            { name: 'Rex Russell', role: 'Committee Chair', phone: '(817) 689-4560', email: 'rex@russellwg.com', initials: 'RR', color: '#1B4FA3' },
          ].map(m => (
            <div key={m.name} className="committee-card">
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

      {/* Add/Edit Modal */}
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

      {/* View Modal */}
      {modal === 'view' && viewLeader && (
        <Modal title="Leader Profile" onClose={() => setModal(null)} size="lg">
          <div className="leader-profile">
            <div className="profile-header">
              <div className="leader-avatar-lg" style={{background: viewLeader.color}}>{viewLeader.initials}</div>
              <div>
                <h2 className="profile-name">{viewLeader.firstName} {viewLeader.lastName}</h2>
                <p style={{color:'var(--gray-500)',marginBottom:6}}>{viewLeader.role}</p>
                <span className={`program-pill program-pill--${viewLeader.program==='YoungLife'?'yl':viewLeader.program==='WyldLife'?'wl':'both'}`}>{viewLeader.program}</span>
              </div>
            </div>
            {viewLeader.bio && <p style={{fontSize:14,color:'var(--gray-600)',lineHeight:1.6}}>{viewLeader.bio}</p>}
            <div className="profile-grid">
              <div className="profile-section">
                <div className="profile-section-title">Contact</div>
                <div className="profile-field"><span>📞</span><a href={`tel:${viewLeader.phone}`}>{viewLeader.phone ? formatPhone(viewLeader.phone) : '—'}</a></div>
                <div className="profile-field"><span>✉️</span><a href={`mailto:${viewLeader.email}`}>{viewLeader.email||'—'}</a></div>
              </div>
              <div className="profile-section">
                <div className="profile-section-title">Schools</div>
                <div className="tag-list" style={{gap:6}}>
                  {(viewLeader.schools||[]).map(s => <span key={s} className="school-chip-sm">{s}</span>)}
                  {(viewLeader.schools||[]).length===0 && <span style={{color:'var(--gray-400)',fontSize:13}}>None assigned</span>}
                </div>
              </div>
            </div>
            <div className="profile-section">
              <div className="profile-section-title">Assigned Students ({leaderStudents(viewLeader.id).length})</div>
              {leaderStudents(viewLeader.id).map(s => (
                <div key={s.id} className="leader-student-row">
                  <div className="student-avatar" style={{background:s.program==='YoungLife'?'#1B4FA3':'#3AAB35',width:28,height:28,fontSize:10}}>
                    {s.firstName[0]}{s.lastName[0]}
                  </div>
                  <span>{s.firstName} {s.lastName}</span>
                  <span style={{color:'var(--gray-400)',fontSize:12}}>{s.grade} · {s.school}</span>
                </div>
              ))}
              {leaderStudents(viewLeader.id).length === 0 && <p className="empty-msg-sm">No students assigned</p>}
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setModal(null)}>Close</button>
              <button className="btn-primary" onClick={() => openEdit(viewLeader)}>Edit</button>
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
