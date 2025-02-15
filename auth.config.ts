import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnStandForm = nextUrl.pathname.startsWith('/stand-form');
      const isOnPitForm = nextUrl.pathname.startsWith('/pit-form');
      const isOnRecords = nextUrl.pathname.startsWith('/records');
      const isOnData = nextUrl.pathname.startsWith('/data')
      if (isOnStandForm || isOnPitForm || isOnRecords || isOnData) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/data', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;