import { React, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./LoginForm.css";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react';

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Link,
  border,
} from "@chakra-ui/react";

function LoginForm() {
  // states for login input boxes
  const [name, setUsername] = useState("");
  const [pw, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // State to store error message

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/public/public/login",
        {
          username: name,
          password: pw,
        }
      );
      if (response.status === 200) {
        // Handle successful login (response.data contains the response)
        console.log("Login successful", response.data);
      } else {
        // Handle unexpected status code
        console.log("Unexpected response code:", response.status);
      }

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userId", response.data.user_id);
      localStorage.setItem("isAuthority", response.data.isAuthority);
      localStorage.setItem("isModerator", response.data.isModerator);

      // Conditional redirect based on the user's role
      if (response.data.isAuthority) {
        window.location.href = "/userdashboard"; // Redirect to authority dashboard
      } else if (response.data.isModerator) {
        window.location.href = "/moderatordashboard"; // Redirect to moderator dashboard
      } else {
        window.location.href = "/userdashboard"; // Redirect to user dashboard
      }
    } catch (error) {
      if (error.response) {
        // Handle error based on the server's response
        if (error.response.status != 200) {
          setErrorMessage("Invalid Credentials");
        } else {
          setErrorMessage(`Error: ${error.response.status} - ${error.response.statusText}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage("No response from the server.");
      } else {
        // Something else happened while setting up the request
        setErrorMessage("Error setting up the request: " + error.message);
      }
    }
  };

  return (
    <div>
      

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
          <AlertDescription>{errorMessage}</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setErrorMessage(null)} />
        </Alert>
        )}
        <FormControl>
          <FormLabel htmlFor="Username">Username</FormLabel>
          <div class="wrapper">
            <Input
              id="username"
              type="username"
              rounded={20}
              onChange={handleUsername}
            />
            <FaUser class="icon" />
          </div>
          <FormLabel htmlFor="Password">Password</FormLabel>
          <div class="wrapper">
            <Input
              id="password"
              type="password"
              rounded={20}
              onChange={handlePassword}
            />
            <FaLock class="icon" />
          </div>
          <Button
            borderRadius={20}
            type="submit"
            variant="solid"
            colorScheme="blue"
            width="full"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <div>
            <FormLabel htmlFor="register" textAlign={"center"}>
              Don't have an account?{" "}
              <Link
                as={RouterLink}
                to="/register"
                color="blue.400"
                _hover={{ color: "blue.600" }}
              >
                Register
              </Link>
            </FormLabel>
          </div>
        </FormControl>
      </Box>
    </div>
  );
}

export default LoginForm;
