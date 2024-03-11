"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import PetForm from './pet-form'
import { flushSync } from 'react-dom'




type AppButtonProps = {
    actionType: "edit"|"checkout"|"add",
    children?:React.ReactNode,
    onClick?: () => void,

}
export default function AppButton({actionType, children, onClick}:AppButtonProps) {

const [isFormOpen, setIsFormOpen] = useState(false)

  if(actionType === "checkout") {
      return (
          <Button onClick = {onClick} variant="secondary">
           {children}
          </Button>
        )
  }
        return (
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            {actionType === "add" ? (
          <Button size="icon">
            {children}
          </Button>

            ): (
            <Button variant="secondary">
             {children}
            </Button>
            )}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
               {actionType === "add" ? "Add a new pet" : "Edit pet"}
              </DialogTitle>
            </DialogHeader>
            <PetForm actionType={actionType} onFormSubmission={()=>
              {
                flushSync(()=> setIsFormOpen(false)
                )
              }
              }/>
          </DialogContent>
          </Dialog>
        )
}
