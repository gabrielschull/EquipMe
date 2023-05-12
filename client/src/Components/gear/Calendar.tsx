import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { supabase } from '../../services/supabase.service';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../Redux/store';

const Calendar: React.FC<any> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  rentalStartDate,
  setRentalStartDate,
  rentalEndDate,
  setRentalEndDate,
}): JSX.Element => {
  const gearInfo = useSelector((state: RootState) => state.Gear);
  const { id } = useParams();

  console.log('location.pathname=', location.pathname);

  const [unavailableDates, setUnavailableDates] = useState<any>([]);

  const handleUnavailableDates = () => {
    const indexToUpd = gearInfo.findIndex((gear) => gear.id === id);
    const dateArr: Date[] = [];
    gearInfo[indexToUpd].unavailableDates?.forEach((element) =>
      dateArr.push(new Date(element))
    );
    console.log('🖤', dateArr);
    setUnavailableDates(dateArr);
    console.log('🖤 unavailableDates STATE', unavailableDates);
  };

  const handleStartDateChange = (date: Date) => {
    if (location.pathname === '/addgear') {
      setStartDate(date);
    } else {
      setRentalStartDate(date);
    }
  };

  const handleEndDateChange = (date: Date) => {
    if (location.pathname === '/addgear') {
      setEndDate(date);
    } else {
      setRentalEndDate(date);
    }
  };

  useEffect(() => {
    handleUnavailableDates();
    // setUnavailableDates(gearInfo[indexToUpd].unavailableDates);
    // console.log(
    //   '!!! gearInfo in Calendar',
    //   gearInfo[indexToUpd].unavailableDates
    // );
  }, []);

  return (
    <div>
      <div className='w-96 bg-white rounded-lg shadow-md p-2 m-2'>
        <h2 className='text-lg font-bold mb-4'>Select Start and End dates</h2>
        <div className='flex flex-col mb-4'>
          <label className='text-sm mb-1' htmlFor='start-date-picker'>
            Start:
          </label>
          <DatePicker
            dateFormat='yyyy/MM/dd'
            id='start-date-picker'
            selected={
              location.pathname == '/addgear' ? startDate : rentalStartDate
            }
            excludeDates={unavailableDates}
            onChange={handleStartDateChange}
            className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            inline
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm mb-1' htmlFor='end-date-picker'>
            End:
          </label>
          <DatePicker
            dateFormat='yyyy/MM/dd'
            id='end-date-picker'
            excludeDates={unavailableDates}
            selected={location.pathname == '/addgear' ? endDate : rentalEndDate}
            onChange={handleEndDateChange}
            className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            inline
          />
        </div>
        {/* <button
          className='bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600'
          onClick={handleSaveClick}
          disabled={!startDate || !endDate}
        >
          Save
        </button> */}
      </div>
    </div>
  );
};

export default Calendar;
