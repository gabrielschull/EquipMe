import { createClient } from '@supabase/supabase-js';
import { Gear } from '../types/gear.type';
import { Database } from '../types/supabase';
import { User } from '../types/user.type';
import { format } from 'date-fns';

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

  calendarSetGearAvailability: async function (
    gear_id: string,
    start_date: Date,
    end_date: Date
  ) {
    try {
      console.log(
        'service gear_id=',
        gear_id,
        'service start=',
        start_date,
        'service end=',
        end_date
      );
      const { data, error } = await supabaseClient.rpc('dateAvailability', {
        gear_id: gear_id,
        start_date: format(start_date, 'yyyy-MM-dd'),
        end_date: format(end_date, 'yyyy-MM-dd'),
      });
      console.log(error);
      return data;
    } catch (e: any) {
      console.log(e, 'Cannot run that function');
    }
  },

  calendarDeleteGearAvailability: async function (
    gear_id: string,
    start_date: Date,
    end_date: Date
  ) {
    try {
      // console.log(
      //   'service gear_id=',
      //   gear_id,
      //   'service start=',
      //   start_date,
      //   'service end=',
      //   end_date
      // );
      const { data, error } = await supabaseClient.rpc(
        'deleteDateAvailability',
        {
          gear_id: gear_id,
          start_date: format(start_date, 'yyyy-MM-dd'),
          end_date: format(end_date, 'yyyy-MM-dd'),
        }
      );
      console.log(error);
      return data;
    } catch (e: any) {
      console.log(e, 'Cannot run that function');
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

  getGear: async function (): Promise<Gear[] | undefined> {
    try {
      const data = await supabaseClient.from('Gear').select();
      console.log('🇬🇧 supabase service >>> getGear', data);
      if (data && data.data) {
        // data.data.map((gear) => {

        // })
        return data.data as unknown as Gear[];
      } else throw new Error('no data');
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

  updateIsOwnerToTrue: async function (id: string | undefined) {
    try {
      const { data, error } = await supabaseClient
        .from('Users')
        .update({
          is_owner: true,
        })
        .eq('id', id);
      if (error) throw new Error(`Couldn't update user status`);
      return data;
    } catch (e: any) {
      console.log(e);
    }
  },

  updateIsOwnerToFalse: async function (id: string | undefined) {
    try {
      const { data, error } = await supabaseClient
        .from('Users')
        .update({
          is_owner: false,
        })
        .eq('id', id);
      if (error) throw new Error(`Couldn't update user status`);
      return data;
    } catch (e: any) {
      console.log(e);
    }
  },

  updateIsRenterToTrue: async function (id: string | undefined) {
    try {
      const { data, error } = await supabaseClient
        .from('Users')
        .update({
          is_renter: true,
        })
        .eq('id', id);
      if (error) throw new Error(`Couldn't update user status`);
      return data;
    } catch (e: any) {
      console.log(e);
    }
  },

  updateIsRenterToFalse: async function (id: string | undefined) {
    try {
      const { data, error } = await supabaseClient
        .from('Users')
        .update({
          is_renter: false,
        })
        .eq('id', id);
      if (error) throw new Error(`Couldn't update user status`);
      return data;
    } catch (e: any) {
      console.log(e);
    }
  },

  getGearId: async function getGearId(id: string | undefined) {
    try {
      const data = await supabaseClient.from('Gear').select().eq('id', id);
      if (data && data.data) {
        //console.log('THIS IS THE DATA', data.data);
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
  getUserById: async function getUserById(id: string) {
    try {
      const { data, error } = await supabaseClient
        .from('Users')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        throw error;
      }
      return data;
    } catch (e: any) {
      console.log(e);
    }
  },

  addGear: async function addGear(
    id: string,
    name: string | null | undefined,
    description: string | null | undefined,
    pricehour: any,
    priceday: any,
    deposit: any,
    type: string | null,
    location: string | null
  ) {
    try {
      const { data, error } = await supabaseClient
        .from('Gear')
        .insert({
          availability: [''],
          deposit: deposit,
          name: name,
          description: description,
          owner_id: id,
          price_day: priceday,
          price_hr: pricehour,
          type: type,
          location: location,
        })
        .select();

      if (error) {
        throw error;
      }
      // console.log('data returned by addGear', data);
      return data;
    } catch (e: any) {
      console.log(e, 'Cannot create gear in Supabase');
    }
  },

  editGear: async function (
    id: string | undefined,
    newName: string | undefined,
    newDescription: string | undefined,
    newPricehour: number | undefined,
    newPriceday: number | undefined,
    newDeposit: number | undefined,
    newType: string | null
  ) {
    try {
      const { data, error } = await supabaseClient
        .from('Gear')
        .update({
          name: newName,
          description: newDescription,
          price_hr: newPricehour,
          price_day: newPriceday,
          deposit: newDeposit,
          type: newType,
        })
        .eq('id', id);
      if (error) throw new Error(`Couldn't update gear info`);
      console.log(error);
      return data;
    } catch (e: any) {
      console.log(e);
    }
  },

  startRentalContract: async function (
    gear_id: string | undefined,
    owner_id: string,
    renter_id: string,
    start_date: Date,
    end_date: Date,
    rental_duration_days: number
  ) {
    try {
      const { data, error } = await supabaseClient
        .from('RentalContracts')
        .insert({
          is_active: true,
          gear_id: gear_id,
          owner_id: owner_id,
          renter_id: renter_id,
          rental_start: start_date,
          rental_end: end_date,
          rental_duration_days: rental_duration_days,
          deposit: 100,
          rental_price: 120,
          location: '41.3950027,2.1977311',
        })
        .select();

      if (error) {
        throw error;
      }
      //console.log('data returned by startRentalContract', data);
      return data;
    } catch (e: any) {
      console.log(e, 'Cannot create a new rental contract');
    }
  },

  getContractsByRenterId: async function (renter_id: string | undefined) {
    try {
      const { data, error } = await supabaseClient
        .from('RentalContracts')
        .select('*, Gear!RentalContracts_gear_id_fkey(*)')
        .eq('renter_id', renter_id);
      if (error) {
        throw error;
      }
      //console.log('data returned by startRentalContract', data);
      return data;
    } catch (e: any) {
      console.log(e, 'Cannot find contracts in the db');
    }
  },
  getContractsByContractId: async function (
    rentalContract_id: string | undefined
  ) {
    try {
      const { data, error } = await supabaseClient
        .from('RentalContracts')
        .select('*, Gear!RentalContracts_gear_id_fkey(*)')
        .eq('id', rentalContract_id);
      if (error) {
        throw error;
      }
      //console.log('data returned by RentalContracts', data);
      return data;
    } catch (e: any) {
      console.log(e, 'Cannot find contracts in the db');
    }
  },
  getAvailabilityByGearId: async function (gear_id: string | undefined) {
    try {
      const { data, error } = await supabaseClient
        .from('GearAvailability')
        .select('*, Gear!GearAvailability_gear_id_fkey(*)')
        .eq('gear_id', gear_id);
      if (error) {
        throw error;
      }
      return data;
    } catch (e: any) {
      console.log(e, 'Cannot find availability in the db');
    }
  },
  getLocationByGearId: async function (id: string) {
    try {
      const { data, error } = await supabaseClient
        .from('Gear')
        .select('location')
        .eq('id', id);
      if (error) {
        throw error;
      }
      return data[0]?.location;
    } catch (e: any) {
      console.log(e, 'Cannot find location in the db');
    }
  },

  deleteRental: async function deleteRental(id: string) {
    try {
      const { data, error } = await supabaseClient
        .from('RentalContracts')
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
};
