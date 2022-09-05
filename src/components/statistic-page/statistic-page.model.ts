import LocalStorageService from '../../service/localStorage-service/localStorage-service';
import { UserType } from '../../shared/shared';

class StatisticPageModel {
  private localStorageService;

  constructor() {
    this.localStorageService = new LocalStorageService();
  }

  checkAuthorizeUser(): UserType {
    return this.localStorageService.getItemLocalStorage('user');
  }
}

export default StatisticPageModel;
