interface IAppView {
  initAppView(): void;
}

interface IAppController {
  initApp(): void;
}

export { IAppView, IAppController };
