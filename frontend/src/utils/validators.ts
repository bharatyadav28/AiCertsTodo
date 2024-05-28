export const isThreeChars = (str: String) => {
  return str.trim().length >= 3;
};

export const isSevenChars = (str: String) => {
  return str.trim().length >= 7;
};

export const isNotEmpty = (str: Date) => {
  if (str) {
    return true;
  }
  return false;
};
