import NextAuth, { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials";


const config = {
    pages:{
        signIn:"/signin"
    },
    providers:[
        credentials({
         async authorize(credentials) {
            const {email, password} = credentials;

            const user = prisma?.user.findUnique({
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
        authorized:({request}) => {

            const isTryingToAccessApp = request.nextUrl.pathname.includes("/app")

            if(isTryingToAccessApp){
                return false;
            }
            else{
                return true;
            }
        }
    },

} satisfies NextAuthConfig;
export const {auth, signIn} = NextAuth(config)
