import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Need to setup Google Maps API
const apiKey=process.env.REACT_APP_API_KEY!

interface MapProps {
  apiKey: string;
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const Map: React.FC<MapProps> = ({ center, zoom }) => {
  return (
    <>
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={{ height: "400px", width: "100%" }} 
      center={center} 
      zoom={zoom}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
    </>
  );
};

const MapContainer: React.FC = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
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
  }, []);

  return <Map apiKey={apiKey} center={center} zoom={zoom} />;
};

export default MapContainer;