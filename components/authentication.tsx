"use client"

import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { login, signup } from '@/lib/actions'
import AuthButton from './auth-button'
import { useFormState } from 'react-dom'

type AuthenticationProps = {

  type: "signin" | "signup"

}

export default function Authentication({type}:AuthenticationProps)

{

  const [signUpError, dispatchSignUp] = useFormState(signup, undefined)

  return (
    <form action={dispatchSignUp} className="">
        <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input name="email" id="email" type="email" required maxLength={100}/>
        </div>
        <div className="mb-4 mt-2 space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input name="password" id="password" type="password" required maxLength={100}/>
        </div>
       <AuthButton type={type}/>
       {signUpError && <p className="text-red-500 text-sm mt-5">{signUpError.message}</p>}
    </form>
  )
}
