import React from "react";
import { GoogleMap, LoadScript, MarkerF, PolylineF } from "@react-google-maps/api";

function BackgroundMap() {
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
  
  const seaRouteData = [[103.6,1.1],[102,2],[100.6,3.2],[97,7],[95.1751,10.7066],[93.3,14.4],[92,20],[91.6295,21.7994]];

  const seaRoute = seaRouteData.map(([lng, lat]) => ({ lat, lng }));


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
        <PolylineF
          path={seaRoute}
          options={polylineOptions}
        />
        <MarkerF
            position={seaRoute[0]}
            label="start"
          />
        <MarkerF
            position={seaRoute[seaRoute.length - 1]}
            label="end"
          />
      </GoogleMap>
    </LoadScript>
  );
}

export default BackgroundMap;