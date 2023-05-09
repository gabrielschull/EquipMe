import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Components/auth/Login';
import GearDetailsPage from './Pages/GearDetails';
import MyGear from './Pages/MyGear';
import AddGear from './Pages/AddGear';
import LandingPage from './Pages/LandingPage';
import UserProfile from './Pages/UserProfile';
import EditUser from './Pages/EditUser';
import EditGear from './Pages/EditGear';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { initialState } from './Redux/UserSlice';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from './Redux/store';
import { useEffect } from 'react';
import { useSession } from './Components/users/UseSession';

const App: React.FC = (): JSX.Element => {
  useSession();
  const userInfo = useSelector((state: RootState) => state.User);
  useEffect(() => {
    console.log('🙋🏻 userInfo=', userInfo);
  }, [userInfo]);

  return (
    <>
      <Router>
        <Routes>
          <>
            <Route
              path='/'
              element={
                !userInfo.profile ? (
                  <Login />
                ) : !userInfo.profile.bio ||
                  !userInfo.profile.email ||
                  !userInfo.profile.first_name ||
                  !userInfo.profile.last_name ||
                  !userInfo.profile.phone ? (
                  <EditUser />
                ) : (
                  <LandingPage />
                )
              }
            />
            <Route path='/landingpage' element={<LandingPage />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/geardetails' element={<GearDetailsPage />} />
            <Route path='/mygear' element={<MyGear />} />
            <Route path='/editgear' element={<EditGear />} />
            <Route path='/addgear' element={<AddGear />} />
            <Route path='/myprofile' element={<UserProfile />} />
            <Route path='/edituser' element={<EditUser />} />
          </>
        </Routes>
      </Router>
    </>
  );
};

export default App;