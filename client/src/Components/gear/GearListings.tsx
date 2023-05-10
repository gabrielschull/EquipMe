import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Gear } from '../../types/gear.type';
import { RootState, AppDispatch } from '../../Redux/store';
import { setAllGear } from '../../Redux/GearSlice';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase.service';

const GearListings: React.FC = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const gear = useSelector((state: RootState) => state.Gear);
  const userInfo = useSelector((state: RootState) => state.User);
  const [filteredGear, setFilteredGear] = useState<any[]>([])
  console.log(userInfo, "hahaha")

  useEffect(() => {
    supabase.getGear().then((data) => {
      dispatch(setAllGear(data))
    })
  }, []);
  
  useEffect(() => {
  setFilteredGear(gear!.filter((g: Gear) => g.owner_id !== userInfo.profile.id))
  }, [gear])

  const [owners, setOwners] = useState<{[key: string]: string}>({});
  const [distances, setDistances] = useState<{[key: string]: string}>({});

  const navigate = useNavigate()

  const getOwnerFirstName = async (ownerId: string) => {
    const owner = await supabase.getUserById(ownerId);
    setOwners((prevState) => ({
      ...prevState,
      [ownerId]: owner?.first_name ?? '',
    }));
  };

  const getOwnerDistanceFromUser = async (ownerId: string) => {
    const owner = await supabase.getUserById(ownerId);
    const ownerLocation = owner?.location;
    const userLocation = userInfo.profile.location; 
  
    if (ownerLocation && userInfo.profile.location) {
      const [ownerLat, ownerLng] = ownerLocation.split(',').map(parseFloat);
      const [userLat, userLng] = userLocation.split(',').map(parseFloat);
  
      const earthRadius = 6371;
      const dLat = ((userLat - ownerLat) * Math.PI) / 180;
      const dLng = ((userLng - ownerLng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((ownerLat * Math.PI) / 180) *
          Math.cos((userLat * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = earthRadius * c;
  
      setDistances((prevState) => ({
        ...prevState,
        [ownerId]: `${distance.toFixed(1)} km`,
      }));
    }
  };

  useEffect(() => {
    
    filteredGear.forEach((g: Gear) => {
      if (!owners[g.owner_id!]) {
        getOwnerFirstName(g.owner_id!);
        getOwnerDistanceFromUser(g.owner_id!)
      }
    });
  }, [filteredGear, owners]);
  
  return (

    <>
      <ul role="list" className="divide-y divide-gray-100 mx-12">
        {filteredGear && filteredGear.map((gear: Gear) => (
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
              <p className="text-sm leading-6 text-gray-900">Gear owner: {owners[gear.owner_id!]}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500"> Distance: {distances[gear.owner_id!]? distances[gear.owner_id!] : 'unknown'}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">&#9733; {gear.rating}</p>
              <form className="mt-10">
                <button
                  type="submit"
                  onClick={() => navigate(`/geardetails`)}
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
