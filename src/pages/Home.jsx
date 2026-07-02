import './Home.css'

const ANNOUNCEMENTS = [
  {
    id: 1,
    tag: 'Club Tonight',
    title: 'WyldLife Club @ 7PM',
    body: 'Middle schoolers — join us at the Johnson County Community Center for games, music, and the best night of your week!',
    emoji: '🎉',
    color: '#E8392A',
  },
  {
    id: 2,
    tag: 'High School',
    title: 'YoungLife Club Friday',
    body: 'High schoolers — Club is this Friday at 7:30PM at the Hendersons\' house. Bring a friend and get ready for an unforgettable night.',
    emoji: '🔥',
    color: '#1d4ed8',
  },
  {
    id: 3,
    tag: 'Campaigners',
    title: 'Bible Study — Wednesdays',
    body: 'Dig deeper into your faith every Wednesday at 4PM. All middle and high school students welcome.',
    emoji: '📖',
    color: '#059669',
  },
  {
    id: 4,
    tag: 'Camp',
    title: 'Summer Camp Registration Open!',
    body: 'Malibu Club 2025 registration is NOW OPEN. Spots fill fast — sign up today and experience the camp of a lifetime!',
    emoji: '⛺',
    color: '#d97706',
  },
]

export default function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <div className="home-hero-text">
          <p className="home-welcome">Welcome to</p>
          <h2 className="home-heading">Johnson County<br />Young Life</h2>
          <p className="home-tagline">For every junior high & high school kid in Johnson County</p>
        </div>
        <div className="home-hero-badges">
          <span className="badge badge--ms">Middle School</span>
          <span className="badge badge--hs">High School</span>
        </div>
      </div>

      <section className="section">
        <h3 className="section-title">What's Happening</h3>
        <div className="announcements">
          {ANNOUNCEMENTS.map((a) => (
            <div className="announcement-card" key={a.id}>
              <div className="announcement-icon" style={{ background: a.color + '18' }}>
                <span>{a.emoji}</span>
              </div>
              <div className="announcement-body">
                <span className="announcement-tag" style={{ color: a.color }}>{a.tag}</span>
                <h4 className="announcement-title">{a.title}</h4>
                <p className="announcement-text">{a.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h3 className="section-title">Quick Links</h3>
        <div className="quick-links">
          <a className="quick-link" href="https://www.younglife.org" target="_blank" rel="noreferrer">
            <span>🌐</span>
            <span>YoungLife.org</span>
          </a>
          <a className="quick-link" href="https://www.instagram.com/younglife" target="_blank" rel="noreferrer">
            <span>📸</span>
            <span>Instagram</span>
          </a>
          <a className="quick-link" href="mailto:johnsoncounty@younglife.org">
            <span>✉️</span>
            <span>Email Us</span>
          </a>
          <a className="quick-link" href="tel:+19135550100">
            <span>📞</span>
            <span>Call Us</span>
          </a>
        </div>
      </section>
    </div>
  )
}
