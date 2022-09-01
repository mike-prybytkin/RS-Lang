interface IAppView {
  initAppView(): void;
}

interface IAppController {
  initApp(): void;
}

type RenderGamesPageHendler = (this: void) => void;

export { IAppView, IAppController, RenderGamesPageHendler };
