import React from 'react';
import { useEffect, useState } from 'react';
import { Gear } from '../types/gear.type';
import { supabase } from '../services/supabase.service';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/home/NavBar';

const MyGear : React.FC = (): JSX.Element => {
  const [gear, setGear] = useState<Gear[]>();
  useEffect(() => {
    supabase.getGear().then((gear) => setGear(gear));
  }, []);
  const navigate = useNavigate();
   return (
    <>
    <NavBar></NavBar>
    <ul role="list" className="divide-y divide-gray-100 mx-12">
        {gear && gear.map((gear) => (
          <li key={gear.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={gear.imageUrl} alt="" /> */}
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{gear.description}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-800"> €{gear.price_hr} / hour</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-800">€{gear.price_day} / day</p>
              </div>
            </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          onClick={() => navigate(`/editgear`)}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Edit Gear
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Delete Gear
        </button>
      </div>
        </li>
      ))}
    </ul>
    </>
   )
    }

export default MyGear
