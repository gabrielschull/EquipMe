import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { supabase } from '../../services/supabase.service';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../Redux/store';
import { setAllGear } from '../../Redux/GearSlice';

const Calendar: React.FC<any> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  rentalStartDate,
  setRentalStartDate,
  rentalEndDate,
  setRentalEndDate,
  gearAvailableDates,
}): JSX.Element => {
  const gearInfo = useSelector((state: RootState) => state.Gear);
  const { id } = useParams();

  // console.log('🐆 Calendar >>> availableDates', availableDates);
  const dispatch: AppDispatch = useDispatch();

  // const handleAvailableDates = () => {
  // const gear = gearInfo.find((gear) => gear.id === id);
  // console.log('🐆 Calendar >>> gear', gear);

  // }
  // setAvailableDates(dateArr);
  // };

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
    // if (location.pathname !== '/addgear') handleAvailableDates();
    console.log('Calendar, gearAvailableDates', gearAvailableDates);
  }, [gearAvailableDates]);

  return (
    <div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-white rounded-lg shadow-md p-2'>
          <h2 className='text-lg font-bold mb-4'>Select Start Date</h2>
          {location.pathname === '/addgear' ? (
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
              includeDates={gearAvailableDates}
              onChange={handleStartDateChange}
              className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 items-center'
              inline
            />
          )}
        </div>
        <div className='bg-white rounded-lg shadow-md p-2 items-center'>
          <h2 className='text-lg font-bold mb-4'>Select End Date</h2>
          {location.pathname === '/addgear' ? (
            <DatePicker
              dateFormat='yyyy/MM/dd'
              id='end-date-picker'
              selected={endDate}
              includeDateIntervals={[
                { start: new Date(), end: addDays(new Date(), 90) },
              ]}
              onChange={handleEndDateChange}
              className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 items-center'
              inline
            />
          ) : (
            <DatePicker
              dateFormat='yyyy/MM/dd'
              id='end-date-picker'
              selected={rentalEndDate}
              includeDates={gearAvailableDates}
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
