import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InferType } from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const schema = yup.object().shape({
    name: yup
        .string()
        .min(3, 'Name must be at least 3 characters long')
        .max(20, 'Name must not exceed 20 characters')
        .required('Name is required'),
    email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .required('Password is required'),
});

type RegisterFormInputs = InferType<typeof schema>;

const RegisterForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RegisterFormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: RegisterFormInputs) => {
        console.log('Form submitted:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: 'auto' }}>
            <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                )}
            />
            <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Email"
                        type="email"
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
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                )}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
            </Button>
        </form>
    );
};

export default RegisterForm;
