import { describe, it } from "mocha"; // testing framework / environment
import * as chai from "chai"; // assertion library, using named imports
import sinon from "sinon";
import sinonChai from "sinon-chai"; // integrates sinon's spies, stubs, etc. with chai's interface
import { Task, Priority, TaskData } from "../todo/models";
import * as manager from "../todo/manager";
import * as storage from "../todo/storage";

chai.use(sinonChai);
const expect = chai.expect;

// describes test suite
describe("Task Manager", () => {
  // centralized container for spies, stubs, mocks
  const sandbox = sinon.createSandbox();

  // store stubs (mocked functions)
  let loadTasksMock: sinon.SinonStub;
  let saveTasksMock: sinon.SinonStub;

  // data mocks
  const newTaskData: TaskData = {
    desc: "new task",
    priority: Priority.LOW,
    duration: 1,
  };

  const taskMock = {
    id: 1,
    done: false,
    ...newTaskData,
  };

  // creates array with mock tasks with unique ids
  const mockTasks: Task[] = new Array(3).fill(taskMock);
  // create unique ids
  mockTasks.forEach((task, idx) => (task.id += idx));

  beforeEach(() => {
    // create stubs of storage functions
    // stub ~ mock of function
    loadTasksMock = sandbox.stub(storage, "loadTasks");
    saveTasksMock = sandbox.stub(storage, "saveTasks");
  });

  // cleanup
  afterEach(() => {
    sandbox.restore();
  });

  // individual test scenarios
  it("adds a task to storage", () => {
    // want to figure out how to destructure this
    manager.addTask({ ...newTaskData });
    expect(saveTasksMock).to.have.been.called;
    // argument to saveTasks is array, get first element
    const savedTask = saveTasksMock.getCall(0).args[0][0];
    // addTask should create a valid Task from the desc, priority, and duration
    expect(savedTask).to.haveOwnProperty("id");
    expect(savedTask).to.haveOwnProperty("done");
  });

  it("removes a task from storage", () => {
    // simulating mockTasks existing in storage
    loadTasksMock.returns(mockTasks);
    const id = mockTasks[0].id;

    // removeTask should load and update (save) tasks
    manager.removeTask(id);
    expect(loadTasksMock).to.have.been.called;
    expect(saveTasksMock).to.have.been.called;

    const expectedTasks = mockTasks.filter((task) => task.id != id);
    expect(saveTasksMock).to.have.been.called;
    // should save all tasks excluding task to remove
    expect(saveTasksMock).to.have.been.calledWith(expectedTasks);
  });

  it("lists all tasks", () => {
    // control return value of loadTasks using stub
    loadTasksMock.returns([]);
    const tasks: Task[] = manager.listTasks();
    expect(loadTasksMock).to.have.been.called;
    expect(tasks).to.be.empty;
  });

  it("updates a task's status", () => {
    loadTasksMock.returns(mockTasks);
    // first tasks data
    const task = mockTasks[0];
    const initStatus = task.done;

    // note: status is boolean, value flipped in update method
    manager.updateStatus(task.id);
    expect(loadTasksMock).to.have.been.called;
    expect(saveTasksMock).to.have.been.called;
    // first arg to saveTasks is updated task
    const updatedTask = saveTasksMock.getCall(0).args[0][0];
    expect(updatedTask.done).to.not.equal(initStatus);
    // check that other propert(y)(ies) have not been augmented
    expect(updatedTask.id).to.equal(task.id);
    expect(updatedTask.priority).to.equal(task.priority);
  });

  it("updates a task's priority", () => {
    loadTasksMock.returns(mockTasks);
    // first tasks data
    const task = mockTasks[0];
    // initPriority = LOW
    const initPriority = task.priority;
    const newPriority = Priority.HIGH;

    manager.updatePriority(task.id, newPriority);
    expect(loadTasksMock).to.have.been.called;
    expect(saveTasksMock).to.have.been.called;
    // first arg to saveTasks is updated task
    const updatedTask = saveTasksMock.getCall(0).args[0][0];
    expect(updatedTask.priority).to.not.equal(initPriority);
    // check that other propert(y)(ies) have not been augmented
    expect(updatedTask.id).to.equal(task.id);
    expect(updatedTask.duration).to.equal(task.duration);
  });

  it("updates a task's duration", () => {
    loadTasksMock.returns(mockTasks);
    // first tasks data
    const task = mockTasks[0];
    const initDuration = task.duration;
    const newDuration = initDuration + 1;

    manager.updateDuration(task.id, newDuration);
    expect(loadTasksMock).to.have.been.called;
    expect(saveTasksMock).to.have.been.called;
    // first arg to saveTasks is updated task
    const updatedTask = saveTasksMock.getCall(0).args[0][0];
    expect(updatedTask.duration).to.not.equal(initDuration);
    // check that other propert(y)(ies) have not been augmented
    expect(updatedTask.id).to.equal(task.id);
    expect(updatedTask.priority).to.equal(task.priority);
  });
});
