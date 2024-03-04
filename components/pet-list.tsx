import Image from 'next/image'


export default function PetList({pets}) {

  return (
    <ul className="bg-white border-b border-black/[0.08]">

    {pets.map(pet => (
      <li key ={pet.id}>
          <button className="flex  h-[70px] w-full cursor-pointer items-center text-base px-5 gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition">
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
