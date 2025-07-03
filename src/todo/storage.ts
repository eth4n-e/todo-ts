import { Task } from "./models";
import { isValidTask } from "./utils/type-guards";
import fs from "fs";
import path from "path";

const FILE_PATH = path.resolve(__dirname, "../data/todos.json");

// purpose: read from / write data to todos.json
export function loadTasks(): Task[] {
  if (!fs.existsSync(FILE_PATH)) {
    console.log("Unable to write to non-existent file.");
    return [];
  }
  const fileContent: string = fs.readFileSync(FILE_PATH, "utf-8");
  const taskData: Task[] = JSON.parse(fileContent);
  return taskData;
}

export function saveTasks(tasks: Task[]) {
  try {
    // ensure task is in proper format before saving
    console.log("Tasks before verify: ", tasks);
    const verifiedTasks = tasks.filter((task) => isValidTask(task));
    console.log("Stringified tasks: ", JSON.stringify(verifiedTasks));
    fs.writeFileSync(FILE_PATH, JSON.stringify(verifiedTasks));
    console.log("Tasks saved.");
  } catch (err) {
    console.error("Error saving tasks synchronously: ", err);
  }
}
