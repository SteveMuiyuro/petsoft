import React from 'react'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'

type PetSubmissionButtonProps = {
  actionType: "edit" | "add"
}

export default function PetSubmitButton({actionType}:PetSubmissionButtonProps) {
 
  return (
    <Button type="submit" className="mt-5 ml-auto">
    {actionType === "add" ? "Add a new pet" : "Edit pet"}
</Button>
  )
}
