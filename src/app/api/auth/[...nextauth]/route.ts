import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-client-secret",
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
        
        // Return a mock user profile instead of querying database
        const user = {
          id: "demo-user-id-" + name.toLowerCase(),
          email,
          name: name.charAt(0).toUpperCase() + name.slice(1),
          image: "/profile.jpg",
        };
        
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
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_demo_purposes_only_123456789",
};

const handler = (req: Request, ctx: any) => {
  // Inject env variables dynamically at request time
  if (!process.env.NEXTAUTH_SECRET) {
    process.env.NEXTAUTH_SECRET = "fallback_secret_for_demo_purposes_only_123456789";
  }

  if (!process.env.NEXTAUTH_URL) {
    const host = req.headers.get("host");
    const proto = req.headers.get("x-forwarded-proto") || "https";
    if (host) {
      process.env.NEXTAUTH_URL = `${proto}://${host}`;
    }
  }

  return NextAuth(authOptions)(req, ctx);
};

export { handler as GET, handler as POST };

