import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindow,
} from '@react-google-maps/api';
import { supabase } from '../../services/supabase.service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../Redux/store';
import { Gear } from '../../types/gear.type';
import { Link } from 'react-router-dom';
import { setAllGear } from '../../Redux/GearSlice';

const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY!;

const CDNURL =
  'https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/gearImagesBucket/';

interface MapProps {
  homeGearImages: any;
}

const MapContainer: React.FC<MapProps> = ({ homeGearImages }: any) => {
  const { profile } = useSelector((state: RootState) => state.User);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(13);
  const [mapLoaded, setMapLoaded] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  // const gear = useSelector((state: RootState) => state.Gear);
  // const [gearImages, setGearImages] = useState<any[]>([]);
  // const location = useLocation();
  const [markerPositions, setMarkerPositions] = useState<any[]>([]);
  const [selectedGear, setSelectedGear] = useState<any>();
  const [data, setData] = useState<any>([]);

  const handleClick = async () => {
    try {
      const gearData = await supabase.getGear();
      dispatch(setAllGear(gearData));
      if (gearData) {
        const sortedGear = gearData.filter((gear: Gear) => {
          return gear.owner_id !== profile.id;
        });

        setMarkerPositions(
          sortedGear.map((gearItem) => ({
            lat: gearItem.location
              ? parseFloat(gearItem.location.split(',')[0])
              : 0,
            lng: gearItem.location
              ? parseFloat(gearItem.location.split(',')[1])
              : 0,
            gear_id: gearItem.id,
            owner_id: gearItem.owner_id,
          }))
        );
      }
      setData(gearData);
    } catch (error) {
      console.error(error);
    }

    setSelectedGear(null);
  };

  useEffect(() => {
    if (profile?.location) {
      const [lat, lng] = profile.location.split(',');
      setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }
  }, []);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <LoadScript googleMapsApiKey={MAPS_API_KEY}>
      <div
        style={{
          height: '400px',
          width: '60%',
          margin: '0 auto',
          alignItems: 'center',
        }}
      >
        <div className='flex'>
          <button
            onClick={handleClick}
            type='submit'
            className='mb-2 w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-black hover:bg-indigo-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            See gear around you
          </button>
        </div>
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={center}
          zoom={zoom}
          onLoad={handleMapLoad}
        >
          {markerPositions &&
            markerPositions.map((position, index) => (
              <MarkerF
                key={index}
                position={position}
                options={{
                  icon: {
                    url: `${CDNURL}${position.owner_id}/gear/${
                      position.gear_id
                    }/${homeGearImages[position.gear_id]}`,
                    scaledSize: {
                      width: 60,
                      height: 60,
                      equals: () => {
                        return false;
                      },
                    },
                  },
                }}
                onClick={() => setSelectedGear(data[index])}
              />
            ))}
          {selectedGear && (
            <InfoWindow
              position={{
                lat: selectedGear.location
                  ? parseFloat(selectedGear.location.split(',')[0])
                  : 0,
                lng: selectedGear.location
                  ? parseFloat(selectedGear.location.split(',')[1])
                  : 0,
              }}
              onCloseClick={() => setSelectedGear(null)}
            >
              <div className=''>
                <h3 className='text-lg font-semibold mb-2'>
                  {selectedGear.name}
                </h3>
                <p className='text-gray-600 mb-2'>{selectedGear.description}</p>
                <p className='text-gray-800 mb-1'>
                  Price per hour: €{selectedGear.price_hr}
                </p>
                <p className='text-gray-800 mb-1'>
                  Price per day: €{selectedGear.price_day}
                </p>
                <p className='text-gray-800 mb-5'>
                  Rating: {selectedGear.rating} stars
                </p>
                <Link
                  to={`/geardetails/${selectedGear.id}`}
                  className='text-blue-500 hover:text-blue-700 m-5'
                >
                  View Details
                </Link>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MapContainer;
