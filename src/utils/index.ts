export const getQueryStringFromObject = (obj: { [key: string]: any }) => {
  if (!Object.keys(obj).length) return "";
  return "?" + new URLSearchParams(obj).toString();
};
