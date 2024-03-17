"use client"



import { logout } from "@/lib/actions"
import { Button } from "./ui/button"
import { useTransition } from "react"

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition()
  return (
   <Button disabled={isPending} onClick={async () => startTransition(async ()=> {
    await logout()
   })}>Sign Out</Button>
  )
}
