import "bootstrap-icons/font/bootstrap-icons.css";

import { useRef, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

import TaskBox from "../components/TaskBox";
import Columns from "../components/Columns";
import ColumnHeader from "../components/ColumnHeader";
import EmptyState from "../components/EmptyState";
import TaskTopBar from "../components/TaskTopBar";

import { type Task } from "../utils/makeTask";
import { tasks } from "../utils/data";
import { useTaskStore } from "../store/useTaskStore";

function TaskPage() {
  const [items, setItems] = useState<Record<string, Task[]>>(tasks);
  // const [items, setItems] = useTaskStore()
  const [activeTab, setActiveTab] = useState<string>("All Tasks");

  const previousItems = useRef(items);

  const handleUpdateTask = (
    columnId: string | number,
    taskId: string,
    field: keyof Task,
    newValue: string,
  ) => {
    setItems((prevItems) => {
      // Map over the specific column's tasks and update the one that matches the ID
      const updatedColumn = prevItems[columnId].map((task) =>
        task.id === taskId ? { ...task, [field]: newValue } : task,
      );

      // Return the new state object
      return { ...prevItems, [columnId]: updatedColumn };
    });
  };

  const createTask = (columnId: string, newTask: Task) => {
    setItems((prevItems) => ({
      ...prevItems,
      [columnId]: [...prevItems[columnId], newTask],
    }));
  };

  return (
    <>
      <TaskTopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        createTask={createTask}
      />
      <section className="mx-2 flex items-center justify-center">
        <DragDropProvider
          onDragStart={() => {
            // Snapshot state so we can revert cleanly if the drag is canceled
            previousItems.current = items;
            console.log(previousItems.current);
          }}
          onDragOver={(event) => {
            // Live-move items between/within columns as the drag happens
            setItems((items) => move(items, event));
            console.log(items);
          }}
          onDragEnd={(event) => {
            if (event.canceled) {
              setItems(previousItems.current);
              console.log(previousItems.current);
            }
          }}
        >
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 justify-center content-start items-start">
            {Object.entries(items)
              .filter(
                ([columnId]) =>
                  activeTab === "All Tasks" || activeTab === columnId,
              )
              .map(([columnId, tasks]) => (
                <div className="flex flex-col" key={columnId}>
                  <ColumnHeader columnId={columnId} tasks={tasks} />
                  <Columns key={columnId} id={columnId}>
                    {tasks.length == 0 ? (
                      <EmptyState />
                    ) : (
                      tasks.map((task, index) => (
                        <TaskBox
                          key={task.id}
                          id={task.id}
                          index={index}
                          column={columnId}
                          title={task.title}
                          description={task.description}
                          content={task.content}
                          footer={task.footer}
                          handleUpdateTask={handleUpdateTask}
                        />
                      ))
                    )}
                  </Columns>
                </div>
              ))}
          </div>
        </DragDropProvider>
      </section>
    </>
  );
}

export default TaskPage;
