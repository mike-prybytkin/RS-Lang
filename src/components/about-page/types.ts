interface IAboutPageView {
  aboutButtonsListener(handler: AboutButtonHendler): void;
  aboutPageTemplate(): string;
}

type AboutButtonHendler = (this: void) => string;

export { IAboutPageView, AboutButtonHendler };
