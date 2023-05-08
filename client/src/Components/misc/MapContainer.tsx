import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { supabaseClient } from '../../services/supabase.service';

const apiKey = process.env.REACT_APP_MAPS_API_KEY!;

const MapContainer: React.FC = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(12);
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      error => {
        console.error(error);
      }
    );
  };

const handleMapLoad = () => {
  setMapLoaded(true);
};

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div style={{ height: '300px', width: '50%' }}>
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={center}
          zoom={zoom}
          onLoad={handleMapLoad}
        >
          <Marker position={center} />
        </GoogleMap>
        <button onClick={handleGeolocation}
              type="submit"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Get Current Location
            </button>
      </div>
    </LoadScript>
  );
};

export default MapContainer;