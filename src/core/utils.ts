import logger from "@/core/logger";

export const executeAwaitableFunction = async (
  fn: (...args: any[]) => any | Promise<any>,
) => {
  if (fn.constructor.name == "AsyncFunction") {
    return await fn();
  }
  return fn();
};

// https://developer.school/snippets/react/localstorage-is-not-defined-nextjs
export const hasPageBeenMounted = () => typeof window !== "undefined";

export const loadEnvVariable = (key: string) => {
  if (!hasPageBeenMounted()) {
    const value = process.env[key];

    if (value === undefined) {
      logger.error(
        `Cannot access environment variable ${key}. Will be using empty string as value.`,
      );
    } else {
      logger.debug(`Load <${key}: ${value}> from .env.`);
    }

    return value ?? "";
  }
  logger.warn(
    `Cannot access .env in DOM. Will be using empty string as value for ${key}.`,
  );
  return "";
};
