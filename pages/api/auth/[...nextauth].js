import NextAuth from 'next-auth';
import User from "../../../models/UserDetails";
import db from "../../../utils/db";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';

//implement sign in function and configure NextAuth

export default NextAuth({
    session: {
        strategy: 'jwt', //authentication strategy
    },
    callbacks: {
        //set user info from database into token
    async jwt({token, user}) {
        if(user?._id) token._id = user._id;
        if(user?.isAdmin) token.isAdmin = user.isAdmin;
        return token;
        },
    async session({session, token}) {
        //set token into session
        if(token?._id) session.user._id = token._id;
        if(token?.isAdmin) session.user.isAdmin = token.isAdmin;
        return session;
    },
   },
   providers: [
    //email/password
    CredentialsProvider({
        async authorize(credentials) {
            await db.connect();
            const user = await User.findOne({
                email: credentials.email,
            });
            await db.disconnect();
            if (user && bcryptjs.compareSync(credentials.password, user.password)) {
                //confirm password
                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    image: 'f',
                    isAdmin: user.isAdmin,
                };
            }
            throw new Error('Invalid email or password');
        },
    }),
   ],
    // secret: process.env.NEXTAUTH_SECRET,
});






