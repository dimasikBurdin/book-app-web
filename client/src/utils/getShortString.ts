export const getShortDescription = (value: string, limit: number) => {
  if (value.length < limit) {
    return value;
  }

  return value.slice(0, limit) + "...";
};
