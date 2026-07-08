import { createClient, Session } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Helper to set a cookie that middleware can read for route protection
function setAuthCookie(accessToken: string | null, expiresAtSeconds?: number | null) {
  if (typeof window === 'undefined') return

  if (!accessToken) {
    // clear cookie
    document.cookie = `sb-access-token=; Path=/; max-age=0; SameSite=Lax;` 
    return
  }

  let maxAge = 60 * 60 * 24 * 7 // default 7 days
  if (expiresAtSeconds) {
    const expiresIn = Math.max(0, expiresAtSeconds - Math.floor(Date.now() / 1000))
    maxAge = expiresIn
  }

  document.cookie = `sb-access-token=${accessToken}; Path=/; max-age=${maxAge}; SameSite=Lax;` 
}

// Keep track of auth state and synchronize a cookie for middleware
let _initialized = false
export function initSupabaseAuthSync() {
  if (typeof window === 'undefined') return
  if (_initialized) return
  _initialized = true

  supabase.auth.onAuthStateChange((_event, session) => {
    const accessToken = session?.access_token ?? null
    const expiresAt = (session as Session | null)?.expires_at ?? null
    setAuthCookie(accessToken, expiresAt ?? null)
  })

  // On load, ensure cookie matches current session
  supabase.auth.getSession().then(({ data }) => {
    const accessToken = data.session?.access_token ?? null
    const expiresAt = data.session?.expires_at ?? null
    setAuthCookie(accessToken ?? null, expiresAt ?? null)
  }).catch(() => {
    setAuthCookie(null, null)
  })
}

export async function signUpWithEmail(email: string, password: string) {
  return await supabase.auth.signUp({ email, password })
}

export async function signInWithEmail(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  // Clear cookie on client
  setAuthCookie(null, null)
  return await supabase.auth.signOut()
}

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}
