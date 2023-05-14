export enum STORAGE_KEYS {
  REFRESH_JWT = "refresh_jwt", // TO DO
  JWT = "jwt",
}

export class LocalStorageManager {
  public static setToLocalStorage(
    key: STORAGE_KEYS | string,
    value: any,
    parseToJson = true
  ) {
    localStorage.setItem(key, parseToJson ? JSON.stringify(value) : value);
  }

  public static getFromLocalStorage<T>(
    key: STORAGE_KEYS | string,
    parseFromJson = true
  ): T | null {
    const data = localStorage.getItem(key);
    if (data) {
      if (parseFromJson) {
        return JSON.parse(data) as T;
      }
      return data as unknown as T;
    }
    return null;
  }

  public static removeFromLocalStorage(key: STORAGE_KEYS | string) {
    localStorage.removeItem(key);
  }
}
