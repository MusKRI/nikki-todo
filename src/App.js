import { useEffect, useState } from "react";
import "./App.css";

const AddTaskForm = ({ addTask }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    value && addTask(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        placeholder="Enter a title for this task…"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">
        <i class="fas fa-plus"></i>
      </button>
    </form>
  );
};

export const ToDoList = () => {
  // Function to load tasks from localStorage
  const loadTasksFromLocalStorage = () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  };

  const [tasks, setTasks] = useState(loadTasksFromLocalStorage());

  // Function to save tasks to localStorage
  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const addTask = (text) => setTasks([...tasks, { text, isCompleted: false }]);

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const resetCheckedTasks = () => {
    const uncheckedTasks = tasks.map((task) => {
      return {
        ...task,
        isCompleted: false,
      };
    });
    setTasks(uncheckedTasks);
  };

  return (
    <div className="todo-list">
      <AddTaskForm addTask={addTask} />
      <div className="" style={{ maxHeight: "200px ", overflow: "scroll" }}>
        {tasks.map((task, index) => (
          <div className="todo" key={index}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => toggleTask(index)}
              style={{ maxWidth: "20px" }}
            />
            <span
              className={
                task.isCompleted ? "todo-text todo-completed" : "todo-text"
              }
            >
              {task.text}
            </span>
            <button onClick={() => removeTask(index)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        ))}
      </div>

      <button
        clasName="btn btn-primary"
        onClick={resetCheckedTasks}
        style={{ padding: "5px 10px " }}
      >
        Reset Checked
      </button>
    </div>
  );
};
