import AuthorizeController from '../authorize/authorize.controller';
import AppView from './app.view';
import { IAppController } from './types';

class AppController implements IAppController {
  private authorizeController;

  private view;

  constructor() {
    this.view = new AppView();
    this.authorizeController = new AuthorizeController();
  }

  initApp() {
    this.view.initAppView();
    this.authorizeController.init();
  }
}

export default AppController;
