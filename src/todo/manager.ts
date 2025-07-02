import { Task, Priority, TaskData } from "./models";
import { saveTasks, loadTasks } from "./storage";

let UNIQUE_ID = 1;
const DEFAULT_DONE = false;

// Purpose: manage adding, removing, filtering, etc. tasks
export function addTask(taskData: TaskData) {
  const task: Task = {
    id: UNIQUE_ID++,
    desc: taskData.desc,
    priority: taskData.priority,
    duration: taskData.duration,
    done: taskData.done ? taskData.done : DEFAULT_DONE,
  };

  saveTasks(Array.of(task));
}

export function removeTask(id: number) {
  const tasks: Task[] = loadTasks();
  // remove task from list
  const filteredTasks: Task[] = tasks.filter((task) => task.id != id);
  saveTasks(filteredTasks);
}

export function listTasks(): Task[] {
  return loadTasks();
}

export function updateStatus(id: number) {
  const tasks: Task[] = loadTasks();
  // update tasks in place
  tasks.forEach((task) => {
    if (task.id == id) {
      task.done = !task.done;
    }
  });

  saveTasks(tasks);
}

export function updatePriority(id: number, priority: Priority) {
  const tasks: Task[] = loadTasks();
  // update tasks in place
  tasks.forEach((task) => {
    if (task.id == id) {
      task.priority = priority;
    }
  });

  saveTasks(tasks);
}

export function updateDuration(id: number, duration: number) {
  const tasks: Task[] = loadTasks();
  // update tasks in place
  tasks.forEach((task) => {
    if (task.id == id) {
      task.duration = duration;
    }
  });

  saveTasks(tasks);
}
