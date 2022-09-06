import { UserType } from '../../shared/shared';

interface IStatisticPageView {
  statisticButtonsListener(handler: StatisticButtonHendler): void;
  statisticUserPageTemplate(): string;
  statisticAnonimPageTemplate(): string;
}

interface IStatisticPageController {
  renderStatisticPage(): string;
}

interface IStatisticPageModel {
  checkAuthorizeUser(): UserType;
}

type StatisticButtonHendler = (this: void) => string;

export { IStatisticPageView, StatisticButtonHendler, IStatisticPageController, IStatisticPageModel };
