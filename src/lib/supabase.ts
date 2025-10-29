import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

let cachedClient: SupabaseClient<Database> | null = null

function getSupabaseClient(): SupabaseClient<Database> | null {
  if (cachedClient) return cachedClient
  if (!supabaseUrl || !supabaseAnonKey) {
    // Missing envs in build/prerender environments should not crash the build
    return null
  }
  cachedClient = createClient<Database>(supabaseUrl, supabaseAnonKey)
  return cachedClient
}

export async function getProjects() {
  const client = getSupabaseClient()
  if (!client) {
    // Graceful fallback when env vars are not configured
    return []
  }

  const { data, error } = await client
    .from("projects")
    .select("*")
    .order("id", { ascending: true })

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }

  return data || []
}