import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InferType } from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { useAuth } from "../../AuthContext";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
});

type LoginFormInputs = InferType<typeof schema>;

const FormContainer = styled(Box)({
    background: "linear-gradient(135deg, #220050, #110136)",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
    width: "400px",
    fontFamily: "Roboto, sans-serif",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
});

const FormTitle = styled(Typography)({
    color: "#0070f3",
    fontSize: "28px",
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: 600,
});

const CustomTextField = styled(TextField)({
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    marginBottom: "16px",
    "& .MuiInputBase-root": {
        color: "#fff",
    },
    "& .MuiFormLabel-root": {
        color: "#a8a8a8",
    },
    "& .MuiInput-underline:before": {
        borderBottomColor: "#555",
    },
    "& .MuiInput-underline:hover:before": {
        borderBottomColor: "#80D8FF",
    },
    "& .MuiFormHelperText-root": {
        color: "#FF4081",
    },
});

const SubmitButton = styled(Button)({
    background: "linear-gradient(45deg, #9c27b0, #6200ea)",
    "&:hover": {
        background: "linear-gradient(45deg, #6200ea, #9c27b0)",
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.4)",
    },
    color: "#fff",
    marginTop: "20px",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "16px",
    width: "100%",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
    transition: "background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
    "&:active": {
        transform: "scale(0.98)",
    },
});

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: LoginFormInputs) => {
        setLoading(true);
        setLoginSuccess(true);

        try {
            await login({ email: data.email, password: data.password });
            router.push("/");
        } catch (error) {
            alert("Login failed. Please check your credentials.");
            setLoginSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormContainer>
            <FormTitle>Login</FormTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <CustomTextField
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
                        <CustomTextField
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
                <SubmitButton type="submit" variant="contained" disabled={loading || loginSuccess}>
                    {loading ? "Logging in..." : loginSuccess ? "Logged In" : "Login"}
                </SubmitButton>
            </form>
        </FormContainer>
    );
};

export default LoginForm;
