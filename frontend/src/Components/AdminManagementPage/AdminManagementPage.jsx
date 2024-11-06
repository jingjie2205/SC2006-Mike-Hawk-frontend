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

function AdminManagementPage() {
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
          </TabList>

          <TabPanels>
            <TabPanel>
              <AdminManageUser />
            </TabPanel>
            <TabPanel>
              <AdminManageRewards />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
}

export default AdminManagementPage;
