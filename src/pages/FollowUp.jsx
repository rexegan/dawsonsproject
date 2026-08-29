import { useState } from 'react'
import Modal from '../components/Modal'
import './FollowUp.css'

const TYPE_ICONS = { call:'📞', email:'✉️', text:'💬', visit:'🤝' }
const TYPE_COLORS = { call:'#1B4FA3', email:'#3AAB35', text:'#854883', visit:'#d97706' }

const EMPTY_FU = { studentId:'', type:'text', date:new Date().toISOString().slice(0,10), note:'', leaderId:'', completed:false }

export default function FollowUp({ store }) {
  const { students, leaders, followUps, addFollowUp, updateFollowUp, deleteFollowUp, addNotification } = store
  const [filterType, setFilterType] = useState('All')
  const [filterStudent, setFilterStudent] = useState('')
  const [filterLeader, setFilterLeader] = useState('All')
  const [filterDone, setFilterDone] = useState('pending')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY_FU)
  const [editId, setEditId] = useState(null)
  const [emailModal, setEmailModal] = useState(null)
  const [emailForm, setEmailForm] = useState({ to:'', subject:'', body:'' })

  const filtered = [...followUps]
    .filter(f => {
      if (filterType !== 'All' && f.type !== filterType) return false
      if (filterLeader !== 'All' && f.leaderId !== filterLeader) return false
      if (filterStudent) {
        const s = students.find(s => s.id === f.studentId)
        if (!s || !`${s.firstName} ${s.lastName}`.toLowerCase().includes(filterStudent.toLowerCase())) return false
      }
      if (filterDone === 'pending' && f.completed) return false
      if (filterDone === 'done' && !f.completed) return false
      return true
    })
    .sort((a,b) => b.date.localeCompare(a.date))

  function openAdd(preStudentId) {
    setForm({ ...EMPTY_FU, studentId: preStudentId || '', date: new Date().toISOString().slice(0,10) })
    setEditId(null)
    setModal('form')
  }

  function openEdit(f) {
    setForm({ ...f })
    setEditId(f.id)
    setModal('form')
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleSave() {
    if (!form.studentId || !form.note) return
    if (editId) {
      updateFollowUp(editId, form)
      addNotification('Follow-up updated!')
    } else {
      addFollowUp(form)
      addNotification('Follow-up logged!')
    }
    setModal(null)
  }

  function openEmail(f) {
    const student = students.find(s => s.id === f.studentId)
    if (!student) return
    const to = student.parentEmail || student.email || ''
    setEmailForm({
      to,
      subject: `Young Life — Checking in on ${student.firstName}`,
      body: `Hi ${student.parentName || student.firstName},\n\nI wanted to reach out and check in on ${student.firstName}...\n\nWould love to connect!\n\nIn Christ,\n${leaders.find(l=>l.id===f.leaderId)?.firstName || 'Your YL Leader'}`
    })
    setEmailModal({ student, followUp: f })
  }

  function handleEmailSend() {
    const mailto = `mailto:${emailForm.to}?subject=${encodeURIComponent(emailForm.subject)}&body=${encodeURIComponent(emailForm.body)}`
    window.open(mailto)
    if (emailModal?.followUp) {
      updateFollowUp(emailModal.followUp.id, { completed: true })
      addNotification('Email opened & follow-up marked done!')
    }
    setEmailModal(null)
  }

  const studentName = (id) => {
    const s = students.find(s => s.id === id)
    return s ? `${s.firstName} ${s.lastName}` : '—'
  }

  const pendingCount = followUps.filter(f => !f.completed).length

  return (
    <div className="followup-page">
      {/* Summary bar */}
      <div className="fu-summary">
        <div className="fu-stat">
          <div className="fu-stat-val fu-stat-val--red">{pendingCount}</div>
          <div className="fu-stat-label">Pending</div>
        </div>
        <div className="fu-stat">
          <div className="fu-stat-val">{followUps.filter(f=>f.completed).length}</div>
          <div className="fu-stat-label">Completed</div>
        </div>
        <div className="fu-stat">
          <div className="fu-stat-val">{followUps.filter(f=>f.type==='call').length}</div>
          <div className="fu-stat-label">Calls</div>
        </div>
        <div className="fu-stat">
          <div className="fu-stat-val">{followUps.filter(f=>f.type==='email').length}</div>
          <div className="fu-stat-label">Emails</div>
        </div>
        <div className="fu-stat">
          <div className="fu-stat-val">{followUps.filter(f=>f.type==='text').length}</div>
          <div className="fu-stat-label">Texts</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="page-toolbar">
        <div className="toolbar-left">
          <input className="search-input" placeholder="Search student…" value={filterStudent} onChange={e => setFilterStudent(e.target.value)} />
          <select className="filter-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="All">All Types</option>
            <option value="call">Call</option>
            <option value="email">Email</option>
            <option value="text">Text</option>
            <option value="visit">Visit</option>
          </select>
          <select className="filter-select" value={filterLeader} onChange={e => setFilterLeader(e.target.value)}>
            <option value="All">All Leaders</option>
            {leaders.map(l => <option key={l.id} value={l.id}>{l.firstName} {l.lastName}</option>)}
          </select>
          <select className="filter-select" value={filterDone} onChange={e => setFilterDone(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending Only</option>
            <option value="done">Completed</option>
          </select>
        </div>
        <button className="btn-primary" onClick={() => openAdd()}>+ Log Follow-up</button>
      </div>

      {/* List */}
      <div className="fu-list">
        {filtered.length === 0 && (
          <div className="fu-empty">No follow-ups match your filters. {pendingCount === 0 ? '🎉 All caught up!' : ''}</div>
        )}
        {filtered.map(f => {
          const student = students.find(s => s.id === f.studentId)
          const leader = leaders.find(l => l.id === f.leaderId)
          if (!student) return null
          return (
            <div key={f.id} className={`fu-card ${f.completed ? 'fu-card--done' : ''}`}>
              <div className="fu-type-icon" style={{background: TYPE_COLORS[f.type]+'18', color: TYPE_COLORS[f.type]}}>
                {TYPE_ICONS[f.type]}
              </div>
              <div className="fu-body">
                <div className="fu-top">
                  <span className="fu-student">{student.firstName} {student.lastName}</span>
                  <span className="fu-type-badge" style={{background:TYPE_COLORS[f.type]+'18', color:TYPE_COLORS[f.type]}}>
                    {f.type}
                  </span>
                  {f.completed && <span className="fu-done-badge">✓ Done</span>}
                </div>
                <p className="fu-note">{f.note}</p>
                <div className="fu-meta">
                  <span>📅 {f.date}</span>
                  {leader && <span>👤 {leader.firstName} {leader.lastName}</span>}
                  <span>📱 {student.phone || '—'}</span>
                </div>
              </div>
              <div className="fu-actions">
                {!f.completed && (
                  <>
                    {f.type === 'call' && student.phone && (
                      <a href={`tel:${student.phone}`} className="fu-action-btn fu-action-btn--call" title="Call now">📞</a>
                    )}
                    {f.type === 'email' && (
                      <button className="fu-action-btn fu-action-btn--email" onClick={() => openEmail(f)} title="Send email">✉️</button>
                    )}
                    {f.type === 'text' && student.phone && (
                      <a href={`sms:${student.phone}`} className="fu-action-btn fu-action-btn--text" title="Send text">💬</a>
                    )}
                    <button
                      className="fu-action-btn fu-action-btn--done"
                      title="Mark complete"
                      onClick={() => { updateFollowUp(f.id, { completed: true }); addNotification('Marked complete!') }}
                    >✓</button>
                  </>
                )}
                <button className="fu-action-btn" title="Edit" onClick={() => openEdit(f)}>✏️</button>
                <button className="fu-action-btn fu-action-btn--del" title="Delete" onClick={() => { deleteFollowUp(f.id); addNotification('Deleted','error') }}>🗑</button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Log / Edit Modal */}
      {modal === 'form' && (
        <Modal title={editId ? 'Edit Follow-up' : 'Log Follow-up'} onClose={() => setModal(null)} size="md">
          <div className="form-grid">
            <div className="form-group">
              <label>Student *</label>
              <select name="studentId" value={form.studentId} onChange={handleChange} required>
                <option value="">— Select Student —</option>
                {[...students].sort((a,b)=>a.lastName.localeCompare(b.lastName)).map(s => (
                  <option key={s.id} value={s.id}>{s.firstName} {s.lastName} ({s.grade} · {s.school})</option>
                ))}
              </select>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>Type</label>
                <select name="type" value={form.type} onChange={handleChange}>
                  <option value="text">Text</option>
                  <option value="call">Phone Call</option>
                  <option value="email">Email</option>
                  <option value="visit">In-Person Visit</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Leader</label>
              <select name="leaderId" value={form.leaderId} onChange={handleChange}>
                <option value="">— Select Leader —</option>
                {leaders.map(l => <option key={l.id} value={l.id}>{l.firstName} {l.lastName}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Notes *</label>
              <textarea name="note" value={form.note} onChange={handleChange} rows={4} placeholder="What happened? What was discussed? Any prayer requests?" />
            </div>
            <div className="form-group form-group--check">
              <label>
                <input type="checkbox" name="completed" checked={form.completed} onChange={handleChange} />
                Mark as completed
              </label>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>{editId ? 'Save' : 'Log Follow-up'}</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Email Compose Modal */}
      {emailModal && (
        <Modal title={`Email — ${emailModal.student.firstName} ${emailModal.student.lastName}`} onClose={() => setEmailModal(null)} size="md">
          <div className="form-grid">
            <div className="form-group">
              <label>To</label>
              <input value={emailForm.to} onChange={e => setEmailForm(f => ({...f, to: e.target.value}))} placeholder="Email address" />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input value={emailForm.subject} onChange={e => setEmailForm(f => ({...f, subject: e.target.value}))} />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea value={emailForm.body} onChange={e => setEmailForm(f => ({...f, body: e.target.value}))} rows={8} />
            </div>
            <p className="email-note">This will open your default email client with the message pre-filled.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setEmailModal(null)}>Cancel</button>
              <button className="btn-primary" onClick={handleEmailSend}>Open in Email App ↗</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
