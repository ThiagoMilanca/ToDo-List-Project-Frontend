import axiosInstance from "../../lib/axios";

export const logout = async (): Promise<void> => {
    try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        const response = await axiosInstance.post("/user/logout");

        alert(response.data.message);
    } catch (error) {
        console.error("Error during logout:", error);
        alert("An error occurred during logout. Please try again.");
    }
};
