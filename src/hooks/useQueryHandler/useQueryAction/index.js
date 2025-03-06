import {useMutation} from "@tanstack/react-query"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

import {useAxios} from "../../useAxios"

export const registerMutation = () => {
    const navigate = useNavigate()
    const axios = useAxios()
    return useMutation({
        mutationKey: "Auth",
        mutationFn: (data) =>
            axios({url: "api/auth/sign-up", method: "POST", data}),
        onSuccess: () => {
            toast.success("Sending code")
            navigate("/verify")
        },
        onError: () => {
            toast.error("Email already exist!")
            toast.error("Error")
        },
    })
}

export const verifyMutation = () => {
    const navigate = useNavigate()
    const axios = useAxios()
    return useMutation({
        mutationKey: "verify",
        mutationFn: (data) =>
            axios({url: "api/auth/verify", method: "POST", data}),
        onSuccess: (data) => {

            const token = data?.token

            localStorage.setItem("token", token)

            document.cookie = `user=${JSON.stringify(data)};`

            toast.success("Successfully registered")

            navigate("/")
        },
        onError: (error) => {
            toast.error("Wrong code !")
            console.log(error)
        },
    })
}

export const loginMutation = () => {
    const navigate = useNavigate()
    const axios = useAxios()
    return useMutation({
        mutationKey: "login",
        mutationFn: (data) =>
            axios({url: "api/auth/sign-in", method: "POST", data}),
        onSuccess: (data) => {
            const token = data?.token
            localStorage.setItem("token", token)
            document.cookie = `user=${JSON.stringify(data)}`
            toast.success("Successfully logged in")
            navigate("/")
        },
        onError: (error) => {
            toast.error("Email or password is wrong!")
            console.log(error)
        },
    })
}

export const useEditMutation = () => {
    const axios = useAxios()
    return useMutation({
        mutationKey: "editUser",
        mutationFn: (data) =>
            axios({
                url: "api/auth/edit",
                method: "POST",
                data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        onSuccess: () => {
            toast.success("Profile updated successfully")
        },
        onError: (error) => {
            toast.error("Edit failed!")
            console.log(error)
        },
    })
}


export const verifyEmailMutation = () => {
    const navigate = useNavigate();
    const axios = useAxios();
    return useMutation({
        mutationKey: "verifyEmail",
        mutationFn: (data) =>
            axios({
                url: "api/auth/verify-email",
                method: "POST",
                data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        onSuccess: () => {
            toast.success("Verification code sent to your email");
            navigate("/verify-code"); 
        },
        onError: (error) => {
            toast.error("Failed to send verification code");
            console.log(error);
        },
    });
};



export const verifyCodeMutation = () => {
    const navigate = useNavigate();
    const axios = useAxios();
    return useMutation({
        mutationKey: "verifyUser",
        mutationFn: (data) =>
            axios({
                url: "api/auth/verify-user",
                method: "POST",
                data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        onSuccess: () => {
            toast.success("Successfully verified");
            navigate("/set-password"); 
        },
        onError: (error) => {
            toast.error("Wrong verification code!");
            console.log(error);
        },
    });
};


export const changePasswordMutation = () => {
    const navigate = useNavigate();
    const axios = useAxios();
    return useMutation({
        mutationKey: "changePassword",
        mutationFn: (data) =>
            axios({
                url: "api/auth/change-password",
                method: "POST",
                data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        onSuccess: () => {
            toast.success("Password changed successfully");
            navigate("/login");
        },
        onError: (error) => {
            toast.error("Failed to change password");
            console.log(error);
        },
    });
};