"use client"

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
    handlePetCheckout: (id:string) => void

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

const selectedPet = pets.find(pet => pet.id === activePetId)

const numberOfPets = pets.length;

  return (
    <PetsContext.Provider value={{
        pets,
        activePetId,
        handleActiveId,
        selectedPet,
        numberOfPets,
        handlePetCheckout
    }}>{children}</PetsContext.Provider>
  )
}
