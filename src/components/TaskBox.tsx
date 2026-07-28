import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type TaskBoxProps = {
  title: string;
  description: string;
  content: string;
  footer: string;
};

const TaskBox = ({
  title = "Title",
  description = "Lorem Ipsum Text",
  content = "Lorem Ipsum Text",
  footer = "Footer Text content here",
}: TaskBoxProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg pb-2">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
        <CardAction>
          <i className="bi bi-three-dots text-white/30" />
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
