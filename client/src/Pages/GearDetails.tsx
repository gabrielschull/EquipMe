import React, { useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import NavBar from '../Components/home/NavBar';
import Payment from '../Components/rentals/Payment';
import { useState } from 'react';
import {Carousel,initTE} from "tw-elements"

import { supabase, supabaseClient } from '../services/supabase.service';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import Calendar from '../Components/gear/Calendar';

const reviews = { href: '#', average: 4, totalCount: 117 };
const CDNURL =
  'https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/gearImagesBucket/';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const GearDetails: React.FC = (): JSX.Element => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [gearInfo, setGearInfo] = useState<any>([]);
  const [gearImages, setGearImages] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any>({});
  const userInfo = useSelector((state: RootState) => state.User);
  const [rentalStartDate, setRentalStartDate] = useState<Date>(new Date());
  const [rentalEndDate, setRentalEndDate] = useState<Date>(new Date());
  const location = useLocation();
  const gear = location.state?.gear;


  const { id } = useParams();

  const handleReservationClick = () => {
    supabase.startRentalContract(
      id,
      gearInfo.owner_id,
      userInfo.profile.id,
      rentalStartDate,
      rentalEndDate
    );
    setShowPaymentModal(true);
  };

  const handleSeeMoreDetails = async () => {
    const gearData = await supabase.getGearId(id);
    if (gearData && gearData.length > 0) {
      console.log('gearData -----> ', gearData);
      setGearInfo(gearData[0])
      const randomReviewCount = Math.floor(Math.random() * 101);
      setReviews({
        average: gearData[0].rating,
        totalCount: randomReviewCount,
        href: '#reviews'
      })
      return gearData;
    } else {
      console.log('Cannot find gear details');
    }
  };

  async function getGearImages() {
    try {
      const { data, error } = await supabaseClient.storage
        .from('gearImagesBucket')
        .list(`${gear.owner_id}/gear/${id}`, {
          limit: 4,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

      console.log(`${gear.owner_id}/gear/${id}`);

      if (error) console.log('ERROR IN IMAGE FETCH ==> ', error);

      if (data !== null) {
        console.log(data, 'YARRRR');
        setGearImages(data);
      }
    } catch (e: any) {
      console.log(e, 'Error getting gear images');
    }
  }

  useEffect(() => {
    handleSeeMoreDetails();
    getGearImages();
  }, []);

  gearImages.map((image) => console.log(image.name, 'IMGNAME'));

  return (
    <>
      <NavBar></NavBar>
      {gearInfo && (
        <div className="bg-white">
          <div className="pt-6">
            <div
              id="image-track"
              style={{
                display: 'flex',
                gap: '4vmin',
                transform: 'translate(7%, 0%)',
              }}>
              {gearImages.map((image) => {
                return (
                  <div
                    key={image.name}
                    className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                    <img
                      src={
                        CDNURL +
                        gear.owner_id +
                        '/gear/' +
                        id +
                        '/' +
                        image.name
                      }
                      alt=""
                      className="h-full w-full object-cover object-center"
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
            <div className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16'>
              <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
                <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                  {gearInfo.name}
                </h1>
              </div>
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <p className="text-3xl tracking-tight text-gray-900">
                  Price/day: €{gearInfo.price_day}
                </p>
                <p className="text-3xl tracking-tight text-gray-900">
                  Price/hr: €{gearInfo.price_hr}
                </p>
                <p className="text-3xl tracking-tight text-gray-900">
                  Deposit: €{gearInfo.deposit}
                </p>
                <div className="mt-6">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[1,2,3,4,5].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            gearInfo.rating >= rating
                              ? 'text-gray-900'
                              : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                    <a
                      href={reviews.href}
                      className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      {reviews.totalCount} reviews
                    </a>
                  </div>
                </div>
                <form className="mt-10">
                  <button
                    type="button"
                    onClick={handleReservationClick}
                    className="mt-10 flex w-full items-center justify-center bg-white hover:bg-gray-100 text-black font-semibold py-2 px-3  rounded shadow border-transparent">
                    Reserve this gear
                  </button>
                </form>
              </div>
              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                <div>
                  <h3 className="sr-only">Description</h3>
                  <div className="space-y-6 my-6">
                    <Calendar
                      rentalStartDate={rentalStartDate}
                      setRentalStartDate={setRentalStartDate}
                      rentalEndDate={rentalEndDate}
                      setRentalEndDate={setRentalEndDate}
                    />
                  </div>
                </div>
              </div>
            </div>
            {showPaymentModal && <Payment />}
          </div>
        </div>
      )}
    </>
  );
};

export default GearDetails;
