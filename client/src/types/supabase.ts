export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Gear: {
        Row: {
          availability: string[] | null
          created_at: string | null
          deposit: number
          description: string | null
          id: string
          owner: string | null
          price_day: number
          price_hr: number
          rating: number | null
          rentals: string[] | null
        }
        Insert: {
          availability?: string[] | null
          created_at?: string | null
          deposit: number
          description?: string | null
          id?: string
          owner?: string | null
          price_day: number
          price_hr: number
          rating?: number | null
          rentals?: string[] | null
        }
        Update: {
          availability?: string[] | null
          created_at?: string | null
          deposit?: number
          description?: string | null
          id?: string
          owner?: string | null
          price_day?: number
          price_hr?: number
          rating?: number | null
          rentals?: string[] | null
        }
      }
      RentalContracts: {
        Row: {
          created_at: string | null
          deposit: number
          gear_id: string
          id: string
          location: string | null
          owner: string
          rental_end: string
          rental_price: number
          rental_start: string
          rentee: string
          status: boolean
        }
        Insert: {
          created_at?: string | null
          deposit: number
          gear_id: string
          id?: string
          location?: string | null
          owner: string
          rental_end: string
          rental_price: number
          rental_start: string
          rentee: string
          status: boolean
        }
        Update: {
          created_at?: string | null
          deposit?: number
          gear_id?: string
          id?: string
          location?: string | null
          owner?: string
          rental_end?: string
          rental_price?: number
          rental_start?: string
          rentee?: string
          status?: boolean
        }
      }
      Users: {
        Row: {
          bio: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          is_owner: boolean | null
          is_renter: boolean | null
          last_name: string
          location: string
          password: string
          phone: string
          rating: number | null
          rental_contracts: string[] | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          is_owner?: boolean | null
          is_renter?: boolean | null
          last_name: string
          location: string
          password: string
          phone: string
          rating?: number | null
          rental_contracts?: string[] | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          is_owner?: boolean | null
          is_renter?: boolean | null
          last_name?: string
          location?: string
          password?: string
          phone?: string
          rating?: number | null
          rental_contracts?: string[] | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
