// * ChatGPT generated code
// Template for testing CLI output structure
// import { expect } from "chai";
// import sinon from "sinon";
// import * as inquirer from "inquirer";
// import { runTodoApp } from "../src/cli"; // the entry point function
//
// describe("CLI Output", () => {
//   let stdout: string = "";
//   let logStub: sinon.SinonStub;
//
//   beforeEach(() => {
//     stdout = "";
//     logStub = sinon.stub(console, "log").callsFake((msg) => {
//       stdout += msg + "\n";
//     });
//   });
//
//   afterEach(() => {
//     sinon.restore();
//   });
//
//   it("should print todos in correct format", async () => {
//     sinon.stub(inquirer, "prompt").resolves({
//       action: "list",
//     });
//
//     await runTodoApp();
//
//     expect(stdout).to.match(/^\d+\. \[[ x]\] .+/m);
//   });
// });
