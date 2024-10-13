import { useState } from "react";
import { Box } from "@chakra-ui/react";
import "./App.css";
import LoginForm from "./Components/LoginForm/LoginForm";

function App() {
  return (
    <Box
      bgGradient="linear(to-r, teal.500, green.500)" // Set your background here
      minHeight="100vh" // Ensures it covers the full height of the viewport
      minWidth="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <LoginForm />;
    </Box>
  );
}

export default App;
