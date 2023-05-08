export interface User {
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


