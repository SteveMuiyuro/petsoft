"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db"
import { Sleep } from "./sleep";
export async function addPet(formData) {

    try{
        await prisma.pet.create({
             data:{
              name: formData.get("name"),
              ownerName: formData.get("ownerName"),
              age: parseInt(formData.get("age")),
              imageUrl:formData.get("imageUrl") || "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
              notes:formData.get("notes")
             },
         })

    } catch(error){

        return {
            message:"Pet not added"
        }
    }

    revalidatePath("/app", "layout")

}

export async function editPet(petId, formData) {
    try{
        await prisma.pet.update({
            where:{
                id:petId
            },
            data:{
                name: formData.get("name"),
                ownerName: formData.get("ownerName"),
                age: parseInt(formData.get("age")),
                imageUrl:formData.get("imageUrl") || "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
                notes:formData.get("notes")
               },
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
