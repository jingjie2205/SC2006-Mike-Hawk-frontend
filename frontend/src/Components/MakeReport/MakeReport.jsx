import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import LocationPicker from "./LocationPicker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
import { Textarea, Box, Button } from "@chakra-ui/react";
import NavBar from "../../Common/NavBar";
import axios from "axios";

function MakeReport() {
  const [dateValue, setDateValue] = useState(new Date());
  const [validity, setValidity] = useState(false);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/reports/report/user/ce4339f1-7598-434a-9e2c-8351eaca5af7"
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmit();

  return (
    <div>
      <NavBar />
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
      >
        <ImageUpload />
        <Textarea
          placeholder="Provide Details Of The Issue"
          maxW="lg"
          w="100%"
          resize="vertical"
          isInvalid={validity}
          onChange={setDescription}
        />
        <Box position="relative" paddingTop={5} paddingBottom={5}>
          <DateTimePicker value={dateValue} onChange={setDateValue} />
        </Box>
        <LocationPicker />
        <Button colorScheme="blue" borderRadius={20} mt={4}>
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default MakeReport;
