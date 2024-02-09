import React from 'react';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  return (
    <div className="task-list-container">
      <h2>Task List</h2>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <h3>{task.title}</h3>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Due Date:</strong> {task.dueDate}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <div className="task-buttons">
              <button onClick={() => onUpdateTask(task)} className="update-button" style={{margin: "5px"}}>Update</button>
              <button onClick={() => onDeleteTask(task._id)} className="delete-button" style={{margin: "5px"}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;


