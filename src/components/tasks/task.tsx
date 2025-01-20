import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Typography, TextField } from "@mui/material";
import { styled } from "@mui/system";
import axiosInstance from "../../lib/axios";
import { set } from "react-hook-form";

interface TaskProps {
  id: string;
  task: string;
  isActive: boolean;
  onTaskUpdate: () => void;
}

const TaskContainer = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(90deg,rgb(84, 44, 119),rgb(14, 15, 78));
  padding: 10px 15px;
  border-radius: 12px;
  margin-bottom: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  font-family: "Roboto", sans-serif;
  width: 100%;
  max-width: 800px;
`;

const TaskText = styled(Typography)`
  color: #fff;
  font-size: 16px;
  flex-grow: 1;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`;

const EditButton = styled(Button)`
  color: transparent;
  background: transparent;
  background-image: linear-gradient(to right, #ff4081, #9c27b0);
  -webkit-background-clip: text;
  font-weight: bold;
  margin-right: 10px;
  transition: transform 0.3s ease, color 0.3s ease;
  &:hover {
    background: transparent;
    color: transparent;
    background-image: linear-gradient(to right, #ff4081, #9c27b0);
    -webkit-background-clip: text;
    transform: scale(1.05);
  }
`;

const DeleteButton = styled(Button)`
  color: red;
  background: transparent;
  margin-right: 10px;
  transition: transform 0.3s ease, color 0.3s ease;
  &:hover {
    background: transparent;
    transform: scale(1.05);
    color: #d32f2f;
  }
`;

const Task: React.FC<TaskProps> = ({ id, task, isActive, onTaskUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  if (!isActive) return null;

const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    setLoading(true);
    try {
      await axiosInstance.put(`/tasks/${id}`, {
        task: editedTask,
      });
      onTaskUpdate();
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing task:", error);
    }finally{
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      onTaskUpdate();
    } catch (error) {
      console.error("Error deleting task:", error);
    }finally{
      setLoading(false);
    };
  };

  return (
    <TaskContainer>
      {isEditing ? (
        <TextField
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            backgroundColor: "#2e2e2e",
            input: { color: "#fff" },
          }}
        />
      ) : (
        <TaskText>{task}</TaskText>
      )}
      <div>
      {isEditing ? (
        <>
          <EditButton onClick={handleEdit} variant="text" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </EditButton>
        <DeleteButton
          onClick={() => {
          setIsEditing(false);
          setEditedTask(task);
        }}
        disabled={loading}
        >
          Cancel
        </DeleteButton>
        </>
        ) : (
              <EditButton onClick={() => setIsEditing(true)} variant="text">
                Edit
              </EditButton>
      )}

        <DeleteButton onClick={handleDelete} variant="text" disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </DeleteButton>
      </div>
    </TaskContainer>
  );
};

export default Task;
