import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { InferType } from 'yup';
import axios from 'axios';

const schema = yup.object({
    email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .required('Password is required'),
});

type LoginFormInputs = InferType<typeof schema>;

const Login: React.FC = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const response = await axios.post('http://localhost:3000/user/login', data);
            console.log('Response:', response.data);
            alert('Login successful!');
        } catch (error) {
            console.error('Error during login:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: 'auto' }}>
            <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                )}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
            </Button>
        </form>
    );
};

export default Login;
