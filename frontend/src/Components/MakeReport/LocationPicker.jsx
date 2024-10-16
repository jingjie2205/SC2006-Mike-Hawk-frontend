import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  useMap,
} from "react-leaflet";
import { Button } from "@chakra-ui/react";
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

function LocationPicker() {
  const [position, setPosition] = useState([1.28967, 103.85007]); // Initial position (Singapore)

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
        setPosition([e.location.y, e.location.x]); // Update position with the selected location's coordinates
        console.log([e.location.y, e.location.x]); // Log the new position
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
        setPosition([e.latlng.lat, e.latlng.lng]);
        console.log([e.latlng.lat, e.latlng.lng]); // Log the new position
      },
    });

    return <Marker position={position} icon={customIcon}></Marker>;
  }

  // get user location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          console.log([pos.coords.latitude, pos.coords.longitude]); // Log the user's position
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="map-container">
      <Button colorScheme="teal" onClick={handleGetLocation} mt={4}>
        Get My Location
      </Button>
      <MapContainer center={position} zoom={15} scrollWheelZoom={true}>
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
