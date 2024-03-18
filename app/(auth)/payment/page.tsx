"use client"
import H1 from '@/components/h1'
import { Button } from '@/components/ui/button'
import { createCheckoutSession } from '@/lib/actions'
import React, { useTransition } from 'react'

export default function page({searchParams}:{ searchParams: { [key: string]: string | string[] | undefined }}) {

  const [isPending, startTransition] = useTransition()
  return (
    <main className="flex flex-col gap-y-10 items-center">
        <H1>Make a one time payment to access petsoft</H1>

      {!searchParams.success  &&
                <Button disabled={isPending} onClick={async () => {
                  startTransition(async ()=>{
                    await createCheckoutSession()
                })}


            }>Purchase lifetime access for EURO 299 only</Button>

      }

      {searchParams.success && <p className="text-green-700 text-md">Payment succesfull, you now have lifetime access</p>}

      {searchParams.cancelled && <p className="text-red-700 text-md">Payment cancelled, try again</p>}
    </main>
  )
}
