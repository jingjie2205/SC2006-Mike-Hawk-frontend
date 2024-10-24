import React, { useState, useEffect } from "react";
import NavBar from "../../Common/NavBar";
import {
  Text,
  Input,
  VStack,
  IconButton,
  HStack,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Post from "./Post";

// Sample post data
const postsData = [
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
    description:
      "A fire drill will take place on November 1st at 2 PM. Please ensure all procedures are followed.",
    image: "src/Assets/FireDrill.png",
    timestamp: "09:00 AM",
  },
];

function UserDashboard() {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm); // Debounced search term
  const [filteredPosts, setFilteredReports] = useState(postsData); // State for filtered reports

  // Effect to update the debounced search term with a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500); // Delay of 500ms

    return () => {
      clearTimeout(timer); // Clear the timeout if searchTerm changes
    };
  }, [searchTerm]);

  // Effect to filter reports based on the debounced search term
  useEffect(() => {
    const filtered = postsData.filter(
      (post) =>
        post.description.toLowerCase().includes(debouncedTerm.toLowerCase()) ||
        post.authority.toLowerCase().includes(debouncedTerm.toLowerCase())
    );
    setFilteredReports(filtered);
  }, [debouncedTerm]);

  return (
    <div>
      <NavBar />

      <VStack bg="#06ADBF" mt="3%">
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
          <InputGroup startElement={<FaSearch />}>
            <InputLeftElement h="full" ml="2%">
              <FaSearch color="white"  fontSize='1.2em' pointerEvents='none'/>
            </InputLeftElement>
            <Input
              placeholder="Search Announcements"
              _placeholder={{ color: 'white' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term with user input
              htmlSize="50%"
              height={50}
              borderRadius={25}
              borderColor="white"
              size="md"
            />
          </InputGroup>

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

      {/* Render filtered reports */}
      {filteredPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default UserDashboard;
