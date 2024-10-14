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

function MakeReport() {
  const [dateValue, setDateValue] = useState(new Date());
  const [validity, setValidity] = useState(false);
  const [description, setDescription] = useState("");
  return (
    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ImageUpload />
        <Textarea
          placeholder="Provide Details Of The Issue"
          maxW="lg"
          w="1000px"
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
      </div>
    </div>
  );
}

export default MakeReport;
