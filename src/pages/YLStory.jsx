import { useState } from 'react'
import './YLStory.css'

const SECTIONS = [
  { id: 'history', label: '📖 History' },
  { id: 'mission', label: '✝️ Mission & Vision' },
  { id: 'programs', label: '🏕️ Programs' },
  { id: 'camps', label: '⛺ Camps' },
  { id: 'global', label: '🌍 Global Reach' },
  { id: 'stats', label: '📊 By the Numbers' },
  { id: 'jc', label: '🏡 Johnson County' },
]

const TIMELINE = [
  { year: '1938', title: 'A Young Preacher\'s Calling', body: 'Jim Rayburn, a seminary student in Dallas, TX, is challenged by a high school principal in Gainesville: "These kids won\'t come to church, but if you\'ll go to them, maybe you can get their attention." Rayburn begins visiting high school campuses.' },
  { year: '1941', title: 'Young Life is Born', body: 'Jim Rayburn officially founds Young Life in Gainesville, Texas. The core principle: go to where kids are — don\'t wait for them to come to you. The first club meets in a living room.' },
  { year: '1946', title: 'Star Ranch — First Camp', body: 'Young Life opens its first camp, Star Ranch, near Colorado Springs, CO. Rayburn believed camp was where real transformation happened: "It\'s a sin to bore a kid." The camping model becomes central to Young Life\'s approach.' },
  { year: '1950s', title: 'National Expansion', body: 'Young Life spreads rapidly across the United States. Rayburn trains a new generation of leaders, refining the "incarnational" ministry model — earning the right to be heard by genuinely caring about kids.' },
  { year: '1963', title: 'Malibu Club Opens', body: 'Young Life opens Malibu Club in British Columbia, Canada — one of the most beautiful camp properties in the world, accessible only by boat. It becomes an iconic destination for high schoolers for decades.' },
  { year: '1965', title: 'WyldLife Begins', body: 'Young Life launches ministry to middle schoolers, eventually branded WyldLife. Recognizing that faith formation often happens in early adolescence, YL extends its reach to 6th–8th graders.' },
  { year: '1970', title: 'International Expansion', body: 'Young Life begins work outside North America, starting in Europe. The mission: reach every adolescent on earth with the love of Jesus Christ, regardless of geography or culture.' },
  { year: '1987', title: 'Young Life Capernaum', body: 'Young Life launches Capernaum, a ministry specifically designed for kids with disabilities — a powerful demonstration that every young person deserves to hear and experience the love of God.' },
  { year: '2000s', title: 'Urban Ministry Growth', body: 'Young Life expands deeply into urban communities, planting staff and clubs in inner-city neighborhoods across the U.S. The organization wrestles honestly with issues of race, justice, and equity in ministry.' },
  { year: '2010s', title: 'College Ministry', body: 'Young Life College launches on campuses across America, walking alongside students from high school into university — continuing the relational ministry model into early adulthood.' },
  { year: 'Today', title: 'More Than 100 Countries', body: 'Young Life now operates in over 100 countries on 6 continents, with more than 6,000 paid staff and 200,000+ volunteers. Every week, hundreds of thousands of kids worldwide hear they are known, seen, and loved.' },
]

const CAMPS = [
  { name: 'Malibu Club', location: 'British Columbia, Canada', desc: 'Accessible only by boat, nestled in Princess Louisa Inlet. Often called "the most beautiful place on earth." HS camp.', img: '🏔️', url: 'https://www.younglife.org/find/camp-locations/' },
  { name: 'Crooked Creek Ranch', location: 'Fraser, Colorado', desc: 'A premier property in the Rocky Mountains — the primary middle school / WyldLife destination for Texas areas.', img: '⛰️', url: 'https://crookedcreek.younglife.org/' },
  { name: 'Frontier Ranch', location: 'Buena Vista, Colorado', desc: 'High-country Colorado HS camp with whitewater rafting, horseback riding, and breathtaking views of the Rockies.', img: '🤠', url: 'https://frontierranch.younglife.org/' },
  { name: 'Castaway Club', location: 'Detroit Lakes, Minnesota', desc: 'A lakeside paradise in the Minnesota north woods. HS camp known for watersports and excellent program.', img: '🌊', url: 'https://www.younglife.org/find/camp-locations/' },
  { name: 'Trail West Lodge', location: 'Buena Vista, Colorado', desc: 'Small, intimate HS camp for deeper discipleship. Stunning Collegiate Peaks backdrop.', img: '🌲', url: 'https://trailwest.younglife.org/' },
  { name: 'Sharptop Cove', location: 'Jasper, Georgia', desc: 'Southern Appalachian beauty. HS camp serving the southeastern U.S.', img: '🏕️', url: 'https://sharptopcove.younglife.org/' },
  { name: 'Woodleaf', location: 'Challenge, California', desc: 'In the Sierra Nevada foothills north of Sacramento. HS camp with stunning outdoor adventures.', img: '🌄', url: 'https://woodleaf.younglife.org/' },
  { name: 'Lake Champion', location: 'Glen Spey, New York', desc: 'Overlooking a beautiful lake in the Hudson Valley. HS camp serving the Northeast.', img: '🏞️', url: 'https://lakechampion.younglife.org/' },
  { name: 'Saranac Village', location: 'Saranac Lake, New York', desc: 'Adirondack lakefront property. Serves the Northeast and Canada.', img: '🛶', url: 'https://saranac.younglife.org/' },
  { name: 'Carolina Point', location: 'Brevard, North Carolina', desc: 'Nestled in the Blue Ridge Mountains with a pristine lake. HS camp for the Southeast.', img: '🌿', url: 'https://carolinapoint.younglife.org/' },
  { name: 'Washington Family Ranch', location: 'Antelope, Oregon', desc: 'Young Life\'s largest property — over 65,000 acres in the high Oregon desert. Incredible scale and beauty.', img: '🦅', url: 'https://www.younglife.org/find/camp-locations/' },
  { name: 'Oakbridge', location: 'Goshen, Indiana', desc: 'Midwest base camp with a beautiful lake and rolling hills. HS camp serving the Great Lakes region.', img: '🌾', url: 'https://www.younglife.org/find/camp-locations/' },
]

const PROGRAMS_INFO = [
  {
    name: 'YoungLife',
    color: '#1B4FA3',
    emoji: '🏫',
    grade: 'High School — 9th through 12th Grade',
    desc: 'The flagship program. Leaders build authentic friendships with high schoolers on their campuses, then invite them to weekly Club nights — fun, inclusive gatherings where kids hear about Jesus in a relevant, engaging way. The goal is never to program kids to death, but to earn the right to be heard.',
    elements: ['Weekly Club nights (living rooms, schools, community spaces)', 'Campus presence — leaders at games, lunch, school events', 'Summer camp (Malibu, Frontier Ranch, Crooked Creek, etc.)', 'Campaigners — weekly small-group Bible study for interested kids', 'One-on-one time with leaders'],
  },
  {
    name: 'WyldLife',
    color: '#3AAB35',
    emoji: '🎒',
    grade: 'Middle School — 6th through 8th Grade',
    desc: 'Middle school is arguably the most formative — and most turbulent — stretch of adolescence. WyldLife leaders dive into that chaos with love, humor, and genuine relationship. Club nights are high-energy, silly, and welcoming. Camp sends middle schoolers to Crooked Creek Ranch.',
    elements: ['Weekly WyldLife Club nights', 'Campus and school presence', 'Crooked Creek Ranch summer camp', 'Campaigners small groups', 'Bridge to high school YL program'],
  },
  {
    name: 'Campaigners',
    color: '#854883',
    emoji: '📖',
    grade: 'All Students Who Want to Go Deeper',
    desc: 'After a kid makes a commitment to Christ or expresses interest in faith, Campaigners is the next step. Small groups of 4–12 students meet weekly with a leader to study the Bible, ask hard questions, and grow in community. This is discipleship in action.',
    elements: ['Weekly small-group Bible study', 'Student-led prayer and sharing', 'Mentorship from volunteer leaders', 'Leadership development for older students'],
  },
  {
    name: 'Capernaum',
    color: '#d97706',
    emoji: '♿',
    grade: 'Students with Disabilities — All Ages',
    desc: 'Named after the town where Jesus healed the paralyzed man lowered through a roof by four determined friends — Capernaum is Young Life\'s ministry to kids with intellectual, physical, and developmental disabilities. Every kid deserves a friend and a chance to experience God\'s love.',
    elements: ['Inclusive Club nights adapted for all abilities', 'One-on-one friendship with trained volunteers', 'Capernaum summer camps', 'Family support and community'],
  },
  {
    name: 'Young Life College',
    color: '#0891b2',
    emoji: '🎓',
    grade: 'College Students',
    desc: 'The relational bridge from high school into the college years. Young Life College sends staff and volunteer leaders onto university campuses to continue walking with students through one of life\'s biggest transitions. Same DNA — go to them, earn the right to be heard, tell them about Jesus.',
    elements: ['Campus presence at universities', 'Weekly gatherings', 'Small-group Campaigners', 'Discipleship and leadership development'],
  },
]

const GLOBAL_REGIONS = [
  { region: 'North America', countries: 'United States, Canada, Mexico', staff: '4,000+', note: 'The original heartland of YL. All 50 US states have YL presence.' },
  { region: 'Europe', countries: 'UK, Germany, France, Netherlands, Spain, Switzerland, Scandinavia, and more', staff: '500+', note: 'YL Europe has been active since the 1970s and continues to grow.' },
  { region: 'Africa', countries: 'South Africa, Kenya, Uganda, Ghana, Tanzania, Rwanda, Ethiopia, and more', staff: '300+', note: 'One of the fastest-growing YL regions in the world. Incredible Kingdom work.' },
  { region: 'Latin America', countries: 'Brazil, Argentina, Colombia, Chile, Peru, Ecuador, and more', staff: '400+', note: 'Deep roots in South America going back decades.' },
  { region: 'Asia Pacific', countries: 'Australia, New Zealand, Japan, South Korea, Philippines, and more', staff: '200+', note: 'Growing ministry across a vast and diverse region.' },
  { region: 'Middle East & North Africa', countries: 'Multiple countries — many sensitive and not publicly named', staff: 'Confidential', note: 'Courageous ministry in some of the most restricted nations on earth.' },
]

const STATS = [
  { label: 'Countries Reached', value: '100+', color: '#1B4FA3' },
  { label: 'Continents', value: '6', color: '#3AAB35' },
  { label: 'Paid Staff Worldwide', value: '6,000+', color: '#854883' },
  { label: 'Volunteer Leaders', value: '200,000+', color: '#d97706' },
  { label: 'Kids in Club Weekly', value: '1M+', color: '#0891b2' },
  { label: 'Young Life Properties', value: '35+', color: '#dc2626' },
  { label: 'Years of Ministry', value: '80+', color: '#1B4FA3' },
  { label: 'US States with YL', value: 'All 50', color: '#3AAB35' },
]

export default function YLStory() {
  const [section, setSection] = useState('history')
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="ylstory">
      {/* Hero */}
      <div className="ylstory-hero">
        <div className="ylstory-hero-content">
          <div className="ylstory-hero-logo">YL</div>
          <h1 className="ylstory-hero-title">The Young Life Story</h1>
          <p className="ylstory-hero-sub">Over 80 years of going to where kids are — earning the right to be heard.</p>
          <div className="ylstory-hero-quote">"It's a sin to bore a kid." — Jim Rayburn, Founder</div>
        </div>
      </div>

      {/* Section nav */}
      <div className="ylstory-nav">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            className={`ylstory-nav-btn ${section === s.id ? 'ylstory-nav-btn--active' : ''}`}
            onClick={() => setSection(s.id)}
          >{s.label}</button>
        ))}
      </div>

      {/* HISTORY */}
      {section === 'history' && (
        <div className="ylstory-section">
          <div className="ylstory-section-intro">
            <h2>How It All Started</h2>
            <p>Young Life began not in a church, not in a boardroom, but on a high school campus in a small Texas town — because a young man named Jim Rayburn believed that every teenager deserved to hear, in their own language, that they are deeply loved by God.</p>
          </div>
          <div className="ylstory-timeline">
            {TIMELINE.map((t, i) => (
              <div key={i} className="ylstory-timeline-item">
                <div className="ylstory-timeline-year">{t.year}</div>
                <div className="ylstory-timeline-dot" />
                <div className="ylstory-timeline-card">
                  <div className="ylstory-timeline-title">{t.title}</div>
                  <div className="ylstory-timeline-body">{t.body}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="ylstory-founder-card">
            <div className="ylstory-founder-avatar">JR</div>
            <div>
              <div className="ylstory-founder-name">Jim Rayburn III (1909 – 1970)</div>
              <p className="ylstory-founder-bio">Born in Ft. Worth, Texas. Attended Dallas Theological Seminary. Called by God to reach kids who would never walk through church doors. His radical, relational approach — going to kids wherever they are, loving them with no strings attached, then telling them the greatest news they'll ever hear — became the DNA of Young Life worldwide. Rayburn's legacy endures in every club room, every campfire, and every student who's ever felt seen and loved.</p>
            </div>
          </div>
        </div>
      )}

      {/* MISSION */}
      {section === 'mission' && (
        <div className="ylstory-section">
          <div className="ylstory-mission-hero">
            <h2>Our Mission</h2>
            <p className="ylstory-mission-statement">"Introducing adolescents to Jesus Christ and helping them grow in their faith."</p>
            <p style={{color:'var(--gray-600)',lineHeight:1.7,maxWidth:680,margin:'0 auto'}}>That's it. No footnotes. No asterisks. Young Life exists for one reason: to give every kid on earth a chance to hear who Jesus is and what He's done — in a way they can actually understand and receive.</p>
          </div>
          <div className="ylstory-principles">
            <h3>Core Principles</h3>
            <div className="ylstory-principles-grid">
              {[
                { icon: '🚶', title: 'Incarnational Ministry', body: 'Jesus didn\'t wait for people to come to Him in the synagogue. He went to them. Young Life does the same — showing up on campuses, at games, at lunch tables — because earned relationship is the foundation of everything.' },
                { icon: '❤️', title: 'Earning the Right to Be Heard', body: 'Before a leader ever mentions the name of Jesus, they\'ve invested weeks or months just being a consistent, caring presence in a student\'s life. Love first. Message second. Always.' },
                { icon: '🎉', title: 'The Attractiveness of Jesus', body: 'Jim Rayburn believed that if people truly saw Jesus as He is — without the boring, religious packaging — they\'d be irresistibly drawn to Him. Young Life works hard to present Jesus in all His genuine beauty and power.' },
                { icon: '🏕️', title: 'The Power of Camp', body: 'Remove a kid from their normal environment, put them in the most beautiful place they\'ve ever seen, love them with excellence, and then tell them the best news they\'ve ever heard. Camp is where countless students first open their hearts to God.' },
                { icon: '👥', title: 'Volunteer-Driven', body: 'Young Life is powered by ordinary people — teachers, coaches, nurses, college students, stay-at-home parents — who give their time to love kids. No ministry degree required. Just a willing heart and a love for teenagers.' },
                { icon: '📖', title: 'Discipleship Through Campaigners', body: 'Coming to faith is just the beginning. Campaigners small groups are where students learn to read the Bible, pray, and live out their faith alongside others who are on the same journey.' },
              ].map((p, i) => (
                <div key={i} className="ylstory-principle-card">
                  <div className="ylstory-principle-icon">{p.icon}</div>
                  <div className="ylstory-principle-title">{p.title}</div>
                  <div className="ylstory-principle-body">{p.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PROGRAMS */}
      {section === 'programs' && (
        <div className="ylstory-section">
          <div className="ylstory-section-intro">
            <h2>Young Life Programs</h2>
            <p>From middle school to college, from typical teenagers to kids with disabilities — Young Life has a ministry for every young person. Each program shares the same DNA: relational, fun, honest, and centered on the love of Jesus.</p>
          </div>
          {PROGRAMS_INFO.map((prog, i) => (
            <div key={i} className="ylstory-prog-card" style={{'--prog-color': prog.color}}>
              <div className="ylstory-prog-header">
                <span className="ylstory-prog-emoji">{prog.emoji}</span>
                <div>
                  <div className="ylstory-prog-name">{prog.name}</div>
                  <div className="ylstory-prog-grade">{prog.grade}</div>
                </div>
              </div>
              <p className="ylstory-prog-desc">{prog.desc}</p>
              <div className="ylstory-prog-elements">
                {prog.elements.map((el, j) => (
                  <div key={j} className="ylstory-prog-el">✓ {el}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CAMPS */}
      {section === 'camps' && (
        <div className="ylstory-section">
          <div className="ylstory-section-intro">
            <h2>Young Life Camps</h2>
            <p>Young Life owns and operates some of the most spectacular camp properties in North America. The philosophy: give kids the best week of their lives — then tell them why. These aren't church retreats. They're world-class experiences where God shows up powerfully.</p>
            <p style={{color:'var(--gray-500)',fontStyle:'italic'}}>Jim Rayburn: <strong>"It's a sin to bore a kid."</strong> Young Life camps are anything but boring.</p>
          </div>
          <div className="ylstory-camps-grid">
            {CAMPS.map((camp, i) => (
              <div key={i} className="ylstory-camp-card">
                <div className="ylstory-camp-emoji">{camp.img}</div>
                <div className="ylstory-camp-name">{camp.name}</div>
                <div className="ylstory-camp-loc">📍 {camp.location}</div>
                <div className="ylstory-camp-desc">{camp.desc}</div>
                <a
                  href={camp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ylstory-camp-link"
                  onClick={e => e.stopPropagation()}
                >
                  Visit Website →
                </a>
              </div>
            ))}
          </div>
          <div className="ylstory-camp-note">
            <strong>Johnson County YL</strong> primarily sends high schoolers to <strong>Malibu Club</strong> and middle schoolers (WyldLife) to <strong>Crooked Creek Ranch</strong>. Camp is often the week that changes a student's life forever.
          </div>
        </div>
      )}

      {/* GLOBAL */}
      {section === 'global' && (
        <div className="ylstory-section">
          <div className="ylstory-section-intro">
            <h2>Young Life Worldwide</h2>
            <p>The same kid who might wander into a living room club in Cleburne, Texas is being loved by a Young Life leader in Nairobi, São Paulo, Tokyo, and rural France. The mission is global. The method is always the same: go to them. Earn the right. Tell them about Jesus.</p>
          </div>
          <div className="ylstory-global-map-note">🌍 Young Life is active in <strong>over 100 countries</strong> across all 6 inhabited continents.</div>
          <div className="ylstory-global-grid">
            {GLOBAL_REGIONS.map((r, i) => (
              <div key={i} className="ylstory-global-card">
                <div className="ylstory-global-region">{r.region}</div>
                <div className="ylstory-global-countries">{r.countries}</div>
                <div className="ylstory-global-staff">Staff / volunteers: {r.staff}</div>
                <div className="ylstory-global-note">{r.note}</div>
              </div>
            ))}
          </div>
          <div className="ylstory-global-hq">
            <strong>Global Headquarters:</strong> Colorado Springs, Colorado — where it all comes together from 100+ countries into one unified mission.
          </div>
        </div>
      )}

      {/* STATS */}
      {section === 'stats' && (
        <div className="ylstory-section">
          <div className="ylstory-section-intro">
            <h2>Young Life by the Numbers</h2>
            <p>The numbers are staggering — but behind every statistic is a real kid who was shown up for, cared about, and told they matter to God.</p>
          </div>
          <div className="ylstory-stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="ylstory-stat-card" style={{'--stat-color': s.color}}>
                <div className="ylstory-stat-value">{s.value}</div>
                <div className="ylstory-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="ylstory-stat-note">
            <p>Young Life's annual budget exceeds <strong>$400 million</strong>, funded almost entirely by local donors, area fundraisers, and national supporters — making the work in Johnson County directly connected to what you give.</p>
            <p>Every dollar raised locally stays primarily in Johnson County — funding leaders, camp scholarships, events, and the ongoing work of reaching every kid in the county.</p>
          </div>
        </div>
      )}

      {/* JOHNSON COUNTY */}
      {section === 'jc' && (
        <div className="ylstory-section">
          <div className="ylstory-section-intro">
            <h2>Young Life in Johnson County, Texas</h2>
            <p>Johnson County Young Life is part of the North Texas Region — one of the most active and vibrant YL regions in the country. Our home turf is Cleburne, Burleson, Joshua, Alvarado, Godley, Venus, Grandview, and the surrounding communities.</p>
          </div>
          <div className="ylstory-jc-grid">
            <div className="ylstory-jc-card">
              <div className="ylstory-jc-icon">🏫</div>
              <div className="ylstory-jc-title">Our Schools</div>
              <p>We're present on campuses across Johnson County — from Cleburne and Burleson to smaller districts like Godley, Alvarado, Joshua, Venus, and Rio Vista. Every school has teenagers who need to know they are loved.</p>
            </div>
            <div className="ylstory-jc-card">
              <div className="ylstory-jc-icon">👥</div>
              <div className="ylstory-jc-title">Our Students</div>
              <p>We serve over 150 registered students across YoungLife (9th–12th grade) and WyldLife (6th–8th grade). Each one is known by name. Each one matters.</p>
            </div>
            <div className="ylstory-jc-card">
              <div className="ylstory-jc-icon">🙌</div>
              <div className="ylstory-jc-title">Our Leaders</div>
              <p>Our volunteer leader team includes teachers, coaches, young professionals, and parents — people from across Johnson County who give their time week after week to love teenagers well.</p>
            </div>
            <div className="ylstory-jc-card">
              <div className="ylstory-jc-icon">🤝</div>
              <div className="ylstory-jc-title">Our Committee</div>
              <p>Young Life Committee is the backbone of the local area — a group of community leaders who pray, fundraise, and advocate so that every kid in Johnson County can hear about Jesus. Monthly meetings at First Baptist Cleburne.</p>
            </div>
            <div className="ylstory-jc-card">
              <div className="ylstory-jc-icon">💰</div>
              <div className="ylstory-jc-title">Fundraising</div>
              <p>Our annual Clay Shoot, Golf Tournament, Fall Banquet, and Spring Banquet raise the resources to fund leaders, send kids to camp, and sustain the mission year-round. Every event is a chance to invite the community into this work.</p>
            </div>
            <div className="ylstory-jc-card">
              <div className="ylstory-jc-icon">⛺</div>
              <div className="ylstory-jc-title">Camp Scholarships</div>
              <p>No student is turned away from camp because of financial need. Our scholarship fund ensures that every kid who wants to go — goes. Camp is often the week that changes everything.</p>
            </div>
          </div>
          <div className="ylstory-jc-verse">
            <div className="ylstory-jc-verse-text">"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."</div>
            <div className="ylstory-jc-verse-ref">Jeremiah 29:11</div>
          </div>
        </div>
      )}
    </div>
  )
}
