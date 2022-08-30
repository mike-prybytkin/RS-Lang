import AuthorizeController from '../authorize/authorize.controller';
import HomePageController from '../home-page/home-page.controller';
import AppView from './app.view';
import { IAppController } from './types';

class AppController implements IAppController {
  private authorizeController;

  private homePageController;

  private view;

  constructor() {
    this.view = new AppView();
    this.authorizeController = new AuthorizeController();
    this.homePageController = new HomePageController();
  }

  initApp() {
    this.view.initAppView();
    this.authorizeController.init();
  }
}

export default AppController;
