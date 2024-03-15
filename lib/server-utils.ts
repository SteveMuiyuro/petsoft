import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function checkAuth(){
    const session = await auth()
    if(!session?.user) {
        redirect("/signin")
    }

    return session;
}
