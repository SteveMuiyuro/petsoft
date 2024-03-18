import NextAuth, { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { authSchema } from "./validation";

const config = {
    pages:{
        signIn:"/signin"
    },
    providers:[
        credentials({
         async authorize(credentials) {

            const validatedFormData = authSchema.safeParse(credentials)
            if(!validatedFormData.success){
                return null;
            }
            const {email, password} = validatedFormData.data;

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
               if(isLoggedIn && isTryingToAccessApp && !auth?.user.hasAccess) {
                return Response.redirect(new URL("/payment", request.nextUrl))
               }

               if(isLoggedIn && isTryingToAccessApp && auth?.user.hasAccess) {
                return true
               }

               if(isLoggedIn && !isTryingToAccessApp) {
                if((request.nextUrl.pathname.includes("/signin") || request.nextUrl.pathname.includes("/signup")) && !auth?.user.hasAccess){
                    return Response.redirect(new URL("/payment", request.nextUrl))
                }
                return true;
               }

               if(!isLoggedIn && !isTryingToAccessApp) {
                return true
               }

               return false
        },

        jwt:({token, user}) => {
            if(user) {
                token.userId = user.id
                token.hasAccess = user.hasAccess
            }

            return token;
        },

        session:({token, session}) => {
            if(session.user)
                session.user.id = token.userId;

            return session
        }

    },



} satisfies NextAuthConfig;
export const {auth, signIn, signOut, handlers:{GET, POST}} = NextAuth(config)
