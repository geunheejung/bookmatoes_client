const joinArrToStr = (str: string | string[]): string => {
  if (!Array.isArray(str)) return str;
  const result = str.join(', ').trimRight();
  return result;
};

export default joinArrToStr;