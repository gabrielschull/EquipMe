import { useEffect, useContext, useState } from 'react';
import CurrentRental from '../Components/rentals/CurrentRental';
import NavBar from '../Components/home/NavBar';
import GearListings from '../Components/gear/GearListings';
import AddGear from './AddGear';
import Chat from '../Components/rentals/Chat';
import GettingStarted from '../Components/auth/GettingStarted';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../services/supabase.service';
import { setActiveRentals } from '../Redux/UserSlice';
import { setAllGear } from '../Redux/GearSlice';
import { RootState } from '../Redux/store';
import CurrentRentalBanner from '../Components/rentals/CurrentRentalBanner';
import Loading from '../Components/misc/Loading';
// import EditUser from './EditUser';

const Home: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);
  const dispatch = useDispatch()



  //console.log('Home.tsx', userInfo);

  return (
    <>
      <div className="component-container">
        <NavBar/>
        {/* <Loading></Loading> */}
        <CurrentRentalBanner></CurrentRentalBanner>
        <GettingStarted/>
        {/* <CurrentRental></CurrentRental> */}
        <div style = {{paddingTop: "80px"}}>
        <GearListings/>
        </div>
      </div>
    </>
  );
};

export default Home;
