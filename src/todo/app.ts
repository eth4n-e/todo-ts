import { rawlist } from "@inquirer/prompts";
import { Choice } from "./models";
import { delegateAction } from "./handler";

export async function startApp() {
  // while loop to handle user input
  // a print block to specify options
  // command line to begin parsing
  // logic to forward option to appropriate handler
  // starting with a single option and building up

  /*
   * Enter option:
   * 1) Add task - sublevels: allow user to enter task information
   * 2) Remove task - sublevels: list all tasks, allow user to select, Remove
   * 3) Modify task - sublevels: lists all tasks, allow user to select, then enter modified information
   * 4) List tasks
   * 5) Sort tasks - sublevels: by priority, duration, etc.
   * 6) Quit
   */
  let action: Choice;

  do {
    action = await rawlist({
      message: "Enter option",
      choices: [
        { name: "Add task", value: Choice.ADD },
        { name: "Remove task", value: Choice.REMOVE },
        { name: "Quit", value: Choice.QUIT },
      ],
    });

    await delegateAction(action);
  } while (action != Choice.QUIT);
}
