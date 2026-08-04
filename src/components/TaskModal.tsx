import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { tasks } from "../utils/data";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (columnId: string, task: Task) => void;
};

const TaskModal = ({ isOpen, onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [column, setColumn] = useState("");

  const taskType = [...Object.keys(tasks)];

  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
    console.log("YOooo");

    onClose();
  };

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
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
                  placeholder="Type the content & details of your task here, and lets get to work"
                />
              </div>

              <Select value={column}>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="State of Task" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup
                    onChange={(e) => setColumn(e.target.textContent)}
                  >
                    {taskType.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={onClose}>
            Create Task
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default TaskModal;
