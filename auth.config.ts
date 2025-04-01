import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnStandForm = nextUrl.pathname.startsWith("/stand-form");
      const isOnPitForm = nextUrl.pathname.startsWith("/pit-form");
      const isOnQualitativeForm = nextUrl.pathname.startsWith("/qualitative-form");
      const isOnRecords = nextUrl.pathname.startsWith("/records");
      const isOnData = nextUrl.pathname.startsWith("/data");
      const isOnMatches = nextUrl.pathname.startsWith("/matches");
      const isOnSimulation = nextUrl.pathname.startsWith("/simulation");
      if (
        isOnStandForm ||
        isOnPitForm ||
        isOnQualitativeForm ||
        isOnRecords ||
        isOnData ||
        isOnMatches ||
        isOnSimulation
      ) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/data", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
