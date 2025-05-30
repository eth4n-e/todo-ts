import { describe, it } from 'mocha'; // testing framework / environment
import * as chai from 'chai'; // assertion library, using named imports
import sinon from 'sinon';
import sinonChai from 'sinon-chai'; // integrates sinon's spies, stubs, etc. with chai's interface
import { Task, Priority } from '../todo/models';
import * as manager from '../todo/manager';
import * as storage from '../todo/storage';

chai.use(sinonChai);
const expect = chai.expect;

// describes test suite
describe("Task Manager", () => {
  // centralized container for spies, stubs, mocks
  const sandbox = sinon.createSandbox();

  // store stubs (mocked functions)
  let loadMock: sinon.SinonStub;
  let saveMock: sinon.SinonStub;

  // data mocks
  const newTask = {
    desc: "new task",
    priority: Priority.Low,
    duration: 1,
  };

  const taskMock = {
    id: 1,
    desc: "mock task", 
    priority: Priority.Medium,
    duration: 2,
    done: false
  };

  // creates array with mock tasks with unique ids
  const mockTasks: Task[] = new Array(3)
    .fill(taskMock)
    .map((task, idx) => task.id += idx); // map to create unique indices 
  
  beforeEach(() => {
    // create stubs of storage functions
    // stub ~ mock of function
    loadMock = sandbox.stub(storage, "loadTasks");
    saveMock = sandbox.stub(storage, "saveTasks");
  })

  // cleanup 
  afterEach(() => {
    sandbox.restore();
  })

  // individual test scenarios
  it("adds a task to storage", () => {
    // want to figure out how to destructure this 
    manager.addTask(newTask.desc, newTask.priority, newTask.duration);
    expect(saveMock).to.have.been.called;
    expect(saveMock).to.have.been.calledWith(newTask);
  });    

  it("removes a task from storage", () => {
    loadMock.returns(mockTasks);
  });

  it("lists all tasks", () => {
    // control return value of loadTasks using stub
    loadMock.returns([]);
    const tasks: Task[] = manager.listTasks();
    expect(loadMock).to.have.been.called;
    expect(tasks).to.be.empty;
  });

  it("updates a task's status", () => {
    // call updateStatus
    // check that loadMock has been called
    // check that saveMock been called
    // assert that task's status was updated (compare before and after)
  });

  it("updates a task's priority", () => {
    // similar to update a tasks status    
  });

  it("updates a task's duration", () => {
    // similar to update a tasks status    
  });

});
