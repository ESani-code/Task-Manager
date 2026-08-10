// import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
// import { tasks } from "../utils/data";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const FilterTab = ({ activeTab, setActiveTab }: Props) => {
  // const [Tasks] = useMemo<Record<string, Task[]>>(tasks);
  const tasks = useTaskStore((state) => state.tasks);
  return (
    <ul className="flex flex-row gap-6 text-sm p-3 bg-sidebar rounded-lg items-center">
      <li
        onClick={() => setActiveTab("All Tasks")}
        className={
          activeTab === "All Tasks"
            ? "filter-items-active"
            : "filter-items-inactive"
        }
      >
        All Tasks <span>{Object.values(tasks).flat().length}</span>
      </li>
      {Object.entries(tasks).map(([Columns, task]) => {
        return (
          <li
            key={Columns}
            onClick={() => setActiveTab(Columns)}
            className={
              activeTab === Columns
                ? "filter-items-active"
                : "filter-items-inactive"
            }
          >
            {Columns} <span className="font-bold">{task.length}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default FilterTab;
