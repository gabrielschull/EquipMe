import { useEffect, useContext, useState } from 'react';
import CurrentRental from '../Components/rentals/CurrentRental';
import NavBar from '../Components/home/NavBar';
import GearListings from '../Components/gear/GearListings';
import AddGear from './AddGear';
import Chat from '../Components/rentals/Chat';
import Payment from '../Components/rentals/Payment';
import GettingStarted from '../Components/auth/GettingStarted';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../services/supabase.service';
import { setActiveRentals } from '../Redux/UserSlice';
import { RootState } from '../Redux/store';
import CurrentRentalBanner from '../Components/rentals/CurrentRentalBanner';
// import EditUser from './EditUser';

const Home: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);

  console.log('Home.tsx', userInfo);

  return (
    <>

      <div className="component-container">
        <NavBar/>
        <GettingStarted/>
        {/* <CurrentRental></CurrentRental> */}
        <Chat/>
        <div style = {{paddingTop: "80px"}}>
        <GearListings/>
        </div>

      </div>
    </>
  );
};

export default Home;
