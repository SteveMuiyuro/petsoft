"use client"

import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { usePetsContext } from '@/lib/hooks'
import PetSubmitButton from './pet-submit-button'
import {useForm as formFunc} from "react-hook-form"


type PetFormProps = {
    actionType:"add" | "edit";
    onFormSubmission: ()=> void;
}


type TPetData = {
    name:string,
    ownerName:string,
    age:number,
    imageUrl:string,
    notes:string
}
export default function PetForm({actionType, onFormSubmission}:PetFormProps) {
 const {handleAddPet, selectedPet, handleEditPet} = usePetsContext()

const {register, formState:{errors}} = formFunc<TPetData>()

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

        onFormSubmission()
        const petData = {
        name:formData.get("name") as string,
        ownerName: formData.get("ownerName") as string,
        imageUrl:formData.get("imageurl") as string || "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        age: +(formData.get("age") as string),
        notes:formData.get("notes") as string

        }
        if(actionType === "add") {
           await handleAddPet(petData)
        } else {
            await handleEditPet(selectedPet!.id, petData)

        }
    }}className="flex flex-col ">
        <div className='space-y-3'>
            <div className="space-y-1">
                <Label htmlFor='name'>Name</Label>
                <Input id="name" {...register("name")}/>
                {errors.name && <p className="text-red-500"></p>}
            </div>

            <div className="space-y-1">
                <Label htmlFor='ownerName'>OwnerName</Label>
                <Input id="ownerName" {...register("ownerName")}/>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-1">
                <Label htmlFor='imageUrl'>ImageUrl</Label>
                <Input id="imageUrl" {...register("imageUrl")}/>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>


            <div className="space-y-1">
                <Label htmlFor='age'>Age</Label>
                <Input  id="age" {...register("age")}/>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-1">
                <Label htmlFor='notes'>Notes</Label>
                <Textarea  id="notes" {...register("notes")}rows={3}/>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
        </div>
        <PetSubmitButton actionType={actionType}/>
    </form>
  )
}
function useForm() {
    throw new Error('Function not implemented.')
}
