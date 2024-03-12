import Logo from "@/components/logo"

type LayoutProps = {
    children: React.ReactNode
}


export default function Layout({children}:LayoutProps) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-y-5">
        <Logo/>
        {children}
    </div>
  )
}
