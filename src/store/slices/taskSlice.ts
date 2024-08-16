// src/store/slices/taskSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
  createdAt: string;
  completedAt?: string | null;
  order: number;
}

interface TaskState {
  tasks: Task[];
  filterPriority: "All" | "High" | "Medium" | "Low";
  sortOrder: "asc" | "desc";
}

const initialState: TaskState = {
  tasks: [],
  filterPriority: "All",
  sortOrder: "asc",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(
      state,
      action: PayloadAction<Omit<Task, "createdAt" | "completedAt">>
    ) {
      const newTask = {
        ...action.payload,
        createdAt: new Date().toISOString(),
        completedAt: null,
        order: state.tasks.length
      };
      state.tasks.push(newTask);
    },
    editTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskCompletion(state, action: PayloadAction<string>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : null;
      }
    },
    setFilterPriority(state, action: PayloadAction<"All" | "High" | "Medium" | "Low">) {
      state.filterPriority = action.payload;
    },
    setSortOrder(state, action: PayloadAction<"asc" | "desc">) {
      state.sortOrder = action.payload;
    },
    // TODO: For when drag and drop implementation
    // Might need to create a extra task array to save filtered/sorted task
    reorderTasks(state, action: PayloadAction<{ sourceIndex: number, destinationIndex: number }>) {
      const [movedTask] = state.tasks.splice(action.payload.sourceIndex, 1);
      state.tasks.splice(action.payload.destinationIndex, 0, movedTask);
      // Recalculate task order based on new positions
      state.tasks.forEach((task, index) => {
        task.order = index;
      });
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleTaskCompletion,
  editTask,
  setFilterPriority,
  setSortOrder,
  reorderTasks,
} = taskSlice.actions;

export const selectTasks = (state: { tasks: TaskState }) => state.tasks.tasks;

export const selectFilteredAndSortedTasks = (state: { tasks: TaskState }) => {
  let filteredTasks = [...state.tasks.tasks];

  if (state.tasks.filterPriority !== "All") {
    filteredTasks = filteredTasks.filter(
      (task) => task.priority === state.tasks.filterPriority
    );
  }

  filteredTasks.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return state.tasks.sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return filteredTasks;
};

export default taskSlice.reducer;
