import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import "../LoginForm/LoginForm.css";
import NavBar from "../../Common/NavBar";
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

const RegisterForm = () => {
  // useStates for username, password, confirmPassword, email
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  // States
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
    setError(false);
    setPasswordError(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
    setError(false);
    setPasswordError(false);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setSubmitted(false);
    setError(false);
    setPasswordError(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
    setError(false);
    setPasswordError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || password === "" || confirmPassword === "") {
      setError(true);
      setSubmitted(false);
      setConfirmPasswordError(false);
    } else if (password !== confirmPassword) {
      setPasswordError(true);
      setError(false);
      setSubmitted(false);
    } else {
      setError(false);
      setPasswordError(false);
      setSubmitted(true);
    }
  };

  // return messages
  const successMessage = () => (
    <Box class="successMessage" border="3px solid green">
      <p>Successfully Registered</p>
      <Link to="/login">Login</Link>
    </Box>
  );

  const errorMessage = () => (
    <Box class="errorMessage" border="3px solid red">
      <p>Error! Missing Fields</p>
      <Link to="/register">Register</Link>
    </Box>
  );

  const passwordErrorMessage = () => (
    <Box class="errorMessage" border="3px solid red">
      <p>Passwords do not match</p>
      <Link to="/register">Register</Link>
    </Box>
  );
  return (
    <div>
      <NavBar />
      <Box
        bgGradient="linear(to-r, teal.500, green.500)" // Set your background here
        minHeight="100vh" // Ensures it covers the full height of the viewport
        minWidth="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Box
          w={["full", "md"]}
          p={[8, 10]}
          //   mx="auto"
          border={["none", "1px solid #e8e8e8"]}
          borderColor={["", "gray.200"]}
          borderRadius={10}
          boxShadow="md"
          rounded="md"
          bg="white"
        >
          <Image
            src="./public/RQ.png"
            alt="ReportQuest Logo"
            rounded={10}
            paddingBottom={3}
          />
          <div className="messages">
            {error && errorMessage()}
            {passwordError && passwordErrorMessage()}
            {submitted && successMessage()}
          </div>

          <FormControl>
            <FormLabel htmlFor="Username">Username</FormLabel>
            <div class="wrapper">
              <Input
                id="username"
                type="username"
                rounded={20}
                onChange={handleName}
                value={name}
              />
            </div>
            <FormLabel htmlFor="Password">Password</FormLabel>
            <div class="wrapper">
              <Input
                id="password"
                type="password"
                rounded={20}
                onChange={handlePassword}
                value={password}
              />
            </div>
            <FormLabel htmlFor="Password">Confirm Password</FormLabel>
            <div class="wrapper">
              <Input
                id="cmfPassword"
                type="password"
                rounded={20}
                onChange={handleConfirmPassword}
                value={confirmPassword}
              />
            </div>
            <FormLabel htmlFor="Password">Email</FormLabel>
            <div class="wrapper">
              <Input
                id="email"
                type="text"
                rounded={20}
                onChange={handleEmail}
                value={email}
              />
            </div>
            <Button
              borderRadius={20}
              type="signup"
              variant="solid"
              colorScheme="blue"
              width="full"
              onClick={handleSubmit}
            >
              SIGN UP
            </Button>
            <div>
              <FormLabel htmlFor="register" textAlign={"center"}>
                <Link
                  as={RouterLink}
                  to="/login"
                  color="blue.400"
                  _hover={{ color: "blue.600" }}
                >
                  Already have an account?
                </Link>
              </FormLabel>
            </div>
          </FormControl>
        </Box>
      </Box>
    </div>
  );
};

export default RegisterForm;
