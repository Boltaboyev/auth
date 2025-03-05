import React, {useState} from "react"
import {Button, Input} from "antd"
import {verifyMutation} from "../../../hooks/useQueryHandler/useQueryAction"

const Verify = () => {
    const [code, setCode] = useState("")
    const {mutate, isLoading} = verifyMutation()

    const onChange = (text) => {
        console.log("onChange:", text)
        setCode(text)
    }

    const sharedProps = {
        onChange,
    }

    const verify = () => {
        let email = localStorage.getItem("email")
        mutate({email:email, code: code})
        console.log({email, code})
    }

    return (
        <div className="flex justify-center items-center flex-col gap-[10px] h-screen">
            Enter code
            <Input.OTP
                formatter={(str) => str.toUpperCase()}
                {...sharedProps}
            />
            <Button disabled={isLoading} onClick={verify} type="primary">
                {isLoading ? "loading..." : "verify"}
            </Button>
        </div>
    )
}

export default Verify
