import { ILocalStorageService, UserData, StorageKey } from './types';

class LocalStorageService implements ILocalStorageService {
  getItemLocalStorage(key: StorageKey) {
    const storageString: string = localStorage.getItem(key) ?? '';
    return storageString ? JSON.parse(storageString) : null;
  }

  setItemLocalStorage(key: StorageKey, data: UserData) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeItemLocalStorage(key: StorageKey) {
    localStorage.removeItem(key);
  }
}

export default LocalStorageService;
