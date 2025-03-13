
// Get a specific cookie value by name
export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

// Set a cookie
export const setCookie = (name: string, value: string, days?: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
};

// Delete a cookie
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/`;
};

// Check if the user is logged in (based on the presence of a specific cookie, e.g., "authToken")
export const isUserLoggedIn = (): boolean => {
  return getCookie("username") !== null;
};
