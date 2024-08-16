'use client';
import { useDispatch } from 'react-redux';
import { setFilterPriority, setSortOrder } from '../store/slices/taskSlice';
import { Box, Select } from '@chakra-ui/react';
import { Priority, SortOrder } from '../utils/enums';

const FilterSortOptions = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priority = e.target.value as Priority;
    dispatch(setFilterPriority(priority));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value as SortOrder;
    dispatch(setSortOrder(order));
  };

  return (
    <Box>
      <Select defaultValue={Priority.All} onChange={handleFilterChange} mb={4}>
        <option value={Priority.All}>All</option>
        <option value={Priority.High}>High</option>
        <option value={Priority.Medium}>Medium</option>
        <option value={Priority.Low}>Low</option>
      </Select>
      <Select defaultValue={SortOrder.Asc} onChange={handleSortChange} mb={4}>
        <option value={SortOrder.Asc}>Ascending</option>
        <option value={SortOrder.Desc}>Descending</option>
      </Select>
    </Box>
  );
};

export default FilterSortOptions;
