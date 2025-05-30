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
}

export function listTasks(): Task[] {
  return loadTasks();
}

export function updateStatus(id: number, status: boolean) {
}

export function updatePriority(id: number, priority: Priority) {
}

export function updateDuration(id: number, duration: number) {
}
