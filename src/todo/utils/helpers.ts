import { Task, TaskFormatMode } from "../models";

// Overload signature - define *how* the function can be called
export function formatTasks(tasks: Task[], mode: "LABEL"): string[];
// maybe make return type into type like InqChoice
export function formatTasks(
  tasks: Task[],
  mode: "CHOICE",
): { name: string; value: string }[];

// Implementation - defines *what* actually happens
export function formatTasks(tasks: Task[], mode: TaskFormatMode): unknown {
  return tasks.map((task) => {
    const label = `Name: ${task.name}\nDescription: ${task.description}\nDuration: ${task.duration}\nPriority: ${task.priority}\nCompleted: ${task.isComplete}`;
    return mode === TaskFormatMode.LABEL
      ? label
      : { name: task.name, value: task.id };
  });
}
