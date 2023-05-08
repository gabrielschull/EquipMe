import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { User } from '../types/user.type';

export const supabaseClient = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

export const supabase = {
  signOut: async function signOut() {
    try {
      await supabaseClient.auth.signOut();
    } catch (e: any) {
      console.log(e);
      alert('Cannot log out');
    }
  },

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

  getSingleUserByEmail: async function getSingleUserByEmail(
    email: string | undefined
  ) {
    try {
      const data = await supabaseClient
        .from('Users')
        .select()
        .eq('email', email)
        .single();
      if (data && data.data) {
        return data.data;
      }
    } catch (e: any) {
      console.log(e);
      alert('Cannot find the user in Supabase');
    }
  },

  getGear: async function getGear() {
    try {
      const data = await supabaseClient.from('Gear').select();
      if (data && data.data) {
        return data.data;
      }
    } catch (e: any) {
      console.log(e);
      alert('Cannot get gear from Supabase');
    }
  },


  getGearId: async function getGearId(  id: string | undefined) {
    try {
      const data = await supabaseClient
      .from('Gear')
      .select()
      .eq('id', id)
      if (data && data.data) {
        return data.data;
      }
    } catch (e: any) {
      console.log(e);
      alert('Cannot get gear from Supabase');
    }
  },
};

/*updateUserLocation: async function updateUserLocation(
  user: User,
  location: string
) {
  try {
    const{data, error } = await supabaseClient
    .from("Users")
    .update({location})
    .eq('id', user.id)

    if (error) {
      throw error;
    }

    return data;
  } catch (e:any) {
    console.log(e);
    alert('Cannot update user location in Supabase')
  }
},*/
// }



