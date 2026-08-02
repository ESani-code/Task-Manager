import { type Task } from "../utils/makeTask";

type Props = {
  columnId: string;
  tasks: Task[];
};

const ColumnHeader = ({ columnId, tasks }: Props) => {
  return (
    <div className="flex justify-center items-center text-center mt-3">
      <div className="bg-neutral-600 w-auto h-auto px-4 py-1 rounded-sm">
        <h2>
          {columnId} : {tasks.length}
        </h2>
      </div>
    </div>
  );
};

export default ColumnHeader;
