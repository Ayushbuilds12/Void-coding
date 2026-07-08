import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Void Coding',
  description: 'Learning projects and tutorials — Void Coding'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}
