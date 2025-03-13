import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export async function getProjects() {
  const { data, error } = await supabase.from("projects").select("*").order("id", { ascending: true })

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }

  return data || []
}