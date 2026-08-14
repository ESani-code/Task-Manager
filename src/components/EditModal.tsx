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
// import { tasks } from "../utils/data";
import { useTaskStore } from "../store/useTaskStore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  // onCreate: (columnId: string, task: Task) => void;
};

const EditModal = ({ isOpen, onClose }: Props) => {
  const tasks = useTaskStore((state) => state.tasks);
  const taskType = Object.keys(tasks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [column, setColumn] = useState(taskType[0] || "On Going");
  const editTask = useTaskStore((state) => state.editTask);

  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
    console.log("YOooo");

    const newTask: Task = {
      id: `task-${Date.now()}`, // Generate a unique ID
      title: title || "New Task",
      description: description || "No description provided.",
      content: "Click to edit content...",
      footer: "Card Created",
    };

    editTask(column, newTask);

    // Reset form and close
    setTitle("");
    setContent("");
    setDescription("");
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
        <CardContent>
          <form onSubmit={handleSubmit}>
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
                  placeholder="Description for you task"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="Title">Task Content</Label>
                <textarea
                  className="w-full bg-transparent border border-white/20 rounded p-2 outline-none resize-none"
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Edit the content of your task here..."
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="Title">Task Type</Label>
                <Select
                  value={column}
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
          </form>
        </CardContent>
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
