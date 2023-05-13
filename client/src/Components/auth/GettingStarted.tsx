import { useState, useEffect, useContext } from 'react';
import MapContainer from '../misc/MapContainer';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../Redux/store';
import { supabase } from '../../services/supabase.service';
import { Gear } from '../../types/gear.type';
import {
  UserSlice,
  toggleIsOwner,
  toggleIsRenter,
} from '../../Redux/UserSlice';
import { setFilteredGear } from '../../Redux/filteredGearSlice';
import { updateLocation } from '../../Redux/UserSlice';

function onlyUnique(value: string, index: number, array: string[]) {
  return array.indexOf(value) === index;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const GettingStarted: React.FC = (): JSX.Element => {
  const [allGear, setAllGear] = useState<any[]>([]);
  const { profile } = useSelector((state: RootState) => state.User);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  const gearTypesArray = [
    '--------',
    ...allGear
      .map((gear) => gear.type)
      .filter(Boolean)
      .filter((str, index, array) =>
        onlyUnique(str!, index, array as string[])
      ),
  ];

  const userInfo = useSelector((state: RootState) => state.User);
  const [selected, setSelected] = useState('--------');
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const gear = useSelector((state: RootState) => state.Gear);
  const [gearType, setGearType] = useState<string>('--------');

  //filter gear by type
  const handleSearchButton = async () => {
    if (gearType) {
      console.log('gearType 🏂 ----------> ', gearType);
      setGearType(gearType);
    } else {
      alert('Cannot find gear type');
    }
  };

  const handleGeolocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        const location = `${position.coords.latitude},${position.coords.longitude}`;
        if (profile) {
          await supabase.updateUserLocation(profile, location);
          dispatch(updateLocation(location));
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    (async () => {
      const allGear = await supabase.getGear();
      if (allGear) setAllGear(allGear);
      if (allGear) dispatch(setFilteredGear(allGear));
    })();
  }, []);

  useEffect(() => {
    dispatch(
      setFilteredGear(
        gearType !== '--------'
          ? allGear.filter((gear: Gear) => gear.type === gearType)
          : allGear
      )
    );
  }, [gear, gearType]);

  useEffect(() => {
    if (profile?.location) {
      const [lat, lng] = profile.location.split(',');
      setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }
  }, [profile]);

  return (
    <>
      {/* <button
        type="submit"
        onClick={() => {
          userInfo.profile.is_owner
            ? supabase.updateIsOwnerToFalse(userInfo.profile.id)
            : supabase.updateIsOwnerToTrue(userInfo.profile.id);
          dispatch(toggleIsOwner(userInfo.profile.id));
        }}
        className="bg-white hover:bg-gray-100 text-black font-semibold py-2 px-3  rounded shadow">
        {userInfo.profile.is_owner ? '✔' : ''} I want to lease my sports gear to
        others
      </button>
      {userInfo.profile.is_owner && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/addgear`);
          }}
          className="bg-white hover:bg-gray-100 text-black font-semibold py-2 px-3  rounded shadow">
          Add Gear
        </button>
      )}
      <button
        type="submit"
        onClick={() => {
          userInfo.profile.is_renter
            ? supabase.updateIsRenterToFalse(userInfo.profile.id)
            : supabase.updateIsRenterToTrue(userInfo.profile.id);
          dispatch(toggleIsRenter(userInfo.profile.id));
        }}
        className="bg-white hover:bg-gray-100 text-black font-semibold py-2 px-3  rounded shadow">
        {userInfo.profile.is_renter ? '✔' : ''} I'm looking to rent some gear
      </button> */}

      <div className='flex items-center justify-center'>
        <div className='flex flex-col items-center space-y-12 mt-20 '>
          <button
            type='submit'
            onClick={() => {
              userInfo.profile.is_owner
                ? supabase.updateIsOwnerToFalse(userInfo.profile.id)
                : supabase.updateIsOwnerToTrue(userInfo.profile.id);
              dispatch(toggleIsOwner(userInfo.profile.id));
            }}
            className='bg-white hover:bg-gray-100 text-black font-semibold py-2 px-3 rounded shadow'
          >
            {userInfo.profile.is_owner ? '✔' : ''} I want to lease my sports
            gear to others
          </button>
          {userInfo.profile.is_owner && (
            <button
              type='button'
              onClick={(e) => {
                e.preventDefault();
                navigate(`/addgear`);
              }}
              className='bg-indigo-400 text-white font-semibold py-2 px-3 rounded shadow'
            >
              Add Gear
            </button>
          )}
          <button
            type='submit'
            onClick={() => {
              userInfo.profile.is_renter
                ? supabase.updateIsRenterToFalse(userInfo.profile.id)
                : supabase.updateIsRenterToTrue(userInfo.profile.id);
              dispatch(toggleIsRenter(userInfo.profile.id));
            }}
            className='bg-white hover:bg-gray-100 text-black font-semibold py-2 px-3 rounded shadow'
          >
            {userInfo.profile.is_renter ? '✔' : ''} I'm looking to rent some
            gear
          </button>
        </div>
      </div>

      {userInfo.profile.is_renter && (
        <>
          <Listbox
            value={selected}
            onChange={(gearType) => {
              console.log(gearType);
              setSelected(gearType);
              gearType && setGearType(gearType);
            }}
          >
            {({ open }) => (
              <>
                <Listbox.Label className='block text-sm text-black font-semibold py-2 px-3'>
                  What type of gear you are looking for?
                </Listbox.Label>
                <div className='relative mt-2 mx-12'>
                  <Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6'>
                    <span className='flex items-center'>
                      <img
                        src={
                          'https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/images/' +
                          userInfo.profile?.id +
                          '/profileImage'
                        }
                        alt=''
                        className='h-5 w-5 flex-shrink-0 rounded-full'
                      />
                      <span className='ml-3 block truncate'>{selected}</span>
                    </span>
                    <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                      <ChevronUpDownIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                      {gearTypesArray?.map((type) => {
                        return (
                          <Listbox.Option
                            key={type}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? 'bg-indigo-600 text-white'
                                  : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                              )
                            }
                            value={type}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className='flex items-center'>
                                  <span
                                    className={classNames(
                                      selected
                                        ? 'font-semibold'
                                        : 'font-normal',
                                      'ml-3 block truncate'
                                    )}
                                  >
                                    {type}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <CheckIcon
                                      className='h-5 w-5'
                                      aria-hidden='true'
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        );
                      })}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>

          {/* <div className="sm:col-span-3 mx-12">
            <label
              htmlFor="first-name"
              className="block text-sm text-black font-semibold py-2 px-3">
              Location
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}

          {/* <div className="map-style"></div> */}
          {/* <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-12"
            onClick={(e) => {
              e.preventDefault();
              handleSearchButton();
            }}>
            Search
          </button> */}
        </>
      )}
      <div className='flex justify-center items-center mt-10'>
        <button
          onClick={handleGeolocation}
          type='submit'
          className='mt-10 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Update your location
        </button>
      </div>

      {/* <MapContainer/> */}
    </>
  );
};

export default GettingStarted;
