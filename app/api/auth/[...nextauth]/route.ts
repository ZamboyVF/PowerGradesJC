import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const allowedEmails = (process.env.ALLOWED_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const email = user.email?.toLowerCase() ?? ""
      return allowedEmails.includes(email)
    },
    async session({ session }) {
      return session
    },
  },
  pages: {
    signIn: "/studio/login",
    error: "/studio/login",
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }