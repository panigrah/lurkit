import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from './prisma';
import { compare, hash } from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: 'signup',
      credentials: {
        username: { label: "Username" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if(!credentials?.username || !credentials?.password) {
          return null;
        }
        //check if user exists.
        const account = await prisma.user.findUnique({
          where: {
            email: credentials.username
          }
        })
        if(account) {
          throw ({message: 'Account with username/email already exists'})
        } else {
          const user = await prisma.user.create({
            data: {
              email: credentials.username,
              password: await hash(credentials.password, 12)
            }
          })
          return {id: user.id, name: user.email, email: user.email}
        }
      }
    }),
    CredentialsProvider({
      credentials: {
        username: { label: "Username" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if(!credentials?.username || !credentials?.password) {
          throw ({message: 'Invalid username or password. Please retry.'})
        }
        const user = await prisma.user.findUnique({ 
          where: { 
            email: credentials.username
          }
        })
  
        if (user) {
          //console.log('comparing ****', credentials.password, user.password)
          const match = await compare(credentials.password, user.password);
          if(match) {
          // Any object returned will be saved in `user` property of the JWT
            return {id: user.id, name: user.email, email: user.email}
          } else {
            throw ({message: 'Incorrect username or password. Please retry.'})
          }
        } else {
          throw ({message: 'Incorrect username or password. Please retry.'})
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
};