export const readCookie = (fullCookieString = "", key: string): string => {
  const cookieValue = (
    fullCookieString?.split("; ")?.find((row) => row.startsWith(`${key}=`)) || ""
  ).split?.("=")?.[1];

  return cookieValue || "";
};

export const createCookie = (key: string, value: string, durationMS?: number): string => {
  let exipiresStr = "";

  if (durationMS) {
    const expires = new Date();
    expires.setTime(expires.getTime() + durationMS);
    exipiresStr = `expires=${expires.toUTCString()};`;
  }
  return `${key}=${value};${exipiresStr}path=/`;
};

export const clearCookie = (key: string): string => {
  return createCookie(key, "", -1);
};
