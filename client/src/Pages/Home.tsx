import React from 'react';
import CurrentRental from '../Components/rentals/CurrentRental';
import NavBar from '../Components/home/NavBar';
import GearListings from '../Components/gear/GearListings';
import AddGear from '../Components/gear/AddGear';
import UserProfile from '../Components/users/UserProfile';
import Chat from '../Components/rentals/Chat';
import Payment from '../Components/rentals/Payment';
import EditUser from '../Components/users/EditUser';

const Home: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="component-container">
        <h1>Home</h1>
        <NavBar></NavBar>
        {/* <CurrentRental></CurrentRental> */}
        <Chat></Chat>
        <GearListings></GearListings>
        <UserProfile></UserProfile>
        <EditUser></EditUser>
      </div>
    </>
  );
};

export default Home;
