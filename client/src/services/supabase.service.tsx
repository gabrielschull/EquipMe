import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseClient = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

export const supabase = {
  getUsers: async function getUsers() {
    try {
      const data = await supabaseClient.from('Users').select();
      if (data && data.data) {
        return data.data;
      }
    } catch (e: any) {
      console.log(e);
      alert('Cannot get users from Supabase');
    }
  },
};
