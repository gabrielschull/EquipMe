import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
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
  const { id } = useParams();
  console.log('location.pathname=', location.pathname);

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

  return (
    <div>
      <div className='w-96 bg-white rounded-lg shadow-md p-2 m-2'>
        <h2 className='text-lg font-bold mb-4'>
          Select Start and End Dates and Times
        </h2>
        <div className='flex flex-col mb-4'>
          <label className='text-sm mb-1' htmlFor='start-date-picker'>
            Start Date and Time:
          </label>
          <DatePicker
            dateFormat='yyyy/MM/dd'
            id='start-date-picker'
            selected={
              location.pathname == '/addgear' ? startDate : rentalStartDate
            }
            onChange={handleStartDateChange}
            className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm mb-1' htmlFor='end-date-picker'>
            End Date and Time:
          </label>
          <DatePicker
            dateFormat='yyyy/MM/dd'
            id='end-date-picker'
            selected={location.pathname == '/addgear' ? endDate : rentalEndDate}
            onChange={handleEndDateChange}
            className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
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
