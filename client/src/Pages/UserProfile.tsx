import React from 'react';
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useContext } from 'react';
import NavBar from '../Components/home/NavBar';
import { useNavigate } from 'react-router-dom';
import MapContainer from '../Components/misc/MapContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';

const UserProfile: React.FC = (): JSX.Element => {
  const userInfo = useSelector ((state: RootState) => state.User);

  const navigate = useNavigate();

const features = [
  {
    name: 'About my gear',
    description:
      'ADD LIST OF GEAR DESCRIPTIONS',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'My location',
    icon: LockClosedIcon,
    mapComponent: <MapContainer/>
  },
];

  return (
    <>
      <NavBar />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <figure className="mt-10">
              <figcaption className="mt-10">
                <img
                  className="mx-auto h-20 w-20 rounded-full"
                  alt=""
                  src={
                    'https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/images/' +
                    userInfo.profile?.id +
                    '/profileImage'
                  }
                />
                <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                  <svg
                    viewBox="0 0 2 2"
                    width={3}
                    height={3}
                    aria-hidden="true"
                    className="fill-gray-900">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                </div>
              </figcaption>
            </figure>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {userInfo?.profile ? userInfo.profile.first_name : 'FN'}{' '}
              {userInfo?.profile
                ? userInfo.profile.last_name
                : 'LN'}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {userInfo?.profile
                ? userInfo.profile.bio
                : `Bio`}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-rows-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-rows-2 lg:gap-y-16">

              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                    {feature.name === "My location" && feature.mapComponent}
                  </dd>
                </div>
              ))}

            </dl>
          </div>
        </div>
      </div>
      <button
        type="submit"
        onClick={() => navigate(`/edituser`)}
        className="rounded-md bg-indigo-600 px-9 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Edit Profile
      </button>
      <button
        type="submit"
        onClick={() => navigate(`/addgear`)}
        className="rounded-md bg-indigo-600 px-9 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-10">
        Add Gear
      </button>
    </>
  );
};

export default UserProfile;
