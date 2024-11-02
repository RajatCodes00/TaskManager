// App.js
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        let recentTasks = JSON.parse(localStorage?.getItem("tasks")) || [];
        setTasks(recentTasks);
    }, []);

    const addTask = (task) => {
        setTasks([...tasks, { ...task, id: Date.now() }]);
        let recentTasks = JSON.parse(localStorage?.getItem("tasks")) || [];
        recentTasks?.push({ ...task, id: Date.now() })
        localStorage.setItem("tasks", JSON.stringify(recentTasks));
        toast.success('Task added successfully!');
    };

    const updateTask = (updatedTask) => {
        setTasks(tasks?.map(task => task.id === updatedTask.id ? updatedTask : task));
        let recentTasks = JSON.parse(localStorage?.getItem("tasks"));
        recentTasks = recentTasks?.map(task => task.id === updatedTask.id ? updatedTask : task);
        localStorage.setItem("tasks", JSON.stringify(recentTasks));
        toast.success('Task updated successfully!');
    };

    const deleteTask = (taskId) => {
        setTasks(tasks?.filter(task => task.id !== taskId));
        let recentTasks = JSON.parse(localStorage?.getItem("tasks"));
        recentTasks = recentTasks?.filter(task => task.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(recentTasks));
        toast.error('Task deleted successfully!');
    };

    const toggleTaskStatus = (taskId) => {
        setTasks(tasks?.map(task =>
            task.id === taskId ? { ...task, status: task.status === "Pending" ? "Completed" : "Pending" } : task
        ));
        let recentTasks = JSON.parse(localStorage?.getItem("tasks"));
        recentTasks = recentTasks?.map(task =>
            task.id === taskId ? { ...task, status: task.status === "Pending" ? "Completed" : "Pending" } : task
        );
        localStorage.setItem("tasks", JSON.stringify(recentTasks));
        toast.info('Task status updated!')
    }

    // Polling Effect for Real-Time Updates
    useEffect(() => {
        const interval = setInterval(() => {
            setTasks((prevTasks) => [...prevTasks]); // Simulate task update
        }, 30000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className='taskContainer'>
            <h1>Real-Time Task Manager</h1>
            <TaskForm onSubmit={addTask} />
            <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} onToggleStatus={toggleTaskStatus} />
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    );
}

export default App;
