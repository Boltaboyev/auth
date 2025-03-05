import {createBrowserRouter} from "react-router-dom"

import Register from "../pages/auth/register"
import Login from "../pages/auth/login"
import Verify from "../pages/auth/verify"
import Home from "../pages/home"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
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
