export const auth = {
  getCookie: (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  },

  setCookie: (name: string, value: string, maxAge?: number) => {
    let cookie = `${name}=${value}; path=/`;
    if (maxAge) {
      cookie += `; max-age=${maxAge}`;
    }
    document.cookie = cookie;
  },

  removeCookie: (name: string) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  },

  isAuthenticated: (): boolean => {
    return auth.getCookie('isAuthenticated') === 'true';
  },

  setAuthCookie: (expiresIn: number) => {
    auth.setCookie('isAuthenticated', 'true', expiresIn);
  },

  handleLogout: async (logoutMutation: () => Promise<any>) => {
    try {
      await logoutMutation();
      auth.removeCookie('isAuthenticated');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },
};
