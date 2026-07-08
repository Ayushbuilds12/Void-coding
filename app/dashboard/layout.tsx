'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

type NavItem = { href: string; label: string }

const nav: NavItem[] = [
  { href: '/dashboard', label: 'Projects' },
  { href: '/dashboard/domains', label: 'Domains' },
  { href: '/dashboard/payments', label: 'Payments' },
  { href: '/dashboard/settings', label: 'Settings' },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
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
      </aside>

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
