import MainHtmlController from '../main-html/main-html.controller';
import PopUpController from '../pop-up/pop-up.controller';

class AppController {
  private mainHtmlController;

  private popUpController;

  constructor() {
    this.mainHtmlController = new MainHtmlController();
    this.popUpController = new PopUpController();
  }

  initApp() {
    this.mainHtmlController.initMainPage();
    this.popUpController.init();
  }
}

export default AppController;
