import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAxios } from "../../useAxios";

export const registerMutation = () => {
    const navigate = useNavigate();
    const axios = useAxios();
    return useMutation({
        mutationKey: "Auth",
        mutationFn: (data) =>
            axios({ url: "api/auth/sign-up", method: "POST", data }),
        onSuccess: () => {
            toast.success("Sending code");
            navigate("/verify");
        },
        onError: () => {
            toast.error("email exist");
            toast.error("Error");
        },
    });
};

export const verifyMutation = () => {
    const navigate = useNavigate();
    const axios = useAxios();
    return useMutation({
        mutationKey: "verify",
        mutationFn: (data) =>
            axios({ url: "api/auth/verify", method: "POST", data }),
        onSuccess: (data) => {
            console.log("Verify response:", data);

            const token = data?.data?.token;
            if (!token) {
                toast.error("Token not received");
                console.error("No token in response:", data);
                return;
            }

            localStorage.setItem("token", token);
            document.cookie = `user=${JSON.stringify(data.data)}; expires=Mon, 10 March 2025 17:00:00 UTC`;
            toast.success("Successfully registered");
            navigate("/");
        },
        onError: (error) => {
            console.error("Verification error:", error);
            const errorMessage = error.response?.data?.message || "Invalid code";
            toast.error(errorMessage);
        },
    });
};
