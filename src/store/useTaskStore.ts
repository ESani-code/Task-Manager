import { create } from "zustand";
import { type Task } from "../utils/makeTask";
import { realTasks as tasks } from "../utils/data";
import { persist } from "zustand/middleware";

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

  editTask: (columnId: string, taskId: string, newValue: Task) => void;

  deleteTask: (columnId: string, taskId: string) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: tasks,

      // Expose a setState-like function for dnd-kit's move helper
      setTasks: (updater) => {
        set((state) => ({
          tasks: updater(state.tasks),
        }));
      },

      updateTask: (columnId, taskId, field, newValue) => {
        set((state) => {
          // Logic from TaskPage.tsx
          const updatedColumn = state.tasks[columnId as string].map((task) =>
            task.id === taskId ? { ...task, [field]: newValue } : task,
          );
          return { tasks: { ...state.tasks, [columnId]: updatedColumn } };
        });
      },

      createTask: (columnId, newTask) => {
        set((state) => ({
          // Logic migrated from TaskPage.tsx
          tasks: {
            ...state.tasks,
            [columnId]: [...state.tasks[columnId], newTask],
          },
        }));
      },

      editTask: (taskId, newColumnId, updatedTask) => {
        set((state) => {
          // Find the current column containing the task
          const currentColumnId = Object.keys(state.tasks).find((col) =>
            state.tasks[col].some((t) => t.id === taskId),
          );

          if (!currentColumnId) return state;

          // Case A: Editing within the SAME column
          if (currentColumnId === newColumnId) {
            const updatedColumn = state.tasks[currentColumnId].map((task) =>
              task.id === taskId ? updatedTask : task,
            );
            return {
              tasks: { ...state.tasks, [currentColumnId]: updatedColumn },
            };
          }

          // Case B: Task moved to a DIFFERENT column
          const sourceColumn = state.tasks[currentColumnId].filter(
            (task) => task.id !== taskId,
          );
          const targetColumn = [...state.tasks[newColumnId], updatedTask];

          return {
            tasks: {
              ...state.tasks,
              [currentColumnId]: sourceColumn,
              [newColumnId]: targetColumn,
            },
          };
        });
      },

      deleteTask: (columnId, taskId) => {
        set((state) => {
          const updatedColumn = state.tasks[columnId].filter(
            (task) => task.id !== taskId,
          );
          return { tasks: { ...state.tasks, [columnId]: updatedColumn } };
        });
      },
    }),
    { name: "task-storage", partialize: (state) => ({ tasks: state.tasks }) },
  ),
);
