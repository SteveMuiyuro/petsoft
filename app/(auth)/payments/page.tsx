import H1 from '@/components/h1'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function page() {
  return (
    <main className="flex flex-col gap-y-10 items-center">
        <H1>Make a one time payment to access petsoft</H1>
        <Button>Purchase lifetime access for $299 only</Button>
    </main>
  )
}
