import React from "react";
import NavBar from "../../Common/NavBar";
import { Box, Button, Flex, Avatar, Text, Input, VStack, IconButton, Image, HStack} from "@chakra-ui/react";
import { FaSearch, FaRegThumbsUp, FaCommentDots, FaShare } from 'react-icons/fa';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

function UserDashboard() {
  return (
    <div>
      <NavBar />
      <h1>User Dashboard</h1>
      <VStack
        bg="#06ADBF"
        align="center"
      >
        <Text fontWeight="1000" fontSize="200%" align="center" color="white" mb="0px">Welcome John</Text>
        <Box alignItems="center" mt="0px">
          <IconButton
            aria-label="Search"
            icon={<FaSearch />}
            fontSize='40'
            color="white"
            background="#06ADBF"
            p="10" />
          <Input placeholder="Search Announcements" htmlSize={100} height={50} borderRadius={25} border-color="black" />
          <IconButton
            aria-label="Filter"
            icon={<HiOutlineAdjustmentsHorizontal />}
            fontSize='50'
            color="white"
            background="#06ADBF"
            p="10" />
        </Box>
      </VStack>
      <VStack
        bg="white"
        align="center"
      >
        <Box
          bg="#dddddd"
          alignItems="center"
          w="100%"
          margin="3% 0px 3% 0px">
          <Image p="2%" boxSize='10%' float='left' src="src/FireStation.png" alt="Fire Station" />
          <Text margin="3% 0px 0px 16%" align="left" fontWeight="1000" fontSize="200%" color="black" >Jurong Fire Station </Text>
          <Text margin="0% 0px 3% 16%" align="left" fontWeight="1000" fontSize="100%" color="black" >Posted at 10:45 am </Text>
        </Box>

        <Text margin="0% 5% 0% 5%" align="left" fontWeight="1000" fontSize="100%" color="black" >We regret to inform our community that the fire alarm system at Jurong Point Mall is currently not functioning due to a technical issue.
          Our team is working urgently to restore it to full operation. In the meantime, please remain vigilant and report any emergencies directly to 995. Your safety is our top priority, and we will update you as soon as the issue is resolved."</Text>
        <Image p="2%" boxSize='40%' src="src/FireAlarm.jpg" alt="Fire Alarm" />

        <HStack mt="5px" w="50vw" spacing='25%'>
          <HStack>
            <IconButton
              icon={<FaRegThumbsUp />}
              aria-label="Like"
              fontSize='50'
              color="grey"
              background="white"
            />
            <Text ml="3" fontWeight="bold" color="black">Like</Text>
          </HStack>

          <HStack >
            <IconButton
              icon={<FaCommentDots />}
              fontSize='50'
              color="grey"
              background="white"
            />
            <Text ml="3" fontWeight="bold" color="black">Comment</Text>
          </HStack>


          <HStack >
            <IconButton
              icon={<FaShare />}
              aria-label="Share"
              fontSize='50'
              color="grey"
              background="white"
            />
            <Text ml="3" fontWeight="bold" color="black">Share</Text>
          </HStack>
        </HStack>
      </VStack>
    </div>
  );
}

export default UserDashboard;
