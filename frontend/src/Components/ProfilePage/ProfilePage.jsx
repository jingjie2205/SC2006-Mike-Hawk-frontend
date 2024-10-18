import React, { useState } from "react";
import NavBar from "../../Common/NavBar";
import { Box, Button, Flex, Text, VStack, Image, Input, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter } from "@chakra-ui/react";

const ProfilePage = () => {
  // Initial user data
  const [user, setUser] = useState({
    username: "John123",
    email: "John123@gmail.com",
  });

  // State for the popover
  const [newUsername, setNewUsername] = useState(user.username);
  const [newEmail, setNewEmail] = useState(user.email);

  const handleUpdate = () => {
    setUser({ username: newUsername, email: newEmail });
    alert("Profile updated successfully!");
  };
  
  return (
    <div>
      <NavBar />
      <Flex
        bg="#06ADBF"
        p={4}
        align="center"
        width="100%"
        mt={4}
      >
        <Text fontWeight="bold" fontSize="xl" color="white">Hello, John!</Text>
        <Image 
          float='right' 
          align="right" 
          margin="2% 0 2% 60%" 
          boxSize='10%' 
          borderRadius="50%" 
          src='https://bit.ly/dan-abramov' 
          alt='Profile Picture' 
        />
      </Flex>
      <Box mt={6}>
        <VStack spacing={4}>
          <Box
            bg="#F2F2F2"
            p={4}
            borderRadius="md"
            width={{ base: "90%", md: "70%" }} // Responsive width
            textAlign="left"
            mb={4}
          >
            <Text fontWeight="bold" color="black" mb={2}>Username: {user.username}</Text>
            <Text fontWeight="bold" color="black" mb={2}>Email: {user.email}</Text>
            <Popover>
              <PopoverTrigger>
                <Button 
                  ml="65%"                  
                  fontWeight="800" 
                  background="#06ADBF" 
                  color='white' 
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
                    value={newUsername} 
                    onChange={(e) => setNewUsername(e.target.value)} 
                    placeholder="Enter new username"
                  />
                  <Text mt={4} mb={2}>New Email:</Text>
                  <Input 
                    value={newEmail} 
                    onChange={(e) => setNewEmail(e.target.value)} 
                    placeholder="Enter new email"
                  />
                </PopoverBody>
                <PopoverFooter display="flex" justifyContent="flex-end">
                  <Button colorScheme="blue" onClick={handleUpdate}>
                    Update
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Box>

          {["Reset Password", "Feedback", "Log Out"].map((action, index) => (
            <Button 
              key={index} 
              fontWeight="800" 
              background="#06ADBF" 
              color='white' 
              width="66%"
              mb={4}
            >
              {action}
            </Button>
          ))}
        </VStack>
      </Box>
    </div>
  );
}

export default ProfilePage;
