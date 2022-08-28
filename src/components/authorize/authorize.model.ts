import LocalStorageService from '../../service/localStorage-service/localStorage-service';
import UserService from '../../service/user-service/user-service';

class AuthorizeModel {
  private authorize;

  private userService;

  constructor() {
    this.authorize = new LocalStorageService();
    this.userService = new UserService();
  }

  createUser(email: string, password: string, name: string) {
    const result = this.userService.createUser(email, password, name);
    return result;
  }
}

export default AuthorizeModel;
