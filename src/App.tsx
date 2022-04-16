import React, { useRef, useState } from "react";
// TODO: find another way to clean the input after the click
type FormElement = React.FormEvent<HTMLFormElement>; //readbility :D
interface TaskGUI {
  taskName: string;
  done: boolean;
}

// especify the return of JSX code :D
function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>(""); //specify type on useState :O
  const [tasksArr, setTasksArr] = useState<TaskGUI[]>([]); //a list of objects :O
  const taskInput = useRef<HTMLInputElement>(null); //focus the input after creating a new task owo

  const handleSubmit = (e: FormElement): void => {
    // specify that we recieve an event (to cancel the defautl submit behaivour)
    e.preventDefault();
    addNewTask(newTask);
    // clean the input
    setNewTask("");
    taskInput.current?.focus;
  };

  const addNewTask = (taskName: string): void => {
    // add new object to the arr
    const newTaskObj: TaskGUI[] = [...tasksArr, { taskName, done: false }];
    setTasksArr(newTaskObj);
  };

  const toggleTaskCompletition = (index: number): void => {
    //returns nothing
    const currTaskArr: TaskGUI[] = [...tasksArr];
    currTaskArr[index].done = !currTaskArr[index].done; //change the value
    setTasksArr(currTaskArr); //update State value
  };

  const removeTask = (index: number): void => {
    const currTaskArr: TaskGUI[] = [...tasksArr];
    currTaskArr.splice(index, 1); //index, delet count
    setTasksArr(currTaskArr); //update State value
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  ref={taskInput}
                  autoFocus
                  className="form-control"
                  type="text"
                  id=""
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                />
                <button className="btn btn-success mt-2">Save Task</button>
              </form>
            </div>
          </div>
          {tasksArr.map((item: TaskGUI, i: number) => (
            <div key={i} className="card card-body mt-2">
              <h2
                style={{
                  textDecoration: item.done ? "line-through" : "underline",
                }}
              >
                {item.taskName}
              </h2>
              {/* <h5>-{item.done ? "Done" : "Pendient"}-</h5> */}
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleTaskCompletition(i)}
                >
                  {item.done ? "✔️" : "❎"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTask(i)}
                >
                  🔨
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
