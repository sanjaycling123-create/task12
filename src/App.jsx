import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');

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

  const addTask = async (title) => {
    try {
      await axios.post(API_URL, { title });
      showToast("Task added successfully! ➕");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      showToast("Task deleted! 🗑️");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`);
      showToast("Status updated! 🔄");
      fetchTasks();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const showToast = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      
      {message && <div className="toast">{message}</div>}

      <TaskForm onAdd={addTask} />
      
      <TaskList 
        tasks={tasks} 
        onDelete={deleteTask} 
        onToggle={toggleStatus} 
      />
    </div>
  );
}

export default App;
