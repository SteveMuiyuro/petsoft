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
    selectedPet:Pet | undefined

}

export default function PetsContextProvider({children, data}:PetsContextProviderProps) {


const [pets, setPets] = useState(data);
const [activePetId, setActivePetId] = useState<string | null>(null)

const handleActiveId = (id:string) => {
    setActivePetId(id)
}

const selectedPet = pets.find(pet => pet.id === activePetId)

  return (
    <PetsContext.Provider value={{
        pets,
        activePetId,
        handleActiveId,
        selectedPet
    }}>{children}</PetsContext.Provider>
  )
}
