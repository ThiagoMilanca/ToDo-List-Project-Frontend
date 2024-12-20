import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    id: string;
    task: string;
    isActive: boolean;
}

interface TasksState {
    tasks: Task[];
    isActive: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    isActive: true,
    loading: false,
    error: null,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
            state.loading = false;
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
            state.loading = false;
        },
        editTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(
                (task) => task.id === action.payload.id
            );
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
            state.loading = false;
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
            state.loading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { setTasks, addTask, editTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
