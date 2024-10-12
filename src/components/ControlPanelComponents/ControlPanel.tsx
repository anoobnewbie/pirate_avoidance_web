"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

import { StartPortCombobox, EndPortCombobox } from "./PortCombobox";
import CargoCombobox from "./CargoCombobox";

function ControlPanel() {
  const [valueCargo, setValueCargo] = React.useState("");
  const [valueStartPort, setValueStartPort] = React.useState("");
  const [valueEndPort, setValueEndPort] = React.useState("");

  const handleUpdatePredictions = async (): Promise<void> => {
    console.log("Selected Cargo Type:", valueCargo);
    console.log("Selected Start Port:", valueStartPort);
    console.log("Selected End Port:", valueEndPort);

    // Latitude and longitude mappings for ports
    interface Coordinates {
      lat: number;
      lon: number;
    }

    const portCoordinates: Record<string, Coordinates> = {
      "Port of Shanghai": { lat: 31.2304, lon: 121.4737 },
      "Port of Singapore": { lat: 1.3521, lon: 103.8198 },
      "Port of Los Angeles": { lat: 33.7406, lon: -118.2712 },
      "Port of New York": { lat: 40.7128, lon: -74.006 },
      "Port of Kaohsiung": { lat: 22.6163, lon: 120.3039 },
      "Port of Rotterdam": { lat: 51.9225, lon: 4.4792 },
      "Port of Hamburg": { lat: 53.5511, lon: 9.9937 },
    };

    const startCoordinates = portCoordinates[valueStartPort];
    const endCoordinates = portCoordinates[valueEndPort];

    if (startCoordinates && endCoordinates) {
      const requestData = {
        start_lat: startCoordinates.lat,
        start_lon: startCoordinates.lon,
        end_lat: endCoordinates.lat,
        end_lon: endCoordinates.lon,
      };

      console.log("API Request Data:", requestData);

      try {
        const response = await fetch("http://localhost:8000/calculate-route/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
          referrerPolicy: "no-referrer-when-downgrade",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        console.log("API Response Data:", responseData);

        // Append start and end coordinates to the route array
        const updatedRoute = [
          [startCoordinates.lat, startCoordinates.lon],
          ...responseData.route,
          [endCoordinates.lat, endCoordinates.lon],
        ];

        // Format and print the response data
        const formattedRoute = updatedRoute
          .map(
            ([lat, lon]: [number, number], index: number) =>
              `Waypoint ${index + 1}: Latitude ${lat}, Longitude ${lon}`
          )
          .join("\n");

        const formattedResponse = `
        Distance: ${responseData.distance} ${responseData.units}
        Route:
        ${formattedRoute}
        `;

        console.log(formattedResponse);
      } catch (error) {
        console.error("Failed to fetch API data:", error);
      }
    } else {
      console.error("Invalid start or end port selected.");
    }
  };

  return (
    <div
      className="absolute bottom-3 right-3 w-1/4 bg-white shadow-lg p-4 rounded-xl"
      style={{
        backgroundImage: `
        radial-gradient(circle, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 1) 100%),
        linear-gradient(90deg, rgba(200, 200, 200, 0.2) 1px, transparent 1px),
        linear-gradient(0deg, rgba(200, 200, 200, 0.2) 1px, transparent 1px)
      `,
        backgroundSize: "20px 20px",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.6)",
      }}
    >
      {/* Cargo Type Combobox */}
      <CargoCombobox value={valueCargo} setValue={setValueCargo} />

      {/* Start Port Combobox */}
      <StartPortCombobox value={valueStartPort} setValue={setValueStartPort} />

      {/* End Port Combobox */}
      <EndPortCombobox value={valueEndPort} setValue={setValueEndPort} />

      {/* Update Predictions Button */}
      <Button className="w-full mt-4" onClick={handleUpdatePredictions}>
        Update Predictions
      </Button>
    </div>
  );
}

export default ControlPanel;
