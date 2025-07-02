import { input, rawlist, number } from "@inquirer/prompts";
import { Choice, Priority, TaskData, Task } from "./models";
// import { loadTasks, saveTasks } from "./storage";
// import * as TaskManager from "./manager";

export async function delegateAction(action: Choice) {
  switch (action) {
    case Choice.ADD:
      await handleAdd();
      break;
    case Choice.REMOVE:
      await handleRemove();
      break;
    case Choice.MODIFY:
      break;
    case Choice.LIST:
      break;
    case Choice.SORT:
      break;
    case Choice.QUIT:
      break;
    default:
      console.log("Default case, unknown action");
      break;
  }
}

export async function handleAdd() {
  console.log("in add handler");

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

  console.log("Task: ", task);
  // TaskManager.addTask(task);
}

export async function handleRemove() {
  /*
   * Steps:
   * 1) List all tasks to be removed
   * 2) Format: id, description, done
   */

  // const tasks: Task[] = loadTasks();
  const tasks: Task[] = [
    {
      id: 1,
      name: "Test1",
      description: "Test task",
      priority: Priority.LOW,
      duration: 30,
      done: false,
    },
  ];

  const choices = tasks.map((task) => {
    return {
      name: `Id: ${task.id} | Name: ${task.name} | Priority: ${task.priority} | Completed: ${task.done}`,
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
  const taskIdToRemove = await rawlist({
    message: "Select a task to remove:",
    choices: choices,
  });

  console.log("Task id: ", taskIdToRemove);
  // TaskManager.removeTask(taskIdToRemove);
}

export async function handleList() {}
