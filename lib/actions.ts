"use server";

import prisma from "./db"
export async function addPet(pet) {
   await prisma.pet.create({
        data:pet,
    })

}
