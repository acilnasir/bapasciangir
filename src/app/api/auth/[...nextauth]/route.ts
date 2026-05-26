import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../../lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        // VALIDASI
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password wajib diisi");
        }

        // CARI ADMIN
        const admin = await prisma.admin.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // EMAIL TIDAK ADA
        if (!admin) {
          throw new Error("Email tidak ditemukan");
        }

        // CEK PASSWORD
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          admin.password,
        );

        // PASSWORD SALAH
        if (!isValidPassword) {
          throw new Error("Password salah");
        }

        // RETURN USER
        return {
          id: admin.id.toString(),
          name: admin.name,
          email: admin.email,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      // SIMPAN ID KE TOKEN
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      // MASUKKAN ID KE SESSION
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
