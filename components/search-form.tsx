"use client"

import { useSearchContext } from '@/lib/hooks'
import React from 'react'

export default function SearchForm() {

  const {searchText, handleSearchText} = useSearchContext()

  return (
    <form className="h-full w-full">
        <input
        className="h-full w-full bg-white/20 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50"
        type="search"
        placeholder='Search pets'
        value={searchText}
        onChange={e => handleSearchText(e.target.value)}
        />
    </form>
  )
}
