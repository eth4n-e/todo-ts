import { Task, Priority, TaskData } from "./models";
import { saveTasks, loadTasks } from "./storage";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_IS_COMPLETE = false;

// Purpose: manage adding, removing, filtering, etc. tasks
export function addTaskToList(taskData: TaskData) {
  // maybe call create task
  const task: Task = {
    id: uuidv4(),
    isComplete: taskData.isComplete ? taskData.isComplete : DEFAULT_IS_COMPLETE,
    ...taskData,
  };

  const tasks = loadTasks();
  tasks.push(task);
  return tasks;
}

export function removeTaskFromList(id: string, tasks: Task[]) {
  // remove task from list
  return tasks.filter((task) => task.id !== id);
}

export function listTasks(): Task[] {
  return loadTasks();
}

export function updateStatus(id: string) {
  const tasks: Task[] = loadTasks();
  // update tasks in place
  tasks.forEach((task) => {
    if (task.id === id) {
      task.isComplete = !task.isComplete;
    }
  });

  saveTasks(tasks);
}

export function updatePriority(id: string, priority: Priority) {
  const tasks: Task[] = loadTasks();
  // update tasks in place
  tasks.forEach((task) => {
    if (task.id === id) {
      task.priority = priority;
    }
  });

  saveTasks(tasks);
}

export function updateDuration(id: string, duration: number) {
  const tasks: Task[] = loadTasks();
  // update tasks in place
  tasks.forEach((task) => {
    if (task.id === id) {
      task.duration = duration;
    }
  });

  saveTasks(tasks);
}
