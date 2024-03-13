"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db"
import { Sleep } from "./sleep";
import { petDataSchema, petIdSchema } from "./validation";
import { signIn } from "./auth";


//user actions
export async function login(formData:FormData) {

    const authData = Object.fromEntries(formData.entries())
    await signIn("credentials", authData)

}

//Pet actions
export async function addPet(newPet:unknown) {

    const validatedPet = petDataSchema.safeParse(newPet)

    if(!validatedPet.success) return {message:"Invalid pet data"}

    try{
        await Sleep(1000)
        await prisma.pet.create({
             data:validatedPet.data
         })
    } catch(error){

        return {
            message:"Pet not added"
        }
    }

    revalidatePath("/app", "layout")

}

export async function editPet(petId:unknown, editedPet:unknown) {
    const validatedPet = petDataSchema.safeParse(editedPet)
    const validatedPetId = petIdSchema.safeParse(petId)

    if(!validatedPet.success || !validatedPetId.success) return {message:"Invalid pet data"}

    try{
        await Sleep(1000)
        await prisma.pet.update({
            where:{
                id:validatedPetId.data
            },
            data:validatedPet.data,
            })

        }

      catch(error){
        return {
            message:"Can't complete the pet edit"
        }
      }

      revalidatePath("/app", "layout")

}

export async function deletePet(petId:unknown) {
    const validatedPetId = petIdSchema.safeParse(petId)
    if(!validatedPetId.success) return {message:"Invalid pet data"}

    try{
        await Sleep(1000)
        await prisma.pet.delete({
            where:{
                id:validatedPetId.data
            }

        })

    }
    catch(error) {
        return {
            message:"couldn't delete pet"
        }
    }
    revalidatePath("/app", "layout")
}
