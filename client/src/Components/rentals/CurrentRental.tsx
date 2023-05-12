import React, { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import NavBar from '../home/NavBar';
import { useParams } from 'react-router-dom';
import { supabaseClient } from '../../services/supabase.service';
import { format } from 'date-fns';

const product = {
  price: '$200',
  href: '#',
};
// const reviews = { href: '#', average: 4, totalCount: 117 };

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const CurrentRental: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);
  const { rental_id } = useParams();
  const { activeRentals } = userInfo;
  const [gearImages, setGearImages] = useState<any[]>([]);
  const CDNURL =
    'https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/gearImagesBucket/';

  // console.log('rental contract id=', rental_id);
  // console.log('activeRentals=', activeRentals);
  const currentRentalInfo = activeRentals.find(
    ({ id }: { id: string }) => id === rental_id
  );

  // console.log('🇬🇧 currentRentalInfo', currentRentalInfo);

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
        // console.log('🇬🇧 Images received', data);
        setGearImages(data);
        // console.log('🇬🇧 gearImages', gearImages);
      }
    } catch (e: any) {
      console.log(e, 'Error getting gear images');
    }
  }

  useEffect(() => {
    getGearImages();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      {currentRentalInfo && (
        <div className='component-container'>
          <div className='bg-white'>
            <div className='pt-6'>
              {/* <nav aria-label='Breadcrumb'>
              <ol
                role='list'
                className='mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8'
              >
                {product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className='flex items-center'>
                      <a
                        href={breadcrumb.href}
                        className='mr-2 text-sm font-medium text-gray-900'
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox='0 0 16 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='h-5 w-4 text-gray-300'
                      >
                        <path d='M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z' />
                      </svg>
                    </div>
                  </li>
                ))}
                <li className='text-sm'>
                  <a
                    href={product.href}
                    aria-current='page'
                    className='font-medium text-gray-500 hover:text-gray-600'
                  >
                    {product.name}
                  </a>
                </li>
              </ol>
            </nav> */}

              {/* Image gallery */}
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

              {/* Product info */}
              <div className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16'>
                <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
                  <span className='self-center text-lg font-semibold whitespace-nowrap dark:text-white'>
                    Your active rental:
                  </span>
                  <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                    {currentRentalInfo?.Gear?.name}
                  </h1>
                </div>

                {/* Options */}
                <div className='mt-4 lg:row-span-3 lg:mt-0'>
                  <h2 className='sr-only'>Product information</h2>
                  <p className='text-3xl tracking-tight text-gray-900'>
                    Paid: {product.price}
                  </p>

                  {/* Reviews */}
                  {/* <div className='mt-6'>
                  <h3 className='sr-only'>Reviews</h3>
                  <div className='flex items-center'>
                    <div className='flex items-center'>
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating
                              ? 'text-gray-900'
                              : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden='true'
                        />
                      ))}
                    </div>
                    <p className='sr-only'>{reviews.average} out of 5 stars</p>
                    <a
                      href={reviews.href}
                      className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      {reviews.totalCount} reviews
                    </a>
                  </div>
                </div> */}

                  <form className='mt-10'>
                    <button
                      type='submit'
                      className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      Contact Gear Owner
                    </button>
                  </form>
                </div>

                <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6'>
                  {/* Description and details */}
                  <div>
                    <h3 className='sr-only'>Description</h3>

                    <div className='space-y-6'>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentRental;
