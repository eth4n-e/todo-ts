import { Task } from "../models";

export function isValidTask(obj: any): obj is Task {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    typeof obj.id === "string" &&
    "name" in obj &&
    typeof obj.name === "string" &&
    "description" in obj &&
    typeof obj.description === "string" &&
    "priority" in obj &&
    typeof obj.priority === "string" &&
    "duration" in obj &&
    typeof obj.duration === "number" &&
    "done" in obj &&
    typeof obj.done === "boolean"
  );
}
