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
import { Provider, useDispatch } from 'react-redux';
import { store } from './Redux/store';
import { initialState } from './Redux/UserSlice';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from './Redux/store';
import { useEffect } from 'react';
import { useSession } from './Components/users/UseSession';
import CurrentRentalBanner from './Components/rentals/CurrentRentalBanner';
import CurrentRental from './Components/rentals/CurrentRental';
import Rentals from './Pages/Rentals';
import PaymentSuccessful from './Components/payments/PaymentSuccessful';
import PaymentCanceled from './Components/payments/PaymentCanceled';
import { supabase } from './services/supabase.service';
import { setAllGear } from './Redux/GearSlice';
import { deleteRental } from './Redux/rentalSlice';
import {
  UserSlice,
  setActiveRentals,
  setUserInfo,
} from "./Redux/UserSlice"
 import Chat from './Components/rentals/Chat';


const App: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (userInfo.profile?.id) {
      const fetchData = async () => {
        const gear = await supabase.getGear();
        const contracts = await supabase.getContractsByRenterId(
          userInfo.profile.id
        );

        dispatch(setAllGear(gear));
        dispatch(setActiveRentals(contracts));

        console.log('🍆 MyGear gear=', gear);
        console.log('🐷 UseSession.tsx > getContractsOnRender', contracts);
      };

      fetchData();
    }
  }, []);

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
          <Route path='/rentals/' element={<Rentals />} />
          <Route path='/rentals/:rental_id' element={<CurrentRental />} />
          <Route path='/addgear' element={<AddGear />} />
          <Route path='/myprofile' element={<UserProfile />} />
          <Route path='/edituser' element={<EditUser />} />

          <Route path='/calendar' element={<Calendar />} />
          <Route path='/test' element={<CurrentRental />} />

          {/* <Route path='/stripe' element={<Stripe />} /> */}
          <Route path='/paymentsuccessful' element={<PaymentSuccessful />} />
          <Route path='/paymentcanceled' element={<PaymentCanceled />} />
        </>
      </Routes>
      {/* <Chat /> */}
    </Router>
  );


};

export default App;
