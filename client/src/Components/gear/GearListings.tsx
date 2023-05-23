import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Gear } from '../../types/gear.type';
import { RootState } from '../../Redux/store';
import { useNavigate } from 'react-router-dom';
import { supabase, supabaseClient } from '../../services/supabase.service';
import Socials from '../misc/Socials';
import MapContainer from '../misc/MapContainer';

const GearListings: React.FC = (): JSX.Element => {
  const gear = useSelector((state: RootState) => state.Gear);
  const userInfo = useSelector((state: RootState) => state.User);
  const [homeGearImages, setHomeGearImages] = useState<any>({});
  const filteredGear = useSelector((state: RootState) => state.FilteredGear);
  const CDNURL = 'https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/gearImagesBucket/';
  const [owners, setOwners] = useState<{ [key: string]: string }>({});
  const [distances, setDistances] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

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
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2);
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

  async function getHomeGearImages(
    ownerid: string | null | undefined,
    gearid: string | null | undefined
  ) {
    try {
      const { data, error } = await supabaseClient.storage
        .from('gearImagesBucket')
        .list(`${ownerid}/gear/${gearid}`, {
          limit: 1,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

      if (error) console.log('ERROR IN IMAGE FETCH ==> ', error);

      if (data !== null && data.length > 0) {
        setHomeGearImages((state: any) => {
          return { ...state, [gearid as string]: data[0].name };
        });
      }
    } catch (e: any) {
      console.log(e, 'Error getting gear images');
    }
  }

  useEffect(() => {
    gear.forEach((g: Gear) => {
      if (!owners[g.owner_id!] && g.owner_id !== userInfo.id) {
        getOwnerFirstName(g.owner_id!);
        getOwnerDistanceFromUser(g.owner_id!);
        getHomeGearImages(g.owner_id, g.id);
      }
    });
  }, [gear, owners, userInfo.id]);

  const sortedGear = filteredGear.slice().sort((gearA: Gear, gearB: Gear) => {
    const distanceA = parseFloat(distances[gearA.owner_id!] || 'Infinity');
    const distanceB = parseFloat(distances[gearB.owner_id!] || 'Infinity');

    if (distanceA < distanceB) {
      return -1;
    } else if (distanceA > distanceB) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <>
      <div className="flex overflow-x-auto mx-12 mt-20">
        <MapContainer homeGearImages={homeGearImages}></MapContainer>
      </div>
      <div className="flex overflow-x-auto mx-12 mt-20">
        {sortedGear
          .filter((gear: Gear) => {
            return gear.owner_id !== userInfo.profile.id;
          })
          .map((gear: Gear, index) => (
            <div
              key={gear.id}
              className="flex flex-col justify-between gap-4 p-4 items-center">
              <div className="flex gap-4">
                <div className="flex-auto">
                  <p className="text-lg font-semibold leading-6 text-gray-900 text-center">
                    {gear.name}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-gray-800 text-center">
                    €{gear.price_hr} / hour
                  </p>
                  <p className="mt-1 text-sm leading-5 text-gray-800 text-center">
                    €{gear.price_day} / day
                  </p>
                  <p className="mt-1 text-sm leading-5 text-gray-800 text-center">
                    Type: {gear.type}
                  </p>
                </div>
              </div>
              {homeGearImages[gear.id!] && homeGearImages ? (
                <div
                  style={{ paddingRight: '20px', paddingLeft: '20px' }}
                  key={homeGearImages[gear.id!]}
                  className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                  <img
                    src={
                      CDNURL +
                      gear.owner_id +
                      '/gear/' +
                      gear.id +
                      '/' +
                      homeGearImages[gear.id!]
                    }
                    alt=""
                    className="h-full w-full object-cover object-center"
                    style={{
                      width: '18vmin',
                      height: '24vmin',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: '5px',
                    }}
                  />
                </div>
              ) : (
                <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                  <img
                    src="https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/gearImagesBucket/3ae36b25-4df5-44de-b66e-18eb88458a30/gear/cb7fc4d2-a61d-4427-aa99-8b298258b9ce/Screenshot%202023-05-12%20at%2009.14.47.png"
                    alt=""
                    className="h-full w-full object-cover object-center"
                    style={{ width: '18vmin', height: '24vmin' }}
                  />
                </div>
              )}
              <div className="flex flex-col items-end text-center items-center">
                <p className="text-sm leading-6 text-gray-900">
                  Gear owner: {owners[gear.owner_id!]}
                </p>
                <Socials></Socials>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Distance: {distances[gear.owner_id!] || 'unknown'}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  &#9733; {gear.rating}
                </p>
                <form className="mt-10 ">
                  <button
                    style={{
                      height: '80px',
                      width: '200px',
                      whiteSpace: 'nowrap',
                    }}
                    type="submit"
                    onClick={() =>
                      navigate(`/geardetails/${gear.id}`, { state: { gear } })
                    }
                    className="border-transparent bg-white hover:bg-indigo-400  hover:text-white text-black font-semibold py-2 px-3 rounded shadow border border-gray-300 focus:ring-offset-2font-semibold">
                    See more details
                  </button>
                </form>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default GearListings;
