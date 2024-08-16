"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  editTask,
  toggleTaskCompletion,
  selectFilteredAndSortedTasks,
  Task,
} from "../store/slices/taskSlice";
import {
  Box,
  Checkbox,
  Text,
  Button,
  VStack,
  Input,
  Select,
  Stack,
  List,
  ListItem,
  ListIcon,
  FormControl,
  FormErrorMessage,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdFiberManualRecord } from "react-icons/md";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredAndSortedTasks);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedDescription, setEditedDescription] = useState<string>("");
  const [editedPriority, setEditedPriority] = useState<Task["priority"]>("Medium");
  const [isTitleError, setIsTitleError] = useState<boolean>(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);

  const handleDelete = (taskId: string) => {
    setTaskIdToDelete(taskId);
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (taskIdToDelete) {
      dispatch(deleteTask(taskIdToDelete));
      setTaskIdToDelete(null);
      setIsDialogOpen(false);
    }
  };

  const handleEdit = (taskId: string) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setEditingTaskId(taskId);
      setEditedTitle(taskToEdit.title);
      setEditedDescription(taskToEdit.description);
      setEditedPriority(taskToEdit.priority);
      setIsTitleError(false);
    }
  };

  const handleSaveEdit = () => {
    if (!editedTitle.trim()) {
      setIsTitleError(true);
      return;
    }

    setIsTitleError(false);

    if (editingTaskId) {
      dispatch(
        editTask({
          id: editingTaskId,
          title: editedTitle,
          description: editedDescription,
          priority: editedPriority,
          completed: false,
          createdAt: new Date().toISOString(),
          completedAt: null,
          order: 0
        })
      );
      setEditingTaskId(null);
      setEditedTitle("");
      setEditedDescription("");
      setEditedPriority("Medium");
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "High":
        return "red.500";
      case "Medium":
        return "yellow.500";
      case "Low":
        return "green.500";
      default:
        return "gray.500";
    }
  };

  const taskCardBg = useColorModeValue("white", "gray.800");
  const taskCardTextColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      maxHeight="85%"
      overflowY="auto"
      pr={2}
    >
      <VStack spacing={4} align="stretch">
        {tasks.map((task) => (
          <Box
            key={task.id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="sm"
            bg={taskCardBg}
            color={taskCardTextColor}
          >
            {editingTaskId === task.id ? (
              <>
                <FormControl isInvalid={isTitleError}>
                  <Input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    placeholder="Edit Title"
                    fontSize="xl"
                    fontWeight="bold"
                  />
                  {isTitleError && (
                    <FormErrorMessage>Title is required.</FormErrorMessage>
                  )}
                </FormControl>
                <Input
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Edit Description"
                  mt={2}
                />
                <Select
                  value={editedPriority}
                  onChange={(e) => setEditedPriority(e.target.value as Task["priority"])}
                  mt={2}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Select>
                <Button colorScheme="blue" size="sm" onClick={handleSaveEdit} mt={4}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <Checkbox isChecked={task.completed} onChange={() => dispatch(toggleTaskCompletion(task.id))}>
                  <Text as={task.completed ? "s" : undefined} fontSize="xl" fontWeight="bold">
                    {task.title}
                  </Text>
                </Checkbox>
                <Stack pl={6} mt={2} spacing={1}>
                  <List spacing={1}>
                    <ListItem>
                      <ListIcon as={MdFiberManualRecord} color={getPriorityColor(task.priority)} />
                      <Text as="span">{task.description}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Priority: {task.priority}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Created At: {formatDate(task.createdAt)}</Text>
                    </ListItem>
                  </List>
                </Stack>
                <Box ml={6}>
                  <Button colorScheme="blue" size="sm" onClick={() => handleEdit(task.id)} mt={2}>
                    Edit
                  </Button>
                  <Button colorScheme="red" size="sm" onClick={() => handleDelete(task.id)} mt={2} ml={4}>
                    Delete
                  </Button>
                </Box>
              </>
            )}
          </Box>
        ))}
      </VStack>

      <DeleteConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </Box>
  );
};

export default TaskList;
