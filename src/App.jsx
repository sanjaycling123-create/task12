import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [message, setMessage] = useState('');

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const response = await axios.post(API_URL, { title });
      setMessage(response.data.message);
      setTitle('');
      fetchTasks();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      setMessage(response.data.message);
      fetchTasks();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (id) => {
    if (!editTitle.trim()) return;
    try {
      const response = await axios.put(`${API_URL}/${id}`, { title: editTitle });
      setMessage(response.data.message);
      setEditingId(null);
      setEditTitle('');
      fetchTasks();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      
      {message && <div className="toast">{message}</div>}

      <form onSubmit={addTask} className="add-task-form">
        <input 
          type="text" 
          placeholder="Enter task title..." 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            {editingId === task.id ? (
              <div className="edit-mode">
                <input 
                  type="text" 
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => updateTask(task.id)}>Save</button>
                <button onClick={() => setEditingId(null)} className="cancel-btn">Cancel</button>
              </div>
            ) : (
              <>
                <span className="task-title">{task.title}</span>
                <div className="actions">
                  <button onClick={() => startEdit(task)} className="edit-btn">Edit</button>
                  <button onClick={() => deleteTask(task.id)} className="delete-btn">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
