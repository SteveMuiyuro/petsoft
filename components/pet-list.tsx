"use client"

import { usePetsContext } from '@/lib/hooks'
import { Pet } from '@/lib/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type PetListProps = {
  pets:Pet[]
}


export default function PetList() {

  const {pets, handleActiveId, activePetId} = usePetsContext()

  return (
    <ul className="bg-white border-b border-black/[0.08]">

    {pets.map(pet => (
      <li key ={pet.id}>
          <button onClick={()=> handleActiveId(pet.id)}className={cn("flex  h-[70px] w-full cursor-pointer items-center text-base px-5 gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition",
            {
              "bg-[#EFF1F2]":activePetId === pet.id
            }
        )}>
          <Image
          src={pet.imageUrl}
          alt="Pet Image"
          width={45}
          height={45}
          className="rounded-full object-cover h-[45px] w-[45px]"

          />
              <p className="font-semibold">{pet.name}</p>
          </button>
      </li>

    ))}
    </ul>
  )
}
