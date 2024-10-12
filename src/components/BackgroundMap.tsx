import React, { useEffect, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";

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

  const mapRef = useRef<google.maps.Map | null>(null);

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
    styles: [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#2f3948",
          },
        ],
      },
      {
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#8ec3b9",
          },
        ],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1a3646",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
          {
            color: "#4b6878",
          },
        ],
      },
      {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#6b9a76",
          },
        ],
      },
      {
        featureType: "administrative.land_parcel",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#c4d4e0",
          },
        ],
      },
      {
        featureType: "poi",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#0e1626",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#4e6d70",
          },
        ],
      },
    ],
  };

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const polylineOptions = {
    strokeColor: "#FFFFFF", // Changed to white for the shipping route
    strokeOpacity: 0.9, // Increased opacity for better contrast
    strokeWeight: 4, // Adjusted stroke weight for improved aesthetics
    geodesic: true,
    icons: [
      {
        icon: {
          path: window.google?.maps?.SymbolPath?.FORWARD_CLOSED_ARROW, // Change to arrow symbol
          scale: 2.3, // Adjust the size of the arrow
          strokeColor: "#FFFFFF",
          fillColor: "#FFFFFF",
          fillOpacity: 1,
        },
        offset: "100%", // Position the first arrow at the end
        repeat: "100px", // Distance between each arrow
      },
    ],
  };

  useEffect(() => {
    if (mapRef.current && route.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      route.forEach((point) => bounds.extend(point));
      mapRef.current.fitBounds(bounds, 50);
    }
  }, [route]);

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        options={mapOptions}
        center={center}
        zoom={9}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {route.length > 0 && (
          <PolylineF path={route} options={polylineOptions} />
        )}
        {startPoint && <MarkerF position={startPoint} />}
        {endPoint && <MarkerF position={endPoint} />}
      </GoogleMap>
    </LoadScript>
  );
}

export default BackgroundMap;
