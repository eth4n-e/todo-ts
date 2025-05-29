import { Task, Priority } from './models.js';
import fs from 'fs';
import path from 'path';

// purpose: read from / write data to todos.json
export function loadTasks(): Task[] {
  return [{id: 1, priority: Priority.Low, duration: 1.5, done: false, desc: "test task"}];
}

export function saveTasks(tasks: Task[]) {
}
