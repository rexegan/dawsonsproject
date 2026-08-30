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

export default function Prayer({ store }) {
  const { addNotification } = store

  // Local state — persisted to localStorage
  const [requests, setRequests] = useState(() => {
    try { const v = localStorage.getItem('yl_prayer'); return v ? JSON.parse(v) : [] } catch { return [] }
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
    save([newR, ...requests])
    setDraft(BLANK)
    setAddOpen(false)
    addNotification('Prayer request added 🙏')
  }

  function updateRequest(id, patch) {
    save(requests.map(r => r.id === id ? { ...r, ...patch } : r))
  }

  function deleteRequest(id) {
    save(requests.filter(r => r.id !== id))
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
    save(requests.map(r => r.id === editDraft.id ? { ...editDraft } : r))
    if (viewReq?.id === editDraft.id) setViewReq(editDraft)
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
        <div className="prayer-stat prayer-stat--blue">
          <div className="prayer-stat-val">{totalActive}</div>
          <div className="prayer-stat-label">Active Requests</div>
        </div>
        <div className="prayer-stat prayer-stat--amber">
          <div className="prayer-stat-val">{followUpNeeded}</div>
          <div className="prayer-stat-label">Follow-Up Needed</div>
        </div>
        <div className="prayer-stat prayer-stat--green">
          <div className="prayer-stat-val">{answeredCount}</div>
          <div className="prayer-stat-label">Answered Prayers</div>
        </div>
        <div className="prayer-stat prayer-stat--purple">
          <div className="prayer-stat-val">{recentAnswered}</div>
          <div className="prayer-stat-label">Answered This Month</div>
        </div>
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
      <Modal open={addOpen} title="Add Prayer Request" onClose={() => setAddOpen(false)} size="md">
        <div className="modal-body prayer-form">
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
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setAddOpen(false)}>Cancel</button>
          <button className="btn-primary" onClick={addRequest} disabled={!draft.request.trim()}>Add Request</button>
        </div>
      </Modal>

      {/* ── View / Detail Modal ── */}
      {viewReq && (
        <Modal open title="Prayer Request" onClose={() => setViewReq(null)} size="lg">
          <div className="modal-body">
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
          <div className="modal-footer">
            <button className="btn btn-secondary btn-danger" onClick={() => { if(window.confirm('Delete this prayer request?')) deleteRequest(viewReq.id) }}>Delete</button>
            <button className="btn btn-secondary" onClick={() => setViewReq(null)}>Close</button>
          </div>
        </Modal>
      )}

      {/* ── Edit Modal ── */}
      {editOpen && editDraft && (
        <Modal open title="Edit Prayer Request" onClose={() => { setEditOpen(false); setEditDraft(null) }} size="md">
          <div className="modal-body prayer-form">
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
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => { setEditOpen(false); setEditDraft(null) }}>Cancel</button>
            <button className="btn-primary" onClick={saveEdit}>Save Changes</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
