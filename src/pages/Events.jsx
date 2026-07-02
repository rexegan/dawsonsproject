import './Events.css'

const EVENTS = [
  {
    id: 1,
    month: 'JUL',
    day: '11',
    title: 'WyldLife Club Night',
    subtitle: 'Middle School',
    time: '7:00 PM',
    location: 'Johnson County Community Center',
    color: '#E8392A',
    tag: 'WyldLife',
  },
  {
    id: 2,
    month: 'JUL',
    day: '12',
    title: 'YoungLife Club',
    subtitle: 'High School',
    time: '7:30 PM',
    location: '456 Oak Ridge Drive, Olathe KS',
    color: '#1d4ed8',
    tag: 'YoungLife',
  },
  {
    id: 3,
    month: 'JUL',
    day: '16',
    title: 'Campaigners Bible Study',
    subtitle: 'All Students',
    time: '4:00 PM',
    location: 'Leaders\' Home — address TBA',
    color: '#059669',
    tag: 'Campaigners',
  },
  {
    id: 4,
    month: 'JUL',
    day: '19',
    title: 'WyldLife Club Night',
    subtitle: 'Middle School',
    time: '7:00 PM',
    location: 'Johnson County Community Center',
    color: '#E8392A',
    tag: 'WyldLife',
  },
  {
    id: 5,
    month: 'JUL',
    day: '24',
    title: 'Summer Pool Party',
    subtitle: 'All Students',
    time: '2:00 PM',
    location: 'Leawood City Aquatic Center',
    color: '#0891b2',
    tag: 'Special Event',
  },
  {
    id: 6,
    month: 'AUG',
    day: '4',
    title: 'Malibu Camp — Departs',
    subtitle: 'High School Camp',
    time: '6:00 AM',
    location: 'Olathe Northwest High School Parking Lot',
    color: '#d97706',
    tag: 'Camp',
  },
  {
    id: 7,
    month: 'AUG',
    day: '11',
    title: 'Silver Cliff Ranch — Departs',
    subtitle: 'Middle School Camp',
    time: '7:00 AM',
    location: 'Blue Valley North High School Parking Lot',
    color: '#7c3aed',
    tag: 'Camp',
  },
]

export default function Events() {
  return (
    <div className="events">
      <div className="events-hero">
        <p className="events-sub">July – August 2025</p>
        <h2 className="events-heading">Upcoming Events</h2>
      </div>

      <div className="events-list">
        {EVENTS.map((e) => (
          <div className="event-card" key={e.id}>
            <div className="event-date" style={{ background: e.color }}>
              <span className="event-month">{e.month}</span>
              <span className="event-day">{e.day}</span>
            </div>
            <div className="event-info">
              <span className="event-tag" style={{ color: e.color }}>{e.tag}</span>
              <h4 className="event-title">{e.title}</h4>
              <p className="event-sub">{e.subtitle}</p>
              <div className="event-meta">
                <span>🕐 {e.time}</span>
                <span>📍 {e.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
