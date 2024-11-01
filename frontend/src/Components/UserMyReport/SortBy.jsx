import { Flex, Select, Text, VStack } from "@chakra-ui/react";

const SortBy = ({ sortOption, onSortChange }) => {
  return (
    <VStack ml="10%" w="200px" align="left">
      <Text fontWeight="500" fontSize="120%" align="left" color="black">
        Sort by:
      </Text>
      <Select value={sortOption} onChange={onSortChange}>
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
        <option value="Most Severe">Most Severe</option>
        <option value="Least Severe">Least Severe</option>
        <option value="Category">Category</option>
      </Select>
    </VStack>
  );
};

export default SortBy;
