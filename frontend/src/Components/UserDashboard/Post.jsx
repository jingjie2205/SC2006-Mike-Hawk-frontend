import React, { useState, useEffect } from "react";
import { Box, Text, Image, VStack, HStack } from "@chakra-ui/react";
import axios from "axios";
import config from "../../config";

// Post component
function Post({ post }) {
    const [profilePic, setProfilePic] = useState(""); // State to store the profile picture URL
    const [image, setImage] = useState(""); // State to store the post image URL
    const [loading, setLoading] = useState(true); // State for loading state
    const [error, setError] = useState(null); // State for error
    const user_id = post.user_id;
    const time = post.time;

    // Convert post date from Unix timestamp
    const convertTime = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    useEffect(() => {
        // Fetch profile picture on component mount
        const fetchProfilePic = async () => {
            try {
                setLoading(true); // Set loading to true while fetching
                const response = await axios.get(
                    `${config.baseURL}/users/users/profilePicture/${user_id}`,
                    {
                        responseType: "blob", // Ensure response is a Blob (image)
                    }
                );

                // Log the response headers to check content type
                console.log(response.headers);

                // Check if content is an image
                if (response.headers["content-type"].includes("image/png")) {
                    // Convert blob to an object URL
                    const imageUrl = URL.createObjectURL(response.data);
                    setProfilePic(imageUrl);
                } else {
                    throw new Error("Fetched content is not an image");
                }
            } catch (error) {
                console.error("Error fetching image:", error);
                setError(error.message); // Set error state
            } finally {
                setLoading(false); // Set loading to false once fetch is done
            }
        };

        fetchProfilePic();
    }, [post.user_id]); // Only refetch when userId changes

    useEffect(() => {
        const fetchImage = async () => {
            try {
                console.log(post.post_id);
                const response = await axios.get(
                    `${config.baseURL}/posts/posts/posts/image/${post.post_id}`,
                    { responseType: "blob" }
                );
                if (
                    response.headers["content-type"].includes("image/png") ||
                    response.headers["content-type"].includes("image/jpeg") ||
                    response.headers["content-type"].includes("image/jpg")
                ) {
                    const imageUrl = URL.createObjectURL(response.data);
                    setImage(imageUrl);
                } else {
                    console.error("Fetched content is not an image");
                }
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        fetchImage();
    }, [post.post_id]);

    return (
        <VStack bg="white" key={post.id} align="flex-start" w="100%">
            <Box bg="#dddddd" w="100%" margin="3% 0px 3% 0px" padding="3%">
                {/* Check if the image is still loading or if there's an error */}
                {loading ? (
                    <Text>Loading...</Text> // Show loading text while fetching
                ) : error ? (
                    <Text color="red">Error: {error}</Text> // Show error message
                ) : (
                    <Image
                        mt="1%"
                        mr="3%"
                        boxSize="15%"
                        float="left"
                        src={profilePic || "/path/to/default-image.jpg"} // Fallback image if profilePic is empty
                        alt={post.authority}
                        borderRadius="50%"
                    />
                )}
                <Text
                    align="left"
                    fontWeight="1000"
                    fontSize="150%"
                    color="black"
                >
                    {post.authority_name}
                </Text>
                <Text
                    align="left"
                    fontWeight="1000"
                    fontSize="80%"
                    color="black"
                >
                    Posted at {convertTime(time)}
                </Text>
            </Box>

            <Box w="90%" textAlign="left" ml="5%" mr="5%">
                <Text
                    fontWeight="1000"
                    fontSize="200%"
                    color="black"
                    align="left"
                >
                    {post.title}
                </Text>
                <Text
                    mt={5}
                    fontWeight="500"
                    fontSize="100%"
                    color="black"
                    align="left"
                >
                    {post.description}
                </Text>
            </Box>
            <Image
                p="2%"
                boxSize="60%"
                src={image}
                alt="Post Image"
                mx="auto"
            />
        </VStack>
    );
}

export default Post;
