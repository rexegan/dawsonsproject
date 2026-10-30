import { useEffect } from 'react'

export function Field({ label, children, wide }) {
  return (
    <label className={'field' + (wide ? ' wide' : '')}>
      <span>{label}</span>
      {children}
    </label>
  )
}

// options: array of strings, or an object of { groupLabel: [strings] }
export function Select({ value, onChange, options, placeholder = 'Select…', ...rest }) {
  const isGrouped = !Array.isArray(options)
  return (
    <select value={value || ''} onChange={(e) => onChange(e.target.value)} {...rest}>
      <option value="">{placeholder}</option>
      {isGrouped
        ? Object.entries(options).map(([g, list]) => (
            <optgroup key={g} label={g}>
              {list.map((o) => <option key={g + o}>{o}</option>)}
            </optgroup>
          ))
        : options.map((o) => <option key={o}>{o}</option>)}
    </select>
  )
}

export function Modal({ title, onClose, children }) {
  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])
  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-label={title}>
        <header>
          <h2>{title}</h2>
          <button className="ghost" onClick={onClose} aria-label="Close">✕</button>
        </header>
        {children}
      </div>
    </div>
  )
}

export function Badge({ text }) {
  const cls = String(text).toLowerCase().replace(/[^a-z]+/g, '-')
  return <span className={`badge b-${cls}`}>{text}</span>
}

export const money = (n) => (Number(n) || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
export const today = () => new Date().toLocaleDateString('en-CA')
export const vehicleName = (v) => (v ? `${v.year || ''} Mercedes-Benz ${v.model || ''}`.trim() : 'Unknown vehicle')
export const repairTotal = (r) => (Number(r.parts) || 0) + (Number(r.laborHours) || 0) * (Number(r.laborRate) || 0) + (Number(r.other) || 0)
