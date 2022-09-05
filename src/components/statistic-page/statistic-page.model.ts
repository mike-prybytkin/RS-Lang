import LocalStorageService from '../../service/localStorage-service/localStorage-service';
import { UserType } from '../../shared/shared';
import { IStatisticPageModel } from './types';

class StatisticPageModel implements IStatisticPageModel {
  private localStorageService;

  constructor() {
    this.localStorageService = new LocalStorageService();
  }

  checkAuthorizeUser(): UserType {
    return this.localStorageService.getItemLocalStorage('user');
  }
}

export default StatisticPageModel;
