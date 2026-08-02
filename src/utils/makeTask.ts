export type Task = {
  id: string;
  title: string;
  description: string;
  content: string;
  footer: string;
};

export function makeTask(n: number): Task {
  return {
    id: `task-${n}`,
    title: `Task ${n}`,
    description: "Card Description for the task yooooooo",
    content: "Card Content for the task at hand",
    footer: "Card Footer",
  };
}
