import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader, InfoWindow, Data } from '@react-google-maps/api';
import { supabase, supabaseClient } from '../../services/supabase.service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../Redux/store';
import { updateLocation } from '../../Redux/UserSlice';
import { userInfo } from 'os';
import { Gear } from '../../types/gear.type';
import { useLocation, Link} from 'react-router-dom';
import { setAllGear } from '../../Redux/GearSlice';
import logo from '../Assets/Logo.png';

const apiKey = process.env.REACT_APP_MAPS_API_KEY!;

const CDNURL =
  'https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/gearImagesBucket/';

const MapContainer: React.FC = () => {
  const { profile } = useSelector((state: RootState) => state.User);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(13);
  const [mapLoaded, setMapLoaded] = useState(false);
  const dispatch: AppDispatch = useDispatch();
   const gear = useSelector((state: RootState) => state.Gear);
  // const [gearImages, setGearImages] = useState<any[]>([]);
  const location = useLocation();
  const [markerPositions, setMarkerPositions] = useState<any[]>([]);
  const [selectedGear, setSelectedGear] = useState<any>();
  const [data, setData] = useState<any>([]);

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
  const handleClick = async () => {
    try {
      const gearData = await supabase.getGear();
      dispatch(setAllGear(gearData));
      console.log("This is the data", gearData)
      if (gearData) {
        setMarkerPositions(
          gearData.map((gearItem) => ({
            lat: gearItem.location ? parseFloat(gearItem.location.split(',')[0]) : 0,
            lng: gearItem.location ? parseFloat(gearItem.location.split(',')[1]) : 0,
          }))
        );
      }
      setData(gearData);
    } catch (error) {
      console.error(error);
    }
    console.log("HI")
    setSelectedGear(null);
  };

  // async function getGearImages() {
  //   try {
  //     const { data, error } = await supabaseClient.storage
  //       .from('gearImagesBucket')
  //       .list(`${gear.owner_id}/gear/${id}`, {
  //         limit: 1,
  //         offset: 0,
  //         sortBy: { column: 'name', order: 'asc' },
  //       });

  //     if (error) console.log('ERROR IN IMAGE FETCH ==> ', error);

  //     if (data !== null) {
  //       setGearImages(data);
  //     }
  //   } catch (e: any) {
  //     console.log(e, 'Error getting gear images');
  //   }
  // }


  useEffect(() => {
    if (profile?.location) {
      const [lat, lng] = profile.location.split(',');
      setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }
    // getGearImages()
  }, [profile]);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div style={{ height: '400px', width: '60%', margin: '0 auto', alignItems: 'center' }}>
        <div className='pb-6 flex'>
          <button
            onClick={handleGeolocation}
            type='submit'
            className='mt-10 w-full items-center justify-center rounded-md border border-transparent bg-indigo-400 px-8 py-3 text-base font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Update current location
          </button>
          <button
            onClick={handleClick}
            type='submit'
            className='mt-10 w-full items-center justify-center rounded-md border border-transparent bg-indigo-400 px-8 py-3 text-base font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
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
        {/* <Marker position={center}/> */}
        {markerPositions &&
         markerPositions.map((position, index) => (
          <Marker
            key={index}
            position={position}
            onClick={() => setSelectedGear(data[index])}
          />
          ))}
          {selectedGear && (
            <InfoWindow
               position={{
               lat: selectedGear.location ? parseFloat(selectedGear.location.split(',')[0]) : 0,
               lng: selectedGear.location ? parseFloat(selectedGear.location.split(',')[1]) : 0,
          }}
        onCloseClick={() => setSelectedGear(null)}
        >
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{selectedGear.name}</h3>
              <p className="text-gray-600 mb-2">{selectedGear.description}</p>
                <p className="text-gray-800 mb-1">Price per hour: €{selectedGear.price_hr}</p>
                <p className="text-gray-800 mb-1">Price per day: €{selectedGear.price_day}</p>
                <p className="text-gray-800 mb-5">Rating: {selectedGear.rating} stars</p>
          <Link
            to={`/geardetails/${selectedGear.id}`}
            className="text-blue-500 hover:text-blue-700 m-5"
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
