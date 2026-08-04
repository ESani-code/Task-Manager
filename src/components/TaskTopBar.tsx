import type { Task } from "../utils/makeTask";
import FilterTab from "./FilterTab";
import { Button } from "./ui/button";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  createTask: (columnId: string, newTask: Task) => void;
};

const TaskTopBar = ({ activeTab, setActiveTab, createTask }: Props) => {
  return (
    <section className="flex flex-row justify-between px-2 py-4">
      <div className="">
        <FilterTab activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <Button className="bg-sidebar-foreground" onClick={() => createTask()}>
        <i className="bi bi-plus-circle" />
        <span>Create Task</span>
      </Button>
    </section>
  );
};

export default TaskTopBar;
