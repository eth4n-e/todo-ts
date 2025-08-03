import { input, rawlist, number, select, confirm } from "@inquirer/prompts";
import {
  TaskField,
  TaskFieldPromptOption,
  Choice,
  Priority,
  PRIORITY_ORDER,
  TaskData,
  Task,
  TaskFormatMode,
  TaskModificationHandler,
  TaskSortHandler,
} from "./models";
import { formatTasks } from "./utils/helpers";
import { loadTasks, saveTasks } from "./storage";
import * as TaskManager from "./manager";

export async function delegateAction(action: Choice) {
  switch (action) {
    case Choice.ADD:
      await handleAdd();
      break;
    case Choice.REMOVE:
      await handleRemove();
      break;
    case Choice.MODIFY:
      await handleModify();
      break;
    case Choice.LIST:
      await handleList();
      break;
    case Choice.SORT:
      await handleSort();
      break;
    case Choice.QUIT:
      break;
    default:
      console.log("Default case, unknown action");
      break;
  }
}

export async function handleAdd() {
  // new tasks by default are unfinished
  const task: TaskData = {
    name: await input({
      message: "Enter a name:",
      required: true,
    }),
    description: await input({
      message: "Enter a description:",
      required: true,
    }),
    priority: await rawlist({
      message: "Enter a priority:",
      choices: [
        { name: "Low", value: Priority.LOW },
        { name: "Medium", value: Priority.MEDIUM },
        { name: "High", value: Priority.HIGH },
      ],
    }),
    duration: await number({
      message: "Enter a duration (minutes):",
      required: true,
      default: 30,
      min: 0,
    }),
  };

  const updatedTasks = TaskManager.addTaskToList(task);
  saveTasks(updatedTasks);
}

export async function handleModify() {
  const tasks = loadTasks();
  const formattedTasks = formatTasks(tasks, TaskFormatMode.CHOICE);

  const taskIdToModify: string = await rawlist({
    message: "Select a task to modify:",
    choices: formattedTasks,
  });

  const fieldToModify: TaskFieldPromptOption = await select({
    message: "Enter property to modify:",
    choices: [
      // * TODO: this could maybe be a map -> e.g. TaskChoiceMap<name, value>
      { name: "Name", value: TaskFieldPromptOption.NAME },
      { name: "Description", value: TaskFieldPromptOption.DESCRIPTION },
      { name: "Duration", value: TaskFieldPromptOption.DURATION },
      { name: "Priority", value: TaskFieldPromptOption.PRIORITY },
      { name: "Completion Status", value: TaskFieldPromptOption.ISCOMPLETE },
      { name: "Exit", value: TaskFieldPromptOption.EXIT },
    ],
  });

  // find returns object references
  const task = tasks.find((task) => task.id === taskIdToModify);
  if (task) {
    const isModified = await taskModifyHandlers[fieldToModify](task);
    if (!isModified) {
      // short-circuit saving tasks as no modifications have been made to original task list
      return;
    }
  } else {
    console.error(
      `Unable to find task ${taskIdToModify}. No modifications made.`,
    );
  }

  saveTasks(tasks);
}

export async function handleRemove() {
  const tasks: Task[] = loadTasks();

  const choices = formatTasks(tasks, TaskFormatMode.CHOICE);

  const taskIdToRemove: string = await rawlist({
    message: "Select a task to remove:",
    choices: choices,
  });

  const updatedTasks = TaskManager.removeTaskFromList(taskIdToRemove, tasks);
  saveTasks(updatedTasks);
}

// TODO:: think about refactoring method to take in the list of tasks as a parameter
export async function handleList() {
  const tasks = loadTasks();
  if (!tasks.length) {
    console.log("/** No tasks to list **/");
    return;
  }

  const formattedTasks: String[] = formatTasks(tasks, TaskFormatMode.LABEL);
  formattedTasks.forEach((task, idx) => {
    console.log("------------------------------------------------------------");
    console.log(task);
    idx === formattedTasks.length - 1
      ? console.log(
          "------------------------------------------------------------\n",
        )
      : "";
  });
}

export async function handleSort() {
  let tasks = loadTasks();
  // First prompt should display options to sort by (duration, done, etc.)
  // response to prompt should then be passed
  const sortBy: TaskField = await select({
    message: "Enter property to sort by:",
    choices: [
      { name: "Duration", value: TaskField.DURATION },
      { name: "Priority", value: TaskField.PRIORITY },
      { name: "Completed", value: TaskField.ISCOMPLETE },
    ],
  });
  // sort tasks
  // create a function that takes the field to sort by and runs a handler to determine the sort method
  tasks = await taskSortHandlers[sortBy](tasks);

  const formattedTasks: String[] = formatTasks(tasks, TaskFormatMode.LABEL);
  formattedTasks.forEach((task, idx) => {
    console.log("------------------------------------------------------------");
    console.log(task);
    idx === formattedTasks.length - 1
      ? console.log(
          "------------------------------------------------------------",
        )
      : "";
  });
}

// Select a new value
// Confirm: you want to modify ${field} from ${currentValue} to ${newValue}
// command registry for each modifiable TaskField
const taskModifyHandlers: Record<
  TaskFieldPromptOption,
  TaskModificationHandler
> = {
  NAME: async (task: Task) => {
    let isModified = false;

    let newName = task.name;
    while (newName === task.name) {
      newName = await input({
        message: "Enter a new name:",
        required: true,
      });
    }

    const modify: boolean = await confirm({
      message: `Modify name from ${task.name} to ${newName}?`,
    });

    if (modify) {
      task.name = newName;
      isModified = !isModified;
      console.log("Name modified successfully");
    } else {
      console.log("Name unmodified.");
    }

    return isModified;
  },
  DESCRIPTION: async (task: Task) => {
    let isModified: boolean = false;

    const MAX_LENGTH = 15;
    const ELLIPSIS = "...";

    let newDescription = task.description;
    while (newDescription === task.description) {
      newDescription = await input({
        message: "Enter a new description:",
        required: true,
      });
    }

    const modify: boolean = await confirm({
      message: `Modify description from ${task.description.slice(0, MAX_LENGTH) + ELLIPSIS} to ${newDescription.slice(0, MAX_LENGTH) + ELLIPSIS}?`,
    });

    if (modify) {
      task.description = newDescription;
      isModified = !isModified;
      console.log("Description modified successfully");
    } else {
      console.log("Description unmodified.");
    }

    return isModified;
  },
  PRIORITY: async (task: Task) => {
    let isModified: boolean = false;

    const priorityOptions = [
      { name: "Low", value: Priority.LOW },
      { name: "Medium", value: Priority.MEDIUM },
      { name: "High", value: Priority.HIGH },
    ];

    const newPriorities = priorityOptions.filter(
      (option) => option.value !== task.priority,
    );

    const newPriority: Priority = await rawlist({
      message: "Enter a priority:",
      choices: newPriorities,
    });

    const modify: boolean = await confirm({
      message: `Modify priority from ${task.priority} to ${newPriority}`,
    });

    if (modify) {
      task.priority = newPriority;
      isModified = !isModified;
      console.log("Priority successfully modified");
    } else {
      console.log("Priority unmodified.");
    }

    return isModified;
  },
  DURATION: async (task: Task) => {
    let isModified = false;
    let newDuration = task.duration;
    while (newDuration === task.duration) {
      newDuration = await number({
        message: "Enter a new duration (minutes):",
        required: true,
        default: 30,
        min: 0,
      });
    }

    const modify = await confirm({
      message: `Modify duration from ${task.duration} to ${newDuration}?`,
    });

    if (modify) {
      task.duration = newDuration;
      isModified = !isModified;
      console.log("Duration successfully modified.");
    } else {
      console.log("Duration unmodified.");
    }

    return isModified;
  },
  ISCOMPLETE: async (task: Task) => {
    let isModified = false;

    const modify = await confirm({
      message: `Modify completion status from ${task.isComplete} to ${!task.isComplete}?`,
    });

    if (modify) {
      task.isComplete = !task.isComplete;
      isModified = !isModified;
      console.log("Completion status successfully modified.");
    } else {
      console.log("Completion status unmodified.");
    }

    return isModified;
  },
  EXIT: async (task) => {
    console.log(`Exiting without modifying ${task.name}`);
    return false;
  },
};

/*
 * Sort reminder:
 * a - b > 0 -> a comes after b in array
 * a - b < 0 -> a comes before b in array
 * a - b == 0 > keep original order
 */
const taskSortHandlers: Record<TaskField, TaskSortHandler> = {
  DURATION: async (tasks: Task[]) => {
    return tasks.sort((t1, t2) => t1.duration - t2.duration);
  },
  PRIORITY: async (tasks: Task[]) => {
    return tasks.sort(
      (t1, t2) => PRIORITY_ORDER[t1.priority] - PRIORITY_ORDER[t2.priority],
    );
  },
  ISCOMPLETE: async (tasks: Task[]) => {
    return tasks.sort(
      (t1, t2) => Number(t1.isComplete) - Number(t2.isComplete),
    );
  },
  NAME: async (tasks: Task[]) => {
    return tasks;
  },
  DESCRIPTION: async (tasks: Task[]) => {
    return tasks;
  },
};
