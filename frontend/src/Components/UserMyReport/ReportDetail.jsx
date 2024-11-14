import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import { Link as RouterLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  Image,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  Textarea,
  Tooltip,
  Link,
  HStack,
} from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { IoIosArrowBack } from "react-icons/io";
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
  const isUserAuthority = parseInt(localStorage.getItem("isAuthority"));
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal control
  const toast = useToast();

  const report = location.state?.report;
  const provider = new OpenStreetMapProvider();
  const reportID = report.report_id;
  const [image, setImage] = useState("");
  const dateTime = new Date(report.datetime * 1000);
  const formattedDate = dateTime.toLocaleString();

  const userID = localStorage.getItem("userId");

  if (!report) {
    navigate("/user-reports");
    return null;
  }

  const [latitude, longitude] = report.location
    .split(",")
    .map((coord) => parseFloat(coord.trim()));

  // State for modal fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null); // For image upload component

  // Fetch the main report image
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `${config.baseURL}/reports/reports/reportPicture/${reportID}`,
          {
            responseType: "blob",
          }
        );
        if (response.headers["content-type"].includes("image/png")) {
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

  const handleImageSelect = async (file) => {
    setUploadedImage(file); // Store selected image file
  };

  // Function to handle post submission
  const handlePost = async () => {
    // Validate fields
    console.log(title, description, uploadedImage);
    if (!title || !description || uploadedImage === null) {
      toast({
        title: "Error",
        description: "Title, description, and image are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const formData = new FormData();
      if (uploadedImage) {
        formData.append("image", uploadedImage);
      }

      // Send data to the backend
      await axios.post(
        `${config.baseURL}/posts/posts/posts?user_id=${userID}&title=${title}&description=${description}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Update report status to resolved
      await axios.put(
        `${
          config.baseURL
        }/reports/reports/${reportID}/status?status=${"Resolved"}`
      );

      toast({
        title: "Post created",
        description: "Your post has been successfully created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      setTitle("");
      setDescription("");
      setUploadedImage(null);
    } catch (error) {
      console.error("Error posting:", error);
      toast({
        title: "Error",
        description: "An error occurred while creating your post",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minHeight="100vh">
      {/* Sticky Back Button */}
      <Box
        position="sticky"
        top="0"
        bg="#06ADBF"
        p="4"
        zIndex="1000"
        borderBottom="1px solid #E2E8F0"
        boxShadow="md"
      >
        <HStack>
          <Tooltip label="My Reports">
            <Link as={RouterLink} to="/myreports">
              <IoIosArrowBack size={30} color="white" />
            </Link>
          </Tooltip>
          <Text fontWeight="1000" mt="3%" mb="3%" fontSize="200%" color="white">
            Report Details
          </Text>
        </HStack>
      </Box>

      <Box p={6} mb="60px">
        <VStack align="start" spacing={5}>
          <Box w="100%" bg="#E2E8F0" p={4} borderRadius="md">
            <Text fontWeight="bold" mb={2}>
              Title
            </Text>
            <Text>{report.title}</Text>
          </Box>

          <Box w="100%" bg="#E2E8F0" p={4} borderRadius="md">
            <Text fontWeight="bold" mb={2}>
              Details of the issue:
            </Text>
            <Text>{report.description}</Text>
          </Box>

          <Box width="100%">
            <Text fontWeight="bold" mb={2}>
              Picture:
            </Text>
            <Image
              width="100%"
              src={image}
              alt="Report Image"
              borderRadius="md"
            />
          </Box>

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

          <Box w="100%" bg="#E2E8F0" p={3} borderRadius="md" mt="5%">
            <Text fontWeight="bold">Time:</Text>
            <Text fontSize="lg" fontWeight="medium">
              {formattedDate}
            </Text>
          </Box>

          {/* Conditionally render "Make a Post" button for authorities */}
          { ((report.status === "In Progress" || report.status === "Resolved")) && (
            <Box w="100%">
              <Box bg="#E2E8F0" p={3} borderRadius="md">
                <Text fontWeight="bold">Ollama Description:</Text>
                <Text fontSize="lg" fontWeight="medium">
                  {report.ollama_description}
                </Text>
                <Text fontWeight="bold">Relevance:</Text>
                <Text fontSize="lg" fontWeight="medium">
                  {report.relevance}
                </Text>
                <Text fontWeight="bold">Severity:</Text>
                <Text fontSize="lg" fontWeight="medium">
                  {report.severity}
                </Text>
                <Text fontWeight="bold">Urgency:</Text>
                <Text fontSize="lg" fontWeight="medium">
                  {report.urgency}
                </Text>
              </Box>
              <Box w="100%" bg="#E2E8F0" p={3} borderRadius="md" mt="5%" mb="5">
                <Text fontWeight="bold">Points:</Text>
                <Text fontSize="lg" fontWeight="medium">
                  {report.points}
                </Text>
              </Box>
              {isUserAuthority?  (<Box><Button
                colorScheme="blue"
                onClick={onOpen}
                width="100%"
                align="center"
              >
                Make a Post
              </Button></Box>) : <Box/>
              }
            </Box>
          )}

          {/* Modal for making a post */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Make a Post</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  placeholder="Title"
                  mb={3}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Description"
                  mb={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <ImageUpload onImageSelect={handleImageSelect} />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handlePost}>
                  POST
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

        
        </VStack>
      </Box>
      <Box
        position="fixed"
        bottom="0"
        width="100%"
        overflow="hidden"
        zIndex="1000"
      >
        <NavBar />
      </Box>
    </Box>
  );
}

export default ReportDetail;
