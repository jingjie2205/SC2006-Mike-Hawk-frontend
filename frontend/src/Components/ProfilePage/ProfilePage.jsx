import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
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
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for delete account dialog
  const cancelRef = useRef();
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId"); // Fetch userId from local storage
  const toast = useToast(); // Initialize Chakra UI's toast
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    // Fetch initial user data from backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/users/users/?user_id=${userId}`
        );
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
          `http://127.0.0.1:8000/users/users/profilePicture/${userId}`,
          {
            responseType: "blob",
          }
        );
        // Check if content is an image
        if (response.headers["content-type"].includes("image/png")) {
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
    if (!newUserName || !newEmailAddress) {
      setError("Both fields are required.");
      return;
    }

    if (!validateEmail(newEmailAddress)) {
      toast({
        title: "Invalid email format",
        description: "Please provide a valid email address.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return; // Return early to prevent further execution
    }

    try {
      const updatedUser = {
        userName: newUserName,
        emailAddress: newEmailAddress,
      };

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
          title:
            "Failed to update profile. Username or email address already exists.",
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

  const handleLogout = () => {
    localStorage.removeItem("userId"); // Clear user data
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAuthority");
    localStorage.removeItem("isModerator");
    navigate("/login"); // Redirect to login page or home page
    toast({
      title: "Logged out successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Delete user
  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/users/users/?user_id=${userId}`
      );
      if (response.status === 200) {
        // Clear user data from local storage
        localStorage.removeItem("userId");
        localStorage.removeItem("authToken");
        localStorage.removeItem("isAuthority");
        localStorage.removeItem("isModerator");

        // Redirect to the login page
        navigate("/login");

        toast({
          title: "Account deleted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Failed to delete account.",
          description: "Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Error deleting account.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <NavBar />
      <Flex bg="#06ADBF" p={4} align="center" mt={4} justify="space-between">
        <Text fontWeight="bold" fontSize="xl" color="white">
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
                    required
                  />
                  <Text mt={4} mb={2}>
                    New Email:
                  </Text>
                  <Input
                    value={newEmailAddress}
                    onChange={(e) => setNewEmailAddress(e.target.value)}
                    placeholder="Enter new email"
                    required
                  />
                </PopoverBody>
                {error && (
                  <Text
                    color="red.500"
                    mt={2}
                    width="100%"
                    textAlign={"center"}
                    alignContent={"center"}
                  >
                    {error}
                  </Text>
                )}
                <PopoverFooter display="flex" justifyContent="flex-end">
                  <Button
                    colorScheme="blue"
                    onClick={handleUpdate}
                    isDisabled={
                      newUserName == user.userName &&
                      newEmailAddress == user.emailAddress
                    }
                  >
                    Update
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Box>

          <Popover>
            <PopoverTrigger>
              <Button
                fontWeight="800"
                background="#06ADBF"
                color="white"
                width="66%"
                mb={4}
              >
                Reset Password
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight="bold">
                Confirm Email for Password Reset
              </PopoverHeader>
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

          <Button
            fontWeight="800"
            background="#06ADBF"
            color="white"
            width="66%"
            mb={4}
            onClick={() => setIsLogoutDialogOpen(true)}
          >
            Log Out
          </Button>
          <Button
            fontWeight="800"
            background="#FF0000"
            color="white"
            width="66%"
            mb={4}
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            Delete Account
          </Button>
          {/* Delete Confirmation Dialog */}
          <AlertDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            leastDestructiveRef={cancelRef}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Confirm Deletion
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to delete your account? This action is
                  permanent and cannot be undone.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button
                    ref={cancelRef}
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={handleDeleteAccount}
                    ml={3}
                  >
                    Delete Account
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>

          {/* Logout Confirmation Dialog */}
          <AlertDialog
            isOpen={isLogoutDialogOpen}
            leastDestructiveRef={cancelRef}
            onClose={() => setIsLogoutDialogOpen(false)}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Log Out
                </AlertDialogHeader>

                <AlertDialogBody>Would you like to log out?</AlertDialogBody>

                <AlertDialogFooter>
                  <Button
                    ref={cancelRef}
                    onClick={() => setIsLogoutDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      handleLogout();
                      setIsLogoutDialogOpen(false);
                    }}
                    ml={3}
                  >
                    Log Out
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </VStack>
      </Box>
    </div>
  );
};

export default ProfilePage;
