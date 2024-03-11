"use client"

import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { usePetsContext } from '@/lib/hooks'
import { addPet } from '@/lib/actions'
import { Sleep } from '@/lib/sleep'
import PetSubmitButton from './pet-submit-button'
import { toast } from 'sonner'


type PetFormProps = {
    actionType:"add" | "edit";
    onFormSubmission: ()=> void;
}

export default function PetForm({actionType, onFormSubmission}:PetFormProps) {
 const {handleAddPet, selectedPet, handleEditPet} = usePetsContext()

const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formData = new FormData(e.currentTarget);
    //  const pet = {
    //     name:formData.get("name") as string,
    //     ownerName: formData.get("ownerName") as string,
    //     imageUrl:formData.get("imageurl") as string || "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
    //     age: +(formData.get("age") as string),
    //     notes:formData.get("notes") as string
    //  }

    // actionType === "add" ?  handleAddPet(pet) : handleEditPet(selectedPet!.id, pet)
    // onFormSubmission()


    }
  return (
    <form action={async(formData) => {
        await Sleep(2000)
        const error = await addPet(formData)
        if(error) {
            toast.warning(error.message)
        }
        onFormSubmission()
    }}className="flex flex-col ">
        <div className='space-y-3'>
            <div className="space-y-1">
                <Label htmlFor='name'>Name</Label>
                <Input name="name" id="name" type="text" required defaultValue={actionType==="edit" ? selectedPet?.name: ""}/>
            </div>

            <div className="space-y-1">
                <Label htmlFor='ownerName'>OwnerName</Label>
                <Input name="ownerName" id="ownerName" type="text" required defaultValue={actionType==="edit" ? selectedPet?.ownerName: ""}/>
            </div>

            <div className="space-y-1">
                <Label htmlFor='imageUrl'>ImageUrl</Label>
                <Input name="imageUrl" id="imageUrl" type="text" defaultValue={actionType==="edit" ? selectedPet?.imageUrl: ""}/>
            </div>


            <div className="space-y-1">
                <Label htmlFor='age'>Age</Label>
                <Input name="age" id="age" type="number" required defaultValue={actionType==="edit" ? selectedPet?.age: ""}/>
            </div>
            <div className="space-y-1">
                <Label htmlFor='notes'>Notes</Label>
                <Textarea name="notes" id="notes" rows={3} required defaultValue={actionType==="edit" ? selectedPet?.notes: ""}/>
            </div>
        </div>
        <PetSubmitButton actionType={actionType}/>
    </form>
  )
}
