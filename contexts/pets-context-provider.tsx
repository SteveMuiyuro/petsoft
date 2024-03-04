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
    activePetId:string | null

}

export default function PetsContextProvider({children, data}:PetsContextProviderProps) {


const [pets, setPets] = useState(data);
const [activePetId, setActivePetId] = useState(null)

  return (
    <PetsContext.Provider value={{
        pets,
        activePetId
    }}>{children}</PetsContext.Provider>
  )
}
