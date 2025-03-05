import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import {RouterProvider} from "react-router-dom"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {Bounce, ToastContainer} from "react-toastify"

import {router} from "./router"

import "./index.css"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}></RouterProvider>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                limit={2}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="colored"
                transition={Bounce}
            />
        </QueryClientProvider>
    </StrictMode>
)
