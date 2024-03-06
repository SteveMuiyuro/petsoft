import React from 'react'
import { Button } from './ui/button'



type AppButtonProps = {
    actionType: "edit"|"checkout"|"add",
    children?:React.ReactNode,
    onClick?: () => void
}
export default function AppButton({actionType, children, onClick}:AppButtonProps) {
    if(actionType === "add") {
        return (
          <Button size="icon">
            {children}
          </Button>
        )
    }

    if(actionType === "edit") {
        return (
            <Button variant="secondary">
             {children}
            </Button>
          )
    }

    if(actionType === "checkout") {
        return (
            <Button onClick = {onClick} variant="secondary">
             {children}
            </Button>
          )
    }

}
