import { input, rawlist, number, select } from "@inquirer/prompts";
import {
  TaskFields,
  Choice,
  Priority,
  TaskData,
  Task,
  TaskFormatMode,
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

  const modifyField = await select({
    message: "Enter property to modify:",
    choices: [
      { name: "Name", value: TaskFields.NAME },
      { name: "Description", value: TaskFields.DESCRIPTION },
      { name: "Duration", value: TaskFields.DURATION },
      { name: "Priority", value: TaskFields.PRIORITY },
      { name: "Completion Status", value: TaskFields.ISCOMPLETE },
    ],
  });

  // how I want the UI:
  // Select a new value
  // Confirm: you want to modify ${field} from ${currentValue} to ${newValue}
}

export async function handleRemove() {
  /*
   * Steps:
   * 1) List all tasks to be removed
   * 2) Format: id, description, done
   */

  const tasks: Task[] = loadTasks();

  const choices = tasks.map((task) => {
    return {
      name: `Name: ${task.name} | Priority: ${task.priority} | Completed: ${task.isComplete}`,
      value: task.id,
    };
  });

  // might have to call prompt like so
  //   const { taskIdToRemove } = await inquirer.prompt([
  //   {
  //     type: 'rawlist',
  //     name: 'taskIdToRemove',
  //     message: 'Select a task to remove:',
  //     choices: choices
  //   }
  // ]);
  const taskIdToRemove: string = await rawlist({
    message: "Select a task to remove:",
    choices: choices,
  });

  const updatedTasks = TaskManager.removeTaskFromList(taskIdToRemove, tasks);
  saveTasks(updatedTasks);
}

export async function handleList() {
  const tasks = loadTasks();
  if (!tasks.length) {
    console.log("/** No tasks to list **/");
    return;
  }

  const formattedTasks: String[] = formatTasks(tasks, TaskFormatMode.LABEL);
  formattedTasks.forEach((task) => {
    console.log("------------------------------------------------------------");
    console.log(task);
    console.log("------------------------------------------------------------");
  });
}

export async function handleSort() {
  // First prompt should display options to sort by (duration, done, etc.)
  // response to prompt should then be passed
  const sortBy = await select({
    message: "Enter property to sort by:",
    choices: [
      { name: "Duration", value: TaskFields.DURATION },
      { name: "Priority", value: TaskFields.PRIORITY },
      { name: "Completed", value: TaskFields.ISCOMPLETE },
    ],
  });
  console.log("Sort option: ", sortBy);
  // sort tasks
}
