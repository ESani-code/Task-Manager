import { tasks } from "../utils/data";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const FilterTab = ({ activeTab, setActiveTab }: Props) => {
  return (
    <ul className="flex flex-row gap-6 text-sm">
      <li
        onClick={() => setActiveTab("All Tasks")}
        className={
          activeTab === "All Tasks"
            ? "font-bold text-white border-b-2"
            : "text-gray-400"
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
                ? "font-bold text-white border-b-2"
                : "text-gray-400"
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
