export interface Gear {
  availability?: string[] | null;
  created_at?: string | null;
  deposit?: string;
  description?: string | null;
  id?: string;
  owner_id?: string | null;
  price_day?: string;
  price_hr?: string;
  rating?: number | null;
  rentals?: string[] | null;
  type?: string | null;
}
