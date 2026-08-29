import './Header.css'

const TITLES = {
  dashboard: 'Dashboard',
  students: 'Students',
  attendance: 'Roll Call',
  followup: 'Follow-ups',
  events: 'Events & Calendar',
  leaders: 'Our Leaders',
  reports: 'Reports',
  settings: 'Settings',
}

export default function Header({ page, onMenuClick }) {
  return (
    <header className="header">
      <button className="header-menu" onClick={onMenuClick} aria-label="Menu">
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>
      <h1 className="header-title">{TITLES[page]}</h1>
      <div className="header-right">
        <div className="header-badge">Johnson County YL</div>
      </div>
    </header>
  )
}
