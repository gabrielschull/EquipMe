import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import logo from '../Assets/Logo.png';

const CurrentRentalBanner: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);

  return (
    <>
      <div className="overflow-y-auto max-h-[400px] mt-4 mb-6 shadow-lg">

      <div>
      {userInfo?.activeRentals?.map((rental: any) => {
        return (
          <>
          <div className="bg-indigo-400 text-white py-3 w-3/4 ml-48 mb-10 rounded">
           <h2 className="text-center text-lg">You're renting it!</h2>
          </div>
            <div
              id="marketing-banner"
              className="w-3/4 m-2 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600 ml-48 mb-8"
            >
              <div className="flex items-start justify-between p-4">
                <div className="flex items-center">
                  <img src={logo} className="rounded-full w-14 h-14" alt="Logo" />
                  <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white ml-10 text-gray-500">
                    {rental.Gear?.name}
                  </span>
                </div>
                <div className="flex items-center ">
                  <p className="text-s text-gray-500 dark:text-gray-400 mt-2">
                    <b className="m-9 text-lg">Starts</b>
                    {format(new Date(rental.rental_start), 'EEEE, LLL do')}
                    <b className="leading-8 m-8 text-lg">Ends</b> {format(new Date(rental.rental_end), 'EEEE, LLL do')}
                  </p>
                  <div className="flex items-center ml-4 mt-4">
                    <Link to={`/rentals/${rental.id}`}>
                      <a className="px-5 py-2 text-s font-medium text-black bg-whiterounded-lg hover:bg-indigo-400 hover:text-white focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-10 rounded">
                        See details
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  </div>
</>

  );
};

export default CurrentRentalBanner;
