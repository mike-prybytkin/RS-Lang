interface ISwitchThemeView {
  buttonListener(handler: ButtonListenerHendler): void;
  darkTheme(): void;
  lightTheme(): void;
}

interface ISwitchThemeController {
  init(): void;
  switchTheme(): void;
  checkTheme(): void;
}

interface ISwitchThemeModel {
  setLocalStorage(check: boolean): void;
  removeLocalStorage(): void;
  getLocalStorage<T>(): T;
}

type ButtonListenerHendler = (this: void) => void;

export { ISwitchThemeView, ButtonListenerHendler, ISwitchThemeController, ISwitchThemeModel };
