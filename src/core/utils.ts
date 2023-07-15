import logger from "@/core/logger";

export const executeAwaitableFunction = async (
  fn: (...args: any[]) => any | Promise<any>,
) => {
  if (fn.constructor.name == "AsyncFunction") {
    return await fn();
  }
  return fn();
};

export const loadEnvVariable = (key: string) => {
  if (typeof window === "undefined") {
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
    `Cannot access .env in DOM. Will be using empty string as value.`,
  );
  return "";
};
