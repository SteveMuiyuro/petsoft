import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { login } from '@/lib/actions'

type AuthenticationProps = {

  type: "signin" | "signup"

}

export default function Authentication({type}:AuthenticationProps) {
  return (
    <form action={login} className="">
        <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input name="email" id="email" type="email"/>
        </div>
        <div className="mb-4 mt-2 space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input name="password" id="password" type="password"/>
        </div>
        <Button>{type === "signin" ? "Sign in" : "Sign up"}</Button>
    </form>
  )
}
