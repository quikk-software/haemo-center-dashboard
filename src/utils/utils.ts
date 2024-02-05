export const getObjectWithUndefinedFieldsRemoved = (obj: any) => {
  const copy = { ...obj };
  Object.keys(copy).forEach((key) =>
    copy[key] === undefined ? delete copy[key] : {},
  );
  return copy;
};
