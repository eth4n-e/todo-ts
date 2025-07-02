import { Task } from "../models";

export function isValidTask(obj: any): obj is Task {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    typeof obj.id === "string" &&
    "desc" in obj &&
    typeof obj.desc === "string" &&
    "priority" in obj &&
    typeof obj.priority === "string" &&
    "duration" in obj &&
    typeof obj.duration === "number" &&
    "done" in obj &&
    typeof obj.done === "boolean"
  );
}
