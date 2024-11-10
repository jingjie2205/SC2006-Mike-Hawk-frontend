import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../Common/NavBar";
import RewardsCard from "./RewardsCard";
import { Link } from "react-router-dom";
import config from "../../config";
import {
  Button,
  Box,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
} from "@chakra-ui/react";

function RewardsPage() {
  const [rewards, setRewards] = useState([]);
  const [userPoints, setUserPoints] = useState([]);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId"); // Fetch userId from local storage

  // Fetch userPoints from the database
  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const response = await axios.get(
          `${config.baseURL}/users/users?user_id=${userId}`
        );
        if (response.status === 200) {
          setUserPoints(response.data.points);
        }
      } catch (err) {
        console.error("Error fetching user points:", err);
        setError("Failed to fetch user points. Please try again later.");
      }
    };

    if (userId) {
      fetchUserPoints();
    }
  }, [userId]);

  // Fetch rewards from the database
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await axios.get(
          `${config.baseURL}/rewards/rewards/all`
        );
        if (response.status === 200) {
          const sortedRewards = response.data.sort((a, b) =>
            a.description.localeCompare(b.description)
          );
          setRewards(sortedRewards);
        }
      } catch (err) {
        console.error("Error fetching rewards:", err);
        setError("Failed to fetch rewards. Please try again later.");
      }
    };
    fetchRewards();
  }, [userId]);

  return (
    <div>
      <VStack bg="#06ADBF" align="center" mt="3%">
        <Text fontWeight="1000" mt="3%" mb="3%" fontSize="200%" color="white">
          Rewards Catalogue
        </Text>
      </VStack>
      <Box
        borderRadius="lg"
        p="4"
        maxW="1100px"
        mx="auto"
        bg="white"
        align="center"
      >
        <Box
          borderWidth="2px"
          borderRadius="lg"
          maxW="sm"
          display="flex"
          justifyContent="center" // Center horizontally
          alignItems="center" // Center vertically
          padding="10px"
          mx="auto" // Center the box itself on the page
          my="20px"
        >
          {/* USER's POINTS */}
          <Stat>
            <StatLabel>Total Points</StatLabel>
            <StatNumber>{userPoints}</StatNumber>
          </Stat>
        </Box>
        {/* VOUCHERS */}
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          paddingTop={"20px"}
        >
          {error && <Text color="red.500">{error}</Text>}
          {rewards.map((reward, index) => (
            <RewardsCard
              rewardID={reward.rewardID}
              description={reward.description}
              pointsRequired={reward.pointsRequired}
              validity={reward.validity}
              availability={reward.availability}
              isAdmin={false}
              userPoints={userPoints}
            />
          ))}
        </Box>
        <Button as={Link} to="/myrewards" bg="#06ADBF" color="white" mb="60px">
          My Rewards
        </Button>
      </Box>
      <Box position="fixed" bottom="0" width="100%" overflow="hidden">
        <NavBar />
      </Box>
    </div>
  );
}

export default RewardsPage;
