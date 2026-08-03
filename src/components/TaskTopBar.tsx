import FilterTab from "./FilterTab";
import { Button } from "./ui/button";

const TaskTopBar = () => {
  return (
    <section className="flex flex-row justify-between px-2">
      <div className="">
        <FilterTab />
      </div>
      <Button className="bg-sidebar-foreground">
        <i className="bi bi-plus-circle" />
        <span>Create Task</span>
      </Button>
    </section>
  );
};

export default TaskTopBar;
