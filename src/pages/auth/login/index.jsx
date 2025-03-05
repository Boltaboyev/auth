import React from "react"
import {Button, Form, Input} from "antd"
import {loginMutation} from "../../../hooks/useQueryHandler/useQueryAction"
import {Link, useNavigate} from "react-router-dom"

const Login = () => {
    const {mutate, isLoading} = loginMutation()

    const logIn = (e) => {
        mutate(e)
        localStorage.setItem("email", e.email)
    }

    return (
        <section className="flex justify-center items-center h-screen flex-col gap-[10px]">
            <h1 className="font-bold text-3xl">Login</h1>
            <Form className="w-[400px]" onFinish={logIn}>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}>
                    <Input size="large" placeholder="email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}>
                    <Input.Password size="large" placeholder="password" />
                </Form.Item>

                <p className="mb-4">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-500 underline">
                        Sign up
                    </Link>
                </p>

                <Button
                    disabled={isLoading}
                    className="w-full"
                    size="large"
                    type="primary"
                    htmlType="submit">
                    {isLoading ? "loading..." : "Login"}
                </Button>
            </Form>
        </section>
    )
}

export default Login
