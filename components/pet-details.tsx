"use client"
import { usePetsContext } from '@/lib/hooks'
import Image from 'next/image'
import React, { useTransition } from 'react'
import AppButton from './app-button'
import { deletePet } from '@/lib/actions'
import { Pet } from '@prisma/client'

export default function PetDetails() {
  const {selectedPet} = usePetsContext()


  return (
    <section className=" flex flex-col h-full w-full">

      {!selectedPet ?
                <DefaultView />
                :
                <>
                  <TobBar pet={selectedPet}/>
                  <OtherInfo pet={selectedPet}/>
                  <Notes pet={selectedPet}/>
                </>
      }
    </section>
  )
}

type petProps = {
  pet:Pet
}

function TobBar ({pet}:petProps){
  const {handlePetCheckout} = usePetsContext()


  return(
    <div className="flex items-center bg-white px-8 py-5 border-b border-light]">
    <Image
    src={pet?.imageUrl}
    alt="selected pet image"
    height={75}
    width={75}
    className="h-[75px] w-[75px] rounded-full object-cover"

    />

    <h2 className="text-3xl font-semibold leading-7 ml-5">{pet.name}</h2>

      <div className="ml-auto space-x-2">
          <AppButton actionType="edit">Edit</AppButton>
          <AppButton actionType="checkout" onClick={async()=>
            await  handlePetCheckout(pet.id)

           }>Checkout</AppButton>
      </div>

   </div>
  )
}

function OtherInfo({pet}:petProps){
  return(

    <div className="flex justify-around py-10 px-5 text-center">
    <div>
      <h3 className="text-[13px] font-medium uppercase text-zinc-700">Owner name</h3>
      <p className="mt-1 text-lg text-zinc-800">{pet.ownerName}</p>

    </div>
    <div>
      <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
      <p className="mt-1 text-lg text-zinc-800">{pet.age}</p>
    </div>


  </div>
  )
}


function Notes({pet}:petProps){

return(
 <section className="bg-white px-7 py-5 rounded-md mb-9 flex-1 mx-8 border border-light">
   {pet.notes}
  </section>
)
}


function DefaultView(){
  return(
    <p className=" h-full text-2xl font-semibold flex justify-center items-center">No items selected</p>
  )
}
