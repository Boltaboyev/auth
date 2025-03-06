import React from "react"
import {Button, Form, Input} from "antd"

import {verifyEmailMutation} from "../../../hooks/useQueryHandler/useQueryAction"

const VerifyEmail = () => {
    const [form] = Form.useForm()
    const verifyEmail = verifyEmailMutation()

    const onFinish = (values) => {
        verifyEmail.mutate(values, {
            onSuccess: () => {
                form.resetFields()
            },
        })
    }

    return (
        <section className="flex justify-center items-center h-screen flex-col gap-[10px]">
            <h1 className="text-lg font-semibold">Enter current email</h1>
            <Form form={form} className="w-[400px]" onFinish={onFinish}>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                        {
                            type: "email",
                            message: "Please enter a valid email address!",
                        },
                    ]}>
                    <Input size="large" placeholder="Email" />
                </Form.Item>
                <Button
                    className="w-full"
                    size="large"
                    type="primary"
                    htmlType="submit"
                    loading={verifyEmail.isPending}>
                    Send code
                </Button>
            </Form>
        </section>
    )
}

export default VerifyEmail
