const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-info">
        <span className="task-title">{task.title}</span>
        <span className={`status-badge ${task.status}`}>
          {task.status === 'completed' ? '✓ Completed' : '○ Pending'}
        </span>
      </div>
      <div className="actions">
        <button 
          onClick={() => onToggle(task.id)} 
          className={`toggle-btn ${task.status}`}
        >
          {task.status === 'completed' ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => onDelete(task.id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
