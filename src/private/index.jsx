import {Navigate} from "react-router-dom"
import Home from "../pages/home"

const Private = () => {
    const token = localStorage.getItem("token")

    return token ? <Home /> : <Navigate to="/login" replace />
}

export default Private
