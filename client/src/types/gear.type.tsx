export interface Gear {
  availability?: string[] | null;
  created_at?: string | null;
  deposit?: string;
  name?: string | null;
  description?: string | null;
  id?: string;
  owner_id?: string | null;
  price_day?: string;
  price_hr?: string;
  rating?: number | null;
  rentals?: string[] | null;
  type?: string | null;
  unavailableDates?: string[] | null;
  availableDates?: object[] | null;
}
