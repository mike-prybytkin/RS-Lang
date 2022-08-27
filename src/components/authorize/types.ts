interface IAuthorizeModel {
  getUserLocalStorage(key: StorageKey): UserData;
  setUserLocalStorage(key: StorageKey, data: UserData): void;
  removeUserLocalStorage(key: StorageKey): void;
}

interface UserData {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

type StorageKey = 'user';

export { IAuthorizeModel, UserData, StorageKey };
