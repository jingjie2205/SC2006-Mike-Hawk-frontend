import { Flex, Select } from "@chakra-ui/react";

const SortBy = () => {
  return (
    <Flex m="0 70% 0 10%">
      <Select placeholder="Newest">
        <option value="Oldest">Oldest</option>
        <option value="Most Severe">Most Severe</option>
        <option value="Least Severe">Least Severe</option>
        <option value="Category">Category</option>
      </Select>
    </Flex>
  );
};

export default SortBy;
