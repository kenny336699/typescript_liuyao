export const findSelfResponse = (
  number: number
): { self: number; resp: number } => {
  // Map the input number directly to its corresponding 'self' value
  const selfMap: { [key: number]: number } = {
    1: 6,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 4,
    8: 3,
  };

  const self = selfMap[number] ?? 6; // Default to 6 if number not found
  const resp = self >= 4 ? self - 3 : self + 3;

  return { self, resp };
};
