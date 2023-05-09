import React from 'react';
import { useEffect, useState } from 'react';
import  {Gear}  from "../../types/gear.type";
import { supabase } from '../../services/supabase.service';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { setAllGear } from '../../Redux/GearSlice';
import { RootState, AppDispatch } from "../../Redux/store"

const GearListings : React.FC = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const gear = useSelector((state: RootState) => state.Gear);
  const userInfo = useSelector ((state: RootState) => state.User);
  console.log("MYINFO", userInfo)
  console.log(gear, "GEAR, BITCH")

  useEffect(() => {
    supabase.getGear().then((gear) => {
      dispatch(setAllGear(gear))
    })
  }, []);

  const [owners, setOwners] = useState({});

  const navigate = useNavigate()
  
  const getOwnerFirstName = async (ownerId: string) => {
    const owner = await supabase.getUserById(ownerId);
    return owner?.first_name ?? '';
  };
  
  const filteredGear = gear.filter((g: Gear) => g.owner_id !== userInfo.profile.id);
  
  

  return (
    <>
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
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{gear.owner_id}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">&#9733; {gear.rating}</p>
              <form className="mt-10">
            <button
              type="submit"
              onClick = { () => navigate(`/geardetails`)}
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              See more details
            </button>
          </form>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GearListings;
