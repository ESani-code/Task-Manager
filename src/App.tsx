import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

import TaskBox from "./components/TaskBox";
import Columns from "./components/Columns";

import { useRef, useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  content: string;
  footer: string;
};

// const ColumnsId = ["On Going", "Upcoming", "Completed", "Paused"];

function makeTask(n: number): Task {
  return {
    id: `task-${n}`,
    title: `Task ${n}`,
    description: "Card Description for the task yooooooo",
    content: "Card Content for the task at hand",
    footer: "Card Footer",
  };
}

const initialItems: Record<string, Task[]> = {
  "On Going": [makeTask(1), makeTask(2), makeTask(3)],
  Upcoming: [makeTask(4), makeTask(5), makeTask(6)],
  Completed: [makeTask(7), makeTask(8), makeTask(9)],
  Paused: [makeTask(10), makeTask(11), makeTask(12)],
};

function App() {
  const [items, setItems] = useState(initialItems);
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
            {Object.entries(initialItems).map(([columnId, tasks]) => (
              <div className="flex justify-center items-center text-center mt-3">
                <div className="bg-neutral-600 w-auto h-auto px-4 py-1 rounded-sm">
                  <h2>
                    {columnId} : {tasks.length}
                  </h2>
                </div>
              </div>
            ))}

            {Object.entries(initialItems).map(([columnId]) => (
              <>
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
                    />
                  ))}
                </Columns>
              </>
            ))}
          </div>
        </DragDropProvider>
      </section>
    </>
  );
}

export default App;
