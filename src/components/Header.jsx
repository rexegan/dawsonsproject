import './Header.css'

const TITLES = {
  dashboard: 'Dashboard',
  checkin: 'Event Check-In',
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
  ylstory: 'The YL Story',
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
        {page === 'parentconnect' && (
          <div className="header-verse header-verse--wrap">
            <div className="header-verse-text">
              "Honor your father and mother — which is the first commandment with a promise —<br/>
              so that it may go well with you and that you may enjoy long life on the earth." <span className="header-verse-ref" style={{fontSize:'0.9em'}}>Ephesians 6:2–3</span>
            </div>
          </div>
        )}
        {page === 'resources' && (
          <div className="header-verse header-verse--wrap">
            <div className="header-verse-text">
              "Ask and it will be given to you; seek and you will find;<br/>
              knock and the door will be opened to you." <span className="header-verse-ref" style={{fontSize:'0.9em'}}>Matthew 7:7</span>
            </div>
          </div>
        )}
        {page === 'reports' && (
          <div className="header-verse header-verse--wrap">
            <div className="header-verse-text">
              "Whoever can be trusted with very little can also be trusted with much." <span className="header-verse-ref" style={{fontSize:'0.9em'}}>Luke 16:10</span>
            </div>
          </div>
        )}
        {page === 'finances' && (
          <div className="header-verse header-verse--wrap">
            <div className="header-verse-text">
              "And my God will meet all your needs according to the riches of his glory in Christ Jesus." <span className="header-verse-ref" style={{fontSize:'0.9em'}}>Philippians 4:19</span>
              &nbsp;&nbsp;·&nbsp;&nbsp;
              "God is able to bless you abundantly, so that in all things at all times, having all that you need, you will abound in every good work." <span className="header-verse-ref" style={{fontSize:'0.9em'}}>2 Corinthians 9:8</span>
            </div>
          </div>
        )}
        {page === 'events' && (
          <div className="header-verse header-verse--wrap">
            <div className="header-verse-text">
              "The Lord has done it this very day;<br/>
              let us rejoice today and be glad." <span className="header-verse-ref" style={{fontSize:'0.9em'}}>Psalm 118:24</span>
            </div>
          </div>
        )}
        {page === 'leaders' && (
          <div className="header-verse header-verse--wrap">
            <div className="header-verse-text">
              "Because we loved you so much, we were delighted to share with you<br/>
              not only the gospel of God, but our lives as well." <span className="header-verse-ref" style={{fontSize:'0.9em'}}>1 Thessalonians 2:8</span>
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
