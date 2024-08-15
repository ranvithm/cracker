import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import google from "next-auth/providers/google";

import { prisma } from "@/src/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session }) {
      return session;
    },
    jwt({ token }) {
      return token;
    },
    async authorized({ auth }) {
      return !!auth;
    },
  },
  trustHost: true,
  providers: [
    google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
});
