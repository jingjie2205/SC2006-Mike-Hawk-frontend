import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../Common/NavBar";
import SortBy from "../UserMyReport/SortBy";
import {
    Text,
    Input,
    VStack,
    HStack,
    InputGroup,
    InputLeftElement,
    Box,
    Select,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import Post from "./Post";
import config from "../../config";

function UserDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [postsData, setPostsData] = useState([]);
    const [sortOption, setSortOption] = useState("Newest");
    const userName = localStorage.getItem("userName");

    // Debounce search term to avoid excessive filtering
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Consolidated effect to filter and sort posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `${config.baseURL}/posts/posts/posts/`
                );
                setPostsData(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    // Apply filtering and sorting to posts
    useEffect(() => {
        const filteredAndSorted = postsData
            .filter(
                (post) =>
                    post.description
                        .toLowerCase()
                        .includes(debouncedTerm.toLowerCase()) ||
                    post.authority_name
                        .toLowerCase()
                        .includes(debouncedTerm.toLowerCase())
            )
            .sort((a, b) => {
                if (sortOption === "Newest") {
                    return b.time - a.time;
                } else {
                    return a.time - b.time;
                }
            });

        setFilteredPosts(filteredAndSorted);
    }, [debouncedTerm, postsData, sortOption]);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    return (
        <div vw="100%">
            <VStack bg="#06ADBF" mt="3%" py="4" spacing="3">
                <Text
                    fontWeight="bold"
                    fontSize="2xl"
                    color="white"
                    mb="0"
                    align="center"
                >
                    Welcome {userName}
                </Text>
                <HStack width="80%" alignItems="center" spacing="4">
                    <InputGroup flex="1">
                        <InputLeftElement h="full" ml="2%">
                            <FaSearch
                                color="white"
                                fontSize="1.2em"
                                pointerEvents="none"
                            />
                        </InputLeftElement>
                        <Input
                            placeholder="Search Announcements"
                            _placeholder={{ color: "white" }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            height="50px"
                            borderRadius="25px"
                            borderColor="white"
                            color="white"
                            bg="whiteAlpha.300"
                            _hover={{ borderColor: "gray.300" }}
                            _focus={{ borderColor: "white" }}
                        />
                    </InputGroup>

                    <Select
                        value={sortOption}
                        onChange={handleSortChange}
                        width="30%"
                        height="50px"
                        bg="white"
                        borderRadius="25px"
                        borderColor="white"
                        color="black"
                        _hover={{ bg: "gray.100" }}
                        _focus={{ borderColor: "white" }}
                    >
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                    </Select>
                </HStack>
            </VStack>

            {/* Render filtered posts */}
            {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                    <Post key={post.post_id} post={post} vw="100vw" />
                ))
            ) : (
                <Box
                    textAlign="center"
                    py="6"
                    bg="gray.100"
                    borderRadius="md"
                    mx="4"
                    my="8"
                    boxShadow="md"
                >
                    <Text fontSize="lg" fontWeight="bold" color="gray.600">
                        No posts found
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                        Try adjusting your search or sorting options.
                    </Text>
                </Box>
            )}
            <Box mb="60px" />
            <Box position="fixed" bottom="0" width="100%" overflow="hidden">
                <NavBar />
            </Box>
        </div>
    );
}

export default UserDashboard;
