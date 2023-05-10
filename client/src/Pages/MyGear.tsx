import React from 'react';
import { useEffect, useState } from 'react';
import { Gear } from '../types/gear.type';
import { supabase } from '../services/supabase.service';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/home/NavBar';
import {useDispatch, useSelector} from "react-redux"
import { setAllGear,deleteGear } from '../Redux/GearSlice';
import { RootState, AppDispatch } from "../Redux/store"



const MyGear : React.FC = (): JSX.Element => {

  const dispatch: AppDispatch = useDispatch();
  const gear = useSelector((state: RootState) => state.Gear);
  const userInfo = useSelector((state: RootState) => state.User);
  const [filteredGear, setFilteredGear] = useState<any[]>([])

  useEffect(() => {
    setFilteredGear(gear!.filter((g: Gear) => g.owner_id === userInfo.profile.id))
    }, [gear])

  useEffect(() => {
    supabase.getGear().then((gear) => {
      dispatch(setAllGear(gear))
    })
  }, []);
  const navigate = useNavigate();

  const handleDelete = (gear:Gear) => {
      supabase.deleteGear(gear.id as string)
        .then(() => {
          dispatch(deleteGear(gear.id));
        })
        .catch((error:any) => {
          alert("Error: " + error);
        });

  };

   return (
    <>
    <NavBar></NavBar>
    <ul role="list" className="divide-y divide-gray-100 mx-12">
        {filteredGear && filteredGear.map((gear) => (
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
          type="button"
          onClick={() => handleDelete(gear)}
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
