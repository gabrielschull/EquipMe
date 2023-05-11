import { useState, useEffect, useContext } from 'react';
import MapContainer from '../misc/MapContainer';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../Redux/store';
import { supabase } from '../../services/supabase.service';
import {
  UserSlice,
  toggleIsOwner,
  toggleIsRenter,
} from '../../Redux/UserSlice';

const people = [
  {
    id: 1,
    name: 'Surfboard',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Bike',
    avatar:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'Volleyball Net',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
  },
  {
    id: 4,
    name: 'Football',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 5,
    name: 'Golf clubs',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 6,
    name: 'Basketball',
    avatar:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 7,
    name: 'Padel equipment',
    avatar:
      'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 8,
    name: 'Weights',
    avatar:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 9,
    name: 'Tennis equipment',
    avatar:
      'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 10,
    name: 'Skateboard',
    avatar:
      'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const GettingStarted: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);
  const [selected, setSelected] = useState(people[3]);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <button
        type='submit'
        onClick={() => {
          userInfo.profile.is_owner
            ? supabase.updateIsOwnerToFalse(userInfo.profile.id)
            : supabase.updateIsOwnerToTrue(userInfo.profile.id);
          dispatch(toggleIsOwner(userInfo.profile.id));
        }}
        className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-pink-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
      >
        {userInfo.profile.is_owner ? '✔' : ''} I want to lease my sports gear to
        others
      </button>
      {userInfo.profile.is_owner && (
  <button
    type='button'
    onClick={(e) => {
      e.preventDefault();
      navigate(`/addgear`);
    }}
    className='mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-500 px-8 py-3 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
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
        className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
      >
        {userInfo.profile.is_renter ? '✔' : ''} I'm looking to rent some gear
      </button>
       {userInfo.profile.is_renter && (
        <>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className='block text-sm font-medium leading-6 text-gray-900 mx-12'>
              What are you looking for?
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
                  <span className='ml-3 block truncate'>{selected.name}</span>
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
                  {people.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className='flex items-center'>
                            {/* <img
                              src={person.avatar}
                              alt=''
                              className='h-5 w-5 flex-shrink-0 rounded-full'
                            /> */}
                            <span
                              className={classNames(
                                selected ? 'font-semibold' : 'font-normal',
                                'ml-3 block truncate'
                              )}
                            >
                              {person.name}
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
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>

      <div className='sm:col-span-3 mx-12'>
        <label
          htmlFor='first-name'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Location
        </label>
        <div className='mt-2'>
          <input
            type='text'
            name='first-name'
            id='first-name'
            autoComplete='given-name'
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
        </div>
      </div>
      <div className='map-style'>
      </div>
       <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-12"
        onClick={() => navigate(`/home`)}>
        Search
      </button>
      </> )}
        <MapContainer />
    </>
  );
};

export default GettingStarted;
