import React, {useState} from "react"
import {Button, Input} from "antd"

import {verifyMutation} from "../../../hooks/useQueryHandler/useQueryAction"

const Verify = () => {
    const [code, setCode] = useState("")
    const {mutate, isPending} = verifyMutation()

    const onChange = (text) => {
        setCode(text)
    }

    const sharedProps = {
        onChange,
    }

    const verify = () => {
        let email = localStorage.getItem("email")
        mutate({email, code: code})
    }

    return (
        <div className="flex justify-center items-center flex-col gap-[10px] h-screen">
            Enter code
            <Input.OTP
                formatter={(str) => str.toUpperCase()}
                {...sharedProps}
            />
            <Button loading={isPending} onClick={verify} type="primary">
                verifys
            </Button>
        </div>
    )
}

export default Verify
