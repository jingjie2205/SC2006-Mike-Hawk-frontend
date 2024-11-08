import React, { useState, useEffect } from "react";
import NavBar from "../../Common/NavBar";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  Image,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Textarea,
  useToast,
} from "@chakra-ui/react";

const ProfilePage = () => {
  const [user, setUser] = useState({
    userID: "",
    userName: "",
    emailAddress: "",
    loginStatus: true,
    points: 0,
    notificationEnabled: true,
    isAuthority: false,
    isModerator: false,
  });

  const [newUserName, setNewUserName] = useState("");
  const [newEmailAddress, setNewEmailAddress] = useState("");
  const [feedback, setFeedback] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [image, setImage] = useState(""); // State to store the fetched image URL

  const userId = localStorage.getItem("userId"); // Fetch userId from local storage
  const toast = useToast(); // Initialize Chakra UI's toast

  
  useEffect(() => {
    // Fetch initial user data from backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/users/users/?user_id=${userId}`);
        if (response.status === 200) {
          setUser(response.data); // Assuming response contains { userID, userName, emailAddress, ... }
          setNewUserName(response.data.userName);
          setNewEmailAddress(response.data.emailAddress);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    // Fetch image URL based on userId
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/users/users/profilePicture/${userId}`, {
            responseType: 'blob'
          }
        );
        // Check if content is an image
        if (response.headers['content-type'].includes('image/png')) {
          // Convert blob to an object URL
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
  }, [userId]);

  const handleUpdate = async () => {
    try {
      const updatedUser = {
        userName: newUserName,
        emailAddress: newEmailAddress,
      };
  
      // Send PUT request to update user information
      const response = await axios.put(
        `http://127.0.0.1:8000/users/users/${user.userID}/update/`,
        updatedUser
      );
  
      if (response.status === 200) {
        setUser((prevUser) => ({
          ...prevUser,
          userName: newUserName,
          emailAddress: newEmailAddress,
        }));
        toast({
          title: "Profile updated successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Failed to update profile. Username or email address already exists.",
          description: "Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Username or email address already exists.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  

  const handlePasswordReset = () => {
    if (resetEmail === user.email) {
      alert(`A password reset link has been sent to ${resetEmail}`);
      setResetEmail(""); // Clear input after reset
    } else {
      alert("Email does not match our records. Please try again.");
    }
  };

  const handleFeedbackSubmit = () => {
    alert(`Feedback submitted: ${feedback}`);
    setFeedback(""); // Clear feedback input after submission
  };

  return (
    <div overflowX="hidden">
      <NavBar />
      <Flex bg="#06ADBF" p={4} align="center" mt={4} justify="space-between">
        <Text fontWeight="bold" fontSize="xl" color="white" >
          Hello, {user.userName}!
        </Text>
        <Image
          float="right"
          align="right"
          boxSize="15%"
          borderRadius="50%"
          src={image || "https://bit.ly/dan-abramov"}
          alt="Profile Picture"
        />
      </Flex>
      <Box mt={6}>
        <VStack spacing={4}>
          <Box
            bg="#F2F2F2"
            p={4}
            borderRadius="md"
            width={{ base: "90%", md: "70%" }}
            textAlign="left"
            mb={4}
          >
            <Text fontWeight="bold" color="black" mb="5%">
              Username: {user.userName}
            </Text>
            <Text fontWeight="bold" color="black" mb="5%">
              Email: {user.emailAddress}
            </Text>
            
            <Popover>
              <PopoverTrigger>
                <Button
                  ml="65%"
                  fontWeight="800"
                  background="#06ADBF"
                  color="white"
                  width="30%"
                >
                  Update
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader fontWeight="bold">Update Profile</PopoverHeader>
                <PopoverBody>
                  <Text mb={2}>New Username:</Text>
                  <Input
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Enter new username"
                  />
                  <Text mt={4} mb={2}>
                    New Email:
                  </Text>
                  <Input
                    value={newEmailAddress}
                    onChange={(e) => setNewEmailAddress(e.target.value)}
                    placeholder="Enter new email"
                  />
                </PopoverBody>
                <PopoverFooter display="flex" justifyContent="flex-end">
                  <Button colorScheme="blue" onClick={handleUpdate} isDisabled={newUserName == user.userName && newEmailAddress == user.emailAddress}>
                    Update
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Box>

          <Popover>
            <PopoverTrigger>
              <Button fontWeight="800" background="#06ADBF" color='white' width="66%" mb={4}>
                Reset Password
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight="bold">Confirm Email for Password Reset</PopoverHeader>
              <PopoverBody>
                <Text mb={2}>Please confirm your email:</Text>
                <Input
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end">
                <Button colorScheme="blue" onClick={handlePasswordReset}>
                  Send Reset Email
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger>
              <Button fontWeight="800" background="#06ADBF" color='white' width="66%" mb={4}>
                Feedback
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight="bold">Submit Feedback</PopoverHeader>
              <PopoverBody>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter your feedback here"
                  mb={2}
                />
              </PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end">
                <Button colorScheme="blue" onClick={handleFeedbackSubmit}>
                  Submit
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>

          <Button fontWeight="800" background="#06ADBF" color='white' width="66%" mb={4}>
            Log Out
          </Button>
          <Button fontWeight="800" background="#FF0000" color='white' width="66%" mb={4}>
            Delete Account
          </Button>
        </VStack>
      </Box>
    </div>
  );
};


export default ProfilePage;
