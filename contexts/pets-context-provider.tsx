"use client"

import React, { createContext, useState } from 'react'

export const PetsContext = createContext(null)

export default function PetsContextProvider({children, data}) {


const [pets, setPets] = useState(data);
const [activePetId, setActivePetId] = useState()

  return (
    <PetsContext.Provider value={{
        pets,
        activePetId
    }}>{children}</PetsContext.Provider>
  )
}
