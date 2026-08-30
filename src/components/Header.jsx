import './Header.css'

const TITLES = {
  dashboard: 'Dashboard',
  students: 'Students',
  attendance: 'Roll Call',
  followup: 'Follow-ups',
  events: 'Events & Calendar',
  leaders: 'Our Leaders',
  reports: 'Reports',
  finances: 'Finances',
  resources: 'Resources',
  parentconnect: 'Parent / Guardian Connect',
  messaging: 'Messaging & Marketing',
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
        {page === 'dashboard' && (
          <div className="header-verse">
            <span className="header-verse-text">"Whatever you do, work at it with all your heart, as working for the Lord…"</span>
            <span className="header-verse-ref">Colossians 3:23</span>
          </div>
        )}
        {page === 'followup' && (
          <div className="header-verse header-verse--wrap">
            <div className="header-verse-text">
              "Suppose one of you has a hundred sheep and loses one of them.<br/>
              Doesn't he leave the ninety-nine and go after the lost sheep until he finds it?" <span className="header-verse-ref" style={{fontSize:'0.9em'}}>Luke 15:4</span>
            </div>
          </div>
        )}
        {page === 'attendance' && (
          <div className="header-verse header-verse--wrap">
            <div className="header-verse-text">
              "And let us consider how we may spur one another on toward love and good deeds,<br/>
              not giving up meeting together… but encouraging one another." <span className="header-verse-ref" style={{fontSize:'0.9em'}}>Hebrews 10:24–25</span>
            </div>
          </div>
        )}
        {page === 'students' && (
          <div className="header-verse header-verse--wrap">
            <div className="header-verse-text">
              "Don't let anyone look down on you because you are young, but set an example<br/>
              for the believers in speech, in conduct, in love, in faith and in purity." <span className="header-verse-ref" style={{fontSize:'0.9em'}}>1 Timothy 4:12</span>
            </div>
          </div>
        )}
        <div className="header-badge">Johnson County YL</div>
      </div>
    </header>
  )
}
