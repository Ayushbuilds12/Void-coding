'use client'

import { useEffect } from 'react'
import { initSupabaseAuthSync } from '../../lib/supabase'

export default function SupabaseInit() {
  useEffect(() => {
    initSupabaseAuthSync()
  }, [])
  return null
}
