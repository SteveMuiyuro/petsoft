"use client"

import { addPet, editPet } from '@/lib/actions'
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
    handlePetCheckout: (id:string) => void,
    handleAddPet:(newPet:Omit<Pet, "id">) => void,
    handleEditPet:(petId:string, newPet:Omit<Pet, "id">) => void

}



export default function PetsContextProvider({children, data}:PetsContextProviderProps) {

const [optimisticPets, setOptimisticPets ] = useOptimistic(data)

const [activePetId, setActivePetId] = useState<string | null>(null)

const handleActiveId = (id:string) => {
    setActivePetId(id)
}

const handlePetCheckout = (id:string)=> {
  setPets(prev => prev.filter(pet => pet.id !== id))
  setActivePetId(null)

}



const handleAddPet = async(newPet:Omit<Pet, "id">) => {

  await Sleep(2000)
            const error = await addPet(formData)
            if(error) {
                toast.warning(error.message)
            }
  // setPets(prev => [...prev,
  //    {
  //   id: Date.now().toString(),
  //   ...newPet
  // }])

  await addPet(newPet)
}


const handleEditPet = async (petId:string, newPet:Omit<Pet, "id">) => {

  await Sleep(2000)
            const error = await editPet(selectedPet?.id,formData)
            if(error) {
                toast.warning(error.message)
            }
//  setPets(prev => prev.map(pet => pet.id === petId ? {id:petId,...newPet}: pet))

}

const selectedPet = optimisticPets.find(pet => pet.id === activePetId)

const numberOfPets = optimisticPets.length;

  return (
    <PetsContext.Provider value={{
        pets,
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
