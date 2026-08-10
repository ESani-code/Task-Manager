// import type { Task } from "../utils/makeTask";
import { Button } from "./ui/button";

import TaskModal from "./TaskModal";
import FilterTab from "./FilterTab";

import { useState } from "react";
// import { useTaskStore } from "../store/useTaskStore";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  // createTask: (columnId: string, newTask: Task) => void;
};

const TaskTopBar = ({ activeTab, setActiveTab }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const createTask = useTaskStore((state) => state.createTask);

  return (
    <>
      <section className="flex flex-row justify-between px-2 py-4">
        <div className="">
          <FilterTab activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <Button
          className="bg-sidebar-foreground"
          onClick={() => setIsModalOpen(true)}
        >
          <i className="bi bi-plus-circle" />
          <span>Create Task</span>
        </Button>
      </section>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // onCreate={createTask}
      />
    </>
  );
};

export default TaskTopBar;
