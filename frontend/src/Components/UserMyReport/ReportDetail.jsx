import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Text, VStack, Image, Button, Input } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import NavBar from "../../Common/NavBar";
import ImageUpload from "../MakeReport/ImageUpload";

// Component to add GeoSearchControl to the map
function SearchControl({ provider }) {
    const map = useMap();

    useEffect(() => {
        const searchControl = new GeoSearchControl({
            provider,
            style: "button",
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
    const location = useLocation();
    const navigate = useNavigate();
    const isUserAuthority = localStorage.getItem("isAuthority") === "true";

    // Get the report data passed from the previous page
    const report = location.state?.report;
    const provider = new OpenStreetMapProvider();

    const reportID = report.report_id;
    const [image, setImage] = useState(""); // State to store the fetched image URL
    const dateTime = new Date(report.datetime * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const formattedDate = dateTime.toLocaleString(); // Default locale and time format

    if (!report) {
        navigate("/user-reports");
        return null;
    }

    // Extract latitude and longitude from report.location
    const [latitude, longitude] = report.location
        .split(",")
        .map((coord) => parseFloat(coord.trim()));

    useEffect(() => {
        // Fetch image URL based on reportId
        const fetchImage = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/reports/reports/reportPicture/${reportID}`,
                    {
                        responseType: "blob",
                    }
                );
                // Check if content is an image
                if (response.headers["content-type"].includes("image/png")) {
                    // Convert blob to an object URL
                    const imageUrl = URL.createObjectURL(response.data);
                    setImage(imageUrl);
                } else {
                    console.error("Fetched content is not an image");
                }
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        fetchImage();
    }, [reportID]);

    return (
        <Box minHeight="100vh">
            <NavBar />
            <Box p={6}>
                <VStack align="start" spacing={5}>
                    {/* Display main image */}
                    <Box w="100%">
                        <Text fontWeight="bold" mb={2}>
                            Picture:
                        </Text>
                        <Image
                            src={image}
                            alt="Report Image"
                            borderRadius="md"
                        />
                    </Box>

                    {/* Display report details */}
                    <Box w="100%" bg="#E2E8F0" p={4} borderRadius="md">
                        <Text fontWeight="bold" mb={2}>
                            Details of the issue:
                        </Text>
                        <Text>{report.description}</Text>
                    </Box>

                    {/* Display location map with Leaflet */}
                    <Box w="100%" h="400" mb="3%">
                        <Text fontWeight="bold" mb={2}>
                            Location:
                        </Text>
                        <MapContainer
                            center={[latitude, longitude]}
                            zoom={13}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[latitude, longitude]} />
                            <SearchControl provider={provider} />
                        </MapContainer>
                    </Box>

                    {/* Display date and time */}
                    <Box w="100%" bg="#E2E8F0" p={3} borderRadius="md" mt="5%">
                        <Text fontWeight="bold">Time:</Text>
                        <Text fontSize="lg" fontWeight="medium">
                            {formattedDate}
                        </Text>
                    </Box>

                    {/* Conditionally render post section based on user authority */}
                    {isUserAuthority && (
                        <Box w="100%">
                            <Input placeholder="Make an announcement" mb={3} />
                            <ImageUpload />
                            <Button colorScheme="blue">POST</Button>
                        </Box>
                    )}
                </VStack>
            </Box>
        </Box>
    );
}

export default ReportDetail;
