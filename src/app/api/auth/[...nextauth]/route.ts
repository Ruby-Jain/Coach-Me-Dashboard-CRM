import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Demo Account",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "demo@coachme.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials?.email || "demo@coachme.com";
        const name = email.split('@')[0];
        
        let user = await prisma.user.findUnique({
          where: { email }
        });
        
        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              name: name.charAt(0).toUpperCase() + name.slice(1),
              image: "/profile.jpg",
            }
          });
        }
        
        return user;
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session && session.user) {
        (session.user as any).id = token.id as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_demo_purposes_only",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

