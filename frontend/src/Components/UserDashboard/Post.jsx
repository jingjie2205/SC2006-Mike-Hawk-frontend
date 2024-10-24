import React, { useState, useEffect } from "react";
import { Box, Text, Image, VStack, HStack, IconButton } from "@chakra-ui/react";
import { FaRegThumbsUp, FaCommentDots, FaShare } from "react-icons/fa";

// Post component
function Post({ post }) {
  // Toggle like status for a post
  const [likeStatus, setLikeStatus] = useState({}); // State for like status

  const handleLike = (id) => {
    setLikeStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id], // Toggle the like status
    }));
  };

  return (
    <VStack bg="white" key={post.id}>
      <Box bg="#dddddd" w="100%" margin="3% 0px 3% 0px" padding="3%">
        <Image
          mt="1%"
          mr="3%"
          boxSize="15%"
          float="left"
          src={post.authorityimage}
          alt={post.authority}
        />
        <Text align="left" fontWeight="1000" fontSize="150%" color="black">
          {post.authority}
        </Text>
        <Text align="left" fontWeight="1000" fontSize="80%" color="black">
          Posted at {post.timestamp}
        </Text>
      </Box>

      <Text
        margin="0% 5% 0% 5%"
        align="left"
        fontWeight="1000"
        fontSize="70%"
        color="black"
      >
        {post.description}
      </Text>
      <Image p="2%" boxSize="60%" src={post.image} alt="Fire Alarm" />

      <HStack align="center" mt="1%" mb="2%">
        <HStack mr="0%" onClick={() => handleLike(post.id)}>
          <IconButton
            icon={<FaRegThumbsUp />}
            aria-label="Like"
            fontSize="200%"
            color={likeStatus[post.id] ? "blue" : "grey"} // Change color when liked
            background="white"
          />
          <Text fontWeight="bold" color="black">
            {likeStatus[post.id] ? "Liked" : "Like"}{" "}
            {/* Change text when liked */}
          </Text>
        </HStack>

        <HStack ml="9%" mr="5%">
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
    </VStack>
  );
}

export default Post;
