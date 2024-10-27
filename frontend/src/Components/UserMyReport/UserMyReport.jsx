import React from "react";
import NavBar from "../../Common/NavBar";
import {
  Box,
  Text,
  Input,
  VStack,
  IconButton,
  Image,
  HStack,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import SortBy from "./SortBy";

// Sample report data
const reports = [
  {
    id: 1,
    description: "Spoilt fire alarm at Jurong Point 5:30 PM, 3rd Sept 2024",
    image: "src/Assets/FireAlarm.jpg",
    isActive: true,
    Datetime: "5:30 PM, 3rd Sept 2024",
  },
  {
    id: 2,
    title: "Pothole at Tampines Street 81",
    description: "Pothole at Tampines Street 81, 1:30pm 30th Aug 2024",
    image: "src/Assets/pothole.jpg",
    isActive: false,
    Datetime: "1:30pm 30th Aug 2024",
  },
  {
    id: 3,
    title: "Aircon leak at Sengkang Interchange",
    description: "Aircon leak at Sengkang Interchange, 5:00pm 12 May",
    image: "src/Assets/AirconLeakage.webp",
    isActive: false,
    Datetime: "5:00pm 12 May",
  },
];

function UserMyReport() {
  return (
    <div>
      <NavBar />

      <VStack bg="#06ADBF" align="center" mt="3%">
        <Text fontWeight="1000" mt="3%" mb="3%" fontSize="200%" color="white">
          My Reports
        </Text>
      </VStack>
      <HStack alignItems="center" mt="3%" position={"sticky"} m="3%" p="10px">
        <Input
          placeholder="Search For Your Reports"
          height={45}
          borderRadius={25}
          backgroundColor="#D3D3D3"
          border-color="black"
          ml="3%"
        />
        <IconButton
          aria-label="Search"
          icon={<FaSearch />}
          fontSize="200%"
          background="white"
          color="grey"
          paddingRight="2%"
        />
      </HStack>

      <Text
        fontWeight="500"
        mt="3%"
        mr="5%"
        mb="3%"
        fontSize="100%"
        align="right"
        color="black"
      ></Text>

      <Text
        fontWeight="500"
        m="0 10% 0 10%"
        fontSize="300%"
        align="centre"
        color="black"
        borderRadius={40}
      >
        Active Reports
      </Text>
      <SortBy />
      <VStack bg="white" align="center">
        {reports
          .filter((report) => report.isActive)
          .map((report) => (
            <Box
              bg="#dddddd"
              alignItems="center"
              w="80%"
              margin="3% 0px 3% 0px"
              padding="3%"
            >
              <Image
                mt="1%"
                mr="3%"
                boxSize="30%"
                float="left"
                src={report.image}
                alt="Fire Alarm"
              />
              <Text
                mt="4%"
                align="left"
                fontWeight="500"
                fontSize="80%"
                color="black"
              >
                {report.description}
              </Text>
            </Box>
          ))}
      </VStack>

      <Text
        fontWeight="500"
        mt="0%"
        mb="0%"
        fontSize="300%"
        align="center"
        color="black"
      >
        Past Reports
      </Text>
      <VStack bg="white" align="center">
        {reports
          .filter((report) => !report.isActive)
          .map((report) => (
            <Box
              bg="#dddddd"
              alignItems="center"
              w="80%"
              margin="3% 0px 3% 0px"
              padding="3%"
            >
              <Image
                mt="1%"
                mr="3%"
                boxSize="30%"
                float="left"
                src={report.image}
                alt="Fire Alarm"
              />
              <Text
                mt="4%"
                align="left"
                fontWeight="500"
                fontSize="80%"
                color="black"
              >
                {report.description}
              </Text>
            </Box>
          ))}
      </VStack>
    </div>
  );
}

export default UserMyReport;
