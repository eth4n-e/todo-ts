export enum Priority {
  Low,
  Medium,
  High,
}

export type Task = {
  id: number;
  desc: string;
  priority: Priority;
  duration: number;
  done: boolean;
};

// plan to add schedule later
