import { createServerSupabaseClient } from '../../../lib/supabaseServer'
import { redirect } from 'next/navigation'

export default async function DomainsPage() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: domains } = await supabase.from('domains').select('*').eq('user_id', user.id).order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold">Domains</h1>
      <p className="mt-2 text-gray-600">Manage your custom domains here.</p>

      <div className="mt-6">
        <form action="/api/domains" method="post" className="flex gap-2 max-w-md">
          <input name="domain" placeholder="example.com" className="flex-1 p-2 border rounded-md" required />
          <button type="submit" className="inline-flex items-center rounded-md bg-indigo-600 text-white px-4 py-2">Add domain</button>
        </form>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {domains?.map((d: any) => (
            <div key={d.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{d.domain}</h3>
              <p className="text-sm text-gray-600 mt-2">Added on {new Date(d.created_at).toLocaleString()}</p>
            </div>
          ))}
          {(!domains || domains.length === 0) && <div className="text-sm text-gray-500">No domains yet.</div>}
        </div>
      </div>
    </div>
  )
}
