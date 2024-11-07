import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import "../LoginForm/LoginForm.css";
import NavBar from "../../Common/NavBar";
import axios from "axios";

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
  const [emptyError, setEmptyError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [duplicateEntryError, setDuplicateEntryError] = useState(false);
  const [invalidEmail, setInvalidEmailError] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
    setEmptyError(false);
    setPasswordError(false);
    setDuplicateEntryError(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
    setEmptyError(false);
    setPasswordError(false);
    setDuplicateEntryError(false);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setSubmitted(false);
    setEmptyError(false);
    setPasswordError(false);
    setDuplicateEntryError(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
    setEmptyError(false);
    setPasswordError(false);
    setDuplicateEntryError(false);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name === "" ||
      password === "" ||
      confirmPassword === "" ||
      email === ""
    ) {
      setEmptyError(true);
      return
    } 
    
    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    if (!validateEmail(email)) {
      // Set an error state for invalid email
      setInvalidEmailError(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/public/public/register",
        {
          userName: name,
          password: password,
          emailAddress: email,
        }
      );
      if (response.status === 201) {
        setSubmitted(true);
        //Redirect user to login page
        window.location.href = "/login";
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setDuplicateEntryError(true);
      }
    }
  };

  const MessageBox = ({ children, type }) => (
    <Box className={`${type}Message`} border={`3px solid ${type === "success" ? "green" : "red"}`}>
      <p>{children}</p>
    </Box>
  );

  return (
    <div height="100%" minHeight="100vh">
      <Box
      bgGradient="linear(to-r, teal.500, green.500)" // Set your background here
      minHeight="100vh" // Ensures it covers the full height of the viewport
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
    >
        <Box
          p={[8, 10]}
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
            width="100%"
            rounded={10}
            paddingBottom={3}
          />
          <div className="messages">
            {emptyError && <MessageBox type="error">Please fill all fields</MessageBox>}
            {passwordError && <MessageBox type="error">Passwords do not match</MessageBox>}
            {duplicateEntryError && <MessageBox type="error">Username/Email used</MessageBox>}
            {invalidEmail && <MessageBox type="error">Invalid email format: xxx@example.com</MessageBox>}
            {submitted && <MessageBox type="success">Successfully Registered</MessageBox>}
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
                required
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
                required
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
                required
              />
            </div>
            <FormLabel htmlFor="Password">Email</FormLabel>
            <div class="wrapper">
              <Input
                id="email"
                type="email"
                rounded={20}
                onChange={handleEmail}
                value={email}
                required
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
