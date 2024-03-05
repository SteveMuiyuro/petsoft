"use client"

import { createContext, useState } from "react"


type searchContextProviderProps = {
    children:React.ReactNode
}

type contextProps = {
    searchText:string;
    handleSearchText: (text:string) => void;
}

export const searchContext = createContext<contextProps | null>(null)

export default function SearchContextProvider({children}:searchContextProviderProps) {

  const [searchText, setSearchText] = useState("")

    const handleSearchText = (text:string)=>{
            setSearchText(text)
    }

  return (
    <searchContext.Provider value={{
            searchText,
            handleSearchText

    }}>{children}</searchContext.Provider>
  )
}
