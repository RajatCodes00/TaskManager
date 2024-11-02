// components/TaskItem.js
import React, { useState } from 'react';

function TaskItem({ task, onUpdate, onDelete, onToggleStatus }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task);

    const handleUpdate = () => {
        onUpdate(updatedTask);
        setIsEditing(false);
    };

    const getDay = (id) => {
        const day = new Date(id).getDay();
        const month = new Date(id).getMonth() + 1;
        const year = new Date(id).getFullYear();

        return `${day}/${month}/${year}`;
    }
    const getTime = (id) => {
        const hours = new Date(id).getHours() % 12;
        const minutes = new Date(id).getMinutes();

        return `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${(new Date(id).getHours() >= 12 ? "PM" : "AM")}`
    }

    return (
        <div className="task-item">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={updatedTask.name}
                        onChange={(e) => setUpdatedTask({ ...updatedTask, name: e.target.value })}
                        placeholder='Task Name'
                        className='edit-input'
                    />
                    <textarea
                        value={updatedTask.description}
                        onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
                        placeholder='Task Description'
                        className='edit-textarea'
                    />
                    <div className="editButtons">
                        <button onClick={() => setIsEditing(false)} className='cancel-button'>Cancel</button>
                        <button onClick={handleUpdate} className='save-button'>Save</button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="title">
                        <h3>{task.name}</h3>
                        <div className="time">
                            <p>{getTime(task.id)}, {getDay(task.id)}</p>
                        </div>
                    </div>
                    <p>{task.description}</p>
                    <p>Status: <span className={task.status === 'Completed' ? 'completed' : 'pending'}>{task.status}</span></p>
                    <div className="buttons">
                        <div className='cardButton'>
                            <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
                            <button onClick={() => onDelete(task.id)} className="delete-button">Delete</button>
                        </div>
                        {/* <button onClick={() => onToggleStatus(task.id)} className={`${task.status === 'Pending' ? 'completed-button' : 'pending-button'}`}>
                            Set as {task.status === 'Pending' ? 'Completed' : 'Pending'}
                        </button> */}
                        <select onChange={() => onToggleStatus(task.id)} className={`${task.status === 'Pending' ? 'pending-button' : 'completed-button'}`}>
                            <option disabled selected={false} value="">Select Status</option>
                            <option selected={task.status === "Completed"} style={{ color: "green" }}>Completed</option>
                            <option selected={task.status === "Pending"} style={{ color: "red" }}>Pending</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskItem;
