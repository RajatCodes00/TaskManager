import React, { useState } from 'react';

function TaskForm({ onSubmit }) {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskName && taskDescription) {
            onSubmit({ name: taskName, description: taskDescription, status: 'Pending' });
            setTaskName('');
            setTaskDescription('');
        }
    };

    return (
        <div className="taskForm">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Task Name"
                    required
                />
                <textarea
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Task Description"
                    required
                />
                <button className='submitBtn' type="submit">Add Task</button>
            </form>
        </div>
    );
}

export default TaskForm;
