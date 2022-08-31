interface ILocalStorageService {
  getItemLocalStorage<T>(key: StorageKey): T;
  setItemLocalStorage<T>(key: StorageKey, data: T): void;
  removeItemLocalStorage(key: StorageKey): void;
}

type StorageKey = 'user' | 'dark-theme';

export { ILocalStorageService, StorageKey };
