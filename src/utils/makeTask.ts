export type Task = {
  id: string;
  title: string;
  description: string;
  content: string;
  footer: string;
};

export function getCustomDateTime() {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

export function makeTask(n: number): Task {
  return {
    id: `task-${n}`,
    title: `Task ${n}`,
    description: "Card Description for the task yooooooo",
    content: "Card Content for the task at hand",
    footer: `Created on: ${getCustomDateTime()}`,
  };
}
