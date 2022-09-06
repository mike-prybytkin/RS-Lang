import StatisticPageView from './statistic-page.view';
import StatisticPageModel from './statistic-page.model';
import { IStatisticPageController } from './types';

class StatisticPageController implements IStatisticPageController {
  private view;

  private model;

  constructor() {
    this.view = new StatisticPageView();
    this.model = new StatisticPageModel();
    this.view.statisticButtonsListener(this.renderStatisticPage);
  }

  renderStatisticPage = () => {
    if (this.model.checkAuthorizeUser()) {
      return this.view.statisticUserPageTemplate();
    }
    return this.view.statisticAnonimPageTemplate();
  };
}

export default StatisticPageController;
