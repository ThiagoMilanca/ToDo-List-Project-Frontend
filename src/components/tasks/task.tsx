import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Typography, TextField } from "@mui/material";
import { styled } from "@mui/system";

interface TaskProps {
  id: string;
  task: string;
  isActive: boolean;
  onTaskUpdate: () => void;
}

const TaskContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#1e1e1e",
  padding: "10px 15px",
  borderRadius: "12px",
  marginBottom: "10px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  fontFamily: "Roboto, sans-serif",
});

const TaskText = styled(Typography)({
  color: "#fff",
  fontSize: "16px",
  flexGrow: 1,
  marginRight: "10px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const EditButton = styled(Button)({
  color: "transparent",
  background: "transparent",
  backgroundImage: "linear-gradient(to right, #ff4081, #9c27b0)",
  WebkitBackgroundClip: "text",
  fontWeight: "bold",
  marginRight: "10px",
  transition: "transform 0.3s ease, color 0.3s ease",
  "&:hover": {
    background: "transparent",
    color: "transparent",
    backgroundImage: "linear-gradient(to right, #ff4081, #9c27b0)",
    WebkitBackgroundClip: "text",
    transform: "scale(1.05)",
  },
});

const DeleteButton = styled(Button)({
  color: "red",
  background: "transparent",
  marginRight: "10px",
  transition: "transform 0.3s ease, color 0.3s ease",
  "&:hover": {
    background: "transparent",
    transform: "scale(1.05)",
    color: "#d32f2f",
  },
});

const Task: React.FC<TaskProps> = ({ id, task, isActive, onTaskUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  if (!isActive) return null;

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/tasks/${id}`, {
        task: editedTask,
      });
      onTaskUpdate();
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      onTaskUpdate();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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
          <EditButton onClick={handleEdit} variant="text">
            Save
          </EditButton>
        ) : (
          <EditButton onClick={() => setIsEditing(true)} variant="text">
            Edit
          </EditButton>
        )}
        <DeleteButton onClick={handleDelete} variant="text">
          Delete
        </DeleteButton>
      </div>
    </TaskContainer>
  );
};

export default Task;
