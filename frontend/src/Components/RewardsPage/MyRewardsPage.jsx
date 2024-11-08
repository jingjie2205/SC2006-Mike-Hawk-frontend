import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button, Box, Text, Stat, StatLabel, StatNumber, VStack } from "@chakra-ui/react";
import NavBar from "../../Common/NavBar";
import MyRewardsCard from "./MyRewardsCard";


function MyRewardsPage() {
  const [myRewards, setMyRewards] = useState([]);
  const [userPoints, setUserPoints] = useState([]);
  const userId = localStorage.getItem("userId"); // Fetch userId from local storage

  // Fetch userPoints from the database
  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/users/users?user_id=${userId}`);
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
  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchMyRewards = async () => {
      try {
        // Fetch the rewards data for the user
        const response = await axios.get(`http://127.0.0.1:8000/rewards/rewards/myrewards/${userId}`);
        setMyRewards(response.data); // Assuming it returns a list of rewards
      } catch (error) {
        console.error("Error fetching rewards:", error);
      }
    };

    fetchMyRewards();
  }, []);

  return (
    <div align="center">
        <NavBar/>
        <VStack bg="#06ADBF" align="center" mt="3%" mb="3%" >
        <Text fontWeight="1000" mt="3%" mb="3%" fontSize="200%" color="white">
         My Rewards
        </Text>
        </VStack>
        <Box borderRadius="lg" p="4" maxW="1100px" mx="auto" bg="white" align="center">
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
        {myRewards.length > 0 ? (
            myRewards.map((reward) => (
                <MyRewardsCard
                rewardID={reward.reward_id}
                expiry={reward.expiry}
                giftcode={reward.giftcode}
              />
            ))
        ) : (
            <Text>You don't have any rewards yet.</Text>
        )}
        <Button as={Link} to="/rewards" bg="#06ADBF" color="white" mt="3%">
        Redeem Rewards
        </Button>
        </Box>
    </div>
  );
}

export default MyRewardsPage;
