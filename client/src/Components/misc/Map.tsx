import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Need to setup Google Maps API

interface MapProps {
  apiKey: string;
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const Map: React.FC<MapProps> = ({ apiKey, center, zoom }) => {
  return (
    <>
    <h2>Google Maps for location will be input below </h2>
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={{ height: "400px", width: "100%" }} center={center} zoom={zoom}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
    </>
  );
};

export default Map;