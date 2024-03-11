"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db"
import { Sleep } from "./sleep";
export async function addPet(newPet) {

    try{
        await prisma.pet.create({
             data:newPet
         })

    } catch(error){

        return {
            message:"Pet not added"
        }
    }

    revalidatePath("/app", "layout")

}

export async function editPet(petId, editedPet) {
    try{
        await prisma.pet.update({
            where:{
                id:petId
            },
            data:editedPet,
            })

        }

      catch(error){
        return {
            message:"Can't complete the pet edit"
        }
      }

      revalidatePath("/app", "layout")

}

export async function deletePet(petId) {
    try{
        await Sleep(2000)
        await prisma.pet.delete({
            where:{
                id:petId
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
