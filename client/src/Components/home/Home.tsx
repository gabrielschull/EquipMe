import React from 'react';
import CurrentRental from '../rentals/CurrentRental';
import NavBar from './NavBar';
import GearListings from '../gear/GearListings';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import AddGear from '../gear/AddGear';

const Home: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="component-container">
        <h1>Home</h1>
         <NavBar></NavBar>
        <CurrentRental></CurrentRental>
        {/* <GearListings></GearListings>  */}
        <Login></Login>
        <Signup></Signup>
        <AddGear></AddGear>
      </div>

    </>
  );
};

export default Home;
