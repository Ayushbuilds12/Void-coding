'use client'

import { useState } from 'react'
import Alert from '../../../components/Alert'

type Props = {
  initialName?: string | null
  email?: string | null
}

export default function SettingsClient({ initialName, email }: Props) {
  const [name, setName] = useState(initialName ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/profile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ full_name: name }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to save')
      setSuccess('Profile saved')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err.message ?? 'Error')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-2xl">
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <div className="bg-white p-6 rounded-lg border">
        <h2 className="text-lg font-semibold">Profile</h2>
        <form onSubmit={handleSave} className="mt-4 grid gap-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl text-gray-600">{name ? name[0].toUpperCase() : 'U'}</div>
            <div className="flex-1">
              <label className="text-sm font-medium">Full name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full p-2 border rounded-md" />
              <p className="mt-1 text-sm text-gray-500">Your email: <span className="font-medium">{email}</span></p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button type="submit" disabled={loading} className="px-4 py-2 rounded-md bg-indigo-600 text-white">{loading ? 'Saving...' : 'Save profile'}</button>
          </div>
        </form>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold">Account</h3>
        <p className="mt-2 text-sm text-gray-600">Manage account settings such as email and subscription.</p>
        <div className="mt-4">
          <button onClick={() => { window.location.href = '/dashboard/settings' }} className="px-4 py-2 rounded-md border">Manage account</button>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold">Logout</h3>
        <p className="mt-2 text-sm text-gray-600">Sign out of your account.</p>
        <div className="mt-4">
          <button onClick={() => { window.location.href = '/login' }} className="px-4 py-2 rounded-md border">Logout</button>
        </div>
      </div>
    </div>
  )
}
