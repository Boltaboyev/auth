import {createBrowserRouter} from "react-router-dom"

import Register from "../pages/auth/register"
import Login from "../pages/auth/login"
import Verify from "../pages/auth/verify"
import Private from "../private"

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
])
