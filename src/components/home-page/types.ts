interface IHomePageView {
  listnerLogoButton(hendler: RenderHomePageHendler): void;
  renderHomePage(): void;
  homePageTemplate(): string;
}

interface IHomePageController {
  renderHomePage(): void;
}

type RenderHomePageHendler = (this: void) => void;

export { IHomePageView, IHomePageController, RenderHomePageHendler };
