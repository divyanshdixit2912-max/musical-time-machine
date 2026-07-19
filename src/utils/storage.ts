// LocalStorage utility functions

const STORAGE_PREFIX = 'melodyverse_';

export const storage = {
  setItem: (key: string, value: any) => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, serialized);
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  getItem: (key: string, defaultValue: any = null) => {
    try {
      const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage error:', error);
      return defaultValue;
    }
  },

  removeItem: (key: string) => {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  clear: () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
};
