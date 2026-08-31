import { useState, useMemo } from 'react'
import Modal from '../components/Modal'
import './Planning.css'

const CATEGORIES = [
  { id: 'event',       label: 'Event',          color: '#1B4FA3', bg: '#eff6ff', icon: '📅' },
  { id: 'auction',     label: 'Auction Items',  color: '#d97706', bg: '#fffbeb', icon: '🏷️' },
  { id: 'doorprize',   label: 'Door Prizes',    color: '#854883', bg: '#faf5ff', icon: '🎁' },
  { id: 'decorations', label: 'Decorations',    color: '#e11d48', bg: '#fff1f2', icon: '🎨' },
  { id: 'food',        label: 'Food',           color: '#3AAB35', bg: '#f0fdf4', icon: '🍽️' },
  { id: 'location',    label: 'Location',       color: '#0891b2', bg: '#ecfeff', icon: '📍' },
  { id: 'supplies',    label: 'Supplies',       color: '#7c3aed', bg: '#f5f3ff', icon: '🛒' },
  { id: 'camp',        label: 'Camp',           color: '#f97316', bg: '#fff7ed', icon: '⛺' },
  { id: 'outreach',    label: 'Outreach',       color: '#0f766e', bg: '#f0fdfa', icon: '🎯' },
  { id: 'admin',       label: 'Admin',          color: '#6b7280', bg: '#f9fafb', icon: '📋' },
  { id: 'other',       label: 'Other',          color: '#64748b', bg: '#f8fafc', icon: '💡' },
]

const STATUSES = [
  { id: 'idea',       label: 'Idea',        color: '#6b7280', bg: '#f3f4f6' },
  { id: 'planning',   label: 'Planning',    color: '#d97706', bg: '#fffbeb' },
  { id: 'active',     label: 'In Progress', color: '#1B4FA3', bg: '#eff6ff' },
  { id: 'complete',   label: 'Complete',    color: '#3AAB35', bg: '#f0fdf4' },
  { id: 'on-hold',    label: 'On Hold',     color: '#854883', bg: '#faf5ff' },
]

const PRIORITIES = ['High', 'Medium', 'Low']

const PRIORITY_COLOR = { High: '#dc2626', Medium: '#d97706', Low: '#3AAB35' }
const PRIORITY_BG    = { High: '#fee2e2', Medium: '#fffbeb', Low: '#f0fdf4' }

const BLANK = {
  title: '', category: 'event', status: 'planning', priority: 'Medium',
  date: '', notes: '', assignedTo: '', checklist: [],
}

function fmtDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  const mons = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${mons[m-1]} ${d}, ${y}`
}

function daysUntil(iso) {
  if (!iso) return null
  const diff = Math.ceil((new Date(iso) - new Date()) / 86400000)
  return diff
}

function load() {
  try { const v = localStorage.getItem('yl_planning'); return v ? JSON.parse(v) : [] } catch { return [] }
}

function persist(list) {
  try { localStorage.setItem('yl_planning', JSON.stringify(list)) } catch {}
}

export default function Planning({ store }) {
  const { addNotification } = store

  const [items, setItems] = useState(load)
  const [view, setView] = useState('list') // list | timeline
  const [filterCat, setFilterCat] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [search, setSearch] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [draft, setDraft] = useState(BLANK)
  const [viewItem, setViewItem] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
  const [editDraft, setEditDraft] = useState(null)
  const [newTask, setNewTask] = useState('')

  const today = new Date().toISOString().slice(0, 10)

  function mutate(fn) {
    setItems(prev => { const next = fn(prev); persist(next); return next })
  }

  function addItem() {
    if (!draft.title.trim()) return
    const item = { ...draft, id: 'pl' + Date.now(), created: today, checklist: draft.checklist || [] }
    mutate(prev => [item, ...prev])
    setDraft(BLANK)
    setAddOpen(false)
    addNotification('Planning item added')
  }

  function saveEdit() {
    if (!editDraft.title.trim()) return
    const updated = { ...editDraft }
    mutate(prev => prev.map(i => i.id === updated.id ? updated : i))
    if (viewItem?.id === updated.id) setViewItem(updated)
    setEditOpen(false)
    setEditDraft(null)
    addNotification('Item updated')
  }

  function deleteItem(id) {
    mutate(prev => prev.filter(i => i.id !== id))
    setViewItem(null)
    addNotification('Item removed')
  }

  function updateStatus(id, status) {
    mutate(prev => prev.map(i => i.id === id ? { ...i, status } : i))
    setViewItem(v => v?.id === id ? { ...v, status } : v)
  }

  function addTask() {
    if (!newTask.trim() || !viewItem) return
    const task = { id: 'tk' + Date.now(), text: newTask.trim(), done: false }
    mutate(prev => prev.map(i => i.id === viewItem.id ? { ...i, checklist: [...(i.checklist||[]), task] } : i))
    setViewItem(v => ({ ...v, checklist: [...(v.checklist||[]), task] }))
    setNewTask('')
  }

  function toggleTask(itemId, taskId) {
    mutate(prev => prev.map(i => i.id === itemId
      ? { ...i, checklist: i.checklist.map(t => t.id === taskId ? { ...t, done: !t.done } : t) }
      : i
    ))
    setViewItem(v => v?.id === itemId
      ? { ...v, checklist: v.checklist.map(t => t.id === taskId ? { ...t, done: !t.done } : t) }
      : v
    )
  }

  function deleteTask(itemId, taskId) {
    mutate(prev => prev.map(i => i.id === itemId
      ? { ...i, checklist: i.checklist.filter(t => t.id !== taskId) }
      : i
    ))
    setViewItem(v => v?.id === itemId
      ? { ...v, checklist: v.checklist.filter(t => t.id !== taskId) }
      : v
    )
  }

  const catMap = Object.fromEntries(CATEGORIES.map(c => [c.id, c]))
  const statusMap = Object.fromEntries(STATUSES.map(s => [s.id, s]))

  const filtered = useMemo(() => items.filter(i => {
    if (filterCat !== 'All' && i.category !== filterCat) return false
    if (filterStatus !== 'All' && i.status !== filterStatus) return false
    if (search && !i.title.toLowerCase().includes(search.toLowerCase()) &&
        !(i.notes||'').toLowerCase().includes(search.toLowerCase())) return false
    return true
  }), [items, filterCat, filterStatus, search])

  // Stats
  const total    = items.length
  const active   = items.filter(i => i.status === 'active').length
  const complete = items.filter(i => i.status === 'complete').length
  const upcoming = items.filter(i => i.date && daysUntil(i.date) !== null && daysUntil(i.date) >= 0 && daysUntil(i.date) <= 30).length

  // Timeline: sorted by date
  const timeline = [...filtered].filter(i => i.date).sort((a, b) => a.date.localeCompare(b.date))
  const noDate   = filtered.filter(i => !i.date)

  return (
    <div className="planning-page">

      {/* Stats */}
      <div className="planning-stats">
        <div className="planning-stat planning-stat--blue">
          <div className="planning-stat-val">{total}</div>
          <div className="planning-stat-label">Total Items</div>
        </div>
        <div className="planning-stat planning-stat--amber">
          <div className="planning-stat-val">{active}</div>
          <div className="planning-stat-label">In Progress</div>
        </div>
        <div className="planning-stat planning-stat--green">
          <div className="planning-stat-val">{complete}</div>
          <div className="planning-stat-label">Completed</div>
        </div>
        <div className="planning-stat planning-stat--purple">
          <div className="planning-stat-val">{upcoming}</div>
          <div className="planning-stat-label">Due in 30 Days</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="planning-toolbar">
        <div className="planning-toolbar-left">
          <input className="planning-search" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
          <select className="filter-select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
          </select>
          <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="All">All Statuses</option>
            {STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
        <div className="planning-toolbar-right">
          <div className="planning-view-toggle">
            {['list','timeline'].map(v => (
              <button key={v} className={`planning-view-btn ${view===v?'planning-view-btn--active':''}`} onClick={() => setView(v)}>
                {v === 'list' ? '≡ List' : '📅 Timeline'}
              </button>
            ))}
          </div>
          <button className="btn-primary" onClick={() => { setDraft({...BLANK, date: today}); setAddOpen(true) }}>
            + Add Item
          </button>
        </div>
      </div>

      {/* Category quick-filter pills */}
      <div className="planning-cats">
        <button className={`planning-cat-pill ${filterCat==='All'?'planning-cat-pill--active':''}`} onClick={() => setFilterCat('All')}>
          All
        </button>
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            className={`planning-cat-pill ${filterCat===c.id?'planning-cat-pill--active':''}`}
            style={filterCat===c.id ? {background: c.color, color:'white', borderColor: c.color} : {}}
            onClick={() => setFilterCat(filterCat===c.id ? 'All' : c.id)}
          >
            {c.icon} {c.label}
            <span className="planning-cat-count">{items.filter(i=>i.category===c.id).length}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="planning-empty">
          <div style={{fontSize:48,marginBottom:12}}>📋</div>
          <div style={{fontWeight:700,fontSize:16,color:'var(--gray-700)'}}>No planning items yet</div>
          <div style={{fontSize:14,color:'var(--gray-500)',marginTop:6}}>Click "+ Add Item" to start planning</div>
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {view === 'list' && filtered.length > 0 && (
        <div className="planning-list">
          {STATUSES.map(st => {
            const rows = filtered.filter(i => i.status === st.id)
            if (!rows.length) return null
            return (
              <div key={st.id} className="planning-list-group">
                <div className="planning-list-group-header" style={{color: st.color, borderLeftColor: st.color}}>
                  {st.label} <span className="planning-list-group-count">{rows.length}</span>
                </div>
                {rows.map(item => <PlanRow key={item.id} item={item} catMap={catMap} statusMap={statusMap} onClick={() => setViewItem(item)} />)}
              </div>
            )
          })}
        </div>
      )}

      {/* ── TIMELINE VIEW ── */}
      {view === 'timeline' && (
        <div className="planning-timeline">
          {timeline.map(item => {
            const cat = catMap[item.category] || {}
            const days = daysUntil(item.date)
            const st = statusMap[item.status] || {}
            return (
              <button key={item.id} className="planning-tl-row" onClick={() => setViewItem(item)}>
                <div className="planning-tl-date">
                  <div className="planning-tl-day">{item.date.slice(8)}</div>
                  <div className="planning-tl-mon">{fmtDate(item.date).slice(0,3)}</div>
                </div>
                <div className="planning-tl-dot" style={{background: cat.color}} />
                <div className="planning-tl-content">
                  <div className="planning-tl-title">{item.title}</div>
                  <div className="planning-tl-meta">
                    <span style={{color: cat.color, fontWeight:700, fontSize:12}}>{cat.icon} {cat.label}</span>
                    <span className="planning-status-badge" style={{background: st.bg, color: st.color}}>{st.label}</span>
                    {item.assignedTo && <span style={{fontSize:12,color:'var(--gray-500)'}}>👤 {item.assignedTo}</span>}
                  </div>
                </div>
                <div className="planning-tl-right">
                  {days !== null && days >= 0 && (
                    <span className={`planning-tl-days ${days <= 7 ? 'planning-tl-days--urgent' : ''}`}>
                      {days === 0 ? 'Today' : `${days}d`}
                    </span>
                  )}
                  {days !== null && days < 0 && <span className="planning-tl-days planning-tl-days--past">{Math.abs(days)}d ago</span>}
                  <span className={`planning-priority-badge`} style={{background: PRIORITY_BG[item.priority], color: PRIORITY_COLOR[item.priority]}}>
                    {item.priority}
                  </span>
                </div>
              </button>
            )
          })}
          {noDate.length > 0 && (
            <>
              <div className="planning-tl-nodatelabel">No Date Set</div>
              {noDate.map(item => {
                const cat = catMap[item.category] || {}
                const st = statusMap[item.status] || {}
                return (
                  <button key={item.id} className="planning-tl-row planning-tl-row--nodate" onClick={() => setViewItem(item)}>
                    <div className="planning-tl-date">—</div>
                    <div className="planning-tl-dot" style={{background: cat.color}} />
                    <div className="planning-tl-content">
                      <div className="planning-tl-title">{item.title}</div>
                      <div className="planning-tl-meta">
                        <span style={{color: cat.color, fontWeight:700, fontSize:12}}>{cat.icon} {cat.label}</span>
                        <span className="planning-status-badge" style={{background: st.bg, color: st.color}}>{st.label}</span>
                      </div>
                    </div>
                    <div className="planning-tl-right">
                      <span className="planning-priority-badge" style={{background: PRIORITY_BG[item.priority], color: PRIORITY_COLOR[item.priority]}}>
                        {item.priority}
                      </span>
                    </div>
                  </button>
                )
              })}
            </>
          )}
        </div>
      )}

      {/* ── Add Modal ── */}
      {addOpen && (
        <Modal title="Add Planning Item" onClose={() => setAddOpen(false)} size="md"
          footer={<>
            <button className="btn btn-secondary" onClick={() => setAddOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={addItem} disabled={!draft.title.trim()}>Add Item</button>
          </>}
        >
          <PlanForm draft={draft} setDraft={setDraft} />
        </Modal>
      )}

      {/* ── Detail Modal ── */}
      {viewItem && (() => {
        const cat = catMap[viewItem.category] || {}
        const st  = statusMap[viewItem.status] || {}
        const done = (viewItem.checklist||[]).filter(t=>t.done).length
        const total2 = (viewItem.checklist||[]).length
        return (
          <Modal title={viewItem.title} onClose={() => setViewItem(null)} size="lg"
            footer={<>
              <button className="btn btn-secondary btn-danger" onClick={() => { if(window.confirm('Delete this item?')) deleteItem(viewItem.id) }}>Delete</button>
              <button className="btn btn-secondary" onClick={() => { setEditDraft({...viewItem}); setEditOpen(true) }}>Edit</button>
              <button className="btn btn-secondary" onClick={() => setViewItem(null)}>Close</button>
            </>}
          >
            <div className="planning-detail">
              <div className="planning-detail-meta">
                <span className="planning-cat-tag" style={{background: cat.bg, color: cat.color}}>{cat.icon} {cat.label}</span>
                <span className="planning-status-badge" style={{background: st.bg, color: st.color}}>{st.label}</span>
                <span className="planning-priority-badge" style={{background: PRIORITY_BG[viewItem.priority], color: PRIORITY_COLOR[viewItem.priority]}}>{viewItem.priority} Priority</span>
                {viewItem.date && <span style={{fontSize:12,color:'var(--gray-500)'}}>📅 {fmtDate(viewItem.date)}</span>}
                {viewItem.assignedTo && <span style={{fontSize:12,color:'var(--gray-500)'}}>👤 {viewItem.assignedTo}</span>}
              </div>

              {viewItem.notes && (
                <div className="planning-detail-notes">{viewItem.notes}</div>
              )}

              {/* Status update */}
              <div className="planning-detail-section">
                <div className="planning-detail-section-label">Update Status</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {STATUSES.map(s => (
                    <button key={s.id}
                      className="planning-status-btn"
                      style={{background: viewItem.status===s.id ? s.color : s.bg, color: viewItem.status===s.id ? 'white' : s.color, borderColor: s.color}}
                      onClick={() => updateStatus(viewItem.id, s.id)}
                    >{s.label}</button>
                  ))}
                </div>
              </div>

              {/* Checklist */}
              <div className="planning-detail-section">
                <div className="planning-detail-section-label">
                  Checklist {total2 > 0 && <span style={{color:'var(--gray-400)',fontWeight:400}}>({done}/{total2})</span>}
                </div>
                {total2 > 0 && (
                  <div className="planning-checklist-bar">
                    <div className="planning-checklist-fill" style={{width: `${Math.round(done/total2*100)}%`}} />
                  </div>
                )}
                <div className="planning-checklist">
                  {(viewItem.checklist||[]).map(task => (
                    <div key={task.id} className="planning-task">
                      <button className={`planning-task-check ${task.done?'planning-task-check--done':''}`} onClick={() => toggleTask(viewItem.id, task.id)}>
                        {task.done ? '✓' : ''}
                      </button>
                      <span className="planning-task-text" style={{textDecoration: task.done ? 'line-through' : 'none', color: task.done ? 'var(--gray-400)' : 'var(--gray-800)'}}>{task.text}</span>
                      <button className="planning-task-del" onClick={() => deleteTask(viewItem.id, task.id)}>✕</button>
                    </div>
                  ))}
                </div>
                <div className="planning-task-add">
                  <input
                    className="form-input"
                    placeholder="Add a task…"
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTask()}
                  />
                  <button className="btn btn-secondary" onClick={addTask} disabled={!newTask.trim()}>Add</button>
                </div>
              </div>
            </div>
          </Modal>
        )
      })()}

      {/* ── Edit Modal ── */}
      {editOpen && editDraft && (
        <Modal title="Edit Planning Item" onClose={() => { setEditOpen(false); setEditDraft(null) }} size="md"
          footer={<>
            <button className="btn btn-secondary" onClick={() => { setEditOpen(false); setEditDraft(null) }}>Cancel</button>
            <button className="btn-primary" onClick={saveEdit}>Save Changes</button>
          </>}
        >
          <PlanForm draft={editDraft} setDraft={setEditDraft} isEdit />
        </Modal>
      )}
    </div>
  )
}

function PlanCard({ item, catMap, onClick }) {
  const cat = catMap[item.category] || {}
  const done  = (item.checklist||[]).filter(t=>t.done).length
  const total = (item.checklist||[]).length
  const days = daysUntil(item.date)
  return (
    <button className="planning-card" onClick={onClick}>
      <div className="planning-card-cat-bar" style={{background: cat.color}} />
      <div className="planning-card-body">
        <div className="planning-card-title">{item.title}</div>
        <div className="planning-card-meta">
          <span style={{fontSize:11,color: cat.color, fontWeight:700}}>{cat.icon} {cat.label}</span>
          <span className="planning-priority-badge" style={{background: PRIORITY_BG[item.priority], color: PRIORITY_COLOR[item.priority], fontSize:10}}>{item.priority}</span>
        </div>
        {item.notes && <div className="planning-card-notes">{item.notes}</div>}
        <div className="planning-card-footer">
          {item.date && (
            <span className={`planning-card-date ${days !== null && days >= 0 && days <= 7 ? 'planning-card-date--urgent' : ''}`}>
              📅 {fmtDate(item.date)}{days !== null && days >= 0 && days <= 7 ? ` · ${days}d` : ''}
            </span>
          )}
          {total > 0 && <span style={{fontSize:11,color:'var(--gray-500)'}}>✓ {done}/{total}</span>}
          {item.assignedTo && <span style={{fontSize:11,color:'var(--gray-500)'}}>👤 {item.assignedTo}</span>}
        </div>
      </div>
    </button>
  )
}

function PlanRow({ item, catMap, statusMap, onClick }) {
  const cat = catMap[item.category] || {}
  const st  = statusMap[item.status] || {}
  const days = daysUntil(item.date)
  return (
    <button className="planning-row" onClick={onClick}>
      <div className="planning-row-accent" style={{background: cat.color}} />
      <div className="planning-row-main">
        <div className="planning-row-title">{item.title}</div>
        <div className="planning-row-sub">
          <span style={{color: cat.color, fontWeight:700, fontSize:12}}>{cat.icon} {cat.label}</span>
          {item.assignedTo && <span style={{fontSize:12,color:'var(--gray-500)'}}>👤 {item.assignedTo}</span>}
          {item.date && <span style={{fontSize:12,color: days!==null&&days<=7?'#dc2626':'var(--gray-500)'}}>📅 {fmtDate(item.date)}</span>}
        </div>
      </div>
      <div className="planning-row-right">
        <span className="planning-status-badge" style={{background: st.bg, color: st.color}}>{st.label}</span>
        <span className="planning-priority-badge" style={{background: PRIORITY_BG[item.priority], color: PRIORITY_COLOR[item.priority]}}>{item.priority}</span>
      </div>
    </button>
  )
}

function PlanForm({ draft, setDraft, isEdit }) {
  return (
    <div className="planning-form">
      <div className="planning-form-row">
        <label>Title <span style={{color:'#dc2626'}}>*</span></label>
        <input className="form-input" placeholder="What are you planning?" value={draft.title} onChange={e => setDraft(d=>({...d,title:e.target.value}))} />
      </div>
      <div className="planning-form-2col">
        <div className="planning-form-row">
          <label>Category</label>
          <select className="form-input" value={draft.category} onChange={e => setDraft(d=>({...d,category:e.target.value}))}>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
          </select>
        </div>
        <div className="planning-form-row">
          <label>Status</label>
          <select className="form-input" value={draft.status} onChange={e => setDraft(d=>({...d,status:e.target.value}))}>
            {STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
      </div>
      <div className="planning-form-2col">
        <div className="planning-form-row">
          <label>Priority</label>
          <select className="form-input" value={draft.priority} onChange={e => setDraft(d=>({...d,priority:e.target.value}))}>
            {PRIORITIES.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="planning-form-row">
          <label>Target Date</label>
          <input type="date" className="form-input" value={draft.date} onChange={e => setDraft(d=>({...d,date:e.target.value}))} />
        </div>
      </div>
      <div className="planning-form-row">
        <label>Assigned To <span style={{color:'var(--gray-400)',fontWeight:400}}>(optional)</span></label>
        <input className="form-input" placeholder="Leader name or team" value={draft.assignedTo} onChange={e => setDraft(d=>({...d,assignedTo:e.target.value}))} />
      </div>
      <div className="planning-form-row">
        <label>Notes / Description</label>
        <textarea className="form-input" rows={4} placeholder="Details, goals, logistics…" value={draft.notes} onChange={e => setDraft(d=>({...d,notes:e.target.value}))} />
      </div>
    </div>
  )
}
