import React from "react";
import NavBar from "../../Common/NavBar";
import { Box } from "@chakra-ui/react";

function AdminDashboardPage() {
  return (
    <>
      <NavBar />
      <Box
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="sm"
        p="4"
        maxW="1100px"
        mx="auto"
        mt="20px"
      >
        Admin Dashboard Page
      </Box>
    </>
  );
}

export default AdminDashboardPage;
