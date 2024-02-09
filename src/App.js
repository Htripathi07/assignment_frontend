import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showRegistration, setShowRegistration] = useState(true);

  useEffect(() => {
    // Fetch tasks for the authenticated user
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://pink-mysterious-scorpion.cyclic.app/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          throw new Error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [user]);

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('https://pink-mysterious-scorpion.cyclic.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        localStorage.setItem('token', data.token);
        setError(null);
        setShowRegistration(false); // Hide registration form
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred while logging in.');
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await fetch('https://pink-mysterious-scorpion.cyclic.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (response.ok) {
        setError(null);
        setShowRegistration(false); // Hide registration form
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred while registering.');
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const response = await fetch('https://pink-mysterious-scorpion.cyclic.app/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(taskData)
      });
      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
      } else {
        throw new Error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await fetch(`https://pink-mysterious-scorpion.cyclic.app/tasks/${updatedTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedTask)
      });
      if (response.ok) {
        // Update the task in the state
        const updatedTasks = tasks.map(task => {
          if (task._id === updatedTask._id) {
            return updatedTask;
          }
          return task;
        });
        setTasks(updatedTasks);
      } else {
        throw new Error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://pink-mysterious-scorpion.cyclic.app/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        // Remove the task from the state
        const updatedTasks = tasks.filter(task => task._id !== taskId);
        setTasks(updatedTasks);
      } else {
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  return (
    <div className="App">
      <h1>Task Management System</h1>

      {showRegistration && <RegistrationForm onRegister={handleRegister} error={error} />}
      {!showRegistration && !user && <LoginForm onLogin={handleLogin} error={error} />}
      {user && <TaskList tasks={tasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />}
      {user && <TaskForm onAddTask={handleAddTask} />}
    </div>
  );
}

export default App;

