import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import user from "@/models/user";
import connectDB from "@/utils/database";
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";

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

        const userExists = await user.findOne({
          [usernameType]: username,
        });
        if (!userExists) {
          throw new Error("Invalid credentials");
        }

        const bytesStoredPassword = AES.decrypt(
          userExists.password,
          process.env.SECRET_KEY
        );
        const plainStoredPassword = bytesStoredPassword.toString(Utf8);
        const isPasswordMatch = password === plainStoredPassword;

        if (!isPasswordMatch) {
          throw new Error("Invalid credentials");
        }

        const { password: securePassword, ...userWithoutPassword } =
          userExists.toObject();

        return userWithoutPassword;
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
