import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import Cookies from "js-cookie"
import {Button, Drawer, Input, Form} from "antd"

import {useEditMutation} from "../../hooks/useQueryHandler/useQueryAction"

// icons
import {LiaEdit} from "react-icons/lia"

const Home = () => {
    const {mutate, isPending} = useEditMutation()
    const [user, setUser] = useState(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const userCookie = Cookies.get("user")
        if (userCookie) {
            try {
                const parsedUser = JSON.parse(userCookie)
                setUser(parsedUser)
            } catch (error) {
                console.log(error)
            }
        }
    }, [])

    const handleEdit = (values) => {
        const allowedFields = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            address: values.address,
        }

        mutate(allowedFields, {
            onSuccess: () => {
                const updatedUser = {...user, ...allowedFields}
                setUser(updatedUser)
                Cookies.set("user", JSON.stringify(updatedUser))
                setIsDrawerOpen(false)
            },
        })
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        Cookies.remove("user")
        navigate("/login")
    }

    return (
        <section className="flex m-auto justify-center items-center h-screen bg-blue-50">
            <div className="flex flex-col gap-[10px] w-[500px] shadow-md rounded-xl border bg-white border-gray-100">
                {user ? (
                    <div>
                        <ul>
                            <li className="p-[15px] border-b border-gray-200 flex justify-between items-center">
                                <p className="opacity-60">Photo: </p>
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        className="h-[40px] w-[40px] rounded-full"
                                        alt="User"
                                    />
                                ) : (
                                    <img
                                        src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.webp"
                                        className="h-[40px] w-[40px] rounded-full"
                                        alt="Default"
                                    />
                                )}
                            </li>
                            <li className="p-[15px] border-b border-gray-200 flex justify-between items-center">
                                <p className="opacity-60">First Name:</p>
                                <strong className="opacity-80">
                                    {user.first_name}
                                </strong>
                            </li>
                            <li className="p-[15px] border-b border-gray-200 flex justify-between items-center">
                                <p className="opacity-60">Last Name:</p>
                                <strong className="opacity-80">
                                    {user.last_name}
                                </strong>
                            </li>
                            <li className="p-[15px] border-b border-gray-200 flex justify-between items-center">
                                <p className="opacity-60">Email:</p>
                                <strong className="opacity-80">
                                    {user.email}
                                </strong>
                            </li>
                            <li className="p-[15px] border-b border-gray-200 flex justify-between items-center">
                                <p className="opacity-60">Address:</p>
                                <strong className="opacity-80">
                                    {user.address || "N/A"}
                                </strong>
                            </li>
                            <li className="p-[15px] border-b border-gray-200 flex justify-between items-center">
                                <p className="opacity-60">Created At:</p>
                                <strong className="opacity-80">
                                    {new Date(user.createdAt).toLocaleString()}
                                </strong>
                            </li>
                            <li className="p-[15px] border-b border-gray-200 flex justify-between items-center">
                                <p className="opacity-60">Password:</p>
                                <div className="flex justify-center items-center gap-[20px]">
                                    <strong className="opacity-80">
                                        ********
                                    </strong>
                                    <Link to={"/verify-email"} className="z-10">
                                        <LiaEdit className="text-blue-700 text-[25px] cursor-pointer" />
                                    </Link>
                                </div>
                            </li>
                        </ul>
                        <div className="w-full p-[10px]">
                            <Button
                                type="primary"
                                size="large"
                                className="w-full"
                                onClick={() => setIsDrawerOpen(true)}>
                                Edit profile
                            </Button>
                        </div>

                        <Button
                            onClick={logout}
                            type="primary"
                            danger
                            className="!absolute top-2.5 right-2.5">
                            logout
                        </Button>
                    </div>
                ) : (
                    <p className="opacity-60">No user data found.</p>
                )}

                <Drawer
                    title="Edit Profile"
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    width={400}>
                    <Form
                        layout="vertical"
                        initialValues={user}
                        onFinish={handleEdit}>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your first name!",
                                },
                            ]}
                            name="first_name"
                            label="First Name">
                            <Input placeholder="Enter first name" />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: "Please input last name!",
                                },
                            ]}
                            name="last_name"
                            label="Last Name">
                            <Input placeholder="Enter last name" />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your address!",
                                },
                            ]}
                            name="address"
                            label="Address">
                            <Input placeholder="Enter address" />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                            name="email"
                            label="Email">
                            <Input placeholder="Enter email" />
                        </Form.Item>
                        <Button
                            loading={isPending}
                            type="primary"
                            htmlType="submit"
                            className="w-full">
                            Save Changes
                        </Button>
                    </Form>
                </Drawer>
            </div>
        </section>
    )
}

export default Home
