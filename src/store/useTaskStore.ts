import { create } from "zustand";
import { type Task } from "../utils/makeTask";
import { tasks } from "../utils/data";

type TaskStore = {
  tasks: Record<string, Task[]>;
  updateTask: (
    columnId: string | number,
    taskId: string,
    field: keyof Task,
    newValue: string,
  ) => void;
  createTask: (columnId: string, newTask: Task) => void;

  setTasks: (
    updater: (prevTasks: Record<string, Task[]>) => Record<string, Task[]>,
  ) => void;

  editTask: (columnId: string, taskId: string, newValue: string) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: tasks,

  // Expose a setState-like function for dnd-kit's move helper
  setTasks: (updater) => {
    set((state) => ({
      tasks: updater(state.tasks),
    }));
  },

  updateTask: (columnId, taskId, newValue) => {
    set((state) => {
      // Logic migrated from TaskPage.tsx
      const updatedColumn = state.tasks[columnId as string].map((task) =>
        task.id === taskId ? { ...task, [columnId]: newValue } : task,
      );
      return { tasks: { ...state.tasks, [columnId]: updatedColumn } };
    });
  },

  createTask: (columnId, newTask) => {
    set((state) => ({
      // Logic migrated from TaskPage.tsx[cite: 38]
      tasks: {
        ...state.tasks,
        [columnId]: [...state.tasks[columnId], newTask],
      },
    }));
  },

  // Implementing Edit Task functionality
  editTask: (taskId, columnId, newValue) => {
    set((state) => {
      const edittedTask = state.tasks[columnId as string].map((task) =>
        task.id === taskId ? { ...task, [taskId]: newValue } : task,
      );
      return { tasks: { ...state.tasks, [columnId]: edittedTask } };
    });
  },
}));
