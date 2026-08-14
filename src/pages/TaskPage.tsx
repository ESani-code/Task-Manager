import "bootstrap-icons/font/bootstrap-icons.css";

import { useRef, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

import TaskBox from "../components/TaskBox";
import Columns from "../components/Columns";
import ColumnHeader from "../components/ColumnHeader";
import EmptyState from "../components/EmptyState";
import TaskTopBar from "../components/TaskTopBar";

import { useTaskStore } from "../store/useTaskStore";

function TaskPage() {
  const { tasks, setTasks } = useTaskStore();
  const [activeTab, setActiveTab] = useState<string>("All Tasks");

  const previousItems = useRef(tasks);

  return (
    <>
      <TaskTopBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <section className="mx-2 flex items-center justify-center">
        <DragDropProvider
          onDragStart={() => {
            // Snapshot state so we can revert cleanly if the drag is canceled
            previousItems.current = tasks;
            console.log(previousItems.current);
          }}
          onDragOver={(event) => {
            // Live-move tasks between/within columns as the drag happens
            setTasks((tasks) => move(tasks, event));
            console.log(tasks);
          }}
          onDragEnd={(event) => {
            if (event.canceled) {
              setTasks(() => previousItems.current);
              console.log(previousItems.current);
            }
          }}
        >
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 justify-center content-start items-start">
            {Object.entries(tasks)
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
