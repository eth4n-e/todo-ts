export type TaskData = {
  name: string;
  description: string;
  priority: Priority;
  duration: number;
  isComplete?: boolean;
};

export type Task = {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  duration: number;
  isComplete: boolean;
};

export type TaskModificationHandler = (task: Task) => Promise<boolean>;
export type TaskSortHandler = (tasks: Task[]) => Promise<Task[]>;

// ENUMS
export const Priority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const; // as const treats object as immutable and literal

// typeof Priority returns type of object: { LOW: "LOW", ...}
// keyof typeof returns keys of object (LOW, ...)
// (typeof Priority)[keyof typeof Priority] indexes the object
// result: type Priority = 'low' | 'medium' | 'high';
export type Priority = (typeof Priority)[keyof typeof Priority];

export const PRIORITY_ORDER = {
  HIGH: 0,
  MEDIUM: 1,
  LOW: 2,
};

export const Choice = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  MODIFY: "MODIFY",
  LIST: "LIST",
  SORT: "SORT",
  QUIT: "QUIT",
} as const;

export type Choice = (typeof Choice)[keyof typeof Choice];

export const TaskField = {
  NAME: "NAME",
  DESCRIPTION: "DESCRIPTION",
  PRIORITY: "PRIORITY",
  DURATION: "DURATION",
  ISCOMPLETE: "ISCOMPLETE",
} as const;

export type TaskField = (typeof TaskField)[keyof typeof TaskField];

export const TaskFormatMode = {
  LABEL: "LABEL",
  CHOICE: "CHOICE",
} as const;

export type TaskFormatMode =
  (typeof TaskFormatMode)[keyof typeof TaskFormatMode];
// plan to add schedule later
