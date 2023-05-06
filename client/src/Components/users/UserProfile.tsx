import React from 'react';
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

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
  },
  //   {
  //     name: 'Simple queues',
  //     description:
  //       'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
  //     icon: ArrowPathIcon,
  //   },
  //   {
  //     name: 'Advanced security',
  //     description:
  //       'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
  //     icon: FingerPrintIcon,
  //   },
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
  },
  {
    id: 2,
    name: 'Pyzel Surfboard',
    href: '#',
    // price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt:
      'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Pyzel Surfboard',
    href: '#',
    // price: '$89',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt:
      'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Pyzel Surfboard',
    href: '#',
    // price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
];

const UserProfile: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="component-container">
        <h2>UserProfile</h2>
      </div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <figure className="mt-10">
              <figcaption className="mt-10">
                <img
                  className="mx-auto h-20 w-20 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
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
              Raul Barros
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Hey guys, I'm a brazilian 28 years old Surfer, pretty busy with my
              studies this days and my surfboard is free to be be rented, I
              always take good care of it and would really apreciate if you do
              do the same, Im live close to the Copacabana Beach so easy to
              meet, please let me know if you need a board for day or more, I
              can also give you some tips about where to find the best surfing
              places in Rio 🤙🏾 🏄🏽‍♂️
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
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
                    <div></div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
