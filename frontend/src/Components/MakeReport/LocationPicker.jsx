import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  useMap,
} from "react-leaflet";
import { Button, Spinner, Center } from "@chakra-ui/react"; // Import Chakra's Spinner and Center components
import "./LocationPicker.css";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function SetViewOnLocation({ location }) {
  const map = useMap();
  if (location) {
    map.setView(location, 13); // Set map view to user location
  }
  return null;
}

function LocationPicker({ onLocationChange }) {
  const [position, setPosition] = useState([1.28967, 103.85007]); // Initial position (Singapore)
  const [loading, setLoading] = useState(false); // Loading state to control spinner visibility

  const LeafletgeoSearch = () => {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();

      const searchControl = new GeoSearchControl({
        provider,
        marker: {
          customIcon,
        },
      });

      map.addControl(searchControl);

      // Listen for the marker event to update position
      map.on("geosearch/showlocation", (e) => {
        const newPosition = [e.location.y, e.location.x]; // Update position with the selected location's coordinates
        setPosition(newPosition);
        onLocationChange(newPosition); // Send updated location to parent
        console.log("New Position (GeoSearch):", newPosition); // Log the new position
      });

      return () => {
        map.removeControl(searchControl);
        map.off("geosearch/showlocation"); // Clean up event listener
      };
    }, [map]);

    return null;
  };

  // click to place marker
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const newPosition = [e.latlng.lat, e.latlng.lng];
        setPosition(newPosition);
        console.log("New Position (Click):", newPosition); // Log the new position
        onLocationChange(newPosition); // Send updated location to parent
      },
    });

    return <Marker position={position} icon={customIcon}></Marker>;
  }

  // get user location
  const handleGetLocation = () => {
    setLoading(true); // Show the spinner when location fetching starts

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPosition = [pos.coords.latitude, pos.coords.longitude];
          setPosition(newPosition);
          console.log("User Location:", newPosition); // Log the user's position
          onLocationChange(newPosition); // Send updated location to parent
          setLoading(false); // Hide the spinner when location is fetched
        },
        (error) => {
          console.error("Error getting location: ", error);
          setLoading(false); // Hide the spinner if there's an error
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false); // Hide the spinner if geolocation is not supported
    }
  };

  return (
    <div className="map-container" style={{ width: "100%" }}>
      {/* Show loading spinner if location fetching is in progress */}
      {loading ? (
        <Center>
          <Spinner size="xl" color="teal" mb={4} />
        </Center>
      ) : (
        <Button
          colorScheme="teal"
          onClick={handleGetLocation}
          alignContent="center"
          mt={4}
          mb={4}
        >
          Get My Location
        </Button>
      )}
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "400px" }} // Set width 100% and define a height for responsiveness
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <LeafletgeoSearch />
        <SetViewOnLocation location={position} />
      </MapContainer>
    </div>
  );
}

export default LocationPicker;
