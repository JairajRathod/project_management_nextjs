import connectDB from "@/libs/connectDB";
import { User } from "@/models/user.model";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          fullname: user.name,
          email: user.email,
          password: null, // because google login
          role: "MEMBER",
          avatar: user.image,
          isVerified: true,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      return true;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
});

export { handler as GET, handler as POST };
