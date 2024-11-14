import { React, useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./LoginForm.css";
import { Link as RouterLink, useLocation } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Image,
  VStack,
  Text,
  Link,
  FormLabel,
  FormControl,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function LoginForm() {
  // states for login input boxes
  const [name, setUsername] = useState("");
  const [pw, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState(""); // For the email entered in the reset modal
  const { isOpen, onOpen, onClose } = useDisclosure(); // Control modal visibility
  const [errorMessage, setErrorMessage] = useState(null); // State to store error message
  const [isVerificationSuccess, setIsVerificationSuccess] = useState(false);
  const toast = useToast();

  const location = useLocation();

  useEffect(() => {
    // Check if there's a verification code in the URL params
    const params = new URLSearchParams(location.search);
    const verificationCode = params.get("verification_key");

    if (verificationCode) {
      // Verify user on the backend using the verification code
      verifyUser(verificationCode);
    }
  }, [location]);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    // Check if fields are empty
    if (!name || !pw) {
      toast({
        title: "Missing Fields",
        description: "Please fill out both the username and password fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return; // Stop further execution if fields are empty
    }

    try {
      const response = await axios.post(
        `${config.baseURL}/public/public/login`,
        {
          username: name,
          password: pw,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userId", response.data.user_id);
        console.log(name);
        localStorage.setItem("userName", name);
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
      } else {
        toast({
          title: "Invalid Credentials",
          description: "The username or password you entered is incorrect.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Invalid Credentials",
        description: "The username or password you entered is incorrect.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const verifyUser = async (verificationCode) => {
    try {
      const response = await axios.get(
        `${config.baseURL}/public/public/verify/${verificationCode}`
      );
      if (response.status === 200) {
        setIsVerificationSuccess(true);
        setErrorMessage(null);
      } else {
        setErrorMessage(
          "Verification failed. Please check your link and try again."
        );
      }
    } catch (error) {
      setErrorMessage("Error verifying the email. Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    try {
      const response = await axios.post(
        `${config.baseURL}/public/public/password-reset-request`,
        { email: resetEmail }
      );

      if (response.status === 200) {
        toast({
          title: "Password Reset Email Sent",
          description: "A password reset link has been sent to your email.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose(); // Close modal after success
      } else {
        toast({
          title: "Failed to send reset email",
          description: "Please check the email and try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Detect "Enter" key press to trigger login
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <Box
      bgGradient="linear(to-r, teal.500, green.500)" // Set your background here
      minHeight="100vh" // Ensures it covers the full height of the viewport
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
    >
      <Box
        w={["full", "md"]}
        p={[8, 10]}
        border={["none", "1px solid #e8e8e8"]}
        borderColor={["", "gray.200"]}
        borderRadius={10}
        boxShadow="md"
        rounded="md"
        bg="white"
      >
        <Image src="./public/RQ.png" alt="ReportQuest Logo" rounded={10} />

        {/* Error message box */}
        {errorMessage && !isVerificationSuccess && (
          <Alert status="error" mt={2}>
            <AlertIcon />
            <AlertTitle mr={2}>Error</AlertTitle>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setErrorMessage(null)}
            />
          </Alert>
        )}

        {/* Verification success message */}
        {isVerificationSuccess && (
          <Alert status="success" mt={2}>
            <AlertIcon />
            <AlertTitle>Verification Successful!</AlertTitle>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setIsVerificationSuccess(false)}
            />
          </Alert>
        )}

        <FormControl>
          <FormLabel htmlFor="Username">Username</FormLabel>
          <div className="wrapper">
            <Input
              id="username"
              type="username"
              rounded={20}
              onChange={handleUsername}
            />
            <FaUser className="icon" />
          </div>
          <FormLabel htmlFor="Password">Password</FormLabel>
          <div className="wrapper">
            <Input
              id="password"
              type="password"
              rounded={20}
              onChange={handlePassword}
              onKeyPress={handleKeyPress} // Detect Enter key on username input
            />
            <FaLock className="icon" />
          </div>
          <Button
            borderRadius={20}
            type="submit"
            variant="solid"
            colorScheme="blue"
            width="full"
            onClick={handleSubmit}
            onKeyPress={handleKeyPress} // Detect Enter key on username input
          >
            Login
          </Button>
          <div>
            <FormLabel htmlFor="register" textAlign={"center"} mt="3%">
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
          <div>
            <FormLabel htmlFor="reset" textAlign={"center"}>
              Forgot password?{" "}
              <Link
                onClick={onOpen}
                color="blue.400"
                _hover={{ color: "blue.600" }}
              >
                Reset
              </Link>
            </FormLabel>
          </div>
        </FormControl>
      </Box>
      {/* Password Reset Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>
              Enter your email address to receive a password reset link.
            </Text>
            <Input
              placeholder="Email Address"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handlePasswordReset}>
              Send Reset Email
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default LoginForm;
