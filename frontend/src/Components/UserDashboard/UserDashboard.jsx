import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import NavBar from "../../Common/NavBar";
import {
  Text,
  Input,
  VStack,
  IconButton,
  HStack,
  InputGroup,
  InputLeftElement,
  Box,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Post from "./Post";
import config from "../../config"; // Assuming you have a config for the API base URL

function UserDashboard() {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm); // Debounced search term
  const [filteredPosts, setFilteredPosts] = useState([]); // State for filtered posts
  const [postsData, setPostsData] = useState([]); // State for all fetched posts

  // Effect to update the debounced search term with a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500); // Delay of 500ms

    return () => {
      clearTimeout(timer); // Clear the timeout if searchTerm changes
    };
  }, [searchTerm]);

  // Effect to filter posts based on the debounced search term
  useEffect(() => {
    const filtered = postsData.filter(
      (post) =>
        post.description.toLowerCase().includes(debouncedTerm.toLowerCase()) ||
        post.authority_name.toLowerCase().includes(debouncedTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [debouncedTerm, postsData]);

  // Fetch posts data from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/posts/posts/posts/`);
        setPostsData(response.data); // Set posts data in state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div vw="100%">
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
              <FaSearch color="white" fontSize="1.2em" pointerEvents="none" />
            </InputLeftElement>
            <Input
              placeholder="Search Announcements"
              _placeholder={{ color: "white" }}
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

      {/* Render filtered posts */}
      {filteredPosts.map((post) => (
        <Post key={post.post_id} post={post} vw="100vw" />
      ))}
      <Box mb="60px" />
      <Box position="fixed" bottom="0" width="100%" overflow="hidden">
        <NavBar />
      </Box>
    </div>
  );
}

export default UserDashboard;
