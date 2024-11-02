// components/TaskList.js
import React, { useState } from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onUpdate, onDelete, onToggleStatus }) {
    const [selectedFilter, setSelectedFilter] = useState('');

    return (
        <div>
            {tasks?.length === 0 ? (
                <div className="no-tasks">
                    <p>No tasks available</p>
                </div>
            ) : (
                <>
                    <div className="options">
                        <div className="filter">
                            <button onClick={() => setSelectedFilter("Completed")} className={`${selectedFilter === "Completed" ? 'active' : ""}`}>Completed</button>
                            <button onClick={() => setSelectedFilter("Pending")} className={`${selectedFilter === "Pending" ? 'active' : ""}`}>Pending</button>
                        </div>
                        <button onClick={() => setSelectedFilter("")} className={`${!selectedFilter ? 'active' : ""}`}>Sort By Date</button>
                    </div>
                    <div className='taskList'>
                        <div className="cards">
                            {
                                selectedFilter ? (
                                    tasks?.filter(task => {
                                        return task.status === selectedFilter
                                    }).map(task => (
                                        <TaskItem key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} onToggleStatus={onToggleStatus} />
                                    ))
                                )
                                    : (
                                        tasks?.sort((a, b) => b.id - a.id).map(task => (
                                            <TaskItem key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} onToggleStatus={onToggleStatus} />
                                        ))
                                    )
                            }
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default TaskList;
