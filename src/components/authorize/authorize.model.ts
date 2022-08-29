import LocalStorageService from '../../service/localStorage-service/localStorage-service';
import UserService from '../../service/user-service/user-service';
import { UserData } from '../../shared/shared';

class AuthorizeModel {
  private localStorageService;

  private userService;

  constructor() {
    this.localStorageService = new LocalStorageService();
    this.userService = new UserService();
  }

  createUser(email: string, password: string, name: string) {
    const result = this.userService.createUser(email, password, name);
    return result;
  }

  logInUser(email: string, password: string) {
    const result = this.userService.loginUser(email, password);
    return result;
  }

  setLocalStorage(data: UserData) {
    this.localStorageService.setItemLocalStorage('user', data);
  }

  removeLocalStorage() {
    this.localStorageService.removeItemLocalStorage('user');
  }

  getLocalStorage() {
    return this.localStorageService.getItemLocalStorage('user');
  }
}

export default AuthorizeModel;
