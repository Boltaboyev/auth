import React, {useState} from "react"
import {Button, Input} from "antd"

import {verifyCodeMutation} from "../../../hooks/useQueryHandler/useQueryAction"

const VerifyCode = () => {
    const [code, setCode] = useState("")
    const {mutate, isPending} = verifyCodeMutation()

    const onChange = (text) => {
        setCode(text)
    }

    const verify = () => {
        const email = localStorage.getItem("email")
        mutate({email, code})
    }

    return (
        <div className="flex justify-center items-center flex-col gap-[10px] h-screen">
            <h1 className="text-lg font-semibold">Enter Verification Code</h1>
            <Input.OTP onChange={onChange} value={code} />
            <Button
                onClick={verify}
                loading={isPending}
                type="primary"
                size="large"
                className="mt-4 w-[320px]">
                Verify
            </Button>
        </div>
    )
}

export default VerifyCode
