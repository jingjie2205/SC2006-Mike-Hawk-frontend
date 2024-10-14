import React from "react";
import NavBar from "../../Common/NavBar";
import RewardsCard from "./RewardsCard";
import { Box } from "@chakra-ui/react";

function RewardsPage() {
  // hard coded for testing
  const vouchers = [
    { image: "../../public/macs.png", name: "Macs", points: 100, amount: 10 },
    // { image: "../../public/macs.png", name: "Macs", points: 100, amount: 10 },
  ];
  return (
    <div>
      <NavBar />
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        paddingTop={"50px"}
      >
        {vouchers.map((reward, index) => (
          <RewardsCard
            key={index}
            image={reward.image}
            name={reward.name}
            points={reward.points}
            amount={reward.amount}
          />
        ))}
      </Box>
    </div>
  );
}

export default RewardsPage;
