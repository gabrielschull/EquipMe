import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/store';
import { setAllGear } from '../Redux/GearSlice';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase.service';
import { Gear } from '../types/gear.type';
import NavBar from '../Components/home/NavBar';
import { format } from 'date-fns';

const Rentals: React.FC = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const gear = useSelector((state: RootState) => state.Gear);
  const userInfo = useSelector((state: RootState) => state.User);
  const { activeRentals } = userInfo;
  console.log('🚂 Rentals.tsx > userInfo=', userInfo);
  console.log('🚂 Rentals.tsx > activeRentals.length=', activeRentals.length);

  const [gearImages, setGearImages] = useState<any[]>([]);

  const navigate = useNavigate();

  return (
    <div className='component-container'>
      <NavBar />
      <ul role='list' className='divide-y divide-gray-100 mx-12 '>
        {activeRentals?.map((rental: any) => (
          <li key={rental.id} className='flex justify-between gap-x-6 py-5'>
            <div className='flex gap-x-4'>
              <div className='min-w-0 flex-auto'>
                <p className='text-sm font-semibold leading-6 text-gray-900'>
                  {rental.Gear.name}
                </p>
                <p className='text-sm font-semibold leading-6 text-gray-900'>
                  {rental.Gear.description}
                </p>
                <p className='text-base text-gray-900'>
                  Starts {format(new Date(rental.rental_start), 'EEEE, LLL do')}{' '}
                  | Ends {format(new Date(rental.rental_end), 'EEEE, LLL do')}
                </p>
              </div>
            </div>
            <div className='hidden sm:flex sm:flex-col sm:items-end'>
              <form className='mt-10'>
                <button
                  style={{
                    height: '80px',
                    width: '200px',
                    whiteSpace: 'nowrap',
                  }}
                  type='submit'
                  onClick={() =>
                    navigate(`/rentals/${rental.id}`, { state: { gear } })
                  }
                  className='bg-white hover:bg-gray-100 text-black font-semibold py-2 px-3  rounded shadow border-transparent'
                >
                  See more details
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rentals;
