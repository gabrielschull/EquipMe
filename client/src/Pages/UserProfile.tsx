import React from 'react';
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useContext} from 'react';
import { UserContext } from '../App';
import NavBar from '../Components/home/NavBar';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    name: 'About my gear',
    description:
      'Pyzel Surfboard Step-Up Shortboard - 2021, very good for getting speed and doing tricks',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'My location',
    description: 'GOOGLE MAPS RENDER HERE',
    icon: LockClosedIcon,
  }
];

const products = [
  {
    id: 1,
    name: 'Pyzel Surfboard',
    href: '#',
    // price: '$48',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt:
      'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  }
];
const UserProfile: React.FC = (): JSX.Element => {

  const loggedInUser = useContext(UserContext);

  useEffect(() => {
    console.log('🔪 UserProfile.tsx loggedInUser=', loggedInUser);
  });

  const navigate = useNavigate()
  return (
    <>
    <NavBar/>
      <div className='bg-white py-24 sm:py-32 w-1/3'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:text-center'>
            <figure className='mt-10'>
              <figcaption className='mt-10'>
                <img
                  className='mx-auto h-20 w-20 rounded-full'
                  src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  alt=''
                />
                <div className='mt-4 flex items-center justify-center space-x-3 text-base'>
                  <svg
                    viewBox='0 0 2 2'
                    width={3}
                    height={3}
                    aria-hidden='true'
                    className='fill-gray-900'
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                </div>
              </figcaption>
            </figure>
            <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {loggedInUser?.profile ? loggedInUser.profile.first_name : 'Raul'}{' '}
              {loggedInUser?.profile
                ? loggedInUser.profile.last_name
                : 'Barros'}
            </p>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              {loggedInUser?.profile
                ? loggedInUser.profile.bio
                : `Hey guys!
              I'm a Brazilian surfer, 28 years young, who's currently hitting
              the books pretty hard. That means my surfboard is up for rent, and
              it's in tip-top shape! I take really good care of my board, and
              I'm looking for someone who'll do the same. Lucky for you, I'm
              right near the world-famous Copacabana Beach, so it's super easy
              to meet up. Whether you need the board for a day or longer, I've
              got you covered. And, if you're looking for the best surf spots in
              Rio, I'm your guy! I'm happy to share my local knowledge so you
              can have the best surfing experience possible. So, what are you
              waiting for? Hit me up and let's catch some waves! 🤙🏾🏄🏽‍♂️`}
            </p>
          </div>
          <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl'>
            <dl className='grid max-w-xl grid-rows-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-rows-2 lg:gap-y-16'>
              {features.map((feature) => (
                <div key={feature.name} className='relative pl-16'>
                  <dt className='text-base font-semibold leading-7 text-gray-900'>
                    <div className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600'>
                      <feature.icon
                        className='h-6 w-6 text-white'
                        aria-hidden='true'
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className='mt-2 text-base leading-7 text-gray-600'>
                    {feature.description}
                    <div></div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <button
          type="submit"
          onClick = { () => navigate(`/edituser`)}
          className="rounded-md bg-indigo-600 px-9 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-8"
        >
          Edit Profile
        </button>
      <button
          type="submit"
          onClick = { () => navigate(`/addgear`)}
          className="rounded-md bg-indigo-600 px-9 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-8"
        >
          Add Gear
        </button>
    </>
  );
};

export default UserProfile;
