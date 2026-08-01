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

const ColumnsId = ["0", "1", "2"];

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
  "0": [makeTask(1), makeTask(2), makeTask(3)],
  "1": [makeTask(4), makeTask(5), makeTask(6)],
  "2": [makeTask(7), makeTask(8), makeTask(9)],
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
          <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
            {ColumnsId.map((columnId) => (
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
            ))}
          </div>
        </DragDropProvider>
      </section>
    </>
  );
}

export default App;
