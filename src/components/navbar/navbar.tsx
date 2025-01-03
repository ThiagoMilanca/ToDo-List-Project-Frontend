import { useState, useEffect, JSX } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useAuth } from "../../AuthContext";

const NavbarContainer = styled(Box)({
    zIndex: 10,
    top: 0,
    position: "sticky",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#220050",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
});

const Title = styled(Typography)({
    color: "#0070f3",
    fontSize: "1.5rem",
    fontWeight: "bold",
    fontFamily: "Roboto, sans-serif",
});

const MenuBox = styled(Box)({
    display: "flex",
    gap: "1.5rem",
});

const GradientButton = styled(Button)({
    fontWeight: "bold",
    textTransform: "none",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    fontSize: "1rem",
    color: "white",
    background: "linear-gradient(to left, #9b005d, #5c1d7f)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
        background: "linear-gradient(to left, #7a004f, #471265)",
    },
    "&:active": {
        transform: "scale(0.98)",
    },
});

export default function Navbar(): JSX.Element {
    const router = useRouter();
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <NavbarContainer>
            <Title>Task Manager</Title>

            <MenuBox>
                <Link href="/" passHref>
                    <GradientButton>Home</GradientButton>
                </Link>

                {isLoggedIn ? (
                    <GradientButton onClick={handleLogout}>Logout</GradientButton>
                ) : (
                    <>
                        <Link href="/login" passHref>
                            <GradientButton>Login</GradientButton>
                        </Link>
                        <Link href="/register" passHref>
                            <GradientButton>Register</GradientButton>
                        </Link>
                    </>
                )}
            </MenuBox>
        </NavbarContainer>
    );
}
