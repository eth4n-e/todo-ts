// Purpose: manage adding, removing, filtering, etc. tasks
import { Task, Priority } from './models';

export function addTask(desc: string, priority: Priority, duration: number) {

}

export function removeTask(id: number) {
}

export function listTasks(): Task[] {
  return [ {id: 1, desc: "hello", priority: Priority.Low, duration: 2, done: false} ];
}

export function updateStatus(id: number, status: boolean) {
}

export function updatePriority(id: number, priority: Priority) {
}

export function updateDuration(id: number, duration: number) {
}
