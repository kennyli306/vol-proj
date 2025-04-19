import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (!profile?.email) {
                throw new Error("No profile");
            }

            try {
                await prisma.user.upsert({
                    where: {
                        email: profile.email,
                    },
                    create: {
                        email: profile.email,
                        name: profile.name,
                    },
                    update: {
                        name: profile.name,
                    },
                })
            }
            catch (error) {
                console.error("Error upserting user:", error);
            }

            return true;
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };