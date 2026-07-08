'use client'

import { useEffect, useState } from 'react'
import Alert from '../../components/Alert'
import type { Domain } from '../../types/client'

export default function DomainsClient() {
  const [domains, setDomains] = useState<Domain[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [newDomain, setNewDomain] = useState('')

  const fetchDomains = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/domains')
      if (!res.ok) throw new Error('Failed to load domains')
      const data = await res.json()
      setDomains(data || [])
    } catch (err: any) {
      setError(err.message ?? 'Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDomains() }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/domains', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ domain: newDomain }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to add domain')
      setDomains((prev) => prev ? [data, ...prev] : [data])
      setNewDomain('')
      setSuccess('Domain added')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err.message ?? 'Error')
    } finally { setLoading(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this domain?')) return
    try {
      setLoading(true)
      const res = await fetch('/api/domains', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to delete')
      setDomains((prev) => prev ? prev.filter((d) => d.id !== id) : [])
      setSuccess('Domain deleted')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err.message ?? 'Error')
    } finally { setLoading(false) }
  }

  return (
    <div>
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <form onSubmit={handleAdd} className="flex gap-2 max-w-md">
        <input value={newDomain} onChange={(e) => setNewDomain(e.target.value)} placeholder="example.com" className="flex-1 p-2 border rounded-md" required />
        <button type="submit" className="inline-flex items-center rounded-md bg-indigo-600 text-white px-4 py-2">Add domain</button>
      </form>

      {loading && <div className="mt-4 text-sm text-gray-500">Loading...</div>}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {domains && domains.length === 0 && <div className="text-sm text-gray-500">No domains yet.</div>}
        {domains?.map((d) => (
          <div key={d.id} className="p-4 border rounded-lg relative">
            <h3 className="font-semibold">{d.domain}</h3>
            <p className="text-sm text-gray-600 mt-2">Added on {new Date(d.created_at).toLocaleString()}</p>
            <button onClick={() => handleDelete(d.id)} className="absolute top-3 right-3 text-sm text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
