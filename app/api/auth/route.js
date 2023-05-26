import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";



const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  async session({ session }) {
    const sessionUser = await User.findOne({
      email: session.user.email,
    });

    session.user.id = session._id.toString();

    return session;
  },
  async signIn({ profile }) {
    try {
      await connectToDB();

      //user already exists
      const userExists = await User.findOne({
        email: profile.email,
      });
      //no user
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowecase(),
          image: profile.image,
        });
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
