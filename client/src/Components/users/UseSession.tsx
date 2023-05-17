import { Session } from '@supabase/supabase-js';
import { useEffect } from 'react';
import { supabase, supabaseClient } from '../../services/supabase.service';
import { User } from '../../types/user.type';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveRentals, setUserInfo } from '../../Redux/UserSlice';
import { RootState, AppDispatch } from '../../Redux/store';

export interface GearhubUserInfo {
  session: Session | null;
  profile: User | null | undefined;
}

export function useSession(): GearhubUserInfo {
  const dispatch: AppDispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.User);

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
  };

  // get active contracts
  const getContractsOnRender = async () => {
    const data = await supabase.getContractsByRenterId(userInfo.profile.id);
    console.log('🐷 UseSession.tsx > getContractsOnRender', data);
    dispatch(setActiveRentals(data));
  };

  useEffect(() => {
    console.log('🐷 are we here?');
    supabaseClient.auth.getSession().then(async ({ data: { session } }) => {
      console.log(session);
      dispatch(setUserInfo({ ...userInfo, session }));
      supabaseClient
        .from('Users')
        .select()
        .eq('id', session?.user?.id)
        .single()
        .then((userData: any) =>
          dispatch(setUserInfo({ session, profile: userData.data }))
        );
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

  return userInfo;
}
