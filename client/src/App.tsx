import './App.css';
import Home from './Components/home/Home';
import { useSession } from './Components/users/Session';
import NavBar from './Components/home/NavBar';
import { createContext, useContext } from 'react';
import { GearhubUserInfo } from './Components/users/Session';
import Login from './Components/auth/Login';

export const UserContext = createContext<GearhubUserInfo>({
  session: null,
  profile: null,
});

const App: React.FC = (): JSX.Element => {
  const gearhubUserInfo = useSession();
  const session = useContext(UserContext);

  return (
    <>
      <UserContext.Provider value={gearhubUserInfo}>
        <Login />
        <Home />
        <NavBar />
      </UserContext.Provider>
    </>
  );
};

export default App;
