import React from "react";
import {
  Box,
  Card,
  Text,
  Image,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import "./RewardsCard.css";

function RewardsCard({ image, name, points, amount }) {
  return (
    <Card as="button" width={"500px"} height={"200px"} className="rewards-card">
      <CardBody
        width={"500px"}
        height={"200px"}
        display="flex"
        alignItems={"center"}
      >
        <Image
          src={image}
          width="100px"
          height="90px"
          rounded={3}
          alignContent={"center"}
        />
        <Box
          justifyContent="space-between"
          width={"500px"}
          className="text-container"
        >
          <Text>{name}</Text>
          <Text>${amount} evoucher</Text>
          <Text>{points} points</Text>
        </Box>
      </CardBody>
    </Card>
  );
}

export default RewardsCard;
