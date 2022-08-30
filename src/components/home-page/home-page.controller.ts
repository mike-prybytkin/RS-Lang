import { IHomePageController } from './types';
import HomePageView from './home-page.view';

class HomePageController implements IHomePageController {
  private view;

  constructor() {
    this.view = new HomePageView();
    this.view.listnerLogoButton(this.renderHomePage);
  }

  renderHomePage = () => {
    this.view.renderHomePage();
  };
}

export default HomePageController;
