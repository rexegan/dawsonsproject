import { useState, useMemo } from 'react'
import Modal from '../components/Modal'
import { FORM_DOCS } from './FormDocuments'
import { formatPhone } from '../utils/phone'
import './ParentConnect.css'

const BLANK_PARENT = {
  firstName: '', lastName: '', cell: '', email: '',
  homeAddress: '', city: '', state: 'TX', zip: '',
  employer: '', workPhone: '', workAddress: '',
  birthday: '', spouseName: '', spouseCell: '', spouseEmail: '',
  spouseEmployer: '',
  emergencyContact: '', emergencyPhone: '',
  medicalNotes: '', allergies: '', doctorName: '', doctorPhone: '',
  preferredContact: 'Cell', notes: '',
  // linked student info (read from store)
  studentId: '', program: '',
}

const PERMISSION_FORMS = [
  {
    id: 'pf1', name: 'General Medical Release', status: 'required',
    event: 'All Events / Year-Round',
    desc: 'Authorizes Young Life leaders to seek emergency medical care for the student if a parent cannot be reached. Required before any student participates.',
    fields: 'Student full name, DOB, parent/guardian name & phone, insurance carrier & policy #, primary physician name & phone, known allergies, current medications, medical conditions, emergency contact, parent signature & date',
  },
  {
    id: 'pf2', name: 'General Permission Slip', status: 'required',
    event: 'Club Nights / Weekly Programs',
    desc: 'Blanket permission for a student to attend regular Young Life club nights and on-campus events throughout the school year.',
    fields: 'Student name, school, grade, parent/guardian name, phone, email, permission acknowledgment, parent signature & date',
  },
  {
    id: 'pf3', name: 'Summer Camp Permission & Release', status: 'required',
    event: 'Summer Camp (Frontier Ranch / Crooked Creek / Pine Cove)',
    desc: 'Comprehensive release for overnight summer camp. Covers travel, activities, medical care, photo release, and financial terms.',
    fields: 'Student name, DOB, grade, school, home address, parent/guardian name, cell, email, second emergency contact, insurance info, physician, allergies, medications, dietary restrictions, swim ability, activity restrictions, photo release consent, financial agreement, parent signature & date',
  },
  {
    id: 'pf4', name: 'Day Trip Permission Slip', status: 'recommended',
    event: 'One-Day Outings (bowling, sports events, etc.)',
    desc: 'Used for any single-day off-campus outing. Fill in the specific event details before distributing.',
    fields: 'Event name & date, departure & return time, location, transportation method, cost, student name, parent/guardian name & phone, emergency contact, permission acknowledgment, parent signature',
  },
  {
    id: 'pf5', name: 'Overnight Trip Permission Slip', status: 'required',
    event: 'Overnights / Fall/Spring Weekends',
    desc: 'Required for any overnight away event that is not summer camp. Covers lodging, supervision, and medical release.',
    fields: 'Event name, dates, location, chaperones, student name, DOB, parent/guardian name, cell, emergency contact, insurance info, physician, known allergies/medications, permission acknowledgment, parent signature & date',
  },
  {
    id: 'pf6', name: 'Photo & Video Release', status: 'recommended',
    event: 'All Events',
    desc: 'Permission to photograph or film the student and use images in Young Life social media, print materials, and fundraising.',
    fields: 'Student name, parent/guardian name, consent choice (yes/no), usage scope, parent signature & date',
  },
  {
    id: 'pf7', name: 'Campaigners / Bible Study Consent', status: 'optional',
    event: 'Weekly Campaigners / Small Group',
    desc: 'Informs parents that their student is attending a Christian small group Bible study and obtains permission for ongoing participation.',
    fields: 'Student name, school, grade, parent/guardian name & phone, program description acknowledgment, parent signature & date',
  },
  {
    id: 'pf8', name: 'Golf Tournament Volunteer Waiver', status: 'optional',
    event: 'Annual Golf Tournament',
    desc: 'Liability waiver for adult volunteers assisting with the golf tournament or other Young Life fundraising events.',
    fields: 'Volunteer full name, DOB, address, phone, email, liability waiver acknowledgment, signature & date',
  },
  {
    id: 'pf9', name: 'Camp Scholarship Financial Agreement', status: 'optional',
    event: 'Summer Camp (Scholarship Recipients)',
    desc: 'Acknowledges that a scholarship has been awarded and outlines any remaining family contribution, payment plan, and cancellation policy.',
    fields: 'Student name, camp name & dates, total camp cost, scholarship amount, family portion, payment schedule, cancellation terms, parent signature & date',
  },
  {
    id: 'pf10', name: 'Social Media Follow / DM Consent', status: 'recommended',
    event: 'Year-Round Digital Outreach',
    desc: 'Informs parents that Young Life leaders may follow or message their student on Instagram or other platforms for outreach purposes, and obtains consent.',
    fields: 'Student name, grade, parent/guardian name, platforms listed (Instagram, text), leader name, consent acknowledgment, parent signature & date',
  },
]

const CONTACT_PREFS = ['Cell', 'Email', 'Text', 'Work Phone']

const PHONE_KEYS = ['cell','workPhone','spouseCell','emergencyPhone','doctorPhone']

function ParentForm({ data, onChange }) {
  const fields = [
    ['First Name', 'firstName'], ['Last Name', 'lastName'],
    ['Cell Phone', 'cell'], ['Email', 'email'],
    ['Home Address', 'homeAddress'], ['City', 'city'], ['State', 'state'], ['ZIP', 'zip'],
    ['Employer', 'employer'], ['Work Phone', 'workPhone'],
    ['Birthday', 'birthday'], ['Preferred Contact', 'preferredContact'],
    ['Spouse Name', 'spouseName'], ['Spouse Cell', 'spouseCell'],
    ['Spouse Email', 'spouseEmail'], ['Spouse Employer', 'spouseEmployer'],
    ['Emergency Contact', 'emergencyContact'], ['Emergency Phone', 'emergencyPhone'],
    ['Allergies', 'allergies'], ['Medical Notes', 'medicalNotes'],
    ['Doctor Name', 'doctorName'], ['Doctor Phone', 'doctorPhone'],
    ['Notes', 'notes'],
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {fields.map(([label, key]) => {
        const isWide = ['homeAddress','medicalNotes','allergies','notes'].includes(key)
        const isSelect = key === 'preferredContact'
        return (
          <div key={key} style={isWide ? { gridColumn: '1 / -1' } : {}}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 3 }}>{label}</div>
            {isSelect ? (
              <select className="settings-input" value={data[key] || ''} onChange={e => onChange(key, e.target.value)}>
                {CONTACT_PREFS.map(o => <option key={o}>{o}</option>)}
              </select>
            ) : isWide ? (
              <textarea className="settings-input" rows={2} style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical' }} value={data[key] || ''} onChange={e => onChange(key, e.target.value)} />
            ) : (
              <input className="settings-input" style={{ width: '100%', boxSizing: 'border-box' }} value={data[key] || ''} onChange={e => onChange(key, PHONE_KEYS.includes(key) ? formatPhone(e.target.value) : e.target.value)} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function ParentConnect({ store }) {
  const [tab, setTab] = useState('directory')
  const [search, setSearch] = useState('')
  const [progFilter, setProgFilter] = useState('All')
  const [viewParent, setViewParent] = useState(null)   // { parent, studentName }
  const [editingParent, setEditingParent] = useState(null)
  const [editDraft, setEditDraft] = useState(null)
  const [addingParent, setAddingParent] = useState(false)
  const [newDraft, setNewDraft] = useState({ ...BLANK_PARENT })
  const [parents, setParents] = useState([])           // manually added parent records
  const [viewForm, setViewForm] = useState(null)
  const [addingForm, setAddingForm] = useState(false)
  const [forms, setForms] = useState(PERMISSION_FORMS)
  const [formDraft, setFormDraft] = useState({ name: '', status: 'required', event: '', desc: '', fields: '' })

  // Build parent directory from students in store
  const students = store?.students || []

  const derivedParents = useMemo(() => {
    const seen = new Set()
    const list = []
    students.forEach(s => {
      if (!s.parentName) return
      const key = `${s.parentName}__${s.parentPhone || s.parentEmail}`
      if (!seen.has(key)) {
        seen.add(key)
        list.push({
          _derived: true,
          _key: key,
          studentId: s.id,
          studentName: `${s.firstName} ${s.lastName}`,
          program: s.program || 'YoungLife',
          firstName: (s.parentName || '').split(' ')[0] || '',
          lastName: (s.parentName || '').split(' ').slice(1).join(' ') || '',
          cell: s.parentPhone || '',
          email: s.parentEmail || '',
          homeAddress: '', city: '', state: 'TX', zip: '',
          employer: '', workPhone: '',
          birthday: '', spouseName: '', spouseCell: '', spouseEmail: '', spouseEmployer: '',
          emergencyContact: '', emergencyPhone: '',
          medicalNotes: '', allergies: '', doctorName: '', doctorPhone: '',
          preferredContact: 'Cell', notes: '',
        })
      }
    })
    return list
  }, [students])

  // Merge derived + manually added (manually added override by _key if present)
  const allParents = useMemo(() => {
    const manualKeys = new Set(parents.map(p => p._key))
    return [
      ...parents,
      ...derivedParents.filter(p => !manualKeys.has(p._key)),
    ]
  }, [parents, derivedParents])

  const filtered = useMemo(() => allParents.filter(p => {
    const name = `${p.firstName} ${p.lastName} ${p.studentName || ''}`.toLowerCase()
    const matchSearch = !search || name.includes(search.toLowerCase()) || (p.cell || '').includes(search) || (p.email || '').toLowerCase().includes(search.toLowerCase())
    const matchProg = progFilter === 'All' || p.program === progFilter
    return matchSearch && matchProg
  }), [allParents, search, progFilter])

  function saveEdit() {
    const key = editDraft._key
    setParents(ps => {
      const existing = ps.find(p => p._key === key)
      if (existing) return ps.map(p => p._key === key ? { ...editDraft } : p)
      return [...ps, { ...editDraft, _derived: false }]
    })
    setEditingParent(null)
    setEditDraft(null)
  }

  function addParent() {
    const key = `${newDraft.firstName}_${newDraft.lastName}__${newDraft.cell || newDraft.email}`
    setParents(ps => [...ps, { ...newDraft, _key: key, _derived: false, studentName: '' }])
    setAddingParent(false)
    setNewDraft({ ...BLANK_PARENT })
  }

  function removeParent(key) {
    setParents(ps => ps.filter(p => p._key !== key))
    // If derived, filtering from manual list has no effect — we can't remove derived ones without adding an exclusion list
  }

  return (
    <div className="parent-page">
      <div className="parent-tabs">
        {[
          { id: 'directory', label: '👨‍👩‍👧 Parent Directory' },
          { id: 'forms', label: '📋 Permission Slips & Forms' },
        ].map(t => (
          <button key={t.id} className={`parent-tab ${tab === t.id ? 'parent-tab--active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* PARENT DIRECTORY */}
      {tab === 'directory' && (
        <div className="parent-section">
          <div className="parent-toolbar">
            <input className="parent-search" placeholder="Search by name, phone, or email…" value={search} onChange={e => setSearch(e.target.value)} />
            {['All', 'YoungLife', 'WyldLife'].map(p => (
              <button key={p} className={`level-chip ${progFilter === p ? 'level-chip--active' : ''}`} onClick={() => setProgFilter(p)}>{p}</button>
            ))}
            <button className="btn-primary" style={{ fontSize: 13, padding: '6px 14px', marginLeft: 'auto' }} onClick={() => { setNewDraft({ ...BLANK_PARENT }); setAddingParent(true) }}>+ Add Parent</button>
          </div>

          <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{filtered.length} parent{filtered.length !== 1 ? 's' : ''}</div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--gray-400)', fontSize: 14 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>👨‍👩‍👧</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>No parents found</div>
              <div>Parents are pulled from your student roster. Add students first, or add a parent manually above.</div>
            </div>
          ) : (
            <div className="parent-grid">
              {filtered.map(p => (
                <button key={p._key} className="parent-card" onClick={() => setViewParent(p)}>
                  <div className="parent-card-header">
                    <span className="parent-name">{p.firstName} {p.lastName}</span>
                    <span className={`parent-program-chip parent-program-chip--${(p.program || 'younglife').toLowerCase()}`}>{p.program || 'YoungLife'}</span>
                  </div>
                  {p.studentName && <div className="parent-card-student">Student: {p.studentName}</div>}
                  <div className="parent-card-contact">
                    {p.cell && <span>📱 {formatPhone(p.cell)}</span>}
                    {p.email && <span>✉️ {p.email}</span>}
                    {p.homeAddress && <span>🏠 {p.homeAddress}{p.city ? `, ${p.city}` : ''}</span>}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PERMISSION FORMS */}
      {tab === 'forms' && (
        <div className="parent-section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <p style={{ fontSize: 14, color: 'var(--gray-500)', margin: 0 }}>Standard Young Life permission slips and authorization forms. Click any to view required fields.</p>
            <button className="btn-primary" style={{ fontSize: 13, padding: '6px 14px' }} onClick={() => { setFormDraft({ name: '', status: 'required', event: '', desc: '', fields: '' }); setAddingForm(true) }}>+ Add Form</button>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['required', 'recommended', 'optional'].map(s => (
              <span key={s} className={`form-status form-status--${s}`} style={{ fontSize: 12 }}>
                {s === 'required' ? '🔴' : s === 'recommended' ? '🟡' : '🟢'} {s.charAt(0).toUpperCase() + s.slice(1)}
              </span>
            ))}
          </div>

          <div className="forms-grid">
            {forms.map(f => (
              <button key={f.id} className={`form-card form-card--${f.status}`} onClick={() => setViewForm(f)}>
                <div className="form-card-header">
                  <span className={`form-status form-status--${f.status}`}>{f.status.charAt(0).toUpperCase() + f.status.slice(1)}</span>
                </div>
                <div className="form-name">{f.name}</div>
                <div className="form-event">{f.event}</div>
                <div className="form-desc">{f.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* VIEW PARENT MODAL */}
      {viewParent && !editingParent && (
        <Modal open title={`${viewParent.firstName} ${viewParent.lastName}`} onClose={() => setViewParent(null)} size="lg">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {viewParent.studentName && (
              <div style={{ background: '#EEF3FB', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#1B4FA3', fontWeight: 600, marginBottom: 10 }}>
                Student: {viewParent.studentName} · {viewParent.program}
              </div>
            )}
            {[
              ['Cell', viewParent.cell ? formatPhone(viewParent.cell) : ''], ['Email', viewParent.email],
              ['Home Address', [viewParent.homeAddress, viewParent.city, viewParent.state, viewParent.zip].filter(Boolean).join(', ')],
              ['Employer', viewParent.employer], ['Work Phone', viewParent.workPhone ? formatPhone(viewParent.workPhone) : ''],
              ['Birthday', viewParent.birthday], ['Preferred Contact', viewParent.preferredContact],
              ['Spouse Name', viewParent.spouseName], ['Spouse Cell', viewParent.spouseCell ? formatPhone(viewParent.spouseCell) : ''],
              ['Spouse Email', viewParent.spouseEmail], ['Spouse Employer', viewParent.spouseEmployer],
              ['Emergency Contact', viewParent.emergencyContact], ['Emergency Phone', viewParent.emergencyPhone ? formatPhone(viewParent.emergencyPhone) : ''],
              ['Allergies', viewParent.allergies], ['Medical Notes', viewParent.medicalNotes],
              ['Doctor', viewParent.doctorName], ['Doctor Phone', viewParent.doctorPhone ? formatPhone(viewParent.doctorPhone) : ''],
              ['Notes', viewParent.notes],
            ].filter(([, v]) => v).map(([label, val]) => (
              <div key={label} className="detail-row">
                <span className="detail-label">{label}</span>
                <span className="detail-val">{val}</span>
              </div>
            ))}
          </div>
          <div className="modal-actions" style={{ marginTop: 16 }}>
            <button className="btn-secondary" onClick={() => setViewParent(null)}>Close</button>
            <button className="btn-primary" onClick={() => { setEditDraft({ ...viewParent }); setEditingParent(viewParent._key); setViewParent(null) }}>Edit</button>
          </div>
        </Modal>
      )}

      {/* EDIT PARENT MODAL */}
      {editingParent && editDraft && (
        <Modal open title={`Edit: ${editDraft.firstName} ${editDraft.lastName}`} onClose={() => { setEditingParent(null); setEditDraft(null) }} size="xl">
          <ParentForm data={editDraft} onChange={(k, v) => setEditDraft(d => ({ ...d, [k]: v }))} />
          <div className="modal-actions" style={{ marginTop: 16 }}>
            <button className="btn-secondary" onClick={() => { setEditingParent(null); setEditDraft(null) }}>Cancel</button>
            <button className="btn-primary" onClick={saveEdit}>Save Changes</button>
          </div>
        </Modal>
      )}

      {/* ADD PARENT MODAL */}
      {addingParent && (
        <Modal open title="Add Parent / Guardian" onClose={() => setAddingParent(false)} size="xl">
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 3 }}>Program</div>
            <select className="settings-input" value={newDraft.program} onChange={e => setNewDraft(d => ({ ...d, program: e.target.value }))}>
              <option value="YoungLife">YoungLife</option>
              <option value="WyldLife">WyldLife</option>
            </select>
          </div>
          <ParentForm data={newDraft} onChange={(k, v) => setNewDraft(d => ({ ...d, [k]: v }))} />
          <div className="modal-actions" style={{ marginTop: 16 }}>
            <button className="btn-secondary" onClick={() => setAddingParent(false)}>Cancel</button>
            <button className="btn-primary" onClick={addParent}>Add Parent</button>
          </div>
        </Modal>
      )}

      {/* VIEW FORM MODAL */}
      {viewForm && (
        <Modal open title={viewForm.name} onClose={() => setViewForm(null)} size="xl">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
            <span className={`form-status form-status--${viewForm.status}`}>{viewForm.status.charAt(0).toUpperCase() + viewForm.status.slice(1)}</span>
            {viewForm.event && <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{viewForm.event}</span>}
            <button
              className="btn-secondary"
              style={{ marginLeft: 'auto', fontSize: 12, padding: '4px 12px' }}
              onClick={() => {
                const w = window.open('', '_blank')
                w.document.write(`<!DOCTYPE html><html><head><title>${viewForm.name}</title><style>body{margin:32px;font-family:Arial,sans-serif;}@media print{body{margin:18px;}}</style></head><body>${FORM_DOCS[viewForm.id] || ''}</body></html>`)
                w.document.close()
                w.focus()
                setTimeout(() => w.print(), 400)
              }}
            >🖨 Print / Save PDF</button>
          </div>
          {FORM_DOCS[viewForm.id] ? (
            <div
              style={{ border: '1px solid var(--gray-200)', borderRadius: 8, padding: '20px 24px', background: '#fff', maxHeight: '60vh', overflowY: 'auto' }}
              dangerouslySetInnerHTML={{ __html: FORM_DOCS[viewForm.id] }}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ fontSize: 14, color: 'var(--gray-700)', lineHeight: 1.6, margin: 0 }}>{viewForm.desc}</p>
              <div>
                <div className="form-fields-label">Required Fields / Information</div>
                <div className="form-fields-list" style={{ marginTop: 6 }}>{viewForm.fields}</div>
              </div>
            </div>
          )}
          <div className="modal-actions" style={{ marginTop: 14 }}>
            <button className="btn-secondary" onClick={() => setViewForm(null)}>Close</button>
          </div>
        </Modal>
      )}

      {/* ADD FORM MODAL */}
      {addingForm && (
        <Modal open title="Add Permission Form" onClose={() => setAddingForm(false)} size="md">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['Form Name', 'name'], ['Event / Use Case', 'event']].map(([label, key]) => (
              <div key={key}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 3 }}>{label}</div>
                <input className="settings-input" style={{ width: '100%', boxSizing: 'border-box' }} value={formDraft[key]} onChange={e => setFormDraft(d => ({ ...d, [key]: e.target.value }))} />
              </div>
            ))}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 3 }}>Status</div>
              <select className="settings-input" value={formDraft.status} onChange={e => setFormDraft(d => ({ ...d, status: e.target.value }))}>
                <option value="required">Required</option>
                <option value="recommended">Recommended</option>
                <option value="optional">Optional</option>
              </select>
            </div>
            {[['Description', 'desc'], ['Required Fields / Info', 'fields']].map(([label, key]) => (
              <div key={key}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 3 }}>{label}</div>
                <textarea className="settings-input" rows={3} style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical' }} value={formDraft[key]} onChange={e => setFormDraft(d => ({ ...d, [key]: e.target.value }))} />
              </div>
            ))}
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setAddingForm(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => { if (formDraft.name.trim()) { setForms(fs => [...fs, { ...formDraft, id: 'pf' + Date.now() }]); setAddingForm(false) } }}>Add Form</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
