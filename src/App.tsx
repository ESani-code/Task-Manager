import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

import TaskBox from "./components/TaskBox";
import Columns from "./components/Columns";
import ColumnHeader from "./components/ColumnHeader";

import { useRef, useState } from "react";
import { type Task, makeTask } from "./utils/makeTask";

function App() {
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

  const [items, setItems] = useState<Record<string, Task[]>>({
    "On Going": [makeTask(1), makeTask(2), makeTask(3)],
    Upcoming: [makeTask(4), makeTask(5), makeTask(6)],
    Completed: [makeTask(7), makeTask(8), makeTask(9)],
    Paused: [makeTask(10), makeTask(11), makeTask(12)],
  });
  const previousItems = useRef(items);

  return (
    <>
      <section className="mx-4 flex items-center justify-center">
        <DragDropProvider
          onDragStart={() => {
            // Snapshot state so we can revert cleanly if the drag is canceled
            previousItems.current = items;
          }}
          onDragOver={(event) => {
            // Live-move items between/within columns as the drag happens
            setItems((items) => move(items, event));
          }}
          onDragEnd={(event) => {
            if (event.canceled) {
              setItems(previousItems.current);
            }
          }}
        >
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 justify-center content-start items-start">
            {Object.entries(items).map(([columnId, tasks]) => (
              <div className="flex flex-col" key={columnId}>
                <ColumnHeader columnId={columnId} tasks={tasks} />
                <Columns key={columnId} id={columnId}>
                  {items[columnId].map((task, index) => (
                    <TaskBox
                      key={task.id}
                      id={task.id}
                      index={index}
                      column={columnId}
                      title={task.title}
                      description={task.description}
                      content={task.content}
                      footer={task.footer}
                      onUpdate={handleUpdateTask}
                    />
                  ))}
                </Columns>
              </div>
            ))}
          </div>
        </DragDropProvider>
      </section>
    </>
  );
}

export default App;
