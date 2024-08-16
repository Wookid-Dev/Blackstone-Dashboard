"use client";
import { useDispatch } from "react-redux";
import { setFilterPriority, setSortOrder } from "../store/slices/taskSlice";
import { Box, Select } from "@chakra-ui/react";

const FilterSortOptions = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priority = e.target.value as "All" | "High" | "Medium" | "Low";
    dispatch(setFilterPriority(priority));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value as "asc" | "desc";
    dispatch(setSortOrder(order));
  };

  return (
    <Box>
      <Select
        defaultValue="All"
        onChange={handleFilterChange}
        mb={4}
      >
        <option value="All">All</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </Select>
      <Select
        defaultValue="asc"
        onChange={handleSortChange}
        mb={4}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </Select>
    </Box>
  );
};

export default FilterSortOptions;
