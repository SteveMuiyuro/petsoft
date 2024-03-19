import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


export default function Page() {
  return (
    <main className="bg-[#67da93] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">

      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="Preview of Petsoft"
        width={519}
        height={472}
      />

      <div>
        <Logo/>
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">Manage your <span className="font-extrabold">pet daycare</span> with ease</h1>
        <p className="text-2xl font-medium max-w-[600px]">Use PetCare to easily keep track of pets under your care. Get lifetime access for €299.</p>
        <div className="mt-10 space-x-5">
          <Button asChild>
            <Link href="/signup">
               Get Started
            </Link>
            </Button>
          <Button asChild variant="secondary">
            <Link href="/signin">
              Log in
            </Link>
            </Button>
        </div>
      </div>

    </main>
  );
}
