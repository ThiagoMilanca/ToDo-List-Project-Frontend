import React from 'react';
import Head from 'next/head';
import RegisterForm from '../components/register/registerform';
import Login from '../components/login/login';

export default function Home() {
    return (
        <>
            <Head>
                <title>Task Management App</title>
            </Head>
            <main>
                <h1>Welcome to Task Management App</h1>
                <p>Start managing your tasks efficiently from now.</p>
                <RegisterForm />
                <Login />
            </main>
        </>
    );
}