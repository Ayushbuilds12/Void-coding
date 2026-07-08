'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signUpWithEmail, initSupabaseAuthSync } from '../../lib/supabase'

export default function SignupPage() {
  initSupabaseAuthSync()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)
    const { data, error } = await signUpWithEmail(email, password)
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    if (data?.user) {
      setMessage('Account created. A confirmation email may have been sent. Redirecting to dashboard...')
      // wait briefly and redirect
      setTimeout(() => { window.location.href = '/dashboard' }, 1200)
    } else {
      setMessage('Check your email for a confirmation link.')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-semibold">Create an account for Void</h1>
        <p className="mt-2 text-sm text-gray-600">Sign up with your email and password</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {message && <p className="mt-4 text-sm text-green-600">{message}</p>}

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account? <Link href="/login" className="text-indigo-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </main>
  )
}
