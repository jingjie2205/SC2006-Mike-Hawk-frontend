import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, VStack, Image, Button, Input } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import NavBar from "../../Common/NavBar";
import ImageUpload from "../MakeReport/ImageUpload";

const reports = [
  {
    id: 1,
    title: "Spoilt fire alarm at Jurong Point",
    description: "The fire alarm is broken near the men's toilet at Level B1.",
    image: "src/Assets/FireAlarm.jpg",
    location: { lat: 1.3521, lng: 103.8198 }, // Sample coordinates
    date: "2024-09-03 13:32",
    severity: 5,
  },
  {
    id: 2,
    title: "Pothole at Tampines Street 81",
    description: "The road surface is uneven with noticeable bumps and potholes, potentially hazardous.",
    image: "src/Assets/pothole.jpg",
    location: { lat: 1.3465, lng: 103.944 },
    date: "2023-08-20 13:32",
    severity: 4,
  },
  // ...other reports
];

// Component to add GeoSearchControl to the map
function SearchControl({ provider }) {
  const map = useMap();

  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider,
      style: 'button',
      showMarker: true,
      retainZoomLevel: false,
      animateZoom: true,
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [map, provider]);

  return null;
}

function ReportDetail() {
    const isUserAuthority = true; // Set to true if the user has authority
    const { id } = useParams();
  const report = reports.find((r) => r.id === parseInt(id));
  const provider = new OpenStreetMapProvider();

  return (
    <div>
        <NavBar/>
        <Box p={6}>
        {report ? (
            <VStack align="start" spacing={5}>
            {/* Display main image */}
            <Box w="100%">
                <Text fontWeight="bold" mb={2}>Picture:</Text>
                <Image src={report.image} alt="Report Image" borderRadius="md" />
            </Box>

            {/* Display report details */}
            <Box w="100%" bg="#E2E8F0" p={4} borderRadius="md">
                <Text fontWeight="bold" mb={2}>Details of the issue:</Text>
                <Text>{report.description}</Text>
            </Box>

            {/* Display location map with Leaflet */}
            <Box w="100%" h="300px" mb="3%">
                <Text fontWeight="bold" mb={2}>Location:</Text>
                <MapContainer center={[report.location.lat, report.location.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[report.location.lat, report.location.lng]} />
                <SearchControl provider={provider} />
                </MapContainer>
            </Box>

            {/* Display date and time */}
            <Box w="100%" bg="#E2E8F0" p={3} borderRadius="md" mt="5%">
                <Text fontWeight="bold">Time:</Text>
                <Text fontSize="lg" fontWeight="medium">{report.date}</Text>
            </Box>

            {/* Conditionally render post section based on user authority */}
            {isUserAuthority && (
              <Box w="100%">
                <Input placeholder="Make an announcement" mb={3} />
                <ImageUpload/>
                <Button colorScheme="blue">POST</Button>
              </Box>
            )}
            </VStack>
        ) : (
            <Text>Report not found</Text>
        )}
        </Box>
    </div>
  );
}

export default ReportDetail;
