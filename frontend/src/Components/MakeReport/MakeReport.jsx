import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom"; // Import useNavigate for redirect
import ImageUpload from "./ImageUpload";
import LocationPicker from "./LocationPicker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
import config from "../../config";
import {
  Textarea,
  Box,
  Button,
  VStack,
  Text,
  Input,
  useToast,
} from "@chakra-ui/react";
import NavBar from "../../Common/NavBar";
import axios from "axios";

function MakeReport() {
  const [dateValue, setDateValue] = useState(new Date());
  const [validity, setValidity] = useState(false);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState(""); // Added title state
  const toast = useToast(); // Hook for toast notifications
  const navigate = useNavigate(); // Hook for navigation

  const handleImageSelect = (file) => {
    setImageFile(file);
  };

  // Handle location change
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  // Log the location whenever it updates
  useEffect(() => {
    console.log("Location updated:", location);
  }, [location]); // Runs whenever location state changes

  const handleSubmit = async (e) => {
    if (!imageFile) {
      toast({
        title: "Image Missing",
        description: "Please upload an image for your report.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Ensure location is set before submitting
    if (!location) {
      toast({
        title: "Location Missing",
        description: "Please select a location for your report.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Validate title and description
    if (!title || !description) {
      toast({
        title: "Missing Fields",
        description: "Title and description are required.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const epochTime = Math.floor(dateValue.getTime() / 1000);
    // Prepare FormData for file upload
    const formData = new FormData();
    formData.append("user_id", localStorage.getItem("userId"));
    formData.append("description", description);
    formData.append("title", title);
    formData.append("longitude", parseFloat(location[1].toString())); // Ensure it's a number
    formData.append("latitude", parseFloat(location[0].toString())); // Ensure it's a number
    formData.append("incident_time", epochTime);

    if (imageFile) {
      formData.append("image", imageFile); // Append the image if it's selected
    }

    try {
      const response = await axios.post(
        `${config.baseURL}/reports/reports/submit-report/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } } // Make sure headers are set correctly for file upload
      );

      // Show success toast
      toast({
        title: "Report Submitted",
        description: "Your report has been successfully submitted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Redirect to the main page (adjust the path as needed)
      navigate("/userdashboard"); // Adjust to your actual main page path
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Submission Failed",
        description:
          "There was an error submitting your report. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <VStack bg="#06ADBF" align="center" mt="3%">
        <Text fontWeight="1000" mt="3%" mb="3%" fontSize="200%" color="white">
          Make Report
        </Text>
      </VStack>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="sm"
        p="4"
        maxW="100%"
        mx="auto"
        mt="20px"
        bg="white"
        display="flex"
        flexDirection="column"
        mb="60px"
      >
        <Text>Title:</Text>
        <Input
          placeholder="Enter Report Title"
          maxW="lg"
          w="100%"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Handling title change
          mb="4"
        />

        <Text>Description:</Text>
        <Textarea
          placeholder="Provide Details Of The Issue"
          maxW="lg"
          w="100%"
          resize="vertical"
          isInvalid={validity}
          onChange={(e) => setDescription(e.target.value)}
          mb="4"
        />

        <Text>Image:</Text>
        <ImageUpload onImageSelect={handleImageSelect} />

        <Box position="relative" paddingTop={5} paddingBottom={5}>
          <Text>Time:</Text>
          <DateTimePicker
            value={dateValue}
            onChange={(e) => {
              setDateValue(e);
              console.log(dateValue, typeof dateValue);
            }}
          />
        </Box>

        <Text>Location:</Text>
        <LocationPicker onLocationChange={handleLocationChange} />
        <Button
          colorScheme="blue"
          borderRadius={20}
          mt={4}
          onClick={handleSubmit}
        >
          Submit
        </Button>
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
    </div>
  );
}

export default MakeReport;
