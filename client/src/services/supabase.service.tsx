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

  getUsers: async function () {
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

  getSingleUserByEmail: async function (email: string | undefined) {
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

  getGear: async function () {
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

  uploadUserProfileImage: async function (
    file: File,
    userid: string | undefined
  ) {
    try {
      const { data, error } = await supabaseClient.storage
        .from('images')
        .upload(userid + '/' + 'profileImage', file, {
          cacheControl: '3600',
        });
      if (error) throw new Error(`Couldn't upload the image`, error);
      return data;
    } catch (e: any) {
      console.log(e);
    }
  },
};
