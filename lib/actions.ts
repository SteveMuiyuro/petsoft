"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db"
import { Sleep } from "./sleep";
import { PetEssentials } from "./types";
import { Pet } from "@prisma/client";
export async function addPet(newPet:PetEssentials) {

    try{
        await Sleep(1000)
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

export async function editPet(petId:Pet["id"], editedPet:PetEssentials) {
    try{
        await Sleep(1000)
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

export async function deletePet(petId:Pet["id"]) {
    try{
        await Sleep(1000)
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
