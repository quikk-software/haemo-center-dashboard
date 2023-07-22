import logger from "@/core/logger";
import { hasPageBeenMounted } from "@/core/utils";

export enum LocalStorageKeys {
  accessToken,
  refreshToken,
}

const handlePageHasNotBeenMounted = (key: LocalStorageKeys) =>
  logger.warn(
    `Page has not been mounted. Cannot access ${key} in localStorage.`,
  );

export function setLocalStorageItem<T>(key: LocalStorageKeys, value: T): void {
  if (hasPageBeenMounted()) {
    localStorage.setItem(JSON.stringify(key), JSON.stringify(value));
  } else {
    handlePageHasNotBeenMounted(key);
  }
}

export function getLocalStorageItem<T, V>(
  key: LocalStorageKeys,
  fallbackValue: V,
) {
  if (hasPageBeenMounted()) {
    const item = localStorage.getItem(JSON.stringify(key));

    if (item !== null) {
      return JSON.parse(item) as T;
    }
  } else {
    handlePageHasNotBeenMounted(key);
  }
  return fallbackValue;
}
