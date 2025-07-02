import { Choice } from "./models";

export function delegateAction(action: Choice) {
  switch (action) {
    case Choice.ADD:
      handleAdd();
      break;
    case Choice.REMOVE:
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

export function handleAdd() {
  console.log("in add handler");
}

export function handleRemove() {}
