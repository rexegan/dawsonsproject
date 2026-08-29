import { useState } from 'react'
import './Settings.css'

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
      students: store.students,
      leaders: store.leaders,
      events: store.events,
      attendance: store.attendance,
      followUps: store.followUps,
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
      <div className="settings-group">
        <div className="settings-group-label">Organization</div>
        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-title">Area Name</div>
              <div className="settings-row-sub">Johnson County Young Life</div>
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-title">Area Director</div>
              <div className="settings-row-sub">Tyler Brooks</div>
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-title">Region</div>
              <div className="settings-row-sub">Kansas City Metro</div>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-group">
        <div className="settings-group-label">Programs</div>
        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-title">YoungLife Club</div>
              <div className="settings-row-sub">High School (9th–12th grade)</div>
            </div>
            <span className="settings-badge settings-badge--blue">Active</span>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-title">WyldLife</div>
              <div className="settings-row-sub">Middle School (6th–8th grade)</div>
            </div>
            <span className="settings-badge settings-badge--green">Active</span>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-title">Campaigners</div>
              <div className="settings-row-sub">Weekly Bible study for all students</div>
            </div>
            <span className="settings-badge settings-badge--green">Active</span>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-title">Summer Camp</div>
              <div className="settings-row-sub">Malibu Club (HS) · Silver Cliff Ranch (MS)</div>
            </div>
            <span className="settings-badge settings-badge--amber">Seasonal</span>
          </div>
        </div>
      </div>

      <div className="settings-group">
        <div className="settings-group-label">Data</div>
        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-title">Total Students</div>
              <div className="settings-row-sub">{store.students.length} students in database</div>
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-title">Total Events</div>
              <div className="settings-row-sub">{store.events.length} events logged</div>
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
              <div className="settings-row-sub">Replace all data with the default seed records</div>
            </div>
            <button className="settings-btn settings-btn--red" onClick={() => setShowConfirmReset(true)}>Reset</button>
          </div>
        </div>
      </div>

      <div className="settings-about">
        <div className="settings-about-logo">YL</div>
        <div>
          <div className="settings-about-name">Johnson County Young Life</div>
          <div className="settings-about-version">Leader App · v2.0</div>
          <div className="settings-about-mission">"Reaching every junior high and high school kid in Johnson County, Kansas"</div>
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
