import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from './supabase.js'

const KEY = 'mitchs-mercedes-v1'
const TABLES = ['vehicles', 'repairs', 'recalls']
const empty = { vehicles: [], repairs: [], recalls: [] }
const REFRESH_MS = 30000

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36)

function loadLocal() {
  try {
    return { ...empty, ...JSON.parse(localStorage.getItem(KEY) || '{}') }
  } catch {
    return empty
  }
}

const toDb = (table, row) =>
  table === 'vehicles'
    ? { id: row.id, data: row, updated_at: new Date().toISOString() }
    : { id: row.id, vehicle_id: row.vehicleId, data: row, updated_at: new Date().toISOString() }

// cloud: true when signed in to Supabase; otherwise data lives in localStorage.
export function useStore(cloud) {
  const [db, setDb] = useState(cloud ? empty : loadLocal)
  const [loading, setLoading] = useState(cloud)
  const [error, setError] = useState('')
  const pending = useRef(0) // writes in flight; skip refresh while > 0 so it can't undo them

  const fail = (what, e) => setError(`${what} failed: ${e.message || e}. Your change may not have been saved.`)

  const refresh = useCallback(async () => {
    if (!cloud || pending.current > 0) return
    const results = await Promise.all(TABLES.map((t) => supabase.from(t).select('data')))
    const bad = results.find((r) => r.error)
    if (bad) { setError(`Could not load data: ${bad.error.message}`); setLoading(false); return }
    setDb(Object.fromEntries(TABLES.map((t, i) => [t, results[i].data.map((r) => r.data)])))
    setError('')
    setLoading(false)
  }, [cloud])

  useEffect(() => {
    if (!cloud) return
    refresh()
    const timer = setInterval(refresh, REFRESH_MS)
    window.addEventListener('focus', refresh)
    return () => { clearInterval(timer); window.removeEventListener('focus', refresh) }
  }, [cloud, refresh])

  useEffect(() => {
    if (cloud) return
    try { localStorage.setItem(KEY, JSON.stringify(db)) } catch { /* storage full or blocked */ }
  }, [db, cloud])

  const write = async (what, op) => {
    pending.current++
    try {
      const { error: e } = await op()
      if (e) throw e
    } catch (e) {
      fail(what, e)
    } finally {
      pending.current--
    }
  }

  const upsert = (table, row) => {
    setDb((d) => {
      const exists = d[table].some((r) => r.id === row.id)
      return { ...d, [table]: exists ? d[table].map((r) => (r.id === row.id ? row : r)) : [...d[table], row] }
    })
    if (cloud) write('Saving', () => supabase.from(table).upsert(toDb(table, row)))
  }

  const remove = (table, id) => {
    setDb((d) => {
      const next = { ...d, [table]: d[table].filter((r) => r.id !== id) }
      if (table === 'vehicles') {
        next.repairs = d.repairs.filter((r) => r.vehicleId !== id)
        next.recalls = d.recalls.filter((r) => r.vehicleId !== id)
      }
      return next
    })
    if (cloud) write('Deleting', () => supabase.from(table).delete().eq('id', id)) // child rows cascade in the database
  }

  const replaceAll = (data) => {
    const next = { ...empty, ...data }
    setDb(next)
    if (!cloud) return
    write('Replacing data', async () => {
      // children first so the vehicle foreign key never blocks, then parents back in first
      for (const t of ['recalls', 'repairs', 'vehicles']) {
        const { error: e } = await supabase.from(t).delete().neq('id', '')
        if (e) return { error: e }
      }
      for (const t of TABLES) {
        if (!next[t].length) continue
        const { error: e } = await supabase.from(t).insert(next[t].map((r) => toDb(t, r)))
        if (e) return { error: e }
      }
      return {}
    })
  }

  return { db, upsert, remove, replaceAll, loading, error, clearError: () => setError('') }
}
