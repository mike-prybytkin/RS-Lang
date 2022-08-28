interface ILocalStorageService {
  getItemLocalStorage(key: StorageKey): UserData;
  setItemLocalStorage(key: StorageKey, data: UserData): void;
  removeItemLocalStorage(key: StorageKey): void;
}

interface UserData {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

type StorageKey = 'user';

export { ILocalStorageService, UserData, StorageKey };
