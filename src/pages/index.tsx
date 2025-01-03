import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import CreateTaskForm from '../components/createTask/createTaskForm';
import TaskList from '../components/taskList/taskList';
import styled from 'styled-components';
import { useAuth } from '../AuthContext';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    background-color: #110136;
    color: white;
`;

const MainText = styled.div`
    text-align: center;
    margin-bottom: 2rem;

    h1 {
        font-size: 2.5rem;
        color: #0070f3;
        animation: fadeIn 1.5s ease-out;
    }

    p {
        font-size: 1.2rem;
        color: #ddd;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const TaskContainer = styled.div`
    margin-top: 2rem;
    width: 100%;
    max-width: 800px;
    background: linear-gradient(145deg, #1d1140, #2a1766);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
`;

const TaskDisplayContainer = styled.div`
    margin-top: 2rem;
    width: 100%;
    max-width: 800px;
    background: #1e1e1e;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.9rem;
    margin-top: 1rem;
`;

export default function Home() {
    const { isLoggedIn, user, logout } = useAuth();
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        if (isLoggedIn && user) {
            setMessage(null);
        } else {
            setMessage('You need to log in to view your tasks.');
        }
    }, [isLoggedIn, user]);

    return (
        <>
            <Head>
                <title>Task Management App</title>
            </Head>
            <PageContainer>
                <MainText>
                    <h1>Welcome to Task Management App</h1>
                    <p>Use this website to manage your tasks in the best way.</p>
                </MainText>

                <TaskContainer>
                    <CreateTaskForm />
                </TaskContainer>

                <TaskContainer>
                    {isLoggedIn && user?.id ? (
                        <TaskList userId={user.id} />
                    ) : (
                        <ErrorMessage>{message}</ErrorMessage>
                    )}
                </TaskContainer>
            </PageContainer>
        </>
    );
}