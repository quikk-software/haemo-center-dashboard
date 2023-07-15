import { withAuth } from "next-auth/middleware";
import routes from "@/routes";
import logger from "@/core/logger";

const middleware = withAuth({
  callbacks: {
    async authorized({ req, token }) {
      const page = routes.find((p) => p.pathname === req.nextUrl.pathname);

      if (page) {
        logger.debug(
          `Page <${page.title} (pathname: ${page.pathname})> found. User has access to page by default.`,
        );

        // const roles = (token as any)['resource_access']['haemo']['roles'];
        logger.debug({ token });

        // TODO: Logic for accessing page based on user
        return true;
      }
      // If no page is found, user can access whatever was requested
      return true;
    },
  },
});

export const config = {};

export default middleware;
