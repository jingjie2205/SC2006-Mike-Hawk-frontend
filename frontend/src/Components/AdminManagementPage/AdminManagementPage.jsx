import React from "react";
import {
  Tabs,
  Tab,
  Text,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  Button,
  VStack
} from "@chakra-ui/react";
import RewardsCard from "../RewardsPage/RewardsCard";
import AdminManageRewards from "./AdminManageRewards";
import AdminManageUser from "./AdminManageUser";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function AdminManagementPage() {
  const navigate = useNavigate();
  const toast = useToast();
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

  return (
    <div>
      <VStack bg="#06ADBF" align="center" mt="3%" width="100%" > 
        <Text fontWeight="1000" mt="3%" mb="3%" fontSize="200%" color="white">
          Admin Dashboard
        </Text>
      </VStack>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="sm"
        p="4"
        maxW="1100px"
        mx="auto"
        mt="20px"
      >
        <Tabs>
          <TabList>
            <Tab>Manage Users</Tab>
            <Tab>Manage Rewards</Tab>
            <Tab>Logout</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <AdminManageUser />
            </TabPanel>
            <TabPanel>
              <AdminManageRewards />
            </TabPanel>
            <TabPanel>
              <Button onClick={handleLogout}>Logout</Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
}

export default AdminManagementPage;
