import AboutPageView from './about-page.view';

class AboutPageController {
  private view;

  constructor() {
    this.view = new AboutPageView();
    this.view.aboutButtonsListener(this.view.aboutPageTemplate);
  }
}

export default AboutPageController;
