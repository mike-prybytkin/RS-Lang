import {
  SWITCH_THEME_BUTTON,
  BODY,
  LIGHT_THEME_ICON,
  DARK_THEME_ICON,
  THEME_ICON,
  DARK_THEME_TEXT,
  LIGHT_THEME_TEXT,
  APP_TEXT,
  NAV_AND_BURGER_LIGHT,
  NAV_AND_BURGER_DARK,
  NAV_AND_BURGER_WRAPPERS,
} from '../../constants/constants';
import { ButtonListenerHendler, ISwitchThemeView } from './types';

class SwitchThemeView implements ISwitchThemeView {
  private body!: HTMLElement;

  private themeIcon!: HTMLElement;

  private appText!: HTMLCollection;

  private navAndBurger!: HTMLCollection;

  constructor() {
    this.body = document.querySelector(BODY) as HTMLElement;
    this.themeIcon = document.querySelector(THEME_ICON) as HTMLElement;
    this.appText = document.getElementsByClassName(APP_TEXT) as HTMLCollection;
    this.navAndBurger = document.getElementsByClassName(NAV_AND_BURGER_WRAPPERS) as HTMLCollection;
  }

  buttonListener(handler: ButtonListenerHendler) {
    const switchButton = document.querySelector(SWITCH_THEME_BUTTON) as HTMLElement;
    switchButton.addEventListener('click', () => {
      this.body = document.querySelector(BODY) as HTMLElement;
      this.themeIcon = document.querySelector(THEME_ICON) as HTMLElement;
      this.appText = document.getElementsByClassName(APP_TEXT) as HTMLCollection;
      this.navAndBurger = document.getElementsByClassName(NAV_AND_BURGER_WRAPPERS) as HTMLCollection;
      handler();
    });
  }

  darkTheme() {
    this.body.classList.add('dark-theme');
    this.themeIcon.innerHTML = DARK_THEME_ICON;
    for (let i = 0; i < this.appText.length; i += 1) {
      this.appText[i].classList.remove(LIGHT_THEME_TEXT);
      this.appText[i].classList.add(DARK_THEME_TEXT);
    }

    for (let i = 0; i < this.navAndBurger.length; i += 1) {
      this.navAndBurger[i].classList.remove(`${NAV_AND_BURGER_LIGHT[0]}`, `${NAV_AND_BURGER_LIGHT[1]}`);
      this.navAndBurger[i].classList.add(`${NAV_AND_BURGER_DARK[0]}`, `${NAV_AND_BURGER_DARK[1]}`);
    }
  }

  lightTheme() {
    if (this.body.classList.contains('dark-theme')) {
      this.body.classList.remove('dark-theme');
    }
    this.themeIcon.innerHTML = LIGHT_THEME_ICON;
    for (let i = 0; i < this.appText.length; i += 1) {
      this.appText[i].classList.remove(DARK_THEME_TEXT);
      this.appText[i].classList.add(LIGHT_THEME_TEXT);
    }

    for (let i = 0; i < this.navAndBurger.length; i += 1) {
      this.navAndBurger[i].classList.remove(`${NAV_AND_BURGER_DARK[0]}`, `${NAV_AND_BURGER_DARK[1]}`);
      this.navAndBurger[i].classList.add(`${NAV_AND_BURGER_LIGHT[0]}`, `${NAV_AND_BURGER_LIGHT[1]}`);
    }
  }
}

export default SwitchThemeView;
