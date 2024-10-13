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
import portCoordinates from "./PortCoordinates";

interface BackgroundMapProps {
  attackPort: string;
}

const BackgroundMap: React.FC<BackgroundMapProps> = ({ attackPort }) => {
  const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
  };

  const mapRef = useRef<google.maps.Map | null>(null);
  const [currentPositions, setCurrentPositions] = useState<{
    [key: string]: number;
  }>({});
  const [trafficData, setTrafficData] = useState<{
    [key: string]: number;
  } | null>(null);

  const center = {
    lat: 1.2555,
    lng: 104.0089,
  };

  const mapOptions: google.maps.MapOptions = {
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

  useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8050/calculate_traffic_percentage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              port_name: attackPort, // Update to use the selected attack port
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTrafficData(data);
      } catch (error) {
        console.error("Error fetching traffic data:", error);
      }
    };

    fetchTrafficData();
  }, [attackPort]);

  const getTrafficColor = (percentage: number) => {
    if (percentage >= 40) {
      // Dark red
      return "rgb(139, 0, 0)";
    } else if (percentage >= 10 && percentage < 40) {
      // Shades of yellow that get closer to red as the percentage increases
      const redIntensity = Math.floor(255 * ((percentage - 10) / 30));
      return `rgb(${redIntensity}, 255, 0)`;
    } else {
      // Green for 0-10%
      const greenIntensity = Math.floor(255 * (percentage / 10));
      return `rgb(0, 255, ${greenIntensity})`;
    }
  };

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

        {/* Render markers for port coordinates with traffic percentages */}
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
                text: `${portName}${
                  trafficData && trafficData[portName] !== undefined
                    ? `: ${trafficData[portName].toFixed(2)}%`
                    : ""
                }`,
                fontSize: "14px", // Larger font size
                fontWeight: "bold",
                color:
                  portName === attackPort
                    ? "#FF0000" // Completely red for the affected city
                    : trafficData && trafficData[portName] !== undefined
                    ? getTrafficColor(trafficData[portName])
                    : "#FFFFFF", // Adjust text color based on traffic percentage
                className: "map-label",
              }}
            />
          )
        )}

        {/* Render unrouted traffic label at the bottom left of the screen */}
        {trafficData && trafficData["Unrouted Traffic"] !== undefined && (
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              backgroundColor: "rgba(255, 165, 0, 0.8)",
              padding: "10px",
              borderRadius: "5px",
              color: "#FFFFFF",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Unrouted Traffic: {trafficData["Unrouted Traffic"].toFixed(2)}%
          </div>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default BackgroundMap;
