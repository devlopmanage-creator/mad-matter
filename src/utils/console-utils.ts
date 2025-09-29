// Console utilities for better debugging
export class ConsoleUtils {
  static isDev = import.meta.env.DEV;

  static log(...args: any[]) {
    if (this.isDev) {
      console.log('[FAM]', ...args);
    }
  }

  static warn(...args: any[]) {
    if (this.isDev) {
      console.warn('[FAM Warning]', ...args);
    }
  }

  static error(...args: any[]) {
    console.error('[FAM Error]', ...args);
  }

  static group(label: string, fn: () => void) {
    if (this.isDev) {
      console.group(`[FAM] ${label}`);
      try {
        fn();
      } finally {
        console.groupEnd();
      }
    } else {
      fn();
    }
  }

  static time(label: string) {
    if (this.isDev) {
      console.time(`[FAM] ${label}`);
    }
  }

  static timeEnd(label: string) {
    if (this.isDev) {
      console.timeEnd(`[FAM] ${label}`);
    }
  }
}
