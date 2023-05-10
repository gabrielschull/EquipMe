import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { User } from '../types/user.type';

export const supabaseClient = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const supabase = {
  signOut: async function signOut() {
    try {
      await supabaseClient.auth.signOut();
    } catch (e: any) {
      console.log(e, 'Cannot log out');
    }
  },

  getUsers: async function () {
    try {
      const data = await supabaseClient.from('Users').select();
      if (data && data.data) {
        return data.data;
      }
    } catch (e: any) {
      console.log(e, 'Cannot get users from Supabase');
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
      console.log(e, 'Cannot find the user in Supabase');
    }
  },

  getGear: async function () {
    try {
      const data = await supabaseClient.from('Gear').select();
      if (data && data.data) {
        return data.data;
      }
    } catch (e: any) {
      console.log(e, 'Cannot get gear from Supabase');
    }
  },

  uploadUserProfileImage: async function (
    file: any,
    userid: string | undefined
  ) {
    try {
      const { data, error } = await supabaseClient.storage
        .from('images')
        .upload(userid + '/' + 'profileImage', file, {
          cacheControl: '3600',
          upsert: true,
        });
      if (error) throw new Error(`Couldn't upload the image`, error);
      return data;
    } catch (e: any) {
      console.log(e);
    }
  },

  uploadGear: async function (file: any, userid: string | undefined) {
    try {
      const { data, error } = await supabaseClient.storage
        .from('gearImagesBucket')
        .upload(userid + '/' + file.name, file, {
          cacheControl: '3600',
          upsert: true,
        });
      if (error) throw new Error(`Couldn't upload the image`, error);
      return data;
    } catch (e: any) {
      console.log(e);
    }
  },

  uploadUserProfileTextFields: async function (
    id: string | undefined,
    newBio: string | undefined,
    newEmail: string | undefined,
    newFirstName: string | undefined,
    newLastName: string | undefined,
    newLocation: string | undefined,
    newPhone: string | undefined
  ) {
    try {
      const { data, error } = await supabaseClient
        .from('Users')
        .update({
          bio: newBio,
          email: newEmail,
          first_name: newFirstName,
          last_name: newLastName,
          location: newLocation,
          phone: newPhone,
        })
        .eq('id', id);
      if (error) throw new Error(`Couldn't update profile info`);
      return data;
    } catch (e: any) {
      console.log(e);
    }
  },

  getGearId: async function getGearId(id: string | undefined) {
    try {
      const data = await supabaseClient.from('Gear').select().eq('id', id);
      if (data && data.data) {
        return data.data;
      }
    } catch (e: any) {
      console.log(e, 'Cannot get gear from Supabase');
    }
  },

  updateUserLocation: async function updateUserLocation(
    user: User,
    location: string
  ) {
    try {
      const { data, error } = await supabaseClient
        .from('Users')
        .update({ location })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      return data;
    } catch (e: any) {
      console.log(e, 'Cannot update user location in Supabase');
    
    }
  },

  deleteGear: async function deleteGear(id: string) {
    try {
      const { data, error } = await supabaseClient
        .from('Gear')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      return data;
    } catch (e: any) {
      console.log(e, 'Cannot delete item in Supabase');
    }


},
  getUserById: async function getUserById(id:string)
  {
    try {
      const {data, error}  = await supabaseClient
      .from("Users")
      .select('*').eq('id', id).single();
      if (error) {
        throw error
      }
      return data
    } catch (e: any) {
      console.log(e)
    }
  },
  
  addGear: async function addGear(id :string, description:string | null | undefined, pricehour:any,  priceday:any, deposit:any) {
    try {
      const { data, error } = await supabaseClient
        .from('Gear')
        .insert({
          availability:[""],
          deposit: deposit,
          description: description,
          owner_id: id,
          price_day: priceday,
          price_hr: pricehour,
        })

      if (error) {
        throw error;
      }

      return data;
    } catch (e: any) {
      console.log(e, 'Cannot create gear in Supabase');
    }
},
};

