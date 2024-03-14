import AppFooter from '@/components/app-footer'
import AppHeader from '@/components/app-header'
import BackgroundPattern from '@/components/background-pattern'
import PetsContextProvider from '@/contexts/pets-context-provider'
import SearchContextProvider from '@/contexts/search-context-provider'
import prisma from '@/lib/db'

import React from 'react'
import { Toaster } from '@/components/ui/sonner'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Layout({children}:{
    children:React.ReactNode
}) {

    const session = await auth()
    if(!session?.user) {
        redirect("/signin")
    }

    const pets = await prisma.pet.findMany({
        where:{
            userId:session.user.id
        }
    })

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
        <Toaster position="top-right"/>
         </div>
      </>
  )
}
