"use client"



import { logout } from "@/lib/actions"
import { Button } from "./ui/button"

export default function SignOutButton() {
  return (
   <Button onClick={async ()=> await logout()}>Sign Out</Button>
  )
}
