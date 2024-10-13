import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  PolylineF,
  MarkerF,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import polylineOptions from "./polylineOptions";
import { routes } from "./routes";
import portCoordinates from "./PortCoordinates"; // Import portCoordinates

interface BackgroundMapProps {
  attackPort: string;
}

function BackgroundMap({ attackPort }: BackgroundMapProps) {
  const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
  };

  const mapRef = useRef<google.maps.Map | null>(null);
  const [currentPositions, setCurrentPositions] = useState<{
    [key: string]: number;
  }>({});

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
    styles: mapStyles,
  };

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
        {/* Render polylines for routes */}
        {Object.entries(routes).map(([routeName, route], index) => (
          <React.Fragment key={index}>
            <PolylineF
              path={route.map(([lng, lat]) => ({ lat, lng }))}
              options={polylineOptions}
            />
            {currentPositions[routeName] != null && (
              <MarkerF
                position={{
                  lat: route[currentPositions[routeName]][1],
                  lng: route[currentPositions[routeName]][0],
                }}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 2,
                  fillColor: "#ADD8E6",
                  fillOpacity: 1,
                  strokeWeight: 0,
                }}
              />
            )}
          </React.Fragment>
        ))}

        {/* Render markers for port coordinates */}
        {Object.entries(portCoordinates).map(
          ([portName, coordinates], index) => (
            <MarkerF
              key={index}
              position={{
                lat: coordinates.lat,
                lng: coordinates.lon,
              }}
              icon={{
                path: "M 0,0 L -20,60 L 20,60 Z", // Custom marker shape (triangle banner)
                scale: 0.3, // Make the marker bigger
                fillColor: portName === attackPort ? "#FF0000" : "#FFFFFF", // Highlight attackPort in red
                fillOpacity: 1,
                strokeColor: portName === attackPort ? "#FF0000" : "#000000", // Change stroke color to red for attackPort
                strokeWeight: 2,
              }}
              label={{
                text: portName,
                fontSize: "16px", // Larger font size
                fontWeight: "bold",
                color: "#FFFFFF", // White text for dark mode
                className: "map-label",
              }}
            />
          )
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default BackgroundMap;
