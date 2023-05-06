// ⛔️⛔️⛔️ The commented lines in this component are just an example of how to render data from Supabase
import { useEffect, useState } from 'react';
import './App.css';
import Home from './Components/home/Home';
import { User } from './types/user.type';
import { supabase } from './services/supabase.service';

const App: React.FC = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    supabase.getUsers().then((users) => setUsers(users));
  }, []);

  return (
    <>
      <ul>
        {users &&
          users.map((user) => <li key={user.first_name}>{user.last_name}</li>)}
      </ul>
      <Home />
    </>
  );
};

export default App;
