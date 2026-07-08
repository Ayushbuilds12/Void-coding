'use client'

import { useEffect, useState } from 'react'
import type { Project } from '../../types/client'
import NewProjectForm from './components/NewProjectForm'
import Alert from '../../components/Alert'

export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showNew, setShowNew] = useState(false)

  const fetchProjects = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/projects')
      if (!res.ok) throw new Error('Failed to load projects')
      const data = await res.json()
      setProjects(data || [])
    } catch (err: any) {
      setError(err.message ?? 'Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleCreate = (project: Project) => {
    setProjects((prev) => prev ? [project, ...prev] : [project])
    setSuccess('Project created')
    setTimeout(() => setSuccess(null), 3000)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    try {
      setLoading(true)
      const res = await fetch('/api/projects', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to delete')
      setProjects((prev) => prev ? prev.filter((p) => p.id !== id) : [])
      setSuccess('Project deleted')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err.message ?? 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div />
        <div className="flex items-center gap-3">
          <button onClick={() => setShowNew(true)} className="inline-flex items-center rounded-md bg-indigo-600 text-white px-4 py-2">New Project</button>
        </div>
      </div>

      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <NewProjectForm open={showNew} onClose={() => setShowNew(false)} onCreated={handleCreate} />

      {loading && <div className="text-sm text-gray-500">Loading projects...</div>}

      {!loading && projects && projects.length === 0 && (
        <div className="mt-6 text-center text-gray-600">No projects yet. Click "New Project" to create one.</div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects?.map((p) => (
          <div key={p.id} className="p-4 border rounded-lg relative">
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-600 mt-2">{p.description}</p>
            <p className="text-xs text-gray-400 mt-2">Business: {p.business_type || '—'}</p>
            <button onClick={() => handleDelete(p.id)} className="absolute top-3 right-3 text-sm text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
