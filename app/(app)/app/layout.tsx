import AppFooter from '@/components/app-footer'
import AppHeader from '@/components/app-header'
import BackgroundPattern from '@/components/background-pattern'
import PetsContextProvider from '@/contexts/pets-context-provider'
import SearchContextProvider from '@/contexts/search-context-provider'
import { Pet } from '@/lib/types'
import prisma from '@/lib/db'

import React from 'react'

export default async function Layout({children}:{
    children:React.ReactNode
}) {

    const pets = await prisma.pet.findMany()

  return (
      <>
         <BackgroundPattern/>
         <div className=" min-h-screen flex flex-col max-w-[1050px] m-auto px-4">
         <AppHeader/>
         <SearchContextProvider>
            <PetsContextProvider data={pets}>
                {children}
            </PetsContextProvider>
         </SearchContextProvider>
         <AppFooter/>

         </div>
      </>
  )
}
