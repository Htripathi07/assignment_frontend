import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [taskData, setTaskData] = useState({ title: '', description: '', dueDate: '', status: 'pending' });

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(taskData);
    setTaskData({ title: '', description: '', dueDate: '', status: 'pending' });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <label htmlFor="title" style={{ marginRight: '10px' }}>Title:</label>
        <input type="text" id="title" name="title" value={taskData.title} onChange={handleChange} required style={{ marginRight: '20px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        
        <label htmlFor="description" style={{ marginRight: '10px' }}>Description:</label>
        <textarea id="description" name="description" value={taskData.description} onChange={handleChange} required style={{ marginRight: '20px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}></textarea>
        
        <label htmlFor="dueDate" style={{ marginRight: '10px' }}>Due Date:</label>
        <input type="date" id="dueDate" name="dueDate" value={taskData.dueDate} onChange={handleChange} required style={{ marginRight: '20px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        
        <label htmlFor="status" style={{ marginRight: '10px' }}>Status:</label>
        <select id="status" name="status" value={taskData.status} onChange={handleChange} required style={{ marginRight: '20px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
