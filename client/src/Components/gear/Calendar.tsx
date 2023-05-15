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


  const [availableDates, setAvailableDates] = useState<any>([]);

  const handleAvailableDates = () => {
    const indexToUpd = gearInfo.findIndex((gear) => gear.id === id);
    const dateArr: Date[] = [];

    gearInfo[indexToUpd]?.availableDates?.forEach((element: any) =>
      dateArr?.push(new Date(element.date_available))
    );
    setAvailableDates(dateArr);
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
    if (location.pathname !== '/addgear') handleAvailableDates();
  }, []);

  return (
    <div>
      <div className='w-96 bg-white rounded-lg shadow-md p-2 m-2'>
        <h2 className='text-lg font-bold mb-4'>Select Start and End dates</h2>
        <div className='flex flex-col mb-4'>
          <label className='text-sm mb-1' htmlFor='start-date-picker'>
            Start:
          </label>
          {location.pathname == '/addgear' ? (
            <DatePicker
              dateFormat='yyyy/MM/dd'
              id='start-date-picker'
              selected={startDate}
              includeDateIntervals={[
                { start: new Date(), end: addDays(new Date(), 90) },
              ]}
              onChange={handleStartDateChange}
              className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              inline
            />
          ) : (
            <DatePicker
              dateFormat='yyyy/MM/dd'
              id='start-date-picker'
              selected={rentalStartDate}
              includeDates={availableDates ? availableDates : ''}
              onChange={handleStartDateChange}
              className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              inline
            />
          )}
        </div>
        <div className='flex flex-col'>
          <label className='text-sm mb-1' htmlFor='end-date-picker'>
            End:
          </label>
          {location.pathname == '/addgear' ? (
            <DatePicker
              dateFormat='yyyy/MM/dd'
              id='start-date-picker'
              selected={endDate}
              includeDateIntervals={[
                { start: new Date(), end: addDays(new Date(), 90) },
              ]}
              onChange={handleEndDateChange}
              className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              inline
            />
          ) : (
            <DatePicker
              dateFormat='yyyy/MM/dd'
              id='start-date-picker'
              selected={rentalEndDate}
              includeDates={availableDates ? availableDates : ''}
              onChange={handleEndDateChange}
              className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              inline
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
