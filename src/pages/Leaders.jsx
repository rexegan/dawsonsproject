import './Leaders.css'

const LEADERS = [
  {
    id: 1,
    name: 'Tyler Brooks',
    role: 'Area Director',
    program: 'Johnson County YL',
    initials: 'TB',
    color: '#E8392A',
    bio: 'Tyler has been with Young Life for 12 years and is passionate about every kid knowing they are loved. Father of 3, huge Chiefs fan.',
    email: 'tyler.brooks@younglife.org',
    phone: '(913) 555-0101',
  },
  {
    id: 2,
    name: 'Megan Carter',
    role: 'WyldLife Leader',
    program: 'Middle School',
    initials: 'MC',
    color: '#1d4ed8',
    bio: 'Megan leads WyldLife and loves helping 6th-8th graders discover who they are and whose they are. She teaches at Blue Valley Middle.',
    email: 'megan.carter@younglife.org',
    phone: '(913) 555-0102',
  },
  {
    id: 3,
    name: 'Josh & Kayla Nguyen',
    role: 'YoungLife Leaders',
    program: 'High School',
    initials: 'JN',
    color: '#059669',
    bio: 'Josh and Kayla are a husband-wife team who pour into high schoolers across Johnson County. They met at YoungLife camp back in the day!',
    email: 'josh.nguyen@younglife.org',
    phone: '(913) 555-0103',
  },
  {
    id: 4,
    name: 'Danielle Moore',
    role: 'WyldLife Leader',
    program: 'Middle School',
    initials: 'DM',
    color: '#7c3aed',
    bio: 'Danielle brings incredible energy to every club night. She volunteers 20+ hours a week because she believes every middle schooler deserves a caring adult in their corner.',
    email: 'danielle.moore@younglife.org',
    phone: '(913) 555-0104',
  },
  {
    id: 5,
    name: 'Marcus & Tiffany Hill',
    role: 'YoungLife Leaders',
    program: 'High School',
    initials: 'MH',
    color: '#d97706',
    bio: 'Marcus coaches soccer at BVNW and Tiffany is in education. Together they reach high school kids through sports and authentic friendship.',
    email: 'marcus.hill@younglife.org',
    phone: '(913) 555-0105',
  },
]

export default function Leaders() {
  return (
    <div className="leaders">
      <div className="leaders-hero">
        <p className="leaders-sub">The People Behind It All</p>
        <h2 className="leaders-heading">Our Leaders</h2>
        <p className="leaders-desc">Volunteers and staff who show up for every kid, every week.</p>
      </div>

      <div className="leaders-list">
        {LEADERS.map((l) => (
          <div className="leader-card" key={l.id}>
            <div className="leader-top">
              <div className="leader-avatar" style={{ background: l.color }}>
                {l.initials}
              </div>
              <div className="leader-info">
                <h4 className="leader-name">{l.name}</h4>
                <p className="leader-role">{l.role}</p>
                <span className="leader-program" style={{ color: l.color, background: l.color + '18' }}>
                  {l.program}
                </span>
              </div>
            </div>
            <p className="leader-bio">{l.bio}</p>
            <div className="leader-contact">
              <a href={`mailto:${l.email}`} className="leader-btn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                Email
              </a>
              <a href={`tel:${l.phone}`} className="leader-btn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                Call
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
