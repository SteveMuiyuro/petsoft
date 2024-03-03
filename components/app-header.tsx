"use client"

import Link from 'next/link'
import Logo from './logo'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils';

export default function AppHeader() {

  const activePathname = usePathname();


    const routes = [
        {
            label: "Dashboard",
            path: "/app/dashboard"

        },

        {
            label: "Account",
            path:"/app/account"
        }
    ]
  return (
    <header className="flex justify-between items-center border-b border-white/10">
        <Logo/>

        <nav>
            <ul className="flex gap-2 text-xs">
                {
                    routes.map(route => (<li key={route.path}>
                      <Link className={cn(`text-white/70  rounded-sm px-2 py-1 hover:text-white focus:text-white transition`, {
                        "bg-black/10 text-white": activePathname === route.path
                      })} href={route.path}>{route.label}</Link>
                    </li>))
                }

            </ul>
        </nav>

    </header>
  )
}
