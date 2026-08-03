import { tasks } from "../utils/data";

const FilterTab = () => {
  return (
    <ul className="flex flex-row gap-6">
      {Object.entries(tasks).map(([Columns]) => {
        return <li>{Columns}</li>;
      })}
    </ul>
  );
};

export default FilterTab;
