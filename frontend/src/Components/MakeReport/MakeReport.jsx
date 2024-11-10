import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import LocationPicker from "./LocationPicker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
import { Textarea, Box, Button, VStack, Text } from "@chakra-ui/react";
import NavBar from "../../Common/NavBar";
import axios from "axios";

function MakeReport() {
  const [dateValue, setDateValue] = useState(new Date());
  const [validity, setValidity] = useState(false);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageSelect = (file) => {
    setImageFile(file);
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    console.log("Location updated:", newLocation);
  };

  const handleSubmit = async (e) => {
    const epochTime = Math.floor(dateValue.getTime() / 1000);
    console.log(epochTime);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/reports/reports/submit-report/",
        {
          user_id: localStorage.getItem("userId"),
          description: description,
          title: "",
          location: (location[0].toString(), location[1].toString()),
          time: epochTime,
          image: imageFile,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
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
        alignItems="center"
        mb="60px"
      >
        <ImageUpload onImageSelect={handleImageSelect} />
        <Textarea
          placeholder="Provide Details Of The Issue"
          maxW="lg"
          w="100%"
          resize="vertical"
          isInvalid={validity}
          onChange={setDescription}
        />
        <Box position="relative" paddingTop={5} paddingBottom={5}>
          <DateTimePicker
            value={dateValue}
            onChange={(e) => {
              setDateValue(e);
              console.log(dateValue, typeof dateValue);
            }}
          />
        </Box>
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
      <Box position="fixed" bottom="0" width="100%" overflow="hidden" zIndex="1000">
        <NavBar />
      </Box>
    </div>
  );
}

export default MakeReport;
