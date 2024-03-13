import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'

type AuthenticationProps = {

  type: "signin" | "signup"

}

export default function Authentication({type}:AuthenticationProps) {
  return (
    <form className="">
        <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email"/>
        </div>
        <div className="mb-4 mt-2 space-y-1">
            <Label htmlFor="email">Password</Label>
            <Input id="password" type="password"/>
        </div>
        <Button>{type === "signin" ? "signin" : "signup"}</Button>
    </form>
  )
}
