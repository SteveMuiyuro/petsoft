"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db"
import { Sleep } from "./sleep";
import { petDataSchema, petIdSchema } from "./validation";
import { auth, signIn, signOut } from "./auth";
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation";
// sign up

export async function signup(formData:FormData){
    const hashedPassword = await bcrypt.hash(formData.get("password"), 10)

    await prisma.user.create({
        data:{
            email: formData.get("email"),
            hashedPassword,
        }
    })

    await signIn("credentials", formData)

}

//sign out

export async function logout(){
     await signOut({
        redirectTo:"/"
    })
}
//user actions
export async function login(formData:FormData) {

    await signIn("credentials", formData)

}

//Pet actions
export async function addPet(newPet:unknown) {

    const session = await auth()

    if(!session?.user) {
        redirect("/signin")
    }

    const validatedPet = petDataSchema.safeParse(newPet)

    if(!validatedPet.success) return {message:"Invalid pet data"}

    try{
        await Sleep(1000)
        await prisma.pet.create({
             data:{...validatedPet.data,
                User:{
                    connect:{
                        id: session.user.id
                    }
                }
            }
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
    const session = await auth()

    if(!session?.user){
        redirect("/signin")
    }

    const validatedPetId = petIdSchema.safeParse(petId)
    if(!validatedPetId.success) return {message:"Invalid pet data"}

    const pet = await prisma.pet.findUnique({
        where:{
            id:validatedPetId.data
        }
    })

    if(!pet){
        return {message:"No pet found"}
    }

    if(pet.userId !== session.user.id){
        return {
            message:"Not authorized"
        }
    }

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
