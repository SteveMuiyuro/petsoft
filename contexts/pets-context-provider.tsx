"use client"

import { addPet, deletePet, editPet } from '@/lib/actions'
import { PetEssentials } from '@/lib/types'
import { Pet } from '@prisma/client'
import React, { createContext, useOptimistic, useState } from 'react'
import { toast } from 'sonner'
export const PetsContext = createContext<PetsContextProps | null>(null)

type PetsContextProviderProps = {
    data:Pet[]
    children:React.ReactNode
}

type PetsContextProps = {
    pets:Pet[],
    activePetId:string | null,
    handleActiveId: (id:string) => void,
    selectedPet:Pet | undefined,
    numberOfPets:number,
    handlePetCheckout: (id:string) => Promise <void>,
    handleAddPet:(newPet:PetEssentials) => Promise <void>,
    handleEditPet:(petId:Pet["id"], newPet:PetEssentials) => Promise <void>

}



export default function PetsContextProvider({children, data}:PetsContextProviderProps) {

const [optimisticPets, setOptimisticPets ] = useOptimistic(data, (state, {action, payload}) => {
  switch(action) {
    case "add":
      return [...state, {...payload, id: Math.random().toString()}]
    case "edit":
      return state.map(pet => {
        if(pet.id === payload.id) {
          return {...pet, ...payload.newPet};
        }
        return pet;
      });
    case "delete" :
      return state.filter(pet => pet.id !== payload);
    default:
      return state;

  }
})

const [activePetId, setActivePetId] = useState<string | null>(null)

const handleActiveId = (id:string) => {
    setActivePetId(id)
}

const handlePetCheckout = async (id:Pet["id"])=> {
  setOptimisticPets({action:"delete", payload:id})
  // setPets(prev => prev.filter(pet => pet.id !== id))
const error = await deletePet(id)
if(error) {
  toast.warning(error.message)
}
  setActivePetId(null)

}



const handleAddPet = async(newPet:PetEssentials) => {
  setOptimisticPets({action:"add", payload:newPet})
            const error = await addPet(newPet)
            if(error) {
                toast.warning(error.message)
            }
            return;
  // setPets(prev => [...prev,
  //    {
  //   id: Date.now().toString(),
  //   ...newPet
  // }])

}


const handleEditPet = async (petId:Pet["id"], newPet:PetEssentials) => {
  setOptimisticPets({action:"edit", payload:{
    id: petId, newPet
  }})

            const error = await editPet(petId,newPet)
            if(error) {
                toast.warning(error.message)
            }
          return;
//  setPets(prev => prev.map(pet => pet.id === petId ? {id:petId,...newPet}: pet))

}

const selectedPet = optimisticPets.find(pet => pet.id === activePetId)

const numberOfPets = optimisticPets.length;

  return (
    <PetsContext.Provider value={{
        pets:optimisticPets,
        activePetId,
        handleActiveId,
        selectedPet,
        numberOfPets,
        handlePetCheckout,
        handleAddPet,
        handleEditPet
    }}>{children}</PetsContext.Provider>
  )
}
