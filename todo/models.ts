const Priority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const; // as const treats object as immutable and literal

// keyof typeof status returns keys of object (LOW, ...)
// (typeof Priority)[keyof typeof Priority] indexes the object 
// result: type Priority = 'low' | 'medium' | 'high';
type Priority = (typeof Priority)[keyof typeof Priority];

export type Task = {
  id: number;
  desc: string;
  priority: Priority;
  duration: number;
  done: boolean;
};

// plan to add schedule later
