import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { useEffect } from 'react';
import { supabase } from '../../services/supabase.service';
import { setActiveRentals } from '../../Redux/UserSlice';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const CurrentRentalBanner: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);
  // const navigate = useNavigate();
  console.log('CurrentRentalBanner.tsx', userInfo);

  return (
    <>
      <div>
        {userInfo?.activeRentals?.map((rental: any) => {
          return (
            <>
              <div
                id='marketing-banner'
                // tabIndex='-1'
                className='m-2 flex-col md:flex-row justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600 ml-14 mb-8'
              >
                <div className='flex flex-col items-start mb-3 mr-4 md:items-center md:flex-row md:mb-0'>
                  <div className='flex items-center mb-2 border-gray-200 md:pr-4 md:mr-4 md:border-r md:mb-0 dark:border-gray-600'>
                    <img
                      src='https://flowbite.com/docs/images/logo.svg'
                      className='h-6 mr-2'
                      alt='Flowbite Logo'
                    />
                    <span className='self-center text-lg font-semibold whitespace-nowrap dark:text-white'>
                      Your active rental: {rental.Gear.name}
                    </span>
                  </div>
                  <p className='flex items-center text-sm font-normal text-gray-500 dark:text-gray-400'>
                    Starts{' '}
                    {format(new Date(rental.rental_start), 'EEEE, LLL do')} |
                    Ends {format(new Date(rental.rental_end), 'EEEE, LLL do')}
                  </p>
                </div>
                <div className='flex items-center flex-shrink-0'>
                  <Link to={rental.id}>
                    <a
                      href='#'
                      className='px-5 py-2 mr-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-10'
                    >
                      See details
                    </a>
                  </Link>
                  {/* <button
                    data-dismiss-target='#marketing-banner'
                    type='button'
                    className='top-2.5 right-2.5 md:relative md:top-auto md:right-auto flex-shrink-0 inline-flex justify-center items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    <svg
                      aria-hidden='true'
                      className='w-4 h-4'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clip-rule='evenodd'
                      ></path>
                    </svg>
                    <span className='sr-only'>Close banner</span>
                  </button> */}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CurrentRentalBanner;
