export const pick = <T, K extends keyof T>(obj: T, keys: K[]) => {
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc = { ...acc, [key]: obj[key] };
    }
    return acc;
  }, {});
};
