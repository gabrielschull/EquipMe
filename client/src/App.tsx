import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate}
from 'react-router-dom';
import Home from './Pages/Home';
import { useSession } from './Components/users/UseSession';
import NavBar from './Components/home/NavBar';
import { createContext, useContext, useEffect } from 'react';
import { GearhubUserInfo } from './Components/users/UseSession';
import Login from './Components/auth/Login';
import GearDetailsPage from './Pages/GearDetails';
import MyGear from './Pages/MyGear';
import AddGear from './Pages/AddGear';
import LandingPage from './Pages/LandingPage';
import UserProfile from './Pages/UserProfile';
import EditUser from './Pages/EditUser';
import EditGear from './Pages/EditGear';

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
            <>
              <Route
                path='/'
                element={!gearhubUserInfo.profile ? <Login /> : <LandingPage />}
              />
              <Route path='/landingpage' element={<LandingPage />} />
              <Route path='/home' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/geardetails' element={<GearDetailsPage />} />
              <Route path='/mygear' element={<MyGear />} />
              <Route path='/editgear' element={<EditGear />} />
              <Route path='/addgear' element={<AddGear />} />
       <Route path = '/myprofile' element = {<UserProfile />}/>
       <Route path = '/edituser' element = {<EditUser />}/>
    </>
      </Routes>
      </Router>

      </UserContext.Provider>
    </>
  );
};

export default App;