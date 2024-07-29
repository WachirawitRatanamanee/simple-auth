import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import user from "@/models/user";
import connectDB from "@/utils/database";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        await connectDB();
        const { username, password, usernameType } = credentials;

        // decrypted and compared with the hashed password in the database

        const userExists = await user.findOne({
          [usernameType]: username,
          password: password,
        });
        if (!userExists) {
          throw new Error("Invalid credentials");
        }
        return userExists;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
});
