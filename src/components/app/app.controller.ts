import AuthorizeController from '../authorize/authorize.controller';
import HomePageController from '../home-page/home-page.controller';
import SwitchThemeController from '../switch-theme/switch-theme.controller';
import AppView from './app.view';
import { IAppController } from './types';
import AudioCallController from '../audio-call/audioCallController';
import SprintController from '../sprint/sprintController';
import AboutPageController from '../about-page/about-page.controller';

class AppController implements IAppController {
  private authorizeController;

  private homePageController;

  private switchThemeController;

  private view;

  audioCall: AudioCallController;

  sprint: SprintController;

  private aboutPageController;

  constructor() {
    this.view = new AppView();
    this.view.initAppView();
    this.audioCall = new AudioCallController();
    this.sprint = new SprintController();
    this.authorizeController = new AuthorizeController(this.audioCall, this.sprint);
    this.homePageController = new HomePageController();
    this.switchThemeController = new SwitchThemeController();
    this.view.listnerGamesButton();
    this.view.callAudioChallengeGame(this.audioCall.init);
    this.view.callSprintGame(this.sprint.init);
    this.aboutPageController = new AboutPageController();
  }

  initApp() {
    this.authorizeController.init();
    this.switchThemeController.init();
  }
}

export default AppController;
