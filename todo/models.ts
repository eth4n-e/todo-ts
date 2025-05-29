enum Priority {
  Low,
  Medium,
  High,
}

export type Task = {
  id: number;
  desc: string;
  priority: Priority;
  duration: number;
};

// plan to add schedule later
