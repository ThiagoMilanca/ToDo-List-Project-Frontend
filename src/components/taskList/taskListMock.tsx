import React, { useState } from 'react';
import TaskMock from '../tasks/taskMock';

const TaskListMock = () => {
    const [tasks, setTasks] = useState([
        { id: '1', task: 'Do the shopping', isActive: true },
        { id: '2', task: 'go to the gym', isActive: true },
        { id: '3', task: 'wash the car', isActive: false },
        { id: '4', task: 'Plan the vacation', isActive: true },
    ]);

    const handleEditMock = (id: string, updatedTask: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, task: updatedTask } : task
            )
        );
    };

    const handleDeleteMock = (id: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    return (
        <div className="task-list">
            <h2>Mock Task List</h2>
            {tasks.map((task) => (
                <TaskMock
                    key={task.id}
                    id={task.id}
                    task={task.task}
                    isActive={task.isActive}
                    onEditMock={handleEditMock}
                    onDeleteMock={handleDeleteMock}
                />
            ))}
        </div>
    );
};

export default TaskListMock;
