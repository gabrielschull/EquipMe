import React, {useEffect, useState} from 'react';
import './App.css';
import Home from './Components/home/Home';
import { createClient } from "@supabase/supabase-js";
import { Database } from './types/supabase'
import {User} from './types/user.type';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

const supabase = createClient<Database>(process.env.REACT_APP_SUPABASE_URL!, process.env.REACT_APP_SUPABASE_ANON_KEY!,);


// type UsersResponse = Awaited<ReturnType<typeof getUsers>>
// export type UsersResponseSuccess = UsersResponse['data']
// export type UsersResponseError = UsersResponse['error']

const App: React.FC = ():JSX.Element => {
  const [users, setUsers] = useState<User[]>()
  
  async function getUsers() {
    
    let data = await supabase.from('Users').select()
    console.log("hello")
    if (data && data.data) {
    setUsers(data.data);
    console.log(data)
    }
  }
  

  
  useEffect(() => {
    getUsers();
  }, []);
  
  
  return (
    <>
    <ul>
      
        {users && users.map((user) => (
          <li key={user.first_name}>{user.last_name}</li>
        ))}
      </ul>
    <Home/>
    </>
  );
}

export default App;
