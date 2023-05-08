import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar: React.FC = (): JSX.Element => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleSaveClick = () => {
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };

  return (
    <div className="flex justify-center items-center h-screen h-64 max-w-fit mb-8">
      <div className="w-96 bg-white rounded-lg shadow-md p-4 m-8">
        <h2 className="text-lg font-bold mb-4">
          Select Start and End Dates and Times
        </h2>
        <div className="flex flex-col mb-4">
          <label className="text-sm mb-1" htmlFor="start-date-picker">
            Start Date and Time:
          </label>
          <DatePicker
            id="start-date-picker"
            selected={startDate}
            onChange={handleStartDateChange}
            showTimeSelect
            dateFormat="Pp"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1" htmlFor="end-date-picker">
            End Date and Time:
          </label>
          <DatePicker
            id="end-date-picker"
            selected={endDate}
            onChange={handleEndDateChange}
            showTimeSelect
            dateFormat="Pp"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
          onClick={handleSaveClick}
          disabled={!startDate || !endDate}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Calendar;
