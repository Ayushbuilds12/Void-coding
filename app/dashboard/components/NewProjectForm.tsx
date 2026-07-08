'use client'

import { useState } from 'react'
import type { Project } from '../../../types/client'

type Props = {
  open: boolean
  onClose: () => void
  onCreated: (p: Project) => void
}

export default function NewProjectForm({ open, onClose, onCreated }: Props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, description, business_type: businessType }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to create project')
      onCreated(data)
      setName('')
      setDescription('')
      setBusinessType('')
      onClose()
    } catch (err: any) {
      setError(err.message ?? 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg bg-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">New Project</h3>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
          <div>
            <label className="text-sm font-medium">Project Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full p-2 border rounded-md" />
          </div>

          <div>
            <label className="text-sm font-medium">Website Description</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full p-2 border rounded-md" />
          </div>

          <div>
            <label className="text-sm font-medium">Business Type</label>
            <input value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="mt-1 w-full p-2 border rounded-md" placeholder="SaaS, E-commerce, Agency..." />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded-md bg-indigo-600 text-white">{loading ? 'Creating...' : 'Create project'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
