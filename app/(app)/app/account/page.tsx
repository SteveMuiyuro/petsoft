import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import SignOutButton from "@/components/sign-out-button";
import { checkAuth } from "@/lib/server-utils";


export default async function Page() {
  const session = await checkAuth()
  return (
    <main>
      <H1 className="my-8 text-white">My Account</H1>
      <ContentBlock className="h-[500px] flex items-center justify-center flex-col gap-y-5">
        <p>You are logged in as {session.user.email}</p>
        <SignOutButton/>
      </ContentBlock>
    </main>
  )
}
