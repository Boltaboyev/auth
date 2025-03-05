import {Button, Form, Input} from "antd"
import React from "react"
import {registerMutation} from "../../../hooks/useQueryHandler/useQueryAction"
import {Link} from "react-router-dom"

const Register = () => {
    const {mutate, isLoading} = registerMutation()

    const signIn = (e) => {
        mutate(e)
        localStorage.setItem("email", e.email)
    }

    return (
        <section className="flex justify-center items-center h-screen flex-col gap-[10px]">
            <h1 className="font-bold text-3xl">Sign Up</h1>
            <Form className="w-[400px]" onFinish={signIn}>
                <Form.Item
                    name="first_name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name!",
                        },
                    ]}>
                    <Input size="large" placeholder="name" />
                </Form.Item>

                <Form.Item
                    name="last_name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your surname!",
                        },
                    ]}>
                    <Input size="large" placeholder="surname" />
                </Form.Item>

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
                    You have an account?{" "}
                    <Link to="/login" className="text-blue-500 underline">
                        Log in
                    </Link>
                </p>

                <Button
                    disabled={isLoading}
                    className="w-full"
                    size="large"
                    type="primary"
                    htmlType="submit">
                    {isLoading ? "loading..." : "Sign up"}
                </Button>
            </Form>
        </section>
    )
}

export default Register
