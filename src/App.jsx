import { useState } from 'react'
import { useStore } from './store/useStore'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { ToastContainer } from './components/Toast'
import Dashboard from './pages/Dashboard'
import Prayer from './pages/Prayer'
import CheckIn from './pages/CheckIn'
import Students from './pages/Students'
import Attendance from './pages/Attendance'
import FollowUp from './pages/FollowUp'
import Events from './pages/Events'
import Leaders from './pages/Leaders'
import Reports from './pages/Reports'
import Finances from './pages/Finances'
import Resources from './pages/Resources'
import ParentConnect from './pages/ParentConnect'
import Messaging from './pages/Messaging'
import YLStory from './pages/YLStory'
import Settings from './pages/Settings'
import './App.css'

const PAGES = { dashboard: Dashboard, prayer: Prayer, checkin: CheckIn, students: Students, attendance: Attendance, followup: FollowUp, events: Events, leaders: Leaders, reports: Reports, finances: Finances, resources: Resources, parentconnect: ParentConnect, messaging: Messaging, ylstory: YLStory, settings: Settings }

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [pageProps, setPageProps] = useState({})
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toasts, setToasts] = useState([])
  const store = useStore()

  function navigateTo(newPage, props = {}) {
    setPage(newPage)
    setPageProps(props)
    window.scrollTo(0, 0)
  }

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
      <Sidebar page={page} setPage={p => navigateTo(p)} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} store={storeWithToast} />
      <div className="app-main">
        <Header page={page} onMenuClick={() => setMobileOpen(o => !o)} />
        <div className="app-content">
          <Page store={storeWithToast} setPage={p => navigateTo(p)} navigateTo={navigateTo} {...pageProps} />
        </div>
      </div>
      <ToastContainer toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
