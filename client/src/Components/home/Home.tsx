import React from 'react';
import CurrentRental from '../rentals/CurrentRental';
import NavBar from './NavBar';
import GearListings from '../gear/GearListings';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import AddGear from '../gear/AddGear';
import GearDetails from '../gear/GearDetails';
import MyGear from '../gear/MyGear';
import EditGear from '../gear/EditGear';
import GettingStarted from '../auth/GettingStarted';

const Home: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="component-container">
        <h1>Home</h1>
         <NavBar></NavBar>
        <CurrentRental></CurrentRental>
        <Login></Login>
        <Signup></Signup>
        <GettingStarted></GettingStarted>
        <AddGear></AddGear>
        <GearListings></GearListings>
        <GearDetails></GearDetails>
        <MyGear></MyGear>
        <EditGear></EditGear>
      </div>

    </>
  );
};

export default Home;
