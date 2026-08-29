import { useState } from 'react'
import Modal from '../components/Modal'
import { GRADES } from '../data/initialData'
import './Students.css'

const EMPTY_STUDENT = {
  firstName:'', lastName:'', grade:'9th', school:'', phone:'', email:'',
  parentName:'', parentPhone:'', parentEmail:'', program:'YoungLife',
  leaderId:'', notes:'', tags:[],
}

const TAGS = ['interested','campaigners','camp','leadership','multiplier','new','follow-up']

export default function Students({ store }) {
  const { students, leaders, schools: storeSchools, addStudent, updateStudent, deleteStudent, addNotification } = store
  const [search, setSearch] = useState('')
  const [filterProgram, setFilterProgram] = useState('All')
  const [filterGrade, setFilterGrade] = useState('All')
  const [filterSchool, setFilterSchool] = useState('All')
  const [modal, setModal] = useState(null) // null | 'add' | 'edit' | 'view'
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(EMPTY_STUDENT)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = students.filter(s => {
    const name = `${s.firstName} ${s.lastName}`.toLowerCase()
    if (search && !name.includes(search.toLowerCase()) && !s.school.toLowerCase().includes(search.toLowerCase())) return false
    if (filterProgram !== 'All' && s.program !== filterProgram) return false
    if (filterGrade !== 'All' && s.grade !== filterGrade) return false
    if (filterSchool !== 'All' && s.school !== filterSchool) return false
    return true
  }).sort((a,b) => a.lastName.localeCompare(b.lastName))

  const schools = storeSchools && storeSchools.length ? storeSchools : [...new Set(students.map(s => s.school))].sort()

  function openAdd() { setForm(EMPTY_STUDENT); setModal('add') }
  function openEdit(s) { setSelected(s); setForm({ ...s }); setModal('edit') }
  function openView(s) { setSelected(s); setModal('view') }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  function toggleTag(tag) {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag]
    }))
  }

  function handleSave() {
    if (!form.firstName || !form.lastName) return
    if (modal === 'add') {
      addStudent(form)
      addNotification(`${form.firstName} ${form.lastName} added!`)
    } else {
      updateStudent(selected.id, form)
      addNotification(`${form.firstName} ${form.lastName} updated!`)
    }
    setModal(null)
  }

  function handleDelete(id) {
    deleteStudent(id)
    setConfirmDelete(null)
    setModal(null)
    addNotification('Student removed', 'error')
  }

  const leaderName = (id) => {
    const l = leaders.find(l => l.id === id)
    return l ? `${l.firstName} ${l.lastName}` : '—'
  }

  const TAG_COLORS = {
    interested:'#1B4FA3', campaigners:'#3AAB35', camp:'#F3C546',
    leadership:'#854883', multiplier:'#FF837D', new:'#3AAB35', 'follow-up':'#E8392A',
  }

  return (
    <div className="students-page">
      {/* Toolbar */}
      <div className="page-toolbar">
        <div className="toolbar-left">
          <input
            className="search-input"
            placeholder="Search students…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="filter-select" value={filterProgram} onChange={e => setFilterProgram(e.target.value)}>
            <option value="All">All Programs</option>
            <option>YoungLife</option>
            <option>WyldLife</option>
          </select>
          <select className="filter-select" value={filterGrade} onChange={e => setFilterGrade(e.target.value)}>
            <option value="All">All Grades</option>
            {GRADES.map(g => <option key={g}>{g}</option>)}
          </select>
          <select className="filter-select" value={filterSchool} onChange={e => setFilterSchool(e.target.value)}>
            <option value="All">All Schools</option>
            {schools.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Add Student</button>
      </div>

      <div className="students-count">{filtered.length} student{filtered.length !== 1 ? 's' : ''}</div>

      {/* Table */}
      <div className="table-wrap">
        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Grade</th>
              <th>School</th>
              <th>Program</th>
              <th>Leader</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td>
                  <button className="student-name-btn" onClick={() => openView(s)}>
                    <div className="student-avatar" style={{background: s.program === 'YoungLife' ? '#1B4FA3' : '#3AAB35'}}>
                      {s.firstName[0]}{s.lastName[0]}
                    </div>
                    <div>
                      <div className="student-fullname">{s.firstName} {s.lastName}</div>
                      <div className="student-contact">{s.phone || s.email || '—'}</div>
                    </div>
                  </button>
                </td>
                <td><span className="grade-pill">{s.grade}</span></td>
                <td className="td-school">{s.school}</td>
                <td>
                  <span className={`program-pill program-pill--${s.program === 'YoungLife' ? 'yl' : 'wl'}`}>
                    {s.program}
                  </span>
                </td>
                <td className="td-leader">{leaderName(s.leaderId)}</td>
                <td>
                  <div className="tag-list">
                    {(s.tags || []).slice(0,2).map(t => (
                      <span key={t} className="tag-chip" style={{background: (TAG_COLORS[t]||'#999')+'22', color: TAG_COLORS[t]||'#999'}}>
                        {t}
                      </span>
                    ))}
                    {(s.tags||[]).length > 2 && <span className="tag-chip tag-chip--more">+{s.tags.length-2}</span>}
                  </div>
                </td>
                <td>
                  <div className="row-actions">
                    <button className="icon-btn" title="Edit" onClick={() => openEdit(s)}>✏️</button>
                    <button className="icon-btn icon-btn--danger" title="Delete" onClick={() => setConfirmDelete(s)}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="empty-table">No students match your filters.</div>}
      </div>

      {/* Add / Edit Modal */}
      {(modal === 'add' || modal === 'edit') && (
        <Modal title={modal === 'add' ? 'Add Student' : 'Edit Student'} onClose={() => setModal(null)} size="lg">
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
                <label>Grade</label>
                <select name="grade" value={form.grade} onChange={handleChange}>
                  {GRADES.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Program</label>
                <select name="program" value={form.program} onChange={handleChange}>
                  <option>YoungLife</option>
                  <option>WyldLife</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>School</label>
              <select name="school" value={form.school} onChange={handleChange}>
                <option value="">— Select School —</option>
                {(storeSchools || []).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>Student Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="(913) 555-0000" />
              </div>
              <div className="form-group">
                <label>Student Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="student@email.com" />
              </div>
            </div>
            <div className="form-section-label">Parent / Guardian</div>
            <div className="form-group">
              <label>Parent Name</label>
              <input name="parentName" value={form.parentName} onChange={handleChange} placeholder="Parent full name" />
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>Parent Phone</label>
                <input name="parentPhone" value={form.parentPhone} onChange={handleChange} placeholder="(913) 555-0000" />
              </div>
              <div className="form-group">
                <label>Parent Email</label>
                <input name="parentEmail" type="email" value={form.parentEmail} onChange={handleChange} placeholder="parent@email.com" />
              </div>
            </div>
            <div className="form-group">
              <label>Assigned Leader</label>
              <select name="leaderId" value={form.leaderId} onChange={handleChange}>
                <option value="">— Unassigned —</option>
                {leaders.map(l => <option key={l.id} value={l.id}>{l.firstName} {l.lastName}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Tags</label>
              <div className="tag-selector">
                {TAGS.map(t => (
                  <button
                    key={t} type="button"
                    className={`tag-sel-btn ${(form.tags||[]).includes(t) ? 'tag-sel-btn--on' : ''}`}
                    onClick={() => toggleTag(t)}
                  >{t}</button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Any notes about this student…" />
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>
                {modal === 'add' ? 'Add Student' : 'Save Changes'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* View Modal */}
      {modal === 'view' && selected && (
        <Modal title="Student Profile" onClose={() => setModal(null)} size="lg">
          <div className="student-profile">
            <div className="profile-header">
              <div className="profile-avatar" style={{background: selected.program === 'YoungLife' ? '#1B4FA3' : '#3AAB35'}}>
                {selected.firstName[0]}{selected.lastName[0]}
              </div>
              <div>
                <h2 className="profile-name">{selected.firstName} {selected.lastName}</h2>
                <div className="profile-meta">{selected.grade} · {selected.school}</div>
                <span className={`program-pill program-pill--${selected.program === 'YoungLife' ? 'yl' : 'wl'}`}>{selected.program}</span>
              </div>
            </div>

            <div className="profile-grid">
              <div className="profile-section">
                <div className="profile-section-title">Student Contact</div>
                <div className="profile-field">
                  <span>📞</span>
                  {selected.phone ? <a href={`tel:${selected.phone}`}>{selected.phone}</a> : '—'}
                </div>
                <div className="profile-field">
                  <span>✉️</span>
                  {selected.email ? <a href={`mailto:${selected.email}`}>{selected.email}</a> : '—'}
                </div>
              </div>
              <div className="profile-section">
                <div className="profile-section-title">Parent / Guardian</div>
                <div className="profile-field"><span>👤</span>{selected.parentName || '—'}</div>
                <div className="profile-field">
                  <span>📞</span>
                  {selected.parentPhone ? <a href={`tel:${selected.parentPhone}`}>{selected.parentPhone}</a> : '—'}
                </div>
                <div className="profile-field">
                  <span>✉️</span>
                  {selected.parentEmail ? <a href={`mailto:${selected.parentEmail}`}>{selected.parentEmail}</a> : '—'}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section-title">Leader</div>
              <div className="profile-field"><span>🛡️</span>{leaderName(selected.leaderId)}</div>
            </div>

            {(selected.tags||[]).length > 0 && (
              <div className="profile-section">
                <div className="profile-section-title">Tags</div>
                <div className="tag-list">
                  {selected.tags.map(t => (
                    <span key={t} className="tag-chip" style={{background:(TAG_COLORS[t]||'#999')+'22', color:TAG_COLORS[t]||'#999'}}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            {selected.notes && (
              <div className="profile-section">
                <div className="profile-section-title">Notes</div>
                <p className="profile-notes">{selected.notes}</p>
              </div>
            )}

            <div className="profile-section">
              <div className="profile-section-title">Attendance History</div>
              {store.getStudentAttendance(selected.id).length === 0
                ? <p className="empty-msg-sm">No attendance records yet</p>
                : store.getStudentAttendance(selected.id).map(a => {
                    const ev = store.events.find(e => e.id === a.eventId)
                    if (!ev) return null
                    return (
                      <div key={a.id} className="att-record">
                        <span className={a.present ? 'att-present' : 'att-absent'}>{a.present ? '✓' : '✗'}</span>
                        <span>{ev.title} — {ev.date}</span>
                        {a.notes && <span className="att-note">· {a.notes}</span>}
                      </div>
                    )
                  })
              }
            </div>

            <div className="profile-section">
              <div className="profile-section-title">Follow-up History</div>
              {store.getStudentFollowUps(selected.id).length === 0
                ? <p className="empty-msg-sm">No follow-up records yet</p>
                : store.getStudentFollowUps(selected.id).map(f => (
                    <div key={f.id} className="fu-record">
                      <span className="fu-type">{f.type}</span>
                      <span>{f.date} — {f.note}</span>
                    </div>
                  ))
              }
            </div>

            <div className="modal-actions">
              <button className="btn-danger" onClick={() => setConfirmDelete(selected)}>Delete Student</button>
              <button className="btn-secondary" onClick={() => setModal(null)}>Close</button>
              <button className="btn-primary" onClick={() => openEdit(selected)}>Edit</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirm Delete */}
      {confirmDelete && (
        <Modal title="Delete Student" onClose={() => setConfirmDelete(null)} size="sm">
          <p style={{marginBottom:20}}>Are you sure you want to remove <strong>{confirmDelete.firstName} {confirmDelete.lastName}</strong>? This cannot be undone.</p>
          <div className="modal-actions">
            <button className="btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
            <button className="btn-danger" onClick={() => handleDelete(confirmDelete.id)}>Yes, Delete</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
