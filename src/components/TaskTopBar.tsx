// import type { Task } from "../utils/makeTask";
import { Button } from "./ui/button";

import CreateTaskModal from "./CreateTaskModal";
import FilterTab from "./FilterTab";

import { useState } from "react";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TaskTopBar = ({ activeTab, setActiveTab }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default TaskTopBar;
