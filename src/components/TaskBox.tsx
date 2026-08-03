import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

// import { Button } from "./ui/button";

import { useSortable } from "@dnd-kit/react/sortable";

import { type Task } from "../utils/makeTask";
import { EditableField } from "./ui/EditableField";
import CardActionPopover from "./ui/CardActionPopover";

type TaskBoxProps = {
  id: string;
  index: number;
  title: string;
  description: string;
  content: string;
  footer: string;
  column: string | number;
  handleUpdateTask: (
    columnId: string | number,
    taskId: string,
    field: keyof Task,
    newValue: string,
  ) => void;
};

const TaskBox = ({
  id,
  index,
  title = "Title",
  description = "Lorem Ipsum Text",
  content = "Lorem Ipsum Text",
  footer = "Footer Text content here",
  column = 1,
  handleUpdateTask,
}: TaskBoxProps) => {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });

  return (
    <Card
      ref={ref}
      className="w-full h-auto cursor-grab"
      data-dragging={isDragging}
    >
      <CardHeader>
        <CardTitle className="text-lg pb-2">
          <EditableField
            value={title}
            onSave={(newVal) => handleUpdateTask(column, id, "title", newVal)}
          />
        </CardTitle>
        <CardDescription className="text-xs">
          <EditableField
            value={description}
            onSave={(newVal) =>
              handleUpdateTask(column, id, "description", newVal)
            }
          />
        </CardDescription>
        <CardAction>
          <CardActionPopover />
        </CardAction>
      </CardHeader>
      <CardContent className="text-md text-white">
        <p>
          <EditableField
            value={content}
            onSave={(newVal) => handleUpdateTask(column, id, "content", newVal)}
            multiline={true}
          />
        </p>
      </CardContent>
      <CardFooter>
        <p>{footer}</p>
      </CardFooter>
    </Card>
  );
};

export default TaskBox;
