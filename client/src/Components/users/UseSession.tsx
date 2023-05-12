// import { RealtimeChannel, Session } from '@supabase/supabase-js';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase, supabaseClient } from '../../services/supabase.service';
import { User } from '../../types/user.type';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserSlice,
  setActiveRentals,
  setUserInfo,
} from '../../Redux/UserSlice';
import { RootState, AppDispatch } from '../../Redux/store';

export interface GearhubUserInfo {
  session: Session | null;
  profile: User | null | undefined;
}

export function useSession(): GearhubUserInfo {
  const dispatch: AppDispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.User);

  // const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  const createFirstTimeUser = async (
    authID: string | undefined,
    authEmail: string | undefined,
    first_name: string | undefined,
    last_name: string | undefined
  ) => {
    const { error } = await supabaseClient.from('Users').insert({
      id: authID,
      email: authEmail,
      first_name: first_name,
      last_name: last_name,
    });
    // console.log('Error insterting new user into the database!', error);
  };

  useEffect(() => {
    supabaseClient.auth.getSession().then(async ({ data: { session } }) => {
      console.log(session);
      dispatch(setUserInfo({ ...userInfo, session }));
      // supabaseClient.auth.onAuthStateChange((event: any, session: any) => {
      //   console.log("EVENT == > ", event,"\nSession == > ", session)
      // });

      // if user exists in Users db, get their profile
      supabaseClient
        .from('Users')
        .select()
        .eq('id', session?.user?.id)
        .single()
        .then((userData: any) =>
          dispatch(setUserInfo({ session, profile: userData.data }))
        );

      // get active contracts
      const getContractsOnRender = async () => {
        const data = await supabase.getContractsByRenterId(userInfo.profile.id);
        dispatch(setActiveRentals(data));
      };

      await getContractsOnRender();

      // is user is not in Users db, create them
      if (!userInfo.profile?.id) {
        // split the full name from Google into first & last name
        const fullName = session?.user?.identities
          ?.at(0)
          ?.identity_data?.full_name?.split(' ');
        createFirstTimeUser(
          session?.user?.id,
          session?.user?.email,
          fullName[0],
          fullName[1]
        );

        // and get it from the db again
        supabaseClient
          .from('Users')
          .select()
          .eq('id', session?.user?.id)
          .single()
          .then((userData: any) =>
            dispatch(setUserInfo({ session, profile: userData.data }))
          );
      }
    });
  }, []);

  // useEffect(() => {
  //   if (userInfo.session?.user && !userInfo.profile) {
  //     listenToUserProfileChanges(userInfo.session.user.id).then(
  //       (newChannel) => {
  //         if (channel) {
  //           channel.unsubscribe();
  //         }
  //         setChannel(newChannel);
  //       }
  //     );
  //   } else if (!userInfo.session?.user) {
  //     channel?.unsubscribe();
  //     setChannel(null);
  //   }
  // }, [userInfo.session]);

  // async function listenToUserProfileChanges(userId: string) {
  //   const { data } = await supabaseClient
  //     .from('user_profiles')
  //     .select('*')
  //     .filter('user_id', 'eq', userId);
  //   if (data?.[0]) {
  //     setUserInfo({ ...userInfo, profile: data?.[0] });
  //   }
  //   return supabaseClient
  //     .channel(`public:user_profiles`)
  //     .on(
  //       'postgres_changes',
  //       {
  //         event: '*',
  //         schema: 'public',
  //         table: 'user_profiles',
  //         filter: `user_id=eq.${userId}`,
  //       },
  //       (payload: any) => {
  //         setUserInfo({ ...userInfo, profile: payload.new as UserProfile });
  //       }
  //     )
  //     .subscribe();
  // }

  return userInfo;
}