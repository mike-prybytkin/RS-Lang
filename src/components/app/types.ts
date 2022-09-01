interface IAppView {
  initAppView(): void;
  listnerGamesButton(): void;
  callAudioChallengeGame(hendler: RenderGamesPageHendler): void;
}

interface IAppController {
  initApp(): void;
}

type RenderGamesPageHendler = (this: void) => void;

export { IAppView, IAppController, RenderGamesPageHendler };
