import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { styled } from '@mui/system';
import axiosInstance from '../../lib/axios';

const schema = yup.object().shape({
    task: yup
        .string()
        .required('Task is required')
        .min(3, 'Task must be at least 3 characters long')
        .matches(/(\w+\s){2,}/, 'Task must contain at least 3 words'),
});

type CreateTaskFormInputs = yup.InferType<typeof schema>;

const AddTaskButton = styled('button')({
    background: "linear-gradient(45deg, #9c27b0, #6200ea)",
    border: "none",
    color: "white",
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s ease, transform 0.3s ease",
    "&:hover": {
        background: "linear-gradient(45deg, #6200ea, #9c27b0)",
        transform: "scale(1.05)",
    },
    "&:active": {
        transform: "scale(0.98)",
    },
    whiteSpace: "nowrap",
    width: "120px",
});

const TaskInput = styled('input')<{ error?: boolean }>(({ error }) => ({
    width: '100%',
    padding: '12px 1px',
    marginBottom: '0px',
    borderRadius: '8px',
    border: `1px solid ${error ? '#f44336' : '#9c27b0'}`,
    backgroundColor: '#f5f5f5',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '16px',
    color: '#333',
    '&::placeholder': {
        color: '#9c27b0',
        fontStyle: 'italic',
    },
    '&:focus': {
        outline: 'none',
        borderColor: '#6200ea',
    },
}));

const FormContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: '10px',
});

interface TaskType {
    id: string;
    task: string;
    isActive: boolean;
}

const CreateTaskForm: React.FC<{ onTaskCreated: (newTask: TaskType) => void }> = ({ onTaskCreated }) => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm<CreateTaskFormInputs>({
        resolver: yupResolver(schema),
    });

    const { token } = useAuth();

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: CreateTaskFormInputs) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/tasks', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            reset();
            onTaskCreated(response.data);
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Failed to add task.');
        }finally{
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: 'auto' }}>
            <FormContainer>
                <Controller
                    name="task"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TaskInput
                            {...field}
                            placeholder="¿What don't you want to forget to do?"
                            error={!!errors.task}
                        />
                    )}
                />
                <AddTaskButton type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Task'}</AddTaskButton>
            </FormContainer>

            {errors.task && <p style={{ color: '#f44336', fontSize: '12px' }}>{errors.task.message}</p>}
        </form>
    );
};

export default CreateTaskForm;
