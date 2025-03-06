import React from "react"
import {Button, Form, Input} from "antd"

import {changePasswordMutation} from "../../../hooks/useQueryHandler/useQueryAction"

const SetPassword = () => {
    const [form] = Form.useForm()
    const {mutate, isPending} = changePasswordMutation()

    const onFinish = (values) => {
        mutate(values, {
            onSuccess: () => {
                form.resetFields()
            },
        })
    }

    return (
        <section className="flex justify-center items-center h-screen flex-col gap-[10px]">
            <h1 className="text-lg font-semibold">Change Password</h1>
            <Form form={form} className="w-[400px]" onFinish={onFinish}>
                <Form.Item
                    name="current_password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your current password!",
                        },
                    ]}>
                    <Input.Password
                        size="large"
                        placeholder="Current Password"
                    />
                </Form.Item>

                <Form.Item
                    name="new_password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your new password!",
                        },
                        {
                            min: 3,
                            message: "Password must be at least 3 characters!",
                        },
                    ]}>
                    <Input.Password size="large" placeholder="New Password" />
                </Form.Item>

                <Button
                    className="w-full"
                    size="large"
                    type="primary"
                    htmlType="submit"
                    loading={isPending}>
                    Change Password
                </Button>
            </Form>
        </section>
    )
}

export default SetPassword
