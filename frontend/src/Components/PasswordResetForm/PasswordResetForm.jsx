import { React, useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Alert, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Link,
} from "@chakra-ui/react";

function PasswordResetForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // State to store error message
  const [successMessage, setSuccessMessage] = useState(null); // State to store success message
  const [token, setToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("verification_key");
    if (token) {
      setToken(token);  // Store token in the state
    } else {
      setErrorMessage("Invalid reset link.");
    }
  }, [location]);

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      console.log(token);
      console.log(newPassword)
        const response = await axios.post(
        "http://127.0.0.1:8000/public/public/password-reset", {
            verification_key: token,
            new_password: newPassword
        }
      );
      if (response.status === 200) {
        setSuccessMessage("Password reset successfully.");
        setErrorMessage(null); // Clear any previous error
      } else {
        setErrorMessage("Error resetting password. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error processing your request. Please try again.");
    }
  };

  return (
    <Box
      bgGradient="linear(to-r, teal.500, green.500)"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
    >
      <Box
        w={["full", "md"]}
        p={[8, 10]}
        mx="auto"
        border={["none", "1px solid #e8e8e8"]}
        borderColor={["", "gray.200"]}
        borderRadius={10}
        boxShadow="md"
        rounded="md"
        bg="white"
      >
        <Image src="./public/RQ.png" alt="ReportQuest Logo" rounded={10} />

        {/* Error message box */}
        {errorMessage && (
          <Alert status="error" mt={2}>
            <AlertIcon />
            <AlertTitle mr={2}>Error</AlertTitle>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setErrorMessage(null)} />
          </Alert>
        )}

        {/* Success message box */}
        {successMessage && (
          <Alert status="success" mt={2}>
            <AlertIcon />
            <AlertTitle>{successMessage}</AlertTitle>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setSuccessMessage(null)} />
          </Alert>
        )}
          <FormControl>
            <FormLabel htmlFor="newPassword">New Password</FormLabel>
            <div className="wrapper">
              <Input
                id="newPassword"
                type="password"
                rounded={20}
                onChange={handlePasswordChange}
              />
              <FaEnvelope className="icon" />
            </div>

            <FormLabel htmlFor="confirmPassword">Confirm New Password</FormLabel>
            <div className="wrapper">
              <Input
                id="confirmPassword"
                type="password"
                rounded={20}
                onChange={handleConfirmPasswordChange}
              />
              <FaEnvelope className="icon" />
            </div>

            <Button
              borderRadius={20}
              type="submit"
              variant="solid"
              colorScheme="blue"
              width="full"
              onSubmit={handleSubmit}
            >
              Reset Password
            </Button>
          </FormControl>
      </Box>
    </Box>
  );
}

export default PasswordResetForm;
