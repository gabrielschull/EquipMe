import React, {useEffect, useState} from 'react';
import './App.css';
import Home from './Components/home/Home';
import { createClient } from "@supabase/supabase-js";
import {User} from './types/user.type';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!,);

async function getUsers() {
  const { data } = await supabase.from("Users").select();
  console.log(data)
  //setUsers(data);
}


const App: React.FC = ():JSX.Element => {
  const [user, setUsers] = useState<Array<User>>([])
  
  useEffect(() => {
    getUsers();
  }, []);
  
  
  return (
    <>
    {/* <ul>
        {Users.map((user) => (
          <li key={user.first_name}>{user.first_name}</li>
        ))}
      </ul> */}
    <Home/>
    </>
  );
}

export default App;
