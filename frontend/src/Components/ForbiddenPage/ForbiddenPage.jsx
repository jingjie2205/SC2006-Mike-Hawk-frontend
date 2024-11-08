// ForbiddenPage.jsx
import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ForbiddenPage = () => {
  const navigate = useNavigate(); // Use navigate hook to redirect

  const handleRedirectToLogin = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <Box textAlign="center" mt="50px">
      <Text fontSize="2xl" fontWeight="bold">
        403 - Forbidden
      </Text>
      <Text mt="4">
        You do not have permission to access this page. Please log in.
      </Text>
      <Button mt="4" colorScheme="blue" onClick={handleRedirectToLogin}>
        Go to Login
      </Button>
    </Box>
  );
};

export default ForbiddenPage;
