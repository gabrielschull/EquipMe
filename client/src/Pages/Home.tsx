import React from 'react';
import CurrentRental from '../Components/rentals/CurrentRental';
import NavBar from '../Components/home/NavBar';
import GearListings from '../Components/gear/GearListings';
import AddGear from '../Components/gear/AddGear';
import Chat from '../Components/rentals/Chat';
import Payment from '../Components/rentals/Payment';
// import EditUser from './EditUser';

const Home: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="component-container">
        <NavBar></NavBar>
        {/* <CurrentRental></CurrentRental> */}
        <Chat></Chat>
        <GearListings></GearListings>
        <AddGear></AddGear>
      </div>
    </>
  );
};

export default Home;
