import React, { useRef, useState } from "react";
import {
  Box,
  Card,
  Text,
  Image,
  CardBody,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Button,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  FocusLock,
  PopoverArrow,
  PopoverCloseButton,
  Stack,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs"; // Assuming you're using react-icons for the dots
import "./RewardsCard.css";

function RewardsCard({
  image,
  name,
  points,
  amount,
  userPoints,
  isAdmin,
  onUpdate,
}) {
  const {
    isOpen: isRedemptionOpen,
    onOpen: onRedemptionOpen,
    onClose: onRedemptionClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const [editedVoucher, setEditedVoucher] = useState({
    name: name,
    points: points,
    amount: amount,
  });

  const handleRedemption = () => {
    if (userPoints >= points) {
      toast({
        title: "Redemption Successful!",
        description: `You have redeemed ${name} voucher for ${points} points!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onRedemptionClose();
    } else {
      toast({
        title: "Insufficient Points",
        description: "You do not have enough points to redeem this reward!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      onRedemptionClose();
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedVoucher((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdate(editedVoucher);
    onEditClose();
  };

  return (
    <>
      <Card
        as={!isAdmin ? "button" : undefined}
        width={"500px"}
        height={"200px"}
        className="rewards-card"
        onClick={!isAdmin ? onRedemptionOpen : undefined}
      >
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
          {isAdmin && (
            <Popover
              isOpen={isEditOpen}
              onOpen={onEditOpen}
              onClose={onEditClose}
              placement="right"
            >
              <PopoverTrigger>
                <Button
                  variant="ghost"
                  size="sm"
                  rightIcon={<BsThreeDotsVertical />}
                  onClick={(e) => e.stopPropagation()} // Prevent card click from triggering
                />
              </PopoverTrigger>
              <PopoverContent p={4}>
                <FocusLock>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel>Voucher Name</FormLabel>
                      <Input
                        name="name"
                        value={editedVoucher.name}
                        onChange={handleEditChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Input
                        name="amount"
                        type="number"
                        value={editedVoucher.amount}
                        onChange={handleEditChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Points Required</FormLabel>
                      <Input
                        name="points"
                        type="number"
                        value={editedVoucher.points}
                        onChange={handleEditChange}
                      />
                    </FormControl>
                    <Button colorScheme="teal" onClick={handleUpdate}>
                      Update
                    </Button>
                  </Stack>
                </FocusLock>
              </PopoverContent>
            </Popover>
          )}
        </CardBody>
      </Card>

      <AlertDialog
        isOpen={isRedemptionOpen}
        leastDestructiveRef={cancelRef}
        onClose={onRedemptionClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Redemption
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to redeem this reward for {points} points?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onRedemptionClose}>
                No
              </Button>
              <Button colorScheme="red" onClick={handleRedemption} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default RewardsCard;
