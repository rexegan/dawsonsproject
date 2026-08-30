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
    website:'https://walmart.org',
    deadline:'Applications accepted year-round; reviewed quarterly.',
    difficulty:'Easy',
  },
  {
    id:'g2', category:'Corporate', name:'Target Foundation — Community Grant',
    funder:'Target Corporation', amount:'$1,000 – $10,000', cycle:'Annual',
    eligibility:'501(c)(3) youth and education nonprofits near Target stores.',
    focus:'Education, arts, youth development.',
    tips:'Apply through local Target store. Highlight measurable outcomes — number of students served, attendance rates, camp placements.',
    website:'https://www.target.com/c/target-foundation/-/N-5q0e2',
    deadline:'Varies by store; typically spring and fall cycles.',
    difficulty:'Easy',
  },
  {
    id:'g3', category:'Corporate', name:'Bank of America Charitable Foundation',
    funder:'Bank of America', amount:'$5,000 – $50,000', cycle:'Annual',
    eligibility:'501(c)(3) organizations in Bank of America markets.',
    focus:'Workforce development, community development, arts & culture.',
    tips:'Connect with a local BofA market president or relationship manager. Personal relationships greatly increase success rate.',
    website:'https://about.bankofamerica.com',
    deadline:'Varies by market; applications typically open in Q1.',
    difficulty:'Medium',
  },
  {
    id:'g4', category:'Corporate', name:'Wells Fargo Foundation',
    funder:'Wells Fargo', amount:'$5,000 – $25,000', cycle:'Annual',
    eligibility:'501(c)(3) nonprofits in Wells Fargo banking communities.',
    focus:'Financial health, housing, small business, diversity & inclusion.',
    tips:'Strongest fit when connecting Young Life\'s economic empowerment angle — helping at-risk youth avoid poverty through mentorship.',
    website:'https://www.wellsfargo.com',
    deadline:'Rolling applications reviewed quarterly.',
    difficulty:'Medium',
  },
  {
    id:'g5', category:'Corporate', name:'ExxonMobil Foundation — Educational Grants',
    funder:'ExxonMobil', amount:'$10,000 – $100,000', cycle:'Annual',
    eligibility:'501(c)(3) education and youth STEM nonprofits.',
    focus:'Math, science education, community development in ExxonMobil operating areas.',
    tips:'Strong fit for Johnson County given ExxonMobil\'s presence in Texas. Frame around academic achievement and keeping students in school.',
    website:'https://www.exxonmobil.com',
    deadline:'Applications accepted annually; typically Q1–Q2.',
    difficulty:'Medium',
  },
  {
    id:'g6', category:'Corporate', name:'AT&T Believes — Community Grants',
    funder:'AT&T', amount:'$5,000 – $50,000', cycle:'Annual',
    eligibility:'501(c)(3) nonprofits focused on education and digital inclusion.',
    focus:'Education, digital literacy, workforce development for youth.',
    tips:'Emphasize how Young Life connects students who might otherwise fall through the cracks, and any digital/communication components.',
    website:'https://www.att.com',
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
    website:'https://lillyendowment.org',
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
    website:'https://www.aecf.org',
    deadline:'Primarily invitation-based; submit a letter of inquiry to start.',
    difficulty:'Hard',
  },
  {
    id:'g13', category:'Youth & Community', name:'W.K. Kellogg Foundation',
    funder:'W.K. Kellogg Foundation', amount:'$75,000 – $1,000,000', cycle:'Annual',
    eligibility:'Nonprofits advancing racial equity and youth development.',
    focus:'Education, food security, family economic security, racial equity.',
    tips:'Competitive. Strong fit if Johnson County Young Life can demonstrate work with underserved or minority youth populations. Equity narrative is essential.',
    website:'https://www.wkkf.org',
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
    website:'https://americorps.gov',
    deadline:'Applications typically open in winter for following fiscal year.',
    difficulty:'Medium',
  },
  {
    id:'g20', category:'Government', name:'Texas Governor\'s Prevention Programs',
    funder:'Texas Health & Human Services / Governor\'s Office', amount:'$10,000 – $150,000', cycle:'Annual',
    eligibility:'Texas 501(c)(3) nonprofits with youth prevention programs.',
    focus:'At-risk youth, dropout prevention, substance abuse prevention.',
    tips:'Apply through THHS or the Governor\'s Criminal Justice Division. Johnson County\'s rural designation may qualify for additional rural youth funding set-asides.',
    website:'https://www.hhs.texas.gov',
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

const BUSINESSES = [
  // ── RESTAURANTS & FOOD ───────────────────────────────────────────────────
  { id:'b1', category:'Restaurant', name:'Whistle Stop Café', city:'Cleburne', address:'102 N Anglin St, Cleburne, TX 76033', phone:'(817) 641-2200', website:'https://www.cleburnetx.gov', ownership:'Local — family owned', notes:'Downtown landmark. Great for donor breakfasts.' },
  { id:'b2', category:'Restaurant', name:'Cotton Patch Café', city:'Cleburne', address:'2111 W Henderson St, Cleburne, TX 76033', phone:'(817) 556-0770', website:'https://www.cottonpatch.com', ownership:'Chain — regional', notes:'Family-friendly. Good for large group meals.' },
  { id:'b3', category:'Restaurant', name:'Babe\'s Chicken Dinner House', city:'Burleson', address:'209 N Burleson Blvd, Burleson, TX 76028', phone:'(817) 447-3400', website:'https://www.babeschicken.com', ownership:'Chain — Texas regional', notes:'Popular with donors and families. Great for fundraiser dinners.' },
  { id:'b4', category:'Restaurant', name:'Ranchman\'s Ponder Steakhouse', city:'Cleburne', address:'110 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-9797', website:'', ownership:'Local', notes:'Classic Texas steakhouse. Good for donor appreciation meals.' },
  { id:'b5', category:'Restaurant', name:'Chili\'s Grill & Bar', city:'Burleson', address:'600 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 447-2800', website:'https://www.chilis.com', ownership:'Chain — national', notes:'Potential for "Dining for Dollars" fundraiser nights.' },
  { id:'b6', category:'Restaurant', name:'Texas Roadhouse', city:'Burleson', address:'700 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 447-0031', website:'https://www.texasroadhouse.com', ownership:'Chain — national', notes:'Fundraiser opportunities available through their community program.' },
  { id:'b7', category:'Restaurant', name:'Fuzzy\'s Taco Shop', city:'Burleson', address:'248 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 426-5610', website:'https://www.fuzzystacoshop.com', ownership:'Chain — regional', notes:'Popular with students. Good for club-night meal deals.' },
  { id:'b8', category:'Restaurant', name:'Whataburger', city:'Cleburne', address:'1201 N Main St, Cleburne, TX 76031', phone:'(817) 641-9900', website:'https://www.whataburger.com', ownership:'Chain — Texas', notes:'Texas icon. Consider for student event meal sponsorship.' },
  // ── RETAIL & SHOPPING ────────────────────────────────────────────────────
  { id:'b9', category:'Retail', name:'Walmart Supercenter', city:'Cleburne', address:'1800 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-7030', website:'https://walmart.com', ownership:'Chain — national', notes:'Local store grant program. Apply through store manager.' },
  { id:'b10', category:'Retail', name:'H-E-B', city:'Burleson', address:'700 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 426-4720', website:'https://www.heb.com', ownership:'Texas — privately held', notes:'H-E-B Community Partners donates to local nonprofits. Strong Texas alignment.' },
  { id:'b11', category:'Retail', name:'Academy Sports + Outdoors', city:'Burleson', address:'230 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 426-7680', website:'https://www.academy.com', ownership:'Chain — national', notes:'Community grant program. Good for sports equipment donations for camp fundraisers.' },
  { id:'b12', category:'Retail', name:'Tractor Supply Co.', city:'Cleburne', address:'1500 W Henderson St, Cleburne, TX 76033', phone:'(817) 556-9144', website:'https://www.tractorsupply.com', ownership:'Chain — national', notes:'Neighbor\'s Club grant program available for rural community nonprofits.' },
  { id:'b13', category:'Retail', name:'Dollar General', city:'Alvarado', address:'120 N Spears Rd, Alvarado, TX 76009', phone:'(817) 790-2200', website:'https://www.dollargeneral.com', ownership:'Chain — national', notes:'Dollar General Literacy Foundation provides community grants.' },
  { id:'b14', category:'Retail', name:'AutoZone', city:'Cleburne', address:'504 N Main St, Cleburne, TX 76031', phone:'(817) 641-2210', website:'https://www.autozone.com', ownership:'Chain — national', notes:'Auto parts. Owner-operators sometimes support local nonprofits.' },
  // ── HEALTHCARE ───────────────────────────────────────────────────────────
  { id:'b15', category:'Healthcare', name:'Texas Health Huguley Hospital', city:'Burleson', address:'11801 S Fwy, Burleson, TX 76028', phone:'(817) 293-9110', website:'https://www.texashealth.org', ownership:'Texas Health Resources (nonprofit)', notes:'Community health grants available. Partner for mental health programming.' },
  { id:'b16', category:'Healthcare', name:'AdventHealth Cleburne', city:'Cleburne', address:'201 Walls Dr, Cleburne, TX 76033', phone:'(817) 641-2551', website:'https://www.adventhealth.com', ownership:'Nonprofit hospital system', notes:'Community benefit grants. Great for youth wellness programming partnerships.' },
  { id:'b17', category:'Healthcare', name:'Cleburne Family Dentistry', city:'Cleburne', address:'610 N Ridgeway Dr, Cleburne, TX 76033', phone:'(817) 641-6655', website:'', ownership:'Local — privately owned', notes:'Local family business. Good prospect for event sponsorship.' },
  { id:'b18', category:'Healthcare', name:'Johnson County Medical Group', city:'Cleburne', address:'1000 Hillcrest Dr, Cleburne, TX 76033', phone:'(817) 641-7000', website:'', ownership:'Local medical group', notes:'Physician group. Physicians often support local youth causes.' },
  // ── FINANCIAL & INSURANCE ────────────────────────────────────────────────
  { id:'b19', category:'Financial', name:'First National Bank Texas', city:'Cleburne', address:'116 N Anglin St, Cleburne, TX 76033', phone:'(817) 645-0111', website:'https://www.firstnationalbanktexas.com', ownership:'Texas — regional bank', notes:'Community reinvestment programs. Strong local giving history.' },
  { id:'b20', category:'Financial', name:'Prosperity Bank', city:'Burleson', address:'500 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 447-6300', website:'https://www.prosperitybanktx.com', ownership:'Texas — publicly traded', notes:'Active in Texas community giving. Branch-level sponsorship available.' },
  { id:'b21', category:'Financial', name:'Farm Bureau Financial Services', city:'Cleburne', address:'215 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-4516', website:'https://www.fbfs.com', ownership:'Mutual company', notes:'Farm Bureau Foundation supports rural youth organizations.' },
  { id:'b22', category:'Financial', name:'State Farm Insurance', city:'Cleburne', address:'1702 W Henderson St #D, Cleburne, TX 76033', phone:'(817) 641-5001', website:'https://www.statefarm.com', ownership:'Mutual — local agents are independent', notes:'Agent-level community giving. Agents often sponsor local events.' },
  { id:'b23', category:'Financial', name:'Edward Jones', city:'Burleson', address:'300 SW Johnson Ave #250, Burleson, TX 76028', phone:'(817) 447-7330', website:'https://www.edwardjones.com', ownership:'Partnership — private', notes:'Financial advisors. Good prospects for individual major donor cultivation.' },
  // ── CONSTRUCTION & REAL ESTATE ───────────────────────────────────────────
  { id:'b24', category:'Construction', name:'D.R. Horton', city:'Burleson', address:'301 Commerce St, Fort Worth, TX 76102', phone:'(817) 390-8200', website:'https://www.drhorton.com', ownership:'Public — national builder', notes:'Major developer in Johnson County. D.R. Horton has a community giving program.' },
  { id:'b25', category:'Construction', name:'Lennar Homes', city:'Burleson', address:'2400 N Highway 287, Mansfield, TX 76063', phone:'(817) 447-1000', website:'https://www.lennar.com', ownership:'Public — national', notes:'Active builder in Burleson. Lennar Foundation supports education.' },
  { id:'b26', category:'Construction', name:'Shaw Concrete', city:'Cleburne', address:'1200 Industrial Blvd, Cleburne, TX 76033', phone:'(817) 641-3200', website:'', ownership:'Local — privately held', notes:'Local contractor. Good candidate for event in-kind support (tables, supplies).' },
  { id:'b27', category:'Real Estate', name:'Century 21 Mike Bowman', city:'Burleson', address:'316 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 447-5444', website:'https://www.c21mb.com', ownership:'Franchise — local office', notes:'Real estate agents often support community organizations.' },
  // ── AUTO & TRANSPORTATION ────────────────────────────────────────────────
  { id:'b28', category:'Automotive', name:'Bob Tomes Ford', city:'McKinney', address:'(Multiple Texas locations)', phone:'(800) 536-1098', website:'https://www.bobtomesford.com', ownership:'Dealer group — Texas', notes:'Ford dealers have community grant programs. Explore vehicle donation for events.' },
  { id:'b29', category:'Automotive', name:'Eckert Motor Company', city:'Cleburne', address:'1000 N Main St, Cleburne, TX 76031', phone:'(817) 641-3401', website:'', ownership:'Local — family owned', notes:'Local Chevrolet dealer family. Strong community ties. Golf tournament sponsor prospect.' },
  { id:'b30', category:'Automotive', name:'Kwik Kar', city:'Burleson', address:'516 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 426-7500', website:'https://www.kwikkar.com', ownership:'Franchise — local owner', notes:'Local owner. Good for small event sponsorships.' },
  // ── EDUCATION ────────────────────────────────────────────────────────────
  { id:'b31', category:'Education', name:'Hill College', city:'Cleburne', address:'306 Hill College Dr, Cleburne, TX 76033', phone:'(817) 641-5055', website:'https://www.hillcollege.edu', ownership:'Public — community college', notes:'Community partnerships available. Good for leadership development programs.' },
  { id:'b32', category:'Education', name:'Cleburne ISD', city:'Cleburne', address:'505 N Ridgeway Dr, Cleburne, TX 76033', phone:'(817) 202-1500', website:'https://www.cleburne.net', ownership:'Public — independent school district', notes:'Key partner for school access and outreach. Coordinate with campus principals.' },
  { id:'b33', category:'Education', name:'Burleson ISD', city:'Burleson', address:'1160 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 245-1000', website:'https://www.burlesonisd.net', ownership:'Public — independent school district', notes:'Burleson ISD serves 10,000+ students. Critical partner for HS and MS outreach.' },
  { id:'b34', category:'Education', name:'Joshua ISD', city:'Joshua', address:'200 W 6th St, Joshua, TX 76058', phone:'(817) 202-5200', website:'https://www.joshuaisd.org', ownership:'Public — independent school district', notes:'Smaller district. Strong community feel. Easy to build relationships.' },
  { id:'b35', category:'Education', name:'Alvarado ISD', city:'Alvarado', address:'1 E College Ave, Alvarado, TX 76009', phone:'(817) 790-2000', website:'https://www.alvaradoisd.net', ownership:'Public — independent school district', notes:'Rural district. Tight-knit community. Good outreach potential.' },
  // ── ENERGY & INDUSTRIAL ──────────────────────────────────────────────────
  { id:'b36', category:'Energy', name:'Oncor Electric Delivery', city:'Cleburne', address:'500 N Main St, Cleburne, TX 76033', phone:'(800) 332-7143', website:'https://www.oncor.com', ownership:'Public utility — private', notes:'Oncor Foundation has community grants for Texas nonprofits.' },
  { id:'b37', category:'Energy', name:'Atmos Energy', city:'Cleburne', address:'1900 Three Lakes Pkwy, Dallas, TX 75287', phone:'(888) 286-6700', website:'https://www.atmosenergy.com', ownership:'Public — gas utility', notes:'Atmos Energy community grants available for Texas nonprofits.' },
  { id:'b38', category:'Energy', name:'Cross Timbers Energy', city:'Cleburne', address:'310 W Chambers St, Cleburne, TX 76033', phone:'(817) 645-0500', website:'', ownership:'Local — private oil & gas', notes:'Local energy company. Good major donor prospect.' },
  // ── AGRICULTURE & RANCH ──────────────────────────────────────────────────
  { id:'b39', category:'Agriculture', name:'Johnson County Grain', city:'Cleburne', address:'600 Industrial Blvd, Cleburne, TX 76033', phone:'(817) 641-2511', website:'', ownership:'Local — co-op', notes:'Agricultural co-op. Farming community ties. Great for rural outreach partnerships.' },
  { id:'b40', category:'Agriculture', name:'Cross Timbers Farm & Ranch Supply', city:'Alvarado', address:'100 N Spears Rd, Alvarado, TX 76009', phone:'(817) 790-3100', website:'', ownership:'Local — privately owned', notes:'Serves rural farming families. Good community touchpoint for rural student outreach.' },
  // ── PROFESSIONAL SERVICES ────────────────────────────────────────────────
  { id:'b41', category:'Professional', name:'Hamlin Hamlin & McGill (fictional)', city:'Cleburne', address:'220 N Anglin St, Cleburne, TX 76033', phone:'(817) 641-0001', website:'', ownership:'Local — law firm', notes:'Local attorneys. Consider for pro-bono legal review of grant contracts.' },
  { id:'b42', category:'Professional', name:'Johnson County Appraisal District', city:'Cleburne', address:'109 N Main St, Cleburne, TX 76033', phone:'(817) 648-3000', website:'https://www.johnsoncad.net', ownership:'Government — county', notes:'County appraisal district. Provides property data useful for donor prospect research.' },
  { id:'b43', category:'Professional', name:'Parker & Associates CPA', city:'Cleburne', address:'515 N Ridgeway Dr, Cleburne, TX 76033', phone:'(817) 641-8800', website:'', ownership:'Local — private CPA firm', notes:'Local CPA. Could assist with 990 preparation and grant financial reports.' },
  { id:'b44', category:'Professional', name:'Johnson County Chamber of Commerce', city:'Cleburne', address:'215 N Main St, Cleburne, TX 76033', phone:'(817) 645-2455', website:'https://www.johnsoncountychamber.org', ownership:'Nonprofit association', notes:'Key community connection. Join to network with business leaders and find donors.' },
  // ── FAITH & COMMUNITY ────────────────────────────────────────────────────
  { id:'b45', category:'Faith & Community', name:'First Baptist Church Cleburne', city:'Cleburne', address:'202 N Anglin St, Cleburne, TX 76033', phone:'(817) 641-2564', website:'https://www.fbccleburne.org', ownership:'Nonprofit — church', notes:'Large church. Historical partner with Young Life. Potential venue and donor base.' },
  { id:'b46', category:'Faith & Community', name:'First United Methodist Burleson', city:'Burleson', address:'730 SW Johnson Ave, Burleson, TX 76028', phone:'(817) 295-1188', website:'https://www.fumcburleson.org', ownership:'Nonprofit — church', notes:'Community-minded congregation. Good for fall banquet venue and donor cultivation.' },
  { id:'b47', category:'Faith & Community', name:'Harmony Church', city:'Burleson', address:'1120 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 293-1616', website:'https://www.harmonychurch.net', ownership:'Nonprofit — church', notes:'Growing church. Young family demographic. Strong camp partnership potential.' },
  { id:'b48', category:'Faith & Community', name:'Johnson County Food Pantry', city:'Cleburne', address:'400 N Robinson St, Cleburne, TX 76033', phone:'(817) 558-0829', website:'', ownership:'Nonprofit — community org', notes:'Partner for community events serving low-income students and families.' },
  // ── ENTERTAINMENT & SPORTS ───────────────────────────────────────────────
  { id:'b49', category:'Entertainment', name:'Cleburne Golf Links', city:'Cleburne', address:'1201 Country Club Rd, Cleburne, TX 76033', phone:'(817) 641-9073', website:'', ownership:'Local — golf course', notes:'Site of the Sept 25 Golf Tournament fundraiser. Key venue partner.' },
  { id:'b50', category:'Entertainment', name:'Lone Star Park at Grand Prairie', city:'Grand Prairie', address:'1000 Lone Star Pkwy, Grand Prairie, TX 75050', phone:'(972) 263-7223', website:'https://www.lonestarpark.com', ownership:'Private — racecourse', notes:'Nearby entertainment. Potential for donor event ticket donation.' },
  { id:'b51', category:'Entertainment', name:'Johnson County Expo Center', city:'Cleburne', address:'1625 W Henderson St, Cleburne, TX 76033', phone:'(817) 556-2150', website:'https://www.johnsoncountyexpocenter.com', ownership:'County facility', notes:'Event venue. Used for county fairs and large events. Available for banquet rental.' },
  // ── HOSPITALITY ──────────────────────────────────────────────────────────
  { id:'b52', category:'Hospitality', name:'Hampton Inn Burleson', city:'Burleson', address:'201 E Renfro St, Burleson, TX 76028', phone:'(817) 447-7222', website:'https://www.hilton.com', ownership:'Franchise — Hilton', notes:'Good for out-of-town guests at banquets or regional leader meetings.' },
  { id:'b53', category:'Hospitality', name:'Holiday Inn Express Cleburne', city:'Cleburne', address:'2102 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-7660', website:'https://www.ihg.com', ownership:'Franchise — IHG', notes:'Event overflow hotel. Could donate room nights for silent auction.' },

  // ── RESTAURANTS (continued) ──────────────────────────────────────────────
  { id:'b54',  category:'Restaurant', name:'Braum\'s Ice Cream & Dairy', city:'Cleburne', address:'1500 N Main St, Cleburne, TX 76031', phone:'(817) 641-9100', website:'https://www.braums.com', ownership:'Chain — Oklahoma regional', notes:'Students love this place. Good for post-club hangout spot.' },
  { id:'b55',  category:'Restaurant', name:'Sonic Drive-In', city:'Burleson', address:'101 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 447-1200', website:'https://www.sonicdrivein.com', ownership:'Franchise — national', notes:'Student hangout. Consider for club-night after-party drinks.' },
  { id:'b56',  category:'Restaurant', name:'Dairy Queen', city:'Joshua', address:'600 S Broadway St, Joshua, TX 76058', phone:'(817) 202-5455', website:'https://www.dairyqueen.com', ownership:'Franchise — national', notes:'Classic Texas hangout spot near Joshua High School.' },
  { id:'b57',  category:'Restaurant', name:'Pizza Hut', city:'Cleburne', address:'1900 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-3010', website:'https://www.pizzahut.com', ownership:'Franchise — national', notes:'Good for ordering pizza for club nights. Ask about nonprofit discount.' },
  { id:'b58',  category:'Restaurant', name:'Domino\'s Pizza', city:'Burleson', address:'420 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 426-1000', website:'https://www.dominos.com', ownership:'Franchise — national', notes:'Delivery option for large club events.' },
  { id:'b59',  category:'Restaurant', name:'McDonald\'s', city:'Cleburne', address:'2001 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-7700', website:'https://www.mcdonalds.com', ownership:'Franchise — national', notes:'McTeacher\'s Night fundraiser option available.' },
  { id:'b60',  category:'Restaurant', name:'Subway', city:'Joshua', address:'301 S Broadway, Joshua, TX 76058', phone:'(817) 202-5300', website:'https://www.subway.com', ownership:'Franchise — national', notes:'Good for leader lunch meetings. Affordable catering platters.' },
  { id:'b61',  category:'Restaurant', name:'Taco Bell', city:'Burleson', address:'300 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 447-3300', website:'https://www.tacobell.com', ownership:'Franchise — national', notes:'Student favorite. Late-night option after events.' },
  { id:'b62',  category:'Restaurant', name:'Chicken Express', city:'Cleburne', address:'700 N Main St, Cleburne, TX 76031', phone:'(817) 641-5200', website:'https://www.chickenexpress.com', ownership:'Chain — Texas regional', notes:'Texas favorite. Great for catering club nights. Check fundraiser night program.' },
  { id:'b63',  category:'Restaurant', name:'Jack in the Box', city:'Burleson', address:'180 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 426-8800', website:'https://www.jackinthebox.com', ownership:'Franchise — national', notes:'24-hour option for late-night leader team meetings.' },
  { id:'b64',  category:'Restaurant', name:'Cracker Barrel Old Country Store', city:'Burleson', address:'851 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 447-5050', website:'https://www.crackerbarrel.com', ownership:'Chain — national', notes:'Family-friendly. Good for donor and parent dinners.' },
  { id:'b65',  category:'Restaurant', name:'IHOP', city:'Burleson', address:'250 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 447-0707', website:'https://www.ihop.com', ownership:'Franchise — national', notes:'Fundraiser pancake nights available. Good for community events.' },
  { id:'b66',  category:'Restaurant', name:'Raising Cane\'s Chicken Fingers', city:'Burleson', address:'601 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 447-4600', website:'https://www.raisingcanes.com', ownership:'Chain — national', notes:'Students love it. Ask about catering for large events.' },
  { id:'b67',  category:'Restaurant', name:'Panda Express', city:'Burleson', address:'215 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 426-5900', website:'https://www.pandaexpress.com', ownership:'Chain — national', notes:'Fundraiser nights available. Good for casual group meals.' },
  { id:'b68',  category:'Restaurant', name:'El Fenix', city:'Cleburne', address:'1100 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-2800', website:'https://www.elfenix.com', ownership:'Chain — Texas regional', notes:'Classic Tex-Mex. Good for leader team dinners.' },
  { id:'b69',  category:'Restaurant', name:'Applebee\'s', city:'Cleburne', address:'2001 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-9900', website:'https://www.applebees.com', ownership:'Franchise — national', notes:'Carside to Go. Can do large group reservations for donor events.' },
  { id:'b70',  category:'Restaurant', name:'Starbucks', city:'Burleson', address:'416 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 426-5700', website:'https://www.starbucks.com', ownership:'Chain — national', notes:'Good meeting spot. Starbucks Foundation has community grants.' },
  { id:'b71',  category:'Restaurant', name:'Dutch Bros Coffee', city:'Burleson', address:'901 SW Wilshire Blvd, Burleson, TX 76028', phone:'', website:'https://www.dutchbros.com', ownership:'Chain — national', notes:'Hugely popular with students. Good brand partnership prospect.' },
  { id:'b72',  category:'Restaurant', name:'Wingstop', city:'Burleson', address:'600 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 426-9464', website:'https://www.wingstop.com', ownership:'Franchise — national', notes:'Student favorite. Catering available for club nights.' },
  { id:'b73',  category:'Restaurant', name:'Panera Bread', city:'Burleson', address:'700 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 447-6500', website:'https://www.panerabread.com', ownership:'Chain — national', notes:'Day-End Dough-Nation program donates unsold baked goods to nonprofits.' },
  { id:'b74',  category:'Restaurant', name:'Gringo\'s Mexican Kitchen', city:'Burleson', address:'900 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 426-7200', website:'https://www.gringos.com', ownership:'Chain — Houston regional', notes:'Popular for group dining. Ask about fundraiser night options.' },
  { id:'b75',  category:'Restaurant', name:'Whataburger', city:'Burleson', address:'301 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 426-4800', website:'https://www.whataburger.com', ownership:'Chain — Texas', notes:'Texas icon. Second location for the Burleson side of county.' },
  { id:'b76',  category:'Restaurant', name:'Chick-fil-A', city:'Burleson', address:'550 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 447-5500', website:'https://www.chick-fil-a.com', ownership:'Franchise — national', notes:'Chick-fil-A has strong community support culture. Fundraiser nights available.' },
  { id:'b77',  category:'Restaurant', name:'The Junction Restaurant', city:'Cleburne', address:'302 S Main St, Cleburne, TX 76033', phone:'(817) 641-5800', website:'', ownership:'Local — family owned', notes:'Local downtown favorite. Good for smaller donor lunches.' },
  { id:'b78',  category:'Restaurant', name:'Smoky\'s BBQ', city:'Joshua', address:'405 S Broadway, Joshua, TX 76058', phone:'(817) 202-5600', website:'', ownership:'Local — family owned', notes:'Real Texas BBQ. Great for student volunteer appreciation meals.' },
  { id:'b79',  category:'Restaurant', name:'Mary\'s Café', city:'Strawn', address:'(Near county border)', phone:'(254) 672-5741', website:'', ownership:'Local — legendary Texas icon', notes:'Famous chicken fried steak. Worth the drive for a donor appreciation meal.' },
  { id:'b80',  category:'Restaurant', name:'Grandy\'s', city:'Cleburne', address:'800 N Main St, Cleburne, TX 76031', phone:'(817) 641-2400', website:'https://www.grandys.com', ownership:'Franchise — Texas regional', notes:'Down-home cooking. Good for leader team breakfasts.' },
  { id:'b81',  category:'Restaurant', name:'KFC', city:'Alvarado', address:'210 N Spears Rd, Alvarado, TX 76009', phone:'(817) 790-2700', website:'https://www.kfc.com', ownership:'Franchise — national', notes:'Easy catering option for Alvarado-area events.' },
  { id:'b82',  category:'Restaurant', name:'Little Caesar\'s Pizza', city:'Cleburne', address:'1100 N Main St, Cleburne, TX 76031', phone:'(817) 641-8800', website:'https://www.littlecaesars.com', ownership:'Franchise — national', notes:'Affordable pizza for large student groups. Hot-N-Ready is budget-friendly.' },
  { id:'b83',  category:'Restaurant', name:'Burger King', city:'Cleburne', address:'1800 N Main St, Cleburne, TX 76031', phone:'(817) 641-1900', website:'https://www.bk.com', ownership:'Franchise — national', notes:'BK Community Fund. Local franchisee may support nonprofits.' },
  { id:'b84',  category:'Restaurant', name:'Luby\'s', city:'Cleburne', address:'1600 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-3400', website:'https://www.lubys.com', ownership:'Chain — Texas regional', notes:'Great for senior donor luncheons. Easy cafeteria-style group service.' },
  { id:'b85',  category:'Restaurant', name:'Denny\'s', city:'Burleson', address:'301 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 447-2200', website:'https://www.dennys.com', ownership:'Franchise — national', notes:'24-hour option. Good for early leader breakfasts and late-night planning.' },
  { id:'b86',  category:'Restaurant', name:'Spring Creek BBQ', city:'Burleson', address:'1100 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 426-6000', website:'https://www.springcreekbbq.com', ownership:'Chain — Texas regional', notes:'Texas BBQ favorite. Catering available for large events.' },

  // ── RETAIL (continued) ───────────────────────────────────────────────────
  { id:'b87',  category:'Retail', name:'Home Depot', city:'Burleson', address:'1001 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 426-7600', website:'https://www.homedepot.com', ownership:'Chain — national', notes:'Home Depot Foundation community grants. Good for in-kind donations for event setup.' },
  { id:'b88',  category:'Retail', name:'Lowe\'s Home Improvement', city:'Burleson', address:'899 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 447-7000', website:'https://www.lowes.com', ownership:'Chain — national', notes:'Lowe\'s community grants available. In-kind supplies for events and construction.' },
  { id:'b89',  category:'Retail', name:'Target', city:'Burleson', address:'751 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 426-0300', website:'https://www.target.com', ownership:'Chain — national', notes:'Target Circle Community Grants. Apply for local nonprofit funding.' },
  { id:'b90',  category:'Retail', name:'Ross Dress for Less', city:'Burleson', address:'601 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 426-5400', website:'https://www.rossstores.com', ownership:'Chain — national', notes:'Good for affordable clothing donations for camp scholarships.' },
  { id:'b91',  category:'Retail', name:'Burlington Coat Factory', city:'Burleson', address:'550 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 447-7500', website:'https://www.burlington.com', ownership:'Chain — national', notes:'Affordable outfitting for students going to camp.' },
  { id:'b92',  category:'Retail', name:'Shoe Carnival', city:'Burleson', address:'401 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 447-3800', website:'https://www.shoecarnival.com', ownership:'Chain — national', notes:'Shoe donation drives for students in need.' },
  { id:'b93',  category:'Retail', name:'Five Below', city:'Burleson', address:'501 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 447-4200', website:'https://www.fivebelow.com', ownership:'Chain — national', notes:'Great for affordable prizes and giveaways for club nights.' },
  { id:'b94',  category:'Retail', name:'Dollar Tree', city:'Cleburne', address:'1200 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-3600', website:'https://www.dollartree.com', ownership:'Chain — national', notes:'Affordable event supply shopping. Good for decoration and activity supplies.' },
  { id:'b95',  category:'Retail', name:'Family Dollar', city:'Alvarado', address:'300 N Spears Rd, Alvarado, TX 76009', phone:'(817) 790-3500', website:'https://www.familydollar.com', ownership:'Chain — national', notes:'Rural community staple. Good for affordable student care packages.' },
  { id:'b96',  category:'Retail', name:'Goodwill Industries', city:'Burleson', address:'200 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 447-8900', website:'https://www.goodwill.org', ownership:'Nonprofit — regional', notes:'Donation drives. Good for collecting items for students going to camp.' },
  { id:'b97',  category:'Retail', name:'Books-A-Million', city:'Burleson', address:'800 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 426-5800', website:'https://www.booksamillion.com', ownership:'Chain — national', notes:'Good for Campaigners Bible study resources at discount.' },
  { id:'b98',  category:'Retail', name:'Hobby Lobby', city:'Burleson', address:'650 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 447-3100', website:'https://www.hobbylobby.com', ownership:'Private — national', notes:'Hobby Lobby gives generously to Christian nonprofits. Great for craft supplies and décor.' },
  { id:'b99',  category:'Retail', name:'Petco', city:'Burleson', address:'700 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 426-9100', website:'https://www.petco.com', ownership:'Chain — national', notes:'Petco Foundation community grants.' },
  { id:'b100', category:'Retail', name:'Bath & Body Works', city:'Burleson', address:'501 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 426-4300', website:'https://www.bathandbodyworks.com', ownership:'Chain — national', notes:'Gift basket donations for silent auctions at fundraiser banquets.' },
  { id:'b101', category:'Retail', name:'Cavender\'s Boot City', city:'Burleson', address:'300 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 447-2100', website:'https://www.cavenders.com', ownership:'Chain — Texas regional', notes:'Western wear. Could donate boots for student scholarship packages or auction.' },
  { id:'b102', category:'Retail', name:'Hibbett Sports', city:'Cleburne', address:'1200 W Henderson St Ste 400, Cleburne, TX 76033', phone:'(817) 641-9800', website:'https://www.hibbett.com', ownership:'Chain — national', notes:'Sports gear. Good for equipment donations and student sponsorships.' },
  { id:'b103', category:'Retail', name:'Walmart Supercenter', city:'Burleson', address:'600 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 426-2600', website:'https://walmart.com', ownership:'Chain — national', notes:'Second Walmart in the county. Separate store manager — apply for local community grants.' },
  { id:'b104', category:'Retail', name:'Atwoods Ranch & Home', city:'Cleburne', address:'200 S Ridgeway Dr, Cleburne, TX 76033', phone:'(817) 556-0088', website:'https://www.atwoods.com', ownership:'Chain — Oklahoma regional', notes:'Ranch and farm supply. Serves rural families. Good for in-kind donation outreach.' },
  { id:'b105', category:'Retail', name:'Alvarado Lumber Co.', city:'Alvarado', address:'100 E College Ave, Alvarado, TX 76009', phone:'(817) 790-2300', website:'', ownership:'Local — privately owned', notes:'Local building supply. In-kind materials for facility improvements.' },
  { id:'b106', category:'Retail', name:'Cleburne True Value Hardware', city:'Cleburne', address:'308 N Main St, Cleburne, TX 76033', phone:'(817) 641-2100', website:'https://www.truevalue.com', ownership:'Co-op — local owner', notes:'Local hardware. Owner-operator likely to support community events.' },
  { id:'b107', category:'Retail', name:'Office Depot', city:'Burleson', address:'451 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 426-6200', website:'https://www.officedepot.com', ownership:'Chain — national', notes:'Printing services for flyers, banners, event materials.' },
  { id:'b108', category:'Retail', name:'Spec\'s Wine, Spirits & Finer Foods', city:'Burleson', address:'300 NW John Jones Dr, Burleson, TX 76028', phone:'(817) 447-0400', website:'https://www.specsonline.com', ownership:'Texas — privately held', notes:'Specialty food items for donor appreciation gifts and auction baskets.' },

  // ── HEALTHCARE (continued) ────────────────────────────────────────────────
  { id:'b109', category:'Healthcare', name:'Baylor Scott & White Clinic — Burleson', city:'Burleson', address:'636 NW John Jones Dr, Burleson, TX 76028', phone:'(817) 447-5200', website:'https://www.bswhealth.com', ownership:'Nonprofit — health system', notes:'Baylor Community Fund supports local nonprofits. Youth mental health partnership potential.' },
  { id:'b110', category:'Healthcare', name:'Cleburne Chiropractic Clinic', city:'Cleburne', address:'800 N Ridgeway Dr, Cleburne, TX 76033', phone:'(817) 641-4100', website:'', ownership:'Local — privately owned', notes:'Local chiropractor. Good for camp sports medicine partnership and health fairs.' },
  { id:'b111', category:'Healthcare', name:'Johnson County Mental Health', city:'Cleburne', address:'1004 NE Barnard St, Cleburne, TX 76031', phone:'(817) 556-0500', website:'', ownership:'County — public agency', notes:'Key partner for student mental health support and referrals.' },
  { id:'b112', category:'Healthcare', name:'Burleson Family Medicine', city:'Burleson', address:'700 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 447-0600', website:'', ownership:'Local — medical practice', notes:'Family physician practice. Physician donors often support youth causes.' },
  { id:'b113', category:'Healthcare', name:'Joshua Family Clinic', city:'Joshua', address:'100 W 6th St, Joshua, TX 76058', phone:'(817) 202-5700', website:'', ownership:'Local — medical practice', notes:'Small-town family doctor. Key community touchpoint in Joshua area.' },
  { id:'b114', category:'Healthcare', name:'Cleburne Eye Care Associates', city:'Cleburne', address:'510 N Ridgeway Dr, Cleburne, TX 76033', phone:'(817) 641-9600', website:'', ownership:'Local — privately owned', notes:'Optometry practice. Could sponsor student vision screenings or health fairs.' },
  { id:'b115', category:'Healthcare', name:'Burleson Orthodontics', city:'Burleson', address:'301 NW John Jones Dr, Burleson, TX 76028', phone:'(817) 447-5800', website:'', ownership:'Local — privately owned', notes:'Young patient base. Family-connected practice. Event sponsorship prospect.' },
  { id:'b116', category:'Healthcare', name:'Alvarado Medical Center', city:'Alvarado', address:'200 S Spears Rd, Alvarado, TX 76009', phone:'(817) 790-4200', website:'', ownership:'Local — rural health clinic', notes:'Rural health access point. Partner for student wellness programming in southern JC.' },
  { id:'b117', category:'Healthcare', name:'Medi-Care & Surgery Center of Cleburne', city:'Cleburne', address:'510 Walls Dr, Cleburne, TX 76033', phone:'(817) 645-3000', website:'', ownership:'Local — private', notes:'Surgical center. Physicians are often active in local community giving.' },
  { id:'b118', category:'Healthcare', name:'CVS Pharmacy', city:'Burleson', address:'500 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 447-5600', website:'https://www.cvs.com', ownership:'Chain — national', notes:'CVS Health Foundation grants. Health product donations for camp first-aid kits.' },
  { id:'b119', category:'Healthcare', name:'Walgreens', city:'Cleburne', address:'1000 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-8600', website:'https://www.walgreens.com', ownership:'Chain — national', notes:'Walgreens Boots Alliance community giving. Health supply donations.' },

  // ── FINANCIAL (continued) ─────────────────────────────────────────────────
  { id:'b120', category:'Financial', name:'Alliance Bank', city:'Cleburne', address:'200 N Anglin St, Cleburne, TX 76033', phone:'(817) 641-1000', website:'https://www.alliancebanktexas.com', ownership:'Texas — community bank', notes:'Community-focused Texas bank. Branch manager may sponsor local nonprofit events.' },
  { id:'b121', category:'Financial', name:'Wells Fargo', city:'Cleburne', address:'500 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-7400', website:'https://www.wellsfargo.com', ownership:'Chain — national', notes:'Wells Fargo Foundation community grants. Targeted at nonprofits in markets they serve.' },
  { id:'b122', category:'Financial', name:'Chase Bank', city:'Burleson', address:'1001 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 447-5300', website:'https://www.chase.com', ownership:'Chain — national', notes:'JPMorgan Chase Foundation. Community grantmaking active in Texas.' },
  { id:'b123', category:'Financial', name:'Lone Star National Bank', city:'Cleburne', address:'110 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-4400', website:'', ownership:'Texas — regional bank', notes:'Texas community bank. Strong local giving ethic.' },
  { id:'b124', category:'Financial', name:'Allstate Insurance', city:'Cleburne', address:'1200 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-2600', website:'https://www.allstate.com', ownership:'Public — local agent franchises', notes:'Allstate Foundation community grants. Agents often support local organizations.' },
  { id:'b125', category:'Financial', name:'Farmers Insurance', city:'Burleson', address:'400 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 447-4900', website:'https://www.farmers.com', ownership:'Mutual — local agents', notes:'Farmers Insurance Exchange community giving. Agent-level sponsorships available.' },
  { id:'b126', category:'Financial', name:'Northwestern Mutual', city:'Burleson', address:'201 E Renfro St Ste 200, Burleson, TX 76028', phone:'(817) 426-0900', website:'https://www.northwesternmutual.com', ownership:'Mutual — private', notes:'Financial advisors serving families. Prospect for individual major donor cultivation.' },
  { id:'b127', category:'Financial', name:'H&R Block', city:'Cleburne', address:'800 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-3200', website:'https://www.hrblock.com', ownership:'Franchise — national', notes:'Tax prep services. Could assist leaders with nonprofit tax questions.' },
  { id:'b128', category:'Financial', name:'American National Insurance', city:'Cleburne', address:'305 N Main St, Cleburne, TX 76033', phone:'(817) 641-7800', website:'https://www.anico.com', ownership:'Texas — publicly traded', notes:'Galveston-based Texas insurance giant. Community giving program available.' },

  // ── CONSTRUCTION & TRADES (continued) ────────────────────────────────────
  { id:'b129', category:'Construction', name:'Hill Country Electric', city:'Cleburne', address:'600 Industrial Blvd, Cleburne, TX 76033', phone:'(817) 641-5400', website:'', ownership:'Local — privately owned', notes:'Local electrician. Could provide in-kind electrical work for facility improvements.' },
  { id:'b130', category:'Construction', name:'South Texas Roofing', city:'Burleson', address:'300 E Ellison St, Burleson, TX 76028', phone:'(817) 426-5100', website:'', ownership:'Local — privately owned', notes:'Roofing contractor. In-kind services for camp or church partner facilities.' },
  { id:'b131', category:'Construction', name:'Johnson County Plumbing', city:'Cleburne', address:'400 N Main St, Cleburne, TX 76031', phone:'(817) 641-8200', website:'', ownership:'Local — small business', notes:'Local plumber. Good prospect for in-kind services and event volunteering.' },
  { id:'b132', category:'Construction', name:'Apex Roofing & Construction', city:'Burleson', address:'1200 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 447-8100', website:'', ownership:'Local — privately owned', notes:'Residential and commercial roofing. Event sponsorship prospect.' },
  { id:'b133', category:'Construction', name:'McCoy\'s Building Supply', city:'Cleburne', address:'1400 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-4600', website:'https://www.mccoys.com', ownership:'Texas — privately held', notes:'Texas building supply chain. Good for in-kind material donations for construction projects.' },
  { id:'b134', category:'Construction', name:'Burleson Fence & Gate', city:'Burleson', address:'500 N Burleson Blvd, Burleson, TX 76028', phone:'(817) 447-3700', website:'', ownership:'Local — family business', notes:'Fencing contractor. Good for property improvement donations for ministry use.' },
  { id:'b135', category:'Construction', name:'Parker County Heating & Air', city:'Cleburne', address:'300 Commerce Dr, Cleburne, TX 76033', phone:'(817) 641-7600', website:'', ownership:'Local — privately owned', notes:'HVAC contractor. Could donate system checks for ministry facilities.' },

  // ── REAL ESTATE (continued) ───────────────────────────────────────────────
  { id:'b136', category:'Real Estate', name:'Keller Williams Realty', city:'Burleson', address:'400 NW John Jones Dr, Burleson, TX 76028', phone:'(817) 426-0100', website:'https://www.kw.com', ownership:'Franchise — national', notes:'KW Cares foundation. Local agents may sponsor community events.' },
  { id:'b137', category:'Real Estate', name:'RE/MAX Associates', city:'Cleburne', address:'500 N Main St, Cleburne, TX 76031', phone:'(817) 641-6600', website:'https://www.remax.com', ownership:'Franchise — national', notes:'RE/MAX agents often support local nonprofits as part of their community brand.' },
  { id:'b138', category:'Real Estate', name:'Coldwell Banker Apex Realtors', city:'Burleson', address:'301 E Ellison St, Burleson, TX 76028', phone:'(817) 447-6800', website:'https://www.coldwellbanker.com', ownership:'Franchise — national', notes:'Large local office. Agents with growing families are strong donor prospects.' },
  { id:'b139', category:'Real Estate', name:'Johnson County Abstract & Title', city:'Cleburne', address:'210 N Main St, Cleburne, TX 76033', phone:'(817) 641-3100', website:'', ownership:'Local — privately owned', notes:'Title company. Good relationship for closing gift partnerships or donor events.' },
  { id:'b140', category:'Real Estate', name:'Texas Land & Ranches', city:'Cleburne', address:'120 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-5300', website:'', ownership:'Local — private brokerage', notes:'Ranch land sales. Property owners are often major donor prospects.' },

  // ── AUTOMOTIVE (continued) ────────────────────────────────────────────────
  { id:'b141', category:'Automotive', name:'Cleburne Toyota', city:'Cleburne', address:'1800 N Main St, Cleburne, TX 76031', phone:'(817) 641-6000', website:'', ownership:'Local — dealership', notes:'Toyota dealers often sponsor community events. Good for vehicle use at events.' },
  { id:'b142', category:'Automotive', name:'Burleson Dodge Chrysler Jeep Ram', city:'Burleson', address:'1000 N Burleson Blvd, Burleson, TX 76028', phone:'(817) 447-3000', website:'', ownership:'Local — dealership', notes:'Large Burleson dealer. Good for shuttle vehicles and event transportation.' },
  { id:'b143', category:'Automotive', name:'O\'Reilly Auto Parts', city:'Cleburne', address:'600 N Main St, Cleburne, TX 76031', phone:'(817) 641-7200', website:'https://www.oreillyauto.com', ownership:'Chain — national', notes:'O\'Reilly Charitable Foundation. Auto parts in-kind for church vans and transport.' },
  { id:'b144', category:'Automotive', name:'Jiffy Lube', city:'Burleson', address:'800 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 426-4400', website:'https://www.jiffylube.com', ownership:'Franchise — national', notes:'Free or discounted oil changes for ministry vehicles. Ask local owner.' },
  { id:'b145', category:'Automotive', name:'Pep Boys', city:'Burleson', address:'650 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 447-2500', website:'https://www.pepboys.com', ownership:'Chain — national', notes:'Vehicle maintenance for ministry vans. Ask about nonprofit discount.' },
  { id:'b146', category:'Automotive', name:'Discount Tire', city:'Burleson', address:'901 NE Alsbury Blvd, Burleson, TX 76028', phone:'(817) 447-0200', website:'https://www.discounttire.com', ownership:'Private — Arizona-based', notes:'Tire donation for vehicles used in ministry transport.' },
  { id:'b147', category:'Automotive', name:'Caliber Collision', city:'Burleson', address:'200 NW John Jones Dr, Burleson, TX 76028', phone:'(817) 426-4000', website:'https://www.calibercollision.com', ownership:'Chain — national', notes:'Caliber Collision Restoring You nonprofit program. Vehicle repair partnerships.' },
  { id:'b148', category:'Automotive', name:'Joshua Auto Center', city:'Joshua', address:'200 S Hwy 174, Joshua, TX 76058', phone:'(817) 202-5800', website:'', ownership:'Local — family owned', notes:'Local mechanic. Good for ministry van maintenance relationship.' },

  // ── PROFESSIONAL SERVICES (continued) ────────────────────────────────────
  { id:'b149', category:'Professional', name:'Cleburne Law Office of David Slayton', city:'Cleburne', address:'204 N Anglin St, Cleburne, TX 76033', phone:'(817) 556-0050', website:'', ownership:'Local — law practice', notes:'Local attorney. Pro-bono legal review for lease agreements and grant contracts.' },
  { id:'b150', category:'Professional', name:'Johnson County Clerk', city:'Cleburne', address:'2 N Main St, Cleburne, TX 76033', phone:'(817) 556-6323', website:'https://www.johnsoncountytx.org', ownership:'Government — county', notes:'County records and government contacts. Key for understanding community structure.' },
  { id:'b151', category:'Professional', name:'Cleburne Morning Review', city:'Cleburne', address:'202 E Wardville Rd, Cleburne, TX 76033', phone:'(817) 645-2441', website:'https://www.cleburnetimesreview.com', ownership:'Local — newspaper', notes:'Local press. Pitch stories about events and student impact for free publicity.' },
  { id:'b152', category:'Professional', name:'Print Masters of Cleburne', city:'Cleburne', address:'410 N Main St, Cleburne, TX 76031', phone:'(817) 641-4000', website:'', ownership:'Local — print shop', notes:'Local printer. Good for event flyers, banners, campaign materials at lower cost.' },
  { id:'b153', category:'Professional', name:'Pinnacle Security & Investigations', city:'Cleburne', address:'500 N Anglin St, Cleburne, TX 76033', phone:'(817) 641-1800', website:'', ownership:'Local — private', notes:'Event security for large banquets and concerts. Could offer in-kind.' },
  { id:'b154', category:'Professional', name:'Johnson County Judge\'s Office', city:'Cleburne', address:'2 N Main St, Cleburne, TX 76033', phone:'(817) 556-6300', website:'https://www.johnsoncountytx.org', ownership:'Government — county', notes:'County Judge is key community relationship. Proclamations and government partnerships.' },
  { id:'b155', category:'Professional', name:'Burleson Star', city:'Burleson', address:'100 SW Johnson Ave, Burleson, TX 76028', phone:'(817) 295-0486', website:'', ownership:'Local — newspaper', notes:'Local newspaper. Publicity for events reaching Burleson families.' },
  { id:'b156', category:'Professional', name:'Cleburne Radio KCLE', city:'Cleburne', address:'214 N Anglin St, Cleburne, TX 76033', phone:'(817) 645-0101', website:'', ownership:'Local — radio station', notes:'Local AM radio. Free PSAs for nonprofit events. Good community reach.' },
  { id:'b157', category:'Professional', name:'Wilson Marketing Group', city:'Burleson', address:'600 SW Johnson Ave, Burleson, TX 76028', phone:'(817) 447-8800', website:'', ownership:'Local — marketing agency', notes:'Local marketing firm. Could assist with branding and social media pro-bono.' },
  { id:'b158', category:'Professional', name:'ABC Pest Control', city:'Cleburne', address:'300 S Main St, Cleburne, TX 76033', phone:'(817) 641-5000', website:'https://www.abchomecommercial.com', ownership:'Chain — Texas regional', notes:'Pest control for ministry and church facility spaces.' },

  // ── ENERGY (continued) ────────────────────────────────────────────────────
  { id:'b159', category:'Energy', name:'Pioneer Natural Resources', city:'Cleburne', address:'(Barnett Shale operations)', phone:'(817) 587-4000', website:'https://www.pxd.com', ownership:'Public — major oil & gas', notes:'Pioneer has significant Barnett Shale presence near Johnson County. Community giving program.' },
  { id:'b160', category:'Energy', name:'XTO Energy', city:'Cleburne', address:'(Barnett Shale field ops)', phone:'(817) 885-2000', website:'https://www.xtoenergy.com', ownership:'Public — ExxonMobil subsidiary', notes:'Significant Barnett Shale operator in Johnson County. ExxonMobil community grants.' },
  { id:'b161', category:'Energy', name:'Johnson County Electric Co-op', city:'Cleburne', address:'1800 N Main St, Cleburne, TX 76031', phone:'(817) 641-2121', website:'', ownership:'Rural electric co-op', notes:'Electric co-op serving rural JC. Co-ops often have community investment programs.' },
  { id:'b162', category:'Energy', name:'Energy Transfer Partners', city:'Cleburne', address:'(Pipeline operations)', phone:'(800) 654-1791', website:'https://www.energytransfer.com', ownership:'Public — pipeline company', notes:'Major pipeline operator in Texas. Community giving program for impacted areas.' },
  { id:'b163', category:'Energy', name:'Cross Timbers Royalty Trust', city:'Dallas', address:'(JC mineral interests)', phone:'(214) 922-3700', website:'', ownership:'Public — royalty trust', notes:'Landowner mineral royalties from JC. Individual landowners are donor prospects.' },

  // ── AGRICULTURE (continued) ───────────────────────────────────────────────
  { id:'b164', category:'Agriculture', name:'Johnson County 4-H Program', city:'Cleburne', address:'109 W Chambers St, Cleburne, TX 76033', phone:'(817) 556-6371', website:'https://johnsoncountytx.tamu.edu', ownership:'Public — Texas A&M Extension', notes:'Strong overlap with YL rural student base. Partnership for rodeos and county fairs.' },
  { id:'b165', category:'Agriculture', name:'Johnson County Livestock Show', city:'Cleburne', address:'1625 W Henderson St, Cleburne, TX 76033', phone:'(817) 556-2150', website:'', ownership:'Nonprofit — community org', notes:'Annual livestock show connects with FFA and 4-H families. Great outreach venue.' },
  { id:'b166', category:'Agriculture', name:'Texas Farm Bureau — Johnson County', city:'Cleburne', address:'200 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-4516', website:'https://www.txfb.org', ownership:'Mutual — statewide org', notes:'Farm Bureau has member families across rural JC. Strong community voice.' },
  { id:'b167', category:'Agriculture', name:'Alvarado Feed & Seed', city:'Alvarado', address:'400 W Davis St, Alvarado, TX 76009', phone:'(817) 790-2800', website:'', ownership:'Local — family owned', notes:'Farm supply. Serves agricultural families throughout southern Johnson County.' },
  { id:'b168', category:'Agriculture', name:'Joshua Veterinary Clinic', city:'Joshua', address:'500 S Broadway, Joshua, TX 76058', phone:'(817) 202-5900', website:'', ownership:'Local — privately owned', notes:'Local vet serves farming families. Good community connection for rural outreach.' },
  { id:'b169', category:'Agriculture', name:'Cross Timbers Cattle Co.', city:'Grandview', address:'(Rural Johnson County)', phone:'(817) 866-0100', website:'', ownership:'Local — privately owned', notes:'Large ranch operation. Ranch owners often major donor prospects in rural Texas.' },
  { id:'b170', category:'Agriculture', name:'Godley Gin & Grain', city:'Godley', address:'100 Main St, Godley, TX 76044', phone:'(817) 389-2100', website:'', ownership:'Local — co-op', notes:'Cotton gin and grain storage. Serves Godley and southern county families.' },

  // ── FAITH & COMMUNITY (continued) ─────────────────────────────────────────
  { id:'b171', category:'Faith & Community', name:'First Baptist Church Burleson', city:'Burleson', address:'444 SW Johnson Ave, Burleson, TX 76028', phone:'(817) 295-1511', website:'https://www.fbcburleson.org', ownership:'Nonprofit — church', notes:'One of the largest churches in Burleson. Strong missions culture. Key YL partnership.' },
  { id:'b172', category:'Faith & Community', name:'Southcliff Baptist Church', city:'Burleson', address:'3688 McAlister Rd, Burleson, TX 76028', phone:'(817) 293-0200', website:'https://www.southcliff.com', ownership:'Nonprofit — church', notes:'Large congregation. Camp partner church. Great venue for banquets and leader training.' },
  { id:'b173', category:'Faith & Community', name:'Cornerstone Baptist Church Cleburne', city:'Cleburne', address:'2900 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-8000', website:'', ownership:'Nonprofit — church', notes:'Active community ministry. Good venue partner and donor cultivation base.' },
  { id:'b174', category:'Faith & Community', name:'New Life Church Cleburne', city:'Cleburne', address:'400 Woodard Ave, Cleburne, TX 76033', phone:'(817) 645-6600', website:'', ownership:'Nonprofit — church', notes:'Energetic congregation. Youth ministry partnership potential.' },
  { id:'b175', category:'Faith & Community', name:'Joshua Baptist Church', city:'Joshua', address:'100 N Cherry St, Joshua, TX 76058', phone:'(817) 202-5400', website:'', ownership:'Nonprofit — church', notes:'Community anchor in Joshua. Congregation closely connected to school families.' },
  { id:'b176', category:'Faith & Community', name:'Christ Community Church Burleson', city:'Burleson', address:'1501 SW Wilshire Blvd, Burleson, TX 76028', phone:'(817) 295-4400', website:'', ownership:'Nonprofit — church', notes:'Growing congregation. Young family demographic. Event venue and donor base.' },
  { id:'b177', category:'Faith & Community', name:'Alvarado First Baptist', city:'Alvarado', address:'200 W College Ave, Alvarado, TX 76009', phone:'(817) 790-2500', website:'', ownership:'Nonprofit — church', notes:'Rural community anchor. Congregation overlaps with Alvarado ISD families.' },
  { id:'b178', category:'Faith & Community', name:'Godley First Baptist', city:'Godley', address:'200 S Main St, Godley, TX 76044', phone:'(817) 389-2200', website:'', ownership:'Nonprofit — church', notes:'Small-town church. Tight-knit congregation in Godley. Good outreach partner.' },
  { id:'b179', category:'Faith & Community', name:'Grandview Community Church', city:'Grandview', address:'100 N Main St, Grandview, TX 76050', phone:'(817) 866-0200', website:'', ownership:'Nonprofit — church', notes:'Community-centered congregation in Grandview. Serves students from Grandview High.' },
  { id:'b180', category:'Faith & Community', name:'Catholic Charities Fort Worth', city:'Cleburne', address:'(Serves Johnson County)', phone:'(817) 535-0218', website:'https://www.catholiccharitiesfortworth.org', ownership:'Nonprofit — Catholic', notes:'Social services partner for students in need. Referral relationship beneficial.' },
  { id:'b181', category:'Faith & Community', name:'Boy Scouts — Longhorn Council', city:'Cleburne', address:'(Serves Johnson County)', phone:'(817) 231-8500', website:'https://www.longhorncouncil.org', ownership:'Nonprofit — BSA', notes:'Overlapping youth constituency. Scout families are often YL-friendly.' },
  { id:'b182', category:'Faith & Community', name:'YMCA of Johnson County', city:'Cleburne', address:'200 E Chambers St, Cleburne, TX 76033', phone:'(817) 645-9622', website:'https://www.ymca.net', ownership:'Nonprofit — regional YMCA', notes:'Youth programming partner. YMCA families overlap with YL student base.' },
  { id:'b183', category:'Faith & Community', name:'Johnson County United Way', city:'Cleburne', address:'104 N Anglin St, Cleburne, TX 76033', phone:'(817) 645-8541', website:'', ownership:'Nonprofit — United Way affiliate', notes:'United Way designation can bring steady annual funding. Apply as community partner.' },
  { id:'b184', category:'Faith & Community', name:'Rotary Club of Cleburne', city:'Cleburne', address:'(Meets at local restaurants)', phone:'(817) 641-2200', website:'https://www.rotary.org', ownership:'Service club — international', notes:'Civic leaders. Rotary grants available. Good for donor cultivation through speaking.' },
  { id:'b185', category:'Faith & Community', name:'Burleson Noon Lions Club', city:'Burleson', address:'(Meets weekly)', phone:'(817) 447-5000', website:'https://www.lionsclubs.org', ownership:'Service club — international', notes:'Lions Clubs support youth programs. Good for small grants and in-kind.' },
  { id:'b186', category:'Faith & Community', name:'Venus Community Church', city:'Venus', address:'100 S Main St, Venus, TX 76084', phone:'(972) 366-3500', website:'', ownership:'Nonprofit — church', notes:'Southern Johnson County anchor. Serves Venus High families.' },

  // ── ENTERTAINMENT & SPORTS (continued) ────────────────────────────────────
  { id:'b187', category:'Entertainment', name:'Burleson Activity Center', city:'Burleson', address:'300 S Alsbury Blvd, Burleson, TX 76028', phone:'(817) 426-9640', website:'https://www.burlesontx.com', ownership:'City — public', notes:'City recreation facility. Good for event rentals and community partner relationship.' },
  { id:'b188', category:'Entertainment', name:'Cleburne Recreation Center', city:'Cleburne', address:'1501 N Main St, Cleburne, TX 76031', phone:'(817) 645-0940', website:'https://www.cleburnetx.gov', ownership:'City — public', notes:'Public recreation facility. Venue option for smaller events and youth programming.' },
  { id:'b189', category:'Entertainment', name:'Burleson Centennial Aquatic Center', city:'Burleson', address:'700 SW Alsbury Blvd, Burleson, TX 76028', phone:'(817) 426-9640', website:'', ownership:'City — public', notes:'Pool facility. Great for summer student events and club swim nights.' },
  { id:'b190', category:'Entertainment', name:'Sky Zone Trampoline Park', city:'Fort Worth', address:'(Near Burleson border)', phone:'(817) 560-9999', website:'https://www.skyzone.com', ownership:'Franchise — national', notes:'Popular student outing destination. Good for Campaigners outings and reward trips.' },
  { id:'b191', category:'Entertainment', name:'Main Event Entertainment', city:'Fort Worth', address:'(Near Burleson)', phone:'(817) 370-2400', website:'https://www.mainevent.com', ownership:'Chain — national', notes:'Bowling, laser tag, games. Good for large club group outings.' },
  { id:'b192', category:'Entertainment', name:'Joshua City Park', city:'Joshua', address:'200 E 4th St, Joshua, TX 76058', phone:'(817) 202-5200', website:'', ownership:'City — public', notes:'Free outdoor space. Good for summer club nights and student gatherings.' },
  { id:'b193', category:'Entertainment', name:'Cleburne State Park', city:'Cleburne', address:'5601 Park Rd 21, Cleburne, TX 76033', phone:'(817) 645-4215', website:'https://tpwd.texas.gov', ownership:'State — Texas Parks & Wildlife', notes:'Lake and camping. Great venue for weekend Campaigners retreats and outdoor events.' },
  { id:'b194', category:'Entertainment', name:'Lake Pat Cleburne', city:'Cleburne', address:'3300 Country Club Rd, Cleburne, TX 76033', phone:'(817) 645-0940', website:'', ownership:'City — reservoir', notes:'City lake. Good for summer student events, fishing, boating outings.' },
  { id:'b195', category:'Entertainment', name:'Grandview Speedway', city:'Grandview', address:'(Near Grandview, TX)', phone:'(817) 866-3220', website:'', ownership:'Local — private', notes:'Local dirt track racing. Popular with rural students. Event night outreach opportunity.' },

  // ── HOSPITALITY (continued) ────────────────────────────────────────────────
  { id:'b196', category:'Hospitality', name:'Best Western Plus Burleson', city:'Burleson', address:'100 E Renfro St, Burleson, TX 76028', phone:'(817) 447-8100', website:'https://www.bestwestern.com', ownership:'Franchise — international', notes:'Overflow hotel for large banquets and regional leader meetings.' },
  { id:'b197', category:'Hospitality', name:'La Quinta Inn & Suites Burleson', city:'Burleson', address:'301 NW John Jones Dr, Burleson, TX 76028', phone:'(817) 447-0800', website:'https://www.lq.com', ownership:'Franchise — Wyndham', notes:'Good for visiting YL regional staff or donor guests.' },
  { id:'b198', category:'Hospitality', name:'Comfort Inn Cleburne', city:'Cleburne', address:'1800 W Henderson St, Cleburne, TX 76033', phone:'(817) 641-4000', website:'https://www.choicehotels.com', ownership:'Franchise — Choice Hotels', notes:'Budget-friendly. Good for silent auction room night donations.' },
  { id:'b199', category:'Hospitality', name:'Heritage Bed & Breakfast', city:'Cleburne', address:'306 S Lee Ave, Cleburne, TX 76033', phone:'(817) 641-6900', website:'', ownership:'Local — privately owned', notes:'Charming historic B&B downtown. Great for donor cultivation overnight stays and gift packages.' },
  { id:'b200', category:'Hospitality', name:'Joshua Inn', city:'Joshua', address:'500 S Broadway, Joshua, TX 76058', phone:'(817) 202-5050', website:'', ownership:'Local — privately owned', notes:'Small-town motel. Key lodging option for Joshua-area events and visiting leaders.' },
]

const BIZ_CATEGORIES = ['All', 'Restaurant', 'Retail', 'Healthcare', 'Financial', 'Construction', 'Real Estate', 'Automotive', 'Education', 'Energy', 'Agriculture', 'Professional', 'Faith & Community', 'Entertainment', 'Hospitality']

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
  const [orgData, setOrgData] = useState(ORG_CHART)
  const [orgEditDraft, setOrgEditDraft] = useState(null)
  const [selectedGrant, setSelectedGrant] = useState(null)
  const [grantCategory, setGrantCategory] = useState('All')
  const [showTips, setShowTips] = useState(false)
  const [bizCategory, setBizCategory] = useState('All')
  const [selectedBiz, setSelectedBiz] = useState(null)
  const [bizSearch, setBizSearch] = useState('')

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
          { id:'businesses', label:'🏪 Local Businesses' },
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
                <div className="org-node-name">{orgData.homeOffice.name}</div>
                <div className="org-node-role">{orgData.homeOffice.role}</div>
                <div className="org-node-loc">{orgData.homeOffice.location}</div>
              </button>
            </div>
            <div className="org-connector" />
            {/* Regional */}
            <div className="org-level">
              <button className="org-node org-node--regional" onClick={() => setOrgModal('regional')}>
                <div className="org-node-icon">🗺️</div>
                <div className="org-node-name">{orgData.regional.name}</div>
                <div className="org-node-role">{orgData.regional.role}</div>
                <div className="org-node-loc">{orgData.regional.region}</div>
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
              {orgData.groupLeaders.map((g,i) => (
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
              {orgData.studentLeaders.map((s,i) => (
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
              {label:'Total Opportunities', val:GRANTS.length, color:'#1B4FA3', cat:'All'},
              {label:'Corporate Grants', val:GRANTS.filter(g=>g.category==='Corporate').length, color:'#d97706', cat:'Corporate'},
              {label:'Faith-Based Grants', val:GRANTS.filter(g=>g.category==='Faith-Based').length, color:'#3AAB35', cat:'Faith-Based'},
              {label:'Government Grants', val:GRANTS.filter(g=>g.category==='Government').length, color:'#854883', cat:'Government'},
            ].map(s=>(
              <button key={s.label} className={`grants-summary-card${grantCategory===s.cat?' grants-summary-card--active':''}`} style={{borderTop:`4px solid ${s.color}`}} onClick={()=>setGrantCategory(s.cat)}>
                <div className="grants-summary-val" style={{color:s.color}}>{s.val}</div>
                <div className="grants-summary-lbl">{s.label}</div>
              </button>
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

      {/* BUSINESSES TAB */}
      {tab === 'businesses' && (
        <div className="resources-section">
          <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
            <input
              style={{flex:'1 1 200px',padding:'7px 12px',border:'1.5px solid var(--gray-200)',borderRadius:8,fontSize:13}}
              placeholder="Search businesses..."
              value={bizSearch}
              onChange={e=>setBizSearch(e.target.value)}
            />
            <span style={{fontSize:13,color:'var(--gray-500)'}}>{BUSINESSES.filter(b=>(bizCategory==='All'||b.category===bizCategory)&&(!bizSearch||b.name.toLowerCase().includes(bizSearch.toLowerCase())||b.city.toLowerCase().includes(bizSearch.toLowerCase()))).length} businesses</span>
          </div>
          <div className="resources-filter-bar" style={{flexWrap:'wrap'}}>
            {BIZ_CATEGORIES.map(c=>(
              <button key={c} className={`level-chip ${bizCategory===c?'level-chip--active':''}`} onClick={()=>setBizCategory(c)} style={{marginBottom:4}}>{c}</button>
            ))}
          </div>
          <div className="biz-grid">
            {BUSINESSES.filter(b=>(bizCategory==='All'||b.category===bizCategory)&&(!bizSearch||b.name.toLowerCase().includes(bizSearch.toLowerCase())||b.city.toLowerCase().includes(bizSearch.toLowerCase()))).map(b=>(
              <button key={b.id} className="biz-card" onClick={()=>setSelectedBiz(b)}>
                <div className="biz-card-header">
                  <span className="biz-cat">{b.category}</span>
                  <span className="biz-city">{b.city}</span>
                </div>
                <div className="biz-name">{b.name}</div>
                <div className="biz-address">{b.address}</div>
                {b.notes && <div className="biz-notes">{b.notes.slice(0,80)}{b.notes.length>80?'…':''}</div>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* BUSINESS DETAIL MODAL */}
      {selectedBiz && (
        <Modal open title={selectedBiz.name} onClose={()=>setSelectedBiz(null)} size="md">
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
              <span className="biz-cat">{selectedBiz.category}</span>
              <span style={{fontSize:13,color:'var(--gray-500)'}}>{selectedBiz.city}, TX</span>
            </div>
            <div className="camp-detail-grid">
              <div><strong>Address</strong><br/><span style={{color:'var(--gray-600)',fontSize:13}}>{selectedBiz.address}</span></div>
              {selectedBiz.phone && <div><strong>Phone</strong><br/><a href={`tel:${selectedBiz.phone}`} style={{color:'#1B4FA3',fontSize:13}}>{selectedBiz.phone}</a></div>}
              {selectedBiz.ownership && <div><strong>Ownership</strong><br/><span style={{color:'var(--gray-600)',fontSize:13}}>{selectedBiz.ownership}</span></div>}
            </div>
            {selectedBiz.notes && (
              <div style={{background:'#f0f7ff',borderRadius:10,padding:'12px 16px',borderLeft:'4px solid #1B4FA3'}}>
                <div style={{fontWeight:700,fontSize:12,color:'#1B4FA3',marginBottom:4}}>YOUNG LIFE NOTES</div>
                <p style={{fontSize:13,lineHeight:1.6,color:'var(--gray-700)',margin:0}}>{selectedBiz.notes}</p>
              </div>
            )}
            <div className="modal-actions">
              <button className="btn-secondary" onClick={()=>setSelectedBiz(null)}>Close</button>
              {selectedBiz.website && <button className="btn-primary" onClick={()=>window.open(selectedBiz.website,'_blank')}>Visit Website →</button>}
            </div>
          </div>
        </Modal>
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
        <Modal open title="Young Life Home Office" onClose={() => { setOrgModal(false); setOrgEditDraft(null) }} size="md">
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            {orgEditDraft ? (
              <>
                {[['name','Organization Name'],['role','Role Description'],['location','Location'],['phone','Phone'],['website','Website']].map(([k,label])=>(
                  <div key={k}>
                    <div style={{fontSize:12,fontWeight:700,color:'var(--gray-500)',marginBottom:4}}>{label}</div>
                    <input className="settings-input" style={{width:'100%',boxSizing:'border-box'}} value={orgEditDraft[k]||''} onChange={e=>setOrgEditDraft(d=>({...d,[k]:e.target.value}))} />
                  </div>
                ))}
                <div className="modal-actions">
                  <button className="btn-secondary" onClick={()=>setOrgEditDraft(null)}>Cancel</button>
                  <button className="btn-primary" onClick={()=>{ setOrgData(d=>({...d,homeOffice:{...d.homeOffice,...orgEditDraft}})); setOrgEditDraft(null) }}>Save Changes</button>
                </div>
              </>
            ) : (
              <>
                <p style={{fontSize:14,lineHeight:1.7,color:'var(--gray-700)'}}>Young Life is an international Christian organization serving middle school, high school, and college students in over 100 countries. Founded in 1941 by Jim Rayburn.</p>
                <div className="camp-detail-grid">
                  <div><strong>Location:</strong><br/><span style={{color:'var(--gray-600)'}}>{orgData.homeOffice.location}</span></div>
                  <div><strong>Phone:</strong><br/><a href={`tel:${orgData.homeOffice.phone}`} style={{color:'#1B4FA3'}}>{orgData.homeOffice.phone}</a></div>
                </div>
                <div className="modal-actions">
                  <button className="btn-secondary" onClick={() => setOrgModal(false)}>Close</button>
                  <button className="btn-secondary" onClick={()=>setOrgEditDraft({...orgData.homeOffice})}>Edit</button>
                  <button className="btn-primary" onClick={() => window.open(orgData.homeOffice.website,'_blank')}>younglife.org →</button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
      {orgModal === 'regional' && (
        <Modal open title="Regional Director — West Texas" onClose={() => { setOrgModal(false); setOrgEditDraft(null) }} size="md">
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            {orgEditDraft ? (
              <>
                {[['name','Name'],['role','Role'],['region','Region']].map(([k,label])=>(
                  <div key={k}>
                    <div style={{fontSize:12,fontWeight:700,color:'var(--gray-500)',marginBottom:4}}>{label}</div>
                    <input className="settings-input" style={{width:'100%',boxSizing:'border-box'}} value={orgEditDraft[k]||''} onChange={e=>setOrgEditDraft(d=>({...d,[k]:e.target.value}))} />
                  </div>
                ))}
                <div className="modal-actions">
                  <button className="btn-secondary" onClick={()=>setOrgEditDraft(null)}>Cancel</button>
                  <button className="btn-primary" onClick={()=>{ setOrgData(d=>({...d,regional:{...d.regional,...orgEditDraft}})); setOrgEditDraft(null) }}>Save Changes</button>
                </div>
              </>
            ) : (
              <>
                <div className="org-detail-row"><span className="org-detail-label">Name</span><span>{orgData.regional.name}</span></div>
                <div className="org-detail-row"><span className="org-detail-label">Role</span><span>{orgData.regional.role}</span></div>
                <div className="org-detail-row"><span className="org-detail-label">Region</span><span>{orgData.regional.region}</span></div>
                <div className="modal-actions">
                  <button className="btn-secondary" onClick={() => setOrgModal(false)}>Close</button>
                  <button className="btn-primary" onClick={()=>setOrgEditDraft({...orgData.regional})}>Edit</button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
      {orgModal === 'area' && (
        <Modal open title={`Area Director — ${directorName}`} onClose={() => { setOrgModal(false); setOrgEditDraft(null) }} size="md">
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            {orgEditDraft ? (
              <>
                {[['name','Name'],['role','Role'],['area','Area']].map(([k,label])=>(
                  <div key={k}>
                    <div style={{fontSize:12,fontWeight:700,color:'var(--gray-500)',marginBottom:4}}>{label}</div>
                    <input className="settings-input" style={{width:'100%',boxSizing:'border-box'}} value={orgEditDraft[k]||''} onChange={e=>setOrgEditDraft(d=>({...d,[k]:e.target.value}))} />
                  </div>
                ))}
                <div className="modal-actions">
                  <button className="btn-secondary" onClick={()=>setOrgEditDraft(null)}>Cancel</button>
                  <button className="btn-primary" onClick={()=>{ setOrgData(d=>({...d,area:{...d.area,...orgEditDraft}})); setOrgEditDraft(null) }}>Save Changes</button>
                </div>
              </>
            ) : (
              <>
                <div className="org-detail-row"><span className="org-detail-label">Name</span><span>{orgData.area.name}</span></div>
                <div className="org-detail-row"><span className="org-detail-label">Role</span><span>{orgData.area.role}</span></div>
                <div className="org-detail-row"><span className="org-detail-label">Area</span><span>{orgData.area.area}</span></div>
                <div className="org-detail-row"><span className="org-detail-label">Programs</span><span>YoungLife (HS) + WyldLife (MS)</span></div>
                <div className="modal-actions">
                  <button className="btn-secondary" onClick={() => setOrgModal(false)}>Close</button>
                  <button className="btn-primary" onClick={()=>setOrgEditDraft({...orgData.area})}>Edit</button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
      {orgModal === 'groupleaders' && (
        <Modal open title="Group Leader Teams" onClose={() => { setOrgModal(false); setOrgEditDraft(null) }} size="md">
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <p style={{fontSize:14,color:'var(--gray-600)'}}>Volunteer group leaders run weekly club nights, Campaigners, and provide relational ministry to students.</p>
            {orgData.groupLeaders.map((g,i) => (
              <div key={i} style={{display:'flex',gap:8,alignItems:'center',padding:'8px 0',borderBottom:'1px solid var(--gray-100)'}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700}}>{g.program}</div>
                  <div style={{fontSize:12,color:'var(--gray-500)'}}>{g.role}</div>
                </div>
                <input type="number" min="0" max="99"
                  style={{width:60,padding:'4px 8px',border:'1.5px solid var(--gray-200)',borderRadius:6,fontSize:13,textAlign:'center'}}
                  value={g.count}
                  onChange={e=>setOrgData(d=>({...d,groupLeaders:d.groupLeaders.map((gl,j)=>j===i?{...gl,count:parseInt(e.target.value)||0}:gl)}))}
                />
                <span style={{fontSize:12,color:'var(--gray-500)'}}>leaders</span>
              </div>
            ))}
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setOrgModal(false)}>Close</button>
            </div>
          </div>
        </Modal>
      )}
      {orgModal === 'studentleaders' && (
        <Modal open title="Student Leaders in Training" onClose={() => { setOrgModal(false); setOrgEditDraft(null) }} size="md">
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <p style={{fontSize:14,color:'var(--gray-600)'}}>Campaigner student leaders are trained to bring their friends to Young Life and take ownership of the ministry on their campuses.</p>
            {orgData.studentLeaders.map((s,i) => (
              <div key={i} style={{display:'flex',gap:8,alignItems:'center',padding:'8px 0',borderBottom:'1px solid var(--gray-100)'}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700}}>{s.program}</div>
                  <div style={{fontSize:12,color:'var(--gray-500)'}}>{s.role}</div>
                </div>
                <input type="number" min="0" max="99"
                  style={{width:60,padding:'4px 8px',border:'1.5px solid var(--gray-200)',borderRadius:6,fontSize:13,textAlign:'center'}}
                  value={s.count}
                  onChange={e=>setOrgData(d=>({...d,studentLeaders:d.studentLeaders.map((sl,j)=>j===i?{...sl,count:parseInt(e.target.value)||0}:sl)}))}
                />
                <span style={{fontSize:12,color:'var(--gray-500)'}}>students</span>
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
