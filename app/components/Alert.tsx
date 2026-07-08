export default function Alert({ type = 'info', message }: { type?: 'info' | 'success' | 'error'; message: string }) {
  const base = 'p-3 rounded-md text-sm'
  if (type === 'success') return <div className={base + ' bg-green-50 text-green-800'}>{message}</div>
  if (type === 'error') return <div className={base + ' bg-red-50 text-red-800'}>{message}</div>
  return <div className={base + ' bg-blue-50 text-blue-800'}>{message}</div>
}
