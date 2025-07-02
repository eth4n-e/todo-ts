export const Priority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const; // as const treats object as immutable and literal

// keyof typeof returns keys of object (LOW, ...)
// (typeof Priority)[keyof typeof Priority] indexes the object
// result: type Priority = 'low' | 'medium' | 'high';
export type Priority = (typeof Priority)[keyof typeof Priority];

export const Choice = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  MODIFY: "MODIFY",
  LIST: "LIST",
  SORT: "SORT",
  QUIT: "QUIT",
} as const;

export type Choice = (typeof Choice)[keyof typeof Choice];

export type TaskData = {
  desc: string;
  priority: Priority;
  duration: number;
  done?: boolean;
};

export type Task = {
  id: number;
  desc: string;
  priority: Priority;
  duration: number;
  done: boolean;
};

// plan to add schedule later
