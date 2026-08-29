import { useState } from 'react'
import './Settings.css'

function OrgSection({ store }) {
  const { org, updateOrg, addNotification } = store
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(org)

  function save() {
    updateOrg(draft)
    setEditing(false)
    addNotification('Organization info saved!')
  }
  function cancel() { setDraft(org); setEditing(false) }

  const fields = [
    { key: 'areaName', label: 'Area Name' },
    { key: 'areaDirector', label: 'Area Director' },
    { key: 'region', label: 'Region' },
    { key: 'website', label: 'Website' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
  ]

  return (
    <div className="settings-group">
      <div className="settings-group-header">
        <div className="settings-group-label">Organization Info</div>
        {!editing
          ? <button className="settings-btn settings-btn--blue" onClick={() => { setDraft(org); setEditing(true) }}>Edit</button>
          : <div style={{display:'flex',gap:8}}>
              <button className="settings-btn settings-btn--blue" onClick={save}>Save</button>
              <button className="settings-btn settings-btn--ghost" onClick={cancel}>Cancel</button>
            </div>
        }
      </div>
      <div className="settings-card">
        {fields.map(f => (
          <div className="settings-row" key={f.key}>
            <div className="settings-row-info">
              <div className="settings-row-title">{f.label}</div>
              {!editing && <div className="settings-row-sub">{org[f.key] || '—'}</div>}
            </div>
            {editing && (
              <input
                className="settings-input"
                value={draft[f.key] || ''}
                onChange={e => setDraft(d => ({ ...d, [f.key]: e.target.value }))}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProgramsSection({ store }) {
  const { programs, addProgram, updateProgram, deleteProgram, addNotification } = store
  const [adding, setAdding] = useState(false)
  const [editId, setEditId] = useState(null)
  const [newProg, setNewProg] = useState({ name: '', grade: '', description: '' })
  const [editDraft, setEditDraft] = useState({})

  function handleAdd() {
    if (!newProg.name.trim()) return
    addProgram(newProg)
    setNewProg({ name: '', grade: '', description: '' })
    setAdding(false)
    addNotification('Program added!')
  }

  function startEdit(p) { setEditId(p.id); setEditDraft({ name: p.name, grade: p.grade, description: p.description }) }
  function saveEdit(id) { updateProgram(id, editDraft); setEditId(null); addNotification('Program updated!') }

  return (
    <div className="settings-group">
      <div className="settings-group-header">
        <div className="settings-group-label">Programs</div>
        <button className="settings-btn settings-btn--blue" onClick={() => setAdding(true)}>+ Add</button>
      </div>
      <div className="settings-card">
        {programs.map(p => (
          <div className="settings-row" key={p.id}>
            {editId === p.id ? (
              <div style={{flex:1,display:'flex',flexDirection:'column',gap:6}}>
                <input className="settings-input" value={editDraft.name} placeholder="Program name" onChange={e => setEditDraft(d => ({...d, name: e.target.value}))} />
                <input className="settings-input" value={editDraft.grade} placeholder="Grade range" onChange={e => setEditDraft(d => ({...d, grade: e.target.value}))} />
                <input className="settings-input" value={editDraft.description} placeholder="Description" onChange={e => setEditDraft(d => ({...d, description: e.target.value}))} />
                <div style={{display:'flex',gap:8,marginTop:4}}>
                  <button className="settings-btn settings-btn--blue" onClick={() => saveEdit(p.id)}>Save</button>
                  <button className="settings-btn settings-btn--ghost" onClick={() => setEditId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="settings-row-info" style={{flex:1}}>
                  <div className="settings-row-title">{p.name}</div>
                  <div className="settings-row-sub">{p.grade}{p.description ? ' · ' + p.description : ''}</div>
                </div>
                <div style={{display:'flex',gap:6,alignItems:'center',flexShrink:0}}>
                  <button
                    className={`settings-badge ${p.active ? 'settings-badge--green' : 'settings-badge--amber'}`}
                    style={{cursor:'pointer',border:'none'}}
                    onClick={() => { updateProgram(p.id, { active: !p.active }); addNotification(p.active ? 'Program deactivated' : 'Program activated') }}
                    title="Toggle active"
                  >{p.active ? 'Active' : 'Inactive'}</button>
                  <button className="settings-btn settings-btn--ghost" onClick={() => startEdit(p)}>Edit</button>
                  <button className="settings-btn settings-btn--red" onClick={() => { deleteProgram(p.id); addNotification('Program removed') }}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
        {adding && (
          <div className="settings-row" style={{flexDirection:'column',alignItems:'stretch',gap:8}}>
            <input className="settings-input" value={newProg.name} placeholder="Program name*" onChange={e => setNewProg(d => ({...d, name: e.target.value}))} />
            <input className="settings-input" value={newProg.grade} placeholder="Grade range (e.g. High School 9th–12th)" onChange={e => setNewProg(d => ({...d, grade: e.target.value}))} />
            <input className="settings-input" value={newProg.description} placeholder="Description (optional)" onChange={e => setNewProg(d => ({...d, description: e.target.value}))} />
            <div style={{display:'flex',gap:8}}>
              <button className="settings-btn settings-btn--blue" onClick={handleAdd}>Add Program</button>
              <button className="settings-btn settings-btn--ghost" onClick={() => setAdding(false)}>Cancel</button>
            </div>
          </div>
        )}
        {programs.length === 0 && !adding && <div className="settings-row"><div className="settings-row-sub">No programs yet. Add one above.</div></div>}
      </div>
    </div>
  )
}

function LeadersSection({ store }) {
  const { leaders, addLeader, updateLeader, deleteLeader, addNotification } = store
  const [adding, setAdding] = useState(false)
  const [editId, setEditId] = useState(null)
  const blank = { name:'', role:'', program:'', phone:'', email:'' }
  const [newL, setNewL] = useState(blank)
  const [editDraft, setEditDraft] = useState({})

  function handleAdd() {
    if (!newL.name.trim()) return
    addLeader({ ...newL, id: 'l' + Date.now() })
    setNewL(blank); setAdding(false)
    addNotification('Leader added!')
  }
  function startEdit(l) { setEditId(l.id); setEditDraft({ name:l.name, role:l.role||'', program:l.program||'', phone:l.phone||'', email:l.email||'' }) }
  function saveEdit(id) { updateLeader(id, editDraft); setEditId(null); addNotification('Leader updated!') }

  const leaderFields = [
    { key:'name', placeholder:'Full name*' },
    { key:'role', placeholder:'Role (e.g. Area Director)' },
    { key:'program', placeholder:'Program (YoungLife / WyldLife / Both)' },
    { key:'phone', placeholder:'Phone' },
    { key:'email', placeholder:'Email' },
  ]

  return (
    <div className="settings-group">
      <div className="settings-group-header">
        <div className="settings-group-label">Leadership ({leaders.length})</div>
        <button className="settings-btn settings-btn--blue" onClick={() => setAdding(true)}>+ Add</button>
      </div>
      <div className="settings-card">
        {leaders.map(l => (
          <div className="settings-row" key={l.id}>
            {editId === l.id ? (
              <div style={{flex:1,display:'flex',flexDirection:'column',gap:6}}>
                {leaderFields.map(f => (
                  <input key={f.key} className="settings-input" value={editDraft[f.key]||''} placeholder={f.placeholder}
                    onChange={e => setEditDraft(d => ({...d, [f.key]: e.target.value}))} />
                ))}
                <div style={{display:'flex',gap:8,marginTop:4}}>
                  <button className="settings-btn settings-btn--blue" onClick={() => saveEdit(l.id)}>Save</button>
                  <button className="settings-btn settings-btn--ghost" onClick={() => setEditId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="settings-row-info" style={{flex:1}}>
                  <div className="settings-row-title">{l.name}</div>
                  <div className="settings-row-sub">{[l.role, l.program, l.phone, l.email].filter(Boolean).join(' · ')}</div>
                </div>
                <div style={{display:'flex',gap:6,alignItems:'center',flexShrink:0}}>
                  <button className="settings-btn settings-btn--ghost" onClick={() => startEdit(l)}>Edit</button>
                  <button className="settings-btn settings-btn--red" onClick={() => { deleteLeader(l.id); addNotification('Leader removed') }}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
        {adding && (
          <div className="settings-row" style={{flexDirection:'column',alignItems:'stretch',gap:8}}>
            {leaderFields.map(f => (
              <input key={f.key} className="settings-input" value={newL[f.key]} placeholder={f.placeholder}
                onChange={e => setNewL(d => ({...d, [f.key]: e.target.value}))} />
            ))}
            <div style={{display:'flex',gap:8}}>
              <button className="settings-btn settings-btn--blue" onClick={handleAdd}>Add Leader</button>
              <button className="settings-btn settings-btn--ghost" onClick={() => setAdding(false)}>Cancel</button>
            </div>
          </div>
        )}
        {leaders.length === 0 && !adding && <div className="settings-row"><div className="settings-row-sub">No leaders yet.</div></div>}
      </div>
    </div>
  )
}

function SchoolsSection({ store }) {
  const { schools, addSchool, deleteSchool, addNotification } = store
  const [newSchool, setNewSchool] = useState('')

  function handleAdd() {
    const name = newSchool.trim()
    if (!name || schools.includes(name)) return
    addSchool(name)
    setNewSchool('')
    addNotification('School added!')
  }

  return (
    <div className="settings-group">
      <div className="settings-group-header">
        <div className="settings-group-label">Schools ({schools.length})</div>
      </div>
      <div className="settings-card">
        <div className="settings-row" style={{gap:8}}>
          <input
            className="settings-input"
            style={{flex:1}}
            value={newSchool}
            placeholder="Add a school name…"
            onChange={e => setNewSchool(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
          />
          <button className="settings-btn settings-btn--blue" onClick={handleAdd}>+ Add</button>
        </div>
        {schools.map(s => (
          <div className="settings-row" key={s}>
            <div className="settings-row-title" style={{flex:1}}>{s}</div>
            <button className="settings-btn settings-btn--red" onClick={() => { deleteSchool(s); addNotification('School removed') }}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Settings({ store }) {
  const { resetData, addNotification } = store
  const [showConfirmReset, setShowConfirmReset] = useState(false)

  function handleReset() {
    resetData()
    setShowConfirmReset(false)
    addNotification('Data reset to sample data!')
  }

  const exportData = () => {
    const data = {
      students: store.students, leaders: store.leaders, events: store.events,
      attendance: store.attendance, followUps: store.followUps,
      org: store.org, programs: store.programs, schools: store.schools,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `jc-younglife-${new Date().toISOString().slice(0,10)}.json`
    a.click(); URL.revokeObjectURL(url)
    addNotification('Data exported!')
  }

  return (
    <div className="settings-page">
      <OrgSection store={store} />
      <LeadersSection store={store} />
      <ProgramsSection store={store} />
      <SchoolsSection store={store} />

      <div className="settings-group">
        <div className="settings-group-label">Data & Stats</div>
        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-title">Total Students</div>
              <div className="settings-row-sub">{store.students.length} in database</div>
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-title">Events Logged</div>
              <div className="settings-row-sub">{store.events.length} total</div>
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-title">Follow-up Records</div>
              <div className="settings-row-sub">{store.followUps.length} total · {store.followUps.filter(f=>!f.completed).length} pending</div>
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-title">Storage</div>
              <div className="settings-row-sub">Saved locally in your browser</div>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-group">
        <div className="settings-group-label">Actions</div>
        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-title">Export Data</div>
              <div className="settings-row-sub">Download all data as a JSON backup file</div>
            </div>
            <button className="settings-btn settings-btn--blue" onClick={exportData}>Export</button>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-title">Reset to Sample Data</div>
              <div className="settings-row-sub">Replace all data with default seed records</div>
            </div>
            <button className="settings-btn settings-btn--red" onClick={() => setShowConfirmReset(true)}>Reset</button>
          </div>
        </div>
      </div>

      <div className="settings-about">
        <div className="settings-about-logo">YL</div>
        <div>
          <div className="settings-about-name">Johnson County Young Life</div>
          <div className="settings-about-version">Leader App · v2.0 · Johnson County, Texas</div>
          <div className="settings-about-mission">"Reaching every junior high and high school kid in Johnson County, Texas"</div>
        </div>
      </div>

      {showConfirmReset && (
        <div className="confirm-overlay" onClick={() => setShowConfirmReset(false)}>
          <div className="confirm-box" onClick={e => e.stopPropagation()}>
            <h3>Reset to Sample Data?</h3>
            <p>This will replace ALL current data with sample records. This cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowConfirmReset(false)}>Cancel</button>
              <button className="btn-danger" onClick={handleReset}>Yes, Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
