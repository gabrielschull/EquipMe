import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import Home from './Pages/Home';
import Calendar from './Components/gear/Calendar';
import Login from './Components/auth/Login';
import GearDetailsPage from './Pages/GearDetails';
import MyGear from './Components/gear/MyGear';
import AddGear from './Pages/AddGear';
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
import CurrentRentalBanner from './Components/rentals/CurrentRentalBanner';
import CurrentRental from './Components/rentals/CurrentRental';

const App: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);
  const whatAmI = useSession();

  useEffect(() => {
    console.log('I AM IN HERE ==> ', whatAmI);
    console.log('🙋🏻 userInfo=', userInfo);
  }, [userInfo]);

  return (
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
              ) : userInfo.location ? (
                <Home />
              ) : (
                <Home />
              )
            }
          />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/geardetails/:id' element={<GearDetailsPage />} />
          <Route path='/mygear' element={<MyGear />} />
          <Route path='/editgear/:gearId' element={<EditGear />} />
          <Route path='/rentals/:contractId' element={<CurrentRental />} />
          <Route path='/addgear' element={<AddGear />} />
          <Route path='/myprofile' element={<UserProfile />} />
          <Route path='/edituser' element={<EditUser />} />

          <Route path='/calendar' element={<Calendar />} />
        </>
      </Routes>
    </Router>
  );
};

export default App;
