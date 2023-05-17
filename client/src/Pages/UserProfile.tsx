import React from 'react';
import NavBar from '../Components/home/NavBar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import MyGear from '../Components/gear/MyGear';
import Socials from '../Components/misc/Socials';

const UserProfile: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <figure className="mt-100">
              <figcaption className="mt-2">
                <img
                  className="mx-auto h-150 w-150 rounded-full"
                  alt=""
                  src={
                    'https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/images/' +
                    userInfo.profile?.id +
                    '/profileImage'
                  }
                />
              </figcaption>
            </figure>
            <p className="mt-10 mb-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {userInfo?.profile ? userInfo.profile.first_name : 'FN'}{' '}
              {userInfo?.profile ? userInfo.profile.last_name : 'LN'}
            </p>
            <Socials />
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {userInfo?.profile ? userInfo.profile.bio : `Bio`}
            </p>
          </div>
          <MyGear></MyGear>
          <div className="flex justify-center mt-2">
            <div className="h-16">
              <div className="flex justify-between mx-8 py-2">
                <button
                  type="submit"
                  onClick={() => navigate(`/edituser`)}
                  className=" text-2xl border-transparent bg-white hover:bg-indigo-400 hover:text-white text-black font-semibold py-2 px-3 rounded shadow border border-gray-300 focus:ring-offset-2font-semibold">
                  Edit Profile
                </button>
                <div className="w-4"></div>
                <button
                  type="submit"
                  onClick={() => navigate(`/addgear`)}
                  className=" text-2xl border-transparent bg-white hover:bg-indigo-400 hover:text-white text-black font-semibold py-2 px-3 rounded shadow border border-gray-300 focus:ring-offset-2font-semibold ml-20">
                  Add Gear
                </button>
              </div>
            </div>
          </div>
          <div>{/* <MapContainer/> */}</div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
