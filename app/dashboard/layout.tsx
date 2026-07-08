'use client'

import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import { getSession, signOut, initSupabaseAuthSync } from '../../lib/supabase'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  initSupabaseAuthSync()
  const [loading, setLoading] = useState(true)
  const [sessionExists, setSessionExists] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const session = await getSession()
        if (!mounted) return
        setSessionExists(!!session)
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/login'
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!sessionExists) {
    // Client-side redirect as a fallback; middleware should already redirect
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
      return null
    }
  }

  const nav = [
    { href: '/dashboard', label: 'Projects' },
    { href: '/dashboard/domains', label: 'Domains' },
    { href: '/dashboard/payments', label: 'Payments' },
    { href: '/dashboard/settings', label: 'Settings' },
  ]

  return (
    <div className="min-h-screen flex bg-white">
      <aside className="w-72 border-r border-gray-100 p-6 hidden md:block">
        <h2 className="text-xl font-bold">Void</h2>
        <nav className="mt-8 space-y-2">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8">
          <button onClick={handleSignOut} className="w-full text-left rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
