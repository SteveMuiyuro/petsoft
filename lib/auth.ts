import NextAuth, { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"

const config = {
    pages:{
        signIn:"/signin"
    },
    providers:[
        credentials({
         async authorize(credentials) {
            const {email, password} = credentials;

            const user = await prisma?.user.findUnique({
                where: {
                    email
                }
            })

            if(!user){
                console.log("user not found")
                return null;
            }

            const passwordMatch = await bcrypt.compare(password, user.hashedPassword)

            if(!passwordMatch){
                console.log("Invalid credentials")
                return null;
            }

            return user;

         }
        })
    ],
    callbacks:{
        authorized:({auth, request}) => {

            const isLoggedIn = auth?.user
            const isTryingToAccessApp = request.nextUrl.pathname.includes("/app")

               if(!isLoggedIn && isTryingToAccessApp) {
                return false
               }

               if(isLoggedIn && isTryingToAccessApp) {
                return true
               }

               if(!isTryingToAccessApp) {
                return true
               }

        }
    },

} satisfies NextAuthConfig;
export const {auth, signIn} = NextAuth(config)
