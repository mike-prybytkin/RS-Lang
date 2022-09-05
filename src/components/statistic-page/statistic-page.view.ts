import { IStatisticPageView, StatisticButtonHendler } from './types';
import { STATISTIC_BUTTON, MAIN_WRAPPER } from '../../constants/constants';

class StatisticPageView implements IStatisticPageView {
  private statisticButtons!: NodeList;

  private mainWrapper!: HTMLElement;

  constructor() {
    this.statisticButtons = document.querySelectorAll(STATISTIC_BUTTON) as NodeList;
    this.mainWrapper = document.querySelector(MAIN_WRAPPER) as HTMLElement;
  }

  statisticButtonsListener(handler: StatisticButtonHendler) {
    for (let i = 0; i < this.statisticButtons.length; i += 1) {
      this.statisticButtons[i].addEventListener('click', () => {
        const template = handler();
        const img = '<img class="statistic-image" src="./assets/celebration.svg" alt="celebration">';
        this.mainWrapper.innerHTML = template + img;
      });
    }
  }

  statisticUserPageTemplate = () => {
    return `
    <h4 class="statistic-header">Извините, статистика временно не доступна</h4>
    `;
  };

  statisticAnonimPageTemplate = () => {
    return `
    <h4 class="statistic-header">Статистика не доступна для незарегистрированных пользователей.</h4>
    `;
  };
}

export default StatisticPageView;
