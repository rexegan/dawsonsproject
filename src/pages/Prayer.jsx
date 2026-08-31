import { useState, useMemo } from 'react'
import Modal from '../components/Modal'
import './Prayer.css'

const CATEGORIES = ['Student', 'Leader', 'Family', 'Area / Ministry', 'School', 'Camp', 'Personal', 'Other']
const STATUS_OPTS = ['Active', 'Follow-Up Needed', 'Answered', 'On Hold']

const STATUS_COLOR = {
  'Active':            '#1B4FA3',
  'Follow-Up Needed':  '#d97706',
  'Answered':          '#3AAB35',
  'On Hold':           '#854883',
}
const STATUS_BG = {
  'Active':            '#eff6ff',
  'Follow-Up Needed':  '#fffbeb',
  'Answered':          '#f0fdf4',
  'On Hold':           '#faf5ff',
}

function fmtDate(iso) {
  if (!iso) return ''
  const [y,m,d] = iso.split('-').map(Number)
  const mons = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${mons[m-1]} ${d}, ${y}`
}

const BLANK = {
  name: '', category: 'Student', status: 'Active', request: '',
  person: '', date: '', private: false, followUps: [],
}

const SEED_REQUESTS = [
  { id:'pr001', name:'Emma Thornton', category:'Student', status:'Active', request:'Please pray for Emma as she navigates a difficult friendship situation at school. She feels isolated and is struggling to trust people again.', person:'Emma Thornton', date:'2026-08-15', private:false, followUps:[{id:'fu001',text:'Checked in with Emma — she said things are improving slowly.',date:'2026-08-22'}] },
  { id:'pr002', name:'Jake Morales', category:'Student', status:'Follow-Up Needed', request:'Jake\'s parents are going through a divorce. He\'s been withdrawing from club and from his small group. Pray for peace in his home and that he feels known and loved.', person:'Jake Morales', date:'2026-08-10', private:false, followUps:[] },
  { id:'pr003', name:'Lily Nakamura', category:'Student', status:'Active', request:'Pray for Lily who is dealing with anxiety around college applications. She\'s a senior and feeling a lot of pressure from family expectations.', person:'Lily Nakamura', date:'2026-08-20', private:false, followUps:[{id:'fu002',text:'Had coffee with Lily. She felt heard. Encouraged her to keep coming to Campaigners.',date:'2026-08-25'}] },
  { id:'pr004', name:'Marcus Williams', category:'Student', status:'Answered', request:'Marcus was searching spiritually and had a lot of hard questions about faith. Leaders have been meeting with him for months.', person:'Marcus Williams', date:'2026-06-01', private:false, answeredDate:'2026-08-05', followUps:[{id:'fu003',text:'Marcus committed his life to Christ at Frontier Ranch! Incredible week.',date:'2026-08-05'}] },
  { id:'pr005', name:'Sophia Chen', category:'Student', status:'Active', request:'Sophia lost her grandmother last week and is grieving deeply. Please pray for her and her family during this time of loss.', person:'Sophia Chen', date:'2026-08-28', private:false, followUps:[] },
  { id:'pr006', name:'Tyler Brooks', category:'Student', status:'Follow-Up Needed', request:'Tyler is struggling with a vaping addiction. His parents reached out to us. Pray for freedom and that he would be surrounded by good community.', person:'Tyler Brooks', date:'2026-08-01', private:false, followUps:[{id:'fu004',text:'Met with Tyler and his dad. He opened up for the first time. Progress!',date:'2026-08-18'}] },
  { id:'pr007', name:'Aiden Park', category:'Student', status:'Active', request:'Pray for Aiden who just moved here from another state. He doesn\'t know anyone yet and finding his place in a new school has been hard.', person:'Aiden Park', date:'2026-08-26', private:false, followUps:[] },
  { id:'pr008', name:'Hannah Reeves', category:'Student', status:'Answered', request:'Hannah was not interested in faith at all — kept coming to club for the fun. We prayed she would become curious about Jesus.', person:'Hannah Reeves', date:'2026-05-15', private:false, answeredDate:'2026-08-12', followUps:[{id:'fu005',text:'Hannah asked a leader to explain the gospel after club. God is working!',date:'2026-08-12'}] },
  { id:'pr009', name:'Ryan Castillo', category:'Leader', status:'Active', request:'Ryan is taking on more leadership responsibility this fall. Pray for wisdom, confidence, and that he would lead from a place of grace and not performance.', person:'Ryan Castillo', date:'2026-08-17', private:false, followUps:[] },
  { id:'pr010', name:'Ashley Moore', category:'Leader', status:'Follow-Up Needed', request:'Ashley is burning out. She\'s been pouring into kids all summer and needs rest and encouragement. Pray she stays connected to her own faith.', person:'Ashley Moore', date:'2026-08-14', private:false, followUps:[{id:'fu006',text:'Took Ashley to lunch and heard her heart. She appreciated it. Need to keep checking in.',date:'2026-08-21'}] },
  { id:'pr011', name:'Coach Davis', category:'Leader', status:'Active', request:'Coach Davis just became a volunteer leader after years of coaching at Cleburne High. Pray for his transition into youth ministry.', person:'Davis (Coach)', date:'2026-08-24', private:false, followUps:[] },
  { id:'pr012', name:'Upcoming Banquet', category:'Area / Ministry', status:'Active', request:'Pray for the fall fundraising banquet — that hearts would be moved to give, the message would be clear, and that new donors would connect with the mission.', person:'', date:'2026-08-19', private:false, followUps:[] },
  { id:'pr013', name:'Fall Club Launch', category:'Area / Ministry', status:'Active', request:'Pray for the first club night of the fall semester. We\'re expecting a large crowd and want kids to feel welcomed and the Spirit to move.', person:'', date:'2026-08-22', private:false, followUps:[{id:'fu007',text:'62 kids showed up! Great energy. Three asked questions about faith afterward.',date:'2026-08-29'}] },
  { id:'pr014', name:'Campaigners Growth', category:'Area / Ministry', status:'Follow-Up Needed', request:'We want to double our Campaigners attendance this fall. Pray for leaders with capacity and for students who are hungry to go deeper.', person:'', date:'2026-08-08', private:false, followUps:[] },
  { id:'pr015', name:'Cleburne High School', category:'School', status:'Active', request:'Pray for an open door at Cleburne High — specifically for lunchroom access and permission to table at events.', person:'', date:'2026-08-11', private:false, followUps:[{id:'fu008',text:'Principal Hartley agreed to a meeting next week!',date:'2026-08-26'}] },
  { id:'pr016', name:'Joshua Middle School', category:'School', status:'Active', request:'Several WyldLife kids at Joshua Middle are facing bullying. Pray for a culture shift and that our leaders would be a consistent presence.', person:'', date:'2026-08-16', private:false, followUps:[] },
  { id:'pr017', name:'Frontier Ranch Prep', category:'Camp', status:'Answered', request:'Prayed for 15 kids to sign up for Frontier Ranch before the deadline. We barely had 8 at the time.', person:'', date:'2026-07-01', private:false, answeredDate:'2026-07-28', followUps:[{id:'fu009',text:'God provided! We sent 17 kids! Three made first-time commitments at camp.',date:'2026-07-28'}] },
  { id:'pr018', name:'Fall Camp Planning', category:'Camp', status:'Planning', request:'Pray for wisdom in choosing the right camp for WyldLife kids this fall. Trying to decide between Crooked Creek and Lake Champion.', person:'', date:'2026-08-23', private:false, followUps:[] },
  { id:'pr019', name:'Financial Need', category:'Personal', status:'Active', request:'One of our key leaders is facing unexpected medical bills and is stressed. Pray for peace and provision — privately.', person:'', date:'2026-08-18', private:true, followUps:[] },
  { id:'pr020', name:'Daniel Ortiz', category:'Family', status:'Active', request:'Daniel\'s older brother was recently incarcerated. The family is devastated and Daniel is carrying the weight of it at school. Pray for the whole Ortiz family.', person:'Daniel Ortiz', date:'2026-08-27', private:false, followUps:[] },
  { id:'pr021', name:'Nguyen Family', category:'Family', status:'Answered', request:'The Nguyen family lost their job and home earlier this summer. We\'ve been praying for stability and provision.', person:'', date:'2026-06-20', private:false, answeredDate:'2026-08-10', followUps:[{id:'fu010',text:'Mr. Nguyen got a job offer! Family moving into new apartment next week. Praise God!',date:'2026-08-10'}] },
  { id:'pr022', name:'Outreach Prep', category:'Other', status:'Active', request:'We\'re partnering with local churches for a back-to-school outreach at the park. Pray for volunteers, weather, and kids who show up open to connection.', person:'', date:'2026-08-29', private:false, followUps:[] },
]

export default function Prayer({ store }) {
  const { addNotification } = store

  // Local state — persisted to localStorage
  const [requests, setRequests] = useState(() => {
    try { const v = localStorage.getItem('yl_prayer'); return v ? JSON.parse(v) : SEED_REQUESTS } catch { return SEED_REQUESTS }
  })

  function save(list) {
    setRequests(list)
    try { localStorage.setItem('yl_prayer', JSON.stringify(list)) } catch {}
  }

  const [filterStatus, setFilterStatus]     = useState('All')
  const [filterCat,    setFilterCat]        = useState('All')
  const [search,       setSearch]           = useState('')
  const [collapsed,    setCollapsed]        = useState({}) // category -> bool
  const [addOpen,      setAddOpen]          = useState(false)
  const [draft,        setDraft]            = useState(BLANK)
  const [viewReq,      setViewReq]          = useState(null)
  const [fuText,       setFuText]           = useState('')
  const [editOpen,     setEditOpen]         = useState(false)
  const [editDraft,    setEditDraft]        = useState(null)
  const [activeTab,    setActiveTab]        = useState('all') // all | answered | board

  const today = new Date().toISOString().slice(0,10)

  // ── CRUD ────────────────────────────────────────────────────────────────
  function addRequest() {
    if (!draft.request.trim()) return
    const newR = { ...draft, id: 'pr' + Date.now(), date: today, followUps: [] }
    setRequests(prev => {
      const list = [newR, ...prev]
      try { localStorage.setItem('yl_prayer', JSON.stringify(list)) } catch {}
      return list
    })
    setDraft(BLANK)
    setAddOpen(false)
    addNotification('Prayer request added 🙏')
  }

  function updateRequest(id, patch) {
    setRequests(prev => {
      const list = prev.map(r => r.id === id ? { ...r, ...patch } : r)
      try { localStorage.setItem('yl_prayer', JSON.stringify(list)) } catch {}
      return list
    })
  }

  function deleteRequest(id) {
    setRequests(prev => {
      const list = prev.filter(r => r.id !== id)
      try { localStorage.setItem('yl_prayer', JSON.stringify(list)) } catch {}
      return list
    })
    setViewReq(null)
    addNotification('Request removed')
  }

  function addFollowUp(req) {
    if (!fuText.trim()) return
    const fu = { id: 'fu' + Date.now(), text: fuText.trim(), date: today }
    updateRequest(req.id, { followUps: [...(req.followUps || []), fu] })
    setViewReq(r => ({ ...r, followUps: [...(r.followUps || []), fu] }))
    setFuText('')
    addNotification('Follow-up added')
  }

  function markAnswered(id) {
    updateRequest(id, { status: 'Answered', answeredDate: today })
    if (viewReq?.id === id) setViewReq(r => ({ ...r, status: 'Answered', answeredDate: today }))
    addNotification('Marked as answered! 🎉')
  }

  function saveEdit() {
    if (!editDraft.request.trim()) return
    const updated = { ...editDraft }
    setRequests(prev => {
      const list = prev.map(r => r.id === updated.id ? updated : r)
      try { localStorage.setItem('yl_prayer', JSON.stringify(list)) } catch {}
      return list
    })
    if (viewReq?.id === updated.id) setViewReq(updated)
    setEditOpen(false)
    setEditDraft(null)
    addNotification('Request updated')
  }

  // ── Filtered lists ───────────────────────────────────────────────────────
  const active   = useMemo(() => requests.filter(r => r.status !== 'Answered'), [requests])
  const answered = useMemo(() => requests.filter(r => r.status === 'Answered'), [requests])

  const filtered = useMemo(() => {
    return (activeTab === 'answered' ? answered : active).filter(r => {
      const matchS = filterStatus === 'All' || r.status === filterStatus
      const matchC = filterCat === 'All' || r.category === filterCat
      const matchQ = search === '' ||
        r.request.toLowerCase().includes(search.toLowerCase()) ||
        (r.name||'').toLowerCase().includes(search.toLowerCase()) ||
        (r.person||'').toLowerCase().includes(search.toLowerCase())
      return matchS && matchC && matchQ
    })
  }, [requests, activeTab, answered, active, filterStatus, filterCat, search])

  // Group by category
  const grouped = useMemo(() => {
    const groups = {}
    CATEGORIES.forEach(c => { groups[c] = [] })
    filtered.forEach(r => {
      if (!groups[r.category]) groups[r.category] = []
      groups[r.category].push(r)
    })
    return groups
  }, [filtered])

  const nonEmpty = CATEGORIES.filter(c => grouped[c]?.length > 0)

  function toggleCollapse(cat) {
    setCollapsed(prev => ({ ...prev, [cat]: !prev[cat] }))
  }

  // Stats
  const totalActive          = active.length
  const followUpNeeded       = active.filter(r => r.status === 'Follow-Up Needed').length
  const answeredCount        = answered.length
  const recentAnswered       = answered.filter(r => {
    if (!r.answeredDate) return false
    const d = new Date(r.answeredDate)
    return (new Date() - d) < 30 * 86400000
  }).length

  return (
    <div className="prayer-page">

      {/* Stats row */}
      <div className="prayer-stats">
        <button className="prayer-stat prayer-stat--blue prayer-stat--clickable" onClick={() => { setActiveTab('all'); setFilterStatus('All') }}>
          <div className="prayer-stat-val">{totalActive}</div>
          <div className="prayer-stat-label">Active Requests</div>
        </button>
        <button className="prayer-stat prayer-stat--amber prayer-stat--clickable" onClick={() => { setActiveTab('all'); setFilterStatus('Follow-Up Needed') }}>
          <div className="prayer-stat-val">{followUpNeeded}</div>
          <div className="prayer-stat-label">Follow-Up Needed</div>
        </button>
        <button className="prayer-stat prayer-stat--green prayer-stat--clickable" onClick={() => { setActiveTab('answered'); setFilterStatus('All') }}>
          <div className="prayer-stat-val">{answeredCount}</div>
          <div className="prayer-stat-label">Answered Prayers</div>
        </button>
        <button className="prayer-stat prayer-stat--purple prayer-stat--clickable" onClick={() => { setActiveTab('answered'); setFilterStatus('All') }}>
          <div className="prayer-stat-val">{recentAnswered}</div>
          <div className="prayer-stat-label">Answered This Month</div>
        </button>
      </div>

      {/* Tab bar + Add button */}
      <div className="prayer-topbar">
        <div className="prayer-tabs">
          <button className={`prayer-tab ${activeTab==='all'?'prayer-tab--active':''}`} onClick={()=>setActiveTab('all')}>
            🙏 Active Requests <span className="prayer-tab-badge">{totalActive}</span>
          </button>
          <button className={`prayer-tab prayer-tab--green ${activeTab==='answered'?'prayer-tab--green-active':''}`} onClick={()=>setActiveTab('answered')}>
            🎉 Answered <span className="prayer-tab-badge prayer-tab-badge--green">{answeredCount}</span>
          </button>
        </div>
        <button className="btn-primary" onClick={() => { setDraft({ ...BLANK, date: today }); setAddOpen(true) }}>
          + Add Request
        </button>
      </div>

      {/* Filters */}
      <div className="prayer-filters">
        <input
          className="prayer-search"
          placeholder="Search requests…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {activeTab === 'all' && (
          <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="All">All Statuses</option>
            {STATUS_OPTS.filter(s => s !== 'Answered').map(s => <option key={s}>{s}</option>)}
          </select>
        )}
        <select className="filter-select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          <option value="All">All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Request groups */}
      <div className="prayer-groups">
        {filtered.length === 0 && (
          <div className="prayer-empty">
            <div style={{fontSize:48,marginBottom:12}}>🙏</div>
            <div style={{fontWeight:700,fontSize:16,color:'var(--gray-700)'}}>No prayer requests yet</div>
            <div style={{fontSize:14,color:'var(--gray-500)',marginTop:6}}>Click "Add Request" to get started</div>
          </div>
        )}

        {nonEmpty.map(cat => (
          <div key={cat} className="prayer-group">
            <button className="prayer-group-header" onClick={() => toggleCollapse(cat)}>
              <div className="prayer-group-title">
                <span className="prayer-group-arrow">{collapsed[cat] ? '▶' : '▼'}</span>
                {cat}
                <span className="prayer-group-count">{grouped[cat].length}</span>
              </div>
            </button>

            {!collapsed[cat] && (
              <div className="prayer-group-body">
                {grouped[cat].map(r => (
                  <button
                    key={r.id}
                    className="prayer-card"
                    onClick={() => { setViewReq(r); setFuText('') }}
                  >
                    <div className="prayer-card-top">
                      <div className="prayer-card-info">
                        {r.name && <div className="prayer-card-name">{r.name}</div>}
                        {r.person && <div className="prayer-card-person">For: {r.person}</div>}
                        <div className="prayer-card-text">{r.request}</div>
                      </div>
                      <div className="prayer-card-right">
                        <span
                          className="prayer-status-badge"
                          style={{background: STATUS_BG[r.status], color: STATUS_COLOR[r.status]}}
                        >{r.status}</span>
                        <div className="prayer-card-date">{fmtDate(r.date)}</div>
                        {r.followUps?.length > 0 && (
                          <div className="prayer-fu-count">💬 {r.followUps.length} update{r.followUps.length>1?'s':''}</div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Add Request Modal ── */}
      {addOpen && <Modal open title="Add Prayer Request" onClose={() => setAddOpen(false)} size="md"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setAddOpen(false)}>Cancel</button>
          <button className="btn-primary" onClick={addRequest} disabled={!draft.request.trim()}>Add Request</button>
        </>}
      >
        <div className="prayer-form">
          <div className="prayer-form-row">
            <label>Your Name <span style={{color:'var(--gray-400)',fontWeight:400}}>(optional)</span></label>
            <input className="form-input" placeholder="Who is submitting this?" value={draft.name} onChange={e => setDraft(d => ({...d, name: e.target.value}))} />
          </div>
          <div className="prayer-form-row">
            <label>Praying For <span style={{color:'var(--gray-400)',fontWeight:400}}>(optional)</span></label>
            <input className="form-input" placeholder="Student name, family, school…" value={draft.person} onChange={e => setDraft(d => ({...d, person: e.target.value}))} />
          </div>
          <div className="prayer-form-row">
            <label>Category</label>
            <select className="form-input" value={draft.category} onChange={e => setDraft(d => ({...d, category: e.target.value}))}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="prayer-form-row">
            <label>Status</label>
            <select className="form-input" value={draft.status} onChange={e => setDraft(d => ({...d, status: e.target.value}))}>
              {STATUS_OPTS.filter(s => s !== 'Answered').map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="prayer-form-row">
            <label>Prayer Request <span style={{color:'#dc2626'}}>*</span></label>
            <textarea
              className="form-input"
              rows={5}
              placeholder="Write the prayer request here…"
              value={draft.request}
              onChange={e => setDraft(d => ({...d, request: e.target.value}))}
            />
          </div>
          <div className="prayer-form-row" style={{flexDirection:'row',alignItems:'center',gap:10}}>
            <input type="checkbox" id="priv" checked={draft.private} onChange={e => setDraft(d => ({...d, private: e.target.checked}))} />
            <label htmlFor="priv" style={{margin:0,fontWeight:600,cursor:'pointer'}}>Mark as private (leaders only)</label>
          </div>
        </div>
      </Modal>}

      {/* ── View / Detail Modal ── */}
      {viewReq && (
        <Modal open title="Prayer Request" onClose={() => setViewReq(null)} size="lg"
          footer={<>
            <button className="btn btn-secondary btn-danger" onClick={() => { if(window.confirm('Delete this prayer request?')) deleteRequest(viewReq.id) }}>Delete</button>
            <button className="btn btn-secondary" onClick={() => setViewReq(null)}>Close</button>
          </>}
        >
          <div>
            <div className="prayer-detail-header">
              <div>
                {viewReq.name && <div className="prayer-detail-submitter">Submitted by: <strong>{viewReq.name}</strong></div>}
                {viewReq.person && <div className="prayer-detail-for">Praying for: <strong>{viewReq.person}</strong></div>}
                <div className="prayer-detail-meta">
                  <span
                    className="prayer-status-badge"
                    style={{background: STATUS_BG[viewReq.status], color: STATUS_COLOR[viewReq.status]}}
                  >{viewReq.status}</span>
                  <span className="prayer-detail-cat">{viewReq.category}</span>
                  <span style={{fontSize:12,color:'var(--gray-400)'}}>{fmtDate(viewReq.date)}</span>
                  {viewReq.private && <span className="prayer-private-badge">🔒 Private</span>}
                </div>
              </div>
              <div style={{display:'flex',gap:8,flexShrink:0}}>
                <button className="btn btn-secondary" style={{fontSize:12,padding:'6px 12px'}} onClick={() => { setEditDraft({...viewReq}); setEditOpen(true) }}>Edit</button>
                {viewReq.status !== 'Answered' && (
                  <button className="btn-primary" style={{fontSize:12,padding:'6px 14px',background:'#3AAB35'}} onClick={() => markAnswered(viewReq.id)}>✓ Mark Answered</button>
                )}
              </div>
            </div>

            <div className="prayer-detail-body">{viewReq.request}</div>

            {viewReq.status === 'Answered' && viewReq.answeredDate && (
              <div className="prayer-answered-banner">🎉 Answered on {fmtDate(viewReq.answeredDate)}</div>
            )}

            {/* Status quick-change */}
            <div className="prayer-detail-section">
              <div className="prayer-detail-section-label">Update Status</div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {STATUS_OPTS.map(s => (
                  <button
                    key={s}
                    className="prayer-status-btn"
                    style={{
                      background: viewReq.status===s ? STATUS_COLOR[s] : STATUS_BG[s],
                      color: viewReq.status===s ? 'white' : STATUS_COLOR[s],
                      borderColor: STATUS_COLOR[s],
                    }}
                    onClick={() => { updateRequest(viewReq.id, {status:s}); setViewReq(r => ({...r, status:s})) }}
                  >{s}</button>
                ))}
              </div>
            </div>

            {/* Follow-up timeline */}
            <div className="prayer-detail-section">
              <div className="prayer-detail-section-label">Follow-Up Updates ({viewReq.followUps?.length || 0})</div>
              {(!viewReq.followUps || viewReq.followUps.length === 0) && (
                <div style={{fontSize:13,color:'var(--gray-400)',padding:'8px 0'}}>No updates yet — add one below.</div>
              )}
              <div className="prayer-fu-list">
                {(viewReq.followUps || []).map((fu, i) => (
                  <div key={fu.id || i} className="prayer-fu-item">
                    <div className="prayer-fu-dot" />
                    <div className="prayer-fu-content">
                      <div className="prayer-fu-text">{fu.text}</div>
                      <div className="prayer-fu-date">{fmtDate(fu.date)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="prayer-fu-add">
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Add a follow-up update, answered prayer note, or new development…"
                  value={fuText}
                  onChange={e => setFuText(e.target.value)}
                />
                <button className="btn-primary" style={{alignSelf:'flex-end'}} onClick={() => addFollowUp(viewReq)} disabled={!fuText.trim()}>
                  Add Update
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Edit Modal ── */}
      {editOpen && editDraft && (
        <Modal open title="Edit Prayer Request" onClose={() => { setEditOpen(false); setEditDraft(null) }} size="md"
          footer={<>
            <button className="btn btn-secondary" onClick={() => { setEditOpen(false); setEditDraft(null) }}>Cancel</button>
            <button className="btn-primary" onClick={saveEdit}>Save Changes</button>
          </>}
        >
          <div className="prayer-form">
            <div className="prayer-form-row">
              <label>Your Name</label>
              <input className="form-input" value={editDraft.name} onChange={e => setEditDraft(d => ({...d, name: e.target.value}))} />
            </div>
            <div className="prayer-form-row">
              <label>Praying For</label>
              <input className="form-input" value={editDraft.person} onChange={e => setEditDraft(d => ({...d, person: e.target.value}))} />
            </div>
            <div className="prayer-form-row">
              <label>Category</label>
              <select className="form-input" value={editDraft.category} onChange={e => setEditDraft(d => ({...d, category: e.target.value}))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="prayer-form-row">
              <label>Status</label>
              <select className="form-input" value={editDraft.status} onChange={e => setEditDraft(d => ({...d, status: e.target.value}))}>
                {STATUS_OPTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="prayer-form-row">
              <label>Prayer Request</label>
              <textarea className="form-input" rows={5} value={editDraft.request} onChange={e => setEditDraft(d => ({...d, request: e.target.value}))} />
            </div>
            <div className="prayer-form-row" style={{flexDirection:'row',alignItems:'center',gap:10}}>
              <input type="checkbox" id="editpriv" checked={editDraft.private} onChange={e => setEditDraft(d => ({...d, private: e.target.checked}))} />
              <label htmlFor="editpriv" style={{margin:0,fontWeight:600,cursor:'pointer'}}>Private (leaders only)</label>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
