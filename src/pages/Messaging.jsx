import { useState } from 'react'
import Modal from '../components/Modal'
import './Messaging.css'

const TEMPLATES = [
  // ── Club Invites ─────────────────────────────────────────────────────────
  {
    id:'t1', category:'Club Invite', channel:'Text', audience:'Students',
    title:'Weekly Club Night Reminder',
    body:`Hey {firstName}! 🎉 Club night is TONIGHT at {time} at {location}. Come hungry — there's food. Bring a friend. See you there! — {leaderName}`,
    notes:'Send same day, 4–6 hours before club. Personalize the first name.',
  },
  {
    id:'t2', category:'Club Invite', channel:'Text', audience:'Students',
    title:'First-Time Invite',
    body:`Hey {firstName}! I'm {leaderName} with Young Life. We're having a club night this {day} at {time} — it's basically the most fun you'll have all week. No weird stuff, I promise. You in? 👊`,
    notes:'Best sent Tuesday or Wednesday for a Friday club.',
  },
  {
    id:'t3', category:'Club Invite', channel:'Text', audience:'Parents',
    title:'Parent Intro Text',
    body:`Hi {parentName}! I'm {leaderName}, a Young Life leader at {school}. I had a great conversation with {firstName} and wanted to introduce myself. Young Life is a free, non-pressured program for students — we'd love to have {firstName} join us at club. Any questions, I'm happy to chat!`,
    notes:'Send after your first in-person contact with the student.',
  },
  {
    id:'t4', category:'Club Invite', channel:'Email', audience:'Parents',
    title:'Parent Welcome Email',
    body:`Hi {parentName},

I wanted to reach out and introduce myself. I'm {leaderName}, a volunteer leader with Young Life in Johnson County. I recently met {firstName} and was so impressed by them!

Young Life is a community for students — we run free weekly club nights, small group Bible studies, and summer camp opportunities. There's no pressure, no cost to attend club, and students from all backgrounds are welcome.

Our next club night is {eventDate} at {time}, held at {location}. {firstName} is welcome to come and bring friends!

If you have any questions about who we are or what we do, I'd love to connect. You can also learn more at younglife.org.

Thanks for letting me be part of {firstName}'s world.

In Christ,
{leaderName}
Johnson County Young Life
{leaderPhone}`,
    notes:'Send within 48 hours of your first contact with the student.',
  },

  // ── Camp ─────────────────────────────────────────────────────────────────
  {
    id:'t5', category:'Camp', channel:'Text', audience:'Students',
    title:'Camp Hype Text',
    body:`{firstName}! Summer camp registration is OPEN. Last year students said it was the best week of their life — and I believe it. I want YOU there. Let's make it happen. Can we talk this week? — {leaderName}`,
    notes:'Send as soon as camp registration opens. Personalize with camp name if known.',
  },
  {
    id:'t6', category:'Camp', channel:'Email', audience:'Parents',
    title:'Camp Information Email',
    body:`Hi {parentName},

I'm reaching out because I'd love for {firstName} to join us at Young Life camp this summer!

Camp is held at {campName} ({campLocation}) — an incredible facility with amazing food, activities, and programming designed specifically for students. Thousands of kids from across the country attend every year and call it the best week of their lives.

📅 Dates: {campDates}
💰 Cost: {campCost} (scholarships available — just ask!)
🏕️ What's included: All meals, activities, lodging, and programming

The registration deadline is {deadline}. I'd love to connect by phone to answer any questions.

More info: younglife.org/camps

Thanks so much,
{leaderName}
Johnson County Young Life
{leaderPhone}`,
    notes:'Send 8–10 weeks before camp. Always mention scholarship availability.',
  },
  {
    id:'t7', category:'Camp', channel:'Text', audience:'Parents',
    title:'Camp Scholarship Offer',
    body:`Hi {parentName}, this is {leaderName} with Young Life. I want {firstName} at camp this summer and cost should never be a barrier. We have scholarships available — no application, just let me know. Can we chat?`,
    notes:'Use proactively with families you know have financial need. Private and dignified.',
  },

  // ── Fundraising ──────────────────────────────────────────────────────────
  {
    id:'t8', category:'Fundraising', channel:'Email', audience:'Donors',
    title:'Golf Tournament Invitation',
    body:`Dear {donorName},

You're invited to the Johnson County Young Life Annual Golf Tournament!

📅 Friday, September 25, 2026
⛳ Cleburne Golf Links, Cleburne TX
🕣 Shotgun Start: 7:30am

Every dollar raised goes directly to sending Johnson County students to summer camp and funding weekly programs that reach hundreds of kids every year.

SPONSORSHIP OPPORTUNITIES:
• Title Sponsor: $5,000 (foursome + signage + recognition)
• Eagle Sponsor: $2,500 (foursome + signage)
• Birdie Sponsor: $1,000 (twosome + signage)
• Hole Sponsor: $250 (signage on a hole)
• Individual Player: $150

To register or sponsor, reply to this email or call {contactPhone}.

Thank you for investing in Johnson County students!

For His Kids,
{leaderName}
Johnson County Young Life`,
    notes:'Send 6–8 weeks before the tournament. Follow up by phone 2 weeks after.',
  },
  {
    id:'t9', category:'Fundraising', channel:'Email', audience:'Donors',
    title:'Annual Banquet Invitation',
    body:`Dear {donorName},

You are cordially invited to the Johnson County Young Life Annual Banquet!

📅 {eventDate}
🕕 {time}
📍 {location}

This special evening celebrates another year of reaching students across Johnson County — from Cleburne to Burleson to Rio Vista and everywhere in between. You'll hear directly from students whose lives have been changed.

Tickets: $75/person | Tables of 8: $500
To RSVP: reply to this email or call {contactPhone}

Your presence and partnership make this ministry possible. We hope to see you there.

With Gratitude,
{leaderName}
Theresa Boydston, Area Director
Johnson County Young Life`,
    notes:'Send 4–5 weeks before banquet. Personal phone call follow-up is critical.',
  },
  {
    id:'t10', category:'Fundraising', channel:'Email', audience:'Donors',
    title:'Year-End Giving Appeal',
    body:`Dear {donorName},

As {year} comes to a close, I wanted to share what your generosity has made possible this year for Johnson County students:

✅ {studentCount} students attended club across Johnson County
✅ {campCount} students went to summer camp — many for the first time
✅ {leaderCount} volunteer leaders poured into students' lives every week
✅ {schoolCount} schools reached with Young Life programming

Your tax-deductible gift before December 31 directly funds another year of this work. Every dollar stays local.

To give online: younglife.org/give
By check (make out to "Young Life"): mail to {address}

Thank you for believing in these kids.

Because of You,
{leaderName}
Johnson County Young Life`,
    notes:'Send December 1–10. Follow up with a reminder December 26–29.',
  },

  // ── Follow-Up ────────────────────────────────────────────────────────────
  {
    id:'t11', category:'Follow-Up', channel:'Text', audience:'Students',
    title:'Missed You at Club',
    body:`Hey {firstName}! Missed you at club last {day}. Hope everything's good. We're back at it {nextClubDate} — save your spot? — {leaderName}`,
    notes:'Send within 24 hours of a club they missed. Keep it light, no guilt.',
  },
  {
    id:'t12', category:'Follow-Up', channel:'Text', audience:'Students',
    title:'First Timer Thank You',
    body:`{firstName}! So glad you came to club last night. Seriously. You fit right in. We're doing it again {nextClubDate} — bring whoever you want. — {leaderName} 😊`,
    notes:'Send the morning after their first club. This one matters more than almost any other.',
  },
  {
    id:'t13', category:'Follow-Up', channel:'Text', audience:'Students',
    title:'Campaigners Invite',
    body:`Hey {firstName}! I've been thinking — I'd love to have you in our Campaigners group. It's a smaller Bible study crew that meets {day} at {time}. It's real, it's honest, and I think you'd love it. Interested?`,
    notes:'Send to students who have been coming consistently for 4+ weeks.',
  },
  {
    id:'t14', category:'Follow-Up', channel:'Text', audience:'Students',
    title:'Just Checking In',
    body:`Hey {firstName}, just thinking about you. How are things going? No agenda — just wanted to check in. — {leaderName}`,
    notes:'The most powerful text you can send. Use for students who seem burdened or distant.',
  },

  // ── Social / Announcements ───────────────────────────────────────────────
  {
    id:'t15', category:'Social Media', channel:'Instagram/Facebook', audience:'Public',
    title:'Club Night Hype Post',
    body:`Tonight's the night. 🙌 Johnson County Young Life — club starts at {time} at {location}. Every student welcome. Bring a friend. Link in bio for more info. #YoungLife #JohnsonCounty #Cleburne #Burleson`,
    notes:'Post morning of club. Use a high-energy photo from a previous club if available.',
  },
  {
    id:'t16', category:'Social Media', channel:'Instagram/Facebook', audience:'Public',
    title:'Camp Registration Open',
    body:`CAMP IS OPEN! 🏕️🙌 Registration for Young Life summer camp is now live — and spots go FAST. If you're a student in Johnson County, DM us or talk to your Young Life leader today. Scholarships available. Don't miss the best week of your summer. #YoungLifeCamp #FrontierRanch #JohnsonCounty`,
    notes:'Post the day registration opens. Pin to top of your profile.',
  },
  {
    id:'t17', category:'Social Media', channel:'Instagram/Facebook', audience:'Public',
    title:'Fundraiser Awareness Post',
    body:`Big news! Our Annual Golf Tournament is {eventDate} at Cleburne Golf Links ⛳. This is THE event of the year for Young Life supporters. Foursomes, sponsorships, and hole sponsorships still available. Every dollar sends a Johnson County kid to summer camp. DM us or visit the link in bio to sign up! #YoungLife #JohnsonCounty #GolfTournament #Fundraiser`,
    notes:'Post 3 weeks before, 1 week before, and day-of.',
  },
]

const BRAND = {
  colors: [
    { name:'Young Life Blue', hex:'#1B4FA3', use:'Primary brand color — buttons, headers, key accents' },
    { name:'Young Life Green', hex:'#3AAB35', use:'Secondary brand color — WyldLife, success states, highlights' },
    { name:'White', hex:'#FFFFFF', use:'Backgrounds, text on dark surfaces' },
    { name:'Dark Gray', hex:'#1F2937', use:'Body text, headings on white' },
    { name:'Light Gray', hex:'#F9FAFB', use:'Page backgrounds, card fills' },
  ],
  fonts: [
    { name:'Headlines', spec:'Bold / Extra-Bold weight — any clean sans-serif (Inter, Montserrat, or similar)' },
    { name:'Body Copy', spec:'Regular / Medium weight — readable at 14–16px' },
  ],
  voice: [
    'Warm and relational — talk like a person, not a press release',
    'Hopeful and energetic — Young Life is good news',
    'Direct — say what you mean in plain language',
    'Inclusive — every student is welcome, no church background required',
    'Avoid religious jargon — "club" not "worship service", "Bible study" not "devotional"',
  ],
  logos: [
    { name:'Young Life National Logo', usage:'Use for official correspondence, major events, and printed materials', source:'Available through younglife.org/staff brand portal' },
    { name:'Johnson County Young Life', usage:'Area-level branding — pair with national logo or use standalone for local materials' },
  ],
}

const CHANNELS = ['All','Text','Email','Instagram/Facebook']
const CATEGORIES = ['All','Club Invite','Camp','Fundraising','Follow-Up','Social Media']

export default function Messaging() {
  const [tab, setTab] = useState('templates')
  const [chanFilter, setChanFilter] = useState('All')
  const [catFilter, setCatFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [copied, setCopied] = useState(false)

  const filtered = TEMPLATES.filter(t =>
    (chanFilter === 'All' || t.channel === chanFilter) &&
    (catFilter === 'All' || t.category === catFilter)
  )

  function copyText() {
    navigator.clipboard.writeText(selected.body).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const chanColor = { Text:'#1B4FA3', Email:'#3AAB35', 'Instagram/Facebook':'#854883' }
  const catColor = { 'Club Invite':'#1B4FA3', Camp:'#d97706', Fundraising:'#3AAB35', 'Follow-Up':'#854883', 'Social Media':'#0ea5e9' }

  return (
    <div className="msg-page">
      <div className="msg-header">
        <div>
          <h2 className="msg-title">Messaging & Marketing</h2>
          <p className="msg-subtitle">Templates, brand guidelines, and marketing tools for Johnson County Young Life</p>
        </div>
      </div>

      <div className="msg-tabs">
        {[
          { id:'templates', label:'📋 Message Templates' },
          { id:'brand', label:'🎨 Brand Guidelines' },
          { id:'calendar', label:'📅 Marketing Calendar' },
        ].map(t => (
          <button key={t.id} className={`msg-tab ${tab===t.id?'msg-tab--active':''}`} onClick={()=>setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* TEMPLATES TAB */}
      {tab === 'templates' && (
        <div className="msg-section">
          <div className="msg-filter-row">
            <div className="msg-filter-group">
              <span className="msg-filter-label">Channel:</span>
              {CHANNELS.map(c => (
                <button key={c} className={`msg-chip ${chanFilter===c?'msg-chip--active':''}`} onClick={()=>setChanFilter(c)}>{c}</button>
              ))}
            </div>
            <div className="msg-filter-group">
              <span className="msg-filter-label">Category:</span>
              {CATEGORIES.map(c => (
                <button key={c} className={`msg-chip ${catFilter===c?'msg-chip--active':''}`} onClick={()=>setCatFilter(c)}>{c}</button>
              ))}
            </div>
          </div>

          <div className="msg-count">{filtered.length} template{filtered.length!==1?'s':''}</div>

          <div className="templates-grid">
            {filtered.map(t => (
              <button key={t.id} className="template-card" onClick={()=>setSelected(t)}>
                <div className="template-card-header">
                  <span className="template-cat" style={{background:(catColor[t.category]||'#999')+'22',color:catColor[t.category]||'#999'}}>{t.category}</span>
                  <span className="template-chan" style={{background:(chanColor[t.channel]||'#999')+'22',color:chanColor[t.channel]||'#999'}}>{t.channel}</span>
                </div>
                <div className="template-title">{t.title}</div>
                <div className="template-audience">For: {t.audience}</div>
                <div className="template-preview">{t.body.slice(0,100).replace(/\n/g,' ')}…</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* BRAND TAB */}
      {tab === 'brand' && (
        <div className="msg-section">
          <div className="brand-grid">
            {/* Colors */}
            <div className="brand-card">
              <div className="brand-card-title">🎨 Official Colors</div>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {BRAND.colors.map(c => (
                  <div key={c.hex} className="brand-color-row">
                    <div className="brand-color-swatch" style={{background:c.hex,border:c.hex==='#FFFFFF'?'1px solid #e5e7eb':'none'}} />
                    <div>
                      <div className="brand-color-name">{c.name} <span className="brand-color-hex">{c.hex}</span></div>
                      <div className="brand-color-use">{c.use}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="brand-card">
              <div className="brand-card-title">✏️ Typography</div>
              {BRAND.fonts.map(f => (
                <div key={f.name} className="brand-font-row">
                  <div className="brand-font-name">{f.name}</div>
                  <div className="brand-font-spec">{f.spec}</div>
                </div>
              ))}
              <div className="brand-tip">
                <strong>Tip:</strong> Young Life national uses clean, modern sans-serif fonts. Avoid decorative or script fonts for main communications. Access brand assets at <span style={{color:'#1B4FA3'}}>younglife.org/staff</span> → Brand Resources.
              </div>
            </div>

            {/* Voice & Tone */}
            <div className="brand-card">
              <div className="brand-card-title">🗣️ Voice & Tone</div>
              <ul className="brand-voice-list">
                {BRAND.voice.map((v,i) => <li key={i}>{v}</li>)}
              </ul>
            </div>

            {/* Logos */}
            <div className="brand-card">
              <div className="brand-card-title">🏷️ Logos & Usage</div>
              {BRAND.logos.map(l => (
                <div key={l.name} className="brand-logo-row">
                  <div className="brand-logo-name">{l.name}</div>
                  <div className="brand-logo-usage">{l.usage}</div>
                  <div className="brand-logo-source">{l.source}</div>
                </div>
              ))}
              <div className="brand-tip" style={{marginTop:12}}>
                <strong>Note:</strong> All official Young Life logos require approval for use on printed materials. Contact your regional office or the brand portal at younglife.org/staff before printing.
              </div>
            </div>

            {/* Flyer Checklist */}
            <div className="brand-card brand-card--wide">
              <div className="brand-card-title">📄 Flyer Checklist</div>
              <p style={{fontSize:13,color:'var(--gray-600)',marginBottom:12}}>Before printing or sharing any Young Life flyer, confirm:</p>
              <div className="checklist">
                {[
                  'Includes event name, date, time, and location',
                  'Uses official Young Life Blue (#1B4FA3) and/or Green (#3AAB35)',
                  'Says "Free" and "All students welcome" if it\'s a club night',
                  'Includes a leader name and phone/Instagram for questions',
                  'Does NOT include pressure language ("you should come", "you must")',
                  'Mentions "Johnson County Young Life" — not just "Young Life"',
                  'Has been reviewed by area director before mass distribution',
                  'Camp flyers include "Scholarships available" if cost is listed',
                  'Fundraiser flyers include 501(c)(3) status and EIN for tax purposes',
                ].map((item,i) => (
                  <div key={i} className="checklist-item">
                    <span className="checklist-box">☐</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MARKETING CALENDAR TAB */}
      {tab === 'calendar' && (
        <div className="msg-section">
          <p style={{fontSize:14,color:'var(--gray-500)',marginBottom:4}}>Annual marketing rhythm for Johnson County Young Life. Click any month for detail.</p>
          <div className="mktg-calendar">
            {[
              { month:'August', icon:'🏫', focus:'Back to School', tasks:['Introduce yourself to new students at school events','Post back-to-school hype on social','Send parent intro texts within 2 weeks of first contact','Update club locations and post flyers'] },
              { month:'September', icon:'⛳', focus:'Golf Tournament + Club Launch', tasks:['Golf Tournament Sept 25 — send invites 6 weeks out','Club launch week — all hands on deck for outreach','Social posts 3x/week promoting club nights','Send parent welcome emails to all new students'] },
              { month:'October', icon:'🎃', focus:'Fall Events + Donor Cultivation', tasks:['Clay Shoot fundraiser — final push for sponsorships','Fall Banquet prep — finalize tables and program','Mid-semester check-in texts to all students','Donor thank-you calls for summer/fall gifts'] },
              { month:'November', icon:'🍂', focus:'Banquet + Year-End Prep', tasks:['Fall Banquet — send invites 4 weeks out','Year-end giving appeal draft due Nov 15','Thank every donor who came to banquet by Nov 30','Review student roster for camp scholarship candidates'] },
              { month:'December', icon:'🎄', focus:'Year-End Giving', tasks:['Year-end giving appeal email Dec 1–10','Follow-up reminder Dec 26–29','Post impact stats on social (students reached, camp #s)','Personal calls to top 10 donors before Dec 31'] },
              { month:'January', icon:'🆕', focus:'New Year + Spring Planning', tasks:['Spring Banquet planning begins — lock venue and date','New student outreach push — second semester fresh start','Send ministry update email to donor list','Set camp goal for summer — begin student conversations'] },
              { month:'February', icon:'❤️', focus:'Camp Hype Begins', tasks:['Camp registration opens — send hype texts to all students','JCCF grant application due Feb 15','Valentine\'s club night — great first-timer event','Begin scholarship fund outreach to major donors'] },
              { month:'March', icon:'🌱', focus:'Spring Banquet', tasks:['Spring Banquet — send invites 5 weeks out','Camp deadline push — text every uncommitted student','Spring break outreach events','Leader appreciation — recognize volunteers publicly'] },
              { month:'April', icon:'🌸', focus:'Camp Final Push', tasks:['Final camp registration push — last call texts and emails','Spring Banquet follow-up thank-yous','Post camp countdown on social media','Connect with families of first-time campers'] },
              { month:'May', icon:'🎓', focus:'Senior Celebration', tasks:['Senior recognition at last club of year','Senior parent thank-you notes','Summer camp departure logistics communicated to all families','Recruit and train summer volunteer leaders'] },
              { month:'June', icon:'☀️', focus:'Camp Season Begins', tasks:['Camp departure day logistics and social posts','Camp week prayer coverage — post updates for supporters','Camp return celebration event','Begin summer club schedule for active students'] },
              { month:'July', icon:'🏕️', focus:'Camp + Summer Ministry', tasks:['WyldLife camp week — same logistics as June','Post camp stories and photos (with permission) on social','Begin fall planning and leader recruitment','Preview back-to-school outreach strategy'] },
            ].map((m,i) => (
              <div key={i} className="mktg-month">
                <div className="mktg-month-header">
                  <span className="mktg-month-icon">{m.icon}</span>
                  <div>
                    <div className="mktg-month-name">{m.month}</div>
                    <div className="mktg-month-focus">{m.focus}</div>
                  </div>
                </div>
                <ul className="mktg-task-list">
                  {m.tasks.map((task,j) => <li key={j}>{task}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TEMPLATE DETAIL MODAL */}
      {selected && (
        <Modal open title={selected.title} onClose={()=>{setSelected(null);setCopied(false)}} size="lg">
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              <span className="template-cat" style={{background:(catColor[selected.category]||'#999')+'22',color:catColor[selected.category]||'#999'}}>{selected.category}</span>
              <span className="template-chan" style={{background:(chanColor[selected.channel]||'#999')+'22',color:chanColor[selected.channel]||'#999'}}>{selected.channel}</span>
              <span style={{fontSize:12,color:'var(--gray-500)',alignSelf:'center'}}>For: {selected.audience}</span>
            </div>

            <div className="template-body-box">
              <pre className="template-body-text">{selected.body}</pre>
            </div>

            <div className="template-notes-box">
              <strong>📌 Usage Notes:</strong> {selected.notes}
            </div>

            <div className="template-vars-box">
              <strong>🔧 Fill In These Fields:</strong>
              <div className="template-vars">
                {[...selected.body.matchAll(/\{(\w+)\}/g)].map(m=>m[1]).filter((v,i,a)=>a.indexOf(v)===i).map(v=>(
                  <span key={v} className="template-var">{'{'+v+'}'}</span>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={()=>{setSelected(null);setCopied(false)}}>Close</button>
              <button className="btn-primary" onClick={copyText}>{copied ? '✓ Copied!' : '📋 Copy Template'}</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
