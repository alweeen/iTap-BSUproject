export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    username: string
                    full_name: string
                    age: number | null
                    address: string | null
                    contact_number: string | null
                    relationship_status: string | null
                    email: string | null
                    social_links: Json
                    theme_id: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    username: string
                    full_name: string
                    age?: number | null
                    address?: string | null
                    contact_number?: string | null
                    relationship_status?: string | null
                    email?: string | null
                    social_links?: Json
                    theme_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    username?: string
                    full_name?: string
                    age?: number | null
                    address?: string | null
                    contact_number?: string | null
                    relationship_status?: string | null
                    email?: string | null
                    social_links?: Json
                    theme_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
        }
    }
}
