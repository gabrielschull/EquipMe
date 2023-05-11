import { useEffect, useContext } from 'react';
import CurrentRental from '../Components/rentals/CurrentRental';
import NavBar from '../Components/home/NavBar';
import GearListings from '../Components/gear/GearListings';
import AddGear from './AddGear';
import Chat from '../Components/rentals/Chat';
import Payment from '../Components/rentals/Payment';
import GettingStarted from '../Components/auth/GettingStarted';
// import EditUser from './EditUser';

const Home: React.FC = (): JSX.Element => {


  return (
    <>
      <div className="component-container">
        <NavBar/>
        <GettingStarted/>
        {/* <CurrentRental></CurrentRental> */}
        <Chat/>
        <GearListings/>
      </div>
    </>
  );
};

export default Home;
