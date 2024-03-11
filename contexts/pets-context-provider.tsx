"use client"

import { addPet, deletePet, editPet } from '@/lib/actions'
import { Sleep } from '@/lib/sleep'
import { Pet } from '@/lib/types'
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
    handleAddPet:(newPet:Omit<Pet, "id">) => Promise <void>,
    handleEditPet:(petId:string, newPet:Omit<Pet, "id">) => Promise <void>

}



export default function PetsContextProvider({children, data}:PetsContextProviderProps) {

const [optimisticPets, setOptimisticPets ] = useOptimistic(data, (state, newPetData) => {
  return [...state, {
    ...newPetData,
    id: Math.random().toString()
  }]
})

const [activePetId, setActivePetId] = useState<string | null>(null)

const handleActiveId = (id:string) => {
    setActivePetId(id)
}

const handlePetCheckout = async (id:string)=> {
  // setPets(prev => prev.filter(pet => pet.id !== id))
await deletePet(id)

  setActivePetId(null)

}



const handleAddPet = async(newPet:Omit<Pet, "id">) => {
  setOptimisticPets(newPet)
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


const handleEditPet = async (petId:string, newPet:Omit<Pet, "id">) => {

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
