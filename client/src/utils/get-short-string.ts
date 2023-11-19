export const getShortString = (value: string, limit: number): string => {
  if (!value.trim()) {
    return "";
  }

  if (value.length < limit) {
    return value;
  }

  return `${value.slice(0, limit).trim()}...`;
};
