import { useEffect, useState } from 'react'

const KEY = 'mitchs-mercedes-v1'
const empty = { vehicles: [], repairs: [], recalls: [] }

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36)

function load() {
  try {
    return { ...empty, ...JSON.parse(localStorage.getItem(KEY) || '{}') }
  } catch {
    return empty
  }
}

export function useStore() {
  const [db, setDb] = useState(load)
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(db)) } catch { /* storage full or blocked */ }
  }, [db])

  const upsert = (table, row) =>
    setDb((d) => {
      const exists = d[table].some((r) => r.id === row.id)
      return { ...d, [table]: exists ? d[table].map((r) => (r.id === row.id ? row : r)) : [...d[table], row] }
    })

  const remove = (table, id) =>
    setDb((d) => {
      const next = { ...d, [table]: d[table].filter((r) => r.id !== id) }
      if (table === 'vehicles') {
        next.repairs = d.repairs.filter((r) => r.vehicleId !== id)
        next.recalls = d.recalls.filter((r) => r.vehicleId !== id)
      }
      return next
    })

  const replaceAll = (data) => setDb({ ...empty, ...data })

  return { db, upsert, remove, replaceAll }
}
