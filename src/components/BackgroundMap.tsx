import React, { useEffect } from "react";
import { GoogleMap, LoadScript, MarkerF, PolylineF } from "@react-google-maps/api";

interface BackgroundMapProps {
  route: { lat: number; lng: number }[];
  startPoint: { lat: number; lng: number } | null;
  endPoint: { lat: number; lng: number } | null;
}

function BackgroundMap({ route, startPoint, endPoint }: BackgroundMapProps) {
  const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
  };

  const center = {
    lat: 1.2555,
    lng: 104.0089,
  };

  const mapOptions = {
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    zoomControlOptions: {
      position: window.google?.maps?.ControlPosition?.LEFT_CENTER,
    },
  };

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const polylineOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    geodesic: true,
    zIndex: 1,
  };



  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        options={mapOptions}
        center={center}
        zoom={9}
      >
        {route.length > 0 && (
          <PolylineF
            path={route}
            options={polylineOptions}
          />
        )}
        {startPoint && (
          <MarkerF
            position={startPoint}
            label="Start"
          />
        )}
        {endPoint && (
          <MarkerF
            position={endPoint}
            label="End"
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default BackgroundMap;