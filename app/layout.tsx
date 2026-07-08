import './globals.css'
import type { ReactNode } from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Void Coding',
  description: 'Learning projects and tutorials — Void Coding'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <header className="border-b border-gray-100">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">Void</Link>
            <nav className="flex items-center gap-4">
              <Link href="/pricing" className="text-sm text-gray-700 hover:underline">Pricing</Link>
              <Link href="/dashboard" className="text-sm text-gray-700 hover:underline">Dashboard</Link>
              <Link href="/login" className="text-sm text-gray-700 hover:underline">Login</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
