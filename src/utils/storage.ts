export const storage = {
  keys: {
    rememberMe: 'rememberMe' as const,
    lastRefreshTime: 'lastRefreshTime' as const,
  },

  getRememberMe: (): boolean => {
    try {
      return localStorage.getItem(storage.keys.rememberMe) === 'true';
    } catch {
      return false;
    }
  },

  setRememberMe: (value: boolean): void => {
    try {
      localStorage.setItem(storage.keys.rememberMe, String(value));
    } catch (error) {
      console.error('Failed to save rememberMe to localStorage:', error);
    }
  },

  clearRememberMe: (): void => {
    try {
      localStorage.removeItem(storage.keys.rememberMe);
    } catch (error) {
      console.error('Failed to clear rememberMe from localStorage:', error);
    }
  },

  getLastRefreshTime: () => {
    return Number(localStorage.getItem(storage.keys.lastRefreshTime)) || null;
  },

  setLastRefreshTime: (time: number) => {
    localStorage.setItem(storage.keys.lastRefreshTime, String(time));
  },

  clearLastRefreshTime: () => {
    localStorage.removeItem(storage.keys.lastRefreshTime);
  },

  clearAll: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },

  isTokenExpiring: (expiresIn: number): boolean => {
    const lastRefresh = storage.getLastRefreshTime();
    if (!lastRefresh) return true;

    const now = Date.now();
    const tokenExpiration = lastRefresh + expiresIn * 1000; // expiresIn은 초 단위
    const timeUntilExpiration = tokenExpiration - now;

    // 토큰 만료 10분 전에 갱신
    return timeUntilExpiration < 10 * 60 * 1000;
  },

  // 일반적인 get/set 메서드 추가
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to save ${key} to localStorage:`, error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove ${key} from localStorage:`, error);
    }
  },
};
