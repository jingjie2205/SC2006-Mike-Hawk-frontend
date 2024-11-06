import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Link, Box, Text, Stat, StatLabel, StatNumber, VStack } from "@chakra-ui/react";
import NavBar from "../../Common/NavBar";
import MyRewardsCard from "./MyRewardsCard";


function MyRewardsPage() {
  const [myRewards, setMyRewards] = useState([]);
  
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
    <div>
        <NavBar/>
        <VStack bg="#06ADBF" align="center" mt="3%">
        <Text fontWeight="1000" mt="3%" mb="3%" fontSize="200%" color="white">
         My Rewards
        </Text>
        </VStack>
        {myRewards.length > 0 ? (
            myRewards.map((reward, index) => (
                <MyRewardsCard
                rewardID={reward.rewardID}
                expiry={reward.expiry}
                giftcode={reward.giftcode}
              />
            ))
        ) : (
            <Text>No rewards available.</Text>
        )}
    </div>
  );
}

export default MyRewardsPage;
