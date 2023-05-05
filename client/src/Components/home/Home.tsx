import React from 'react';
import CurrentRental from '../rentals/CurrentRental';
import NavBar from './NavBar';
import GearListings from '../gear/GearListings';

const Home: React.FC = (): JSX.Element => {
  return (
    <div className='component-container'>
      <h2>Home</h2>
      <NavBar></NavBar>
      <CurrentRental></CurrentRental>
      <GearListings></GearListings>
    </div>
  );
};

export default Home;
