import { input } from "@inquirer/prompts";

export async function startApp() {
  // while loop to handle user input
  // a print block to specify options
  // command line to begin parsing
  // logic to forward option to appropriate handler
  // starting with a single option and building up

  const answer = await input({ message: "Enter a task name " });
  console.log(answer);
}
