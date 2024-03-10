"use client"

import { addPet } from '@/lib/actions'
import { Pet } from '@/lib/types'
import React, { createContext, useState } from 'react'

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


const [pets, setPets] = useState(data);
const [activePetId, setActivePetId] = useState<string | null>(null)

const handleActiveId = (id:string) => {
    setActivePetId(id)
}

const handlePetCheckout = (id:string)=> {
  setPets(prev => prev.filter(pet => pet.id !== id))
  setActivePetId(null)

}



const handleAddPet = async(newPet:Omit<Pet, "id">) => {
  // setPets(prev => [...prev,
  //    {
  //   id: Date.now().toString(),
  //   ...newPet
  // }])
  console.log(newPet)
  await addPet(newPet)
}


const handleEditPet = (petId:string, newPet:Omit<Pet, "id">) => {
 setPets(prev => prev.map(pet => pet.id === petId ? {id:petId,...newPet}: pet))

}

const selectedPet = pets.find(pet => pet.id === activePetId)

const numberOfPets = pets.length;

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
