import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
    id: string;
    task: string;
    isActive?: boolean;
}

interface TaskListProps {
    userId: string;
}

const TaskList: React.FC<TaskListProps> = ({ userId }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(`http://localhost:3000/tasks/user/${userId}`);
                setTasks(response.data);
            } catch (error: any) {
                setError(error.message || 'Error getting tasks');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [userId]);

    if (isLoading) return <p>Loading tasks...</p>;
    if (error) return <p>Error: {error}</p>;

    const activeTasks = tasks.filter(task => task.isActive);

    return (
        <div className="task-list">
            {activeTasks.map(task => (
                <div key={task.id} className="task-item">
                    <h3>{task.task}</h3>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
