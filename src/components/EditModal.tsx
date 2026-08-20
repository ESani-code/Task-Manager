import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { Task } from "../utils/makeTask";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  task_id: string;
  task_title: string;
  task_description: string;
  task_content: string;
  task_footer: string;
  task_column: string | number;
};

const EditModal = ({
  isOpen,
  onClose,
  task_id,
  task_title,
  task_description,
  task_content,
  task_footer,
  task_column,
}: Props) => {
  const tasks = useTaskStore((state) => state.tasks);
  const taskType = Object.keys(tasks);

  const [title, setTitle] = useState(task_title || "");
  const [description, setDescription] = useState(task_description || "");
  const [content, setContent] = useState(task_content || "");
  const [column, setColumn] = useState(task_column || "On Going");
  const [footer, setFooter] = useState(task_footer);
  const editTask = useTaskStore((state) => state.editTask);

  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
    console.log("YOooo");

    const newTask: Task = {
      id: task_id, // Generate a unique ID
      title: title || "New Task",
      description: description || "No description provided.",
      content: content,
      footer: footer,
    };

    editTask(task_id, String(column), newTask);

    setTitle(title);
    setContent(content);
    setDescription(description);
    setFooter(footer);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Edit your Task</CardTitle>
          <CardAction>
            <i
              onClick={onClose}
              className="bi bi-x-lg text-white/50 hover:text-white"
            />
          </CardAction>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="Title">Task Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task Title"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="Description">Task Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  //   placeholder="Description for your task"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="Title">Task Content</Label>
                <textarea
                  className="w-full bg-transparent border border-white/20 rounded p-2 outline-none resize-none overflow-hidden"
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={Math.max(3, content.split("\n").length)}
                  placeholder="Edit the content of your task here..."
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="Title">Task Type</Label>
                <Select
                  value={column as string}
                  // @ts-expect-error Expected behaviour from this attribute
                  onValueChange={(value) => setColumn(value)}
                >
                  <SelectTrigger className="w-45">
                    <SelectValue placeholder="State of Task" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {taskType.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </form>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Edit Task
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditModal;
