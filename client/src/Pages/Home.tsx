import NavBar from '../Components/home/NavBar';
import GearListings from '../Components/gear/GearListings';
import GettingStarted from '../Components/auth/GettingStarted';
import CurrentRentalBanner from '../Components/rentals/CurrentRentalBanner';

const Home: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="component-container">
        <NavBar />
        <CurrentRentalBanner></CurrentRentalBanner>
        <GettingStarted />
        <div style={{ paddingTop: '80px' }}>
          <GearListings />
        </div>
      </div>
    </>
  );
};

export default Home;
