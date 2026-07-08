'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Placeholder: replace with real auth integration
    await new Promise((r) => setTimeout(r, 700))
    console.log('login', { email, password })
    setLoading(false)
    // For now, redirect to dashboard
    window.location.href = '/dashboard'
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-semibold">Sign in to Void</h1>
        <p className="mt-2 text-sm text-gray-600">Access your projects and dashboard</p>

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
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          New to Void? <Link href="/pricing" className="text-indigo-600 hover:underline">View plans</Link>
        </p>
      </div>
    </main>
  )
}
