// import MainHtmlModel from './main-html.model';
import MainHtmlView from './main-html.view';

class MainHtmlController {
  private view;

  // private model;

  constructor() {
    this.view = new MainHtmlView();
    // this.model = new MainHtmlModel();
  }

  initMainPage() {
    this.view.bindOnloadBody();
  }
}

export default MainHtmlController;
