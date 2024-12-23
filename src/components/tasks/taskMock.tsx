import React, { useState } from 'react';

interface TaskMockProps {
    id: string;
    task: string;
    isActive: boolean;
    onEditMock?: (id: string, updatedTask: string) => void;
    onDeleteMock?: (id: string) => void;
}

const TaskMock: React.FC<TaskMockProps> = ({ id, task, isActive, onEditMock, onDeleteMock }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task);

    if (!isActive) return null;

    const handleEdit = () => {
        if (onEditMock) {
            onEditMock(id, updatedTask);
        }
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (onDeleteMock) {
            onDeleteMock(id);
        }
    };

    return (
        <div className="task-item">
            {isEditing ? (
                <input
                    value={updatedTask}
                    onChange={(e) => setUpdatedTask(e.target.value)}
                    className="task-input"
                />
            ) : (
                <span>{task}</span>
            )}

            {isEditing ? (
                <button className="edit-button" onClick={handleEdit}>
                    Save
                </button>
            ) : (
                <button className="edit-button" onClick={() => setIsEditing(true)}>
                    Edit
                </button>
            )}
            <button className="delete-button" onClick={handleDelete}>
                Eliminar
            </button>
        </div>
    );
};

export default TaskMock;
