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
            console.log(data);
            
            const token = data?.token

            localStorage.setItem("token", token);

            document.cookie = `user=${JSON.stringify(data)}; expires=Wed, 5 March 2025 21:00:00 UTC`;

            toast.success("Successfully registered");

            navigate("/");
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });
};


export const loginMutation = () => {
    const navigate = useNavigate();
    const axios = useAxios();
    return useMutation({
        mutationKey: "login",
        mutationFn: (data) =>
            axios({ url: "api/auth/sign-in", method: "POST", data }),
        onSuccess: (data) => {
            const token = data?.token;
            localStorage.setItem("token", token);
            document.cookie = `user=${JSON.stringify(data)}; expires=Wed, 5 March 2025 21:00:00 UTC`;
            toast.success("Successfully logged in");
            navigate("/");
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });
};
