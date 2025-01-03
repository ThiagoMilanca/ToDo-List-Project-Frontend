import React, { useEffect, useState } from "react";
import axios from "axios";
import Task from "../tasks/task";

interface TaskType {
  id: string;
  task: string;
  isActive: boolean;
}

interface TaskListProps {
  userId: string;
}

const TaskList: React.FC<TaskListProps> = ({ userId }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks?userId=${userId}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleTaskUpdate = () => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks?userId=${userId}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  };

  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          task={task.task}
          isActive={task.isActive}
          onTaskUpdate={handleTaskUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;
