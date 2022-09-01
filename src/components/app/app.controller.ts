import AuthorizeController from '../authorize/authorize.controller';
import HomePageController from '../home-page/home-page.controller';
import SwitchThemeController from '../switch-theme/switch-theme.controller';
import AppView from './app.view';
import { IAppController } from './types';
import AudioCallController from '../audio-call/audioCallController';

class AppController implements IAppController {
  private authorizeController;

  private homePageController;

  private switchThemeController;

  private audioCallController;

  private view;

  constructor() {
    this.view = new AppView();
    this.authorizeController = new AuthorizeController();
    this.homePageController = new HomePageController();
    this.switchThemeController = new SwitchThemeController();
    this.audioCallController = new AudioCallController();
    this.view.listnerGamesButton();
    this.view.callAudioChallengeGame(this.audioCallController.init);
  }

  initApp() {
    this.view.initAppView();
    this.authorizeController.init();
    this.switchThemeController.init();
  }
}

export default AppController;
