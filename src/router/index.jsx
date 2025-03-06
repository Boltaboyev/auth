import {createBrowserRouter} from "react-router-dom"

import Register from "../pages/auth/register"
import Login from "../pages/auth/login"
import Verify from "../pages/auth/verify"
import Private from "../private"
import VerifyEmail from "../pages/change-password/verify-email"
import VerifyCode from "../pages/change-password/verify-code"
import SetPassword from "../pages/change-password/set-password"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Private />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/verify",
        element: <Verify />,
    },
    {
        path: "/verify-email",
        element: <VerifyEmail />,
    },
    {
        path: "/verify-code",
        element: <VerifyCode />,
    },
    {
        path: "/set-password",
        element: <SetPassword />,
    },
])
