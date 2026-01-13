// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import "next/server";

// 1️⃣ Extend NextAuth Session & User
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "admin" | "user";
      photo?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: "admin" | "user";
    photo?: string;
  }
}

// 2️⃣ Extend NextAuth JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "admin" | "user";
    photo?: string;
  }
}

// 3️⃣ Extend NextRequest for middleware
export type AuthToken = {
  id: string;
  name?: string;
  email?: string;
  role: "admin" | "user";
  photo?: string;
  [key: string]: any;
};

declare module "next/server" {
  interface NextRequest {
    nextauth?: {
      token?: AuthToken;
    };
  }
}
