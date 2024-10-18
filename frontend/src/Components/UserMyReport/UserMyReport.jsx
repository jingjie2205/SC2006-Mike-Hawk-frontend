import React from "react";
import NavBar from "../../Common/NavBar";
import {
  Box,
  Button,
  Flex,
  Avatar,
  Text,
  Input,
  VStack,
  IconButton,
  Image,
  HStack,
} from "@chakra-ui/react";
import {
  FaSearch,
} from "react-icons/fa";

function UserMyReport() {
  return (
    <div>
      <NavBar />

      <VStack bg="#06ADBF" align="center" mt="3%">
        <Text fontWeight="1000" mt="3%" mb="3%" fontSize="200%" color="white">
          My Reports
        </Text>
      </VStack>
      <HStack alignItems="center" mt="3%">
        <IconButton
          aria-label="Search"
          icon={<FaSearch />}
          fontSize="200%"
          background="white"
          color="grey"
          padding="5%"
        />
        <Input
          placeholder="Search For Your Reports"
          height={45}
          borderRadius={25}
          backgroundColor="#D3D3D3"
          border-color="black"
          mr="3%"
        />
      </HStack>
      
      <Text fontWeight="500" mt="3%" mr="5%" mb="3%" fontSize="100%" align="right" color="black">
        Sorted by: Most recent
      </Text>

      <Text fontWeight="500" mt="3%" ml="5%" mb="3%" fontSize="100%" align="left" color="black">
        Active Reports
      </Text>
      <VStack bg="white" align="center">
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
            src="src/Assets/FireAlarm.jpg"
            alt="Fire Alarm"
          />
          <Text mt="4%" align="left" fontWeight="500" fontSize="80%" color="black">
          Spoilt fire alarm at Jurong
          Point, 5:30pm 3rd Sept 2024          
          </Text>
        </Box>
      </VStack>

      <Text fontWeight="500" mt="3%" ml="5%" mb="3%" fontSize="100%" align="left" color="black">
        Past Reports
      </Text>
      <VStack bg="white" align="center">
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
            src="src/Assets/pothole.jpg"
            alt="Pothole"
          />
          <Text mt="4%" align="left" fontWeight="500" fontSize="80%" color="black">
          Pothole at Tampines Street 81, 1:30pm 30th Aug 2024         
          </Text>
        </Box>
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
            src="src/Assets/AirconLeakage.webp"
            alt="Aircon Leakage"
          />
          <Text mt="4%" align="left" fontWeight="500" fontSize="80%" color="black">
          Aircon leak at Sengkang 
          Interchange, 5:00pm 12 May          
          </Text>
        </Box>
      </VStack>
    </div>
  );
}

export default UserMyReport;
