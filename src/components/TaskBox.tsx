import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Button } from "./ui/button";

import { useSortable } from "@dnd-kit/react/sortable";

type TaskBoxProps = {
  id: string;
  index: number;
  title: string;
  description: string;
  content: string;
  footer: string;
  column: string | number;
};

const TaskBox = ({
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

  return (
    <Card ref={ref} className="w-full h-auto" data-dragging={isDragging}>
      <CardHeader>
        <CardTitle className="text-lg pb-2">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
        <CardAction>
          <Button
            variant="secondary"
            className=" text-white/30 hover:text-white/80 items-center"
          >
            <i className="bi bi-three-dots" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-md text-white">
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <p>{footer}</p>
      </CardFooter>
    </Card>
  );
};

export default TaskBox;
