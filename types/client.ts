export type Project = {
  id: string
  user_id?: string
  name: string
  description?: string | null
  business_type?: string | null
  created_at?: string | null
}

export type Domain = {
  id: string
  user_id?: string
  domain: string
  created_at?: string | null
}

export type Profile = {
  id: string
  full_name?: string | null
  created_at?: string | null
}
