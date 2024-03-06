import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'


type PetFormProps = {
    actionType:"add" | "edit";
}

export default function PetForm({actionType}:PetFormProps) {
  return (
    <form className="flex flex-col ">
        <div className='space-y-3'>
            <div className="space-y-1">
                <Label htmlFor='name'>Name</Label>
                <Input id="name" type="text" />
            </div>

            <div className="space-y-1">
                <Label htmlFor='ownername'>OwnerName</Label>
                <Input id="ownername" type="text" />
            </div>

            <div className="space-y-1">
                <Label htmlFor='imageurl'>ImageUrl</Label>
                <Input id="imageurl" type="text" />
            </div>


            <div className="space-y-1">
                <Label htmlFor='age'>Age</Label>
                <Input id="age" type="number" />
            </div>
            <div className="space-y-1">
                <Label htmlFor='notes'>Notes</Label>
                <Textarea id="notes" rows={3} />
            </div>
        </div>
        <Button type="submit" className="mt-5 ml-auto">
            {actionType === "add" ? "Add a new pet" : "Edit pet"}
        </Button>
    </form>
  )
}
