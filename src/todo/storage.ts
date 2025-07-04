import { Task } from "./models";
import { isValidTask } from "./utils/type-guards";
import fs from "fs";
// import path from 'path';

const FILE_PATH = "../data/todos.json";

// purpose: read from / write data to todos.json
export function loadTasks(): Task[] {
  const fileContent: string = fs.readFileSync(FILE_PATH, "utf-8");
  console.log(fileContent);
  const taskData: Task[] = JSON.parse(fileContent);

  return taskData;
}

export function saveTasks(tasks: Task[]) {
  try {
    // ensure task is in proper format before saving
    const verifiedTasks = tasks.filter((task) => isValidTask(task));
    fs.appendFileSync(FILE_PATH, JSON.stringify(verifiedTasks));
    console.log("Tasks saved.");
  } catch (err) {
    console.error("Error saving tasks synchronously: ", err);
  }
}
