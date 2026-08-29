import { useState } from 'react'
import Modal from '../components/Modal'
import './Resources.css'

const NEWS = [
  {
    id:'n1', level:'Local', date:'2026-08-15',
    title:'Johnson County Young Life Celebrates 20 Years of Ministry',
    summary:'The Johnson County area marks two decades of reaching students in Cleburne, Burleson, and surrounding communities with over 4,000 students touched by the ministry.',
    source:'Cleburne Times-Review', url:'https://www.cleburnetimesreview.com',
    body:'Johnson County Young Life has served the community for 20 years, growing from a single club in Cleburne to programs across seven cities including Burleson, Alvarado, Joshua, and Godley. Area Director Theresa Boydston credits the commitment of volunteer leaders and generous donors for the milestone.',
  },
  {
    id:'n2', level:'Local', date:'2026-07-28',
    title:'Annual Clay Shoot Fundraiser Raises Record Funds for Local Youth',
    summary:'The annual charity clay shoot raised over $45,000 for Young Life programming in Johnson County.',
    source:'Burleson Star', url:'https://www.burlesonnow.com',
    body:'Over 120 participants gathered at the Johnson County range for the annual Clay Shoot fundraiser. Proceeds support summer camps, weekly club nights, and leadership training for student leaders across the county.',
  },
  {
    id:'n3', level:'State', date:'2026-08-01',
    title:'Texas Young Life Regions Report Record Summer Camp Enrollment',
    summary:'Texas areas saw a 23% increase in summer camp participation, with North Texas leading the growth.',
    source:'Young Life Texas Region', url:'https://www.younglife.org',
    body:'Regional Director Holly reports that North Texas saw the highest growth rate of any region in Texas this summer. Young Life\'s Texas camps at Frontier Ranch, Woodleaf, and Windy Gap hosted thousands of Texas students.',
  },
  {
    id:'n4', level:'State', date:'2026-07-10',
    title:'Texas Legislature Supports Faith-Based Youth Organizations with New Grant Program',
    summary:'A new state grant program will provide matching funds for non-profit youth organizations serving underserved communities.',
    source:'Texas Tribune', url:'https://www.texastribune.org',
    body:'The Texas Legislature passed HB 2814, establishing a $5M matching grant fund for faith-based non-profits serving at-risk youth. Organizations with 501(c)(3) status serving communities of under 100,000 residents are eligible to apply. Applications open September 1, 2026.',
  },
  {
    id:'n5', level:'Federal', date:'2026-06-20',
    title:'IRS Updates 501(c)(3) Compliance Requirements for 2026–2027',
    summary:'New guidance clarifies political activity restrictions and reporting thresholds for charitable organizations.',
    source:'IRS.gov', url:'https://www.irs.gov',
    body:'The IRS released updated guidance (Notice 2026-41) clarifying that 501(c)(3) organizations must ensure all fundraising activities, including third-party events, are reported on Form 990. Key changes affect organizations with annual revenues over $250,000. Young Life organizations should review their fiscal year reporting procedures.',
  },
  {
    id:'n6', level:'Federal', date:'2026-05-30',
    title:'Congress Advances Bill to Expand Charitable Giving Deductions',
    summary:'Proposed legislation would raise the cap on charitable deductions for individual donors, potentially boosting donations to non-profits nationwide.',
    source:'The Hill', url:'https://thehill.com',
    body:'The Universal Charitable Giving Act would allow donors who do not itemize deductions to still deduct charitable contributions up to $4,000 per individual. If passed, this could increase donations to organizations like Young Life by an estimated 8–12% nationally.',
  },
]

const CAMPS = [
  {
    id:'c1', name:'Frontier Ranch', type:'YoungLife', state:'CO',
    address:'1000 Frontier Ranch Rd, Buena Vista, CO 81211',
    phone:'(719) 395-6343', website:'https://www.younglife.org/camps',
    description:'High-adventure camp in the Colorado Rockies. The flagship YoungLife camp offering whitewater rafting, rock climbing, zip lines, and more.',
    capacity:720, season:'June–August',
  },
  {
    id:'c2', name:'Windy Gap', type:'YoungLife', state:'NC',
    address:'1061 Camp Windy Gap Rd, Ridgecrest, NC 28770',
    phone:'(828) 686-2451', website:'https://www.younglife.org/camps',
    description:'Blue Ridge Mountain camp known for its creative programming, excellent food, and life-changing community.',
    capacity:500, season:'May–October',
  },
  {
    id:'c3', name:'Woodleaf', type:'YoungLife', state:'CA',
    address:'14911 Challenge Cut Off Rd, Challenge, CA 95925',
    phone:'(530) 675-2209', website:'https://www.younglife.org/camps',
    description:'Northern California camp set on 700 acres in the Feather River Canyon. Features a waterslide, rappelling, and horseback riding.',
    capacity:540, season:'June–August',
  },
  {
    id:'c4', name:'Washington Family Ranch', type:'YoungLife', state:'OR',
    address:'87500 Camp Hancock Rd, Antelope, OR 97001',
    phone:'(541) 489-3344', website:'https://www.younglife.org/camps',
    description:'Expansive high desert camp in central Oregon with world-class facilities including a 500-seat dining hall and state-of-the-art recreation.',
    capacity:900, season:'June–August',
  },
  {
    id:'c5', name:'Crooked Creek Ranch', type:'WyldLife', state:'CO',
    address:'49390 Hwy 125, Granby, CO 80446',
    phone:'(970) 887-3342', website:'https://www.younglife.org/camps',
    description:'Premier WyldLife camp designed specifically for middle school students in the Colorado mountains.',
    capacity:480, season:'June–August',
  },
  {
    id:'c6', name:'SharpTop Cove', type:'WyldLife', state:'GA',
    address:'1 SharpTop Cove Ln, Jasper, GA 30143',
    phone:'(706) 268-1010', website:'https://www.younglife.org/camps',
    description:'Georgia mountain camp serving WyldLife middle schoolers with a zipline, waterslide, rock wall, and incredible program.',
    capacity:400, season:'June–August',
  },
]

const GRANTS = [
  // ── CORPORATE ──────────────────────────────────────────────────────────────
  {
    id:'g1', category:'Corporate', name:'Walmart Foundation — Community Grant',
    funder:'Walmart Foundation', amount:'$250 – $5,000', cycle:'Rolling / Annual',
    eligibility:'501(c)(3) nonprofits serving communities near a Walmart store.',
    focus:'Youth development, education, hunger relief, community betterment.',
    tips:'Apply through local store manager. Each store has a separate budget. Emphasize local community impact and student count served.',
    website:'https://walmart.org/how-we-give/local-community-grants',
    deadline:'Applications accepted year-round; reviewed quarterly.',
    difficulty:'Easy',
  },
  {
    id:'g2', category:'Corporate', name:'Target Foundation — Community Grant',
    funder:'Target Corporation', amount:'$1,000 – $10,000', cycle:'Annual',
    eligibility:'501(c)(3) youth and education nonprofits near Target stores.',
    focus:'Education, arts, youth development.',
    tips:'Apply through local Target store. Highlight measurable outcomes — number of students served, attendance rates, camp placements.',
    website:'https://corporate.target.com/sustainability-governance/philanthropy',
    deadline:'Varies by store; typically spring and fall cycles.',
    difficulty:'Easy',
  },
  {
    id:'g3', category:'Corporate', name:'Bank of America Charitable Foundation',
    funder:'Bank of America', amount:'$5,000 – $50,000', cycle:'Annual',
    eligibility:'501(c)(3) organizations in Bank of America markets.',
    focus:'Workforce development, community development, arts & culture.',
    tips:'Connect with a local BofA market president or relationship manager. Personal relationships greatly increase success rate.',
    website:'https://about.bankofamerica.com/en/making-an-impact/charitable-foundation-funding',
    deadline:'Varies by market; applications typically open in Q1.',
    difficulty:'Medium',
  },
  {
    id:'g4', category:'Corporate', name:'Wells Fargo Foundation',
    funder:'Wells Fargo', amount:'$5,000 – $25,000', cycle:'Annual',
    eligibility:'501(c)(3) nonprofits in Wells Fargo banking communities.',
    focus:'Financial health, housing, small business, diversity & inclusion.',
    tips:'Strongest fit when connecting Young Life\'s economic empowerment angle — helping at-risk youth avoid poverty through mentorship.',
    website:'https://www.wellsfargo.com/about/corporate-responsibility/community-giving/',
    deadline:'Rolling applications reviewed quarterly.',
    difficulty:'Medium',
  },
  {
    id:'g5', category:'Corporate', name:'ExxonMobil Foundation — Educational Grants',
    funder:'ExxonMobil', amount:'$10,000 – $100,000', cycle:'Annual',
    eligibility:'501(c)(3) education and youth STEM nonprofits.',
    focus:'Math, science education, community development in ExxonMobil operating areas.',
    tips:'Strong fit for Johnson County given ExxonMobil\'s presence in Texas. Frame around academic achievement and keeping students in school.',
    website:'https://corporate.exxonmobil.com/community-engagement',
    deadline:'Applications accepted annually; typically Q1–Q2.',
    difficulty:'Medium',
  },
  {
    id:'g6', category:'Corporate', name:'AT&T Believes — Community Grants',
    funder:'AT&T', amount:'$5,000 – $50,000', cycle:'Annual',
    eligibility:'501(c)(3) nonprofits focused on education and digital inclusion.',
    focus:'Education, digital literacy, workforce development for youth.',
    tips:'Emphasize how Young Life connects students who might otherwise fall through the cracks, and any digital/communication components.',
    website:'https://about.att.com/csr/home/community.html',
    deadline:'Invitation-based; reach out to local AT&T community affairs manager.',
    difficulty:'Hard',
  },

  // ── FAITH-BASED & MINISTRY ────────────────────────────────────────────────
  {
    id:'g7', category:'Faith-Based', name:'Maclellan Foundation',
    funder:'Maclellan Foundation', amount:'$10,000 – $200,000', cycle:'Annual',
    eligibility:'Christian nonprofits with strong evangelical mission alignment.',
    focus:'Christian ministry, youth discipleship, church planting, evangelism.',
    tips:'Very strong fit for Young Life. Frame around spiritual formation, campus ministry, and reproducible discipleship model. Submit a detailed theory of change.',
    website:'https://www.maclellan.net',
    deadline:'Letter of Inquiry accepted year-round; grant decisions in Q2 and Q4.',
    difficulty:'Medium',
  },
  {
    id:'g8', category:'Faith-Based', name:'M.J. Murdock Charitable Trust',
    funder:'M.J. Murdock Charitable Trust', amount:'$25,000 – $500,000', cycle:'Annual',
    eligibility:'Nonprofits in Pacific Northwest and select faith-aligned organizations nationally.',
    focus:'Arts, education, health, human services, scientific research, faith.',
    tips:'Competitive but excellent fit for faith-based youth ministries. Requires strong board governance documentation and multi-year financial statements.',
    website:'https://murdocktrust.org',
    deadline:'Applications accepted year-round; reviewed quarterly.',
    difficulty:'Hard',
  },
  {
    id:'g9', category:'Faith-Based', name:'Mustard Seed Foundation — Harvey Fellows',
    funder:'Mustard Seed Foundation', amount:'$5,000 – $30,000', cycle:'Annual',
    eligibility:'Christian organizations advancing kingdom impact in underserved communities.',
    focus:'Christian ministry, community development, youth, leadership development.',
    tips:'Emphasize leader development pipeline — how Young Life trains young adults to become ministry leaders. Show long-term kingdom ROI.',
    website:'https://www.msfdn.org',
    deadline:'Applications open in the fall for following year funding.',
    difficulty:'Medium',
  },
  {
    id:'g10', category:'Faith-Based', name:'National Christian Foundation — Giving Funds',
    funder:'National Christian Foundation', amount:'Varies — donor-advised', cycle:'Ongoing',
    eligibility:'Any evangelical 501(c)(3) or fiscally sponsored Christian ministry.',
    focus:'All Christian ministry categories.',
    tips:'NCF connects donors with ministries through its giving fund platform. Enroll Young Life with NCF so donors who already give through NCF can easily support you.',
    website:'https://www.ncfgiving.com',
    deadline:'No formal deadline — relationship-based.',
    difficulty:'Easy',
  },
  {
    id:'g11', category:'Faith-Based', name:'Lilly Endowment — Religion Initiatives',
    funder:'Lilly Endowment', amount:'$50,000 – $2,000,000', cycle:'Annual by initiative',
    eligibility:'501(c)(3) religious and educational organizations.',
    focus:'Christian ministry, pastoral development, religious education, youth faith formation.',
    tips:'Lilly issues specific RFPs (Request for Proposals) for each initiative. Monitor their website. Best fit: Youth Theology Initiative or Thriving in Ministry.',
    website:'https://lillyendowment.org/our-work/religion/',
    deadline:'Varies by initiative; watch for annual RFP releases.',
    difficulty:'Hard',
  },

  // ── YOUTH & COMMUNITY ─────────────────────────────────────────────────────
  {
    id:'g12', category:'Youth & Community', name:'Annie E. Casey Foundation',
    funder:'Annie E. Casey Foundation', amount:'$50,000 – $500,000', cycle:'Annual',
    eligibility:'501(c)(3) nonprofits improving outcomes for disadvantaged youth.',
    focus:'Child welfare, youth development, poverty reduction, family strengthening.',
    tips:'Frame Young Life\'s work around breaking cycles of poverty through mentorship and community connection. Data on long-term student outcomes is key.',
    website:'https://www.aecf.org/work/grant-making',
    deadline:'Primarily invitation-based; submit a letter of inquiry to start.',
    difficulty:'Hard',
  },
  {
    id:'g13', category:'Youth & Community', name:'W.K. Kellogg Foundation',
    funder:'W.K. Kellogg Foundation', amount:'$75,000 – $1,000,000', cycle:'Annual',
    eligibility:'Nonprofits advancing racial equity and youth development.',
    focus:'Education, food security, family economic security, racial equity.',
    tips:'Competitive. Strong fit if Johnson County Young Life can demonstrate work with underserved or minority youth populations. Equity narrative is essential.',
    website:'https://www.wkkf.org/grants',
    deadline:'Invitation-based; submit online letter of inquiry.',
    difficulty:'Hard',
  },
  {
    id:'g14', category:'Youth & Community', name:'Johnson County Community Foundation',
    funder:'Johnson County (TX) Community Foundation', amount:'$1,000 – $25,000', cycle:'Annual',
    eligibility:'Nonprofits serving Johnson County, Texas residents.',
    focus:'Education, arts, community betterment, youth.',
    tips:'Highest likelihood of success — local foundation, local mission. Apply every year. Attend foundation events and build relationships with board members.',
    website:'https://www.jccf.net',
    deadline:'Typically spring cycle; watch local announcements.',
    difficulty:'Easy',
  },
  {
    id:'g15', category:'Youth & Community', name:'United Way of Tarrant County',
    funder:'United Way', amount:'$5,000 – $50,000', cycle:'Annual',
    eligibility:'Nonprofits serving Tarrant/Johnson County with measurable outcomes.',
    focus:'Education, income, health, basic needs.',
    tips:'Become a United Way funded partner — requires application, site visit, and outcomes reporting. Once approved, funding renews annually.',
    website:'https://www.unitedwaytarrant.org',
    deadline:'Partner applications typically open in late winter.',
    difficulty:'Medium',
  },
  {
    id:'g16', category:'Youth & Community', name:'Charles Butt Foundation (H-E-B)',
    funder:'Charles Butt Foundation / H-E-B', amount:'$10,000 – $100,000', cycle:'Annual',
    eligibility:'Texas nonprofits in education and youth development.',
    focus:'Public education quality, teacher excellence, youth development in Texas.',
    tips:'Texas-based and well-funded. Strong alignment with youth mentorship. Emphasize Texas student outcomes and partnership with local schools.',
    website:'https://charlesbutt.org',
    deadline:'Applications reviewed annually; contact foundation for intake.',
    difficulty:'Medium',
  },

  // ── GOVERNMENT ────────────────────────────────────────────────────────────
  {
    id:'g17', category:'Government', name:'SAMHSA — Youth Mental Health & Prevention',
    funder:'Substance Abuse and Mental Health Services Administration', amount:'$100,000 – $500,000', cycle:'Annual',
    eligibility:'501(c)(3) nonprofits providing mental health or substance abuse prevention programs for youth.',
    focus:'Youth mental health, substance abuse prevention, resilience building.',
    tips:'Requires detailed evaluation plan and data collection. Young Life\'s mentorship model aligns with resilience-building criteria. Partner with a local school or health district to strengthen the application.',
    website:'https://www.samhsa.gov/grants',
    deadline:'Grant-specific; check grants.gov for current opportunities.',
    difficulty:'Hard',
  },
  {
    id:'g18', category:'Government', name:'OJJDP — Juvenile Delinquency Prevention',
    funder:'Office of Juvenile Justice & Delinquency Prevention', amount:'$200,000 – $1,000,000', cycle:'Annual',
    eligibility:'Nonprofits with evidence-based youth crime prevention programs.',
    focus:'At-risk youth, mentorship, juvenile crime prevention.',
    tips:'Young Life\'s relational ministry model fits the evidence-based mentoring criteria. Apply as a subgrantee through the Texas Juvenile Justice Department (TJJD).',
    website:'https://ojjdp.gov/grants/',
    deadline:'Varies; review grants.gov and TJJD announcements.',
    difficulty:'Hard',
  },
  {
    id:'g19', category:'Government', name:'AmeriCorps — Volunteer Generation Fund',
    funder:'AmeriCorps (federal)', amount:'$25,000 – $200,000', cycle:'Annual',
    eligibility:'Nonprofits expanding their volunteer base and civic engagement.',
    focus:'Volunteer recruitment, training, and management.',
    tips:'Young Life\'s volunteer leader model is a perfect fit. This grant pays for staff time to recruit and support volunteers — it can fund a part-time volunteer coordinator.',
    website:'https://americorps.gov/partner/how-to-work-with-americorps/grants',
    deadline:'Applications typically open in winter for following fiscal year.',
    difficulty:'Medium',
  },
  {
    id:'g20', category:'Government', name:'Texas Governor\'s Prevention Programs',
    funder:'Texas Health & Human Services / Governor\'s Office', amount:'$10,000 – $150,000', cycle:'Annual',
    eligibility:'Texas 501(c)(3) nonprofits with youth prevention programs.',
    focus:'At-risk youth, dropout prevention, substance abuse prevention.',
    tips:'Apply through THHS or the Governor\'s Criminal Justice Division. Johnson County\'s rural designation may qualify for additional rural youth funding set-asides.',
    website:'https://www.hhs.texas.gov/grants-contracts',
    deadline:'Varies by program; monitor THHS and GCJ announcements.',
    difficulty:'Medium',
  },

  // ── HOW TO APPLY ─────────────────────────────────────────────────────────
]

const GRANT_TIPS = [
  {
    step:1, title:'Get Your House in Order',
    body:'Before applying anywhere: obtain your IRS determination letter, maintain current 990s (3 years), have audited financials if budget > $500K, keep board minutes current, and have a one-page program summary ready. Most funders require all of these.',
  },
  {
    step:2, title:'Write a Compelling Needs Statement',
    body:'Answer: Who are you serving? What problem exists? What data proves it? For Johnson County, cite local poverty rates, dropout statistics, and the gap in after-school mentorship programs. Use Census and TEA data.',
  },
  {
    step:3, title:'Define Clear, Measurable Outcomes',
    body:'Funders want outcomes, not activities. Not "we run club 40 times a year" but "85% of students in our program report at least one trusted adult relationship; 92% graduate high school." Track and report these every year.',
  },
  {
    step:4, title:'Submit a Letter of Inquiry (LOI) First',
    body:'Many foundations require an LOI before a full application. A strong LOI is 1–2 pages: who you are, what you\'re asking for, and why it fits their mission. Always customize to each funder\'s language.',
  },
  {
    step:5, title:'Build Relationships Before You Apply',
    body:'The #1 predictor of grant success is a prior relationship with a program officer. Attend funder events, introduce yourself at community gatherings, and call before you submit. A warm application is 3x more likely to succeed.',
  },
  {
    step:6, title:'Apply Consistently — Every Year',
    body:'Most grants are renewable. A "no" this year is often a "not yet." Ask for feedback when declined. Reapply with stronger data. The average successful grant relationship takes 2–3 years of relationship-building.',
  },
  {
    step:7, title:'Report Back Thoroughly',
    body:'The fastest path to a second grant is an excellent report on the first. Send impact updates even when not required. Photos, student stories, and data tables all help. Funders who feel informed become multi-year partners.',
  },
  {
    step:8, title:'Use Grants.gov for Federal Opportunities',
    body:'All federal grants are posted at grants.gov. Set up a free account, create keyword alerts for "youth," "mentoring," and "faith-based," and you\'ll receive automatic notifications when new grants are posted.',
  },
]

const ORG_CHART = {
  homeOffice: { name:'Young Life', role:'International Home Office', location:'Colorado Springs, CO', phone:'(719) 381-1800', website:'https://www.younglife.org' },
  regional: { name:'Holly McLean', role:'Regional Director', region:'West Texas Region' },
  area: { name:'Theresa Boydston', role:'Area Director', area:'Johnson County Young Life' },
  staffLeaders: [
    { name:'Theresa Boydston', role:'Area Director', program:'Both' },
  ],
  groupLeaders: [
    { name:'Group Leader Team', role:'YoungLife Club Leaders', count:6, program:'YoungLife' },
    { name:'Group Leader Team', role:'WyldLife Club Leaders', count:4, program:'WyldLife' },
  ],
  studentLeaders: [
    { name:'Campaigner Leaders', role:'Student Leaders in Training', count:12, program:'YoungLife' },
    { name:'WyldLife Campaigners', role:'Student Leaders in Training', count:8, program:'WyldLife' },
  ],
}

const UPDATES_501C3 = [
  {
    id:'u1', date:'2026-08-01', priority:'High',
    title:'Form 990 Deadline – Extended to November 15',
    body:'The IRS has granted a blanket extension for 501(c)(3) organizations with fiscal years ending June 30. If your Young Life area uses a June fiscal year, the Form 990 deadline is November 15, 2026. Contact your regional finance office for guidance.',
  },
  {
    id:'u2', date:'2026-07-15', priority:'Medium',
    title:'UBIT Alert: Fundraiser Revenue Classification',
    body:'Recent IRS guidance clarifies that revenue from charitable events (banquets, golf tournaments, clay shoots) is generally exempt from UBIT when the activity is substantially related to the organization\'s exempt purpose. Ensure all events are documented as mission-related.',
  },
  {
    id:'u3', date:'2026-06-10', priority:'Low',
    title:'State Sales Tax Exemption Renewal – Due October 31',
    body:'Texas sales tax exemption certificates for 501(c)(3) organizations must be renewed every 4 years. Check your exemption certificate expiration date. Young Life Texas Region can provide guidance on renewal documentation.',
  },
  {
    id:'u4', date:'2026-05-01', priority:'Medium',
    title:'Board Meeting Minutes – Annual Documentation Requirement',
    body:'501(c)(3) organizations must maintain annual board meeting minutes. Ensure your area has documented all board decisions, officer elections, and financial approvals for 2025–2026. Store records for minimum 7 years.',
  },
]

export default function Resources({ store }) {
  const [tab, setTab] = useState('news')
  const [levelFilter, setLevelFilter] = useState('All')
  const [selectedNews, setSelectedNews] = useState(null)
  const [selectedCamp, setSelectedCamp] = useState(null)
  const [selectedUpdate, setSelectedUpdate] = useState(null)
  const [orgModal, setOrgModal] = useState(false)
  const [selectedGrant, setSelectedGrant] = useState(null)
  const [grantCategory, setGrantCategory] = useState('All')
  const [showTips, setShowTips] = useState(false)

  const { org } = store
  const directorName = org?.areaDirector || 'Theresa Boydston'

  const filteredNews = levelFilter === 'All' ? NEWS : NEWS.filter(n => n.level === levelFilter)

  const priorityColor = { High:'#dc2626', Medium:'#d97706', Low:'#3AAB35' }

  return (
    <div className="resources-page">
      <div className="resources-header">
        <div>
          <h2 className="resources-title">Resources</h2>
          <p className="resources-subtitle">News, org chart, camps, and compliance updates for Johnson County Young Life</p>
        </div>
      </div>

      <div className="resources-tabs">
        {[
          { id:'news', label:'📰 News & Updates' },
          { id:'501c3', label:'⚖️ 501(c)(3) Updates' },
          { id:'orgchart', label:'🏗️ Org Chart' },
          { id:'camps', label:'🏕️ Camp Directory' },
          { id:'grants', label:'💰 Grants' },
        ].map(t => (
          <button
            key={t.id}
            className={`resources-tab ${tab === t.id ? 'resources-tab--active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* NEWS TAB */}
      {tab === 'news' && (
        <div className="resources-section">
          <div className="resources-filter-bar">
            {['All','Local','State','Federal'].map(l => (
              <button
                key={l}
                className={`level-chip ${levelFilter === l ? 'level-chip--active' : ''}`}
                onClick={() => setLevelFilter(l)}
              >{l}</button>
            ))}
          </div>
          <div className="news-grid">
            {filteredNews.map(n => (
              <button key={n.id} className="news-card" onClick={() => setSelectedNews(n)}>
                <div className="news-card-header">
                  <span className={`news-level news-level--${n.level.toLowerCase()}`}>{n.level}</span>
                  <span className="news-date">{new Date(n.date+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
                </div>
                <div className="news-card-title">{n.title}</div>
                <div className="news-card-summary">{n.summary}</div>
                <div className="news-source">{n.source}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 501(c)(3) TAB */}
      {tab === '501c3' && (
        <div className="resources-section">
          <div className="updates-list">
            {UPDATES_501C3.map(u => (
              <button key={u.id} className="update-card" onClick={() => setSelectedUpdate(u)}>
                <div className="update-card-header">
                  <span className="update-priority" style={{background:priorityColor[u.priority]+'22',color:priorityColor[u.priority]}}>{u.priority} Priority</span>
                  <span className="update-date">{new Date(u.date+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
                </div>
                <div className="update-title">{u.title}</div>
                <div className="update-preview">{u.body.slice(0,120)}…</div>
              </button>
            ))}
          </div>
          <div className="compliance-note">
            <strong>Note:</strong> This information is provided for general awareness. Always consult with a qualified CPA or attorney for specific compliance guidance. Young Life's national office provides compliance resources at <span style={{color:'#1B4FA3'}}>younglife.org/staff</span>.
          </div>
        </div>
      )}

      {/* ORG CHART TAB */}
      {tab === 'orgchart' && (
        <div className="resources-section">
          <div className="org-chart">
            {/* Home Office */}
            <div className="org-level">
              <button className="org-node org-node--home" onClick={() => setOrgModal('homeoffice')}>
                <div className="org-node-icon">🏠</div>
                <div className="org-node-name">{ORG_CHART.homeOffice.name}</div>
                <div className="org-node-role">{ORG_CHART.homeOffice.role}</div>
                <div className="org-node-loc">{ORG_CHART.homeOffice.location}</div>
              </button>
            </div>
            <div className="org-connector" />
            {/* Regional */}
            <div className="org-level">
              <button className="org-node org-node--regional" onClick={() => setOrgModal('regional')}>
                <div className="org-node-icon">🗺️</div>
                <div className="org-node-name">{ORG_CHART.regional.name}</div>
                <div className="org-node-role">{ORG_CHART.regional.role}</div>
                <div className="org-node-loc">{ORG_CHART.regional.region}</div>
              </button>
            </div>
            <div className="org-connector" />
            {/* Area Director */}
            <div className="org-level">
              <button className="org-node org-node--area" onClick={() => setOrgModal('area')}>
                <div className="org-node-avatar">{directorName.split(' ').map(w=>w[0]).join('')}</div>
                <div className="org-node-name">{directorName}</div>
                <div className="org-node-role">Area Director</div>
                <div className="org-node-loc">Johnson County Young Life</div>
              </button>
            </div>
            <div className="org-connector" />
            {/* Group Leaders */}
            <div className="org-level org-level--row">
              {ORG_CHART.groupLeaders.map((g,i) => (
                <button key={i} className={`org-node org-node--group org-node--${g.program.toLowerCase()}`} onClick={() => setOrgModal('groupleaders')}>
                  <div className="org-node-icon">👥</div>
                  <div className="org-node-name">{g.role}</div>
                  <div className="org-node-role">{g.count} Leaders</div>
                  <div className="org-node-loc">{g.program}</div>
                </button>
              ))}
            </div>
            <div className="org-connector" />
            {/* Student Leaders */}
            <div className="org-level org-level--row">
              {ORG_CHART.studentLeaders.map((s,i) => (
                <button key={i} className={`org-node org-node--student org-node--${s.program.toLowerCase()}`} onClick={() => setOrgModal('studentleaders')}>
                  <div className="org-node-icon">🌟</div>
                  <div className="org-node-name">{s.role}</div>
                  <div className="org-node-count">{s.count} Students</div>
                  <div className="org-node-loc">{s.program}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CAMPS TAB */}
      {tab === 'camps' && (
        <div className="resources-section">
          <div className="camps-grid">
            {CAMPS.map(c => (
              <button key={c.id} className="camp-card" onClick={() => setSelectedCamp(c)}>
                <div className="camp-card-header">
                  <span className={`camp-type camp-type--${c.type.toLowerCase()}`}>{c.type}</span>
                  <span className="camp-state">{c.state}</span>
                </div>
                <div className="camp-name">{c.name}</div>
                <div className="camp-desc">{c.description.slice(0,100)}…</div>
                <div className="camp-meta">Cap: {c.capacity} · {c.season}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GRANTS TAB */}
      {tab === 'grants' && (
        <div className="resources-section">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
            <div className="resources-filter-bar">
              {['All','Corporate','Faith-Based','Youth & Community','Government'].map(c => (
                <button key={c} className={`level-chip ${grantCategory===c?'level-chip--active':''}`} onClick={()=>setGrantCategory(c)}>{c}</button>
              ))}
            </div>
            <button className="btn-primary" style={{fontSize:13}} onClick={()=>setShowTips(true)}>📋 How to Apply Guide</button>
          </div>

          <div className="grants-summary-bar">
            {[
              {label:'Total Opportunities', val:GRANTS.length, color:'#1B4FA3'},
              {label:'Corporate Grants', val:GRANTS.filter(g=>g.category==='Corporate').length, color:'#d97706'},
              {label:'Faith-Based Grants', val:GRANTS.filter(g=>g.category==='Faith-Based').length, color:'#3AAB35'},
              {label:'Government Grants', val:GRANTS.filter(g=>g.category==='Government').length, color:'#854883'},
            ].map(s=>(
              <div key={s.label} className="grants-summary-card" style={{borderTop:`4px solid ${s.color}`}}>
                <div className="grants-summary-val" style={{color:s.color}}>{s.val}</div>
                <div className="grants-summary-lbl">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grants-grid">
            {GRANTS.filter(g=>grantCategory==='All'||g.category===grantCategory).map(g=>(
              <button key={g.id} className="grant-card" onClick={()=>setSelectedGrant(g)}>
                <div className="grant-card-header">
                  <span className={`grant-cat grant-cat--${g.category.toLowerCase().replace(/[^a-z]/g,'-')}`}>{g.category}</span>
                  <span className={`grant-difficulty grant-difficulty--${g.difficulty.toLowerCase()}`}>{g.difficulty}</span>
                </div>
                <div className="grant-name">{g.name}</div>
                <div className="grant-amount">{g.amount}</div>
                <div className="grant-focus">{g.focus}</div>
                <div className="grant-cycle">🗓 {g.cycle}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GRANT DETAIL MODAL */}
      {selectedGrant && (
        <Modal open title={selectedGrant.name} onClose={()=>setSelectedGrant(null)} size="lg">
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
              <span className={`grant-cat grant-cat--${selectedGrant.category.toLowerCase().replace(/[^a-z]/g,'-')}`}>{selectedGrant.category}</span>
              <span className={`grant-difficulty grant-difficulty--${selectedGrant.difficulty.toLowerCase()}`}>{selectedGrant.difficulty} Difficulty</span>
              <span style={{fontWeight:800,color:'#3AAB35',fontSize:15}}>{selectedGrant.amount}</span>
            </div>
            <div className="grant-detail-grid">
              <div><span className="grant-detail-label">Funder</span><span>{selectedGrant.funder}</span></div>
              <div><span className="grant-detail-label">Cycle</span><span>{selectedGrant.cycle}</span></div>
              <div><span className="grant-detail-label">Deadline</span><span>{selectedGrant.deadline}</span></div>
              <div><span className="grant-detail-label">Focus Areas</span><span>{selectedGrant.focus}</span></div>
            </div>
            <div>
              <div className="grant-detail-label" style={{marginBottom:6}}>Eligibility</div>
              <p style={{fontSize:14,lineHeight:1.6,color:'var(--gray-700)',margin:0}}>{selectedGrant.eligibility}</p>
            </div>
            <div style={{background:'#f0f7ff',borderRadius:10,padding:'12px 16px',borderLeft:'4px solid #1B4FA3'}}>
              <div style={{fontWeight:700,fontSize:13,color:'#1B4FA3',marginBottom:6}}>💡 Application Tips for Young Life</div>
              <p style={{fontSize:14,lineHeight:1.6,color:'var(--gray-700)',margin:0}}>{selectedGrant.tips}</p>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={()=>setSelectedGrant(null)}>Close</button>
              <button className="btn-primary" onClick={()=>window.open(selectedGrant.website,'_blank')}>Visit Funder Website →</button>
            </div>
          </div>
        </Modal>
      )}

      {/* HOW TO APPLY GUIDE MODAL */}
      {showTips && (
        <Modal open title="How to Apply for Grants — Young Life Guide" onClose={()=>setShowTips(false)} size="lg">
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <p style={{fontSize:14,color:'var(--gray-600)',margin:0}}>Eight essential steps to successfully find, apply for, and retain grant funding for Johnson County Young Life.</p>
            {GRANT_TIPS.map(t=>(
              <div key={t.step} style={{display:'flex',gap:14,alignItems:'flex-start',padding:'12px 0',borderBottom:'1px solid var(--gray-100)'}}>
                <div style={{minWidth:36,height:36,borderRadius:'50%',background:'#1B4FA3',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:15,flexShrink:0}}>{t.step}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:14,color:'var(--gray-900)',marginBottom:4}}>{t.title}</div>
                  <p style={{fontSize:13,lineHeight:1.7,color:'var(--gray-600)',margin:0}}>{t.body}</p>
                </div>
              </div>
            ))}
            <div style={{background:'#EDFAEC',borderRadius:10,padding:'12px 16px',borderLeft:'4px solid #3AAB35',marginTop:4}}>
              <strong style={{color:'#3AAB35'}}>Pro tip:</strong> <span style={{fontSize:13,color:'var(--gray-700)'}}>Young Life national provides grant writing resources and templates through the staff portal at younglife.org/staff. Your regional director Holly McLean may also know of region-specific funding opportunities.</span>
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={()=>setShowTips(false)}>Got It</button>
            </div>
          </div>
        </Modal>
      )}

      {/* NEWS DETAIL MODAL */}
      {selectedNews && (
        <Modal open title={selectedNews.title} onClose={() => setSelectedNews(null)} size="lg">
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div className="news-modal-meta">
              <span className={`news-level news-level--${selectedNews.level.toLowerCase()}`}>{selectedNews.level}</span>
              <span style={{color:'var(--gray-500)',fontSize:13}}>{new Date(selectedNews.date+'T00:00:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</span>
              <span style={{color:'var(--gray-500)',fontSize:13}}>Source: <strong>{selectedNews.source}</strong></span>
            </div>
            <p style={{fontSize:15,lineHeight:1.7,color:'var(--gray-700)'}}>{selectedNews.body}</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setSelectedNews(null)}>Close</button>
            </div>
          </div>
        </Modal>
      )}

      {/* 501c3 UPDATE MODAL */}
      {selectedUpdate && (
        <Modal open title={selectedUpdate.title} onClose={() => setSelectedUpdate(null)} size="md">
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <span className="update-priority" style={{background:priorityColor[selectedUpdate.priority]+'22',color:priorityColor[selectedUpdate.priority]}}>{selectedUpdate.priority} Priority</span>
              <span style={{fontSize:13,color:'var(--gray-500)'}}>{new Date(selectedUpdate.date+'T00:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</span>
            </div>
            <p style={{fontSize:15,lineHeight:1.7,color:'var(--gray-700)'}}>{selectedUpdate.body}</p>
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setSelectedUpdate(null)}>Got It</button>
            </div>
          </div>
        </Modal>
      )}

      {/* CAMP DETAIL MODAL */}
      {selectedCamp && (
        <Modal open title={selectedCamp.name} onClose={() => setSelectedCamp(null)} size="md">
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              <span className={`camp-type camp-type--${selectedCamp.type.toLowerCase()}`}>{selectedCamp.type}</span>
              <span style={{fontSize:13,color:'var(--gray-500)'}}>{selectedCamp.state} · Capacity {selectedCamp.capacity} · {selectedCamp.season}</span>
            </div>
            <p style={{fontSize:14,lineHeight:1.7,color:'var(--gray-700)'}}>{selectedCamp.description}</p>
            <div className="camp-detail-grid">
              <div><strong>Address:</strong><br/><span style={{color:'var(--gray-600)'}}>{selectedCamp.address}</span></div>
              <div><strong>Phone:</strong><br/><a href={`tel:${selectedCamp.phone}`} style={{color:'#1B4FA3'}}>{selectedCamp.phone}</a></div>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setSelectedCamp(null)}>Close</button>
              <button className="btn-primary" onClick={() => window.open(selectedCamp.website,'_blank')}>Visit Website →</button>
            </div>
          </div>
        </Modal>
      )}

      {/* ORG CHART MODALS */}
      {orgModal === 'homeoffice' && (
        <Modal open title="Young Life Home Office" onClose={() => setOrgModal(false)} size="sm">
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <p style={{fontSize:14,lineHeight:1.7,color:'var(--gray-700)'}}>Young Life is an international Christian organization serving middle school, high school, and college students in over 100 countries. Founded in 1941 by Jim Rayburn.</p>
            <div className="camp-detail-grid">
              <div><strong>Location:</strong><br/><span style={{color:'var(--gray-600)'}}>Colorado Springs, CO</span></div>
              <div><strong>Phone:</strong><br/><a href="tel:(719)381-1800" style={{color:'#1B4FA3'}}>(719) 381-1800</a></div>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setOrgModal(false)}>Close</button>
              <button className="btn-primary" onClick={() => window.open('https://www.younglife.org','_blank')}>younglife.org →</button>
            </div>
          </div>
        </Modal>
      )}
      {orgModal === 'regional' && (
        <Modal open title="Regional Director — West Texas" onClose={() => setOrgModal(false)} size="sm">
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div className="org-detail-row"><span className="org-detail-label">Name</span><span>Holly</span></div>
            <div className="org-detail-row"><span className="org-detail-label">Role</span><span>Regional Director, North Texas</span></div>
            <div className="org-detail-row"><span className="org-detail-label">Oversees</span><span>All Young Life areas in the West Texas region</span></div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setOrgModal(false)}>Close</button>
            </div>
          </div>
        </Modal>
      )}
      {orgModal === 'area' && (
        <Modal open title={`Area Director — ${directorName}`} onClose={() => setOrgModal(false)} size="sm">
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div className="org-detail-row"><span className="org-detail-label">Name</span><span>{directorName}</span></div>
            <div className="org-detail-row"><span className="org-detail-label">Role</span><span>Area Director</span></div>
            <div className="org-detail-row"><span className="org-detail-label">Area</span><span>Johnson County Young Life</span></div>
            <div className="org-detail-row"><span className="org-detail-label">Programs</span><span>YoungLife (HS) + WyldLife (MS)</span></div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setOrgModal(false)}>Close</button>
            </div>
          </div>
        </Modal>
      )}
      {orgModal === 'groupleaders' && (
        <Modal open title="Group Leader Teams" onClose={() => setOrgModal(false)} size="sm">
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <p style={{fontSize:14,color:'var(--gray-600)'}}>Volunteer group leaders run weekly club nights, Campaigners, and provide relational ministry to students.</p>
            {ORG_CHART.groupLeaders.map((g,i) => (
              <div key={i} className="org-detail-row">
                <span className="org-detail-label">{g.program}</span>
                <span>{g.count} {g.role}</span>
              </div>
            ))}
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setOrgModal(false)}>Close</button>
            </div>
          </div>
        </Modal>
      )}
      {orgModal === 'studentleaders' && (
        <Modal open title="Student Leaders in Training" onClose={() => setOrgModal(false)} size="sm">
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <p style={{fontSize:14,color:'var(--gray-600)'}}>Campaigner student leaders are trained to bring their friends to Young Life and take ownership of the ministry on their campuses.</p>
            {ORG_CHART.studentLeaders.map((s,i) => (
              <div key={i} className="org-detail-row">
                <span className="org-detail-label">{s.program}</span>
                <span>{s.count} {s.role}</span>
              </div>
            ))}
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setOrgModal(false)}>Close</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
