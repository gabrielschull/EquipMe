import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/store';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/home/NavBar';
import { format } from 'date-fns';

const Rentals: React.FC = (): JSX.Element => {
  const gear = useSelector((state: RootState) => state.Gear);
  const userInfo = useSelector((state: RootState) => state.User);
  const { activeRentals } = userInfo;
  const navigate = useNavigate();

  return (
    <div className='component-container'>
      <NavBar />
      <ul role='list' className='divide-y divide-gray-100 mx-12 ml-14'>
        {activeRentals?.map((rental: any) => (
          <li key={rental.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4 shadow-md w-full">
              <div className="min-w-0 flex-auto ">
                <p className="text-sm font-semibold text-black mb-4 ml-10">
                  {rental.Gear.name}
                </p>
                <p className='text-base text-indigo-400 leading-relaxed mb-4 ml-10'>
                  Starts {format(new Date(rental.rental_start), 'EEEE, LLL do')}{' '}
                  | Ends {format(new Date(rental.rental_end), 'EEEE, LLL do')}
                </p>

                <p className='mt-1 truncate text-s leading-5 text-gray-800 mb-4 ml-10'>
                  Price: €{rental.Gear.price_day}/ Day
                </p>
                <p className='mt-1 truncate text-s mb-4 leading-5 text-gray-800 ml-10'>
                  Deposit: €{rental.Gear.deposit}
                </p>
                <p className='mt-1 truncate text-s mb-4 leading-5 text-gray-800 ml-10'>
                  Type: {rental.Gear.type}
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
                  className='border-transparent bg-white hover:bg-indigo-400 hover:text-white text-black font-semibold rounded shadow border border-gray-300 focus:ring-offset-2font-semibold py-2 px-3'
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
