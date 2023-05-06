export interface User {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  location: string;
  bio?: string;
  is_owner: boolean;
  is_renter: boolean;
  rating?: number;
  rental_contracts?: string[];
}
