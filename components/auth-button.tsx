"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"

type AuthButtonProps = {
    type:"signin" |"signup"
}

export default function AuthButton({type}:AuthButtonProps) {
    const {pending} = useFormStatus()
  return (
    <>
        <Button disabled={pending}>{type === "signin" ? "Sign in" : "Sign up"}</Button>

    </>
  )
}
