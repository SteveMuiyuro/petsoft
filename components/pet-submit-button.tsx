import React from 'react'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'

export default function PetSubmitButton({actionType}) {
    const {pending} = useFormStatus()
  return (
    <Button disabled={pending}type="submit" className="mt-5 ml-auto">
    {actionType === "add" ? "Add a new pet" : "Edit pet"}
</Button>
  )
}
