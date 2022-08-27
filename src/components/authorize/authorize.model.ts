import { IAuthorizeModel, UserData, StorageKey } from './types';

class AuthorizeModel implements IAuthorizeModel {
  getUserLocalStorage(key: StorageKey) {
    const storageString: string = localStorage.getItem(key) ?? '';
    return storageString ? JSON.parse(storageString) : null;
  }

  setUserLocalStorage(key: StorageKey, data: UserData) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeUserLocalStorage(key: StorageKey) {
    localStorage.removeItem(key);
  }
}

export default AuthorizeModel;
