import { useMemo, useState } from 'react'
import { useStore, uid } from './store.js'
import { Badge, Select, money, vehicleName, repairTotal } from './ui.jsx'
import { VehicleForm, RepairForm, RecallForm } from './forms.jsx'
import { REPAIR_STATUSES, RECALL_STATUSES } from './data.js'
import { fetchRecalls, nhtsaModelName } from './nhtsa.js'

const TABS = ['Dashboard', 'Vehicles', 'Repairs', 'Recalls', 'Backup']
const ACTIVE = ['Estimate', 'Waiting on Parts', 'In Progress', 'Ready for Pickup']

function download(name, text, type) {
  const url = URL.createObjectURL(new Blob([text], { type }))
  const a = Object.assign(document.createElement('a'), { href: url, download: name })
  a.click()
  URL.revokeObjectURL(url)
}

export default function App() {
  const { db, upsert, remove, replaceAll } = useStore()
  const [tab, setTab] = useState('Dashboard')
  const [selected, setSelected] = useState(null)
  const [modal, setModal] = useState(null) // { type, vehicle?, row? }

  const byId = useMemo(() => Object.fromEntries(db.vehicles.map((v) => [v.id, v])), [db.vehicles])
  const open = (v) => { setSelected(v.id); setTab('Vehicles') }
  const del = (table, id, label) => window.confirm(`Delete ${label}? This cannot be undone.`) && remove(table, id)

  const vehicle = selected && byId[selected]

  return (
    <div className="app">
      <header className="top">
        <div className="brand"><span className="star">✦</span> Mitch's Mercedes <small>Repair &amp; Recall Tracker</small></div>
        <nav>
          {TABS.map((t) => (
            <button key={t} className={t === tab ? 'active' : ''} onClick={() => { setTab(t); setSelected(null) }}>{t}</button>
          ))}
        </nav>
      </header>

      <main>
        {tab === 'Dashboard' && <Dashboard db={db} byId={byId} open={open} go={setTab} />}
        {tab === 'Vehicles' && !vehicle && (
          <VehicleList db={db} open={open} onAdd={() => setModal({ type: 'vehicle' })} />
        )}
        {tab === 'Vehicles' && vehicle && (
          <VehicleDetail
            v={vehicle} db={db} upsert={upsert} setModal={setModal} del={del}
            back={() => setSelected(null)}
          />
        )}
        {tab === 'Repairs' && <AllRepairs db={db} byId={byId} open={open} />}
        {tab === 'Recalls' && <AllRecalls db={db} byId={byId} open={open} upsert={upsert} />}
        {tab === 'Backup' && <Backup db={db} replaceAll={replaceAll} />}
      </main>

      {modal?.type === 'vehicle' && (
        <VehicleForm
          initial={modal.row}
          onClose={() => setModal(null)}
          onSave={(v) => { upsert('vehicles', v); setModal(null); if (!modal.row) open(v) }}
        />
      )}
      {modal?.type === 'repair' && (
        <RepairForm vehicle={modal.vehicle} initial={modal.row} onClose={() => setModal(null)}
          onSave={(r) => { upsert('repairs', r); setModal(null) }} />
      )}
      {modal?.type === 'recall' && (
        <RecallForm vehicle={modal.vehicle} initial={modal.row} onClose={() => setModal(null)}
          onSave={(r) => { upsert('recalls', r); setModal(null) }} />
      )}
    </div>
  )
}

function Stat({ n, label, onClick }) {
  return <button className="stat" onClick={onClick}><b>{n}</b><span>{label}</span></button>
}

function Dashboard({ db, byId, open, go }) {
  const activeRepairs = db.repairs.filter((r) => ACTIVE.includes(r.status))
  const openRecalls = db.recalls.filter((r) => r.status === 'Open' || r.status === 'Scheduled')
  const unpaid = db.repairs.filter((r) => r.status === 'Completed' && r.payment === 'Unpaid')
  return (
    <>
      <div className="stats">
        <Stat n={db.vehicles.length} label="Vehicles on file" onClick={() => go('Vehicles')} />
        <Stat n={activeRepairs.length} label="Active repairs" onClick={() => go('Repairs')} />
        <Stat n={openRecalls.length} label="Open recalls" onClick={() => go('Recalls')} />
        <Stat n={money(unpaid.reduce((s, r) => s + repairTotal(r), 0))} label={`Unpaid (${unpaid.length} jobs)`} onClick={() => go('Repairs')} />
      </div>
      <section className="card">
        <h3>Active repairs</h3>
        {activeRepairs.length === 0 && <p className="empty">Nothing in the shop right now.</p>}
        {activeRepairs.map((r) => (
          <div key={r.id} className="item click" onClick={() => open(byId[r.vehicleId])}>
            <div><b>{vehicleName(byId[r.vehicleId])}</b><br /><small>{r.category} · {byId[r.vehicleId]?.owner}</small></div>
            <Badge text={r.status} />
          </div>
        ))}
      </section>
      <section className="card">
        <h3>Open recalls</h3>
        {openRecalls.length === 0 && <p className="empty">No open recalls tracked.</p>}
        {openRecalls.map((r) => (
          <div key={r.id} className="item click" onClick={() => open(byId[r.vehicleId])}>
            <div><b>{vehicleName(byId[r.vehicleId])}</b><br /><small>{r.campaign} · {r.component}</small></div>
            <Badge text={r.status} />
          </div>
        ))}
      </section>
    </>
  )
}

function VehicleList({ db, open, onAdd }) {
  const [q, setQ] = useState('')
  const list = db.vehicles.filter((v) =>
    [v.vin, v.model, v.year, v.owner, v.plate, v.phone, v.engine].join(' ').toLowerCase().includes(q.toLowerCase()))
  return (
    <>
      <div className="bar">
        <input className="search" placeholder="Search VIN, owner, model, plate, phone…" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="primary" onClick={onAdd}>+ Add Vehicle</button>
      </div>
      {list.length === 0 && <p className="empty">{db.vehicles.length ? 'No matches.' : 'No vehicles yet — add the first Mercedes.'}</p>}
      <div className="cards">
        {list.map((v) => {
          const reps = db.repairs.filter((r) => r.vehicleId === v.id)
          const rec = db.recalls.filter((r) => r.vehicleId === v.id && (r.status === 'Open' || r.status === 'Scheduled'))
          return (
            <button key={v.id} className="vcard" onClick={() => open(v)}>
              <h3>{vehicleName(v)}</h3>
              <p>{v.engine || 'Engine not set'}</p>
              <p><small>{v.owner} {v.phone && '· ' + v.phone}</small></p>
              <p><small>{reps.length} repair{reps.length !== 1 && 's'}{rec.length > 0 && <span className="warn"> · {rec.length} open recall{rec.length !== 1 && 's'}</span>}</small></p>
            </button>
          )
        })}
      </div>
    </>
  )
}

function VehicleDetail({ v, db, upsert, setModal, del, back }) {
  const repairs = db.repairs.filter((r) => r.vehicleId === v.id).sort((a, b) => b.date.localeCompare(a.date))
  const recalls = db.recalls.filter((r) => r.vehicleId === v.id)
  const [checking, setChecking] = useState(false)
  const [msg, setMsg] = useState('')
  const [model, setModel] = useState(nhtsaModelName(v.model || ''))

  const check = async () => {
    setChecking(true); setMsg('')
    try {
      const found = await fetchRecalls({ year: v.year, model })
      const known = new Set(recalls.map((r) => r.campaign))
      const fresh = found.filter((f) => f.campaign && !known.has(f.campaign))
      fresh.forEach((f) => upsert('recalls', { id: uid(), vehicleId: v.id, status: 'Open', ...f }))
      setMsg(`NHTSA lists ${found.length} recall${found.length !== 1 ? 's' : ''} for ${v.year} ${model}; ${fresh.length} new added. Confirm each applies to this VIN before marking it.`)
    } catch (e) {
      setMsg(`Recall lookup failed (${e.message}). Check your internet connection, or add recalls manually.`)
    }
    setChecking(false)
  }

  const total = repairs.filter((r) => r.status !== 'Declined').reduce((s, r) => s + repairTotal(r), 0)

  return (
    <>
      <button className="ghost" onClick={back}>← All vehicles</button>
      <section className="card">
        <div className="between">
          <h2>{vehicleName(v)}</h2>
          <div>
            <button onClick={() => setModal({ type: 'vehicle', row: v })}>Edit</button>{' '}
            <button className="danger" onClick={() => { del('vehicles', v.id, 'this vehicle and all its repairs and recalls'); back() }}>Delete</button>
          </div>
        </div>
        <dl className="specs">
          {[['VIN', v.vin], ['Engine', v.engine], ['Transmission', v.transmission], ['Drivetrain', v.drivetrain], ['Fuel', v.fuel],
            ['Body', v.body], ['Color', v.color], ['Plate', v.plate], ['Mileage', v.mileage && Number(v.mileage).toLocaleString()],
            ['Owner', v.owner], ['Phone', v.phone], ['Email', v.email]].filter(([, x]) => x).map(([k, x]) => (
            <div key={k}><dt>{k}</dt><dd>{x}</dd></div>
          ))}
        </dl>
        {v.notes && <p className="notes">{v.notes}</p>}
      </section>

      <section className="card">
        <div className="between"><h3>Repair history ({repairs.length}) · lifetime {money(total)}</h3>
          <button className="primary" onClick={() => setModal({ type: 'repair', vehicle: v })}>+ New Repair</button></div>
        {repairs.length === 0 && <p className="empty">No repairs recorded.</p>}
        {repairs.map((r) => (
          <div key={r.id} className="item col">
            <div className="between">
              <b>{r.date} · {r.category}</b><span><Badge text={r.status} /> <Badge text={r.payment || 'Unpaid'} /></span>
            </div>
            <small>{r.mileage && Number(r.mileage).toLocaleString() + ' mi · '}{r.tech && 'Tech: ' + r.tech + ' · '}{money(repairTotal(r))}</small>
            {r.complaint && <p><i>Concern:</i> {r.complaint}</p>}
            {r.work && <p><i>Work:</i> {r.work}</p>}
            {r.partsUsed && <p><i>Parts:</i> {r.partsUsed}</p>}
            <div><button onClick={() => setModal({ type: 'repair', vehicle: v, row: r })}>Edit</button>{' '}
              <button className="danger" onClick={() => del('repairs', r.id, 'this repair')}>Delete</button></div>
          </div>
        ))}
      </section>

      <section className="card">
        <div className="between"><h3>Recalls ({recalls.length})</h3>
          <div className="row">
            <input className="narrow" value={model} onChange={(e) => setModel(e.target.value)} title="Model name sent to NHTSA — edit if no results" />
            <button onClick={check} disabled={checking || !v.year}>{checking ? 'Checking…' : 'Check NHTSA'}</button>
            <button className="primary" onClick={() => setModal({ type: 'recall', vehicle: v })}>+ Add</button></div></div>
        {msg && <p className="hint">{msg}</p>}
        {recalls.length === 0 && <p className="empty">No recalls recorded. Use “Check NHTSA” to pull the official list.</p>}
        {recalls.map((r) => (
          <div key={r.id} className="item col">
            <div className="between"><b>{r.campaign || 'Manual'} · {r.component}</b>
              <Select value={r.status} options={RECALL_STATUSES}
                onChange={(s) => upsert('recalls', { ...r, status: s, completedDate: s === 'Completed' ? new Date().toLocaleDateString('en-CA') : r.completedDate })} /></div>
            {r.summary && <p>{r.summary}</p>}
            {r.remedy && <p><i>Remedy:</i> {r.remedy}</p>}
            {r.completedDate && <small>Completed {r.completedDate}</small>}
            <div><button onClick={() => setModal({ type: 'recall', vehicle: v, row: r })}>Edit</button>{' '}
              <button className="danger" onClick={() => del('recalls', r.id, 'this recall')}>Delete</button></div>
          </div>
        ))}
      </section>
    </>
  )
}

function AllRepairs({ db, byId, open }) {
  const [status, setStatus] = useState('')
  const list = db.repairs.filter((r) => !status || r.status === status).sort((a, b) => b.date.localeCompare(a.date))
  return (
    <>
      <div className="bar"><Select value={status} onChange={setStatus} options={REPAIR_STATUSES} placeholder="All statuses" /></div>
      {list.length === 0 && <p className="empty">No repairs.</p>}
      {list.map((r) => (
        <div key={r.id} className="item click card" onClick={() => open(byId[r.vehicleId])}>
          <div><b>{vehicleName(byId[r.vehicleId])}</b><br /><small>{r.date} · {r.category} · {money(repairTotal(r))}</small></div>
          <Badge text={r.status} />
        </div>
      ))}
    </>
  )
}

function AllRecalls({ db, byId, open, upsert }) {
  const [status, setStatus] = useState('Open')
  const list = db.recalls.filter((r) => !status || r.status === status)
  return (
    <>
      <div className="bar"><Select value={status} onChange={setStatus} options={RECALL_STATUSES} placeholder="All statuses" /></div>
      {list.length === 0 && <p className="empty">No recalls with that status.</p>}
      {list.map((r) => (
        <div key={r.id} className="item card">
          <div className="click" onClick={() => open(byId[r.vehicleId])}>
            <b>{vehicleName(byId[r.vehicleId])}</b><br /><small>{r.campaign} · {r.component}</small>
          </div>
          <Select value={r.status} options={RECALL_STATUSES} onChange={(s) => upsert('recalls', { ...r, status: s })} />
        </div>
      ))}
    </>
  )
}

function Backup({ db, replaceAll }) {
  const csvCell = (x) => `"${String(x ?? '').replace(/"/g, '""')}"`
  const exportCsv = () => {
    const byId = Object.fromEntries(db.vehicles.map((v) => [v.id, v]))
    const head = ['Date', 'Vehicle', 'VIN', 'Owner', 'Mileage', 'Category', 'Status', 'Concern', 'Work', 'Parts', 'Total', 'Payment']
    const rows = db.repairs.map((r) => {
      const v = byId[r.vehicleId]
      return [r.date, vehicleName(v), v?.vin, v?.owner, r.mileage, r.category, r.status, r.complaint, r.work, r.partsUsed, repairTotal(r).toFixed(2), r.payment]
    })
    download('repairs.csv', [head, ...rows].map((r) => r.map(csvCell).join(',')).join('\n'), 'text/csv')
  }
  const importFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    file.text().then((t) => {
      try {
        const data = JSON.parse(t)
        if (!Array.isArray(data.vehicles)) throw new Error('not a Mitch\'s Mercedes backup')
        if (window.confirm('Replace ALL current data with this backup?')) replaceAll(data)
      } catch (err) { alert('Could not import: ' + err.message) }
    })
    e.target.value = ''
  }
  return (
    <section className="card">
      <h3>Backup &amp; Export</h3>
      <p>Data is saved in this browser on this device. Download a backup regularly, and use it to move to another computer.</p>
      <div className="row">
        <button className="primary" onClick={() => download(`mitchs-mercedes-backup-${new Date().toLocaleDateString('en-CA')}.json`, JSON.stringify(db, null, 2), 'application/json')}>Download Backup (JSON)</button>
        <button onClick={exportCsv}>Export Repairs (CSV)</button>
        <label className="button">Restore Backup…<input type="file" accept="application/json" hidden onChange={importFile} /></label>
      </div>
    </section>
  )
}
