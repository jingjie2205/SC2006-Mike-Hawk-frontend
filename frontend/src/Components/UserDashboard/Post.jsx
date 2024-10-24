import React, { useState } from "react";
import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  IconButton,
  Input,
  Button,
} from "@chakra-ui/react";
import { FaRegThumbsUp, FaCommentDots, FaShare } from "react-icons/fa";

// Post component
function Post({ post }) {
  // Toggle like status for a post
  const [likeStatus, setLikeStatus] = useState({}); // State for like status
  const [likeCount, setLikeCount] = useState(post.likeCount || 0); // State for like count
  const [comments, setComments] = useState({}); // State for storing comments
  const [newComment, setNewComment] = useState(""); // State for new comment input
  const [showCommentInput, setShowCommentInput] = useState({}); // State for showing comment input
  const [currentUser] = useState({
    name: "John Doe",
    photo: "https://bit.ly/dan-abramov", // Example user photo URL
  }); // State to keep track of the current user name and photo

  const handleLike = (id) => {
    setLikeStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id], // Toggle the like status
    }));

    // Update like count
    if (!likeStatus[id]) {
      setLikeCount((prevCount) => prevCount + 1);
    } else {
      setLikeCount((prevCount) => prevCount - 1);
    }
  };
  // Handle comment input change
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // Handle comment submit
  const handleCommentSubmit = (postId) => {
    if (newComment.trim() === "") return; // Prevent empty comments

    setComments((prevComments) => ({
      ...prevComments,
      [postId]: [
        ...(prevComments[postId] || []),
        { text: newComment, user: currentUser }, // Add new comment with user data
      ],
    }));

    setNewComment(""); // Clear input field after submission
  };
  const toggleCommentInput = (postId) => {
    setShowCommentInput((prevShow) => ({
      ...prevShow,
      [postId]: !prevShow[postId], // Toggle visibility of the comment input
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

      <HStack align="left" mt="1%" mb="2%" width="90%">
        <HStack onClick={() => handleLike(post.id)}>
          <IconButton
            icon={<FaRegThumbsUp />}
            aria-label="Like"
            fontSize="200%"
            color={likeStatus[post.id] ? "blue" : "grey"} // Change color when liked
            background="white"
          />
          <Text fontWeight="bold" color="black" marginRight={"1%"}>
            {likeCount === 0 ? "" : likeCount}{" "}
            {/* Display "Like" if 0, else display count */}
          </Text>{" "}
          {/* Display like count */}
        </HStack>

        <HStack
          onClick={() => toggleCommentInput(post.id)}
          ml="1%"
        >
          <IconButton
            icon={<FaCommentDots />}
            fontSize="200%"
            color="grey"
            background="white"
          />
          <Text fontWeight="bold" color="black">
            {comments[post.id] && comments[post.id].length > 0
              ? comments[post.id].length
              : ""}
            {/* Display "Comment" if no comments, else display count */}
          </Text>
        </HStack>

        <HStack ml="2%">
          <IconButton
            icon={<FaShare />}
            aria-label="Share"
            fontSize="200%"
            color="grey"
            background="white"
          />
        </HStack>
      </HStack>
      {/* Comments Section */}
      <VStack width="90%" align="left">
        {comments[post.id] &&
          comments[post.id].map((comment, index) => (
            <HStack key={index} align="start" mb="3%">
              <Image
                boxSize="10%"
                borderRadius="full"
                src={comment.user.photo}
                alt={comment.user.name}
                mt="1%"
              />
              <VStack align="left">
                <Text
                  fontWeight="bold"
                  fontSize="80%"
                  color="black"
                  align="left"
                >
                  {comment.user.name}
                </Text>
                <Text fontSize="80%" color="black" align="left">
                  {comment.text}
                </Text>
              </VStack>
            </HStack>
          ))}
      </VStack>

      {/* Comment Input */}
      {showCommentInput[post.id] && (
        <HStack width="80%" align="center" mt="1%">
          <Input
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            size="sm"
            border="1px solid #ddd"
          />
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() => handleCommentSubmit(post.id)}
          >
            Submit
          </Button>
        </HStack>
      )}
    </VStack>
  );
}

export default Post;
