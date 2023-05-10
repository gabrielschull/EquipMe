import React, { useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import NavBar from '../Components/home/NavBar';
import Payment from '../Components/rentals/Payment';
import { useState } from 'react';
import { supabase } from '../services/supabase.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Gear } from '../types/gear.type';

const product = {
  //{gearInfo.description}
  name: 'Surfboard',
  price: '$200',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Gearhub', href: '#' },
    { id: 2, name: 'Gear Details', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],

  description: 'Details here about the surfboard',
};
const reviews = { href: '#', average: 4, totalCount: 117 };

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const GearDetails: React.FC = (): JSX.Element => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [gearInfo, setGearInfo] = useState<any>(undefined);

  const { id } = useParams();

  console.log('PARAMS ==> ', id);

  const handleReservationClick = () => {
    setShowPaymentModal(true);
  };

  const handleSeeMoreDetails = async () => {
    const gearData = await supabase.getGearId(id);
    if (gearData && gearData.length > 0) {
      console.log('gearData -----> ', gearData);
      setGearInfo(gearData[0]);
      return gearData;
    } else {
      alert('Cannot find gear details');
    }
  };

  useEffect(() => {
    handleSeeMoreDetails();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      {gearInfo && (
        <div className="bg-white">
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                {product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900">
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300">
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
                <li className="text-sm">
                  <a
                    href={product.href}
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600">
                    {product.name}
                  </a>
                </li>
              </ol>
            </nav>

            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={product.images[1].src}
                    alt={product.images[1].alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={product.images[2].src}
                    alt={product.images[2].alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  src={product.images[3].src}
                  alt={product.images[3].alt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {gearInfo.description}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  Price/day: ${gearInfo.price_day}
                </p>
                <p className="text-3xl tracking-tight text-gray-900">
                  Price/hr: ${gearInfo.price_hr}
                </p>
                <p className="text-3xl tracking-tight text-gray-900">
                  Deposit: ${gearInfo.deposit}
                </p>

                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating
                              ? 'text-gray-900'
                              : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                    <a
                      href={reviews.href}
                      className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      {reviews.totalCount} reviews
                    </a>
                  </div>
                </div>

                <form className="mt-10">
                  <button
                    type="button"
                    onClick={handleReservationClick}
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Reserve this gear
                  </button>
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                Description and details
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {gearInfo.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {showPaymentModal && <Payment />}
          </div>
        </div>
      )}
    </>
  );
};

export default GearDetails;
