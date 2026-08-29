import { useEffect, useState } from 'react'
import './Toast.css'

export function Toast({ msg, type = 'success', onDone }) {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onDone, 300) }, 3000)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div className={`toast toast--${type} ${visible ? '' : 'toast--out'}`}>
      <span>{type === 'success' ? '✓' : '!'}</span>
      {msg}
    </div>
  )
}

export function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="toast-container">
      {toasts.map(t => <Toast key={t.id} msg={t.msg} type={t.type} onDone={() => onRemove(t.id)} />)}
    </div>
  )
}
