import Authentication from "@/components/authentication";
import H1 from "@/components/h1";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <H1 className="text-center mb-5">Log In</H1>
      <Authentication/>

      <p className="mt-6 text-sm text-zinc-500">
        No account yet?
        <Link href="/signup" className="font-medium">
            Sign Up
        </Link>
      </p>
    </main>
  )
}
