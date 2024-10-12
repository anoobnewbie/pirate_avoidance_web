// Step 1: Install Google Maps library
// In your terminal, run the following command to add the required library
// npm install @react-google-maps/api

// Step 2: Update your BackgroundMap component to integrate Google Maps
import { GoogleMap, LoadScript } from "@react-google-maps/api";

function BackgroundMap() {
  // Style for the map container to take up the full screen
  const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
  };

  // Center of the map (Singapore coordinates)
  const center = {
    lat: 1.3521, // Latitude
    lng: 103.8198, // Longitude
  };

   // Custom map options to move controls
     // Define map options to reposition controls
  const mapOptions = {
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    zoomControlOptions: {
      position: window.google?.maps?.ControlPosition?.RIGHT_CENTER,
    },
  };


  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  


  return (
    // LoadScript component loads the Google Maps JavaScript API
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      {/* GoogleMap component to display the map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        options={mapOptions}
        center={center}
        zoom={10} // Zoom level for the map
      />
    </LoadScript>
  );
}

export default BackgroundMap;

// Step 3: Obtain a Google Maps API Key
// - Visit https://developers.google.com/maps/documentation/javascript/get-api-key
// - Generate an API key and replace "YOUR_GOOGLE_MAPS_API_KEY" with your key

// Step 4: Enable the relevant APIs
// - Ensure you enable the Google Maps JavaScript API from the Google Cloud Console

// Step 5: Run your application
// - You should see a map centered on Singapore
// - You can adjust the coordinates in the "center" object to change the map's location
