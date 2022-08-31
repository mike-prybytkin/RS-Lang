import SwitchThemeView from './switch-theme.view';
import SwitchThemeModel from './switch-theme.model';
import { ISwitchThemeController } from './types';

class SwitchThemeController implements ISwitchThemeController {
  private view;

  private model;

  constructor() {
    this.view = new SwitchThemeView();
    this.model = new SwitchThemeModel();
  }

  init() {
    this.view.buttonListener(this.switchTheme);
  }

  switchTheme = () => {
    const checkStorage = this.model.getLocalStorage();
    if (checkStorage) {
      this.view.lightTheme();
      this.model.removeLocalStorage();
    } else {
      this.view.darkTheme();
      this.model.setLocalStorage(true);
    }
  };
}

export default SwitchThemeController;
