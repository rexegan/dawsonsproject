import './Header.css'

const PAGE_TITLES = {
  home: 'Johnson County Young Life',
  events: 'Events',
  leaders: 'Our Leaders',
  connect: 'Connect',
  about: 'About Young Life',
}

export default function Header({ page }) {
  const isHome = page === 'home'

  return (
    <header className={`header ${isHome ? 'header--home' : ''}`}>
      {isHome ? (
        <div className="header-brand">
          <div className="header-logo">
            <span className="logo-yl">YL</span>
          </div>
          <div>
            <div className="header-title">Johnson County</div>
            <div className="header-subtitle">Young Life</div>
          </div>
        </div>
      ) : (
        <h1 className="header-page-title">{PAGE_TITLES[page]}</h1>
      )}
    </header>
  )
}
