import React from 'react';
import CurrentRental from '../rentals/CurrentRental';
import NavBar from './NavBar';
import GearListings from '../gear/GearListings';

const Home: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="component-container">
        <h1>Home</h1>
        <NavBar></NavBar>
        <CurrentRental></CurrentRental>
        <GearListings></GearListings>
      </div>
      <div>
        <p className="text-sm ...">The quick brown fox ...</p>
        <p className="text-base ...">The quick brown fox ...</p>
        <p className="text-lg ...">The quick brown fox ...</p>
        <p className="text-xl ...">The quick brown fox ...</p>
        <p className="text-2xl ...">The quick brown fox ...</p>
        <p className="text-9xl text-blue-800/50">The quick brown fox ...</p>
      </div>
    </>
  );
};

export default Home;
