// import { NextAuthConfig } from "next-auth";
 
// export const authConfig = {
//   pages: {
//     signIn: '/',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnStandForm = nextUrl.pathname.startsWith('/stand-form')
//       if (isOnStandForm) {
//         if (isLoggedIn) return true;
//         return false;
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/dashboard', nextUrl));
//       }
//     }
//   },
//   providers: [],
// } satisfies NextAuthConfig;