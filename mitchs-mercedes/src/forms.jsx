import { useState } from 'react'
import { Field, Select, Modal, money, today, repairTotal } from './ui.jsx'
import {
  YEARS, MODEL_GROUPS, ENGINE_GROUPS, TRANSMISSIONS, DRIVETRAINS, FUEL_TYPES, BODY_STYLES, COLORS,
  REPAIR_CATEGORIES, REPAIR_STATUSES, RECALL_STATUSES, PAYMENT_STATUSES,
} from './data.js'
import { uid } from './store.js'
import { decodeVin } from './nhtsa.js'

function useForm(initial) {
  const [f, setF] = useState(initial)
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v && v.target ? v.target.value : v }))
  return [f, set, setF]
}

export function VehicleForm({ initial, onSave, onClose }) {
  const [f, set, setF] = useForm(initial || { id: uid(), createdAt: today() })
  const [msg, setMsg] = useState('')

  const lookup = async () => {
    setMsg('Looking up VIN…')
    try {
      const r = await decodeVin(f.vin.trim())
      setF((p) => ({
        ...p,
        year: Number(r.year) || p.year,
        fuel: FUEL_TYPES.find((x) => r.fuel?.toLowerCase().includes(x.toLowerCase())) || p.fuel,
        notes: [p.notes, `VIN decode: ${[r.model, r.trim, r.displacement && r.displacement + 'L', r.cylinders && r.cylinders + ' cyl', r.body, r.drive].filter(Boolean).join(' · ')}`].filter(Boolean).join('\n'),
      }))
      setMsg('Decoded — year/fuel filled in; details added to notes. Pick the model and engine below.')
    } catch (e) {
      setMsg(`Could not decode VIN (${e.message}). Check the VIN or your internet connection.`)
    }
  }

  const submit = (e) => {
    e.preventDefault()
    onSave({ ...f, vin: (f.vin || '').toUpperCase().trim() })
  }

  return (
    <Modal title={initial ? 'Edit Vehicle' : 'Add Vehicle'} onClose={onClose}>
      <form className="grid" onSubmit={submit}>
        <Field label="VIN" wide>
          <div className="row">
            <input value={f.vin || ''} onChange={set('vin')} maxLength={17} placeholder="17-character VIN" />
            <button type="button" onClick={lookup} disabled={(f.vin || '').trim().length !== 17}>Decode VIN</button>
          </div>
          {msg && <small className="hint">{msg}</small>}
        </Field>
        <Field label="Year"><Select required value={f.year} onChange={set('year')} options={YEARS.map(String)} /></Field>
        <Field label="Model"><Select required value={f.model} onChange={set('model')} options={MODEL_GROUPS} /></Field>
        <Field label="Engine" wide><Select value={f.engine} onChange={set('engine')} options={ENGINE_GROUPS} /></Field>
        <Field label="Transmission"><Select value={f.transmission} onChange={set('transmission')} options={TRANSMISSIONS} /></Field>
        <Field label="Drivetrain"><Select value={f.drivetrain} onChange={set('drivetrain')} options={DRIVETRAINS} /></Field>
        <Field label="Fuel"><Select value={f.fuel} onChange={set('fuel')} options={FUEL_TYPES} /></Field>
        <Field label="Body Style"><Select value={f.body} onChange={set('body')} options={BODY_STYLES} /></Field>
        <Field label="Exterior Color"><Select value={f.color} onChange={set('color')} options={COLORS} /></Field>
        <Field label="License Plate"><input value={f.plate || ''} onChange={set('plate')} /></Field>
        <Field label="Current Mileage"><input type="number" min="0" value={f.mileage || ''} onChange={set('mileage')} /></Field>
        <Field label="Owner Name"><input required value={f.owner || ''} onChange={set('owner')} /></Field>
        <Field label="Phone"><input type="tel" value={f.phone || ''} onChange={set('phone')} /></Field>
        <Field label="Email"><input type="email" value={f.email || ''} onChange={set('email')} /></Field>
        <Field label="Notes" wide><textarea rows={3} value={f.notes || ''} onChange={set('notes')} /></Field>
        <footer><button type="button" className="ghost" onClick={onClose}>Cancel</button><button className="primary">Save Vehicle</button></footer>
      </form>
    </Modal>
  )
}

export function RepairForm({ vehicle, initial, onSave, onClose }) {
  const [f, set] = useForm(initial || {
    id: uid(), vehicleId: vehicle.id, date: today(), mileage: vehicle.mileage || '', status: 'In Progress',
    laborRate: 150, payment: 'Unpaid',
  })
  const submit = (e) => { e.preventDefault(); onSave(f) }
  return (
    <Modal title={initial ? 'Edit Repair' : 'New Repair Order'} onClose={onClose}>
      <form className="grid" onSubmit={submit}>
        <Field label="Date"><input type="date" required value={f.date} onChange={set('date')} /></Field>
        <Field label="Mileage In"><input type="number" min="0" value={f.mileage} onChange={set('mileage')} /></Field>
        <Field label="Category" wide><Select required value={f.category} onChange={set('category')} options={REPAIR_CATEGORIES} /></Field>
        <Field label="Status"><Select required value={f.status} onChange={set('status')} options={REPAIR_STATUSES} /></Field>
        <Field label="Technician"><input value={f.tech || ''} onChange={set('tech')} /></Field>
        <Field label="Customer Complaint / Concern" wide><textarea rows={2} value={f.complaint || ''} onChange={set('complaint')} /></Field>
        <Field label="Work Performed" wide><textarea rows={3} value={f.work || ''} onChange={set('work')} /></Field>
        <Field label="Parts Used (part numbers)" wide><textarea rows={2} value={f.partsUsed || ''} onChange={set('partsUsed')} /></Field>
        <Field label="Parts Cost ($)"><input type="number" min="0" step="0.01" value={f.parts || ''} onChange={set('parts')} /></Field>
        <Field label="Labor Hours"><input type="number" min="0" step="0.1" value={f.laborHours || ''} onChange={set('laborHours')} /></Field>
        <Field label="Labor Rate ($/hr)"><input type="number" min="0" step="0.01" value={f.laborRate || ''} onChange={set('laborRate')} /></Field>
        <Field label="Other / Sublet ($)"><input type="number" min="0" step="0.01" value={f.other || ''} onChange={set('other')} /></Field>
        <Field label="Payment"><Select value={f.payment} onChange={set('payment')} options={PAYMENT_STATUSES} /></Field>
        <Field label="Total"><input readOnly value={money(repairTotal(f))} /></Field>
        <footer><button type="button" className="ghost" onClick={onClose}>Cancel</button><button className="primary">Save Repair</button></footer>
      </form>
    </Modal>
  )
}

export function RecallForm({ vehicle, initial, onSave, onClose }) {
  const [f, set] = useForm(initial || { id: uid(), vehicleId: vehicle.id, status: 'Open' })
  const submit = (e) => { e.preventDefault(); onSave(f) }
  return (
    <Modal title={initial ? 'Edit Recall' : 'Add Recall'} onClose={onClose}>
      <form className="grid" onSubmit={submit}>
        <Field label="NHTSA Campaign #"><input value={f.campaign || ''} onChange={set('campaign')} placeholder="e.g. 22V123000" /></Field>
        <Field label="Status"><Select required value={f.status} onChange={set('status')} options={RECALL_STATUSES} /></Field>
        <Field label="Component" wide><input required value={f.component || ''} onChange={set('component')} /></Field>
        <Field label="Summary" wide><textarea rows={3} value={f.summary || ''} onChange={set('summary')} /></Field>
        <Field label="Remedy" wide><textarea rows={2} value={f.remedy || ''} onChange={set('remedy')} /></Field>
        <Field label="Date Completed"><input type="date" value={f.completedDate || ''} onChange={set('completedDate')} /></Field>
        <Field label="Notes"><input value={f.notes || ''} onChange={set('notes')} /></Field>
        <footer><button type="button" className="ghost" onClick={onClose}>Cancel</button><button className="primary">Save Recall</button></footer>
      </form>
    </Modal>
  )
}
