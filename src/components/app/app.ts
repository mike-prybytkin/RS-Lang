import MainHtmlController from '../main-html/main-html.controller';

class AppController {
  private mainHtmlController;

  constructor() {
    this.mainHtmlController = new MainHtmlController();
  }

  initApp() {
    this.mainHtmlController.initMainPage();
  }
}

export default AppController;
