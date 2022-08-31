import LocalStorageService from '../../service/localStorage-service/localStorage-service';
import { ISwitchThemeModel } from './types';

class SwitchThemeModel implements ISwitchThemeModel {
  private localStorageService;

  constructor() {
    this.localStorageService = new LocalStorageService();
  }

  setLocalStorage(check: boolean) {
    this.localStorageService.setItemLocalStorage('dark-theme', check);
  }

  removeLocalStorage() {
    this.localStorageService.removeItemLocalStorage('dark-theme');
  }

  getLocalStorage<T>(): T {
    return this.localStorageService.getItemLocalStorage('dark-theme');
  }
}

export default SwitchThemeModel;
