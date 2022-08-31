import { ILocalStorageService, StorageKey } from './types';

class LocalStorageService implements ILocalStorageService {
  getItemLocalStorage<T>(key: StorageKey): T {
    const storageString: string = localStorage.getItem(key) ?? '';
    return storageString ? JSON.parse(storageString) : null;
  }

  setItemLocalStorage<T>(key: StorageKey, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeItemLocalStorage(key: StorageKey) {
    localStorage.removeItem(key);
  }
}

export default LocalStorageService;
