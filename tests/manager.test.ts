import { describe, it } from 'mocha'; // testing framework / environment
import * as chai from 'chai'; // assertion library, using named imports
import sinon from 'sinon';
import sinonChai from 'sinon-chai'; // integrates sinon's spies, stubs, etc. with chai's interface
// import * as manager from '../todo/manager';
// import * as storage from '../todo/storage';

chai.use(sinonChai);
// const expect = chai.expect;

// describes test suite
describe("Task Manager", () => {
  // centralized container for spies, stubs, mocks
  const sandbox = sinon.createSandbox();

  // cleanup 
  afterEach(() => {
    sandbox.restore();
  })

  // individual test scenarios
  it("adds a task to storage", () => {
    
  });

  it("removes a task from storage", () => {
    
  });

  it("lists all tasks", () => {

  });

  it("updates a task's status", () => {
    
  });

  it("updates a task's priority", () => {
    
  });

  it("updates a task's duration", () => {
    
  });

});
