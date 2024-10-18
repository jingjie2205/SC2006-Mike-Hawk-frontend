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
  FaRegThumbsUp,
  FaCommentDots,
  FaShare,
} from "react-icons/fa";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

// Sample report data
const reports = [
  {
    id: 1,
    authority: "Jurong Fire Station",
    authorityimage: "src/Assets/FireStation.png",
    description:
      "We regret to inform our community that the fire alarm system at Jurong Point Mall is currently not functioning due to a technical issue. Our team is working urgently to restore it to full operation. In the meantime, please remain vigilant and report any emergencies directly to 995. Your safety is our top priority, and we will update you as soon as the issue is resolved.",
    image: "src/Assets/FireAlarm.jpg",
    timestamp: "10:45 AM",
  },
  {
    id: 2,
    authority: "Jurong Fire Station",
    authorityimage: "src/Assets/FireStation.png",
    title: "Fire Drill Scheduled",
    description:
      "A fire drill will take place on November 1st at 2 PM. Please ensure all procedures are followed.",
    image: "src/Assets/FireDrill.png",
    timestamp: "09:00 AM",
  }
];

function UserDashboard() {
  return (
    <div>
      <NavBar />

      <VStack bg="#06ADBF" align="center" mt="3%">
        <Text
          fontWeight="1000"
          mt="3%"
          fontSize="200%"
          align="center"
          color="white"
          mb="0px"
        >
          Welcome John
        </Text>
        <HStack alignItems="center" mt="0px">
          <IconButton
            aria-label="Search"
            icon={<FaSearch />}
            fontSize="300%"
            color="white"
            background="#06ADBF"
            p="10"
          />
          <Input
            placeholder="Search Announcements"
            htmlSize="50%"
            height={50}
            borderRadius={25}
            border-color="black"
          />
          <IconButton
            aria-label="Filter"
            icon={<HiOutlineAdjustmentsHorizontal />}
            fontSize="400%"
            color="white"
            background="#06ADBF"
            p="10"
          />
        </HStack>
      </VStack>

      {reports.map((report) => (
        <>
          <VStack bg="white">
            <Box
              bg="#dddddd"
              w="100%"
              margin="3% 0px 3% 0px"
              padding="3%"
            >
              <Image
                mt="1%"
                mr="3%"
                boxSize="15%"
                float="left"
                src={report.authorityimage}
                alt={report.authority}
              />
              <Text
                align="left"
                fontWeight="1000"
                fontSize="150%"
                color="black"
              >
                {report.authority}
              </Text>
              <Text align="left" fontWeight="1000" fontSize="80%" color="black">
                Posted at {report.timestamp}
              </Text>
            </Box>

            <Text
              margin="0% 5% 0% 5%"
              align="left"
              fontWeight="1000"
              fontSize="70%"
              color="black"
            >
              {report.description}
            </Text>
            <Image
              p="2%"
              boxSize="60%"
              src={report.image}
              alt="Fire Alarm"
            />
          </VStack>
          <HStack mt="1%" mb="2%">
            <HStack ml="8%">
              <IconButton
                icon={<FaRegThumbsUp />}
                aria-label="Like"
                fontSize="200%"
                color="grey"
                background="white"
              />
              <Text fontWeight="bold" color="black">
                Like
              </Text>
            </HStack>

            <HStack ml="7%" mr="5%">
              <IconButton
                icon={<FaCommentDots />}
                fontSize="200%"
                color="grey"
                background="white"
              />
              <Text fontWeight="bold" color="black">
                Comment
              </Text>
            </HStack>

            <HStack>
              <IconButton
                icon={<FaShare />}
                aria-label="Share"
                fontSize="200%"
                color="grey"
                background="white"
              />
              <Text fontWeight="bold" color="black">
                Share
              </Text>
            </HStack>
          </HStack>
        </>
      ))}
    </div>
  );
}

export default UserDashboard;
