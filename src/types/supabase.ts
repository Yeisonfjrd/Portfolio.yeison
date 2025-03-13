export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: number
          title: string
          description: string
          image: string
          tags: string[]
          link: string
          github: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          image: string
          tags: string[]
          link: string
          github: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          image?: string
          tags?: string[]
          link?: string
          github?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}