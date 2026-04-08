import { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Task title cannot be empty!");
      return;
    }
    onAdd(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input 
        type="text" 
        placeholder="Enter task title..." 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
