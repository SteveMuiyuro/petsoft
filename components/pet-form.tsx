"use client"

import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { usePetsContext } from '@/lib/hooks'


type PetFormProps = {
    actionType:"add" | "edit";
}

export default function PetForm({actionType}:PetFormProps) {
 const {handleAddPet} = usePetsContext()

const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
     const newPet = {
        name:formData.get("name") as string,
        ownerName: formData.get("ownerName") as string,
        imageUrl:formData.get("imageurl") as string || "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        age: +(formData.get("age") as string),
        notes:formData.get("notes") as string
     }

    handleAddPet(newPet)


    }
  return (
    <form onSubmit={handleSubmit}className="flex flex-col ">
        <div className='space-y-3'>
            <div className="space-y-1">
                <Label htmlFor='name'>Name</Label>
                <Input name="name" id="name" type="text" required/>
            </div>

            <div className="space-y-1">
                <Label htmlFor='ownername'>OwnerName</Label>
                <Input name="ownername" id="ownername" type="text" required/>
            </div>

            <div className="space-y-1">
                <Label htmlFor='imageurl'>ImageUrl</Label>
                <Input name="imageurl" id="imageurl" type="text"/>
            </div>


            <div className="space-y-1">
                <Label htmlFor='age'>Age</Label>
                <Input name="age" id="age" type="number" required/>
            </div>
            <div className="space-y-1">
                <Label htmlFor='notes'>Notes</Label>
                <Textarea name="notes" id="notes" rows={3} required/>
            </div>
        </div>
        <Button type="submit" className="mt-5 ml-auto">
            {actionType === "add" ? "Add a new pet" : "Edit pet"}
        </Button>
    </form>
  )
}
