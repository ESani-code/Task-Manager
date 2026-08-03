import FilterTab from "./FilterTab";
import { Button } from "./ui/button";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TaskTopBar = ({ activeTab, setActiveTab }: Props) => {
  return (
    <section className="flex flex-row justify-between px-2">
      <div className="">
        <FilterTab activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <Button className="bg-sidebar-foreground">
        <i className="bi bi-plus-circle" />
        <span>Create Task</span>
      </Button>
    </section>
  );
};

export default TaskTopBar;
