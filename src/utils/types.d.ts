import { Priority, SortOrder } from './enums';

export interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
  completedAt?: string | null;
  order: number;
}

interface TaskState {
  tasks: Task[];
  filterPriority: Priority;
  sortOrder: SortOrder;
}
