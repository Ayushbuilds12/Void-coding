import { createServerSupabaseClient } from '../../../lib/supabaseServer'
import { redirect } from 'next/navigation'
import SettingsClient from './SettingsClient'

export default async function SettingsPage() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // fetch profile
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()

  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-2 text-sm text-gray-600">Manage your profile and account.</p>

      <div className="mt-6">
        <SettingsClient initialName={profile?.full_name ?? ''} email={user.email ?? ''} />
      </div>
    </div>
  )
}
