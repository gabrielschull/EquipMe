import React from 'react';
import { useEffect, useState } from 'react';
import { Gear } from '../../types/gear.type';
import { supabase, supabaseClient } from '../../services/supabase.service';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllGear, deleteGear } from '../../Redux/GearSlice';
import { RootState, AppDispatch } from '../../Redux/store';


const MyGear: React.FC = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const gear = useSelector((state: RootState) => state.Gear);
  const userInfo = useSelector((state: RootState) => state.User);
  const [filteredGear, setFilteredGear] = useState<any[]>([]);
  const [homeGearImages, setHomeGearImages] = useState<any>({});

  const [owners, setOwners] = useState<{ [key: string]: string }>({});

  const CDNURL =
    'https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/gearImagesBucket/';

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

      console.log(`${ownerid}/gear/${gearid}`);

      if (error) console.log('ERROR IN IMAGE FETCH ==> ', error);

      if (data !== null && data.length > 0) {
        console.log(data, 'YARRRR');
        setHomeGearImages((state: any) => {
          return { ...state, [gearid as string]: data[0].name };
        });
      }
    } catch (e: any) {
      console.log(e, 'Error getting gear images');
    }
  }

  useEffect(() => {
    filteredGear.forEach((g: Gear) => {
      if (!owners[g.owner_id!] && g.owner_id !== userInfo.id) {
        getHomeGearImages(g.owner_id, g.id);
      }
    });
  }, [filteredGear, userInfo.id]);

  useEffect(() => {
    setFilteredGear(
      gear!.filter((g: Gear) => g.owner_id === userInfo.profile.id)
    );
  }, [gear]);

  const navigate = useNavigate();

  const handleDelete = (gear: Gear) => {
    supabase
      .deleteGear(gear.id as string)
      .then(() => {
        dispatch(deleteGear(gear.id));
      })
      .catch((error: any) => {
        alert('Error: ' + error);
      });
  };

  return (
    <>
      <h2 className='rounded-md bg-indigo-400 text-white font-semibold py-1 px-3 rounded shadow border border-gray-300 m-12 mx-4 px-12 py-6 text-lg font-semibold text-center'>
        Your Gear
      </h2>
      <div className='flex overflow-x-auto scroll-snap-type-x-mandatory scroll-padding-x-16 mx-5 mb-20'>
        {filteredGear &&
          filteredGear.map((gear) => (
            <div
              key={gear.id}
              className='flex-shrink-0 w-64 mr-4 scroll-snap-align-start'
            >
              <div className='bg-white shadow rounded-lg p-4'>
                <div className='flex gap-x-4'>
                  {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={gear.imageUrl} alt="" /> */}
                  <div className='min-w-0 flex-auto'>
                    <p className='text-sm font-semibold leading-6 text-gray-900'>
                      {gear.description}
                    </p>
                    <p className='mt-1 text-xs leading-5 text-gray-800'>
                      €{gear.price_hr} / hour
                    </p>
                    <p className='mt-1 text-xs leading-5 text-gray-800'>
                      €{gear.price_day} / day
                    </p>
                    <p className='mt-1 text-xs leading-5 text-gray-800'>
                      Type: {gear.type}
                    </p>
                  </div>
                </div>
                {homeGearImages[gear.id!] && homeGearImages ? (
                  <div className='mt-4 aspect-w-3 aspect-h-4 hidden lg:block'>
                    <img
                      src={
                        CDNURL +
                        gear.owner_id +
                        '/gear/' +
                        gear.id +
                        '/' +
                        homeGearImages[gear.id!]
                      }
                      alt=''
                      className='object-cover object-center rounded-lg'
                    />
                  </div>
                ) : (
                  <div className='mt-4 aspect-w-3 aspect-h-4 hidden lg:block'>
                    <img
                      src='https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/gearImagesBucket/3ae36b25-4df5-44de-b66e-18eb88458a30/gear/cb7fc4d2-a61d-4427-aa99-8b298258b9ce/Screenshot%202023-05-12%20at%2009.14.47.png'
                      alt=''
                      className='object-cover object-center rounded-lg'
                    />
                  </div>
                )}
                <div className='mt-6 flex items-center justify-end gap-x-6'>
                  <button
                    type='submit'
                    onClick={() => navigate(`/editgear/${gear.id}`)}
                    className='bg-white hover:bg-indigo-400 text-black font-semibold py-1 px-3 rounded border border-gray-300 hover:text-white'
                  >
                    Edit Gear
                  </button>
                  <button
                    type='button'
                    onClick={() => handleDelete(gear)}
                    className='bg-white hover:bg-indigo-400 text-black font-semibold py-1 px-3 rounded hover:text-white'
                  >
                    Delete Gear
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default MyGear;