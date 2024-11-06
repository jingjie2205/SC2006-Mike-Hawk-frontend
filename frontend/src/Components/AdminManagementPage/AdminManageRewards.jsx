import { React, useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  FocusLock,
  useDisclosure,
  PopoverArrow,
  PopoverCloseButton,
  Stack,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
} from "@chakra-ui/react";
import RewardsCard from "../RewardsPage/RewardsCard";

function AdminManageRewards() {
  const [newVoucher, setNewVoucher] = useState({
    name: "",
    points: "",
    amount: "",
  });
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [vouchers, setVouchers] = useState([]);

  // Fetch vouchers from the backend
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/rewards/rewards/all");
        console.log(response); // Check if the response is coming back correctly
        if (response.status === 200) {
          const sortedVouchers = response.data.sort((a, b) =>
            a.description.localeCompare(b.description)
          );
          setVouchers(sortedVouchers);
        }
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setNewVoucher((prevVoucher) => ({ ...prevVoucher, [name]: value }));
  };

  const handleSave = () => {
    if (newVoucher.name && newVoucher.points) {
      setVouchers([...vouchers, newVoucher]);
      setNewVoucher({ name: "", description: "", points: "", amount: 10 });
      onClose();
    }
  };

  const updateVoucher = (index, updatedVoucher) => {
    const updatedVouchers = [...vouchers];
    updatedVouchers[index] = { ...updatedVouchers[index], ...updatedVoucher };
    setVouchers(updatedVouchers);
  };

  return (
    <div>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button colorScheme="blue" padding={5} mb="2%">
            Add Voucher
          </Button>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock>
            <PopoverArrow />
            <PopoverCloseButton />
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Voucher Name</FormLabel>
                <Input
                  name="name"
                  onChange={handleInputChange}
                  value={newVoucher.name}
                />
                <FormLabel>Voucher Amount</FormLabel>
                <Input
                  name="amount"
                  onChange={handleInputChange}
                  value={newVoucher.amount}
                  type="number"
                />
                <FormLabel>Points Required</FormLabel>
                <Input
                  name="points"
                  onChange={handleInputChange}
                  value={newVoucher.points}
                  type="number"
                />
              </FormControl>
              <ButtonGroup display="flex" justifyContent="flex-end">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="teal"
                  onClick={handleSave}
                  isDisabled={!newVoucher.name || !newVoucher.points}
                >
                  Save
                </Button>
              </ButtonGroup>
            </Stack>
          </FocusLock>
        </PopoverContent>
      </Popover>
      <div
        display="flex"
        // flexDirection="column"
        // alignItems="center"
        // justifyContent="center"
        gap="20px"
        padding="20px"
      >
        {vouchers.map((reward) => (
          <RewardsCard
            key={reward.rewardID}  // Ensure each voucher has a unique ID
            rewardID={reward.rewardID}
            description={reward.description}
            pointsRequired={reward.pointsRequired}
            validity={reward.validity}
            isAdmin={true}
            availability={reward.availability}
        />
        ))}
      </div>
    </div>
  );
}

export default AdminManageRewards;
