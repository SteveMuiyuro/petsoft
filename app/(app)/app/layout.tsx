import AppFooter from '@/components/app-footer'
import AppHeader from '@/components/app-header'
import BackgroundPattern from '@/components/background-pattern'
import PetsContextProvider from '@/contexts/pets-context-provider'
import { Pet } from '@/lib/types'
import React from 'react'

export default async function Layout({children}:{
    children:React.ReactNode
}) {

    const res = await fetch("https://bytegrad.com/course-assets/projects/petsoft/api/pets")
    if(!res.ok){
         throw new Error("Failed to fetch data, something went wrong")
    }
    const data:Pet[] = await res.json()


  return (
      <>
         <BackgroundPattern/>
         <div className=" min-h-screen flex flex-col max-w-[1050px] m-auto px-4">
         <AppHeader/>
         <PetsContextProvider data={data}>
             {children}
         </PetsContextProvider>
         <AppFooter/>

         </div>
      </>
  )
}
