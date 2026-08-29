import { useState } from 'react'
import Modal from '../components/Modal'
import './Events.css'

const TYPE_COLOR = { club:'#1B4FA3', campaigners:'#3AAB35', camp:'#d97706', special:'#854883' }
const TYPE_LABEL = { club:'Club Night', campaigners:'Campaigners', camp:'Camp', special:'Special Event' }
const EMPTY_EVENT = { title:'', type:'club', program:'YoungLife', date:'', time:'19:30', location:'', description:'', leaderId:'' }

function fmtDate(d) {
  const dt = new Date(d + 'T00:00:00')
  return dt.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})
}

export default function Events({ store }) {
  const { events, leaders, students, getEventAttendance, addEvent, updateEvent, deleteEvent, addNotification } = store
  const [filter, setFilter] = useState('upcoming')
  const [filterType, setFilterType] = useState('All')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY_EVENT)
  const [editId, setEditId] = useState(null)
  const [viewEvent, setViewEvent] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const today = new Date().toISOString().slice(0,10)

  const filtered = [...events]
    .filter(e => {
      if (filter === 'upcoming' && e.date < today) return false
      if (filter === 'past' && e.date >= today) return false
      if (filterType !== 'All' && e.type !== filterType) return false
      return true
    })
    .sort((a,b) => filter === 'past' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date))

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
        <button className="btn-primary" onClick={openAdd}>+ Add Event</button>
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
    </div>
  )
}
