// Purpose: manage adding, removing, filtering, etc. tasks
import { Task, Priority } from './models';
import { saveTasks, loadTasks } from './storage';

let UNIQUE_ID = 1;
const DEFAULT_DONE = false;

export function addTask(desc: string, priority: Priority, duration: number) {
  const task: Task = {
    id: UNIQUE_ID++,
    desc: desc,
    priority: priority,
    duration: duration,
    done: DEFAULT_DONE
  }

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
