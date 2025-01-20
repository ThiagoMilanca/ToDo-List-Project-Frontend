import React, { useEffect, useState } from "react";
import Task from "../tasks/task";
import axiosInstance from "../../lib/axios";

interface TaskType {
  id: string;
  task: string;
  isActive: boolean;
}

interface TaskListProps {
  userId: string;
  setShouldFetchTasks: React.Dispatch<React.SetStateAction<boolean>>;
  shouldFetchTasks: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ userId, setShouldFetchTasks, shouldFetchTasks }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get(`/tasks/${userId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  useEffect(() => {
    if (shouldFetchTasks) {
      fetchTasks();
      setShouldFetchTasks(false);
    }
  }, [shouldFetchTasks, setShouldFetchTasks]);

  const handleTaskUpdate = () => {
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
