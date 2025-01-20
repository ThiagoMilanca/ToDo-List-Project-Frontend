import { useState } from "react";
import axiosInstance from "../../lib/axios";

export const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const [logoutSuccess, setLogoutSuccess] = useState(false);

    const logout = async (): Promise<void> => {
        setLoading(true);
        setLogoutSuccess(true);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        try {
            const response = await axiosInstance.post("/user/logout");
            alert(response.data.message);
        } catch (error) {
            console.error("Error during logout:", error);
            alert("An error occurred during logout. Please try again.");
            setLogoutSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return {
        logout,
        loading,
        logoutSuccess,
    };
};
