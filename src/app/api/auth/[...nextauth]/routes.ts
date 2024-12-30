import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || 'Iv1.4ed9814a804a3e4b',
      clientSecret:
        process.env.GITHUB_SECRET || 'a2d69a9491702918da1ee0c760e128526f625f8c',
    }),
  ],
};

export default NextAuth(authOptions);
