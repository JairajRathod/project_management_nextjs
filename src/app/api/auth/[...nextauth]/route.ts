import connectDB from "@/libs/connectDB";
import { User } from "@/models/user.model";
import axios from "axios";
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
    async signIn({ user, account }) {
      // connect database
      await connectDB();

      // checking that user already exist or not
      const existingUser = await User.findOne({ email: user?.email });

      if (!existingUser || account?.provider === "google") {
        // Send a POST request
        const response = await axios({
          method: "post",
          url: "http://localhost:3000/api/user",
          data: {
            name: user?.name,
            email: user?.email,
            image: user?.image,
          },
        });

        // if (!response?.success) {
        //   console.log(response);
        //   return false;
        // }
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
