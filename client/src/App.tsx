import './App.css';
import { BrowserRouter as Router, Routes, Route}
from 'react-router-dom';
import Home from './Pages/Home';
import { useSession } from './Components/users/UseSession';
import NavBar from './Components/home/NavBar';
import { createContext } from 'react';
import { GearhubUserInfo } from './Components/users/UseSession';
import Login from './Components/auth/Login';
import GearDetailsPage from './Pages/GearDetails';
import MyGear from './Components/gear/MyGear';
import LandingPage from './Pages/LandingPage';


export const UserContext = createContext<GearhubUserInfo>({
  session: null,
  profile: null,
});

const App: React.FC = (): JSX.Element => {
  const gearhubUserInfo = useSession();

  return (
    <>
    <UserContext.Provider value={gearhubUserInfo}>
    <Router>
      <Routes>
       <Route path = '/login' element = {<Login />}/>
       <Route path = '/home' element = {<Home />}/>
       <Route path = '/landingpage' element = {<LandingPage />}/>
       <Route path = '/geardetails' element = {<GearDetailsPage />}/>
       <Route path = '/mygear' element = {<MyGear />}/>
      </Routes>
      </Router>
      </UserContext.Provider>
    </>
  );
};

export default App;