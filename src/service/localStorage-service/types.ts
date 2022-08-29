import { UserData } from '../../shared/shared';

interface ILocalStorageService {
  getItemLocalStorage(key: StorageKey): UserData;
  setItemLocalStorage(key: StorageKey, data: UserData): void;
  removeItemLocalStorage(key: StorageKey): void;
}

type StorageKey = 'user';

export { ILocalStorageService, StorageKey };
