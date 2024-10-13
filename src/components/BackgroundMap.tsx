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

  const [trafficData, setTrafficData] = useState<{
    [key: string]: number | string;
  } | null>(null);

  const [center, setCenter] = useState({ lat: 1.2555, lng: 104.0089 });

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
        console.log(`Fetching traffic data for attack port: ${attackPort}`);

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
        console.log("Received traffic data from backend:", data);
        setTrafficData(data);

        // Smooth transition to the new center
  if (mapRef.current && attackPort) {
    const newCenter = { 
      lat: portCoordinates[attackPort].lat, 
      lng: portCoordinates[attackPort].lon 
    };
    setCenter(newCenter);

    mapRef.current.panTo(newCenter);

    // Smooth zoom effect
    const currentZoom = 12;
    const targetZoom = 10;
    const steps = 10;
    const zoomStep = (targetZoom - currentZoom) / steps;

    let step = 0;
    const zoomInterval = setInterval(() => {
      if (step < steps && currentZoom < targetZoom) {
        mapRef.current?.setZoom((currentZoom - zoomStep * step));
        step++;
      } else {
        clearInterval(zoomInterval);
      }
    }, 50);
  }
      } catch (error) {
        console.error("Error fetching traffic data:", error);
      }
    };

    fetchTrafficData();
  }, [attackPort]);

  useEffect(() => {
    if (trafficData) {
      console.log("Updated traffic data state:", trafficData);
    }
  }, [trafficData]);

  const getTrafficColor = (percentage: number) => {
    if (percentage >= 40) {
      return "rgb(139, 0, 0)"; // Dark red
    } else if (percentage >= 10 && percentage < 40) {
      const redIntensity = Math.floor(255 * ((percentage - 10) / 30));
      return `rgb(${redIntensity}, 255, 0)`; // Shades of yellow/red
    } else {
      const greenIntensity = Math.floor(255 * (percentage / 10));
      return `rgb(0, 255, ${greenIntensity})`; // Green for low traffic
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
        {Object.entries(routes).map(([, route], index) => (
          <React.Fragment key={index}>
            <PolylineF
              path={route.map(([lng, lat]) => ({ lat, lng }))}
              options={polylineOptions}
            />
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
                    ? `: ${typeof trafficData[portName] === "number" ? (trafficData[portName] as number).toFixed(2) : trafficData[portName]}%`
                    : ""
                }`,
                fontSize: "14px", // Larger font size
                fontWeight: "bold",
                color:
                  portName === attackPort
                    ? "#FF0000" // Completely red for the affected city
                    : trafficData && trafficData[portName] !== undefined
                    ? getTrafficColor(trafficData[portName] as number)
                    : "#FFFFFF", // Adjust text color based on traffic percentage
                className: "map-label",
              }}
            />
          )
        )}

        {/* Render unrouted traffic, total cost, and total time labels */}
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
            <div>Unrouted Traffic: {typeof trafficData["Unrouted Traffic"] === "number" ? trafficData["Unrouted Traffic"].toFixed(2) : trafficData["Unrouted Traffic"]}%</div>
            <div>Extra Cost: ${trafficData["Total Cost"]}</div>
            <div>Extra Time: {trafficData["Total Time"]} hours</div>
          </div>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default BackgroundMap;
