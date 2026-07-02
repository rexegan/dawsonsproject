import { useState } from 'react'
import Home from './pages/Home'
import Events from './pages/Events'
import Leaders from './pages/Leaders'
import Connect from './pages/Connect'
import About from './pages/About'
import BottomNav from './components/BottomNav'
import Header from './components/Header'
import './App.css'

const PAGES = {
  home: Home,
  events: Events,
  leaders: Leaders,
  connect: Connect,
  about: About,
}

export default function App() {
  const [page, setPage] = useState('home')
  const Page = PAGES[page]

  return (
    <div className="app">
      <Header page={page} />
      <main className="main-content">
        <Page />
      </main>
      <BottomNav page={page} setPage={setPage} />
    </div>
  )
}
