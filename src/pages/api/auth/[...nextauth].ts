import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import logger from "@/core/logger";
import { loadEnvVariable } from "@/core/utils";

// TODO: Add refreshAccessToken() and jwt() from https://gist.github.com/degitgitagitya/db5c4385fc549f317eac64d8e5702f74

logger.debug("[...nextauth]");

export default NextAuth({
  providers: [
    KeycloakProvider({
      clientId: loadEnvVariable("KEYCLOAK_CLIENT_ID"),
      clientSecret: loadEnvVariable("KEYCLOAK_SECRET"),
      issuer: loadEnvVariable("KEYCLOAK_BASE_URL"),
      version: "2.0", // Double check your keycloak version
    }),
  ],
  session: { strategy: "jwt" },
  secret: loadEnvVariable("SECRET"),
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      logger.debug("signIn", { user, account });
      if (account && user) {
        return true;
      } else {
        // TODO : Add unauthorized page
        logger.warn("ADD UNAUTHORIZED PAGE");
        return "/unauthorized";
      }
    },
    async redirect({ url, baseUrl }) {
      logger.debug("redirect", { url, baseUrl });

      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, token }) {
      logger.debug("session", { session, token });

      if (token) {
        // @ts-ignore
        session.user = token.user;
        // @ts-ignore
        session.error = token.error;
        // @ts-ignore
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});
