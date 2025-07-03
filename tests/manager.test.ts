import { describe, it } from "mocha"; // testing framework / environment
import * as chai from "chai"; // assertion library, using named imports
import sinon from "sinon";
import sinonChai from "sinon-chai"; // integrates sinon's spies, stubs, etc. with chai's interface
import { v4 as uuidv4 } from "uuid";
import { Task, Priority, TaskData } from "../src/todo/models";
import * as manager from "../src/todo/manager";
import * as storage from "../src/todo/storage";

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
  const mockTaskData: TaskData = {
    name: "new task",
    description: "new task description",
    priority: Priority.LOW,
    duration: 1,
  };

  const mockTasksData: TaskData[] = new Array(3).fill(mockTaskData);
  const mockTasks: Task[] = mockTasksData.map((data) => {
    return {
      id: uuidv4(),
      done: false,
      ...data,
    };
  });

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
    const initTasksLength = mockTasks.length;
    loadTasksMock.returns(mockTasks);
    const updatedTasks = manager.addTaskToList({ ...mockTaskData });
    expect(loadTasksMock).to.have.been.called;
    expect(updatedTasks.length).to.be.greaterThan(initTasksLength);
  });

  it("removes a task from storage", () => {
    const initTasksLength = mockTasks.length;
    const id = mockTasks[0].id;
    const updatedTasks = manager.removeTaskFromList(id, mockTasks);

    expect(updatedTasks.length).to.be.lessThan(initTasksLength);
    expect(updatedTasks.some((task) => task.id === id)).to.be.false;
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
