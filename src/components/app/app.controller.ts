import AuthorizeController from '../authorize/authorize.controller';
import HomePageController from '../home-page/home-page.controller';
import SwitchThemeController from '../switch-theme/switch-theme.controller';
import AppView from './app.view';
import { IAppController } from './types';
import AudioCallController from '../audio-call/audioCallController';
import { IAudioCallController } from '../audio-call/types';

class AppController implements IAppController {
  private authorizeController;

  private homePageController;

  private switchThemeController;

  private view;

  audioCall: IAudioCallController;

  constructor() {
    this.view = new AppView();
    this.audioCall = new AudioCallController();
    this.authorizeController = new AuthorizeController(this.audioCall);
    this.homePageController = new HomePageController();
    this.switchThemeController = new SwitchThemeController();
  }

  initApp() {
    this.view.initAppView();
    this.authorizeController.init();
    this.switchThemeController.init();
  }
}

export default AppController;
