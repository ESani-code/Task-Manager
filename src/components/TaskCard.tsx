import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { useSortable } from "@dnd-kit/react/sortable";

// import { type Task } from "../utils/makeTask";
import { EditableField } from "./ui/EditableField";
import CardActionPopover from "./ui/CardActionPopover";
import { useTaskStore } from "../store/useTaskStore";

type TaskBoxProps = {
  id: string;
  index: number;
  title: string;
  description: string;
  content: string;
  footer: string;
  column: string | number;
};

const TaskCard = ({
  id,
  index,
  title = "Title",
  description = "Lorem Ipsum Text",
  content = "Lorem Ipsum Text",
  footer = "Footer Text content here",
  column = 1,
}: TaskBoxProps) => {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });

  const updateTask = useTaskStore((state) => state.updateTask);

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
            onSave={(newVal) => updateTask(column, id, "title", newVal)}
          />
        </CardTitle>
        <CardDescription className="text-xs">
          <EditableField
            value={description}
            onSave={(newVal) => updateTask(column, id, "description", newVal)}
          />
        </CardDescription>
        <CardAction>
          <CardActionPopover
            id={id}
            title={title}
            description={description}
            content={content}
            footer={footer}
            column={column}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="text-md text-white">
        <p>
          <EditableField
            value={content}
            onSave={(newVal) => updateTask(column, id, "content", newVal)}
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

export default TaskCard;
