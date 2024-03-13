"use client"

import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { usePetsContext } from '@/lib/hooks'
import PetSubmitButton from './pet-submit-button'
import {useForm as formFunc} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { DEFAULT_IMAGE } from '@/lib/constant'
import { TPetData, petDataSchema } from '@/lib/validation'

type PetFormProps = {
    actionType:"add" | "edit";
    onFormSubmission: ()=> void;
}

export default function PetForm({actionType, onFormSubmission}:PetFormProps) {
    const {handleAddPet, selectedPet, handleEditPet} = usePetsContext()


//  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
//      e.preventDefault();

//     // const formData = new FormData(e.currentTarget);
//     //  const pet = {
//     //     name:formData.get("name") as string,
//     //     ownerName: formData.get("ownerName") as string,
//     //     imageUrl:formData.get("imageurl") as string || "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
//     //     age: +(formData.get("age") as string),
//     //     notes:formData.get("notes") as string
//     //  }

//     // actionType === "add" ?  handleAddPet(pet) : handleEditPet(selectedPet!.id, pet)
//     // onFormSubmission()
// }



const {register, getValues, trigger, formState:{errors}} = formFunc<TPetData>({
   resolver:zodResolver(petDataSchema),
   defaultValues: actionType === "edit" ? {
    name:selectedPet?.name,
    ownerName:selectedPet?.ownerName,
    imageUrl:selectedPet?.imageUrl,
    age:selectedPet?.age,
    notes:selectedPet?.notes
   } : undefined
})
return (
    <form action={async() => {

        const result = await trigger()
        if(!result) return;

        onFormSubmission()
        const petData = getValues()
        petData.imageUrl = petData.imageUrl || DEFAULT_IMAGE

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
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-1">
                <Label htmlFor='ownerName'>OwnerName</Label>
                <Input id="ownerName" {...register("ownerName")}/>
                {errors.ownerName && <p className="text-red-500">{errors.ownerName.message}</p>}
            </div>

            <div className="space-y-1">
                <Label htmlFor='imageUrl'>ImageUrl</Label>
                <Input id="imageUrl" {...register("imageUrl")}/>
                {errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message}</p>}
            </div>


            <div className="space-y-1">
                <Label htmlFor='age'>Age</Label>
                <Input  id="age" {...register("age")}/>
                {errors.age && <p className="text-red-500">{errors.age.message}</p>}
            </div>
            <div className="space-y-1">
                <Label htmlFor='notes'>Notes</Label>
                <Textarea  id="notes" {...register("notes")}rows={3}/>
                {errors.notes && <p className="text-red-500">{errors.notes.message}</p>}
            </div>
        </div>
        <PetSubmitButton actionType={actionType}/>
    </form>
  )
}
function useForm() {
    throw new Error('Function not implemented.')
}
