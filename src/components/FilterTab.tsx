import { tasks } from "../utils/data";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const FilterTab = ({ activeTab, setActiveTab }: Props) => {
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
        All Tasks
      </li>
      {Object.entries(tasks).map(([Columns]) => {
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
            {Columns}
          </li>
        );
      })}
    </ul>
  );
};

export default FilterTab;
