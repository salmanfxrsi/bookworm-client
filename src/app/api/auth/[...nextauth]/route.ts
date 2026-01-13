import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface IUserSession {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  photo?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );

        if (!res.ok) return null;

        const user = await res.json();

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          photo: user.photo ?? undefined,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.photo = user.photo;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        role: token.role as "admin" | "user",
        photo: token.photo as string | undefined,
      };
      return session;
    },
  },
  pages: { signIn: "/auth/login" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
