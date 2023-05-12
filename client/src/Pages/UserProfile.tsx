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
import MyGear from '../Components/gear/MyGear';

const UserProfile: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <figure className="mt-10">
              <figcaption className="mt-10">
                <img
                  className="mx-auto h-150 w-150 rounded-full"
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
              {userInfo?.profile ? userInfo.profile.last_name : 'LN'}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {userInfo?.profile ? userInfo.profile.bio : `Bio`}
            </p>
          </div>
          <MyGear></MyGear>
          <div className="flex justify-center mt-2">
            {/* <MapContainer></MapContainer> */}
            <div className="h-16">
              <div className="flex justify-between mx-8 py-2">
                <button
                  type="submit"
                  onClick={() => navigate(`/edituser`)}
                  className="bg-white hover:bg-gray-100 text-black font-semibold py-1 px-3 rounded shadow border border-gray-300">
                  Edit Profile
                </button>
                <div className="w-4"></div>
                <button
                  type="submit"
                  onClick={() => navigate(`/addgear`)}
                  className="bg-white hover:bg-gray-100 text-black font-semibold py-1 px-3 rounded shadow border border-gray-300">
                  Add Gear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
