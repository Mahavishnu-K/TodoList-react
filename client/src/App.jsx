import { useState } from 'react';
import { FiEdit3 } from "react-icons/fi";
import './App.css';

function App() {
  const [tasks, setTasks] = useState(["Wake up early", "Play football", "Gym workout", "Eat breakfast", "Finish assignment", "Learn React"]);
  const [newTask, setNewTask] = useState("");
  const [editingField, setEditingField] = useState(null);
  const [editedData, setEditedData] = useState("");

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  };

  const handleEditClick = (index) => {
    setEditingField(index);
    setEditedData(tasks[index]); 
  };

  const handleEditChange = (e) => {
    setEditedData(e.target.value);
  };

  const handleEditSave = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editedData;
    setTasks(updatedTasks);
    setEditingField(null);
  };

  const deleteTask = (index) => {
    const updatedList = tasks.filter((_, i) => i !== index);
    setTasks(updatedList);
  };

  return (
    <>
      <h1 className="title">Todo List</h1>
      <div className="todoInput">
        <input
          type="text"
          className="input"
          placeholder="Enter Todo Tasks!"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add" onClick={addTask}>Add Task</button>
      </div>

      <div className="todolist">
        <ol className="lists">
          {tasks.map((task, index) => (
            <li className="task-list" key={index}>
              <span>{index + 1}.</span>

              {editingField === index ? (
                <input
                  type="text"
                  className="edit-input"
                  value={editedData}
                  onChange={handleEditChange}
                  onBlur={() => handleEditSave(index)} 
                  onKeyDown={(e) => e.key === "Enter" && handleEditSave(index)} 
                  autoFocus
                />
              ) : (
                <span className="text">{task}</span>
              )}

              <span
                style={{ marginTop: 7, cursor: "pointer" }}
                onClick={() => handleEditClick(index)}
                className='edit-button'
              >
                <FiEdit3 size={20} />
              </span>
              <button className="delete" onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
