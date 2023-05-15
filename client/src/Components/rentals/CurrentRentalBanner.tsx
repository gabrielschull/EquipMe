import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { useEffect } from 'react';
import { supabase } from '../../services/supabase.service';
import { setActiveRentals } from '../../Redux/UserSlice';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import logo from '../Assets/Logo.png';

const CurrentRentalBanner: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);
  // const navigate = useNavigate();
  //console.log('CurrentRentalBanner.tsx', userInfo);

  return (
    <>
      <div className="flex justify-center bg-blue-800 text-white py-3">
        <h2 className="text-xl font-semibold mb-2">CURRENT RENTALS LIST</h2>
      </div>
      <div className="overflow-y-auto max-h-[400px] mt-4 mb-6 shadow-lg">
        <div>
          {userInfo?.activeRentals?.map((rental: any) => {
            return (
              <>
                <div
                  id="marketing-banner"
                  // tabIndex='-1'
                  className="m-2 flex-col md:flex-row justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600 ml-14 mb-8">
                  <div className="flex flex-col items-start mb-3 mr-4 md:items-center md:flex-row md:mb-0">
                    <div className="flex items-center mb-2 border-gray-200 md:pr-4 md:mr-4 md:border-r md:mb-0 dark:border-gray-600">
                      <img
                        src={logo}
                        className="rounded-full w-[40px] h-[40px] mr-2"
                        alt="Logo"
                      />
                      <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white ml-4">
                        Your active rental: {rental.Gear?.name}
                      </span>
                    </div>
                    <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                      Starts{' '}
                      {format(new Date(rental.rental_start), 'EEEE, LLL do')} |
                      Ends {format(new Date(rental.rental_end), 'EEEE, LLL do')}
                    </p>
                  </div>
                  <div className="flex items-center flex-shrink-0">
                    <Link to={`/rentals/${rental.id}`}>
                      <a className="px-5 py-2 mr-8 ml-16 text-xs font-medium text-white bg-indigo-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-10">
                        See details
                      </a>
                    </Link>
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
