'use client'

import { useEffect } from 'react'

interface ToastProps {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  onDismiss: (id: string) => void
}

export default function Toast({ id, message, type, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), 3000)
    return () => clearTimeout(timer)
  }, [id, onDismiss])

  const bgColor = type === 'success' ? 'bg-green-50' : type === 'error' ? 'bg-red-50' : 'bg-blue-50'
  const textColor = type === 'success' ? 'text-green-800' : type === 'error' ? 'text-red-800' : 'text-blue-800'
  const borderColor = type === 'success' ? 'border-green-200' : type === 'error' ? 'border-red-200' : 'border-blue-200'

  return (
    <div className={`${bgColor} ${textColor} ${borderColor} border p-4 rounded-md shadow-md animate-slide-in`}>
      <p className="text-sm">{message}</p>
    </div>
  )
}
