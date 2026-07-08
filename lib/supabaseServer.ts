import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../types/supabase'

export function createServerSupabaseClient() {
  return createServerComponentClient<Database>({ cookies })
}

export async function getServerUser() {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase.auth.getUser()
  return data.user
}

export async function getProjectsForUser() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data, error } = await supabase.from('projects').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getDomainsForUser() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data, error } = await supabase.from('domains').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
  if (error) throw error
  return data
}
