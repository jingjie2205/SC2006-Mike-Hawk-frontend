import { Select } from "@chakra-ui/react";

const SortBy = ({ sortOptions, onSortChange }) => {
  return (
    <Select
      placeholder="Sort by"
      onChange={(e) => onSortChange(e.target.value)}
    >
      {sortOptions.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default SortBy;
