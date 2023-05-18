import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch} from '../../Redux/store';
import NavBar from '../home/NavBar';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase, supabaseClient } from '../../services/supabase.service';
import { format } from 'date-fns';
import { Rental } from '../../types/rental.type';
import { deleteRental } from '../../Redux/UserSlice';

const CurrentRental: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);
  const { rental_id } = useParams();
  const { activeRentals } = userInfo;
  const [gearImages, setGearImages] = useState<any[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate()

  const CDNURL = 'https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/gearImagesBucket/';

  const currentRentalInfo = activeRentals.find(
    ({ id }: { id: string }) => id === rental_id
  );

  const totalPaid =
    currentRentalInfo?.rental_price *
      (currentRentalInfo?.rental_duration_days === 0
        ? '1'
        : currentRentalInfo?.rental_duration_days) +
    currentRentalInfo?.deposit;

  async function getGearImages() {
    try {
      const { data, error } = await supabaseClient.storage
        .from('gearImagesBucket')
        .list(
          `${currentRentalInfo.owner_id}/gear/${currentRentalInfo.gear_id}`,
          {
            limit: 4,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
          }
        );

      if (error) console.log('ERROR IN IMAGE FETCH ==> ', error);

      if (data !== null) {
        setGearImages(data);
      }
    } catch (e: any) {
      console.log(e, 'Error getting gear images');
    }
  }

  useEffect(() => {
    getGearImages();
  }, []);

  const handleDelete = (rental: Rental) => {
    supabase
      .deleteRental(rental.id as string)
      .then(() => {
        dispatch(deleteRental(rental.id));
        navigate(`/home`);
      })
      .catch((error) => {
        alert('Error: ' + error);
      });
  };

  return (
    <>
      <NavBar></NavBar>
      {currentRentalInfo && (
        <div className='component-container font-sans'>
          <div className='bg-white'>
            <div className='pt-6'>
              <div
                id='image-track'
                style={{
                  display: 'flex',
                  gap: '4vmin',
                  transform: 'translate(7%, 0%)',
                }}
              >
                {gearImages?.map((image, index) => {
                  return (
                    <div
                      key={image.name}
                      className='aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block'
                    >
                      <img
                        src={
                          CDNURL +
                          currentRentalInfo.owner_id +
                          '/gear/' +
                          currentRentalInfo.gear_id +
                          '/' +
                          image.name
                        }
                        alt=''
                        className='h-full w-full object-cover object-center'
                        style={{
                          width: '40vmin',
                          height: '56vmin',
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className=' ml-28 px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16'>
                <div className='ml-0 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
                  <span className='mb-10 self-center text-xl font-semibold whitespace-nowrap dark:text-white leading-loose'>
                    Your active rental:
                  </span>
                  <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-10 mt-5 '>
                    {currentRentalInfo?.Gear?.name}
                  </h1>
                  <div>
                    <div className='space-y-10'>
                      <p className='text-base text-gray-900'>
                        Starts{' '}
                        {format(
                          new Date(currentRentalInfo.rental_start),
                          'EEEE, LLL do'
                        )}{' '}
                        | Ends{' '}
                        {format(
                          new Date(currentRentalInfo.rental_end),
                          'EEEE, LLL do'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='ml-100 mt-4 lg:row-span-3 lg:mt-0'>
                  <h2 className='sr-only'>Product information</h2>
                  <h5 className='text-3xl tracking-tight text-gray-900 leading-relaxed'>
                    Price/day: €{currentRentalInfo?.rental_price}
                    <br></br>
                    Rental Days:{' '}
                    {currentRentalInfo?.rental_duration_days === 0
                      ? '1'
                      : currentRentalInfo?.rental_duration_days}
                    <br></br>
                    Deposit: €{currentRentalInfo?.deposit} <br></br>
                    <br></br>
                  </h5>
                  <p className='text-base font-bold tracking-tight text-black-900'>
                    Total Paid: €{totalPaid}
                  </p>
                  <form className='mt-10'>
                    <button
                      type='button'
                      className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-400 px-8 py-3 text-base font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      onClick={() => handleDelete(currentRentalInfo)}
                    >
                      Cancel Rental
                    </button>
                  </form>
                </div>

                <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6'></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentRental;
