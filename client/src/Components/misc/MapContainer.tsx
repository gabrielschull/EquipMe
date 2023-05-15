import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { supabase } from '../../services/supabase.service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../Redux/store';
import { updateLocation } from '../../Redux/UserSlice';
import { userInfo } from 'os';

const apiKey = process.env.REACT_APP_MAPS_API_KEY!;

const MapContainer: React.FC = () => {
  const { profile } = useSelector((state: RootState) => state.User);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(13);
  const [mapLoaded, setMapLoaded] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [users, setUsers] = useState([]);


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
      const data : any = await supabase.getUsers();
      setUsers(data );
    } catch (error) {
      console.error(error);
    }
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
          {/* <button
            onClick={handleClick}
            type='submit'
            className='mt-10 w-full items-center justify-center rounded-md border border-transparent bg-indigo-400 px-8 py-3 text-base font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            See gear around you
          </button> */}
        </div>
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={center}
          zoom={zoom}
          onLoad={handleMapLoad}
        >
          <Marker position={center} />
          {/* {users &&
            users.map((user) => (
              <Marker
                key={user}
                position={{
                  lat: parseFloat(user.location?.latitude || '0'),
                  lng: parseFloat(user.location?.longitude || '0'),
                }}
                icon={{
                  url: 'path/to/your/icon.png',
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            ))} */}
        </GoogleMap>
      </div>
    </LoadScript>
  );

};

export default MapContainer;
