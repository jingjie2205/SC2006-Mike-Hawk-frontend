import React from "react";
import NavBar from "../../Common/NavBar";
import RewardsCard from "./RewardsCard";
import { Box, Text, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

function RewardsPage() {
  {
    /* HARD CODED FOR TESTING */
  }
  const vouchers = [
    { image: "../../public/macs.png", name: "Macs", points: 100, amount: 10 },
    {
      image: "../../public/fairprice.png",
      name: "FairPice",
      points: 150,
      amount: 10,
    },
  ];
  return (
    <div>
      <NavBar />
      {/* <Box
        display="flex"
        alignItems={"center"}
        paddingTop={"50px"}
        justifyContent="space-between"
        maxWidth="600px"
        mx="auto"
        bg="teal.500"
      >
        <Text>Rewards</Text>
      </Box> */}
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
          {/* HARD CODED VALUE FOR TESTING */}
          <StatNumber>100</StatNumber>
        </Stat>
      </Box>
      {/* VOUCHERS */}
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        paddingTop={"20px"}
      >
        {/* HARD CODED VALUE FOR TESTING */}
        {vouchers.map((reward, index) => (
          <RewardsCard
            key={index}
            image={reward.image}
            name={reward.name}
            points={reward.points}
            amount={reward.amount}
            userPoints={100}
          />
        ))}
      </Box>
    </div>
  );
}

export default RewardsPage;
