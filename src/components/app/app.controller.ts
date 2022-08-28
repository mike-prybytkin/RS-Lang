import AuthorizeController from '../authorize/authorize.controller';
import AppView from './app.view';

class AppController {
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
