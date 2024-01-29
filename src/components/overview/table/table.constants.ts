export const DEFAULT_QUERY = "";
export const DEFAULT_PAGE_SIZE = 1000;
export const DEFAULT_PAGE_NUMBER = 0;

const PAGE_SIZE_MULTIPLIER = [1, 2.5, 5];
export const PAGE_SIZE_OPTIONS = PAGE_SIZE_MULTIPLIER.map(
  (n) => n * DEFAULT_PAGE_SIZE,
);
