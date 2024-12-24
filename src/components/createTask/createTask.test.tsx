import { render, screen, waitFor } from '@testing-library/react';
import CreateTaskForm from './createTaskForm';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

beforeAll(() => {
    global.alert = jest.fn();
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('CreateTaskForm', () => {

test('should show error when task is invalid', async () => {
    render(<CreateTaskForm />);

    const taskInput = screen.getByPlaceholderText('¿What don\'t you want to forget to do?');
    const submitButton = screen.getByRole('button', { name: /Add Task/i });

    userEvent.clear(taskInput);
    userEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText('Task is required')).toBeInTheDocument();
    });
});

test('should show error when task has less than 3 words', async () => {
    render(<CreateTaskForm />);

    const taskInput = screen.getByPlaceholderText('¿What don\'t you want to forget to do?');
    const submitButton = screen.getByRole('button', { name: /Add Task/i });

    userEvent.clear(taskInput);
    userEvent.type(taskInput, 'Short');

    userEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText('Task must contain at least 3 words')).toBeInTheDocument();
    });
});

test('should show error when task is empty', async () => {
    render(<CreateTaskForm />);

    const taskInput = screen.getByPlaceholderText("¿What don't you want to forget to do?");
    const submitButton = screen.getByRole("button", { name: /Add Task/i });

    userEvent.clear(taskInput);

    userEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText('Task must be at least 3 characters long')).toBeInTheDocument();
    });
    });
});
