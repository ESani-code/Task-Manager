import { makeTask } from "./makeTask";

export const testTasks = {
  "On Going": [makeTask(1), makeTask(2), makeTask(3)],
  Paused: [makeTask(4), makeTask(5), makeTask(6)],
  Upcoming: [makeTask(7), makeTask(8), makeTask(9)],
  Completed: [makeTask(10), makeTask(11), makeTask(12)],
};




export const realTasks = {
  "On Going": [],
  Paused: [],
  Upcoming : [],
  Completed: []

}