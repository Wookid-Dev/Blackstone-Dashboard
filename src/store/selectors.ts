import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Task } from './slices/taskSlice';

export const selectCompletedTasks = createSelector(
  (state: RootState) => state.tasks.tasks,
  (tasks: Task[]) => tasks.filter(task => task.completed)
);

export const selectTasksCreatedAfter = (date: string) =>
  createSelector(
    (state: RootState) => state.tasks.tasks,
    (tasks: Task[]) => tasks.filter(task => new Date(task.createdAt) > new Date(date))
  );
