import React, { useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import NavBar from '../Components/home/NavBar';
import { useState } from 'react';
import Chat from '../Components/rentals/Chat';
import { supabase, supabaseClient } from '../services/supabase.service';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import Calendar from '../Components/gear/Calendar';
import { setAvailableDates, setUnavailableDates } from '../Redux/GearSlice';
import { loadStripe } from '@stripe/stripe-js';
import { differenceInDays } from 'date-fns';
import { addOneNewRental, setActiveRentals } from '../Redux/UserSlice';

interface Conversation {
  id: string;
  member1: string;
  member2: string;
}

const CDNURL =
  'https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/gearImagesBucket/';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const randomReviewCount = Math.floor(Math.random() * 101);

const GearDetails: React.FC = (): JSX.Element => {
  const [gearImages, setGearImages] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any>({});
  const userInfo = useSelector((state: RootState) => state.User);
  const [rentalStartDate, setRentalStartDate] = useState<Date>(new Date());
  const [rentalEndDate, setRentalEndDate] = useState<Date>(new Date());
  const [gearAvailableDates, setGearAvailableDates] = useState<any>([]);
  const [conversationId, setConversationId] = useState<string | null>(null)
  const { id } = useParams();
  const gearInfo = useSelector((state: RootState) =>
    state.Gear.find((gear) => gear.id === id)
  );

  const dispatch: AppDispatch = useDispatch();
  const stripeAPIKey = process.env.REACT_APP_STRIPE_KEY!;

  const location = useLocation();
  // const gearInfo = location.state?.gear;

  const getGearAvailability = async () => {
    const gearAvailability = await supabase.getAvailabilityByGearId(id);
    // dispatch(setAvailableDates({ id, gearAvailability }));
    const dateArr: Date[] = [];
    // if (gear && gear.availableDates) {
    gearAvailability?.forEach((element: any) =>
      dateArr.push(new Date(element.date_available))
    );
    setGearAvailableDates(dateArr);
  };

  const rentalDays = differenceInDays(rentalEndDate, rentalStartDate);

  const handleReservationClick = async () => {
    const newContract = await supabase.startRentalContract(
      id,
      gearInfo?.owner_id as string,
      userInfo.profile.id,
      rentalStartDate,
      rentalEndDate,
      rentalDays
    );
    //   .then(() => {
    //     dispatch(setUnavailableDates({ id, rentalStartDate, rentalEndDate }));
    //   });
    // id &&
    //   supabase.calendarDeleteGearAvailability(
    //     id,
    //     rentalStartDate,
    //     rentalEndDate
    //   );
    makePayment();
    if (newContract) {
     dispatch(addOneNewRental(newContract[0]))}
  };

  const handleContactClick = async (ownerId: string, userId: string ) => {
    const id = await getOrCreateConversation(ownerId, userId);
    console.log("THIS SHOULD BE THE SAME ==> ", id)
    setConversationId(id)
  }

  async function getGearImages() {
    try {
      const { data, error } = await supabaseClient.storage
        .from('gearImagesBucket')
        .list(`${gearInfo?.owner_id}/gear/${id}`, {
          limit: 4,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

      if (error) console.log('ERROR IN IMAGE FETCH ==> ', error);

      if (data !== null) {
        setGearImages(data);
      }
    } catch (e: any) {
      console.log(e, 'Error getting gear images');
    }
  }

  useEffect(() => {
    console.log('GearDetails ID', id);
    console.log('GearDetails gearInfo', gearInfo);
    getGearImages();
    getGearAvailability();
  }, []);

  const makePayment = async () => {
    const stripe = await loadStripe(stripeAPIKey);
    const body = { gearInfo, rental_duration_days: rentalDays };
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      'http://localhost:8000/api/create-checkout-session',
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe!.redirectToCheckout({
      sessionId: session.id,
    });

    // if (result.error) {
    //   console.log(result?.error);
    // }
  };

  const getOrCreateConversation = async (ownerId: string, userId: string): Promise<string> => {
    const { data: existingConversation, error } = await supabaseClient
      .from('Conversations')
      .select('id')
      .or(`member1.eq.${ownerId},member2.eq.${ownerId}`)
      .or(`member1.eq.${userId},member2.eq.${userId}`)
      .single()

      console.log("LOOKIE HERE ==> ", existingConversation)

    if (existingConversation) {
      return existingConversation.id;
    }
    if (!existingConversation) {
    const { data: newConversation, error: insertError } = await supabaseClient
      .from('Conversations')
      .insert({
        member1: ownerId,
        member2: userId
      })
      .single() as {data: Conversation | null, error: Error | null};

    if (insertError || !newConversation) {
      console.error("Error creating conversation: ", insertError);
      return '';
    }
    return newConversation.id
  }
  console.log("reached final return in getOrCreateConversation (NOT GOOD)")
  return ''
  };

  return (
    <>
      <NavBar></NavBar>
      {gearInfo && (
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
              {gearImages?.map((image) => {
                return (
                  <div
                    key={image.name}
                    className='aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block'
                  >
                    <img
                      src={
                        CDNURL +
                        gearInfo.owner_id +
                        '/gear/' +
                        id +
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
            <div className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16 ml-14'>
              <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
                <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl ml-4 m-2'>
                  {gearInfo.name}
                </h1>
              </div>
              <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
                <h3 className='text-1xl tracking-tight text-gray-900 sm:text-2xl ml-3'>
                  {gearInfo.description}
                </h3>
              </div>

              <div className='mt-4 lg:row-span-3 lg:mt-0'>
                <p className='text-3xl tracking-tight text-gray-900'>
                  Price/day: €{gearInfo.price_day}
                </p>
                <p className='text-3xl tracking-tight text-gray-900'>
                  Price/hr: €{gearInfo.price_hr}
                </p>
                <p className='text-3xl tracking-tight text-gray-900'>
                  Deposit: €{gearInfo.deposit}
                </p>
                <div className='mt-6'>
                  <div className='flex items-center'>
                    <div className='flex items-center'>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            (gearInfo?.rating as number) >= rating
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
                      {randomReviewCount} reviews
                    </a>
                  </div>
                </div>
                <form className='mt-10'>
                  <button
                    type='button'
                    onClick={handleReservationClick}
                    className='mt-10 flex w-full items-center justify-center bg-white hover:bg-indigo-400 hover:text-white text-black font-semibold py-2 px-3  rounded shadow border-transparent'
                  >
                    Reserve this gear
                  </button>
                  <button onClick={() => handleContactClick(gearInfo.owner_id as string, userInfo.profile.id)}
                    type='button'
                    className='mt-10 flex w-full items-center justify-center bg-white hover:bg-indigo-400 hover:text-white text-black font-semibold py-2 px-3  rounded shadow border-transparent'
                  >
                    Contact Gear Owner
                  </button>
                </form>
                {conversationId && <Chat conversationId={conversationId} defaultOpen />}
              </div>
              <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6'>
                <div>
                  <h3 className='sr-only'>Description</h3>
                  <div className='space-y-6 my-6'>
                    <Calendar
                      gearAvailableDates={gearAvailableDates}
                      rentalStartDate={rentalStartDate}
                      setRentalStartDate={setRentalStartDate}
                      rentalEndDate={rentalEndDate}
                      setRentalEndDate={setRentalEndDate}
                    />
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

export default GearDetails;
