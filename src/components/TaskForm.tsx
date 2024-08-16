"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/slices/taskSlice";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Heading,
} from "@chakra-ui/react";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const dispatch = useDispatch();

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      id: uuidv4(),
      title,
      description,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
      order: 0,
    };

    dispatch(addTask(newTask));

    // Clean the input fields after adding the task
    setTitle("");
    setDescription("");
  };

  return (
    <VStack as="form" spacing={4} align="stretch" onSubmit={handleAddTask}>
      <Heading size="md">Add New Task</Heading>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Priority</FormLabel>
        <Select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "High" | "Medium" | "Low")
          }
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Select>
      </FormControl>
      <Button colorScheme="teal" type="submit" width="full">
        Add Task
      </Button>
    </VStack>
  );
};

export default TaskForm;
