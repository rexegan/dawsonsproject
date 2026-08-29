import { useState } from 'react'
import { useStore } from './store/useStore'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { ToastContainer } from './components/Toast'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Attendance from './pages/Attendance'
import FollowUp from './pages/FollowUp'
import Events from './pages/Events'
import Leaders from './pages/Leaders'
import Reports from './pages/Reports'
import Finances from './pages/Finances'
import Settings from './pages/Settings'
import './App.css'

const PAGES = { dashboard: Dashboard, students: Students, attendance: Attendance, followup: FollowUp, events: Events, leaders: Leaders, reports: Reports, finances: Finances, settings: Settings }

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toasts, setToasts] = useState([])
  const store = useStore()

  // Wrap addNotification to show toasts
  const storeWithToast = {
    ...store,
    addNotification: (msg, type = 'success') => {
      const id = Math.random().toString(36).slice(2)
      setToasts(t => [...t, { id, msg, type }])
      return id
    }
  }

  const Page = PAGES[page]

  return (
    <div className="app-layout">
      <Sidebar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} store={storeWithToast} />
      <div className="app-main">
        <Header page={page} onMenuClick={() => setMobileOpen(o => !o)} />
        <div className="app-content">
          <Page store={storeWithToast} setPage={setPage} />
        </div>
      </div>
      <ToastContainer toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
