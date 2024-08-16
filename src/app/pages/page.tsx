'use client'

import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import FilterSortOptions from "../../components/FilterSortOptions";
import ColorModeSwitcher from "../../components/ColorModeSwitcher";

export default function HomePage() {
  const sidebarBg = useColorModeValue("white", "gray.800");
  const mainBg = useColorModeValue("white", "gray.700");
  const bodyBg = useColorModeValue("#f5f7fa", "gray.900");

  return (
    <Flex height="100vh" p={4} bg={bodyBg}>
      <Box
        width="300px"
        p={4}
        borderRadius="lg"
        bg={sidebarBg}
        boxShadow="md"
      >
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="lg">Task Manager</Heading>
          <ColorModeSwitcher />
        </Flex>
        <TaskForm />
      </Box>

      <Box
        flex="1"
        ml={6}
        p={4}
        borderRadius="lg"
        bg={mainBg}
        boxShadow="md"
      >
        <FilterSortOptions />
        <TaskList />
      </Box>
    </Flex>
  );
}
