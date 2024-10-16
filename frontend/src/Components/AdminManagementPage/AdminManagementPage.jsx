import React from "react";
import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  Button,
} from "@chakra-ui/react";
import NavBar from "../../Common/NavBar";
import RewardsCard from "../RewardsPage/RewardsCard";
import AdminManageRewards from "./AdminManageRewards";

function AdminManagementPage() {
  return (
    <div>
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
        <Tabs>
          <TabList>
            <Tab>Manage Users</Tab>
            <Tab>Manage Rewards</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>Manage Users</p>
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
